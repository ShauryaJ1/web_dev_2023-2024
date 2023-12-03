import flask
from flask import render_template, Flask, redirect, request, url_for

app = Flask(__name__)

@app.route('/post_form')
def handling_form():
    return render_template('post_form.html')

@app.route('/post', methods=['POST'])
def results_page():
    school = request.form.get('school_name')
    county = request.form.get('county_name')
    state = request.form.get('state_name')
    return render_template('post.html',school=school,county=county,state=state)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)