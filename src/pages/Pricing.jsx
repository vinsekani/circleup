import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Pricing = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    alert(`You selected the ${plan.plan} plan!`);
    navigate("/create-group");
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-indigo-200 h-[100vh]">
      <section id="pricing" className="py-16 md:py-24 px-4 md:px-6 ">
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
              <button
                onClick={() => handleSelectPlan(tier)}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Pricing;
