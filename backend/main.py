from flask import Flask, jsonify, request,Response
from flask_cors import CORS
from flask_cors import cross_origin
import json
app = Flask(__name__)
cors = CORS(app)

with open('data.json' , 'r',encoding = 'utf-8') as f:
     data = json.load(f)

@app.route("/india.mp3")
@cross_origin()
def streamwavin_india():
    def generate():
        with open("./audio/india.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/india', methods =['GET'])
@cross_origin()
def india():
        return data["india"]

@app.route("/tamilnadu.mp3")
@cross_origin()
def streamwavin_tamilnadu():
    def generate():
        with open("./audio/tamilnadu.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/tamilnadu', methods =['GET'])
@cross_origin()
def tamilnadu():
        return data["tamilnadu"]

@app.route("/ulagam.mp3")
@cross_origin()
def streamwavin_ulagam():
    def generate():
        with open("./audio/ulagam.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/ulagam', methods =['GET'])
@cross_origin()
def ulagam():
        return data["ulagam"]

@app.route("/vanigam.mp3")
@cross_origin()
def streamwavin_vanigam():
    def generate():
        with open("./audio/vanigam.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/vanigam', methods =['GET'])
@cross_origin()
def vanigam():
        return data["india"]                        


@app.route("/corona.mp3")
@cross_origin()
def streamwavin_corona():
    def generate():
        with open("./audio/corona.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/corona', methods =['GET'])
@cross_origin()
def corona():
        return data["corona"]


@app.route("/cinima.mp3")
@cross_origin()
def streamwavin_cinima():
    def generate():
        with open("./audio/cinima.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/cinima', methods =['GET'])
@cross_origin()
def cinima():
        return data["cinima"]

@app.route("/vilayattu.mp3")
@cross_origin()
def streamwavin_vilayattu():
    def generate():
        with open("./audio/vilayattu.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/vilayattu', methods =['GET'])
@cross_origin()
def vilayattu():
        return data["vilayattu"]

@app.route("/samayam.mp3")
@cross_origin()
def streamwavtn_samayam():
    def generate():
        with open("./audio/samayam.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/samayam', methods =['GET'])
@cross_origin()
def samayam():
   return data["samayam"]

@app.route("/thagaval.mp3")
@cross_origin()
def streamwavul_thagaval():
    def generate():
        with open("./audio/thagaval.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")

@app.route('/thagaval', methods =['GET'])
@cross_origin()
def thagaval():       
   return data["thagaval"]
 
if __name__ == '__main__':
    app.run(debug = True,use_reloader=False)