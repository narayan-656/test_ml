# inference/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import os

# Load model & vectorizer
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "../models")

model = joblib.load(os.path.join(MODEL_DIR, "sentiment_model.pkl"))
vectorizer = joblib.load(os.path.join(MODEL_DIR, "vectorizer.pkl"))

app = FastAPI()

class ReviewInput(BaseModel):
    review: str

@app.post("/predict")
def predict_sentiment(data: ReviewInput):
    review_vec = vectorizer.transform([data.review])
    prediction = model.predict(review_vec)[0]
    sentiment = "positive" if prediction == "positive" else "negative"
    return {"sentiment": sentiment}
