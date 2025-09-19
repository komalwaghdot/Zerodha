import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import TopBar from './TopBar';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Track loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/checkAuth`,
          { withCredentials: true }
        );
        console.log("✅ Authenticated:", res.data);
        setUser(res.data.user);
      } catch (err) {
        console.log("❌ Not authenticated");
        window.location.href =
          process.env.REACT_APP_FRONTEND_URL + "/signup" ||
          "http://localhost:3000/signup"; // ✅ redirect to signup/login
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p>🔄 Checking authentication...</p>; // ✅ no false redirect during signup
  }

  if (!user) {
    return <p>❌ Redirecting to login...</p>;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
