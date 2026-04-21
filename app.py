"""
Disease Prediction & Doctor Finder - Flask Application
Serves the web UI and provides ML prediction API endpoints.
Uses the enhanced 132-symptom model trained on combined datasets.
"""

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from flask import Flask, render_template, request, jsonify
import joblib
import json
import numpy as np
import os

app = Flask(__name__)

# ─── Load Model & Artifacts ────────────────────────────────────
MODEL_DIR = "model"

try:
    model = joblib.load(os.path.join(MODEL_DIR, "disease_model.pkl"))
    disease_encoder = joblib.load(os.path.join(MODEL_DIR, "disease_encoder.pkl"))

    with open(os.path.join(MODEL_DIR, "symptom_columns.json"), "r") as f:
        symptom_columns = json.load(f)

    with open(os.path.join(MODEL_DIR, "disease_metadata.json"), "r") as f:
        disease_metadata = json.load(f)

    with open(os.path.join(MODEL_DIR, "encoding_info.json"), "r") as f:
        encoding_info = json.load(f)

    with open(os.path.join(MODEL_DIR, "symptom_list.json"), "r") as f:
        symptom_list_human = json.load(f)

    MODEL_LOADED = True
    print("[OK] ML Model loaded successfully!")
    print(f"     Model type: {encoding_info['model_type']}")
    print(f"     Accuracy: {encoding_info['model_accuracy']:.2%}")
    print(f"     Diseases: {encoding_info['num_diseases']}")
    print(f"     Symptoms: {encoding_info['num_symptoms']}")
except Exception as e:
    MODEL_LOADED = False
    print(f"[!!] Model not loaded: {e}")
    print("     Run 'python train_model.py' first to train the model.")
    symptom_columns = []
    symptom_list_human = []


# ─── Disease Details Database ──────────────────────────────────
DISEASE_DETAILS = {
    "Fungal infection": {
        "category": "Infectious", "severity": "mild",
        "specialist": "Dermatologist",
        "description": "A fungal infection is caused by fungi. It can affect skin, nails, or internal organs.",
        "precautions": ["Keep affected area clean and dry", "Use antifungal medications", "Avoid sharing personal items", "Wear breathable fabrics", "Consult dermatologist"]
    },
    "Allergy": {
        "category": "Immunological", "severity": "mild",
        "specialist": "Allergist",
        "description": "An allergy is an immune reaction to substances that your body deems harmful.",
        "precautions": ["Identify and avoid allergens", "Use antihistamines", "Keep environment clean", "Carry epinephrine if severe", "Consult allergist"]
    },
    "GERD": {
        "category": "Gastrointestinal", "severity": "moderate",
        "specialist": "Gastroenterologist",
        "description": "Gastroesophageal reflux disease causes stomach acid to flow back into esophagus.",
        "precautions": ["Avoid spicy/acidic foods", "Don't lie down after eating", "Eat smaller meals", "Lose excess weight", "Take prescribed medications"]
    },
    "Chronic cholestasis": {
        "category": "Gastrointestinal", "severity": "severe",
        "specialist": "Hepatologist",
        "description": "Chronic cholestasis is a condition where bile flow from the liver is reduced or blocked.",
        "precautions": ["Follow prescribed treatment", "Avoid alcohol", "Low-fat diet", "Regular liver monitoring", "Consult hepatologist"]
    },
    "Drug Reaction": {
        "category": "Immunological", "severity": "moderate",
        "specialist": "General Physician",
        "description": "An adverse drug reaction is an unwanted response to a medication.",
        "precautions": ["Stop suspected medication", "Seek immediate medical attention", "Inform all doctors of reactions", "Carry medication alert card", "Follow up with allergist"]
    },
    "Peptic ulcer diseae": {
        "category": "Gastrointestinal", "severity": "moderate",
        "specialist": "Gastroenterologist",
        "description": "Peptic ulcers are open sores on the inner lining of the stomach or small intestine.",
        "precautions": ["Avoid NSAIDs", "Take prescribed antibiotics", "Avoid spicy foods", "Limit alcohol", "Manage stress"]
    },
    "AIDS": {
        "category": "Infectious", "severity": "critical",
        "specialist": "Infectious Disease Specialist",
        "description": "AIDS is a chronic condition caused by HIV that damages the immune system.",
        "precautions": ["Start antiretroviral therapy", "Practice safe behaviors", "Regular CD4 monitoring", "Prevent opportunistic infections", "Seek specialist care"]
    },
    "Diabetes": {
        "category": "Endocrine", "severity": "moderate",
        "specialist": "Endocrinologist",
        "description": "Diabetes occurs when the body cannot effectively use or produce enough insulin.",
        "precautions": ["Monitor blood sugar regularly", "Follow balanced diet", "Exercise regularly", "Take medications consistently", "Regular doctor check-ups"]
    },
    "Gastroenteritis": {
        "category": "Gastrointestinal", "severity": "moderate",
        "specialist": "Gastroenterologist",
        "description": "Gastroenteritis is inflammation of stomach and intestines from infection.",
        "precautions": ["Stay hydrated with ORS", "Eat bland foods", "Wash hands frequently", "Avoid contaminated food/water", "Rest until recovery"]
    },
    "Bronchial Asthma": {
        "category": "Respiratory", "severity": "moderate",
        "specialist": "Pulmonologist",
        "description": "Bronchial asthma is a condition where airways narrow, swell, and produce extra mucus.",
        "precautions": ["Use prescribed inhalers", "Avoid allergens and triggers", "Monitor with peak flow meter", "Keep rescue inhaler accessible", "Follow asthma action plan"]
    },
    "Hypertension": {
        "category": "Cardiovascular", "severity": "moderate",
        "specialist": "Cardiologist",
        "description": "Hypertension is persistently elevated blood pressure in the arteries.",
        "precautions": ["Reduce sodium intake", "Exercise 30 minutes daily", "Maintain healthy weight", "Limit alcohol", "Take BP medications as prescribed"]
    },
    "Migraine": {
        "category": "Neurological", "severity": "moderate",
        "specialist": "Neurologist",
        "description": "Migraine causes intense headaches, often with nausea and light sensitivity.",
        "precautions": ["Identify and avoid triggers", "Maintain regular sleep", "Stay hydrated", "Practice stress management", "Consult neurologist"]
    },
    "Cervical spondylosis": {
        "category": "Musculoskeletal", "severity": "moderate",
        "specialist": "Orthopedic Specialist",
        "description": "Cervical spondylosis is age-related wear and tear of the spinal disks in the neck.",
        "precautions": ["Physical therapy exercises", "Maintain good posture", "Use supportive pillow", "Pain management", "Consult orthopedic specialist"]
    },
    "Paralysis (brain hemorrhage)": {
        "category": "Neurological", "severity": "critical",
        "specialist": "Neurologist",
        "description": "Brain hemorrhage can cause paralysis due to bleeding in or around the brain.",
        "precautions": ["Call emergency services immediately", "Control blood pressure", "Rehabilitation therapy", "Regular neurological monitoring", "Prevent falls"]
    },
    "Jaundice": {
        "category": "Gastrointestinal", "severity": "moderate",
        "specialist": "Hepatologist",
        "description": "Jaundice is a yellow discoloration of the skin and eyes caused by excess bilirubin.",
        "precautions": ["Rest and stay hydrated", "Follow prescribed treatment", "Avoid alcohol", "Monitor liver function", "Eat light meals"]
    },
    "Malaria": {
        "category": "Infectious", "severity": "severe",
        "specialist": "Infectious Disease Specialist",
        "description": "Malaria is caused by parasites spread through infected mosquito bites.",
        "precautions": ["Use mosquito nets", "Take antimalarial medication", "Eliminate breeding sites", "Seek care for high fever", "Wear long-sleeved clothing"]
    },
    "Chicken pox": {
        "category": "Infectious", "severity": "mild",
        "specialist": "General Physician",
        "description": "Chickenpox is a highly contagious viral infection causing itchy blistering rash.",
        "precautions": ["Get varicella vaccine", "Isolate infected person", "Use calamine lotion", "Keep nails short", "Take antihistamines"]
    },
    "Dengue": {
        "category": "Infectious", "severity": "severe",
        "specialist": "Infectious Disease Specialist",
        "description": "Dengue fever is a mosquito-borne tropical disease causing high fever and joint pain.",
        "precautions": ["Use mosquito repellent", "Wear protective clothing", "Eliminate standing water", "Stay hydrated", "Seek care if worsening"]
    },
    "Typhoid": {
        "category": "Infectious", "severity": "severe",
        "specialist": "Infectious Disease Specialist",
        "description": "Typhoid fever is a bacterial infection causing high fever and GI symptoms.",
        "precautions": ["Drink safe water only", "Eat properly cooked food", "Get typhoid vaccine", "Wash hands frequently", "Complete antibiotic course"]
    },
    "hepatitis A": {
        "category": "Gastrointestinal", "severity": "severe",
        "specialist": "Hepatologist",
        "description": "Hepatitis A is a highly contagious liver infection caused by the hepatitis A virus.",
        "precautions": ["Get hepatitis A vaccine", "Practice good hygiene", "Avoid contaminated food/water", "Rest and stay hydrated", "Avoid alcohol"]
    },
    "Hepatitis B": {
        "category": "Gastrointestinal", "severity": "severe",
        "specialist": "Hepatologist",
        "description": "Hepatitis B is a serious liver infection caused by the hepatitis B virus.",
        "precautions": ["Get HBV vaccination", "Avoid sharing personal items", "Practice safe hygiene", "Limit alcohol", "Regular liver monitoring"]
    },
    "Hepatitis C": {
        "category": "Gastrointestinal", "severity": "severe",
        "specialist": "Hepatologist",
        "description": "Hepatitis C is a viral infection that causes liver inflammation and damage.",
        "precautions": ["Follow antiviral treatment", "Avoid alcohol", "Regular liver function tests", "Don't share needles", "Consult hepatologist"]
    },
    "Hepatitis D": {
        "category": "Gastrointestinal", "severity": "severe",
        "specialist": "Hepatologist",
        "description": "Hepatitis D is a liver infection requiring hepatitis B co-infection.",
        "precautions": ["Get hepatitis B vaccine", "Follow prescribed treatment", "Avoid alcohol", "Regular liver monitoring", "Consult specialist"]
    },
    "Hepatitis E": {
        "category": "Gastrointestinal", "severity": "severe",
        "specialist": "Hepatologist",
        "description": "Hepatitis E is a liver infection caused by hepatitis E virus, usually self-limiting.",
        "precautions": ["Drink clean water", "Practice good hygiene", "Rest and stay hydrated", "Avoid alcohol", "Monitor liver function"]
    },
    "Alcoholic hepatitis": {
        "category": "Gastrointestinal", "severity": "severe",
        "specialist": "Hepatologist",
        "description": "Alcoholic hepatitis is liver inflammation caused by excessive alcohol consumption.",
        "precautions": ["Stop alcohol consumption", "Follow prescribed treatment", "Nutritious diet", "Regular liver function tests", "Join support group"]
    },
    "Corona": {
        "category": "Infectious", "severity": "severe",
        "specialist": "Pulmonologist",
        "description": "COVID-19 is caused by the SARS-CoV-2 virus, primarily affecting the respiratory system.",
        "precautions": ["Get vaccinated", "Wear masks in crowds", "Maintain hand hygiene", "Isolate if infected", "Seek medical care if severe"]
    },
    "Common Cold": {
        "category": "Infectious", "severity": "mild",
        "specialist": "General Physician",
        "description": "The common cold is a viral infection of your nose and throat.",
        "precautions": ["Rest and stay hydrated", "Use OTC cold remedies", "Gargle with salt water", "Avoid touching your face", "Maintain good hygiene"]
    },
    "Pneumonia": {
        "category": "Respiratory", "severity": "severe",
        "specialist": "Pulmonologist",
        "description": "Pneumonia inflames air sacs in lungs, which may fill with fluid or pus.",
        "precautions": ["Seek immediate medical attention", "Complete full antibiotic course", "Get pneumococcal vaccine", "Practice good hygiene", "Avoid smoking"]
    },
    "Dimorphic hemmorhoids(piles)": {
        "category": "Gastrointestinal", "severity": "moderate",
        "specialist": "General Surgeon",
        "description": "Hemorrhoids are swollen blood vessels in the rectum or anus, causing pain and bleeding.",
        "precautions": ["Increase fiber intake", "Stay hydrated", "Avoid straining", "Use warm sitz baths", "Consult doctor for severe cases"]
    },
    "Heart attack": {
        "category": "Cardiovascular", "severity": "critical",
        "specialist": "Cardiologist",
        "description": "A heart attack occurs when blood flow to the heart is severely reduced or blocked.",
        "precautions": ["Call emergency services IMMEDIATELY", "Chew aspirin if available", "Heart-healthy lifestyle", "Take cardiac medications", "Regular checkups"]
    },
    "Varicose veins": {
        "category": "Cardiovascular", "severity": "mild",
        "specialist": "Vascular Surgeon",
        "description": "Varicose veins are enlarged, swollen, twisted veins, often appearing on legs.",
        "precautions": ["Elevate legs when resting", "Wear compression stockings", "Exercise regularly", "Avoid prolonged standing", "Consult vascular specialist"]
    },
    "Hypothyroidism": {
        "category": "Endocrine", "severity": "moderate",
        "specialist": "Endocrinologist",
        "description": "Hypothyroidism is when the thyroid doesn't produce enough hormones.",
        "precautions": ["Take thyroid hormones daily", "Monitor levels regularly", "Eat balanced diet with iodine", "Exercise regularly", "Report symptoms to doctor"]
    },
    "Hyperthyroidism": {
        "category": "Endocrine", "severity": "moderate",
        "specialist": "Endocrinologist",
        "description": "Hyperthyroidism occurs when thyroid produces too much thyroxine.",
        "precautions": ["Take anti-thyroid medications", "Monitor heart rate", "Eat calcium-rich foods", "Manage stress", "Regular thyroid tests"]
    },
    "Hypoglycemia": {
        "category": "Endocrine", "severity": "moderate",
        "specialist": "Endocrinologist",
        "description": "Hypoglycemia occurs when blood sugar drops below normal levels.",
        "precautions": ["Eat regular meals", "Carry glucose tablets", "Monitor blood sugar", "Avoid skipping meals", "Inform others of condition"]
    },
    "Osteoarthristis": {
        "category": "Musculoskeletal", "severity": "moderate",
        "specialist": "Orthopedic Specialist",
        "description": "Osteoarthritis is the most common form of arthritis, causing cartilage breakdown.",
        "precautions": ["Maintain healthy weight", "Low-impact exercise", "Joint protection", "Heat/cold therapy", "Physical therapy"]
    },
    "Arthritis": {
        "category": "Musculoskeletal", "severity": "moderate",
        "specialist": "Rheumatologist",
        "description": "Arthritis is inflammation of joints causing pain, stiffness, and swelling.",
        "precautions": ["Regular gentle exercise", "Maintain healthy weight", "Hot/cold therapy", "Take prescribed medications", "Physical therapy"]
    },
    "(vertigo) Paroymsal  Positional Vertigo": {
        "category": "Neurological", "severity": "moderate",
        "specialist": "ENT Specialist",
        "description": "BPPV causes brief episodes of dizziness related to head position changes.",
        "precautions": ["Epley maneuver exercises", "Move slowly when changing positions", "Avoid sudden head movements", "Sleep with head elevated", "Consult ENT specialist"]
    },
    "Acne": {
        "category": "Dermatological", "severity": "mild",
        "specialist": "Dermatologist",
        "description": "Acne is a skin condition occurring when hair follicles become clogged.",
        "precautions": ["Wash face gently twice daily", "Avoid touching face", "Use non-comedogenic products", "Stay hydrated", "Consult dermatologist"]
    },
    "Urinary tract infection": {
        "category": "Renal", "severity": "mild",
        "specialist": "Urologist",
        "description": "UTI is an infection in the urinary system — kidneys, bladder, ureters, or urethra.",
        "precautions": ["Drink plenty of water", "Complete antibiotics course", "Urinate frequently", "Practice good hygiene", "Drink cranberry juice"]
    },
    "Psoriasis": {
        "category": "Dermatological", "severity": "mild",
        "specialist": "Dermatologist",
        "description": "Psoriasis causes red, itchy, scaly patches on skin.",
        "precautions": ["Moisturize regularly", "Avoid skin injury", "Manage stress", "Use topical treatments", "Consider phototherapy"]
    },
    "Impetigo": {
        "category": "Infectious", "severity": "mild",
        "specialist": "Dermatologist",
        "description": "Impetigo is a highly contagious skin infection causing red sores on the face.",
        "precautions": ["Keep sores clean", "Apply prescribed antibiotics", "Don't touch or scratch sores", "Wash hands frequently", "Avoid sharing personal items"]
    }
}

# Default details for unknown diseases
DEFAULT_DETAILS = {
    "category": "General", "severity": "moderate",
    "specialist": "General Physician",
    "description": "Please consult a healthcare professional for detailed information about this condition.",
    "precautions": ["Consult a doctor", "Monitor symptoms", "Maintain a healthy lifestyle", "Stay hydrated", "Get adequate rest"]
}

SEVERITY_CONFIG = {
    "mild": {"label": "Self-Care", "color": "#6bcb77", "advice": "This condition can usually be managed at home. Monitor symptoms."},
    "moderate": {"label": "Consult Doctor", "color": "#ffd93d", "advice": "Schedule an appointment with a healthcare provider."},
    "severe": {"label": "Urgent Care", "color": "#ff9f43", "advice": "Seek medical attention as soon as possible."},
    "critical": {"label": "Emergency", "color": "#ff6b6b", "advice": "This may be a medical emergency. Contact emergency services immediately."}
}


# ─── Routes ─────────────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/symptoms")
def get_symptoms():
    """Get list of available symptoms for the frontend."""
    if not MODEL_LOADED:
        return jsonify({"error": "Model not loaded"}), 500

    # Group symptoms by body system
    symptom_groups = {
        "General": [],
        "Head & Neurological": [],
        "Respiratory": [],
        "Gastrointestinal": [],
        "Skin": [],
        "Musculoskeletal": [],
        "Urinary": [],
        "Cardiovascular": [],
        "Other": []
    }

    for raw, human in zip(symptom_columns, symptom_list_human):
        entry = {"id": raw, "name": human}

        raw_lower = raw.lower()
        if any(k in raw_lower for k in ['headache', 'dizziness', 'brain', 'visual', 'loss_of_balance',
                                        'unsteadiness', 'spinning', 'altered_sensorium', 'lack_of_concentration',
                                        'depression', 'irritability', 'coma', 'slurred_speech',
                                        'weakness_of_one_body_side', 'loss_of_smell']):
            symptom_groups["Head & Neurological"].append(entry)
        elif any(k in raw_lower for k in ['cough', 'breathlessness', 'chest_pain', 'phlegm',
                                          'throat', 'sinus', 'runny_nose', 'congestion',
                                          'mucoid_sputum', 'rusty_sputum', 'blood_in_sputum']):
            symptom_groups["Respiratory"].append(entry)
        elif any(k in raw_lower for k in ['stomach', 'vomiting', 'nausea', 'diarrhoea', 'constipation',
                                          'abdominal', 'indigestion', 'acidity', 'ulcers',
                                          'passage_of_gases', 'belly', 'liver', 'yellowish',
                                          'yellowing', 'dark_urine', 'yellow_urine',
                                          'stomach_bleeding', 'distention']):
            symptom_groups["Gastrointestinal"].append(entry)
        elif any(k in raw_lower for k in ['skin', 'itching', 'rash', 'pimples', 'blackheads',
                                          'peeling', 'dusting', 'blister', 'sore', 'crust',
                                          'patches', 'dischromic', 'inflammatory_nails',
                                          'scurring', 'small_dents', 'brittle_nails',
                                          'red_spots', 'nodal']):
            symptom_groups["Skin"].append(entry)
        elif any(k in raw_lower for k in ['joint', 'muscle', 'back_pain', 'neck_pain', 'knee',
                                          'hip', 'stiff', 'movement', 'swelling_joints',
                                          'painful_walking', 'weakness_in_limbs']):
            symptom_groups["Musculoskeletal"].append(entry)
        elif any(k in raw_lower for k in ['burning_micturition', 'spotting', 'bladder',
                                          'foul_smell', 'continuous_feel', 'polyuria',
                                          'yellow_urine']):
            symptom_groups["Urinary"].append(entry)
        elif any(k in raw_lower for k in ['heart_rate', 'palpitations', 'swollen_blood',
                                          'swollen_legs', 'prominent_veins', 'fluid_overload']):
            symptom_groups["Cardiovascular"].append(entry)
        elif any(k in raw_lower for k in ['fatigue', 'fever', 'chills', 'shivering', 'sweating',
                                          'weight', 'dehydration', 'lethargy', 'malaise',
                                          'restlessness', 'anxiety', 'mood_swings',
                                          'cold_hands', 'high_fever', 'mild_fever',
                                          'muscle_wasting', 'obesity', 'sunken_eyes',
                                          'loss_of_appetite', 'excessive_hunger',
                                          'increased_appetite', 'puffy_face',
                                          'enlarged_thyroid', 'watering_from_eyes',
                                          'swollen_extremeties']):
            symptom_groups["General"].append(entry)
        else:
            symptom_groups["Other"].append(entry)

    # Remove empty groups
    symptom_groups = {k: v for k, v in symptom_groups.items() if v}

    return jsonify({
        "groups": symptom_groups,
        "total": len(symptom_columns)
    })


@app.route("/api/predict", methods=["POST"])
def predict():
    """Predict disease based on selected symptoms."""
    if not MODEL_LOADED:
        return jsonify({"error": "Model not loaded. Run train_model.py first."}), 500

    try:
        data = request.get_json()
        selected_symptoms = data.get("symptoms", [])

        if not selected_symptoms:
            return jsonify({"error": "No symptoms selected"}), 400

        # Build feature vector (132 features, all zeros except selected)
        features = np.zeros((1, len(symptom_columns)), dtype=np.float64)
        matched_symptoms = []

        for symptom in selected_symptoms:
            if symptom in symptom_columns:
                idx = symptom_columns.index(symptom)
                features[0, idx] = 1
                matched_symptoms.append(symptom)

        if not matched_symptoms:
            return jsonify({"error": "No valid symptoms matched"}), 400

        # Get prediction probabilities
        probabilities = model.predict_proba(features)[0]

        # Get top 5 predictions
        top_indices = np.argsort(probabilities)[::-1][:5]
        predictions = []

        for idx in top_indices:
            disease_name = disease_encoder.classes_[idx]
            confidence = float(probabilities[idx])

            if confidence < 0.01:
                continue

            details = DISEASE_DETAILS.get(disease_name, DEFAULT_DETAILS)
            severity_info = SEVERITY_CONFIG.get(details["severity"], SEVERITY_CONFIG["moderate"])
            meta = disease_metadata.get(disease_name, {})

            # Get key symptoms for this disease
            key_symptoms = meta.get("key_symptoms", {})
            matching_key = [s for s in matched_symptoms if s in key_symptoms]

            predictions.append({
                "disease": disease_name,
                "confidence": round(confidence * 100, 1),
                "category": details["category"],
                "severity": details["severity"],
                "severityLabel": severity_info["label"],
                "severityColor": severity_info["color"],
                "severityAdvice": severity_info["advice"],
                "specialist": details["specialist"],
                "description": details["description"],
                "precautions": details["precautions"],
                "avgAge": meta.get("avg_age", "N/A"),
                "positiveRate": round(meta.get("positive_rate", 0) * 100, 1) if meta.get("positive_rate") else "N/A",
                "matchingSymptoms": matching_key,
                "totalKeySymptoms": len(key_symptoms)
            })

        return jsonify({
            "success": True,
            "predictions": predictions,
            "matchedSymptoms": matched_symptoms,
            "totalSymptomsSent": len(selected_symptoms),
            "modelAccuracy": round(encoding_info["model_accuracy"] * 100, 1),
            "modelType": encoding_info["model_type"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/diseases")
def get_diseases():
    """Get list of all diseases in the database."""
    diseases = []
    for name, details in DISEASE_DETAILS.items():
        meta = disease_metadata.get(name, {}) if MODEL_LOADED else {}
        severity_info = SEVERITY_CONFIG.get(details["severity"], SEVERITY_CONFIG["moderate"])
        diseases.append({
            "name": name,
            "category": details["category"],
            "severity": details["severity"],
            "severityLabel": severity_info["label"],
            "severityColor": severity_info["color"],
            "specialist": details["specialist"],
            "description": details["description"],
            "precautions": details["precautions"],
            "avgAge": meta.get("avg_age", "N/A"),
            "sampleCount": meta.get("sample_count", 0)
        })
    return jsonify(diseases)


@app.route("/api/model-info")
def model_info():
    """Get model information."""
    if not MODEL_LOADED:
        return jsonify({"loaded": False})

    return jsonify({
        "loaded": True,
        "modelType": encoding_info["model_type"],
        "accuracy": round(encoding_info["model_accuracy"] * 100, 1),
        "cvAccuracy": round(encoding_info.get("cv_accuracy", 0) * 100, 1),
        "diseaseCount": encoding_info["num_diseases"],
        "symptomCount": encoding_info["num_symptoms"],
        "trainingSize": encoding_info.get("training_samples", 0),
        "diseases": sorted(encoding_info["disease_classes"]),
        "allModelResults": encoding_info.get("all_model_results", {})
    })


# ─── Run Server ────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True, port=5000)
