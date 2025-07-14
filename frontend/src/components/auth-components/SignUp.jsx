import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ValidationErrors from "../validation-component/ValidationErrors";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { motion } from "framer-motion";

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "guest",
    terms: false,
  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      await api.post("/signup", formdata);
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Unexpected error occurred."]);
      }
    }
  };

  return (
    <motion.div
      className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6 my-10 mx-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Signup Icon"
          className="mx-auto w-20 h-20 mb-4 rounded-full shadow-md"
        />
        <h2 className="font-extrabold text-blue-700 text-3xl mb-2">
          Create an Account
        </h2>
        <p className="text-gray-500">Join us and start your journey!</p>
      </div>

      <form className="space-y-4" onSubmit={handleOnSubmit}>
        <ValidationErrors errors={errors} />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              onChange={handleOnChange}
              value={formdata.firstName}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              onChange={handleOnChange}
              value={formdata.lastName}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            onChange={handleOnChange}
            value={formdata.email}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              onChange={handleOnChange}
              value={formdata.password}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-gray-600"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              onChange={handleOnChange}
              value={formdata.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full px-3 py-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? (
                  <HiEyeOff size={20} />
                ) : (
                  <HiEye size={20} />
                )}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="userType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            User Type
          </label>
          <select
            id="userType"
            name="userType"
            value={formdata.userType}
            onChange={handleOnChange}
            className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="guest">Guest</option>
            <option value="host">Host</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            name="terms"
            checked={formdata.terms}
            onChange={handleOnChange}
            required
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer text-white px-8 py-2 font-semibold rounded-md hover:bg-blue-700 transition w-full"
          >
            Sign Up
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Signup;
