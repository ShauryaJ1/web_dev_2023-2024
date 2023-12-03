import flask
from flask import Flask, render_template,redirect,url_for,request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/form.html')
def form():
    return render_template('form.html')
@app.route('/results',methods=['POST'])
def results():
        adjective_1 = request.form.get('adjective_1')
        adjective_2 = request.form.get('adjective_2')
        type_of_bird= request.form.get('type_of_bird')
        room_in_house=request.form.get('room_in_house')
        verb_past_tense = request.form.get('verb_past_tense')
        verb = request.form.get('verb')
        relative_name=request.form.get('relative_name')
        noun_1 = request.form.get('noun_1')
        a_liquid = request.form.get('a_liquid')
        verb_ending_in_ing = request.form.get('verb_ending_in_ing')
        part_of_the_body = request.form.get('part_of_the_body')
        plural_noun_1 = request.form.get('plural_noun_1')
        number1=request.form.get('number1')
        verb_ending_in_ing_2 = request.form.get('verb_ending_in_ing_2')
        noun_2 = request.form.get('noun_2')
        return render_template('results.html', adjective_1=adjective_1,adjective_2=adjective_2,type_of_bird=type_of_bird,
                               room_in_house=room_in_house,verb_past_tense=verb_past_tense,verb=verb,relative_name=relative_name,
                                noun_1=noun_1,a_liquid=a_liquid,verb_ending_in_ing=verb_ending_in_ing,part_of_the_body=part_of_the_body,plural_noun_1=plural_noun_1,number1=number1
                                ,verb_ending_in_ing_2=verb_ending_in_ing_2,noun_2=noun_2)

if __name__=="__main__":
    app.run(host='0.0.0.0',port=80)