from flask import Flask, request, jsonify
from flask_cors import CORS 
import pandas as pd 
import joblib 

app = Flask(__name__)
CORS(app)  

@app.route("/predict_house_price", methods=['POST'])
def predict_house_price():
    #//////
    model_path = "./src/random_forest_model.pkl"
    model = joblib.load(model_path)
    data = request.json
    
    cats = True if 'pets' in data and data['pets'] else False
    dogs = True if 'pets' in data and data['pets'] else False
    sample_data = [
        data['city'],
        data['province'],
        float(data['latitude']),
        float(data['longitude']),
        data['lease_term'],
        data['type'],
        float(data['beds']),
        float(data['baths']),
        float(data['sq_feet']),
        data['furnishing'],
        data['smoking'],
        cats,
        dogs
    ]
    sample_df = pd.DataFrame([sample_data], columns=[
        'city', 'province', 'latitude', 'longitude', 'lease_term',
        'type', 'beds', 'baths', 'sq_feet', 'furnishing',
        'smoking', 'cats', 'dogs'
    ])
    predicted_price = model.predict(sample_df)
    return jsonify({"predicted_price": float(predicted_price[0])})
    #//////

if __name__ == "__main__":
    print("Starting Flask server on http://localhost:5000")
    print("Available routes:")
    print("  POST /validate_login - For user authentication")
    print("  POST /predict_house_price - For house price prediction")
    app.run(debug=True, host='0.0.0.0', port=5000)