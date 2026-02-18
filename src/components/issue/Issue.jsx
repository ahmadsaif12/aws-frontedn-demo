import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added for routing
import axios from "axios";
import "./issue.css";

const Issue = () => {
  const { id } = useParams(); // Gets the Repo ID from the URL (/repo/:id/issues)
  const navigate = useNavigate();
  
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Updated to include the repo context if your backend supports filtering by repo
  const API_BASE_URL = "http://localhost:3000/issue"; 

  const fetchIssues = async () => {
    try {
      // If your backend is set up to filter issues by repo, update this URL
      const res = await axios.get(`${API_BASE_URL}/all`);
      
      // Temporary frontend filter: only show issues for this repo if they have a repoId field
      // Otherwise, it shows all (adjust based on your backend logic)
      setIssues(res.data);
    } catch (err) {
      console.error("Error fetching issues:", err);
    } finally {
      setLoading(false);
    }
  };

  const createIssue = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/create`, {
        title,
        description,
        status: "open",
        repoID: id, // Linking the issue to this specific repository
      });
      
      // Update state locally
      const newIssue = res.data.issue || res.data;
      setIssues([...issues, newIssue]);
      
      setTitle("");
      setDescription("");
      alert("Issue created successfully!");
    } catch (err) {
      console.error("Error creating issue:", err);
    }
  };

  const deleteIssue = async (issueId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/delete/${issueId}`);
      setIssues(issues.filter((issue) => issue._id !== issueId));
    } catch (err) {
      console.error("Error deleting issue:", err);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [id]); // Refetch if ID changes

  return (
    <div className="issue-container">
      {/* GitHub Style Breadcrumbs */}
      <nav className="issue-nav-header">
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>
        <div className="repo-path">
          <span className="user-path">User</span> / <strong>Repo-{id.substring(0,4)}</strong>
        </div>
      </nav>

      <div className="issue-header">
        <div className="issue-tabs">
          <span className="active-tab">⊙ {issues.length} Open</span>
          <span className="inactive-tab">✓ 0 Closed</span>
        </div>
        <button 
          className="btn-new-issue" 
          onClick={() => document.getElementById('issue-form').scrollIntoView({ behavior: 'smooth' })}
        >
          New Issue
        </button>
      </div>

      <div className="issue-list-wrapper">
        {loading ? (
          <p className="status-msg">Loading issues...</p>
        ) : issues.length === 0 ? (
          <div className="blank-slate">
            <h3>Welcome to issues!</h3>
            <p>Issues are used to track todos, bugs, feature requests, and more.</p>
          </div>
        ) : (
          issues.map((issue) => (
            <div key={issue._id} className="issue-item">
              <div className="issue-left">
                <span className="issue-icon-open">⊙</span>
                <div className="issue-info">
                  <strong className="issue-title-text">{issue.title}</strong>
                  <div className="issue-sub-text">
                    #{issue._id.substring(0, 6)} opened just now by User
                  </div>
                </div>
              </div>
              <button className="btn-delete-small" onClick={() => deleteIssue(issue._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <section id="issue-form" className="create-issue-container">
        <div className="form-header">
          <img src={`https://github.com/identicons/user.png`} alt="avatar" className="form-avatar" />
          <div className="form-box">
            <form onSubmit={createIssue}>
              <input
                type="text"
                className="issue-input-title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="issue-input-desc"
                placeholder="Leave a comment"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="form-actions">
                <button type="submit" className="btn-submit-issue">Submit new issue</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Issue;