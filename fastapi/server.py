from fastapi import FastAPI, UploadFile, HTTPException
import os
import random
import whisper
import uvicorn

# Instantiate FastAPI app
app = FastAPI()
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/utility/get_video_transcript")
async def get_video_transcript(source: UploadFile = None):
    try:
        # Generate session ID and paths
        session_id = random.randint(100000, 999999)
        video_path = f"temp/{session_id}.mp4"
        audio_path = video_path.replace('.mp4', '.mp3')

        # Create temp directory
        os.makedirs(os.path.dirname(video_path), exist_ok=True)

        # Save the uploaded file
        with open(video_path, "wb") as f:
            f.write(source.file.read())

        # Convert video to audio using ffmpeg
        os.system(f"ffmpeg -i {video_path} -q:a 0 -map a {audio_path}")

        # Load Whisper model and transcribe
        model = whisper.load_model("base")
        try:
            result = model.transcribe(audio_path)
            full_text = result["text"]
        except Exception:
            raise HTTPException(status_code=400, detail="Error transcribing the audio file")

        # Clean up temporary files
        os.remove(video_path)
        os.remove(audio_path)

        # Return the transcription
        return full_text

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)