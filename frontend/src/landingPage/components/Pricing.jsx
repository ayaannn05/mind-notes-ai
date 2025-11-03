"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import {
  FaStar,
  FaCrown,
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const Pricing = () => {
  const pricingData = {
    heading: "Simple, Transparent Pricing",
    description:
      "Choose a plan that fits your learning and productivity needs. Start free, and upgrade to unlock even more powerful features!",
    plans: [
      {
        title: "Free Plan",
        subtitle: "Perfect to get started",
        price: "₹0",
        period: "forever",
        icon: <FaRocket />,
        features: [
          "5 free credits to create notes",
          "Access to summaries, quizzes, and flashcards",
          "Export notes in PDF format",
          "AI Chatbot assistance for generated notes",
          "Community support",
        ],
        cta: {
          title: "Get Started Free",
          url: "/signup",
        },
        popular: false,
      },
      {
        title: "Pro Plan",
        subtitle: "Most popular choice",
        price: "₹99",
        period: "/month",
        icon: <FaCrown />,
        features: [
          "50 credits per month",
          "Access to advanced AI features",
          "Priority AI processing",
          "Export in multiple formats (PDF, Word, Markdown)",
          "AI Chatbot for all uploaded content",
          "Priority customer support",
          "Remove watermarks",
        ],
        cta: {
          title: "Upgrade to Pro",
          url: "/pricing",
        },
        popular: true,
      },
      {
        title: "Ultimate Plan",
        subtitle: "For power users",
        price: "₹299",
        period: "/month",
        icon: <FaStar />,
        features: [
          "Unlimited credits for note generation",
          "All Pro Plan features",
          "Team collaboration tools",
          "Advanced analytics and insights",
          "Custom branding for exports",
          "24/7 dedicated customer support",
          "API access",
          "Custom integrations",
        ],
        cta: {
          title: "Go Ultimate",
          url: "/pricing",
        },
        popular: false,
      },
    ],
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#F57C05]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#2269EB]/5 rounded-full blur-3xl" />
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
                Flexible Pricing
              </span>
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F57C05] via-[#FF8C42] to-[#2269EB] bg-clip-text text-transparent">
            {pricingData.heading}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {pricingData.description}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingData.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-br from-[#F57C05] via-[#FF8C42] to-[#FFA05A] text-white shadow-2xl scale-105 border-2 border-white"
                  : "bg-white shadow-lg hover:shadow-2xl border border-gray-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <FaStar className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Icon */}
              <div
                className={`inline-flex p-4 rounded-2xl mb-6 ${
                  plan.popular
                    ? "bg-white/20 backdrop-blur-sm"
                    : "bg-gradient-to-br from-[#F57C05]/10 to-[#2269EB]/10"
                }`}
              >
                <div
                  className={`text-3xl ${
                    plan.popular ? "text-white" : "text-[#F57C05]"
                  }`}
                >
                  {plan.icon}
                </div>
              </div>

              {/* Plan Details */}
              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? "text-white/80" : "text-gray-600"
                  }`}
                >
                  {plan.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span
                    className={`text-5xl font-bold ${
                      plan.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-lg ml-2 ${
                      plan.popular ? "text-white/80" : "text-gray-600"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-white/20" : "bg-[#F57C05]/10"
                      }`}
                    >
                      <BiCheck
                        className={`text-lg ${
                          plan.popular ? "text-white" : "text-[#F57C05]"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-white/90" : "text-gray-700"
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                to={plan.cta.url}
                className={`group w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-white text-[#F57C05] hover:bg-gray-100 hover:scale-105 shadow-lg"
                    : "bg-gradient-to-r from-[#F57C05] to-[#FF8C42] text-white hover:shadow-xl hover:scale-105"
                }`}
              >
                {plan.cta.title}
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Trusted by thousands of learners worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Secure payments</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
