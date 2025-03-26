import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number (10-15 digits)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form Data:", formData);
      // Register User
      setIsLoading(true);
      const url =
        "https://circleup-backend-9eaf.onrender.com/api/auth/register";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, options);
      console.log(response);
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        navigate("/login");
      } else {
        setFormError(data.message);
      }
      console.log(response);

      console.log("Form Data:", formData);
    }
  };

  // Check if all required fields are filled
  const isFormFilled = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== ""
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg flex gap-10 p-8">
          <img
            src="../../src/assets/pexels-suzyhazelwood-1791583.jpg"
            alt="side"
            className="w-[30vw] max-w-full object-cover"
          />
          <div className="p-8 w-96">
            {formError && (
              <p className="text-red-500 text-center mb-4">{formError}</p>
            )}

            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Role Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormFilled()} // Disable if loading or form is not filled
                className={`w-full py-2 text-white rounded-lg hover:bg-blue-600 ${
                  isLoading || !isFormFilled()
                    ? "bg-slate-500 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Register"
                )}
              </button>
              <p className="text-center mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-600 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

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

export default Register;
