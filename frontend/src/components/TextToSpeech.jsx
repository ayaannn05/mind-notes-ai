import { useState, useEffect } from "react";
import { Button } from "antd"; // Importing Ant Design components for styling

const TextToSpeech = ({ text }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        setUtterance(u);

        return () => {
            synth.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;
        if (isPaused) {
            synth.resume();
        } else {
            synth.speak(utterance);
        }
        setIsPaused(false);
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause();
        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPaused(false);
    };

    return (
        <div className="mt-4">
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button type="primary" onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</Button>
                <Button type="default" onClick={handlePause}>Pause</Button>
                <Button type="danger" onClick={handleStop}>Stop</Button>
            </div>
        </div>
    );
};

export default TextToSpeech;