
const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const axios = require('axios');
const FormData = require('form-data');

exports.getVideoTranscript = async function getVideoTranscript(filePath) {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        // Create FormData and append the file
        const formData = new FormData();
        formData.append('source', fs.createReadStream(filePath)); // Correctly append the file stream

        // Send POST request to FastAPI
        const response = await axios.post(
            `${process.env.FAST_API_URL}/api/utility/get_video_transcript`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(), // Set multipart/form-data headers
                },
            }
        );

        // console.log('Transcript received:', response.data);
    
        fs.unlinkSync(filePath);
        return response.data;

    } catch (error) {
        console.error('Error calling FastAPI API:', error.response?.data || error.message);
        throw error;
    }
}
