import flask
from flask import Flask, request, redirect,url_for,render_template

app = Flask(__name__)

app.route('/')
def home():
    return render_template('index.html')

