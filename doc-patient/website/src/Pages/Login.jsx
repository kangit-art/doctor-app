import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/user/login`,
        formData
      );

      if (response.data.status) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        if (response.data.role === "patient") {
          history("/patient-dashboard");
          login();
        } else if (response.data.role === "doctor") {
          history("/doctor-dashboard");
          login();
        } 
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover "style={{ backgroundImage: "url('/background.webp')" }}>
      <div className=" bg-opacity-10 backdrop-blur-xl w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent border-b-4 border-indigo-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent border-b-4 border-indigo-600"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mt-10 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? "Please wait, logging in..." : "Login"}{" "}
            </button>
          </div>
          <div className="text-center mt-4">
            New user?
            <Link to="/" className="text-indigo-700 hover:underline">
              Register here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
