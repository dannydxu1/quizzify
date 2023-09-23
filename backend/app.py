from flask import Flask

# Create a Flask web application
app = Flask(__name__)

# Define a route and a function to handle it
@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    # Run the app on the local development server
    app.run(port=8000,debug=True)

