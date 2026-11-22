# HatıranYeter — Memory Category Labeling Guidelines

**Version:** 1.0  
**Date:** 2026-11-18  
**Task:** Classify a short Turkish memory note into one primary category.  
**Labels:** `FAMILY`, `CAREER`, `HOBBY`, `TRAVEL`, `FOOD`, `OTHER`

## 1. Purpose and scope

This document defines consistent annotation rules for **synthetic Turkish memory notes** used to develop and evaluate the first memory-category classification baseline (TF-IDF + Logistic Regression / Linear SVM). The labels describe the *topic of the memory*, not the person's identity, mood, medical condition, or the truth of the statement.

The first version is **single-label**: assign exactly one primary label to each note. Multiple themes may be mentioned, but choose the most central theme using the rules below. Record uncertain cases separately for review; do not invent extra labels.

## 2. Category definitions

| Label | Assign when the main focus is… | Example |
|---|---|---|
| `FAMILY` | Family members, family relationships, family gatherings and shared family experiences | “Her pazar annemle birlikte eski fotoğraf albümlerine bakardık.” |
| `CAREER` | Work, professional life, jobs, colleagues, career milestones or professional training | “İlk iş günümde ekip arkadaşlarım beni sıcak karşıladı.” |
| `HOBBY` | Leisure activities, artistic interests, sports, games, crafts, reading, gardening, or other personal interests | “Akşamları bahçedeki çiçeklerle ilgilenmeyi çok severdim.” |
| `TRAVEL` | Trips, holidays, journeys, excursions and exploration of places, where the visit/journey is central | “Kapadokya gezimizde sabah erkenden balonları izledik.” |
| `FOOD` | Cooking, recipes, meals, flavors and food traditions, where food is central | “Bayramda tarçınlı kurabiyeler yapıp komşulara dağıtırdık.” |
| `OTHER` | Memories whose central theme does not fit the five categories, or cannot reliably be determined | “O sabah yağmurun sesini dinlerken kendimi huzurlu hissettim.” |

## 3. Annotation workflow

1. Read the entire memory as written; do not infer missing background details.
2. Identify its **main event or emphasis**. Ask: “What is this memory primarily about?”
3. Choose exactly one label from the six allowed labels.
4. If multiple labels seem plausible, use the tie-breaking rules in Section 4.
5. If the choice remains unclear, select the best supported label and set `needs_review: true` in annotation metadata. Keep this metadata separate from text used to train the model.
6. Exclude unsafe, sensitive, or unapproved information from any user-facing conversational content (Section 7).

## 4. Tie-breaking rules

**Main emphasis beats keyword matching.** A mention of “anne,” “İzmir,” or “yemek” does not automatically imply `FAMILY`, `TRAVEL`, or `FOOD`.

- **Family + food:** If the memory is mainly about a recipe, preparing food or a meal, use `FOOD`; if it is mainly about spending time with family, use `FAMILY`.
- **Travel + family:** If the visit, route, destination or travel experience is central, use `TRAVEL`; if the relationship or family reunion is central, use `FAMILY`.
- **Career + travel:** Business trips focused on professional duties or achievements are `CAREER`; sightseeing or the journey itself is `TRAVEL`.
- **Hobby + food:** Cooking as the explicit focus is `FOOD`; other leisure activities are `HOBBY`.
- **Hobby + travel:** A journey centered on visiting places is `TRAVEL`; a recurring leisure activity (e.g., painting, chess) is `HOBBY` when it remains the main focus.
- **No clear center:** Use `OTHER` rather than selecting a category based solely on a stray word. Flag uncertain cases for review.

These rules are a **documented annotation convention**, not a claim that one interpretation is objectively correct in every case.

## 5. Ambiguous examples and decisions

| Memory note | Primary label | Why |
|---|---|---|
| “Annemle birlikte yaptığımız böreğin tarifini hâlâ hatırlıyorum.” | `FOOD` | Recipe is central |
| “Pazar kahvaltılarında bütün aile bir araya gelirdi.” | `FAMILY` | Family gathering is central |
| “Kardeşimle Antalya'ya gittiğimizde denize ilk kez girmiştim.” | `TRAVEL` | Holiday/visit is central |
| “Yıllar sonra kız kardeşimle yeniden buluştuğum günü unutamam.” | `FAMILY` | Reunion is central |
| “İş için Ankara'ya gidip ilk sunumumu yaptım.” | `CAREER` | Professional milestone is central |
| “Ankara gezisinde müzeleri dolaşıp fotoğraflar çektim.” | `TRAVEL` | Exploration is central |
| “Hafta sonları kek pişirerek dinlenirdim.” | `FOOD` | Cooking is the specific activity |
| “Hafta sonları satranç oynamayı severdim.” | `HOBBY` | Leisure activity is central |
| “Bugün gökyüzü çok güzeldi.” | `OTHER` | No listed category is central |
| “Ailem, işim ve seyahatlerim benim için önemlidir.” | `OTHER` (review) | A general statement, not one identifiable central memory |

## 6. Data-quality and evaluation rules

- Use natural Turkish with variation in length, tense, vocabulary and sentence structure. Avoid making every label identifiable from one obvious keyword.
- Generate synthetic content without copying actual private memories, names, addresses, phone numbers, medical records or other identifying data.
- Do not use near-duplicate paraphrases across training, validation and test splits.
- Keep `memory_id`, `profile_id`, `text`, `label`, `synthetic` and `approved_for_chat` as distinct fields if the dataset schema supports them. Add new fields only after checking the existing JSON schema; do not silently modify it.
- **Split by `profile_id`** so memories from one synthetic person do not appear in both training and evaluation sets. If no profile IDs exist yet, create them deliberately before splitting.
- For model reporting, use macro-F1 and a confusion matrix in addition to accuracy; report per-class support and inspect confused categories.
- With only 50–100 examples, scores may be unstable. Treat initial results as a pipeline check, not evidence of generalizable accuracy.
- Keep the final independent test set untouched during model selection and threshold tuning.

## 7. Safety and user-facing use

Category annotation **does not grant consent** to display a memory in the app. The caregiver or authorized family member should approve which memories can be used for conversation cards. Sensitive or unapproved details must not be included in generated cards or model prompts. The app is intended as a supportive reminiscence experience; do not claim that the category model diagnoses, treats or prevents dementia.

## 8. Suggested annotation record

The following is an **illustrative schema**, not a replacement for the existing dataset structure:

```json
{
  "memory_id": "synthetic_001",
  "profile_id": "profile_01",
  "text": "Kapadokya gezimizde sabah erkenden balonları izledik.",
  "label": "TRAVEL",
  "synthetic": true,
  "approved_for_chat": false,
  "needs_review": false
}
```

## 9. Annotation quality checklist

- [ ] Every memory has exactly one allowed primary label.
- [ ] Label depends on the central theme, not simply a keyword.
- [ ] Ambiguous cases are flagged and consistently resolved.
- [ ] No personal/sensitive facts are introduced accidentally.
- [ ] Approval for use in chat is independent of category assignment.
- [ ] Dataset schema stays consistent across batches.
- [ ] Future train/validation/test separation is by synthetic profile.
