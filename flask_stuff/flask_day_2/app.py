import flask
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    print('someone landing on the page')
    return render_template('hello_template.html')
@app.route('/ttt')
def ttt():
    print('someone landing on the ttt page')
    return render_template('tic_tac_toe_interface_template.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)