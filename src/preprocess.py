import nltk
import string
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Download the required NLTK corpus if it's not already available
nltk.download("stopwords", quiet=True)

ps = PorterStemmer()
stop_words = set(stopwords.words("english"))

def transform_text(text):
    text = text.lower()

    # Simple tokenization
    words = text.split()

    # Remove punctuation
    cleaned = []
    for word in words:
        word = word.strip(string.punctuation)
        if word.isalnum():
            cleaned.append(word)

    # Remove stopwords
    cleaned = [word for word in cleaned if word not in stop_words]

    # Stemming
    cleaned = [ps.stem(word) for word in cleaned]

    return " ".join(cleaned)