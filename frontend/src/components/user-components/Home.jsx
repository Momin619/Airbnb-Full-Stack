import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";
import HomeCard from "../HomeCard";

import { motion } from "framer-motion";
function Home() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await api.get("/home");
        setHomes(response.data.homes);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };
    fetchHomes();
  }, []);

  const addToFavourite = async (homeId) => {
    try {
      await api.post(`/favourite/home/${homeId}`);
      navigate("/favourites");
    } catch (error) {
      console.error("Failed to add to favourites:", error);
    }
  };

  const fetchHomeDetails = (id) => {
    navigate(`/home-details/home/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <motion.div
      className=""
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-6 text-center">Explore Homes</h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {homes.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No homes found.
            </div>
          ) : (
            homes.map((home) => (
              <HomeCard key={home._id} home={home}>
                <button
                  onClick={() => addToFavourite(home._id)}
                  className="w-full sm:w-auto cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Add to Favourite
                </button>
                <button
                  onClick={() => fetchHomeDetails(home._id)}
                  className="w-full sm:w-auto cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Home Details
                </button>
              </HomeCard>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
