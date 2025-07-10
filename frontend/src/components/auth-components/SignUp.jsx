import React from "react";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import ValidationErrors from "../validation-component/ValidationErrors";

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "guest", // Default user type
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
    try {
      e.preventDefault();
      await api.post("/signup", formdata);
      console.log(formdata);
      navigate("/login");
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
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6 my-10">
      <div className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Sign Up Icon"
          className="mx-auto w-20 h-20 mb-4 rounded-full shadow-md"
        />
        <h2 className="font-extrabold text-blue-700 text-3xl mb-2">
          Create an Account
        </h2>
        <p className="text-gray-500">Join us and start your journey!</p>
      </div>

      <form className="space-y-4" onSubmit={handleOnSubmit}>
        <ValidationErrors errors={errors} />
        {/* First + Last Name */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              autoCorrect="on"
              autoCapitalize="on"
              value={formdata.firstName}
              onChange={handleOnChange}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              className="pl-3 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              autoCorrect="on"
              autoCapitalize="on"
              onChange={handleOnChange}
              value={formdata.lastName}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              className="pl-3 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            autoCorrect="on"
            autoCapitalize="on"
            onChange={handleOnChange}
            value={formdata.email}
            type="email"
            id="email"
            name="email"
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
            onChange={handleOnChange}
            value={formdata.password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            className="pl-3 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            onChange={handleOnChange}
            type="password"
            value={formdata.confirmPassword}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            className="pl-3 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User Type */}
        <div>
          <label
            htmlFor="userType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            User Type
          </label>
          <select
            id="userType"
            onChange={handleOnChange}
            value={formdata.userType}
            name="userType"
            className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={"guest"}>Guest</option>
            <option value={"host"}>Host</option>
          </select>
        </div>

        {/* Terms */}
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            checked={formdata.terms}
            onChange={handleOnChange}
            name="terms"
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

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 font-semibold rounded-md hover:bg-blue-700 transition shadow-lg cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
