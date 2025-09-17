/*import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTicket() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

   try {
    const res = await axios.post(
      "/signup",
      { username, password },
      { withCredentials: true } // ✅ Important!
    );

    console.log("✅ Signup success:", res.data);

    // ✅ Redirect to dashboard on 5000
    window.location.href = "https://zerodha-dashboard-lnu0.onrender.com";

  } catch (err) {
    console.error(err.response ? err.response.data : err);
    alert("Signup failed: " + (err.response?.data?.message || "Server error"));
  }

     
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="mb-4 text-center">Signup</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}*/

import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTicket() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/signup",
        { username, password },
        { withCredentials: true }
      );

      console.log("✅ Signup success response:", res);

      // Safely handle response
      if (res.status === 200 && res.data?.message === "Signup successful") {
        alert("Signup successful! Redirecting...");
        window.location.href = "https://zerodha-dashba.onrender.com";
      } else {
        alert("Unexpected response: " + JSON.stringify(res.data));
      }

    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      alert("Signup failed: " + (err.response?.data?.message || "server error"));
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="mb-4 text-center">Signup</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
