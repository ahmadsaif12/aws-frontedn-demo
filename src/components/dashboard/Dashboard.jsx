import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./dashboard.css"; 
import Navbar from "../Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newRepoName, setNewRepoName] = useState("");
  const [newRepoDesc, setNewRepoDesc] = useState(""); 
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 FIX 1: Added http:// protocol
  const API_BASE_URL = "http://54.198.44.49:3000/repo"; 

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        const data = await response.json();
        const repoData = data.repositories || (Array.isArray(data) ? data : []);
        setRepositories(repoData);
        setSearchResults(repoData);
      } catch (err) {
        console.error("Error fetching user repositories: ", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/all`);
        const data = await response.json();
        setSuggestedRepositories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching all repositories: ", err);
      }
    };

    if (userId) {
      fetchRepositories();
      fetchSuggestedRepositories();
    }
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) =>
      repo.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery, repositories]);

  const handleCreateRepo = async (e) => {
    e.preventDefault(); 
    const userId = localStorage.getItem("userId");
    if (!newRepoName.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newRepoName,
          description: newRepoDesc,
          owner: userId, 
          visibility: true
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        const addedRepo = {
          _id: resData._id || resData.repositoryID,
          name: newRepoName,
          description: newRepoDesc,
        };

        setRepositories((prev) => [...prev, addedRepo]);
        setNewRepoName("");
        setNewRepoDesc(""); 
        alert("Repository created successfully!");
      }
    } catch (err) {
      console.error("Error creating repo:", err);
    }
  };

  const handleDeleteRepo = async (repoId) => {
    if (!window.confirm("Delete this repository?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/delete/${repoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRepositories((prev) => prev.filter(repo => repo._id !== repoId));
      }
    } catch (err) {
      console.error("Error deleting repo:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <section id="dashboard">
        <aside className="suggested-repos">
          <h3>Suggested</h3>
          {suggestedRepositories.slice(0, 5).map((repo) => (
            <div 
              key={repo._id} 
              className="mini-repo-card"
              onClick={() => navigate(`/repo/${repo._id}/issues`)}
              style={{ cursor: "pointer" }}
            >
              <span className="repo-icon">repo</span>
              <p className="mini-repo-name">{repo.name}</p>
            </div>
          ))}
        </aside>

        <main className="main-content">
          <div className="main-header">
            <h2>Your Repositories</h2>
            <div id="search">
              <input
                type="text"
                value={searchQuery}
                placeholder="Find a repository..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="create-repo">
            <form onSubmit={handleCreateRepo} className="create-form">
              <input
                type="text"
                placeholder="Repository name..."
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Short description..."
                value={newRepoDesc}
                onChange={(e) => setNewRepoDesc(e.target.value)}
              />
              <button type="submit" className="btn-create">Create</button>
            </form>
          </div>

          <div className="repo-list">
            {loading ? (
              <p className="status-msg">Loading...</p>
            ) : searchResults.length > 0 ? (
              searchResults.map((repo) => (
                <div key={repo._id} className="repo-item">
                  <div className="repo-info">
                    <h4 
                      className="repo-title" 
                      onClick={() => navigate(`/repo/${repo._id}/issues`)}
                      style={{ cursor: "pointer", color: "#58a6ff" }}
                    >
                      {repo.name}
                    </h4>
                    <p className="repo-desc">{repo.description || "No description provided"}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteRepo(repo._id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="no-results">No repositories match your search.</p>
            )}
          </div>
        </main>

        <aside className="upcoming-events">
          <h3>Upcoming Events</h3>
          <ul>
            <li><p>Tech Conference - Dec 15</p></li>
            <li><p>Developer Meetup - Dec 25</p></li>
            <li><p>React Summit - Jan 5</p></li>
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default Dashboard;