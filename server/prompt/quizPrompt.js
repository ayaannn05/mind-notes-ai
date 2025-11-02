exports.generateQuizPrompt = (text) => {
    const output_format = `{
        "questions": [
            {
                "id": 1,
                "type": "multiple_choice", 
                "question": "What is the main concept discussed in the text?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_answer": "Option B",
                "explanation": "This is the correct answer because...",
                "hint": "Focus on the main idea of the first paragraph."
            },
            {
                "id": 2,
                "type": "true_false",
                "question": "True or False: The concept described involves X and Y.",
                "options": ["True", "False"], 
                "correct_answer": "True",
                "explanation": "The text clearly states this is true...",
                "hint": "Check the statement in the second paragraph."
            }
        ]
    }`;

    const prompt = `
    You are an advanced AI assistant designed to create educational content. Your task is to analyze the provided text and generate up to 10 well-crafted quiz questions that assess understanding and reinforce learning.

    ### Guidelines
    1. Question Types:
       - Only use multiple-choice and true/false question formats
       - Multiple choice should have 4 options (A-D)
       - True/false questions should have True/False options

    2. Progression:
       - Start with basic recall questions 
       - Progress to application and deeper understanding questions
       - Ensure a mix of difficulty levels

    3. Content Focus:
       - Focus on key concepts, important definitions, and critical ideas
       - Test understanding rather than pure memorization
       - Questions should be clear, unambiguous and concise
       - Avoid overly complex language

    4. Answers and Learning Support:
       - Provide the correct answer for each question
       - Include a clear explanation for why the answer is correct
       - Offer a helpful hint that guides without giving away the answer

    ### Text to Analyze:
    ${text}

    ### Deliverable
    Generate a comprehensive quiz that:
    - Contains up to 10 questions
    - Tests both basic and advanced understanding
    - Is engaging and helps students learn effectively
    - Strictly follows the JSON format below:

    ${output_format}
    `;
    return prompt;
}