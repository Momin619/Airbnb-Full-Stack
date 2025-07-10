import React from "react";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import ValidationErrors from "../validation-component/ValidationErrors";
import { useUser } from "../../store/UserStore";
function Login() {
  const { setUser, setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  // const [userType, setUserType] = useState([null]);
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
      console.log(response.data);
      setUser(response.data.user);
      setIsLoggedIn(response.data.isLoggedIn);
      navigate(redirectTo); // go to /home or /host/home
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["Unexpected error occurred."]);
      }
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6 my-20">
      <div className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Sign Up Icon"
          className="mx-auto w-20 h-20 mb-4 rounded-full shadow-md"
        />
        <h2 className="font-extrabold text-blue-700 text-3xl mb-2"></h2>
        <p className="text-gray-500">Join us and start your journey!</p>
      </div>

      <form className="space-y-4" onSubmit={handleOnSubmit} autoComplete="on">
        <ValidationErrors errors={errors} />
        {/* First + Last Name */}
        <div className="flex flex-col sm:flex-row gap-4"></div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            autoCapitalize="on"
            autoCorrect="on"
            onChange={handleOnChange}
            autoComplete="email"
            value={formdata.email}
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className="pl-3 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            autoCapitalize="on"
            autoCorrect="on"
            autoComplete="current-password"
            onChange={handleOnChange}
            value={formdata.password}
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter password"
            className="pl-3 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 font-semibold rounded-md hover:bg-blue-700 transition shadow-lg cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
