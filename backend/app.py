from flask import Flask, request, json
from nltk import sent_tokenize
from flask_cors import CORS
import re
# from pipelineTest import getTxt

# Create a Flask web application
app = Flask(__name__)

# Define a route and a function to handle GET requests
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'


sentList = []

# Define a route and a function to handle POST requests


@app.route('/post_example', methods=['POST'])
def post_example():
    # Assuming you expect JSON data in the request
    data = request.data.decode('utf-8')

    # Process the data as needed
    if data is not None:

        # sentences = [sentence.strip()
        #              for sentence in re.split(r'(?<=[.!?])\s+', data)]

        # for sentence in sentences:
        #     sentList.append(sentence)
        # questions = []
        # for i in range(len(sentList)):
        #     questions.append(getTxt(sentList[i]))

        try:
            with open('./format.json', 'r') as file:
                json_data = json.load(file)
                return json_data
        except Exception as e:
            return str(e)
        # return f'Received POST data: {questions}'
        # return f'Received POST data: {data} {json_data} {questions}'
    else:
        return 'No JSON data received in the POST request.'


if __name__ == '__main__':
    # Run the app on the local development server
    # print(get_question("sarthak is a genius", "sarthak"))
    app.run(port=8000, debug=True)
