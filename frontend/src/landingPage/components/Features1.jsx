"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaFileUpload, FaQuestionCircle, FaStickyNote, FaRobot, FaFileExport, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Features1 = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });

    return (
      <section
        ref={ref}
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F57C05] to-[#2269EB] bg-clip-text text-transparent">
              Why Choose NoteCraft AI?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Discover the unique features that make NoteCraft AI the ultimate
              tool for students, professionals, and lifelong learners. From
              generating notes to interactive learning aids, we've got you
              covered!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaFileUpload />}
              title="Create Notes from Any Format"
              description="Upload YouTube links, PDFs, subtitle files, text, MP4 videos, or MP3 audio, and let our AI transform them into detailed notes."
            />
            <FeatureCard
              icon={<FaQuestionCircle />}
              title="AI-Powered Summaries and Quizzes"
              description="Generate concise summaries and engaging quizzes tailored to your content for effective learning."
            />
            <FeatureCard
              icon={<FaStickyNote />}
              title="Flashcards for Easy Recall"
              description="AI-generated flashcards help you retain key concepts effortlessly. Perfect for quick revision!"
            />
            <FeatureCard
              icon={<FaRobot />}
              title="Interactive AI Chatbot"
              description="Ask questions, clarify concepts, or dive deeper into your notes with the help of an AI chatbot."
            />
            <FeatureCard
              icon={<FaFileExport />}
              title="Export and Share Notes"
              description="Download your notes in PDF, Word, or other formats and share them with ease."
            />
            <FeatureCard
              icon={<FaShieldAlt />}
              title="Secure and User-Friendly"
              description="Your data is encrypted and secure. Enjoy a seamless, intuitive user interface designed for productivity."
            />
          </div>

          <div className="text-center mt-16">
            <Link
              to="/login"
              className="inline-block px-8 py-4 bg-[#F57C05] text-white font-semibold rounded-lg text-lg shadow-lg hover:bg-[#E16C04] transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    );
};

const FeatureCard = ({ icon, title, description }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });
    const animatedWidth = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
    const width = useTransform(animatedWidth, [0, 1], ["0%", "100%"]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
            <div className="text-4xl text-[#F57C05] mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
            <div className="h-0.5 w-full bg-gray-100 mb-4">
                <motion.div className="h-0.5 bg-[#F57C05]" style={{ width }} />
            </div>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    );
};

export default Features1;