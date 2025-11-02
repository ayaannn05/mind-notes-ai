exports.generateSummaryFromText = (text) => {
  const prompt = `
You are a professional AI assistant tasked with summarizing text into a concise, clear, and engaging format. Your objective is to capture the core essence of the provided content, ensuring the summary is informative and well-structured.

### **Guidelines**
1. **Length**: The summary must be between **80-100 words**.
2. **Focus**:
   - Identify and include only the **main ideas** and **key concepts**.
   - Highlight the most critical points while omitting trivial details.
3. **Clarity**:
   - Use simple, straightforward language that is easy to understand.
   - Avoid complex jargon, unless necessary, and provide context when used.
4. **Structure**:
   - Ensure logical flow between ideas.
   - Present information in a clear, organized manner with no ambiguity.
5. **Style**:
   - Use present tense for consistency.
   - Avoid unnecessary repetition or filler phrases.
   - Keep sentences short and impactful.

---

### **Text to Summarize**:
${text}

---

### **Deliverable**
Generate a professional, focused summary based on the text above. The summary should:
- **Capture the essence** of the original text.
- **Prioritize clarity and flow** while adhering to the word limit.
- Be **engaging** and suitable for students or professionals seeking a quick overview.
    `;
  return prompt;
};
