from flask import Flask, render_template, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('hello.html')

@app.route("/grades")
def grade_ops():
    grades  = {
	  "WEB": 'A',
	  "Latin": 'A',
	  "Multi": 'B',
      'History': 'A-'
	}
    return jsonify(grades)

@app.route('/upvote')
def upvote():
    return ''

@app.route('/downvote')
def downvote():
    return ''
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)