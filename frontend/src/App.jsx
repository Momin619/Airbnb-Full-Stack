import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/auth-components/SignUp";
import Login from "./components/auth-components/Login"; // Make sure this exists
import "../public/output.css";
import { UserProvider } from "./store/UserStore";
function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <Navbar />
        <main className="flex-grow flex justify-center items-start py-12 px-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
