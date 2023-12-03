import flask
from flask import render_template, Flask, redirect, request, url_for

app = Flask(__name__)

@app.route('/form')
def handling_form():
    return render_template('form.html')

@app.route('/results', methods=['GET'])
def results_page():

    if request.method == 'GET':
        u_name = request.args.get('name')
        u_age = request.args.get('age')
        u_adult = request.args.get('adult')
        u_foods = [request.args.get('pizza'),request.args.get('pie'),request.args.get('cake')]
        for food in u_foods:
            if food:
                continue
            else:
                u_foods.remove(food)
        print(u_foods)
        print(u_name)
        print(u_age)
        print(u_adult)
        return render_template('results.html', user_name=u_name,user_age=u_age,user_adult=u_adult,user_foods=u_foods)
    
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)