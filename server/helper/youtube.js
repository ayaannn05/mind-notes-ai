// const { YoutubeTranscript } = require('youtube-transcript');
const { YoutubeTranscript } = require("@danielxceron/youtube-transcript");

/**
 * Get transcript from a YouTube video
 * @param {string} videoId - The YouTube video ID
 * @returns {Promise<string>} The full transcript text
 */
exports.getTranscript = async function getTranscript(videoId) {
  try {
    console.log(videoId);
    const transcriptList = await YoutubeTranscript.fetchTranscript(videoId);
    console.log(transcriptList);
    const fullTranscript = transcriptList.map((item) => item.text).join(" ");
    return fullTranscript;
  } catch (error) {
    if (error.message.includes("Could not find any transcripts")) {
      throw new Error("No transcript found for this video.");
    }
    throw new Error(`Error fetching transcript of the video`);
  }
};

/**
 * Extract video ID from different YouTube URL formats
 * @param {string} youtubeUrl - The YouTube URL
 * @returns {string} The video ID
 */
exports.extractVideoId = function extractVideoId(youtubeUrl) {
  const patterns = [
    /(?:v=|\/)([0-9A-Za-z_-]{11}).*/, // Standard and shared URLs
    /(?:embed\/)([0-9A-Za-z_-]{11})/, // Embed URLs
    /(?:youtu\.be\/)([0-9A-Za-z_-]{11})/, // Shortened URLs
    /(?:shorts\/)([0-9A-Za-z_-]{11})/, // YouTube Shorts
    /^([0-9A-Za-z_-]{11})$/, // Just the video ID
  ];

  youtubeUrl = youtubeUrl.trim();

  for (const pattern of patterns) {
    const match = youtubeUrl.match(pattern);
    if (match) {
      return match[1];
    }
  }

  throw new Error("Invalid YouTube URL");
};
