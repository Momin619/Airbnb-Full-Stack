import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Loading from "../loading-component/Loading";

import { motion } from "framer-motion";
function HomeDetails() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await api.get(`/home-details/home/${id}`);
        setHome(res.data.home);
      } catch (error) {
        console.error("Failed to fetch home details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [id]);

  if (loading) return <Loading />;
  if (!home) return <p className="text-center mt-10">Home not found.</p>;

  function capitalizeName(name) {
    return [...name.split(" ")]
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const ownerName = `${home.owner.firstName} ${home.owner.lastName}`;
  const capitalizedOwnerName = capitalizeName(ownerName);

  return (
    <motion.div
      className=""
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {" "}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 space-y-6">
        {/* Image at the top */}
        {home.image && (
          <div>
            <img
              src={`http://localhost:3500${home.image}`}
              alt={home.title}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
        )}

        {/* Title and Host Info */}
        <div>
          <h2 className="text-3xl font-bold text-blue-600">{home.title}</h2>
          <p className="text-md text-gray-500 italic mt-1">
            <b>Hosted by {capitalizedOwnerName}</b>
          </p>
        </div>

        {/* Home Details */}
        <div className="space-y-2">
          <p className="text-lg text-gray-800">
            <strong>Price:</strong> ${home.price}
          </p>

          <p className="text-gray-700">
            <strong>Description:</strong> {home.description}
          </p>

          <p className="text-gray-700">
            <strong>Location:</strong> {home.location}
          </p>
        </div>

        {/* PDF Rules */}
        {home.rulesPdf && (
          <div>
            <p className="font-semibold mb-1">Rules PDF:</p>
            <a
              href={`http://localhost:3500${home.rulesPdf}`}
              download
              className="text-blue-600 underline"
            >
              Download Home Rules PDF
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default HomeDetails;
