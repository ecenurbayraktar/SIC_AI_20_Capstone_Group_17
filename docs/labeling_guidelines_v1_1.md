# HatıranYeter — Memory Category Labeling Guidelines

**Version:** 1.1  
**Date:** 2026-11-18  
**Task:** Turkish memory notes for multi-label classification  
**Allowed labels:** `FAMILY`, `CAREER`, `HOBBY`, `TRAVEL`, `FOOD`, `OTHER`

## 1. Purpose

This guide defines annotation rules for synthetic Turkish memory notes. The dataset uses **multi-label classification**: a note may receive more than one label when multiple themes are clearly and substantially present. This matches `synthetic_memories_batch_01.json` and `synthetic_memories_batch_02.json`.

Labels indicate the themes explicitly supported by the memory text, not a person's diagnosis, identity, or emotional state.

## 2. Labels

| Label | Assign when the memory meaningfully describes... |
|---|---|
| `FAMILY` | Family members, relationships, shared family experiences or family gatherings |
| `CAREER` | Work, profession, coworkers, job accomplishments or work-related training |
| `HOBBY` | Leisure interests, arts, music, sports, crafts, reading, gardening or recurring voluntary activities |
| `TRAVEL` | Journeys, vacations, exploring destinations or visiting places as an experience |
| `FOOD` | Cooking, recipes, tastes, preparing or sharing a particular food or meal |
| `OTHER` | No clear evidence for any of the above five topics |

## 3. Annotation steps

1. Read the whole memory; use only the information written in the note.
2. Select each applicable thematic label that represents a **substantial part** of the memory.
3. Do not label based only on place names, a passing reference to a relative, or a generic mention of eating.
4. Use `OTHER` **only as a standalone label**, when none of the five specific labels applies.
5. Every record must have at least one label, with no duplicate labels.
6. Record borderline cases in a separate review log rather than adding undeclared fields to training records.

## 4. Mixed-theme rules and examples

| Note | Labels | Reason |
|---|---|---|
| “Kızımla birlikte anneannemin tarifine göre çörek yapardık.” | `FAMILY`, `FOOD` | Family relationship and cooking are both substantial |
| “Eşimle Bursa'yı gezip tarihi çarşıyı dolaştık.” | `FAMILY`, `TRAVEL` | Shared family experience and a trip |
| “Mesai arkadaşlarımla iş çıkışı satranç oynardık.” | `CAREER`, `HOBBY` *only if work relationship is itself central*; otherwise `HOBBY` | Keywords alone do not determine labels |
| “Otelde kahvaltı ettikten sonra müzeyi gezdik.” | `TRAVEL` | Breakfast is incidental |
| “Her akşam kitap okurdum.” | `HOBBY` | Reading is the focus |
| “Yağmurun cama vuruşunu sessizce dinledim.” | `OTHER` | No supported specific category |

A **multi-label note is not an error**. Keep its full set of justified labels for training and evaluation.

## 5. Dataset format

```json
{
  "memories": [
    {
      "memory_id": "M051",
      "profile_id": "P001",
      "memory_text": "Okulun bahar şenliğinde öğrencilerimle hazırladığımız küçük tiyatro gösterisini izleyen aileler uzun süre alkışlamıştı.",
      "labels": ["CAREER", "HOBBY"],
      "approval_status": "approved",
      "sensitive": false,
      "source_id": "synthetic_051",
      "is_synthetic": true
    }
  ]
}
```

`approval_status: "approved"` here indicates **synthetic project data explicitly cleared for development**, not permission from real people. Real-world memories must be separately consented to and approved before appearing in caregiver or patient interfaces.

## 6. Quality assurance

- Unique `memory_id` and `source_id` across all batches
- Stable `profile_id` across related memories; profiles must not be split across training and test sets
- No exact duplicate notes or near-duplicates that leak between splits
- Valid JSON and only allowed label values
- `OTHER` never co-occurs with another label
- 8–45 words per note for the initial synthetic dataset
- Inspect rare labels, ambiguous examples, and model errors manually

## 7. Evaluation and modeling

Because these datasets contain **multi-label** targets, encode labels using `MultiLabelBinarizer`. A baseline can use TF-IDF with `OneVsRestClassifier(LogisticRegression(...))` and compare to a one-vs-rest Linear SVM. Report **macro-F1**, per-label precision and recall, and per-label confusion matrices. Use **profile-disjoint splits** to reduce leakage. With only 10 profiles and 100 synthetic memories, scores will be exploratory, not a reliable estimate of real-world performance.

## 8. Privacy and safety

This synthetic dataset contains fictional memories. For real-world use, exclude sensitive or unapproved details from generated conversation cards; trace displayed content to an approved source. The project is for supportive reminiscence and makes **no clinical diagnosis or treatment claim**.
