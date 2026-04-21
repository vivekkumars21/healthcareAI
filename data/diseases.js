/**
 * Disease Database - Generated from Disease_symptom_and_patient_profile_dataset.csv
 * Each disease has symptom patterns, demographics, risk factors, and medical information.
 */

const DISEASE_DATABASE = [
  {
    id: "influenza",
    name: "Influenza",
    category: "Infectious",
    icon: "🦠",
    severity: "moderate",
    specialist: "General Physician",
    symptoms: { fever: 0.85, cough: 0.7, fatigue: 0.8, difficultyBreathing: 0.5 },
    riskFactors: { ageRange: [19, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Influenza (flu) is a contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs.",
    precautions: [
      "Get annual flu vaccination",
      "Wash hands frequently with soap",
      "Avoid close contact with sick people",
      "Stay home when you are sick",
      "Cover coughs and sneezes"
    ],
    emergency: false
  },
  {
    id: "common_cold",
    name: "Common Cold",
    category: "Infectious",
    icon: "🤧",
    severity: "mild",
    specialist: "General Physician",
    symptoms: { fever: 0.4, cough: 0.6, fatigue: 0.5, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [5, 80], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "The common cold is a viral infection of your nose and throat. It's usually harmless, although it might not feel that way.",
    precautions: [
      "Rest and stay hydrated",
      "Use over-the-counter cold remedies",
      "Gargle with salt water",
      "Avoid touching your face",
      "Maintain good hygiene"
    ],
    emergency: false
  },
  {
    id: "asthma",
    name: "Asthma",
    category: "Respiratory",
    icon: "🫁",
    severity: "moderate",
    specialist: "Pulmonologist",
    symptoms: { fever: 0.5, cough: 0.7, fatigue: 0.4, difficultyBreathing: 0.95 },
    riskFactors: { ageRange: [5, 65], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus, making breathing difficult.",
    precautions: [
      "Use prescribed inhalers regularly",
      "Avoid known allergens and triggers",
      "Monitor breathing with a peak flow meter",
      "Keep rescue inhaler accessible",
      "Follow your asthma action plan"
    ],
    emergency: false
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    category: "Respiratory",
    icon: "🫁",
    severity: "severe",
    specialist: "Pulmonologist",
    symptoms: { fever: 0.9, cough: 0.85, fatigue: 0.8, difficultyBreathing: 0.9 },
    riskFactors: { ageRange: [20, 70], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Pneumonia is an infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus.",
    precautions: [
      "Seek immediate medical attention",
      "Complete the full course of antibiotics",
      "Get vaccinated (pneumococcal vaccine)",
      "Practice good hygiene",
      "Avoid smoking"
    ],
    emergency: true
  },
  {
    id: "bronchitis",
    name: "Bronchitis",
    category: "Respiratory",
    icon: "🫁",
    severity: "moderate",
    specialist: "Pulmonologist",
    symptoms: { fever: 0.6, cough: 0.9, fatigue: 0.7, difficultyBreathing: 0.7 },
    riskFactors: { ageRange: [25, 70], bloodPressure: "High", cholesterol: "High" },
    description: "Bronchitis is an inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.",
    precautions: [
      "Rest and drink plenty of fluids",
      "Use a humidifier",
      "Avoid smoke and air pollutants",
      "Take over-the-counter pain relievers",
      "Consult doctor if symptoms worsen"
    ],
    emergency: false
  },
  {
    id: "diabetes",
    name: "Diabetes",
    category: "Endocrine",
    icon: "💉",
    severity: "moderate",
    specialist: "Endocrinologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.7, difficultyBreathing: 0.2 },
    riskFactors: { ageRange: [25, 70], bloodPressure: "High", cholesterol: "High" },
    description: "Diabetes is a chronic disease that occurs when the body cannot effectively use insulin or doesn't produce enough.",
    precautions: [
      "Monitor blood sugar levels regularly",
      "Follow a balanced diet plan",
      "Exercise regularly",
      "Take prescribed medications consistently",
      "Regular check-ups with your doctor"
    ],
    emergency: false
  },
  {
    id: "hypertension",
    name: "Hypertension",
    category: "Cardiovascular",
    icon: "❤️",
    severity: "moderate",
    specialist: "Cardiologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.5, difficultyBreathing: 0.2 },
    riskFactors: { ageRange: [35, 80], bloodPressure: "High", cholesterol: "High" },
    description: "Hypertension (high blood pressure) is a condition where blood pressure in the arteries is persistently elevated.",
    precautions: [
      "Reduce sodium intake",
      "Exercise regularly for at least 30 minutes",
      "Maintain a healthy weight",
      "Limit alcohol consumption",
      "Take blood pressure medications as prescribed"
    ],
    emergency: false
  },
  {
    id: "migraine",
    name: "Migraine",
    category: "Neurological",
    icon: "🧠",
    severity: "moderate",
    specialist: "Neurologist",
    symptoms: { fever: 0.3, cough: 0.3, fatigue: 0.6, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [20, 70], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Migraine is a neurological condition that causes intense, debilitating headaches, often with nausea, and sensitivity to light.",
    precautions: [
      "Identify and avoid triggers",
      "Maintain regular sleep schedule",
      "Stay hydrated",
      "Practice stress management techniques",
      "Consult neurologist for preventive medications"
    ],
    emergency: false
  },
  {
    id: "eczema",
    name: "Eczema",
    category: "Dermatological",
    icon: "🩹",
    severity: "mild",
    specialist: "Dermatologist",
    symptoms: { fever: 0.2, cough: 0.3, fatigue: 0.3, difficultyBreathing: 0.0 },
    riskFactors: { ageRange: [5, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Eczema (atopic dermatitis) is a condition that causes dry, itchy, and inflamed skin. It's common in children but can occur at any age.",
    precautions: [
      "Moisturize skin regularly",
      "Avoid harsh soaps and detergents",
      "Wear soft, breathable fabrics",
      "Manage stress levels",
      "Use prescribed topical medications"
    ],
    emergency: false
  },
  {
    id: "dengue_fever",
    name: "Dengue Fever",
    category: "Infectious",
    icon: "🦟",
    severity: "severe",
    specialist: "Infectious Disease Specialist",
    symptoms: { fever: 0.95, cough: 0.1, fatigue: 0.9, difficultyBreathing: 0.2 },
    riskFactors: { ageRange: [10, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Dengue fever is a mosquito-borne tropical disease caused by the dengue virus, causing high fever, headache, and joint pain.",
    precautions: [
      "Use mosquito repellent",
      "Wear protective clothing",
      "Eliminate standing water around home",
      "Stay hydrated with fluids",
      "Seek medical care if symptoms worsen"
    ],
    emergency: true
  },
  {
    id: "stroke",
    name: "Stroke",
    category: "Cardiovascular",
    icon: "🧠",
    severity: "critical",
    specialist: "Neurologist",
    symptoms: { fever: 0.5, cough: 0.3, fatigue: 0.7, difficultyBreathing: 0.3 },
    riskFactors: { ageRange: [40, 90], bloodPressure: "High", cholesterol: "High" },
    description: "A stroke occurs when blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen.",
    precautions: [
      "Call emergency services immediately (FAST protocol)",
      "Control blood pressure and cholesterol",
      "Don't smoke",
      "Exercise regularly",
      "Manage diabetes if present"
    ],
    emergency: true
  },
  {
    id: "tuberculosis",
    name: "Tuberculosis",
    category: "Infectious",
    icon: "🦠",
    severity: "severe",
    specialist: "Pulmonologist",
    symptoms: { fever: 0.9, cough: 0.95, fatigue: 0.85, difficultyBreathing: 0.5 },
    riskFactors: { ageRange: [20, 65], bloodPressure: "High", cholesterol: "High" },
    description: "Tuberculosis (TB) is a potentially serious infectious disease that mainly affects the lungs, caused by bacteria.",
    precautions: [
      "Complete the full course of TB medication",
      "Cover mouth when coughing",
      "Ensure proper ventilation",
      "Get BCG vaccination",
      "Regular follow-up with doctor"
    ],
    emergency: true
  },
  {
    id: "malaria",
    name: "Malaria",
    category: "Infectious",
    icon: "🦟",
    severity: "severe",
    specialist: "Infectious Disease Specialist",
    symptoms: { fever: 0.95, cough: 0.1, fatigue: 0.7, difficultyBreathing: 0.2 },
    riskFactors: { ageRange: [5, 70], bloodPressure: "High", cholesterol: "High" },
    description: "Malaria is a life-threatening disease caused by Plasmodium parasites, spread through the bites of infected mosquitoes.",
    precautions: [
      "Use mosquito nets and repellents",
      "Take antimalarial medication as prescribed",
      "Eliminate mosquito breeding sites",
      "Seek immediate medical attention for high fever",
      "Wear long-sleeved clothing in endemic areas"
    ],
    emergency: true
  },
  {
    id: "depression",
    name: "Depression",
    category: "Mental Health",
    icon: "🧠",
    severity: "moderate",
    specialist: "Psychiatrist",
    symptoms: { fever: 0.2, cough: 0.1, fatigue: 0.9, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [15, 70], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Depression is a mood disorder that causes persistent feelings of sadness and loss of interest in activities.",
    precautions: [
      "Seek professional help from a therapist",
      "Stay connected with loved ones",
      "Exercise regularly",
      "Maintain a regular sleep schedule",
      "Consider medication if recommended"
    ],
    emergency: false
  },
  {
    id: "anxiety_disorders",
    name: "Anxiety Disorders",
    category: "Mental Health",
    icon: "🧠",
    severity: "moderate",
    specialist: "Psychiatrist",
    symptoms: { fever: 0.2, cough: 0.2, fatigue: 0.5, difficultyBreathing: 0.3 },
    riskFactors: { ageRange: [15, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Anxiety disorders involve excessive worry, fear, or nervousness that interferes with daily activities.",
    precautions: [
      "Practice deep breathing exercises",
      "Consider cognitive behavioral therapy",
      "Limit caffeine and alcohol",
      "Exercise regularly",
      "Establish a consistent routine"
    ],
    emergency: false
  },
  {
    id: "gastroenteritis",
    name: "Gastroenteritis",
    category: "Gastrointestinal",
    icon: "🫃",
    severity: "moderate",
    specialist: "Gastroenterologist",
    symptoms: { fever: 0.6, cough: 0.3, fatigue: 0.6, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [10, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Gastroenteritis is inflammation of the stomach and intestines, typically resulting from bacterial or viral infections.",
    precautions: [
      "Stay hydrated with oral rehydration solutions",
      "Eat bland foods when able",
      "Wash hands frequently",
      "Avoid contaminated food and water",
      "Rest until symptoms subside"
    ],
    emergency: false
  },
  {
    id: "hepatitis",
    name: "Hepatitis",
    category: "Gastrointestinal",
    icon: "🫁",
    severity: "severe",
    specialist: "Hepatologist",
    symptoms: { fever: 0.7, cough: 0.3, fatigue: 0.8, difficultyBreathing: 0.2 },
    riskFactors: { ageRange: [20, 65], bloodPressure: "High", cholesterol: "High" },
    description: "Hepatitis is inflammation of the liver, most commonly caused by viral infections (A, B, C), but also by toxins or autoimmune conditions.",
    precautions: [
      "Get vaccinated for Hepatitis A and B",
      "Avoid sharing needles or personal items",
      "Practice safe hygiene",
      "Limit alcohol consumption",
      "Follow prescribed antiviral treatment"
    ],
    emergency: false
  },
  {
    id: "kidney_disease",
    name: "Kidney Disease",
    category: "Renal",
    icon: "🫘",
    severity: "severe",
    specialist: "Nephrologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.8, difficultyBreathing: 0.3 },
    riskFactors: { ageRange: [30, 70], bloodPressure: "High", cholesterol: "High" },
    description: "Chronic kidney disease involves gradual loss of kidney function over time, affecting waste filtration.",
    precautions: [
      "Control blood pressure and diabetes",
      "Follow a kidney-friendly diet",
      "Stay hydrated appropriately",
      "Avoid NSAIDs and nephrotoxic substances",
      "Regular kidney function monitoring"
    ],
    emergency: false
  },
  {
    id: "liver_cancer",
    name: "Liver Cancer",
    category: "Oncology",
    icon: "🎗️",
    severity: "critical",
    specialist: "Oncologist",
    symptoms: { fever: 0.5, cough: 0.4, fatigue: 0.8, difficultyBreathing: 0.3 },
    riskFactors: { ageRange: [30, 70], bloodPressure: "High", cholesterol: "High" },
    description: "Liver cancer begins in the cells of the liver and can be primary (starting in the liver) or secondary (spreading from elsewhere).",
    precautions: [
      "Seek immediate oncology consultation",
      "Get regular liver function tests",
      "Limit alcohol consumption",
      "Get hepatitis B/C vaccination/treatment",
      "Maintain a healthy weight"
    ],
    emergency: true
  },
  {
    id: "osteoporosis",
    name: "Osteoporosis",
    category: "Musculoskeletal",
    icon: "🦴",
    severity: "moderate",
    specialist: "Orthopedic Specialist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.6, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [40, 80], bloodPressure: "High", cholesterol: "Normal" },
    description: "Osteoporosis is a condition that weakens bones, making them fragile and more likely to break.",
    precautions: [
      "Ensure adequate calcium and vitamin D intake",
      "Perform weight-bearing exercises",
      "Avoid smoking and excess alcohol",
      "Get bone density screening",
      "Prevent falls at home"
    ],
    emergency: false
  },
  {
    id: "rheumatoid_arthritis",
    name: "Rheumatoid Arthritis",
    category: "Musculoskeletal",
    icon: "🦴",
    severity: "moderate",
    specialist: "Rheumatologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.8, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [25, 65], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Rheumatoid arthritis is a chronic inflammatory disorder affecting the joints, causing painful swelling.",
    precautions: [
      "Take disease-modifying medications as prescribed",
      "Engage in gentle exercise regularly",
      "Apply hot/cold therapy to joints",
      "Maintain a healthy weight",
      "Regular follow-up with rheumatologist"
    ],
    emergency: false
  },
  {
    id: "osteoarthritis",
    name: "Osteoarthritis",
    category: "Musculoskeletal",
    icon: "🦴",
    severity: "moderate",
    specialist: "Orthopedic Specialist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.6, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [35, 70], bloodPressure: "High", cholesterol: "Normal" },
    description: "Osteoarthritis is the most common form of arthritis, causing cartilage breakdown in joints.",
    precautions: [
      "Maintain a healthy weight",
      "Exercise regularly with low-impact activities",
      "Use joint protection techniques",
      "Apply heat/cold therapy",
      "Consider physical therapy"
    ],
    emergency: false
  },
  {
    id: "copd",
    name: "Chronic Obstructive Pulmonary Disease (COPD)",
    category: "Respiratory",
    icon: "🫁",
    severity: "severe",
    specialist: "Pulmonologist",
    symptoms: { fever: 0.4, cough: 0.6, fatigue: 0.9, difficultyBreathing: 0.95 },
    riskFactors: { ageRange: [45, 80], bloodPressure: "High", cholesterol: "High" },
    description: "COPD is a chronic inflammatory lung disease that causes obstructed airflow from the lungs.",
    precautions: [
      "Stop smoking immediately",
      "Use inhalers as prescribed",
      "Get flu and pneumonia vaccinations",
      "Follow pulmonary rehabilitation program",
      "Avoid air pollutants"
    ],
    emergency: false
  },
  {
    id: "coronary_artery_disease",
    name: "Coronary Artery Disease",
    category: "Cardiovascular",
    icon: "❤️",
    severity: "severe",
    specialist: "Cardiologist",
    symptoms: { fever: 0.2, cough: 0.2, fatigue: 0.8, difficultyBreathing: 0.5 },
    riskFactors: { ageRange: [40, 75], bloodPressure: "High", cholesterol: "High" },
    description: "Coronary artery disease develops when the major blood vessels supplying the heart become damaged or diseased.",
    precautions: [
      "Follow a heart-healthy diet",
      "Exercise regularly",
      "Take prescribed cardiac medications",
      "Manage stress levels",
      "Monitor blood pressure and cholesterol"
    ],
    emergency: true
  },
  {
    id: "alzheimers",
    name: "Alzheimer's Disease",
    category: "Neurological",
    icon: "🧠",
    severity: "severe",
    specialist: "Neurologist",
    symptoms: { fever: 0.2, cough: 0.2, fatigue: 0.7, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [60, 90], bloodPressure: "High", cholesterol: "High" },
    description: "Alzheimer's disease is a progressive neurological disorder that causes brain cells to degenerate and die.",
    precautions: [
      "Engage in mental stimulation activities",
      "Maintain social connections",
      "Exercise regularly",
      "Follow a Mediterranean-style diet",
      "Ensure a safe home environment"
    ],
    emergency: false
  },
  {
    id: "parkinsons",
    name: "Parkinson's Disease",
    category: "Neurological",
    icon: "🧠",
    severity: "severe",
    specialist: "Neurologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.8, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [50, 80], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Parkinson's disease is a progressive nervous system disorder that affects movement, causing tremors and stiffness.",
    precautions: [
      "Take dopamine medications as prescribed",
      "Exercise regularly to improve balance",
      "Work with a physical therapist",
      "Modify home for safety",
      "Join a support group"
    ],
    emergency: false
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    category: "Dermatological",
    icon: "🩹",
    severity: "mild",
    specialist: "Dermatologist",
    symptoms: { fever: 0.2, cough: 0.2, fatigue: 0.3, difficultyBreathing: 0.0 },
    riskFactors: { ageRange: [15, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Psoriasis is a skin disease that causes red, itchy, scaly patches, most commonly on the knees, elbows, trunk, and scalp.",
    precautions: [
      "Moisturize skin regularly",
      "Avoid skin injury and irritation",
      "Manage stress",
      "Use prescribed topical treatments",
      "Consider phototherapy if recommended"
    ],
    emergency: false
  },
  {
    id: "allergic_rhinitis",
    name: "Allergic Rhinitis",
    category: "Immunological",
    icon: "🤧",
    severity: "mild",
    specialist: "Allergist",
    symptoms: { fever: 0.2, cough: 0.5, fatigue: 0.5, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [10, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Allergic rhinitis (hay fever) causes cold-like symptoms such as sneezing, itchiness, and blocked or runny nose.",
    precautions: [
      "Avoid known allergens",
      "Use antihistamines as needed",
      "Keep windows closed during high pollen days",
      "Use air purifiers indoors",
      "Consider allergy immunotherapy"
    ],
    emergency: false
  },
  {
    id: "urinary_tract_infection",
    name: "Urinary Tract Infection (UTI)",
    category: "Renal",
    icon: "🫘",
    severity: "mild",
    specialist: "Urologist",
    symptoms: { fever: 0.5, cough: 0.2, fatigue: 0.5, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [18, 70], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "A urinary tract infection is an infection in any part of the urinary system — kidneys, bladder, ureters, or urethra.",
    precautions: [
      "Drink plenty of water",
      "Complete the full course of antibiotics",
      "Urinate frequently and don't hold it",
      "Practice good hygiene",
      "Drink cranberry juice"
    ],
    emergency: false
  },
  {
    id: "hypothyroidism",
    name: "Hypothyroidism",
    category: "Endocrine",
    icon: "💉",
    severity: "moderate",
    specialist: "Endocrinologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.8, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [30, 65], bloodPressure: "High", cholesterol: "High" },
    description: "Hypothyroidism is when the thyroid gland doesn't produce enough thyroid hormones, slowing metabolism.",
    precautions: [
      "Take thyroid replacement hormones daily",
      "Monitor thyroid levels regularly",
      "Eat a balanced diet with iodine",
      "Exercise regularly",
      "Report symptoms to your endocrinologist"
    ],
    emergency: false
  },
  {
    id: "hyperthyroidism",
    name: "Hyperthyroidism",
    category: "Endocrine",
    icon: "💉",
    severity: "moderate",
    specialist: "Endocrinologist",
    symptoms: { fever: 0.4, cough: 0.3, fatigue: 0.5, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [20, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Hyperthyroidism occurs when the thyroid gland produces too much thyroxine hormone, speeding up metabolism.",
    precautions: [
      "Take anti-thyroid medications as prescribed",
      "Monitor heart rate regularly",
      "Eat calcium-rich foods",
      "Manage stress and anxiety",
      "Regular thyroid function tests"
    ],
    emergency: false
  },
  {
    id: "crohns_disease",
    name: "Crohn's Disease",
    category: "Gastrointestinal",
    icon: "🫃",
    severity: "moderate",
    specialist: "Gastroenterologist",
    symptoms: { fever: 0.4, cough: 0.2, fatigue: 0.8, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [15, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Crohn's disease is a chronic inflammatory bowel disease that affects the lining of the digestive tract.",
    precautions: [
      "Follow an anti-inflammatory diet",
      "Take prescribed immunosuppressants",
      "Manage stress levels",
      "Stay hydrated",
      "Regular colonoscopy screenings"
    ],
    emergency: false
  },
  {
    id: "ulcerative_colitis",
    name: "Ulcerative Colitis",
    category: "Gastrointestinal",
    icon: "🫃",
    severity: "moderate",
    specialist: "Gastroenterologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.7, difficultyBreathing: 0.0 },
    riskFactors: { ageRange: [15, 60], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Ulcerative colitis is an inflammatory bowel disease causing long-lasting inflammation and ulcers in the digestive tract.",
    precautions: [
      "Follow prescribed medication plan",
      "Maintain food diary to identify triggers",
      "Eat small frequent meals",
      "Manage stress",
      "Regular check-ups for colon cancer screening"
    ],
    emergency: false
  },
  {
    id: "pancreatitis",
    name: "Pancreatitis",
    category: "Gastrointestinal",
    icon: "🫃",
    severity: "severe",
    specialist: "Gastroenterologist",
    symptoms: { fever: 0.4, cough: 0.2, fatigue: 0.6, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [25, 65], bloodPressure: "High", cholesterol: "High" },
    description: "Pancreatitis is inflammation of the pancreas, causing severe abdominal pain and digestive issues.",
    precautions: [
      "Avoid alcohol completely",
      "Follow a low-fat diet",
      "Eat small frequent meals",
      "Stay hydrated",
      "Seek emergency care for severe pain"
    ],
    emergency: true
  },
  {
    id: "lung_cancer",
    name: "Lung Cancer",
    category: "Oncology",
    icon: "🎗️",
    severity: "critical",
    specialist: "Oncologist",
    symptoms: { fever: 0.5, cough: 0.7, fatigue: 0.8, difficultyBreathing: 0.5 },
    riskFactors: { ageRange: [40, 80], bloodPressure: "Normal", cholesterol: "High" },
    description: "Lung cancer is a type of cancer that begins in the lungs and is the leading cause of cancer deaths worldwide.",
    precautions: [
      "Stop smoking immediately",
      "Seek immediate oncology consultation",
      "Get regular lung screenings",
      "Avoid secondhand smoke",
      "Follow treatment plan diligently"
    ],
    emergency: true
  },
  {
    id: "kidney_cancer",
    name: "Kidney Cancer",
    category: "Oncology",
    icon: "🎗️",
    severity: "critical",
    specialist: "Oncologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.7, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [30, 70], bloodPressure: "High", cholesterol: "High" },
    description: "Kidney cancer begins in the kidneys and may spread to other organs if untreated.",
    precautions: [
      "Seek urologist/oncologist consultation",
      "Maintain healthy blood pressure",
      "Don't smoke",
      "Exercise and maintain healthy weight",
      "Regular renal function screening"
    ],
    emergency: true
  },
  {
    id: "multiple_sclerosis",
    name: "Multiple Sclerosis",
    category: "Neurological",
    icon: "🧠",
    severity: "severe",
    specialist: "Neurologist",
    symptoms: { fever: 0.2, cough: 0.2, fatigue: 0.9, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [20, 60], bloodPressure: "High", cholesterol: "High" },
    description: "Multiple sclerosis is a disease where the immune system attacks the protective covering of nerves, disrupting communication.",
    precautions: [
      "Follow disease-modifying therapy",
      "Manage fatigue with pacing activities",
      "Stay cool to avoid heat sensitivity",
      "Physical therapy and regular exercise",
      "Regular MRI monitoring"
    ],
    emergency: false
  },
  {
    id: "liver_disease",
    name: "Liver Disease",
    category: "Gastrointestinal",
    icon: "🫁",
    severity: "severe",
    specialist: "Hepatologist",
    symptoms: { fever: 0.3, cough: 0.2, fatigue: 0.8, difficultyBreathing: 0.2 },
    riskFactors: { ageRange: [30, 70], bloodPressure: "High", cholesterol: "High" },
    description: "Liver disease refers to a range of conditions that damage the liver, impacting its ability to function properly.",
    precautions: [
      "Avoid alcohol completely",
      "Maintain a healthy diet",
      "Get vaccinated for hepatitis",
      "Avoid unnecessary medications",
      "Regular liver function monitoring"
    ],
    emergency: false
  },
  {
    id: "chickenpox",
    name: "Chickenpox",
    category: "Infectious",
    icon: "🦠",
    severity: "mild",
    specialist: "General Physician",
    symptoms: { fever: 0.5, cough: 0.4, fatigue: 0.4, difficultyBreathing: 0.1 },
    riskFactors: { ageRange: [2, 50], bloodPressure: "Normal", cholesterol: "Normal" },
    description: "Chickenpox is a highly contagious viral infection causing an itchy, blister-like rash on the skin.",
    precautions: [
      "Get varicella vaccine",
      "Isolate infected person",
      "Use calamine lotion for itching",
      "Keep nails short to prevent scratching",
      "Take antihistamines for itch relief"
    ],
    emergency: false
  },
  {
    id: "cholera",
    name: "Cholera",
    category: "Infectious",
    icon: "🦠",
    severity: "critical",
    specialist: "Infectious Disease Specialist",
    symptoms: { fever: 0.6, cough: 0.1, fatigue: 0.8, difficultyBreathing: 0.3 },
    riskFactors: { ageRange: [5, 70], bloodPressure: "High", cholesterol: "High" },
    description: "Cholera is a bacterial disease causing severe diarrhea and dehydration, usually spread through contaminated water.",
    precautions: [
      "Drink only safe, clean water",
      "Wash hands with soap frequently",
      "Eat properly cooked food",
      "Oral rehydration therapy immediately",
      "Seek emergency medical care"
    ],
    emergency: true
  }
];

// Specialist types and their descriptions
const SPECIALISTS = {
  "General Physician": { icon: "👨‍⚕️", description: "Primary care for general health issues", searchTerm: "general physician near me" },
  "Pulmonologist": { icon: "🫁", description: "Specializes in lung and respiratory diseases", searchTerm: "pulmonologist near me" },
  "Cardiologist": { icon: "❤️", description: "Heart and cardiovascular system specialist", searchTerm: "cardiologist near me" },
  "Neurologist": { icon: "🧠", description: "Brain and nervous system specialist", searchTerm: "neurologist near me" },
  "Dermatologist": { icon: "🩹", description: "Skin conditions specialist", searchTerm: "dermatologist near me" },
  "Endocrinologist": { icon: "💉", description: "Hormone and metabolic disorders specialist", searchTerm: "endocrinologist near me" },
  "Gastroenterologist": { icon: "🫃", description: "Digestive system specialist", searchTerm: "gastroenterologist near me" },
  "Orthopedic Specialist": { icon: "🦴", description: "Bone, joint, and muscle specialist", searchTerm: "orthopedic doctor near me" },
  "Oncologist": { icon: "🎗️", description: "Cancer diagnosis and treatment specialist", searchTerm: "oncologist near me" },
  "Psychiatrist": { icon: "🧠", description: "Mental health specialist", searchTerm: "psychiatrist near me" },
  "Nephrologist": { icon: "🫘", description: "Kidney disease specialist", searchTerm: "nephrologist near me" },
  "Hepatologist": { icon: "🫁", description: "Liver disease specialist", searchTerm: "hepatologist near me" },
  "Rheumatologist": { icon: "🦴", description: "Autoimmune and joint disease specialist", searchTerm: "rheumatologist near me" },
  "Allergist": { icon: "🤧", description: "Allergy and immunology specialist", searchTerm: "allergist near me" },
  "Urologist": { icon: "🫘", description: "Urinary tract specialist", searchTerm: "urologist near me" },
  "Infectious Disease Specialist": { icon: "🦠", description: "Infectious disease specialist", searchTerm: "infectious disease doctor near me" }
};

// Severity triage mapping
const SEVERITY_TRIAGE = {
  mild: { label: "Self-Care", color: "#6bcb77", icon: "🟢", advice: "This condition can usually be managed at home. Monitor symptoms and consult a doctor if they worsen." },
  moderate: { label: "Consult Doctor", color: "#ffd93d", icon: "🟡", advice: "Please schedule an appointment with a healthcare provider for proper evaluation and treatment." },
  severe: { label: "Urgent Care", color: "#ff9f43", icon: "🟠", advice: "Seek medical attention as soon as possible. Do not delay treatment." },
  critical: { label: "Emergency", color: "#ff6b6b", icon: "🔴", advice: "This may be a medical emergency. Please contact emergency services or go to the nearest emergency room immediately." }
};
