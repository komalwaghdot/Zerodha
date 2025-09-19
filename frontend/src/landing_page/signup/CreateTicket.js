import React, { useState } from "react";
import axios from "axios";

const CreateTicket = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ send to backend (baseURL is set in index.js)
      const res = await axios.post("/signup", { username, password });

      // ✅ store token if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setMessage("Signup successful!");

      // ✅ redirect to dashboard
      window.location.href = process.env.REACT_APP_DASHBOARD_URL;

    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Error signing up. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateTicket;
