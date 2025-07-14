import { useEffect, useState } from "react";
import api from "../../api/api";
import HomeCard from "../HomeCard";
import { motion } from "framer-motion";

function GetHomes() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await api.get("/host/homes");
        setHomes(response.data.homes);
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };
    fetchHomes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/host/delete-home/home/${id}`);
      setHomes((prev) => prev.filter((h) => h._id !== id));
    } catch (error) {
      console.error("Failed to delete home:", error);
    }
  };

  return (
    <motion.div
      className="your-styling-classes"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Your Listed Homes
        </h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {homes.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No homes found.
            </div>
          ) : (
            homes.map((home) => (
              <HomeCard key={home._id} home={home}>
                <a
                  href={`/host/edit-home/home/${home._id}`}
                  className="w-full sm:w-auto px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit Home
                </a>
                <button
                  onClick={() => handleDelete(home._id)}
                  className="w-full cursor-pointer sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete Home
                </button>
              </HomeCard>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default GetHomes;
