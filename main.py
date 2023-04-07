from flask import Flask, jsonify, request,Response
from flask_cors import CORS
import gdown
import json
c  = 1
with open('data.json' , 'r',encoding = 'utf-8') as f:
     data = json.load(f)

app = Flask(__name__)
CORS(app)
def down_fun(url):
    gdown.download(url,"audio.mp3",quiet = False)
    exit()
    return
@app.route("/wav")
def streamwav():
    def generate():
        with open("backend/india.mp3", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")
@app.route('/india', methods =['GET'])
def india():
   print("Print",c)
   # gdd.download_file_from_google_drive(file_id='1QwQSgYURVysHT2bzwQkPvJIAWNL5hmDA',
   #                                  dest_path='./audio.mp3')
   # gdown.download("https://drive.google.com/uc?id=1QwQSgYURVysHT2bzwQkPvJIAWNL5hmDA","audio.mp3",quiet = False)
#    for i in data["india"]:
#            print(i)
#            url = data["india"]["link"]
#            print("gdown runs multiple times")
#            down_fun(url) 
#            break         
   return data
 
if __name__ == '__main__':
    app.run(debug = True,use_reloader=False)