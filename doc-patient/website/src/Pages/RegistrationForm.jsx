import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [roledata, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:roledata
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, ["role"]: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("formData", formData);
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
       
      if (response.data.status) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        "An error occurred while registering. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover "style={{ backgroundImage: "url('/background.webp')" }}>
      <div className="bg-opacity-10 backdrop-blur-xl w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Registration
        </h2>
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              Role
            </label>
            <div className="flex items-center -mt-2 text-indigo-600 font-bold">
              <label className="mr-4">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={roledata === "patient"}
                  onChange={handleRoleChange}
                  className="mr-2 leading-tight text-indigo-600"
                />
                Patient
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={roledata === "doctor"}
                  onChange={handleRoleChange}
                  className="mr-2 leading-tight text-indigo-600"
                />
                Doctor
              </label>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-1  gap-4">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-indigo-700 text-sm font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400"
                  placeholder={`Enter ${field.label}`}
                  required
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600  hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mt-10 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}{" "}
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-black">Already registered?</span>{" "}
            <Link to="/login" className="text-indigo-700 hover:underline">
              Login here.
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
