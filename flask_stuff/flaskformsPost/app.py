from flask import Flask, render_template, request
app = Flask(__name__)


# ROUTE TO GENERATE THE FORM
@app.route('/hello_form')
def hello_form():
  return render_template('myform.html')


# ROUTE TO PROCESS THE FORM
@app.route('/thank_you', methods=['POST'])
def handle_form():

  if request.method == 'POST':
  
    # Access and process data from the POST request
    u_name = request.form.get('f_username')
    u_pass = request.form.get('f_password')

    return render_template('submitted.html', user_name=u_name, password=u_pass)

app.debug = True
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)