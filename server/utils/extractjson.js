exports.extractJsonFromLlmResponse = (responseText) => {
    try {
        // Try to parse the entire response as JSON
        return JSON.parse(responseText);
    } catch (error) {
        // If it fails, look for JSON inside code blocks or tags
        const jsonBlocks = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonBlocks && jsonBlocks[1]) {
            try {
                return JSON.parse(jsonBlocks[1].trim());
            } catch (jsonError) {
                console.error("Failed to parse JSON block:", jsonError);
            }
        }

        const outputTag = responseText.match(/<output>([\s\S]*?)<\/output>/);
        if (outputTag && outputTag[1]) {
            try {
                return JSON.parse(outputTag[1].trim());
            } catch (jsonError) {
                console.error("Failed to parse JSON from output tag:", jsonError);
            }
        }

        // Return an empty object or array if parsing fails
        return {};
    }
};

