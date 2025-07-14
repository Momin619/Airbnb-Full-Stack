import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ValidationErrors from "../validation-component/ValidationErrors";
import { useUser } from "../../store/UserStore";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { motion } from "framer-motion";

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const response = await api.post("/login", formdata);
      const { redirectTo } = response.data;
      setUser(response.data.user);
      setIsLoggedIn(response.data.isLoggedIn);
      navigate(redirectTo);
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
      className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6 my-20 mx-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Login Icon"
          className="mx-auto w-20 h-20 mb-4 rounded-full shadow-md"
        />
        <h2 className="font-extrabold text-blue-700 text-3xl mb-2">Login</h2>
        <p className="text-gray-500">Access your account securely</p>
      </div>

      <form className="space-y-4" onSubmit={handleOnSubmit}>
        <ValidationErrors errors={errors} />

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            autoComplete="email"
            onChange={handleOnChange}
            value={formdata.email}
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              autoComplete="current-password"
              onChange={handleOnChange}
              value={formdata.password}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Enter password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </span>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 font-semibold cursor-pointer rounded-md hover:bg-blue-700 transition w-full"
          >
            Login
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Login;
