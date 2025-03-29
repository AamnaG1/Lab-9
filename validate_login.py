from flask import Flask, request, jsonify
from flask_cors import CORS 
import pandas as pd 
import joblib 

app = Flask(__name__)
CORS(app)  

USER_CREDENTIALS = {
    "alice": "password123",
    "bob": "secure456",
    "charlie": "qwerty789",
    "diana": "hunter2",
    "eve": "passpass",
    "frank": "letmein",
    "grace": "trustno1",
    "heidi": "admin123",
    "ivan": "welcome1",
    "judy": "password1"
}

@app.route("/validate_login", methods=['POST'])
def validate_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    if username in USER_CREDENTIALS and USER_CREDENTIALS[username] == password:
        return jsonify({"success": True, "message": "Login successful."})
    else:
        return jsonify({"success": False, "message": "Invalid username or password."})


if __name__ == "__main__":
    print("Starting Flask server on http://localhost:5000")
    print("Available routes:")
    print("  POST /validate_login - For user authentication")
    print("  POST /predict_house_price - For house price prediction")
    app.run(debug=True, host='0.0.0.0', port=5000)