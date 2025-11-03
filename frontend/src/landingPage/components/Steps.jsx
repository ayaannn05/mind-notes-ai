import { motion } from "framer-motion";
import {
  FaFileUpload,
  FaRobot,
  FaPencilAlt,
  FaShareAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Steps = () => {
  const steps = [
    {
      title: "Upload or Link Your Content",
      description:
        "Choose your source: YouTube URL, PDF, text file, subtitle file, MP4 video, or MP3 audio. Our platform supports all major formats.",
      icon: FaFileUpload,
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      title: "Let the AI Do the Work",
      description:
        "Our advanced AI processes your content to generate detailed notes, summaries, quizzes, and flashcards in seconds.",
      icon: FaRobot,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      title: "Explore and Customize",
      description:
        "Review your notes, refine details, and interact with the AI chatbot for deeper insights and personalized learning.",
      icon: FaPencilAlt,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
    },
    {
      title: "Export or Share Your Notes",
      description:
        "Download your notes in your preferred format (PDF, Word, etc.) or share them directly with your team or classmates.",
      icon: FaShareAlt,
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-50 to-teal-50",
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#2269EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#F57C05]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F57C05]/10 to-[#2269EB]/10 rounded-full border border-[#F57C05]/20">
              <FaCheckCircle className="w-4 h-4 text-[#F57C05]" />
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Simple Process
              </span>
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            How{" "}
            <span className="bg-gradient-to-r from-[#F57C05] via-[#FF8C42] to-[#2269EB] bg-clip-text text-transparent">
              Mind Notes AI
            </span>{" "}
            Works
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Creating detailed notes has never been easier. Follow these simple
            steps to unlock the power of AI for your projects.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative mb-16 last:mb-0"
            >
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Icon Side */}
                <div className="flex-shrink-0 relative">
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 top-full transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-[#F57C05] via-[#FF8C42] to-transparent" />
                  )}

                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl`}
                  >
                    <step.icon className="w-10 h-10" />

                    {/* Number badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-900 shadow-lg border-2 border-gray-100">
                      {index + 1}
                    </div>

                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-30 -z-10`}
                    />
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <div
                    className={`p-8 rounded-2xl bg-gradient-to-br ${step.bgColor} border border-gray-200/50 hover:shadow-lg transition-shadow duration-300`}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {step.description}
                    </p>

                    {/* Decorative element */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/login"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F57C05] to-[#FF8C42] text-white font-semibold rounded-xl text-lg shadow-xl shadow-[#F57C05]/30 hover:shadow-2xl hover:shadow-[#F57C05]/40 transform hover:scale-105 transition-all duration-300"
          >
            Start Creating Notes Now
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="mt-6 text-gray-600 text-sm">
            ✨ Get your notes done faster and smarter with Mind Notes AI!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;
