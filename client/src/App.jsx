import { Routes, Route } from "react-router-dom"

import Navbar from "@components/Navbar";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import Settings from "@pages/Settings";
import Signup from "@pages/Signup";
import Login from "@pages/Login";


export default function App () {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/settings" element={ <Settings /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>

    </>
  );
}