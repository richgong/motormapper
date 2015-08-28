import os
from flask import Flask, render_template

app = Flask(__name__)
app.debug = True

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/begin')
def begin():
    return render_template('begin.html')


if __name__ == '__main__':
    app.run(port=8080)
