import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link, useNavigate } from "react-router-dom"; // Use navigate for cleaner transitions


import { Box, PageHeader, Button } from "@primer/react";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate(); // Initialize navigation

  const handleSignup = async (e) => {
    if (e) e.preventDefault();

    try {
      setLoading(true);
      
      /**
       * CRITICAL FIX: 
       * Must include 'http://'. Without it, the browser treats the IP as a 
       * local folder path (e.g., https://amplify-url.com/54.198.44.49...).
       */
      const API_URL = "http://54.198.44.49:3000"; 
      
      const res = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        username,
      });

      // Store user session
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      
      // Navigate to home instead of forcing a full page refresh
      navigate("/"); 

    } catch (err) {
      console.error("Signup Error:", err);
      alert("Signup Failed! Ensure your EC2 Security Group allows traffic on Port 3000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          {/* Primer components will render correctly now that main.jsx has ThemeProvider */}
          <Primer.Box sx={{ padding: 1 }}>
            <Primer.PageHeader>
              <Primer.PageHeader.TitleArea>
                <Primer.PageHeader.Title>Sign Up</Primer.PageHeader.Title>
              </Primer.PageHeader.TitleArea>
            </Primer.PageHeader>
          </Primer.Box>
        </div>

        <form className="login-box" onSubmit={handleSignup}>
          <div>
            <label className="label" htmlFor="Username">Username</label>
            <input
              autoComplete="username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="Email">Email address</label>
            <input
              autoComplete="email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="div">
            <label className="label" htmlFor="Password">Password</label>
            <input
              autoComplete="new-password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Primer.Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            type="submit"
            sx={{ width: '100%', mt: 3 }}
          >
            {loading ? "Creating account..." : "Signup"}
          </Primer.Button>
        </form>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;