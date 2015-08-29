import os
from flask import Flask, render_template, request
import requests
from flask_wtf import Form
import wtforms as wtf
from wtforms import validators as val


IS_PROD = os.environ.get('DYNO') != None # signals Heroku environment

app = Flask(__name__)
app.debug = not IS_PROD

GEO_IP_CACHE = {}

def get_geo():
    ip = request.access_route[0]
    result = GEO_IP_CACHE.get(ip)
    if not result:
        if IS_PROD:
            result = requests.get('http://ipinfo.io/%s/json' % ip).json()
        else:
            result = dict(postal=90210)
        GEO_IP_CACHE[ip] = result
    return result

class SearchForm(Form):
    keywords = wtf.StringField()
    location = wtf.StringField(validators=[val.DataRequired()])
    distance = wtf.SelectField(choices=[
                                        ('1_mile', '<i class="fa fa-bicycle fa-fw"></i> 1 mile'),
                                        ('25_mile', '<i class="fa fa-car fa-fw"></i> 25 miles'),
                                        ('50_mile', '<i class="fa fa-car fa-fw"></i> 75 miles'),
                                        ('100_mile', '<i class="fa fa-car fa-fw"></i> 100 miles'),
                                        ],
                               default='10_mile')

@app.route('/')
def index_view():
    form = SearchForm(request.args, csrf_enabled=False)
    if not form.location.data:
        form.location.data = get_geo().get('postal')
    return render_template('index.html', form=form)


@app.route('/search')
def search_view():
    form = SearchForm(request.args, csrf_enabled=False)
    if not form.location.data:
        form.location.data = get_geo().get('postal')
    result = None
    if form.validate():
        pass
    return render_template('search.html', result=result, form=form)

if __name__ == '__main__':
    app.run(port=8080)
