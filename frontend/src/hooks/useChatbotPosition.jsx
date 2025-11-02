import { useState, useEffect } from "react";

const INITIAL_POSITION_CHATBOT = {
    x: Math.min(window.innerWidth - 420, window.innerWidth - 440), // Ensure it stays within viewport
    y: Math.min(window.innerHeight - 450, window.innerHeight - 440), // Ensure it stays within viewport
    width: 400,
    height: 400,
};

export const useChatbotPosition = () => {
    const [position, setPosition] = useState(INITIAL_POSITION_CHATBOT);

    const updatePositionToBottom = () => {
        const maxY = window.innerHeight + window.scrollY - position.height - 40;
        const maxX = window.innerWidth - position.width - 40;

        setPosition((prev) => ({
            ...prev,
            x: Math.min(prev.x, maxX), // Ensure x stays within viewport
            y: Math.min(maxY, window.innerHeight - prev.height - 40), // Ensure y stays within viewport
        }));
    };

    useEffect(() => {
        const handleResize = () => {
            const { width, height } = position;
            const maxX = window.innerWidth - width - 40;
            const maxY = window.innerHeight + window.scrollY - height - 40;

            setPosition((prev) => ({
                ...prev,
                x: Math.min(prev.x, maxX),
                y: Math.min(maxY, window.innerHeight - height - 40),
            }));
        };

        const handleScroll = () => updatePositionToBottom();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        // Set initial position within viewport
        updatePositionToBottom();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [position.width, position.height]);

    return [position, setPosition];
};