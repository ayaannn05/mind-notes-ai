"use client";
import { Link } from "react-router-dom";

const CTA = () => {
  const data = {
    heading: "Ready to Transform Your Learning?",
    description: "Experience the power of AI to create smarter, faster, and more effective notes. Join thousands of learners and professionals who trust NoteCraft AI to supercharge their productivity.",
    buttons: [
      {
        title: "Get Started for Free",
        url: "/login",
        variant: "primary"
      },
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#F57C05]/10 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F57C05] to-[#FF9F45] blur-xl opacity-20 rounded-full"></div>
            <h2 className="relative text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F57C05] to-[#FF9F45] bg-clip-text text-transparent">
              {data.heading}
            </h2>
          </div>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {data.description}
          </p>

          <div className="flex justify-center gap-4">
            {data.buttons.map((button, index) => (
              <Link
                key={index}
                to={button.url}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  button.variant === "primary"
                    ? "bg-gradient-to-r from-[#F57C05] to-[#FF9F45] text-white shadow-lg hover:shadow-xl"
                    : button.variant === "secondary"
                    ? "bg-white text-[#F57C05] border-2 border-[#F57C05] hover:bg-[#F57C05]/5"
                    : "text-[#F57C05] hover:text-[#FF9F45]"
                }`}
              >
                {button.title}
              </Link>
            ))}
          </div>

          <div className="mt-16 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F57C05]">10+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F57C05]">50+</div>
              <div className="text-gray-600">Notes Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F57C05]">4.9/5</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
