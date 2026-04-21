"""
Disease Prediction Model Training Script - Enhanced Multi-Dataset Version
Combines the large Kaggle 132-symptom dataset + the original patient profile dataset. 
Uses pandas for data manipulation and numpy for numerical operations.
"""

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
import joblib
import json
import os

print("=" * 65)
print("  MEDIPREDICT AI - Enhanced Model Training Pipeline")
print("  Using pandas + numpy + scikit-learn")
print("=" * 65)

# ─── 1. Load Primary Dataset (132 symptoms, 41 diseases, ~4920 rows) ─
print("\n[1/8] Loading primary dataset (132-symptom Kaggle dataset)...")
df_primary = pd.read_csv("datasets/Training.csv")
df_test_primary = pd.read_csv("datasets/Testing.csv")

# Clean column names
df_primary.columns = [c.strip() for c in df_primary.columns]
df_test_primary.columns = [c.strip() for c in df_test_primary.columns]

# Clean target labels
df_primary['prognosis'] = df_primary['prognosis'].str.strip()
df_test_primary['prognosis'] = df_test_primary['prognosis'].str.strip()

print(f"      Primary Training shape: {df_primary.shape}")
print(f"      Primary Testing shape:  {df_test_primary.shape}")
print(f"      Primary diseases: {df_primary['prognosis'].nunique()}")

# ─── 2. Load Secondary Dataset (original patient profile) ─────────
print("\n[2/8] Loading secondary dataset (patient profile)...")
df_secondary = pd.read_csv("Disease_symptom_and_patient_profile_dataset.csv")
df_secondary['Disease'] = df_secondary['Disease'].str.strip()
print(f"      Secondary shape: {df_secondary.shape}")
print(f"      Secondary diseases: {df_secondary['Disease'].nunique()}")

# ─── 3. Data Exploration with pandas ──────────────────────────────
print("\n[3/8] Data exploration using pandas...")

# Primary dataset distribution
disease_counts = df_primary['prognosis'].value_counts()
print(f"\n      Primary dataset disease distribution:")
print(f"      Samples per disease: {disease_counts.min()} - {disease_counts.max()}")
print(f"      Mean samples/disease: {disease_counts.mean():.0f}")

# Symptom frequency analysis using numpy
symptom_cols = [c for c in df_primary.columns if c != 'prognosis']
symptom_freqs = np.array(df_primary[symptom_cols].sum(axis=0))
top_symptom_idx = np.argsort(symptom_freqs)[::-1][:10]
print(f"\n      Top 10 most common symptoms:")
for i, idx in enumerate(top_symptom_idx):
    print(f"        {i+1}. {symptom_cols[idx]:<35} ({symptom_freqs[idx]} occurrences)")

# Calculate correlation matrix for top symptoms
print(f"\n      Symptom correlation analysis (numpy):")
X_arr = np.array(df_primary[symptom_cols], dtype=np.float64)
nonzero_cols = np.where(symptom_freqs > 0)[0]
print(f"      Active symptoms: {len(nonzero_cols)} / {len(symptom_cols)}")

# ─── 4. Prepare Data with numpy ──────────────────────────────────
print("\n[4/8] Preprocessing with pandas & numpy...")

# Primary dataset features
X_train_primary = np.array(df_primary[symptom_cols].values, dtype=np.float64)
y_train_primary = df_primary['prognosis'].values

X_test_primary = np.array(df_test_primary[symptom_cols].values, dtype=np.float64)
y_test_primary = df_test_primary['prognosis'].values

# Encode labels
disease_encoder = LabelEncoder()
y_train_encoded = disease_encoder.fit_transform(y_train_primary)
y_test_encoded = disease_encoder.transform(y_test_primary)

print(f"      X_train shape: {X_train_primary.shape}, dtype: {X_train_primary.dtype}")
print(f"      X_test shape:  {X_test_primary.shape}")
print(f"      Classes: {len(disease_encoder.classes_)}")
print(f"      NaN in training: {np.sum(np.isnan(X_train_primary))}")

# Additional split from training for validation
X_train, X_val, y_train, y_val = train_test_split(
    X_train_primary, y_train_encoded, test_size=0.15, random_state=42, stratify=y_train_encoded
)
print(f"      Train split: {X_train.shape[0]}, Validation split: {X_val.shape[0]}")

# ─── 5. Train Multiple Models ────────────────────────────────────
print("\n[5/8] Training models...")
models = {}

# Model 1: Random Forest
print("\n      [A] Random Forest Classifier...")
rf_model = RandomForestClassifier(
    n_estimators=300,
    max_depth=25,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features='sqrt',
    random_state=42,
    n_jobs=-1
)
rf_model.fit(X_train, y_train)
rf_val_acc = accuracy_score(y_val, rf_model.predict(X_val))
rf_test_acc = accuracy_score(y_test_encoded, rf_model.predict(X_test_primary))
models['Random Forest'] = {'model': rf_model, 'val_acc': rf_val_acc, 'test_acc': rf_test_acc}
print(f"          Val Accuracy: {rf_val_acc:.2%}")
print(f"          Test Accuracy: {rf_test_acc:.2%}")

# Model 2: Gradient Boosting
print("\n      [B] Gradient Boosting Classifier...")
gb_model = GradientBoostingClassifier(
    n_estimators=200,
    max_depth=10,
    learning_rate=0.15,
    subsample=0.8,
    random_state=42
)
gb_model.fit(X_train, y_train)
gb_val_acc = accuracy_score(y_val, gb_model.predict(X_val))
gb_test_acc = accuracy_score(y_test_encoded, gb_model.predict(X_test_primary))
models['Gradient Boosting'] = {'model': gb_model, 'val_acc': gb_val_acc, 'test_acc': gb_test_acc}
print(f"          Val Accuracy: {gb_val_acc:.2%}")
print(f"          Test Accuracy: {gb_test_acc:.2%}")

# Model 3: Decision Tree
print("\n      [C] Decision Tree Classifier...")
dt_model = DecisionTreeClassifier(
    max_depth=20,
    min_samples_split=5,
    random_state=42
)
dt_model.fit(X_train, y_train)
dt_val_acc = accuracy_score(y_val, dt_model.predict(X_val))
dt_test_acc = accuracy_score(y_test_encoded, dt_model.predict(X_test_primary))
models['Decision Tree'] = {'model': dt_model, 'val_acc': dt_val_acc, 'test_acc': dt_test_acc}
print(f"          Val Accuracy: {dt_val_acc:.2%}")
print(f"          Test Accuracy: {dt_test_acc:.2%}")

# ─── 6. Cross Validation ─────────────────────────────────────────
print("\n[6/8] Cross-validation (5-fold)...")
for name, data in models.items():
    cv_scores = cross_val_score(data['model'], X_train_primary, y_train_encoded, cv=5, scoring='accuracy')
    data['cv_mean'] = cv_scores.mean()
    data['cv_std'] = cv_scores.std()
    print(f"      {name:<25} CV Accuracy: {cv_scores.mean():.2%} (+/- {cv_scores.std():.4f})")

# ─── 7. Select Best Model ────────────────────────────────────────
print("\n[7/8] Selecting best model...")
best_name = max(models, key=lambda k: models[k]['test_acc'])
best_model = models[best_name]['model']
best_accuracy = models[best_name]['test_acc']
best_cv = models[best_name]['cv_mean']

print(f"      >>> Best Model: {best_name}")
print(f"      >>> Test Accuracy: {best_accuracy:.2%}")
print(f"      >>> CV Accuracy: {best_cv:.2%}")

# Feature importances (using numpy)
if hasattr(best_model, 'feature_importances_'):
    importances = np.array(best_model.feature_importances_)
    top_features_idx = np.argsort(importances)[::-1][:15]
    print(f"\n      Top 15 Feature Importances:")
    for rank, idx in enumerate(top_features_idx):
        print(f"        {rank+1:2d}. {symptom_cols[idx]:<35} {importances[idx]:.4f}")

# ─── 8. Save Model & Artifacts ───────────────────────────────────
print("\n[8/8] Saving model and artifacts...")
os.makedirs("model", exist_ok=True)

# Save model and encoder
joblib.dump(best_model, "model/disease_model.pkl")
joblib.dump(disease_encoder, "model/disease_encoder.pkl")

# Save symptom columns (needed for prediction)
with open("model/symptom_columns.json", "w") as f:
    json.dump(symptom_cols, f)

# Build disease metadata from both datasets
print("      Building disease metadata...")
disease_info = {}

# From primary dataset
for disease_name in df_primary['prognosis'].unique():
    disease_rows = df_primary[df_primary['prognosis'] == disease_name]
    
    # Calculate which symptoms are most associated with this disease
    symptom_prevalence = {}
    for col in symptom_cols:
        prevalence = float(disease_rows[col].mean())
        if prevalence > 0.3:  # Only include significant symptoms
            symptom_prevalence[col] = round(prevalence, 3)
    
    disease_info[disease_name] = {
        "sample_count": int(len(disease_rows)),
        "key_symptoms": symptom_prevalence,
        "source": "primary"
    }

# Add metadata from secondary dataset
for disease_name in df_secondary['Disease'].unique():
    disease_rows = df_secondary[df_secondary['Disease'] == disease_name]
    
    secondary_meta = {
        "avg_age": round(float(disease_rows['Age'].mean()), 1),
        "common_gender": disease_rows['Gender'].mode()[0] if len(disease_rows['Gender'].mode()) > 0 else "Both",
        "secondary_sample_count": int(len(disease_rows)),
        "positive_rate": float(disease_rows['Outcome Variable'].map({'Positive': 1, 'Negative': 0}).mean())
    }
    
    if disease_name in disease_info:
        disease_info[disease_name].update(secondary_meta)
    else:
        disease_info[disease_name] = {**secondary_meta, "source": "secondary"}

with open("model/disease_metadata.json", "w") as f:
    json.dump(disease_info, f, indent=2)

# Save encoding info
encoding_info = {
    "disease_classes": list(disease_encoder.classes_),
    "symptom_columns": symptom_cols,
    "num_symptoms": len(symptom_cols),
    "num_diseases": len(disease_encoder.classes_),
    "model_accuracy": float(best_accuracy),
    "cv_accuracy": float(best_cv),
    "model_type": best_name,
    "training_samples": int(X_train_primary.shape[0]),
    "all_model_results": {
        name: {
            "val_accuracy": float(data['val_acc']),
            "test_accuracy": float(data['test_acc']),
            "cv_accuracy": float(data['cv_mean'])
        } for name, data in models.items()
    }
}
with open("model/encoding_info.json", "w") as f:
    json.dump(encoding_info, f, indent=2)

# Save a human-readable symptom list (cleaned)
symptom_list = [s.replace('_', ' ').title() for s in symptom_cols]
with open("model/symptom_list.json", "w") as f:
    json.dump(symptom_list, f, indent=2)

print("      [OK] Model saved to model/disease_model.pkl")
print("      [OK] Encoder saved to model/disease_encoder.pkl")
print("      [OK] Symptom columns saved to model/symptom_columns.json")
print("      [OK] Metadata saved to model/disease_metadata.json")
print("      [OK] Encoding info saved to model/encoding_info.json")

# ─── Final Report ─────────────────────────────────────────────────
print("\n" + "=" * 65)
print("  TRAINING COMPLETE - FINAL REPORT")
print("=" * 65)
print(f"  Best Model:      {best_name}")
print(f"  Test Accuracy:   {best_accuracy:.2%}")
print(f"  CV Accuracy:     {best_cv:.2%}")
print(f"  Diseases:        {len(disease_encoder.classes_)}")
print(f"  Symptoms:        {len(symptom_cols)}")
print(f"  Training Data:   {X_train_primary.shape[0]} samples")
print(f"  Datasets Used:   2 (Kaggle 132-symptom + Patient Profile)")
print(f"  Libraries:       pandas={pd.__version__}, numpy={np.__version__}")
print("=" * 65)

# Classification Report
print("\n  Classification Report (Test Set):")
y_pred_final = best_model.predict(X_test_primary)
report = classification_report(y_test_encoded, y_pred_final,
                               target_names=disease_encoder.classes_,
                               output_dict=True, zero_division=0)

for name, metrics in sorted(report.items(), key=lambda x: x[1]['support'] if isinstance(x[1], dict) else 0, reverse=True):
    if isinstance(metrics, dict) and 'support' in metrics and name not in ['accuracy']:
        status = "OK" if metrics['f1-score'] >= 0.8 else "!!"
        print(f"    [{status}] {name:<42} F1:{metrics['f1-score']:.2f}  P:{metrics['precision']:.2f}  R:{metrics['recall']:.2f}")
