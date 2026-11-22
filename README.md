# HatıranYeter — AI-Powered Memory Support Application

**Samsung Innovation Campus | AI Capstone Project — Group 17**

## About the Project

HatıranYeter is an AI-powered mobile application designed to support individuals living with Alzheimer's disease or dementia and their caregivers through personalized, memory-based interactions.

The application aims to help users engage with familiar memories, people, places, and experiences through AI-generated conversation prompts.

Rather than relying on generic chatbot responses, HatıranYeter uses caregiver-provided and approved personal memories to create more meaningful and context-aware interactions.

**Note:** HatıranYeter is a supportive technology project and is not intended to diagnose, treat, or replace professional medical care.

## Project Objectives

- Develop a mobile application with an accessible, user-friendly interface.
- Build a machine learning model to classify personal memories.
- Generate personalized conversation prompts using approved memories.
- Support caregivers in organizing and managing memory information.
- Explore the potential of AI-assisted reminiscence interactions.

## Technology Stack

| Component | Technology |
|---|---|
| Mobile Application | React Native, Expo, TypeScript |
| Backend | Python, FastAPI |
| Machine Learning | Python, scikit-learn |
| NLP Baseline | TF-IDF + Logistic Regression / SVM |
| Advanced NLP (Optional) | BERTurk |
| Generative AI | Google Gemini API |
| Model Development | Google Colab |
| Version Control | Git, GitHub |

## Dataset

The project uses a custom synthetic Turkish-language dataset developed for memory classification.

Synthetic data is used during initial development to avoid exposing real personal or sensitive information.

### Memory Categories

The dataset includes six categories:

- FAMILY — Family and relationships
- CAREER — Education and professional experiences
- FOOD — Food-related memories
- HOBBY — Hobbies and personal interests
- TRAVEL — Travel and places
- OTHER — Other personal experiences

A memory can belong to multiple categories.

### Dataset Preparation

The dataset development process includes:

1. Generating synthetic user profiles and memory entries.
2. Defining a consistent JSON schema.
3. Establishing annotation and labeling guidelines.
4. Validating dataset structure and category assignments.
5. Preparing data for machine learning experiments.

## Machine Learning Approach

The planned machine learning pipeline focuses on multi-label text classification.

### Baseline Models

- TF-IDF feature extraction
- Logistic Regression
- Linear Support Vector Machine (SVM)

### Model Evaluation

The planned evaluation includes:

- Precision
- Recall
- Macro F1-score
- Micro F1-score
- Per-category performance
- Confusion matrices

Data splitting will be performed at the profile level to reduce data leakage between training and evaluation sets.

If time and computational resources allow, a BERTurk-based model may also be evaluated.

**Current status:** Dataset preparation and validation are underway. Model training and evaluation are planned next steps.

## Application Workflow

1. A caregiver creates or manages a user profile.
2. The caregiver adds personal memories.
3. Approved memories are categorized by the classification model.
4. Relevant memories are selected for personalized conversation prompts.
5. Gemini generates supportive, memory-based conversation cards.
6. The application displays these cards through a mobile interface.

The system is designed to avoid using unapproved memories and to reduce the risk of generating unsupported personal claims.

## Project Timeline

| Period | Planned Activities |
|---|---|
| November 16–22, 2026 | Repository setup, dataset preparation, documentation |
| November 23–29, 2026 | Baseline model training and evaluation |
| November 30–December 13, 2026 | Backend development and AI integration |
| December 14–28, 2026 | Mobile integration and MVP completion |
| December 29–January 4, 2027 | Testing, improvements, final presentation |

## Project Structure

```text
SIC_AI_20_Capstone_Group_17/
├── mobile/
├── data/
│   ├── synthetic/
│   └── hatiranyeter_dataset_schema.json
├── docs/
│   ├── labeling_guidelines.md
│   └── labeling_guidelines_v1_1.md
├── notebooks/
└── README.md
```

Additional directories and files will be introduced as development progresses.

## Privacy and Ethical Considerations

- Synthetic data is used during initial model development.
- Personal memories should only be used with appropriate authorization.
- Caregivers control which memories are approved.
- The application should not invent personal events or relationships.
- AI-generated content is intended for supportive interaction, not medical advice.

## Development Status

**Current phase:** Dataset preparation and machine learning development.

The project is under active development as part of the Samsung Innovation Campus AI Capstone Program.

## Team

Samsung Innovation Campus — AI Capstone Project, Group 17.