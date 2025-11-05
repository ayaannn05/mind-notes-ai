exports.generateQuizPrompt = (text) => {
  const output_format = `{
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "What is the primary concept discussed in the text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Option B",
      "explanation": "This answer is correct because the text explicitly states that...",
      "hint": "Consider the central theme presented in the opening section."
    },
    {
      "id": 2,
      "type": "true_false",
      "question": "The concept described involves both X and Y.",
      "options": ["True", "False"],
      "correct_answer": "True",
      "explanation": "The text confirms this statement in the second paragraph where it mentions...",
      "hint": "Review the relationship between X and Y as described in the middle section."
    }
  ]
}`;

  const prompt = `You are an expert educational content creator specializing in assessment design. Your task is to analyze the provided text and generate a comprehensive quiz with up to 10 questions that accurately test comprehension and reinforce learning.

## Critical Requirements

### Accuracy Standards
- **VERIFY** each correct answer against the source text before finalizing
- **CROSS-CHECK** that explanations align with the designated correct answer
- **ENSURE** options are distinct and unambiguous
- **AVOID** subjective or interpretative questions that could have multiple valid answers

### Question Types
- **Multiple Choice**: Exactly 4 options labeled A, B, C, D
- **True/False**: Exactly 2 options - "True" and "False"
- Mix both types throughout the quiz for variety

### Question Design Principles
1. **Clarity**: Use precise, unambiguous language
2. **Relevance**: Focus on key concepts and learning objectives
3. **Difficulty Progression**: Begin with foundational recall, advance to application and analysis
4. **Fairness**: Ensure questions are answerable based solely on the provided text

### Content Guidelines
- Extract questions from explicitly stated information in the text
- Prioritize important definitions, core concepts, and critical relationships
- Test understanding and application, not just memorization
- Avoid trick questions or unnecessarily complex phrasing
- Ensure all distractors (incorrect options) are plausible but clearly wrong

### Answer Components (Required for Each Question)
- **correct_answer**: Must exactly match one of the provided options
- **explanation**: Clearly state why the answer is correct with direct reference to the text
- **hint**: Provide guidance that narrows focus without revealing the answer

## Source Text
${text}

## Output Requirements
Generate a valid JSON object containing up to 10 questions that:
- Follows the exact structure shown below
- Contains no syntax errors
- Has verified correct answers
- Includes comprehensive explanations
- Provides helpful hints

**Output Format (strictly adhere to this structure):**
${output_format}

**Important**: Return ONLY valid JSON. Do not include markdown code blocks, explanatory text, or any content outside the JSON structure.`;

  return prompt;
};
