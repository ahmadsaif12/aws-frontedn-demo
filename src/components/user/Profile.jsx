import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "Loading..." });
  const { setCurrentUser } = useAuth();

  // Consolidating API base for consistency
  const API_BASE_URL = "http://54.198.44.49:3000";

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          // Assuming your user route is /userProfile/:id based on your previous code
          const response = await axios.get(
            `${API_BASE_URL}/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
          setUserDetails({ username: "User not found" });
        }
      } else {
        // Redirect to login if no userId is present
        navigate("/auth");
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    // Use navigate for a smoother SPA transition than window.location.href
    navigate("/auth");
  };

  return (
    <div className="profile-container">
      <Navbar />
      
      <UnderlineNav aria-label="Profile Navigation" sx={{ padding: "0 20px" }}>
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          onClick={() => navigate("/profile")}
          sx={{ cursor: "pointer" }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{ cursor: "pointer" }}
        >
          Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <div className="profile-page-wrapper">
        <aside className="user-profile-section">
          <div className="profile-image-container">
            {/* Placeholder for Profile Image */}
            <img 
              src={`https://github.com/${userDetails.username}.png`} 
              alt="Profile" 
              onError={(e) => { e.target.src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" }}
              className="profile-avatar"
            />
          </div>

          <div className="user-info">
            <h3>{userDetails.username}</h3>
            <p className="user-id-sub">@{userDetails._id?.substring(0, 8)}</p>
          </div>

          <div className="follower-stats">
            <p><strong>10</strong> followers</p>
            <p><strong>3</strong> following</p>
          </div>
        </aside>

        <main className="content-section">
          <div className="heat-map-container">
            <h4>Contributions</h4>
            <HeatMapProfile />
          </div>
        </main>
      </div>

      <button
        onClick={handleLogout}
        className="logout-fab"
        title="Logout"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;