import React, { useState, useEffect } from "react";
import axios from "axios";
import './repo.css';

const Repo = () => {
  const [repositories, setRepositories] = useState([]);
  const [newRepoName, setNewRepoName] = useState("");
  const [newRepoDescription, setNewRepoDescription] = useState(""); 
  const [loading, setLoading] = useState(true);

  // TRY THIS FIRST: Remove the extra "/repo" if your router already starts with it
  // If this still 404s, try "http://localhost:3000" (the root)
  const API_BASE_URL = "http://54.198.44.49:3000"; 

  const fetchRepos = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      // Your controller path is /repo/user/:userID
      const res = await axios.get(`${API_BASE_URL}/repo/user/${userId}`);
      
      // Your controller returns: res.json({ message: "...", repositories });
      setRepositories(res.data.repositories || []);
    } catch (err) {
      console.error("Fetch failed:", err.response?.status === 404 ? "Route not found - check API_BASE_URL" : err.message);
    } finally {
      setLoading(false);
    }
  };

  const createRepo = async (e) => {
    e.preventDefault(); 
    const userId = localStorage.getItem("userId");

    try {
      // Your controller path is /repo/create
      const res = await axios.post(`${API_BASE_URL}/repo/create`, { 
        name: newRepoName,
        description: newRepoDescription,
        owner: userId, // Matches 'const { owner } = req.body' in your controller
        visibility: true,
      });

      // Manually add to state because controller returns repositoryID, not the full object
      const newRepoObj = {
        _id: res.data.repositoryID, 
        name: newRepoName,
        description: newRepoDescription,
      };

      setRepositories((prev) => [...prev, newRepoObj]);
      setNewRepoName(""); 
      setNewRepoDescription(""); 
      alert("Repository Created!");
    } catch (err) {
      console.error("Creation Error:", err.response?.data);
    }
  };

  const deleteRepo = async (id) => {
    if (!window.confirm("Delete this?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/repo/delete/${id}`);
      setRepositories(repositories.filter((repo) => repo._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="repo-container">
      <h1>My Repositories</h1>

      <form onSubmit={createRepo} className="create-form">
        <input
          type="text"
          placeholder="Name"
          value={newRepoName}
          onChange={(e) => setNewRepoName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newRepoDescription}
          onChange={(e) => setNewRepoDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <ul className="repo-list">
          {repositories.map((repo) => (
            <li key={repo._id} className="repo-item">
              <div className="repo-info">
                <strong>{repo.name}</strong>
                <p>{repo.description || "No description provided"}</p>
              </div>
              <button onClick={() => deleteRepo(repo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Repo;