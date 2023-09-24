from sentence_transformers import SentenceTransformer
from transformers import T5ForConditionalGeneration, AutoTokenizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import torch
import spacy
from transformers import BertTokenizer, BertModel
from warnings import filterwarnings as filt
import random
from nltk.corpus import wordnet

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
    all_questions = []

    questionAns = {


    }

    def generateFakeAnsMath(ans):
        variation = 0.3
        similar_values = []
        for _ in range(3):
            variation = random.uniform(-0.2, 0.2)
            similar_value = ans + variation
            similar_values.append(similar_value)
        return similar_values

    def get_synonyms(word):
        synonyms = set()
        for syn in wordnet.synsets(word):
            for lemma in syn.lemmas():
                synonyms.add(lemma.name())
        
        synonyms = list(synonyms)

        return synonyms


    def generateFakeAnsWords(ans):
        similar_phrases = []
        input_words = ans.split()
        
        for _ in range(3):
            modified_words = []
            used_synonyms = set()  # Keep track of synonyms used in this iteration
            for word in input_words:
                synonyms = get_synonyms(word)
                available_synonyms = list(set(synonyms) - used_synonyms)  # Filter out used synonyms
                if available_synonyms:
                    synonym = random.choice(available_synonyms)
                    modified_words.append(synonym)
                    used_synonyms.add(synonym)
                else:
                    modified_words.append(word)
            
            modified_phrase = " ".join(modified_words)
            similar_phrases.append(modified_phrase)
        
        return similar_phrases

    for ans, context in get_key_words(txt, 'st'):
        if len(questions) >= max_questions:
            break
        print('=======================================')
        print()
        question = get_question(context, ans)
        answers = []
        
        if isinstance(ans, float):
            getAns = generateFakeAnsMath(ans)
        else:
            getAns = generateFakeAnsWords(ans)

        for i in range(len(getAns)):
            answers.append(getAns[i])
        
        answers.append(ans)
        
        random.shuffle(answers)
        print(answers)
        
        # random_values = random.sample(range(4), 4)

        # print(len(random_values))
        # print(random_values)

        # print("this is the random value", answers[random_values[0]])
        new_question = {
            "question": question,
            "options": answers,
            "correctAnswer": ans
        }
        
        questions.append(new_question)
        #questions.append(question)
        #print(question)
        print()
    
    #print(questionAns)

    return questions


