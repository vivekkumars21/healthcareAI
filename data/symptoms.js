/**
 * Symptom Database - Categorized symptoms with body system grouping
 * Derived from the CSV dataset columns and expanded for comprehensive coverage.
 */

const SYMPTOM_CATEGORIES = [
  {
    id: "general",
    name: "General / Whole Body",
    icon: "🧍",
    color: "#667eea",
    symptoms: [
      { id: "fever", name: "Fever", icon: "🌡️", weight: 0.9, description: "Elevated body temperature above 98.6°F (37°C)" },
      { id: "fatigue", name: "Fatigue", icon: "😫", weight: 0.7, description: "Persistent tiredness and lack of energy" },
      { id: "weight_loss", name: "Unexplained Weight Loss", icon: "⚖️", weight: 0.6, description: "Losing weight without trying" },
      { id: "night_sweats", name: "Night Sweats", icon: "🌙", weight: 0.5, description: "Excessive sweating during sleep" },
      { id: "chills", name: "Chills", icon: "🥶", weight: 0.5, description: "Feeling cold with shivering" },
      { id: "weakness", name: "General Weakness", icon: "💫", weight: 0.6, description: "Overall body weakness and malaise" }
    ]
  },
  {
    id: "respiratory",
    name: "Chest & Respiratory",
    icon: "🫁",
    color: "#00d4aa",
    symptoms: [
      { id: "cough", name: "Cough", icon: "😷", weight: 0.8, description: "Persistent or productive cough" },
      { id: "difficultyBreathing", name: "Difficulty Breathing", icon: "😤", weight: 0.95, description: "Shortness of breath or labored breathing" },
      { id: "chest_pain", name: "Chest Pain", icon: "💔", weight: 0.9, description: "Pain or discomfort in the chest area" },
      { id: "wheezing", name: "Wheezing", icon: "🌬️", weight: 0.7, description: "High-pitched whistling sound while breathing" },
      { id: "sore_throat", name: "Sore Throat", icon: "🗣️", weight: 0.5, description: "Pain or irritation in the throat" }
    ]
  },
  {
    id: "head",
    name: "Head & Neurological",
    icon: "🧠",
    color: "#a855f7",
    symptoms: [
      { id: "headache", name: "Headache", icon: "🤕", weight: 0.6, description: "Pain in any region of the head" },
      { id: "dizziness", name: "Dizziness", icon: "😵", weight: 0.6, description: "Feeling lightheaded or unsteady" },
      { id: "confusion", name: "Confusion", icon: "😵‍💫", weight: 0.7, description: "Mental confusion or difficulty concentrating" },
      { id: "memory_loss", name: "Memory Loss", icon: "🧩", weight: 0.7, description: "Forgetfulness or difficulty remembering" },
      { id: "vision_changes", name: "Vision Changes", icon: "👁️", weight: 0.6, description: "Blurred or changed vision" }
    ]
  },
  {
    id: "digestive",
    name: "Digestive / Abdomen",
    icon: "🫃",
    color: "#f59e0b",
    symptoms: [
      { id: "nausea", name: "Nausea", icon: "🤢", weight: 0.6, description: "Feeling sick to the stomach" },
      { id: "vomiting", name: "Vomiting", icon: "🤮", weight: 0.7, description: "Forceful expulsion of stomach contents" },
      { id: "abdominal_pain", name: "Abdominal Pain", icon: "🫃", weight: 0.7, description: "Pain in the stomach or belly area" },
      { id: "diarrhea", name: "Diarrhea", icon: "💩", weight: 0.6, description: "Loose, watery stools" },
      { id: "loss_of_appetite", name: "Loss of Appetite", icon: "🍽️", weight: 0.5, description: "Reduced desire to eat" }
    ]
  },
  {
    id: "skin",
    name: "Skin & External",
    icon: "🩹",
    color: "#ec4899",
    symptoms: [
      { id: "rash", name: "Skin Rash", icon: "🔴", weight: 0.6, description: "Red, irritated, or inflamed skin" },
      { id: "itching", name: "Itching", icon: "🤚", weight: 0.5, description: "Persistent urge to scratch skin" },
      { id: "skin_discoloration", name: "Skin Discoloration", icon: "🟤", weight: 0.5, description: "Changes in skin color" },
      { id: "swelling", name: "Swelling", icon: "🎈", weight: 0.6, description: "Abnormal enlargement of body parts" },
      { id: "bruising", name: "Easy Bruising", icon: "🟣", weight: 0.5, description: "Bruises appearing easily or frequently" }
    ]
  },
  {
    id: "musculoskeletal",
    name: "Muscles & Joints",
    icon: "🦴",
    color: "#14b8a6",
    symptoms: [
      { id: "joint_pain", name: "Joint Pain", icon: "🦴", weight: 0.7, description: "Pain, stiffness, or aching in joints" },
      { id: "muscle_pain", name: "Muscle Pain", icon: "💪", weight: 0.6, description: "Aching or pain in muscles" },
      { id: "back_pain", name: "Back Pain", icon: "🔙", weight: 0.5, description: "Pain in the back or spine area" },
      { id: "stiffness", name: "Joint Stiffness", icon: "🔒", weight: 0.6, description: "Difficulty moving joints freely" },
      { id: "tremors", name: "Tremors", icon: "🫨", weight: 0.7, description: "Involuntary shaking of body parts" }
    ]
  },
  {
    id: "cardiovascular",
    name: "Heart & Blood",
    icon: "❤️",
    color: "#ef4444",
    symptoms: [
      { id: "rapid_heartbeat", name: "Rapid Heartbeat", icon: "💓", weight: 0.7, description: "Heart beating faster than normal" },
      { id: "irregular_heartbeat", name: "Irregular Heartbeat", icon: "💔", weight: 0.8, description: "Heart rhythm that is abnormal" },
      { id: "high_bp_symptom", name: "High Blood Pressure Signs", icon: "📈", weight: 0.6, description: "Headaches, nosebleeds from high BP" },
      { id: "pale_skin", name: "Pale Skin", icon: "😶", weight: 0.5, description: "Unusually pale appearance" }
    ]
  },
  {
    id: "mental",
    name: "Mental Health",
    icon: "🧘",
    color: "#8b5cf6",
    symptoms: [
      { id: "anxiety", name: "Anxiety", icon: "😰", weight: 0.6, description: "Persistent worry or nervousness" },
      { id: "depression_symptom", name: "Persistent Sadness", icon: "😢", weight: 0.7, description: "Prolonged feelings of sadness or emptiness" },
      { id: "insomnia", name: "Insomnia", icon: "😴", weight: 0.5, description: "Difficulty falling or staying asleep" },
      { id: "mood_swings", name: "Mood Swings", icon: "🎭", weight: 0.5, description: "Rapid, unexplained changes in mood" },
      { id: "loss_of_interest", name: "Loss of Interest", icon: "😐", weight: 0.6, description: "No interest in previously enjoyed activities" }
    ]
  },
  {
    id: "urinary",
    name: "Urinary & Kidney",
    icon: "🫘",
    color: "#06b6d4",
    symptoms: [
      { id: "frequent_urination", name: "Frequent Urination", icon: "🚻", weight: 0.6, description: "Needing to urinate more often than usual" },
      { id: "painful_urination", name: "Painful Urination", icon: "😣", weight: 0.7, description: "Burning or pain during urination" },
      { id: "blood_in_urine", name: "Blood in Urine", icon: "🩸", weight: 0.8, description: "Visible blood in urine (hematuria)" },
      { id: "dark_urine", name: "Dark Urine", icon: "🟫", weight: 0.5, description: "Urine that is darker than normal" }
    ]
  }
];

// Flatten all symptoms for quick lookup
const ALL_SYMPTOMS = SYMPTOM_CATEGORIES.flatMap(cat =>
  cat.symptoms.map(s => ({ ...s, category: cat.name, categoryId: cat.id, categoryColor: cat.color }))
);

// Build a quick lookup map
const SYMPTOM_MAP = {};
ALL_SYMPTOMS.forEach(s => { SYMPTOM_MAP[s.id] = s; });
