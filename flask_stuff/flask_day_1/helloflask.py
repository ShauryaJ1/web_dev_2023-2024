import flask

from flask import Flask
app = Flask(__name__)
app.debug=True
@app.route('/')
def hello_world():
    print("someone landing on page")
    return 'This is Shaurya\'s page'

if __name__=='main':
    app.run()