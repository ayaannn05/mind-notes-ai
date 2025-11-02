import { useState } from 'react';
import { motion } from 'framer-motion';
import { RxPlus, RxMinus } from "react-icons/rx";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = {
    heading: "Got Questions? We've Got Answers.",
    description: "Find answers to the most common questions about Mind Notes AI. If you need more help, feel free to contact us.",
    faqs: [
      {
        question: "What is Mind Notes AI?",
        answer: "Mind Notes AI is a smart note-taking platform that uses artificial intelligence to create detailed notes, flashcards, quizzes, and summaries from various content formats like YouTube videos, PDFs, text, and more."
      },
      {
        question: "How does the free plan work?",
        answer: "The free plan gives you 10 credits to create notes, along with access to features like summaries, flashcards, quizzes, and PDF exports."
      },
      {
        question: "What formats are supported for note creation?",
        answer: "You can upload YouTube URLs, PDFs, text files, subtitle files, MP4 videos, and MP3 audio to generate notes."
      },
      {
        question: "What happens when I run out of credits?",
        answer: "You can upgrade to the Pro or Ultimate plans to get more credits and unlock premium features like advanced analytics, team collaboration tools, and more."
      },
      {
        question: "Is my data secure?",
        answer: "Yes, we prioritize your privacy and security. Your uploaded files are encrypted and securely processed by our AI systems."
      },
      {
        question: "Can I export my notes?",
        answer: "Absolutely! You can export your notes in multiple formats like PDF, Word, and Markdown, depending on your plan."
      },
      {
        question: "What's included in the Pro and Ultimate plans?",
        answer: "The Pro plan includes 50 credits per month, advanced features, and priority support. The Ultimate plan offers unlimited credits, team collaboration tools, and 24/7 dedicated customer support."
      },
      {
        question: "How do I get started?",
        answer: "Simply sign up for free, upload your content, and let Mind Notes AI generate your notes instantly. It's that easy!"
      }
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F57C05] to-[#FF9F45] bg-clip-text text-transparent">
            {faqData.heading}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {faqData.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqData.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <div 
                className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'shadow-lg border-[#F57C05]' : 'hover:border-[#F57C05]/50'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-[#F57C05]/5 transition-colors duration-200"
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <RxMinus className="h-5 w-5 text-[#F57C05]" />
                  ) : (
                    <RxPlus className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 py-4 text-gray-600 bg-white border-t border-gray-100"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;