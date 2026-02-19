import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    if (e) e.preventDefault();

    try {
      setLoading(true);
      const API_URL = "http://54.198.44.49:3000"; 
      
      const res = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      navigate("/"); 

    } catch (err) {
      console.error("Signup Error:", err);
      alert("Signup Failed! Check if Port 3000 is open in your EC2 Security Group.");
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
          {/* 🔹 FIX: Replaced Primer Box/PageHeader with semantic HTML */}
          <div style={{ padding: '8px', textAlign: 'center' }}>
             <h2 style={{ fontSize: '24px', fontWeight: '400', color: '#adbac7' }}>Sign Up</h2>
          </div>
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

          {/* 🔹 FIX: Replaced Primer Button with standard HTML button */}
          <button
            className="login-btn"
            disabled={loading}
            type="submit"
            style={{ 
                width: '100%', 
                marginTop: '24px', 
                backgroundColor: '#238636', 
                color: 'white',
                border: '1px solid rgba(240,246,252,0.1)',
                padding: '10px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth" style={{color: '#539bf5'}}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;