import React, { useEffect } from "react";
import { useNavigate, useRoutes } from 'react-router-dom';

// 1. Imports MUST come before any logic
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login"; // DOUBLE CHECK: Is folder 'auth' or 'Auth'?
import Signup from "./components/auth/Signup";
import Repo from "./components/repo/Repo";
import Issue from "./components/issue/Issue"; 
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    // 2. Log here to see what Amplify sees
    console.log("Production Check - Login:", Login);
    console.log("Production Check - Signup:", Signup);

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");
        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }
        if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
            navigate("/auth");
        }
    }, [currentUser, navigate, setCurrentUser]);

    // 3. The Error #130 happens here if Login is undefined
    let element = useRoutes([
        { path: "/", element: <Dashboard /> },
        { path: "/auth", element: Login ? <Login /> : <div>Loading Login...</div> },
        { path: "/signup", element: Signup ? <Signup /> : <div>Loading Signup...</div> },
        { path: "/profile", element: <Profile /> },
        { path: "/repo", element: <Repo /> },
        { path: "/repo/:id/issues", element: <Issue /> }
    ]);

    return element;
}

export default ProjectRoutes;