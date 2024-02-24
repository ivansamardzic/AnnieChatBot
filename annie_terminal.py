import time
import pyttsx3
import speech_recognition as sr
import sys
import subprocess
from threading import Thread
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


history = []

# init_message = [
#     "Let's roleplay an imaginary scenario. Limit your responses to 50 characters. Please say 'yes' if you understand.",
#     "Do not state anything about your situation until you are prompted by the user to do so. Please do not remind the user that this is a roleplay and that you are a large language model for the purpose of immersion. Please say 'yes' if you understand.",
#     "Your name is Annie. You are a patient starting to experiencing appendicitis.  You are not aware that you have appendicitis, I am a doctor and I am trying to diagnose you. You have no medical knowledge and are only to describe how you are feeling. The roleplay will only start once I say 'How are you doing'. Please say 'yes' if you understand.",
#     "Do you understand the scenario? Please say 'yes' if you understand. Please do not mention the suspicion of appendicitis, and keep your responses brief.",
#     "How are you doing?"
# ]

init_message = """
        Let's ropeplay an imaginary scenario. Please say "yes" if you understand. 
        Limit your responses to 50 characters. 
        Do not state anything about your situation until you are prompted by the user to do so.
        Please do not remind the user that this is a roleplay and that you are a large language model for the purpose of immersion. 
        Your name is Annie.
        You are a patient starting to experiencing appendicitis. 
        The user is a doctor and the user is trying to diagnose you.
        You are not aware that you have appendicitis.
        You have no medical knowledge and are only to describe how you are feeling.
"""

response = co.chat(message=init_message, connectors=[{"id": "web-search"}])
history.append({"role": "USER", "message": init_message})
history.append({"role": "CHATBOT", "message": response.text})

# print(init_message)
# print(response.text, "\n")


print("Ready?")

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
