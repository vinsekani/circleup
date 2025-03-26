import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(StateContext);
  const { dataForGroup } = useContext(StateContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const loginUrl =
      "https://circleup-backend-9eaf.onrender.com/api/auth/login";

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);

        if (data.role === "admin") {
          console.log(dataForGroup);
          // Checking if admin has any groups
          const groupResponse = await fetch(
            `https://circleup-backend-9eaf.onrender.com/api/group/uid/${
              data ? `_${data._id}` : ""
            }`,
            {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            }
          );

          const groupData = await groupResponse.json();

          console.log(groupData);

          if (groupResponse.ok) {
            navigate("/account");
            localStorage.setItem("groupId", groupData.group._id);
          } else {
            // if No group found for this uid
            navigate("/create-group");
          }
        } else if (data.role === "member") {
          navigate("/account");
        }
      } else {
        setFormError(data?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setFormError("An error occurred. Please try again later.");
      console.log("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {console.log(dataForGroup)}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg flex gap-10 p-6 rounded-lg">
          <img
            src="../../src/assets/pexels-suzyhazelwood-1791583.jpg"
            alt="side image"
            className="w-[30vw] object-cover rounded-lg"
          />
          <div className="p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {formError && (
              <p className="text-red-500 text-center mb-4">{formError}</p>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border p-2 rounded ${
                    errors.email ? "border-2 border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border p-2 rounded pr-10 ${
                      errors.password
                        ? "border-2 border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 text-white ${
                  isLoading
                    ? "bg-slate-500 cursor-wait hover:bg-slate-500"
                    : "bg-blue-500"
                } rounded-lg hover:bg-blue-600`}
              >
                {isLoading ? (
                  <i class="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-center mt-4">
                Do not have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

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

export default Login;
