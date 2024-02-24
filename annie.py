import time
import pyttsx3
import speech_recognition as sr
import sys
import subprocess
from threading import Thread

# from translate import Translator

from dotenv import load_dotenv
import os
import cohere

load_dotenv()
cohere_api_key = os.getenv("API_KEY")
co = cohere.Client(api_key=cohere_api_key)

engine = pyttsx3.init()
engine.setProperty("rate", 160)


def speech_to_text(response):
    # to generate the final output voice from text
    engine.say(response)
    engine.runAndWait()


def tts(sr):
    # initialize the recognizer
    r = sr.Recognizer()
    with sr.Microphone() as source:
        # read the audio data from the default microphone
        print("Speak...")
        audio_data = r.listen(source, timeout=5, phrase_time_limit=20)
        print("Recognizing...")

        text = r.recognize_google(audio_data)
        # If you want to recognize the speech in a different language, specify the language in the language parameter.
        # text_for_translation = r.recognize_google(audio_data, language="en-US")

        print(text)
        return text


# def translate(text):
#     #Can specify different languages to translate to.
#     translator = Translator(to_lang="fr")
#     translation = translator.translate(text)
#     print("Translating...")
#     return translation

history = []

# def get_vitals():
#     message = """
#     You will provide the patient's heart rate (bpm), the patient's blood pressure level (mmHg) and the patient's spo2 (%) level at this moment according to the scenario.

#     Please provide the information following this example format: "Heart Rate: 80 bpm, Blood Presure: 90/60 mmHg, SpO2: 95%".

#     Do not supply any other information other than the information asked for.

#     Please make these values accurate with the situation the patient is going through.
#     """

#     response = co.chat(
#         chat_history=history,
#         message = message,
#         connectors=[{"id": "web-search"}]
#     )
#     history.append({"role": "USER", "message": message})
#     history.append({"role": "CHATBOT", "message": response.text})
#     print("Patient's Vitals:\n", response.text)


# init_message = """
# Let's ropeplay an imaginary scenario. Please say "yes" if you understand. Limit your responses to 50 characters. Do not state anything about your situation until you are prompted by the user to do so.
# Please do not remind the user that this is a roleplay and that you are a large language model for the purpose of immersion.
# Your name is Annie.
# You are a patient starting to experiencing appendicitis.
# You are not aware that you have appendicitis, I am a doctor and I am trying to diagnose you.
# You have no medical knowledge and are only to describe how you are feeling."""

init_message = """"""

response = co.chat(message=init_message, connectors=[{"id": "web-search"}])
history.append({"role": "USER", "message": init_message})
history.append({"role": "CHATBOT", "message": response.text})

print(response.text, "\n")


print("ready")

message = ""
while message != "end":

    message = tts(sr)
    # message = input(">")

    response = co.chat(
        chat_history=history, message=message, connectors=[{"id": "web-search"}]
    )
    history.append({"role": "USER", "message": message})
    history.append({"role": "CHATBOT", "message": response.text})

    print("Patient Response:", response.text)
    # Thread(target=get_vitals).start()
    speech_to_text(response.text)

# class Annie:
#     def __init__(self):
#         self.history = []

# init_message = """
# Let's ropeplay an imaginary scenario. Please say "yes" if you understand. Limit your responses to 50 characters. Do not state anything about your situation until you are prompted by the user to do so.
# Please do not remind the user that this is a roleplay and that you are a large language model for the purpose of immersion.
# Your name is Annie.
# You are a patient starting to experiencing appendicitis.
# You are not aware that you have appendicitis, I am a doctor and I am trying to diagnose you.
# You have no medical knowledge and are only to describe how you are feeling."""

#         init_message = """
#         Let's ropeplay an imaginary scenario. Please say "yes" if you understand. Limit your responses to 50 characters. Do not state anything about your situation until you are prompted by the user to do so. Please do not remind the user that this is a roleplay and that you are a large language model for the purpose of immersion. Your name is Annie. You are a patient starting to experiencing appendicitis.  You are not aware that you have appendicitis, I am a doctor and I am trying to diagnose you. You have no medical knowledge and are only to describe how you are feeling. The roleplay will only start once I say "How are you doing".
#         """

#         response = co.chat(
#             message = init_message,
#             connectors=[{"id": "web-search"}]
#         )
#         self.history.append({"role": "USER", "message": init_message})
#         self.history.append({"role": "CHATBOT", "message": response.text})

#         print(response.text, "\n")

#     def respond(self, message):
#         response = co.chat(
#             chat_history=self.history,
#             message = message,
#             connectors=[{"id": "web-search"}]
#         )
#         self.history.append({"role": "USER", "message": message})
#         self.history.append({"role": "CHATBOT", "message": response.text})

#         return response.text
#         # Thread(target=self.get_vitals).start()
#         # speech_to_text(response.text)


#     def get_vitals(self):
#         # message = """
#         # You will provide the patient's heart rate (bpm), the patient's blood pressure level (mmHg) and the patient's spo2 (%) level at this moment according to the scenario.

#         # Please provide the information following this example format: "Heart Rate: 80 bpm, Blood Presure: 90/60 mmHg, SpO2: 95%".

#         # Do not supply any other information other than the information asked for.

#         # Please make these values accurate with the situation the patient is going through.
#         # """

#         message = """
#         Please provide the following patient vitals within realistic but concerning ranges:

#         Heart Rate: (40-140 bpm)
#         Blood Pressure: (80-180/40-100 mmHg)
#         SpO2: (85-100)%
#         Please adhere to the format: "Heart Rate: (value) bpm, Blood Pressure: (systolic/diastolic) mmHg, SpO2: (value)%". Ensure accuracy based on the patient's current condition."""

#         response = co.chat(
#             chat_history=self.history,
#             message = message,
#             connectors=[{"id": "web-search"}]
#         )
#         self.history.append({"role": "USER", "message": message})
#         self.history.append({"role": "CHATBOT", "message": response.text})
#         print("Patient's Vitals:\n", response.text)

#     def get_history(self):
#         return self.history
