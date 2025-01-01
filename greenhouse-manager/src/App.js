import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedPage from "./components/ProtectedPage";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Protected Routes Wrapped in Layout */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedPage>
                        <Layout title="Dashboard">
                            <Dashboard />
                        </Layout>
                    </ProtectedPage>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedPage>
                        <Layout title="Profile">
                            <ProfilePage />
                        </Layout>
                    </ProtectedPage>
                }
            />
            
            {/*<Route path="/Dashboard" element={<ProtectedPage><Dashboard/></ProtectedPage>} />*/}
            {/*<Route path="/profile" element={<ProtectedPage><ProfilePage /></ProtectedPage>}/>*/}
        </Routes>
      </Router>
  );
}

export default App;
