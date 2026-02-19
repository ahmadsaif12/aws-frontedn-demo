import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";

// Using Namespace import to prevent "Box is not defined" SyntaxErrors in Vite 7
import * as Primer from "@primer/react";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    // Prevent default form submission and page refresh
    if (e) e.preventDefault();

    try {
      setLoading(true);
      // NOTE: Ensure your backend handles HTTPS if your frontend is on Amplify
      const res = await axios.post("54.198.44.49:3000/signup", {
        email,
        password,
        username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      window.location.href = "/";
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Signup Failed! Check console for Mixed Content or CORS errors.");
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
          {/* Using Primer prefix to ensure Box is defined */}
          <Primer.Box sx={{ padding: 1 }}>
            <Primer.PageHeader>
              <Primer.PageHeader.TitleArea>
                <Primer.PageHeader.Title>Sign Up</Primer.PageHeader.Title>
              </Primer.PageHeader.TitleArea>
            </Primer.PageHeader>
          </Primer.Box>
        </div>

        {/* Wrapped in a <form> for better accessibility and "Enter" key support */}
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
            type="submit" // Triggers handleSignup via form onSubmit
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