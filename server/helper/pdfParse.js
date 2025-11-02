const pdfParse = require('pdf-parse');
/**
 * Extract text content from a PDF file
 * @param {Buffer} pdfBuffer - The PDF file buffer
 * @returns {Promise<string>} The extracted text from the PDF
 */

exports.getPdfText = async function getPdfText(pdfBuffer) {
    try {
        const data = await pdfParse(pdfBuffer);
        const fullText = data.text;
        
        if (!fullText || fullText.trim() === '') {
            throw new Error('No text found in the PDF file');
        }
        
        return fullText;
    } catch (error) {
        throw new Error(`Error extracting PDF text: ${error.message}`);
    }
}