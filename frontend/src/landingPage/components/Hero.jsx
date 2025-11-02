"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/image.png";
import { FaPlay, FaCheckCircle, FaStar } from "react-icons/fa";

export const Hero = () => {
  const { heading, description, buttons, tagline, image, features, stats } =
    defaultProps;

  return (
    <section className="relative bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-12 left-10 w-72 h-72 bg-[#F57C05]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2269EB]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#F57C05]/5 to-[#2269EB]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-12 pb-16 lg:20 lg:pb-24">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-orange-100">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Join 50+ learners
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <FaStar className="w-3 h-3 fill-current" />
                <span className="text-sm font-bold text-gray-700">4.9</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-5xl text-center"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 inline-block"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F57C05]/10 to-[#2269EB]/10 rounded-full border border-[#F57C05]/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F57C05] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F57C05]"></span>
                </span>
                <span className="text-sm font-semibold bg-gradient-to-r from-[#F57C05] to-[#2269EB] bg-clip-text text-transparent uppercase tracking-wide">
                  {tagline}
                </span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              Supercharge Your Learning with{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#F57C05] via-[#FF8C42] to-[#2269EB] bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#F57C05]/20 to-[#2269EB]/20 -z-10 rounded-full"
                />
              </span>{" "}
              Notes!
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed mb-10">
              {description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
                >
                  <FaCheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {buttons.map((button, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={button.url}
                    className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 overflow-hidden ${
                      button.variant === "primary"
                        ? "bg-gradient-to-r from-[#2269EB] to-[#1557D0] text-white shadow-xl shadow-[#2269EB]/30 hover:shadow-2xl hover:shadow-[#2269EB]/40"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#2269EB] hover:text-[#2269EB] shadow-md"
                    }`}
                  >
                    {button.variant === "primary" && (
                      <span className="absolute inset-0 bg-gradient-to-r from-[#1557D0] to-[#2269EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    <span className="relative z-10">{button.title}</span>
                    {button.icon && (
                      <button.icon className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image/Demo */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-16 lg:mt-20 relative mx-auto max-w-6xl"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#F57C05]/20 via-[#2269EB]/20 to-[#F57C05]/20 rounded-3xl blur-3xl opacity-30" />

            {/* Main image container */}
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white p-2">
              <div className="aspect-video rounded-xl lg:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Play button overlay (if it's a video demo) */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:bg-white transition-all"
                  >
                    <FaPlay className="w-8 h-8 text-[#2269EB] ml-1" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="hidden lg:block absolute -left-8 top-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F57C05] to-[#FF8C42] flex items-center justify-center text-white text-2xl">
                  📚
                </div>
                <div>
                  <p className="font-bold text-gray-900">Smart Notes</p>
                  <p className="text-sm text-gray-600">Auto-generated</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="hidden lg:block absolute -right-8 bottom-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2269EB] to-[#1557D0] flex items-center justify-center text-white text-2xl">
                  ✍️
                </div>
                <div>
                  <p className="font-bold text-gray-900">AI Quiz</p>
                  <p className="text-sm text-gray-600">Practice mode</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute -inset-x-20 -bottom-20 bg-gradient-to-t from-white via-white/50 to-transparent h-32 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

const defaultProps = {
  heading: "Supercharge Your Learning with AI-Powered Notes!",
  description:
    "Effortlessly create detailed notes, flashcards, quizzes, and summaries from videos, PDFs, text, and more. Your ultimate smart note-taking companion, powered by AI!",
  buttons: [
    {
      title: "Get Started Free",
      url: "/login",
      variant: "primary",
    },
  ],
  tagline: "AI-Powered Learning Platform",
  features: ["No Credit Card Required", "Free Forever Plan", "Cancel Anytime"],
  stats: ["50,000+ Active Users", "1M+ Notes Created", "4.9★ Rating"],
  image: {
    src: heroImage,
    alt: "AI-powered note generation platform demo",
  },
};
