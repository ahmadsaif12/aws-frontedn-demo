import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";

// 🔹 FIX 1: Import all needed components directly
import { Box, PageHeader, Button } from "@primer/react";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    try {
      setLoading(true);
      const API_URL = "http://54.198.44.49:3000"; 
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      window.location.href = "/";
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login Failed! Check console for Mixed Content errors.");
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
          {/* 🔹 FIX 3: Removed "Primer." prefix since we used named imports */}
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea>
                <PageHeader.Title>Sign In</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>

        <form className="login-box" onSubmit={handleLogin}>
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
              autoComplete="current-password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            type="submit"
            sx={{ width: '100%', mt: 3 }}
          >
            {loading ? "Verifying..." : "Login"}
          </Button>
        </form>

        <div className="pass-box">
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;