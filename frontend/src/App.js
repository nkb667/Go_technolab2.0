import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Classroom from "./pages/Classroom";
import Admin from "./pages/Admin";
import ClassroomManagement from "./pages/ClassroomManagement";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetupAdmin from "./pages/SetupAdmin";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setup-admin" element={<SetupAdmin />} />
            
            {/* Protected routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <>
                  <Navigation />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/classroom" element={<Classroom />} />
                    <Route path="/admin" element={
                      <ProtectedRoute requireRole="admin">
                        <Admin />
                      </ProtectedRoute>
                    } />
                    <Route path="/classroom-management" element={
                      <ProtectedRoute requireRole="teacher">
                        <ClassroomManagement />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </>
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;