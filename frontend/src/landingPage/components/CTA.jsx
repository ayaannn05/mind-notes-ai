"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaRocket, FaStar, FaUsers } from "react-icons/fa";

const CTA = () => {
  const data = {
    heading: "Ready to Transform Your Learning?",
    description:
      "Experience the power of AI to create smarter, faster, and more effective notes. Join thousands of learners and professionals who trust Mind Notes AI to supercharge their productivity.",
    buttons: [
      {
        title: "Get Started",
        url: "/login",
        variant: "primary",
      },
    ],
  };

  const stats = [
    { icon: <FaUsers />, value: "50+", label: "Active Users" },
    { icon: <FaRocket />, value: "100+", label: "Notes Created" },
    { icon: <FaStar />, value: "4.9/5", label: "User Rating" },
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#F57C05] via-[#FF8C42] to-[#FFA05A] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white">
                <FaRocket className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Start Your Journey Today
                </span>
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              {data.heading}
            </h2>

            <p className="text-lg sm:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              {data.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {data.buttons.map((button, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={button.url}
                    className={`group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      button.variant === "primary"
                        ? "bg-white text-[#F57C05] shadow-2xl hover:shadow-white/20"
                        : "bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20"
                    }`}
                  >
                    {button.title}
                    <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicator */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/80 text-sm"
            >
              ✨ No credit card required · Start free in under 2 minutes
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl group-hover:bg-white/20 transition-all duration-300" />
                <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 text-white text-2xl">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
};

export default CTA;
