from flask import Flask, render_template
import requests                             # third party - not flask
import json

app = Flask(__name__)

@app.route('/')
def hello_requests():

    remote_url = "https://api.weather.gov/points/38.8173,-77.1673"
    r = requests.get(remote_url)    
    
    j = json.loads(r.text)
    remote_url_2 = j["properties"]["forecast"]
    print(remote_url_2)
    r2 = requests.get(remote_url_2)
    j2 = json.loads(r2.text)
    print(j2["properties"]["periods"][0]["temperature"])
    remote_url_minnesota = "https://api.weather.gov/points/44.7069,-93.4274"
    r3 = requests.get(remote_url_minnesota)
    j3 = json.loads(r3.text)
    print(j3["properties"]["forecast"])
    r4 = requests.get(j3["properties"]["forecast"])
    j4 = json.loads(r4.text)

    return render_template('weather.html', high1=j2["properties"]["periods"][0]["temperature"],high2=j4["properties"]["periods"][0]["temperature"])


app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)