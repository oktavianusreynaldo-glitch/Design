from flask import Flask, request, Response
import requests

app = Flask(__name__)

API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"
headers = {"Authorization": "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"}

@app.route("/generate", methods=["POST"])
def generate():
    prompt = request.json["prompt"]

    response = requests.post(API_URL, headers=headers, json={
        "inputs": prompt
    })

    return Response(response.content, content_type="image/png")

@app.route("/")
def home():
    return "Backend running!"

app.run(host="0.0.0.0", port=10000)
