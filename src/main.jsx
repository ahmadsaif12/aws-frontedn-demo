import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './authContext.jsx'
import ProjectRoutes from './Routes.jsx';
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider, BaseStyles } from '@primer/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BaseStyles>
          <Router>
            <ProjectRoutes />
          </Router>
        </BaseStyles>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);