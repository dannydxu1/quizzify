from flask import Flask, request, json
from nltk import sent_tokenize
import re
from pipelineTest import getTxt
# Create a Flask web application
app = Flask(__name__)

# Define a route and a function to handle GET requests
@app.route('/')
def hello_world():
    return 'Hello, World!'
sentList = []

# Define a route and a function to handle POST requests
@app.route('/post_example', methods=['POST'])
def post_example():
    data = request.data.decode('utf-8')  # Assuming you expect JSON data in the request

    # Process the data as needed
    if data is not None:
        
        sentences = [sentence.strip() for sentence in re.split(r'(?<=[.!?])\s+', data)]
        
        for sentence in sentences:
            sentList.append(sentence)
        getTxt(sentList[0])
        try:
            with open('./format.json', 'r') as file:
                json_data = json.load(file)
        except Exception as e:
            return str(e)
        return f'Received POST data: {data} {json_data} {sentList}'
    else:
        return 'No JSON data received in the POST request.'

if __name__ == '__main__':
    # Run the app on the local development server
    # print(get_question("sarthak is a genius", "sarthak"))
    app.run(port=8000, debug=True)





