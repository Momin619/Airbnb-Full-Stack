import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./store/UserStore";
import api from "./api/api";
import Navbar from "./components/Navbar";
import Login from "./components/auth-components/Login";
import Signup from "./components/auth-components/Signup";
import AddHome from "./components/host-components/AddHome";
import EditHome from "./components/host-components/EditHome";
import GetHomes from "./components/host-components/GetHomes";
import Loading from "./components/loading-component/Loading";
import Error from "./components/Error";
import Home from "./components/user-components/Home";
import FavouriteHomes from "./components/user-components/FavouriteHomes";
import HomeDetails from "./components/user-components/HomeDetails";
import "../public/output.css";
// import './'

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 🔧
  const { setUser, setIsLoggedIn } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/check-auth", { withCredentials: true });
        if (res.data.isLoggedIn && res.data.user) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false); // ✅ Set loading to false when done
      }
    };

    checkAuth();
  }, []);

  if (loading) return <Loading />; // ✅ Don't render too early

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Navbar />
      <main className="flex-grow flex justify-center items-start py-12 px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/host/add-home" element={<AddHome />} />
          <Route path="/host/home" element={<GetHomes />} />
          <Route path="/host/edit-home/home/:id" element={<EditHome />} />
          <Route path="*" element={<Error />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favourites" element={<FavouriteHomes />} />
          <Route path="/home-details/home/:id" element={<HomeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
