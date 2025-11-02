"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/image.png";
export const Hero = () => {
  const { heading, description, buttons, tagline, image } = defaultProps;
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F57C05]/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-20 text-center lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <p className="mb-4 text-[#F57C05] font-semibold tracking-wide uppercase">
              {tagline}
            </p>
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Supercharge Your Learning with{" "}
              <span className="bg-gradient-to-r from-[#F57C05] to-[#2269EB] bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Notes!
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {buttons.map((button, index) => (
                <Link
                  key={index}
                  to={button.url}
                  className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    button.variant === "primary"
                      ? "bg-[#2269EB] text-white shadow-lg hover:shadow-[#2269EB]/30"
                      : "text-[#2269EB] hover:bg-[#2269EB]/5"
                  }`}
                >
                  {button.title}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -inset-x-20 -bottom-10 bg-gradient-to-t from-white to-transparent h-20" />
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
  tagline: "Trusted by Learners and Professionals Worldwide",
  image: {
    src: heroImage,
    alt: "AI-powered note generation platform demo video thumbnail",
  },
};
