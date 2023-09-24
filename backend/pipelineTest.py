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

#         input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

#         outs = mdl.generate(input_ids=input_ids,
#                             attention_mask=attention_mask,
#                             early_stopping=True,
#                             num_beams=5,
#                             num_return_sequences=1,
#                             no_repeat_ngram_size=2,
#                             max_length=300)

#         dec = [tknizer.decode(ids, skip_special_tokens=True) for ids in outs]

#         Question = dec[0].replace("question:", "")
#         Question = Question.strip()
#         return Question

#     def get_embedding(doc):
#         tokens = bert_tokenizer.tokenize(doc)
#         token_idx = bert_tokenizer.convert_tokens_to_ids(tokens)
#         segment_ids = [1] * len(tokens)

#         torch_token = torch.tensor([token_idx])
#         torch_segment = torch.tensor([segment_ids])

#         return bert_model(torch_token, torch_segment)[-1].detach().numpy()

#     def get_pos(context):
#         doc = nlp(context)
#         docs = [d.pos_ for d in doc]
#         return docs, context.split()

#     def get_sent(context):
#         doc = nlp(context)
#         return list(doc.sents)

#     def get_vector(doc):
#         stop_words = "english"
#         n_gram_range = (1, 1)
#         df = CountVectorizer(ngram_range=n_gram_range,
#                              stop_words=stop_words).fit([doc])
#         return df.get_feature_names_out()

#     # def get_vector(doc, tokenizer=bert_tokenizer, model=bert_model):
#     #     # Tokenize the document
#     #     tokens = tokenizer.tokenize(doc)
#     #     # Add [CLS] and [SEP] tokens and convert to IDs
#     #     input_ids = tokenizer.convert_tokens_to_ids(
#     #         ['[CLS]'] + tokens + ['[SEP]'])
#     #     # Convert to a PyTorch tensor
#     #     input_tensor = torch.tensor(input_ids).unsqueeze(0)  # Batch size of 1

#     #     # Get BERT embeddings
#     #     with torch.no_grad():
#     #         # First element contains embeddings
#     #         embeddings = model(input_tensor)[0]

#     #     # Average the embeddings over tokens
#     #     avg_embedding = torch.mean(embeddings, dim=1).numpy()

#         return avg_embedding

#     def get_key_words(context, module_type='t'):
#         keywords = []
#         top_n = 5
#         sentences = get_sent(context)
#         # Create a TF-IDF vectorizer
#         tfidf_vectorizer = TfidfVectorizer(
#             ngram_range=n_gram_range, stop_words="english")

#         # Fit and transform the document
#         tfidf_matrix = tfidf_vectorizer.fit_transform([context])
#         feature_names = tfidf_vectorizer.get_feature_names_out()

#         # Get the TF-IDF values for each feature
#         tfidf_values = tfidf_matrix.toarray()[0]
#         for txt in sentences:
#             # keywd = get_vector(str(txt))
#             keyword_scores = [(feature, tfidf) for feature,
#                               tfidf in zip(feature_names, tfidf_values)]

#             # Sort keywords by TF-IDF score in descending order
#             keyword_scores.sort(key=lambda x: x[1], reverse=True)

#             # Extract the top N keywords
#             keywd = [keyword for keyword, _ in keyword_scores[:top_n]]

#             if module_type == 't':
#                 doc_embedding = get_embedding(str(txt))
#                 print(keywd)
#                 keywd_embedding = get_embedding(' '.join(keywd))
#             else:
#                 doc_embedding = model.encode([str(txt)])
#                 keywd_embedding = model.encode(keywd)

#             distances = cosine_similarity(doc_embedding, keywd_embedding)
#             keywords += [(keywd[index], str(txt))
#                          for index in distances.argsort()[0][-top_n:]]

#         return keywords

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

#     return questions


# def get_keywords(doc, stop_words=None, n_gram_range=(1, 1), top_n=5):
#     if stop_words is None:
#         stop_words = text.ENGLISH_STOP_WORDS  # Use default English stop words

#     # Get the feature names (words)


# s = '''
# Physics is a natural science that seeks to understand and describe the fundamental principles governing the behavior of the universe, from the smallest subatomic particles to the largest galaxies and everything in between. It is one of the oldest and most fundamental scientific disciplines, providing the foundation for our understanding of how the world works. Here are some key aspects and branches of physics:

# Classical Mechanics: Classical mechanics, formulated by Sir Isaac Newton in the 17th century, deals with the motion of objects under the influence of forces. It includes concepts like force, motion, energy, and momentum and is the basis for understanding the motion of everyday objects.
# Electromagnetism: This branch of physics studies the interaction between electrically charged particles and the forces and fields associated with them. James Clerk Maxwell's equations provide the foundation for understanding electromagnetism, which encompasses topics like electricity, magnetism, and electromagnetic waves (e.g., light).
# Thermodynamics: Thermodynamics deals with the principles governing heat, work, energy, and the behavior of matter at different temperatures. It has applications in understanding engines, refrigeration, and the behavior of gases.
# Quantum Mechanics: Quantum mechanics is a fundamental theory in physics that describes the behavior of matter and energy at very small scales, such as atoms and subatomic particles. It introduces the concept of quantization and wave-particle duality, challenging classical notions of determinism.'''
# # getTxt(s)
# print(get_keywords(s))
