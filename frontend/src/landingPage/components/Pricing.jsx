"use client";
import { Link } from "react-router-dom";
import { BiCheck } from "react-icons/bi";

const Pricing = () => {
  const pricingData = {
    heading: "Affordable Plans for Every Learner",
    description: "Choose a plan that fits your learning and productivity needs. Start free, and upgrade to unlock even more powerful features!",
    plans: [
      {
        title: "Free Plan",
        price: "₹0",
        features: [
          "10 free credits to create notes",
          "Access to summaries, quizzes, and flashcards", 
          "Export notes in PDF format",
          "AI Chatbot assistance for generated notes"
        ],
        cta: {
          title: "Get Started for Free",
          url: "/signup"
        }
      },
      {
        title: "Pro Plan",
        price: "₹499",
        features: [
          "50 credits per month",
          "Access to advanced AI features",
          "Priority AI processing",
          "Export notes in multiple formats (PDF, Word, Markdown)",
          "AI Chatbot for all uploaded content",
          "Priority customer support"
        ],
        cta: {
          title: "Upgrade to Pro",
          url: "/pricing"
        }
      },
      {
        title: "Ultimate Plan", 
        price: "₹999",
        features: [
          "Unlimited credits for note generation",
          "All Pro Plan features",
          "Team collaboration tools", 
          "Advanced analytics and insights",
          "Custom branding for exports",
          "24/7 dedicated customer support"
        ],
        cta: {
          title: "Go Ultimate",
          url: "/pricing"
        }
      }
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F57C05] to-[#2269EB] bg-clip-text text-transparent">
            {pricingData.heading}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {pricingData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingData.plans.map((plan, index) => (
            <div key={index} className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
              index === 1 ? 'bg-gradient-to-br from-[#F57C05] to-[#FF9F45] text-white shadow-xl' : 'bg-white shadow-lg'
            }`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.price !== "₹0" && <span className="text-xl ml-2">/month</span>}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <BiCheck className={`text-2xl mr-2 ${index === 1 ? 'text-white' : 'text-[#F57C05]'}`} />
                    <span className={index === 1 ? 'text-white' : 'text-gray-600'}>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to={plan.cta.url}
                className={`block w-full py-3 px-6 text-center rounded-lg font-semibold transition-all duration-300 ${
                  index === 1
                    ? 'bg-white text-[#F57C05] hover:bg-gray-100'
                    : 'bg-[#F57C05] text-white hover:bg-[#E16C04]'
                }`}
              >
                {plan.cta.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
