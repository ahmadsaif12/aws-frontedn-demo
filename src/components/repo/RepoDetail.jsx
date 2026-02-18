import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Issue from "./Issue"; // Your Issue component
import "./repoDetail.css";

const RepoDetail = () => {
  const { id } = useParams(); // Get Repo ID from URL
  const [activeTab, setActiveTab] = React.useState("code");

  return (
    <div className="repo-detail-container">
      {/* 1. Repo Header */}
      <header className="repo-header">
        <div className="repo-title">
          <span className="repo-icon">📁</span>
          <h2>username / <span className="bold-name">repository-name</span></h2>
          <span className="visibility-badge">Public</span>
        </div>
      </header>

      {/* 2. GitHub-style Nav Tabs */}
      <nav className="repo-nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
        <button 
          className={`nav-tab ${activeTab === 'issues' ? 'active' : ''}`}
          onClick={() => setActiveTab('issues')}
        >
          Issues <span className="counter">5</span>
        </button>
      </nav>

      {/* 3. Dynamic Content Area */}
      <main className="repo-content">
        {activeTab === "issues" ? (
          <Issue repoId={id} /> 
        ) : (
          <div className="code-view">
            <p>Files and folders would show here...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RepoDetail;