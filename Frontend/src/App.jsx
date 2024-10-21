import React from "react";
import Signup from "./auth/signUp";
import Signin from "./auth/signIn";
import Home from "./components/home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/authContext";

export default function App() {
  const { authUser } = useAuthContext();

  // console.log("Current authUser:", authUser); // Debugging line to check authUser

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" replace /> : <Signin />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" replace /> : <Signup />}
        />
        {/* Fallback route for undefined paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
