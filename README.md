# quizzify

Hello! This is code for a project built at University of Iowa Hackathon. The project allows any student to upload lecture notes and get a custom generated based on the notes.

## AI Pipeline
- Using hugging face models
- First we break the sentences into keywords using a CountVectorizer and then rank them using BERT's embeddings and cosine similarity
- Then, using the surrounding sentence as context, and the keyword as an answer, we use the finetuned T5 model to generate a question
- Finally, we generate fake answers using the datamuse synonyms API

## Backend
- Built in Flask python
- Has CORS enabled (since we deployed the backend and frontend separately)
- Uses HTTP requests to communicate with frontend

## Frontend
- Built in ReactJS
- Using Chakra UI to built fancy reactive UI
