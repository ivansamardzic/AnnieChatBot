from flask import Flask, render_template, request, Response, jsonify
from flask_cors import CORS, cross_origin
from annie import Annie

import time
import os
import pyttsx3
import speech_recognition as sr
import sys
import subprocess
from threading import Thread

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

annie = Annie()

@app.route("/")
def index():
    history = annie.get_history()
    return render_template('index.html', history = history)

@app.route("/respond", methods=['POST'])
@cross_origin()
def respond():
    print(request)
    response = annie.respond(request.body)
    return Response(jsonify(message=response), status=204, mimetype='application/text')