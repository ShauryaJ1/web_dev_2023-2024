from flask import Flask, render_template, request
app = Flask(__name__)


# ROUTE TO GENERATE THE FORM
@app.route('/hello_form')
def hello_form():
  return render_template('myform.html')


# ROUTE TO PROCESS THE FORM
@app.route('/thank_you')
def handle_form():

  # GET THE FORM VALUE
  u_name = request.args.get('f_username')
  return render_template('submitted.html', user_name=u_name)

app.debug = True
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)