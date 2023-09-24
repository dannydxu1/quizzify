from sentence_transformers import SentenceTransformer
from transformers import T5ForConditionalGeneration, AutoTokenizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import torch
import spacy
from transformers import BertTokenizer, BertModel
from warnings import filterwarnings as filt
import random
import requests

filt('ignore')

bert_tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert_model = BertModel.from_pretrained("bert-base-uncased")
model = SentenceTransformer('distilbert-base-nli-mean-tokens')
nlp = spacy.load("en_core_web_sm")

def getTxt(txt):
    def get_question(sentence, answer):
        mdl = T5ForConditionalGeneration.from_pretrained('ramsrigouthamg/t5_squad_v1')
        tknizer = AutoTokenizer.from_pretrained('ramsrigouthamg/t5_squad_v1')
        text = "context: {} answer: {}".format(sentence, answer)
        max_len = 256
        encoding = tknizer.encode_plus(text, max_length=max_len, pad_to_max_length=False, truncation=True, return_tensors="pt")

        input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

        outs = mdl.generate(input_ids=input_ids,
            attention_mask=attention_mask,
            early_stopping=True,
            num_beams=5,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            max_length=300)

        dec = [tknizer.decode(ids, skip_special_tokens=True) for ids in outs]

        Question = dec[0].replace("question:", "")
        Question = Question.strip()
        return Question

    def get_embedding(doc):
        tokens = bert_tokenizer.tokenize(doc)
        token_idx = bert_tokenizer.convert_tokens_to_ids(tokens)
        segment_ids = [1] * len(tokens)

        torch_token = torch.tensor([token_idx])
        torch_segment = torch.tensor([segment_ids])

        return bert_model(torch_token, torch_segment)[-1].detach().numpy()

    def get_pos(context):
        doc = nlp(context)
        docs = [d.pos_ for d in doc]
        return docs, context.split()

    def get_sent(context):
        doc = nlp(context)
        return list(doc.sents)

    def get_vector(doc):
        stop_words = "english"
        n_gram_range = (1, 1)
        df = CountVectorizer(ngram_range=n_gram_range, stop_words=stop_words).fit([doc])
        return df.get_feature_names_out()

    def get_key_words(context, module_type='t'):
        keywords = []
        top_n = 5
        for txt in get_sent(context):
            keywd = get_vector(str(txt))
            if module_type == 't':
                doc_embedding = get_embedding(str(txt))
                keywd_embedding = get_embedding(' '.join(keywd))
            else:
                doc_embedding = model.encode([str(txt)])
                keywd_embedding = model.encode(keywd)

            distances = cosine_similarity(doc_embedding, keywd_embedding)
            keywords += [(keywd[index], str(txt)) for index in distances.argsort()[0][-top_n:]]

        return keywords

    sentences = get_sent(txt)
    max_questions = min(len(sentences) * 2, 10)  # Maximum of around 10 questions
    questions = []


    def generateFakeAnsMath(ans):
        variation = 0.3
        similar_values = []
        for _ in range(3):
            variation = random.uniform(-0.2, 0.2)
            similar_value = ans + variation
            similar_values.append(similar_value)
        return similar_values

    def get_synonyms(word):
        base_url = "https://api.datamuse.com/words?rel_trg="+word
        # params = {"rel_trg": word}
        
        # print(params)
        response = requests.get(base_url)
        if response.status_code == 200:
            data = response.json()
            synonyms = [entry["word"] for entry in data]
            return synonyms
        else:
            print("Error: Unable to fetch synonyms.")
            return []


    def generateFakeAnsWords(ans):
        return get_synonyms(ans)
                

    for ans, context in get_key_words(txt, 'st'):
        if len(questions) >= max_questions:
            break
        
        question = get_question(context, ans)
        answers = []
        
        if isinstance(ans, float):
            getAns = generateFakeAnsMath(ans)
        else:
            getAns = generateFakeAnsWords(ans)

        if (len(getAns) < 3):
            continue

        for i in range(3):
            answers.append(getAns[i])
        
        answers.append(ans)
        
        random.shuffle(answers)
        
        new_question = {
            "question": question,
            "options": answers,
            "correctAnswer": ans
        }
        
        questions.append(new_question)
        

    return questions


