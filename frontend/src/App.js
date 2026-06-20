import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import KYC from "./pages/KYC";
import Perks from "./pages/Perks";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import { useAuthStore } from "./store";

function App() {
  const { fetchUser, token } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [token, fetchUser]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          {token && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/kyc"
              element={
                <ProtectedRoute>
                  <KYC />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perks"
              element={
                <ProtectedRoute>
                  <Perks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
