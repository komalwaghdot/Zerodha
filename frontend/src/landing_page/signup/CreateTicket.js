import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTicket() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error state

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error

    try {
      // 1️⃣ Signup
      const signupRes = await axios.post(
        "/signup",
        { username, password },
        { withCredentials: true }
      );
      console.log("✅ Signup response:", signupRes.data);

      // 2️⃣ Automatic login
      const loginRes = await axios.post(
        "/login",
        { username, password },
        { withCredentials: true }
      );
      console.log("✅ Login response:", loginRes.data);

      if (loginRes.status === 200) {
        window.location.href = process.env.REACT_APP_DASHBOARD_URL;
      } else {
        setError("Login failed after signup. Please login manually.");
      }

    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Server error occurred");
    } finally {
      setLoading(false);
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

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
