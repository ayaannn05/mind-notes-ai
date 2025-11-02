exports.generateFlashcardsFromText = (fullText) => {
    const outputFormat = `
    [
        {
            "id": 1,
            "front": {
                "type": "question",
                "content": "What is a React component?"
            },
            "back": {
                "type": "answer",
                "content": "A React component is a reusable piece of the user interface. It can be a function or a class that returns React elements."
            }
        },
        {
            "id": 2,
            "front": {
                "type": "term",
                "content": "Component Lifecycle"
            },
            "back": {
                "type": "definition",
                "content": "The lifecycle of a React component consists of three phases: Mounting, Updating, and Unmounting."
            }
        },
        ...
    ]
    `;
    const prompt = `
    You are an advanced AI assistant specialized in creating educational tools. Your task is to analyze the provided text and generate **10 high-quality flashcards** that will help students effectively learn and retain key concepts.

    ### **Guidelines for Flashcards**
    1. **Content**:
       - Focus on **key concepts**, **important definitions**, and **core ideas** from the text.
       - Ensure each flashcard addresses a **single, focused idea**.
    2. **Types of Flashcards**:
       - Use a mix of the following formats:
         - **Question and Answer**: Pose a question on the front and provide the answer on the back.
         - **Term and Definition**: Display a term on the front and its definition on the back.
         - **Example and Explanation**: Provide an example on the front and explain it on the back.
    3. **Clarity**:
       - Ensure the language is **simple, clear, and concise**.
       - Avoid overly complex sentences or unnecessary jargon.
    4. **Engagement**:
       - Use **examples, analogies, or visual cues** (described textually) to make the flashcards engaging.
    5. **Structure**:
       - Format the flashcards in a **structured JSON format** as follows:
       ${outputFormat}

    ### **Text to Analyze**
    ${fullText}

    ### **Deliverable**
    Generate 10 flashcards in the structured format provided above. Ensure the flashcards:
    - Cover a broad range of topics from the text.
    - Use varied formats to keep the learning process engaging.
    - Are clear, concise, and useful for students to study effectively.
    `;
    return prompt;
};