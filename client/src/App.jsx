import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"

import useAuth from "@hooks/useAuth";

import Navbar from "@components/Navbar";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import Settings from "@pages/Settings";
import Signup from "@pages/Signup";
import Login from "@pages/Login";

import { Loader } from "lucide-react"


export default function App () {
  const { authUser, checkAuth, isCheckingAuth } = useAuth();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )

    
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/" 
          element={
            authUser
              ? <Home />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile" 
          element={
            authUser
              ? <Profile />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/settings" 
          element={
            <Settings />
          }
        />
        <Route
          path="/signup" 
          element={
            !authUser
              ? <Signup />
              : <Navigate to="/" />
          }
        />
        <Route
          path="/login" 
          element={
            !authUser
              ? <Login />
              : <Navigate to="/" />
          }
        />
      </Routes>

    </>
  );
}