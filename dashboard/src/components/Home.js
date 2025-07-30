import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import TopBar from './TopBar';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/checkAuth', { withCredentials: true })
      .then(res => {
        console.log("✅ Authenticated:", res.data);
        setUser(res.data.user);
      })
      .catch(err => {
        console.log("❌ Not authenticated, redirecting...");
        window.location.href = "http://localhost:3000"; // back to login
      });
  }, []);

  if (!user) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
