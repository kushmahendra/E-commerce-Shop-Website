import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [message, setMessage] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData).unwrap();
      console.log("Registration successful:", response);
      // alert("Registration successful!");
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      // setMessage("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (<>
    <ToastContainer />
    <section className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md border shadow bg-white rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-5 mt-6">
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-5 py-3 rounded-md"
            aria-label="First Name"
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-5 py-3 rounded-md"
            aria-label="Last Name"
          />
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address eg. john3@gmail.com"
            required
            className="w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-5 py-3 rounded-md"
            aria-label="Email Address"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password ...."
            required
            className="w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-5 py-3 rounded-md"
            aria-label="Password"
          />
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number +91 "
            required
            className="w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-5 py-3 rounded-md"
            aria-label="Phone Number"
          />
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <button
            type="submit"
            className={`w-full mt-5 bg-red-500 text-white font-medium py-3 rounded-md hover:bg-indigo-700 transition ${isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  </>
  );
};

export default Register;
