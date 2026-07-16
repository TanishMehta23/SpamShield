import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from preprocess import transform_text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, precision_score, confusion_matrix
import joblib

# Load Dataset
df = pd.read_csv("data/spam.csv", encoding="latin-1")

# Remove unnecessary columns
df = df.drop(columns=["Unnamed: 2", "Unnamed: 3", "Unnamed: 4"])

# Rename columns
df = df.rename(columns={
    "v1": "label",
    "v2": "message"
})

# Convert labels
df["label"] = df["label"].map({
    "ham": 0,
    "spam": 1
})

# Check missing values
print("\nMissing Values")
print(df.isnull().sum())

# Remove duplicates
print("\nBefore:", df.shape)

df = df.drop_duplicates()

print("After:", df.shape)

print("\nDataset Preview")
print(df.head())

print(df["label"].value_counts())

sns.countplot(x=df["label"])
plt.title("Spam vs Ham")
plt.show()

df["length"] = df["message"].apply(len)

plt.figure(figsize=(8,5))
sns.histplot(data=df, x="length", hue="label", bins=50)
plt.title("Message Length Distribution")
plt.show()


print("Starting preprocessing...")

df["transformed"] = df["message"].apply(transform_text)

print("Preprocessing completed!")
print(df.head())
# ===========================
# TF-IDF Vectorization
# ===========================

X = df["transformed"]
y = df["label"]

vectorizer = TfidfVectorizer(max_features=3000)

X = vectorizer.fit_transform(X)

# ===========================
# Train Test Split
# ===========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ===========================
# Train Model
# ===========================

model = MultinomialNB()

model.fit(X_train, y_train)

# ===========================
# Prediction
# ===========================

y_pred = model.predict(X_test)

print("\nAccuracy :", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))

print("\nConfusion Matrix")
print(confusion_matrix(y_test, y_pred))

# ===========================
# Save Model
# ===========================

joblib.dump(model, "models/model.pkl")
joblib.dump(vectorizer, "models/vectorizer.pkl")

print("\nModel Saved Successfully!")