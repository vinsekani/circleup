import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaUsers,
  FaShieldAlt,
  FaQuestionCircle,
  FaCogs,
  FaHandHoldingUsd,
  FaChartLine,
  FaMobileAlt,
  FaArrowRight,
} from "react-icons/fa";
import heroImage from "../assets/pexels-suzyhazelwood-1791583.jpg";
import logo from "../assets/pro.png"
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // Animation variants for sections
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.2 } },
  };

  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-white to-purple-50 shadow-lg fixed w-full z-50 ">
        <div className="container mx-auto flex justify-between items-center p-4 md:p-6 h-[70px]">
          {/* <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
            ChamaApp
          </h1> */}
          <img src={logo} alt="Logo" className="h-[150px]"/>
          <div className="space-x-4 md:space-x-6 hidden md:flex items-center">
            <a href="#how-it-works" className="hover:text-blue-700 transition">
              How It Works
            </a>
            <a href="#features" className="hover:text-blue-700 transition">
              Features
            </a>
            <a href="#security" className="hover:text-blue-700 transition">
              Security
            </a>
            <a href="#pricing" className="hover:text-blue-700 transition">
              Pricing
            </a>
            <a href="#faq" className="hover:text-blue-700 transition">
              FAQ
            </a>
            <button 
            onClick={() => navigate("/register")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-blue-600 hover:text-blue-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image and Gradient Overlay */}
      <section
        className="text-white text-center py-40 md:py-32 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.8)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Save Together, Grow Together with CircleUp!          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Streamline contributions, automate payouts, and manage your
            community savings effortlessly with our cutting-edge platform.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center gap-2 mx-auto"
          >
            Get Started Now <FaArrowRight />
          </button>
        </motion.div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-white to-purple-50"
      >
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          How ChamaApp Works
        </motion.h2>
        <motion.div
          {...staggerChildren}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          <motion.div
            {...fadeInUp}
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white shadow-lg rounded-xl border-4 border-gradient-to-r from-blue-500 to-teal-500 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              For Admins
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Set up your group
                with a few clicks
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Invite members via
                link or manually
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Define contribution
                schedules
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Track transactions
                in real-time
              </li>
            </ul>
          </motion.div>
          <motion.div
            {...fadeInUp}
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white shadow-lg rounded-xl border-4 border-gradient-to-r from-blue-500 to-teal-500 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              For Members
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Join with an invite
                or approval
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Select your active
                group
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Contribute weekly or
                daily
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-500 mr-2" /> Receive payouts on
                schedule
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-white via-purple-50 to-indigo-200"
      >
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Powerful Features
        </motion.h2>
        <motion.div
          {...staggerChildren}
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {[
            {
              title: "Automated Payouts",
              icon: <FaHandHoldingUsd />,
              description:
                "Automate payouts with customizable schedules for seamless distribution.",
            },
            {
              title: "Multi-Group Management",
              icon: <FaUsers />,
              description:
                "Easily manage and switch between multiple savings groups.",
            },
            {
              title: "Top-Tier Security",
              icon: <FaShieldAlt />,
              description: "Bank-grade encryption and secure payment gateways.",
            },
            {
              title: "Real-Time Insights",
              icon: <FaChartLine />,
              description:
                "Monitor contributions and payouts with detailed analytics.",
            },
            {
              title: "Mobile-Friendly",
              icon: <FaMobileAlt />,
              description: "Access and manage your group on any device.",
            },
            {
              title: "Flexible Settings",
              icon: <FaCogs />,
              description:
                "Tailor contribution and payout rules to your needs.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="p-6 bg-white shadow-lg rounded-xl border-4 border-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl transition text-center"
            >
              <div className="flex justify-center text-4xl mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Security Measures */}
      <section
        id="security"
        className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-white to-purple-50"
      >
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Uncompromising Security
        </motion.h2>
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-6">
            Your savings are protected with bank-grade 256-bit encryption,
            secure payment processing, and regular security audits.
          </p>
          <FaShieldAlt className="text-blue-600 text-6xl mx-auto mb-4" />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto">
            Learn More <FaArrowRight />
          </button>
        </motion.div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-white via-purple-50 to-indigo-200"
      >
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Flexible Pricing Plans
        </motion.h2>
        <motion.div
          {...staggerChildren}
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {[
            {
              plan: "Basic",
              price: "Free",
              features: [
                "Up to 10 members",
                "Automated payouts",
                "Community support",
              ],
              recommended: false,
            },
            {
              plan: "Pro",
              price: "$9.99/mo",
              features: [
                "Unlimited members",
                "Priority support",
                "Advanced analytics",
              ],
              recommended: true,
            },
            {
              plan: "Enterprise",
              price: "Custom",
              features: [
                "Custom integrations",
                "Dedicated support",
                "White-labeling",
              ],
              recommended: false,
            },
          ].map((tier, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              whileHover={{ scale: 1.03 }}
              className={`p-6 shadow-lg rounded-xl bg-white text-center border ${
                tier.recommended
                  ? "border-blue-600"
                  : "border-gradient-to-r from-blue-500 to-teal-500 border-4"
              } hover:shadow-xl transition relative`}
            >
              {tier.recommended && (
                <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Recommended
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-800">
                {tier.plan}
              </h3>
              <p className="text-2xl font-bold mt-2 text-blue-600">
                {tier.price}
              </p>
              <ul className="mt-4 space-y-3 text-gray-700">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-center justify-center">
                    <FaCheck className="text-green-500 mr-2" /> {feat}
                  </li>
                ))}
              </ul>
              <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-white to-purple-50"
      >
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Your Questions, Answered
        </motion.h2>
        <motion.div
          {...staggerChildren}
          className="max-w-4xl mx-auto space-y-6"
        >
          {[
            {
              question: "How are payouts scheduled?",
              answer:
                "Payouts are automated based on the admin-set schedule, typically weekly or monthly.",
            },
            {
              question: "Can I manage multiple groups?",
              answer:
                "Yes, switch between groups effortlessly with our multi-group dashboard.",
            },
            {
              question: "What security measures are in place?",
              answer:
                "We use 256-bit encryption, secure APIs, and regular audits for maximum safety.",
            },
            {
              question: "Is there a mobile app?",
              answer:
                "Yes, download our mobile app for iOS and Android to manage on the go.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              className="border-b py-5 cursor-pointer transition-all duration-300 hover:bg-gray-50 rounded-lg"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <FaQuestionCircle
                  className="text-blue-600 transition-transform duration-300"
                  style={{
                    transform:
                      faqOpen === index ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
              </div>
              {faqOpen === index && (
                <p className="text-gray-600 mt-3">{faq.answer}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center py-6">
        <p className="text-sm">
          © 2025 ChamaApp. All rights reserved. |{" "}
          <a href="#privacy" className="underline hover:text-gray-200">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#terms" className="underline hover:text-gray-200">
            Terms of Service
          </a>
        </p>
        <div className="mt-2 space-x-4">
          <a href="#facebook" className="hover:text-gray-200">
            Facebook
          </a>
          <a href="#twitter" className="hover:text-gray-200">
            Twitter
          </a>
          <a href="#linkedin" className="hover:text-gray-200">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
