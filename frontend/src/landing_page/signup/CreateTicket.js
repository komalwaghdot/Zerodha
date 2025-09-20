import React, { useState } from "react";
import api from "../api"; // make sure api.js is in src/api.js

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    /*e.preventDefault();

    try {
      // ✅ Call backend
      const res = await api.post("/signup", { username, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setMessage("Signup successful!");

      // ✅ Optional: check authentication
      const check = await api.get("/checkAuth");
      console.log("CheckAuth:", check.data);

      // ✅ Redirect to dashboard
      const redirectUrl =
        process.env.REACT_APP_DASHBOARD_URL || "/dashboard";
      console.log("Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;

    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Error signing up. Please try again."
      );
    }*/
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md bg-white border-2 border-blue-400 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
