import flask
import time

from flask import Flask, render_template
print('hello world')
app = Flask(__name__)

@app.route('/')
def hello_world():
    print("someone landing on page")
    return 'This is Shaurya\'s page'
print('Flask app starting!!!')
@app.route('/ttt')
def tic_tac_toe(name=None):
    return render_template('tic_tac_toe_interface_template.html',name=None)
@app.route('/foo')
def foo():
    return 'Hello, foo!'

@app.route('/foo/bar')
def foobar():
    return 'Hello, foobar!'
@app.route('/rendered')
def rendered(name=None):
    return render_template('hello_template.html',name=name)
@app.route('/page3')
def page3(name=None):
    return render_template('page3.html',name=name)
@app.route('/user/<username>')
def user_page(username):
    return render_template('user.html',name=username)
if __name__=='__main__':
    app.run(host='0.0.0.0',port=80)
    print('hello world')
