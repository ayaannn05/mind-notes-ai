import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxPlus, RxMinus } from "react-icons/rx";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  const faqData = {
    heading: "Frequently Asked Questions",
    description:
      "Find answers to the most common questions about Mind Notes AI. If you need more help, feel free to contact us.",
    faqs: [
      {
        question: "What is Mind Notes AI?",
        answer:
          "Mind Notes AI is a smart note-taking platform that uses artificial intelligence to create detailed notes, flashcards, quizzes, and summaries from various content formats like YouTube videos, PDFs, text, and more.",
      },
      {
        question: "How does the free plan work?",
        answer:
          "The free plan gives you 10 credits to create notes, along with access to features like summaries, flashcards, quizzes, and PDF exports. It's perfect for getting started and trying out the platform.",
      },
      {
        question: "What formats are supported for note creation?",
        answer:
          "You can upload YouTube URLs, PDFs, text files, subtitle files, MP4 videos, and MP3 audio to generate notes. We support virtually any content format you need.",
      },
      {
        question: "What happens when I run out of credits?",
        answer:
          "You can upgrade to the Pro or Ultimate plans to get more credits and unlock premium features like advanced analytics, team collaboration tools, priority support, and more.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, we prioritize your privacy and security. Your uploaded files are encrypted using industry-standard AES-256 encryption and securely processed by our AI systems. We never share your data with third parties.",
      },
      {
        question: "Can I export my notes?",
        answer:
          "Absolutely! You can export your notes in multiple formats like PDF, Word, and Markdown, depending on your plan. Pro and Ultimate users get access to all export formats.",
      },
      {
        question: "What's included in the Pro and Ultimate plans?",
        answer:
          "The Pro plan includes 50 credits per month, advanced features, and priority support. The Ultimate plan offers unlimited credits, team collaboration tools, custom branding, API access, and 24/7 dedicated customer support.",
      },
      {
        question: "How do I get started?",
        answer:
          "Simply sign up for free, upload your content, and let Mind Notes AI generate your notes instantly. No credit card required for the free plan. It takes less than 2 minutes to get started!",
      },
    ],
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F57C05]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2269EB]/5 rounded-full blur-3xl" />
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
              <FaQuestionCircle className="w-4 h-4 text-[#F57C05]" />
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                FAQ
              </span>
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F57C05] via-[#FF8C42] to-[#2269EB] bg-clip-text text-transparent">
            {faqData.heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {faqData.description}
          </p>
        </motion.div>

        {/* FAQ Grid - Two Columns on Desktop */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqData.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-fit"
            >
              <div
                className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "shadow-xl ring-2 ring-[#F57C05] bg-gradient-to-br from-white to-orange-50/30"
                    : "shadow-md hover:shadow-lg bg-white border border-gray-200"
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex items-start justify-between text-left transition-colors duration-200"
                >
                  <span
                    className={`font-semibold text-base pr-4 ${
                      openIndex === index
                        ? "text-[#F57C05]"
                        : "text-gray-900 group-hover:text-[#F57C05]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-[#F57C05] text-white rotate-180"
                        : "bg-gray-100 text-gray-400 group-hover:bg-[#F57C05]/10 group-hover:text-[#F57C05]"
                    }`}
                  >
                    {openIndex === index ? (
                      <RxMinus className="w-4 h-4" />
                    ) : (
                      <RxPlus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F57C05]/20 to-transparent mb-4" />
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-[#F57C05]/5 to-[#2269EB]/5 border border-[#F57C05]/20">
            <FaCheckCircle className="w-12 h-12 text-[#F57C05]" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-4">
                Can't find the answer you're looking for? Our support team is
                here to help.
              </p>
              <a
                href="mailto:support@mindnotesai.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F57C05] to-[#FF8C42] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
