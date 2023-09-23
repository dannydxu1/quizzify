from flask import Flask, request

# Create a Flask web application
app = Flask(__name__)

# Define a route and a function to handle GET requests
@app.route('/')
def hello_world():
    return 'Hello, World!'

# Define a route and a function to handle POST requests
@app.route('/post_example', methods=['POST'])
def post_example():
    data = request.data.decode('utf-8')  # Assuming you expect JSON data in the request
    # Process the data as needed
    if data is not None:
        return f'Received POST data: {data}'
    else:
        return 'No JSON data received in the POST request.'

if __name__ == '__main__':
    # Run the app on the local development server
    app.run(port=8000, debug=True)



