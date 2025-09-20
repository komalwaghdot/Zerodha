import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import TopBar from './TopBar';

const Home = () => {
  /*const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // 🚨 no token, redirect to signup
      window.location.href = "https://zerodha-frontend-vdk7.onrender.com/signup";
      return;
    }

    // ✅ verify token with backend
    axios
      .get("/checkAuth", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => setUser(res.data.user))
  .catch(() => {
    localStorage.removeItem("token");
    window.location.href = "https://zerodha-frontend-vdk7.onrender.com/signup";
  })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>🔄 Checking authentication...</p>;
  }

  if (!user) {
    return <p>❌ Redirecting to signup...</p>;
  }*/

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
