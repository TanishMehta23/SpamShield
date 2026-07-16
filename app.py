import os
import sys

os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")
os.environ.setdefault("NUMEXPR_NUM_THREADS", "1")

from flask import Flask, render_template, request, redirect, url_for, session
import joblib

# Add src folder
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))

from preprocess import transform_text

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret-change-me")

# Load model
base_dir = os.path.dirname(__file__)
model = joblib.load(os.path.join(base_dir, "models", "model.pkl"))
vectorizer = joblib.load(os.path.join(base_dir, "models", "vectorizer.pkl"))


@app.route("/")
def home():
    prediction = session.pop("prediction", None)
    confidence = session.pop("confidence", None)
    message = session.pop("message", None)
    return render_template(
        "index.html",
        prediction=prediction,
        confidence=confidence,
        message=message,
    )


@app.route("/predict", methods=["POST"])
def predict():
    message = request.form["message"]

    transformed = transform_text(message)

    vector = vectorizer.transform([transformed])

    prediction = model.predict(vector)[0]
    probability = model.predict_proba(vector)[0]
    confidence = round(max(probability) * 100, 2)

    if prediction == 1:
        result = "Spam"
    else:
        result = "Not Spam"

    session["prediction"] = result
    session["confidence"] = confidence
    session["message"] = message

    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)