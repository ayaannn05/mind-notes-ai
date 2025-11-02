import { Link } from "react-router-dom";

const Footer = () => {
  const footerData = {
    content: {
      text: "© 2025 Mind Notes AI. All rights reserved.",
      links: [
        {
          title: "FAQ",
          url: "/dashboard"
        },
        {
          title: "Support", 
          url: "/dashboard"
        },
        {
          title: "Privacy Policy",
          url: "/dashboard"
        },
        {
          title: "Terms of Service",
          url: "/dashboard"
        }
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-[#F57C05]">
              Mind Notes AI
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            {footerData.content.links.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className="text-gray-300 hover:text-[#F57C05] transition-colors duration-300"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gray-800 my-6" />

        <div className="text-center text-gray-400 text-sm">
          {footerData.content.text}
        </div>
      </div>
    </footer>
  );
};

export default Footer;