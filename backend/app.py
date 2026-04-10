from flask import Flask, request, jsonify
from flask_cors import CORS
# import joblib  # You will uncomment this later when you have your model

app = Flask(__name__)
# Allow the React frontend (running on port 5173) to communicate with this python backend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --- TODO: LOAD YOUR COLAB MODELS HERE ---
# print("Loading Artificial Intelligence Models...")
# severity_model = joblib.load('models/severity_model.pkl')
# print("Models Loaded successfully!")

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # 1. Grab the exact weather and traffic data the user clicked on the React Website
        data = request.json
        print(f"Received Prediction Request from Website: {data}")
        
        weather = data.get('weather')
        traffic = data.get('traffic')
        time_val = data.get('time')
        
        # 2. Feed that data into your Machine Learning Model (Placeholder logic below)
        # features = preprocess_data(weather, traffic, time_val)
        # risk_prediction = severity_model.predict_proba(features)[0][1] * 100
        
        # --- TEMPORARY SIMULATION ---
        # Until you plug in the actual model above, we will simulate a realistic response to test the UI
        risk_score = 45
        if weather in ['rain', 'fog', 'snow']:
            risk_score += 25
        if traffic == 'high':
            risk_score += 15
            
        severity = 'Low'
        if risk_score > 60: severity = 'Medium'
        if risk_score > 80: severity = 'High'
        
        # 3. Send the final calculated answer instantly back to the React Website
        return jsonify({
            'status': 'success',
            'risk_score': risk_score,
            'severity': severity,
            'suggestions': [
                'Reduce speed manually',
                'Activate fog lights in low visibility'
            ]
        })

    except Exception as e:
        print(f"Error occurring during prediction: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

import random

@app.route('/api/hotspots', methods=['GET'])
def get_hotspots():
    try:
        lat = float(request.args.get('lat', 18.5204))
        lng = float(request.args.get('lng', 73.8567))
        
        # Generate dynamic hotspots around the requested coordinates (simulating DBSCAN clusters)
        hotspots = []
        causes = ["High Crowded Traffic", "Intersection Aggression", "Accident History Zone", "Pedestrian Crossing", "Sharp Turn / Low Vis"]
        
        for i in range(12): # Generate 12 zones
            offset_lat = random.uniform(-0.03, 0.03)  # Radius of ~3km
            offset_lng = random.uniform(-0.03, 0.03)
            risk = random.randint(40, 99)
            
            severity = "Caution"
            if risk > 60: severity = "Medium Risk"
            if risk > 85: severity = "Critical Threat"
            
            hotspots.append({
                "id": i,
                "pos": [lat + offset_lat, lng + offset_lng],
                "risk": risk,
                "severity": severity,
                "cause": random.choice(causes),
                "radius": random.randint(200, 900) # Area radius in physical meters
            })
            
        return jsonify({"hotspots": hotspots})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/status', methods=['GET'])
def system_status():
    return jsonify({"status": "Online", "message": "Neural Engine Ready"})

if __name__ == '__main__':
    # Start the backend server on port 5000
    print("Starting Python Flask Server on http://localhost:5000")
    app.run(debug=True, port=5000)
