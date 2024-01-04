 
from flask import Flask, request, render_template

app = Flask(__name__)
@app.route('/readcookie')
def read_cookie():
    username_cookie = request.cookies.get('shaurya')

    # do stuff with the cookie (conditional, etc)
    return render_template('cookie.html',cook=username_cookie)


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)