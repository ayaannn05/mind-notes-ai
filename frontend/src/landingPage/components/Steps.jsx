import { motion } from "framer-motion";
import { FaFileUpload, FaRobot, FaPencilAlt, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Steps = () => {
  const steps = [
    {
      title: "1. Upload or Link Your Content",
      description: "Choose your source: YouTube URL, PDF, text file, subtitle file, MP4 video, or MP3 audio.",
      icon: FaFileUpload
    },
    {
      title: "2. Let the AI Do the Work", 
      description: "Our advanced AI processes your content to generate detailed notes, summaries, quizzes, and flashcards in seconds.",
      icon: FaRobot
    },
    {
      title: "3. Explore and Customize",
      description: "Review your notes, refine details, and interact with the AI chatbot for deeper insights.",
      icon: FaPencilAlt
    },
    {
      title: "4. Export or Share Your Notes",
      description: "Download your notes in your preferred format (PDF, Word, etc.) or share them directly with your team.",
      icon: FaShareAlt
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-[#F57C05]">Mind Notes AI</span> Works
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Creating detailed notes has never been easier. Follow these simple steps to unlock the power of AI for your projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="flex items-start mb-12">
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 bg-[#F57C05] rounded-full flex items-center justify-center text-white shadow-lg">
                    <step.icon size={24} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-[#F57C05] to-transparent" />
                  )}
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-[#F57C05] text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Start Creating Notes Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Steps;