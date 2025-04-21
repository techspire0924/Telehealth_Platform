# from flask import Flask, request, jsonify
# from transformers import pipeline
# import torch
# from sentence_transformers import SentenceTransformer, util
# import numpy as np
# import pandas as pd
# import joblib
# from sklearn.preprocessing import LabelEncoder
# from flask_cors import CORS

# def predict_top_3_diseases(symptoms, model, symptoms_list, label_encoder, disease_specialist_mapping):
#     # Create an input array with zeros
#     input_data = np.zeros(len(symptoms_list))
    
#     # Set 1 for symptoms present in the input
#     for symptom in symptoms:
#         if symptom in symptoms_list:
#             index = symptoms_list.index(symptom)
#             input_data[index] = 1
    
#     # Reshape the data to match the model's expected input shape
#     input_data = input_data.reshape(1, -1)
    
#     # Make a prediction
#     prediction = model.predict(input_data)
    
#     # Get the indices of the top 3 predictions
#     top_3_indices = prediction[0].argsort()[-3:][::-1]
    
#     # Get the top 3 predicted classes and their probabilities
#     top_3_diseases = label_encoder.inverse_transform(top_3_indices)
#     top_3_probabilities = prediction[0][top_3_indices].astype(float)
    
#     # Get the specialists for the top 3 diseases
#     top_3_specialists = [disease_specialist_mapping[disease] for disease in top_3_diseases]
    
#     return list(zip(top_3_diseases, top_3_probabilities, top_3_specialists))

# def sentence_transformer(array, symptoms_list):
#     # Load a pre-trained sentence transformer model
#     model = SentenceTransformer('all-MiniLM-L6-v2')

#     def find_most_similar_symptom_sentence_transformer(extracted_symptom, symptom_list):
#         embeddings1 = model.encode(extracted_symptom, convert_to_tensor=True)
#         embeddings2 = model.encode(symptom_list, convert_to_tensor=True)

#         cosine_scores = util.pytorch_cos_sim(embeddings1, embeddings2)

#         # Find the index of the highest score
#         most_similar_idx = torch.argmax(cosine_scores).item()
#         return symptom_list[most_similar_idx]

#     extracted_symptmos = array
#     array = []
#     for symptom in extracted_symptmos:
#         most_similar_symptom = find_most_similar_symptom_sentence_transformer(symptom, symptoms_list)
#         array.append(most_similar_symptom)
#     print(array)
#     return array
  
# def NER(text):
#     pipe = pipeline("token-classification", model="Clinical-AI-Apollo/Medical-NER", aggregation_strategy='simple')
#     entities = pipe(text)

#     # Initialize variables
#     result = []
#     previous_entity = None

#     # Iterate through entities
#     for entity in entities:
#         if entity['entity_group'] in ['SIGN_SYMPTOM', 'BIOLOGICAL_STRUCTURE']:
#             if previous_entity:
#                 if (previous_entity['entity_group'] == 'BIOLOGICAL_STRUCTURE' and entity['entity_group'] == 'SIGN_SYMPTOM') or \
#                 (previous_entity['entity_group'] == 'SIGN_SYMPTOM' and entity['entity_group'] == 'BIOLOGICAL_STRUCTURE'):
#                     # Combine and add to result
#                     combined = previous_entity['word'] + ' ' + entity['word']
#                     result.append(combined)
#                     previous_entity = None  # Reset previous_entity
#                 else:
#                     result.append(previous_entity['word'])
#                     previous_entity = entity
#             else:
#                 previous_entity = entity

#     # Check if there is a remaining entity to add
#     if previous_entity:
#         result.append(previous_entity['word'])

#     print(result)
#     return result

# # Create Flask app
# app = Flask(__name__, template_folder='.')
# CORS(app)

# @app.route('/predict', methods=['POST'])
# def predict():
#     # List of all symptoms (column names in the dataset, excluding 'Disease')
#     symptoms_list = [
#         "itching", "skin_rash", "continuous_sneezing", "shivering", "stomach_pain", "acidity", 
#         "vomiting", "indigestion", "muscle_wasting", "patches_in_throat", "fatigue", "weight_loss", 
#         "sunken_eyes", "cough", "headache", "chest_pain", "back_pain", "weakness_in_limbs", "chills", 
#         "joint_pain", "yellowish_skin", "constipation", "pain_during_bowel_movements", "breathlessness", 
#         "cramps", "weight_gain", "mood_swings", "neck_pain", "muscle_weakness", "stiff_neck", 
#         "pus_filled_pimples", "burning_micturition", "bladder_discomfort", "high_fever", 
#         "nodal_skin_eruptions", "ulcers_on_tongue", "loss_of_appetite", "restlessness", "dehydration", 
#         "dizziness", "weakness_of_one_body_side", "lethargy", "nausea", "abdominal_pain", 
#         "pain_in_anal_region", "sweating", "bruising", "cold_hands_and_feets", "anxiety", "knee_pain", 
#         "swelling_joints", "blackheads", "foul_smell_of_urine", "skin_peeling", "blister", 
#         "dischromic_patches", "watering_from_eyes", "extra_marital_contacts", "diarrhoea", 
#         "loss_of_balance", "blurred_and_distorted_vision", "altered_sensorium", "dark_urine", 
#         "swelling_of_stomach", "bloody_stool", "obesity", "hip_joint_pain", "movement_stiffness", 
#         "spinning_movements", "scurring", "continuous_feel_of_urine", "silver_like_dusting", 
#         "red_sore_around_nose", "spotting_urination", "passage_of_gases", "irregular_sugar_level", 
#         "family_history", "lack_of_concentration", "excessive_hunger", "yellowing_of_eyes", 
#         "distention_of_abdomen", "irritation_in_anus", "swollen_legs", "painful_walking", 
#         "small_dents_in_nails", "yellow_crust_ooze", "internal_itching", "mucoid_sputum", 
#         "history_of_alcohol_consumption", "swollen_blood_vessels", "unsteadiness", "inflammatory_nails", 
#         "depression", "fluid_overload", "swelled_lymph_nodes", "malaise", "prominent_veins_on_calf", 
#         "puffy_face_and_eyes", "fast_heart_rate", "irritability", "muscle_pain", "mild_fever", 
#         "yellow_urine", "phlegm", "enlarged_thyroid", "increased_appetite", "visual_disturbances", 
#         "brittle_nails", "drying_and_tingling_lips", "polyuria", "pain_behind_the_eyes", 
#         "toxic_look_(typhos)", "throat_irritation", "swollen_extremeties", "slurred_speech", 
#         "red_spots_over_body", "belly_pain", "receiving_blood_transfusion", "acute_liver_failure", 
#         "redness_of_eyes", "rusty_sputum", "abnormal_menstruation", "receiving_unsterile_injections", 
#         "coma", "sinus_pressure", "palpitations", "stomach_bleeding", "runny_nose", "congestion", 
#         "blood_in_sputum", "loss_of_smell"
#     ]

#     # Load the model from the .pkl file
#     model_file = 'ann_model.pkl'
#     model = joblib.load(model_file)
    
#     # Disease to specialist mapping
#     disease_specialist_df = pd.read_csv('Doctor_Versus_Disease.csv', header=None, encoding='latin1')
#     disease_specialist_mapping = dict(zip(disease_specialist_df[0], disease_specialist_df[1]))

#     # Fit the label encoder with the list of diseases
#     label_encoder = LabelEncoder()
#     label_encoder.fit(disease_specialist_df[0])
    
#     # Get the JSON data from the request body
#     data = request.get_json()

#     # Assuming the data contains a key 'text'
#     text = data.get('text', '')

#     ner_result = NER(text)
#     symptoms_array = sentence_transformer(ner_result, symptoms_list)

#     # Predict the top 3 diseases and their specialists
#     top_3_predictions = predict_top_3_diseases(symptoms_array, model, symptoms_list, label_encoder, disease_specialist_mapping)

#     # Return the result as JSON
#     return jsonify({'predictions': top_3_predictions})

# if __name__ == '__main__':
#     app.run(debug=True)






# yo code chai 2ta prediction ko lagi ho 


# from flask import Flask, request, jsonify
# from transformers import pipeline
# import torch
# from sentence_transformers import SentenceTransformer, util
# import numpy as np
# import pandas as pd
# import joblib
# from sklearn.preprocessing import LabelEncoder
# from flask_cors import CORS

# def predict_top_2_diseases(symptoms, model, symptoms_list, label_encoder, disease_specialist_mapping):
#     # Create an input array with zeros
#     input_data = np.zeros(len(symptoms_list))
    
#     # Set 1 for symptoms present in the input
#     for symptom in symptoms:
#         if symptom in symptoms_list:
#             index = symptoms_list.index(symptom)
#             input_data[index] = 1
    
#     # Reshape the data to match the model's expected input shape
#     input_data = input_data.reshape(1, -1)
    
#     # Make a prediction
#     prediction = model.predict(input_data)
    
#     # Get the indices of the top 2 predictions
#     top_2_indices = prediction[0].argsort()[-2:][::-1]
    
#     # Get the top 2 predicted classes and their probabilities
#     top_2_diseases = label_encoder.inverse_transform(top_2_indices)
#     top_2_probabilities = prediction[0][top_2_indices].astype(float)
    
#     # Get the specialists for the top 2 diseases
#     top_2_specialists = [disease_specialist_mapping[disease] for disease in top_2_diseases]
    
#     return list(zip(top_2_diseases, top_2_probabilities, top_2_specialists))

# def sentence_transformer(array, symptoms_list):
#     # Load a pre-trained sentence transformer model
#     model = SentenceTransformer('all-MiniLM-L6-v2')

#     def find_most_similar_symptom_sentence_transformer(extracted_symptom, symptom_list):
#         embeddings1 = model.encode(extracted_symptom, convert_to_tensor=True)
#         embeddings2 = model.encode(symptom_list, convert_to_tensor=True)

#         cosine_scores = util.pytorch_cos_sim(embeddings1, embeddings2)

#         # Find the index of the highest score
#         most_similar_idx = torch.argmax(cosine_scores).item()
#         return symptom_list[most_similar_idx]

#     extracted_symptmos = array
#     array = []
#     for symptom in extracted_symptmos:
#         most_similar_symptom = find_most_similar_symptom_sentence_transformer(symptom, symptoms_list)
#         array.append(most_similar_symptom)
#     print(array)
#     return array

# def NER(text):
#     pipe = pipeline("token-classification", model="Clinical-AI-Apollo/Medical-NER", aggregation_strategy='simple')
#     entities = pipe(text)

#     # Initialize variables
#     result = []
#     previous_entity = None

#     # Iterate through entities
#     for entity in entities:
#         if entity['entity_group'] in ['SIGN_SYMPTOM', 'BIOLOGICAL_STRUCTURE']:
#             if previous_entity:
#                 if (previous_entity['entity_group'] == 'BIOLOGICAL_STRUCTURE' and entity['entity_group'] == 'SIGN_SYMPTOM') or \
#                 (previous_entity['entity_group'] == 'SIGN_SYMPTOM' and entity['entity_group'] == 'BIOLOGICAL_STRUCTURE'):
#                     # Combine and add to result
#                     combined = previous_entity['word'] + ' ' + entity['word']
#                     result.append(combined)
#                     previous_entity = None  # Reset previous_entity
#                 else:
#                     result.append(previous_entity['word'])
#                     previous_entity = entity
#             else:
#                 previous_entity = entity

#     # Check if there is a remaining entity to add
#     if previous_entity:
#         result.append(previous_entity['word'])

#     print(result)
#     return result

# # Create Flask app
# app = Flask(__name__, template_folder='.')
# CORS(app)

# @app.route('/predict', methods=['POST'])
# def predict():
#     # List of all symptoms (column names in the dataset, excluding 'Disease')
#     symptoms_list = [
#         "itching", "skin_rash", "continuous_sneezing", "shivering", "stomach_pain", "acidity", 
#         "vomiting", "indigestion", "muscle_wasting", "patches_in_throat", "fatigue", "weight_loss", 
#         "sunken_eyes", "cough", "headache", "chest_pain", "back_pain", "weakness_in_limbs", "chills", 
#         "joint_pain", "yellowish_skin", "constipation", "pain_during_bowel_movements", "breathlessness", 
#         "cramps", "weight_gain", "mood_swings", "neck_pain", "muscle_weakness", "stiff_neck", 
#         "pus_filled_pimples", "burning_micturition", "bladder_discomfort", "high_fever", 
#         "nodal_skin_eruptions", "ulcers_on_tongue", "loss_of_appetite", "restlessness", "dehydration", 
#         "dizziness", "weakness_of_one_body_side", "lethargy", "nausea", "abdominal_pain", 
#         "pain_in_anal_region", "sweating", "bruising", "cold_hands_and_feets", "anxiety", "knee_pain", 
#         "swelling_joints", "blackheads", "foul_smell_of_urine", "skin_peeling", "blister", 
#         "dischromic_patches", "watering_from_eyes", "extra_marital_contacts", "diarrhoea", 
#         "loss_of_balance", "blurred_and_distorted_vision", "altered_sensorium", "dark_urine", 
#         "swelling_of_stomach", "bloody_stool", "obesity", "hip_joint_pain", "movement_stiffness", 
#         "spinning_movements", "scurring", "continuous_feel_of_urine", "silver_like_dusting", 
#         "red_sore_around_nose", "spotting_urination", "passage_of_gases", "irregular_sugar_level", 
#         "family_history", "lack_of_concentration", "excessive_hunger", "yellowing_of_eyes", 
#         "distention_of_abdomen", "irritation_in_anus", "swollen_legs", "painful_walking", 
#         "small_dents_in_nails", "yellow_crust_ooze", "internal_itching", "mucoid_sputum", 
#         "history_of_alcohol_consumption", "swollen_blood_vessels", "unsteadiness", "inflammatory_nails", 
#         "depression", "fluid_overload", "swelled_lymph_nodes", "malaise", "prominent_veins_on_calf", 
#         "puffy_face_and_eyes", "fast_heart_rate", "irritability", "muscle_pain", "mild_fever", 
#         "yellow_urine", "phlegm", "enlarged_thyroid", "increased_appetite", "visual_disturbances", 
#         "brittle_nails", "drying_and_tingling_lips", "polyuria", "pain_behind_the_eyes", 
#         "toxic_look_(typhos)", "throat_irritation", "swollen_extremeties", "slurred_speech", 
#         "red_spots_over_body", "belly_pain", "receiving_blood_transfusion", "acute_liver_failure", 
#         "redness_of_eyes", "rusty_sputum", "abnormal_menstruation", "receiving_unsterile_injections", 
#         "coma", "sinus_pressure", "palpitations", "stomach_bleeding", "runny_nose", "congestion", 
#         "blood_in_sputum", "loss_of_smell"
#     ]

#     # Load the model from the .pkl file
#     model_file = 'ann_model.pkl'
#     model = joblib.load(model_file)
    
#     # Disease to specialist mapping
#     disease_specialist_df = pd.read_csv('Doctor_Versus_Disease.csv', header=None, encoding='latin1')
#     disease_specialist_mapping = dict(zip(disease_specialist_df[0], disease_specialist_df[1]))

#     # Fit the label encoder with the list of diseases
#     label_encoder = LabelEncoder()
#     label_encoder.fit(disease_specialist_df[0])
    
#     # Get the JSON data from the request body
#     data = request.get_json()

#     # Assuming the data contains a key 'text'
#     text = data.get('text', '')

#     ner_result = NER(text)
#     symptoms_array = sentence_transformer(ner_result, symptoms_list)

#     # Predict the top 2 diseases and their specialists
#     top_2_predictions = predict_top_2_diseases(symptoms_array, model, symptoms_list, label_encoder, disease_specialist_mapping)

#     # Return the result as JSON
#     return jsonify({'predictions': top_2_predictions})

# if __name__ == '__main__':
#     app.run(debug=True)



##################################################################################################################################################

# 2ta prediction ko lagi updated code 
# yo le ni kam garyo 

from flask import Flask, request, jsonify
from transformers import pipeline
import torch
from sentence_transformers import SentenceTransformer, util
import numpy as np
import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

def predict_top_2_diseases(symptoms, model, symptoms_list, label_encoder, disease_specialist_mapping):
    # Create an input array with zeros
    input_data = np.zeros(len(symptoms_list))
    
    # Set 1 for symptoms present in the input
    for symptom in symptoms:
        if symptom in symptoms_list:
            index = symptoms_list.index(symptom)
            input_data[index] = 1
    
    # Reshape the data to match the model's expected input shape
    input_data = input_data.reshape(1, -1)
    
    # Make a prediction
    prediction = model.predict(input_data)
    
    # Get the indices of the top 2 predictions
    top_2_indices = prediction[0].argsort()[-2:][::-1]
    
    # Get the top 2 predicted classes and their probabilities
    top_2_diseases = label_encoder.inverse_transform(top_2_indices)
    top_2_probabilities = prediction[0][top_2_indices].astype(float)
    
    # Get the specialists for the top 2 diseases
    top_2_specialists = [disease_specialist_mapping[disease] for disease in top_2_diseases]
    
    return list(zip(top_2_diseases, top_2_probabilities, top_2_specialists))

def sentence_transformer(array, symptoms_list):
    # Load a pre-trained sentence transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')

    def find_most_similar_symptom_sentence_transformer(extracted_symptom, symptom_list):
        embeddings1 = model.encode(extracted_symptom, convert_to_tensor=True)
        embeddings2 = model.encode(symptom_list, convert_to_tensor=True)

        cosine_scores = util.pytorch_cos_sim(embeddings1, embeddings2)

        # Find the index of the highest score
        most_similar_idx = torch.argmax(cosine_scores).item()
        return symptom_list[most_similar_idx]

    extracted_symptmos = array
    array = []
    for symptom in extracted_symptmos:
        most_similar_symptom = find_most_similar_symptom_sentence_transformer(symptom, symptoms_list)
        array.append(most_similar_symptom)
    print(array)
    return array

def NER(text):
    pipe = pipeline("token-classification", model="Clinical-AI-Apollo/Medical-NER", aggregation_strategy='simple')
    entities = pipe(text)

    # Initialize variables
    result = []
    previous_entity = None

    # Iterate through entities
    for entity in entities:
        if entity['entity_group'] in ['SIGN_SYMPTOM', 'BIOLOGICAL_STRUCTURE']:
            if previous_entity:
                if (previous_entity['entity_group'] == 'BIOLOGICAL_STRUCTURE' and entity['entity_group'] == 'SIGN_SYMPTOM') or \
                (previous_entity['entity_group'] == 'SIGN_SYMPTOM' and entity['entity_group'] == 'BIOLOGICAL_STRUCTURE'):
                    # Combine and add to result
                    combined = previous_entity['word'] + ' ' + entity['word']
                    result.append(combined)
                    previous_entity = None  # Reset previous_entity
                else:
                    result.append(previous_entity['word'])
                    previous_entity = entity
            else:
                previous_entity = entity

    # Check if there is a remaining entity to add
    if previous_entity:
        result.append(previous_entity['word'])

    print(result)
    return result

# Create Flask app
app = Flask(__name__, template_folder='.')
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    # List of all symptoms (column names in the dataset, excluding 'Disease')
    symptoms_list = [
        "itching", "skin_rash", "continuous_sneezing", "shivering", "stomach_pain", "acidity", 
        "vomiting", "indigestion", "muscle_wasting", "patches_in_throat", "fatigue", "weight_loss", 
        "sunken_eyes", "cough", "headache", "chest_pain", "back_pain", "weakness_in_limbs", "chills", 
        "joint_pain", "yellowish_skin", "constipation", "pain_during_bowel_movements", "breathlessness", 
        "cramps", "weight_gain", "mood_swings", "neck_pain", "muscle_weakness", "stiff_neck", 
        "pus_filled_pimples", "burning_micturition", "bladder_discomfort", "high_fever", 
        "nodal_skin_eruptions", "ulcers_on_tongue", "loss_of_appetite", "restlessness", "dehydration", 
        "dizziness", "weakness_of_one_body_side", "lethargy", "nausea", "abdominal_pain", 
        "pain_in_anal_region", "sweating", "bruising", "cold_hands_and_feets", "anxiety", "knee_pain", 
        "swelling_joints", "blackheads", "foul_smell_of_urine", "skin_peeling", "blister", 
        "dischromic_patches", "watering_from_eyes", "extra_marital_contacts", "diarrhoea", 
        "loss_of_balance", "blurred_and_distorted_vision", "altered_sensorium", "dark_urine", 
        "swelling_of_stomach", "bloody_stool", "obesity", "hip_joint_pain", "movement_stiffness", 
        "spinning_movements", "scurring", "continuous_feel_of_urine", "silver_like_dusting", 
        "red_sore_around_nose", "spotting_urination", "passage_of_gases", "irregular_sugar_level", 
        "family_history", "lack_of_concentration", "excessive_hunger", "yellowing_of_eyes", 
        "distention_of_abdomen", "irritation_in_anus", "swollen_legs", "painful_walking", 
        "small_dents_in_nails", "yellow_crust_ooze", "internal_itching", "mucoid_sputum", 
        "history_of_alcohol_consumption", "swollen_blood_vessels", "unsteadiness", "inflammatory_nails", 
        "depression", "fluid_overload", "swelled_lymph_nodes", "malaise", "prominent_veins_on_calf", 
        "puffy_face_and_eyes", "fast_heart_rate", "irritability", "muscle_pain", "mild_fever", 
        "yellow_urine", "phlegm", "enlarged_thyroid", "increased_appetite", "visual_disturbances", 
        "brittle_nails", "drying_and_tingling_lips", "polyuria", "pain_behind_the_eyes", 
        "toxic_look_(typhos)", "throat_irritation", "swollen_extremeties", "slurred_speech", 
        "red_spots_over_body", "belly_pain", "receiving_blood_transfusion", "acute_liver_failure", 
        "redness_of_eyes", "rusty_sputum", "abnormal_menstruation", "receiving_unsterile_injections", 
        "coma", "sinus_pressure", "palpitations", "stomach_bleeding", "runny_nose", "congestion", 
        "blood_in_sputum", "loss_of_smell"
    ]

    # Load the model from the .pkl file
    model_file = 'ann_model.pkl'
    model = joblib.load(model_file)
    
    # Disease to specialist mapping
    disease_specialist_df = pd.read_csv('Doctor_Versus_Disease.csv', header=None, encoding='latin1')
    disease_specialist_mapping = dict(zip(disease_specialist_df[0], disease_specialist_df[1]))

    # Fit the label encoder with the list of diseases
    label_encoder = LabelEncoder()
    label_encoder.fit(disease_specialist_df[0])
    
    # Get the JSON data from the request body
    data = request.get_json()

    # Assuming the data contains a key 'text'
    text = data.get('text', '')

    ner_result = NER(text)
    symptoms_array = sentence_transformer(ner_result, symptoms_list)

    # Predict the top 2 diseases and their specialists
    top_2_predictions = predict_top_2_diseases(symptoms_array, model, symptoms_list, label_encoder, disease_specialist_mapping)

    # Format the message based on predictions
    if len(top_2_predictions) == 2:
        disease1, probability1, specialist1 = top_2_predictions[0]
        disease2, probability2, specialist2 = top_2_predictions[1]
        message = (
            f"Based on our trained dataset and the symptoms extracted, you may be suffering from {disease1} "
            f"(Probability: {probability1:.2f}) and you should visit a {specialist1}. "
            f"Or you may be suffering from {disease2} (Probability: {probability2:.2f}) and you should visit a {specialist2}."
        )
    else:
        message = "Not enough data to predict diseases."

    # Return the result as JSON
    return jsonify({'message': message})

if __name__ == '__main__':
    app.run(debug=True)

#######################################################################################################################################################




# yo code le ni kam gardai xa
# yesko updated code try garna lako tyo tala xa yo code vanda
# yo code chai euta ko lagi kam gardai xa

# from flask import Flask, request, jsonify
# from transformers import pipeline
# import torch
# from sentence_transformers import SentenceTransformer, util
# import numpy as np
# import pandas as pd
# import joblib
# from sklearn.preprocessing import LabelEncoder
# from flask_cors import CORS

# def predict_top_disease(symptoms, model, symptoms_list, label_encoder, disease_specialist_mapping):
#     # Create an input array with zeros
#     input_data = np.zeros(len(symptoms_list))
    
#     # Set 1 for symptoms present in the input
#     for symptom in symptoms:
#         if (symptom in symptoms_list):
#             index = symptoms_list.index(symptom)
#             input_data[index] = 1
    
#     # Reshape the data to match the model's expected input shape
#     input_data = input_data.reshape(1, -1)
    
#     # Make a prediction
#     prediction = model.predict(input_data)
    
#     # Get the index of the top prediction
#     top_index = prediction[0].argmax()
    
#     # Get the top predicted class and its probability
#     top_disease = label_encoder.inverse_transform([top_index])[0]
#     top_probability = prediction[0][top_index].astype(float)
    
#     # Get the specialist for the top disease
#     top_specialist = disease_specialist_mapping[top_disease]
    
#     return top_disease, top_probability, top_specialist

# def sentence_transformer(array, symptoms_list):
#     # Load a pre-trained sentence transformer model
#     model = SentenceTransformer('all-MiniLM-L6-v2')

#     def find_most_similar_symptom_sentence_transformer(extracted_symptom, symptom_list):
#         embeddings1 = model.encode(extracted_symptom, convert_to_tensor=True)
#         embeddings2 = model.encode(symptom_list, convert_to_tensor=True)

#         cosine_scores = util.pytorch_cos_sim(embeddings1, embeddings2)

#         # Find the index of the highest score
#         most_similar_idx = torch.argmax(cosine_scores).item()
#         return symptom_list[most_similar_idx]

#     extracted_symptmos = array
#     array = []
#     for symptom in extracted_symptmos:
#         most_similar_symptom = find_most_similar_symptom_sentence_transformer(symptom, symptoms_list)
#         array.append(most_similar_symptom)
#     print(array)
#     return array

# def NER(text):
#     pipe = pipeline("token-classification", model="Clinical-AI-Apollo/Medical-NER", aggregation_strategy='simple')
#     entities = pipe(text)

#     # Initialize variables
#     result = []
#     previous_entity = None

#     # Iterate through entities
#     for entity in entities:
#         if entity['entity_group'] in ['SIGN_SYMPTOM', 'BIOLOGICAL_STRUCTURE']:
#             if previous_entity:
#                 if (previous_entity['entity_group'] == 'BIOLOGICAL_STRUCTURE' and entity['entity_group'] == 'SIGN_SYMPTOM') or \
#                 (previous_entity['entity_group'] == 'SIGN_SYMPTOM' and entity['entity_group'] == 'BIOLOGICAL_STRUCTURE'):
#                     # Combine and add to result
#                     combined = previous_entity['word'] + ' ' + entity['word']
#                     result.append(combined)
#                     previous_entity = None  # Reset previous_entity
#                 else:
#                     result.append(previous_entity['word'])
#                     previous_entity = entity
#             else:
#                 previous_entity = entity

#     # Check if there is a remaining entity to add
#     if previous_entity:
#         result.append(previous_entity['word'])

#     print(result)
#     return result

# # Create Flask app
# app = Flask(__name__, template_folder='.')
# CORS(app)

# @app.route('/predict', methods=['POST'])
# def predict():
#     # List of all symptoms (column names in the dataset, excluding 'Disease')
#     symptoms_list = [
#         "itching", "skin_rash", "continuous_sneezing", "shivering", "stomach_pain", "acidity", 
#         "vomiting", "indigestion", "muscle_wasting", "patches_in_throat", "fatigue", "weight_loss", 
#         "sunken_eyes", "cough", "headache", "chest_pain", "back_pain", "weakness_in_limbs", "chills", 
#         "joint_pain", "yellowish_skin", "constipation", "pain_during_bowel_movements", "breathlessness", 
#         "cramps", "weight_gain", "mood_swings", "neck_pain", "muscle_weakness", "stiff_neck", 
#         "pus_filled_pimples", "burning_micturition", "bladder_discomfort", "high_fever", 
#         "nodal_skin_eruptions", "ulcers_on_tongue", "loss_of_appetite", "restlessness", "dehydration", 
#         "dizziness", "weakness_of_one_body_side", "lethargy", "nausea", "abdominal_pain", 
#         "pain_in_anal_region", "sweating", "bruising", "cold_hands_and_feets", "anxiety", "knee_pain", 
#         "swelling_joints", "blackheads", "foul_smell_of_urine", "skin_peeling", "blister", 
#         "dischromic_patches", "watering_from_eyes", "extra_marital_contacts", "diarrhoea", 
#         "loss_of_balance", "blurred_and_distorted_vision", "altered_sensorium", "dark_urine", 
#         "swelling_of_stomach", "bloody_stool", "obesity", "hip_joint_pain", "movement_stiffness", 
#         "spinning_movements", "scurring", "continuous_feel_of_urine", "silver_like_dusting", 
#         "red_sore_around_nose", "spotting_urination", "passage_of_gases", "irregular_sugar_level", 
#         "family_history", "lack_of_concentration", "excessive_hunger", "yellowing_of_eyes", 
#         "distention_of_abdomen", "irritation_in_anus", "swollen_legs", "painful_walking", 
#         "small_dents_in_nails", "yellow_crust_ooze", "internal_itching", "mucoid_sputum", 
#         "history_of_alcohol_consumption", "swollen_blood_vessels", "unsteadiness", "inflammatory_nails", 
#         "depression", "fluid_overload", "swelled_lymph_nodes", "malaise", "prominent_veins_on_calf", 
#         "puffy_face_and_eyes", "fast_heart_rate", "irritability", "muscle_pain", "mild_fever", 
#         "yellow_urine", "phlegm", "enlarged_thyroid", "increased_appetite", "visual_disturbances", 
#         "brittle_nails", "drying_and_tingling_lips", "polyuria", "pain_behind_the_eyes", 
#         "toxic_look_(typhos)", "throat_irritation", "swollen_extremeties", "slurred_speech", 
#         "red_spots_over_body", "belly_pain", "receiving_blood_transfusion", "acute_liver_failure", 
#         "redness_of_eyes", "rusty_sputum", "abnormal_menstruation", "receiving_unsterile_injections", 
#         "coma", "sinus_pressure", "palpitations", "stomach_bleeding", "runny_nose", "congestion", 
#         "blood_in_sputum", "loss_of_smell"
#     ]

#     # Load the model from the .pkl file
#     model_file = 'ann_model.pkl'
#     model = joblib.load(model_file)
    
#     # Disease to specialist mapping
#     disease_specialist_df = pd.read_csv('Doctor_Versus_Disease.csv', header=None, encoding='latin1')
#     disease_specialist_mapping = dict(zip(disease_specialist_df[0], disease_specialist_df[1]))

#     # Fit the label encoder with the list of diseases
#     label_encoder = LabelEncoder()
#     label_encoder.fit(disease_specialist_df[0])
    
#     # Get the JSON data from the request body
#     data = request.get_json()

#     # Assuming the data contains a key 'text'
#     text = data.get('text', '')

#     ner_result = NER(text)
#     symptoms_array = sentence_transformer(ner_result, symptoms_list)

#     # Predict the top disease and its specialist
#     top_disease, top_probability, top_specialist = predict_top_disease(symptoms_array, model, symptoms_list, label_encoder, disease_specialist_mapping)

#     # Format the response
#     response = f"Based on the trained dataset, you may suffer from {top_disease} with a probability of {top_probability:.2f}. You may visit a {top_specialist}."

#     # Return the result as JSON
#     return jsonify({'response': response})

# if __name__ == '__main__':
#     app.run(debug=True)








