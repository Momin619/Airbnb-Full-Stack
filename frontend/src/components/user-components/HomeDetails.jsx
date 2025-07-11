import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api"; // adjust path if needed
import Loading from "../loading-component/Loading";
function HomeDetails() {
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

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">{home.title}</h2>

      <p className="text-lg text-gray-800 mb-2">
        <strong>Price:</strong> {home.price}
      </p>

      <p className="text-gray-700 mb-4">
        <strong>Description:</strong> {home.description}
      </p>

      <p className="text-gray-700 mb-4">
        <strong>Location:</strong> {home.location}
      </p>

      {home.image && (
        <div className="mb-4">
          <p className="font-semibold">Image:</p>
          <img
            src={home.image}
            alt={home.title}
            className="w-full max-w-md rounded"
          />
        </div>
      )}

      {home.rulesPdf && (
        <div className="mt-4">
          <p className="font-semibold">Rules PDF:</p>
          <a
            href={`http://localhost:3500${home.rulesPdf}`}
            download // <-- triggers download
            className="text-blue-600 underline"
          >
            Download Home Rules PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default HomeDetails;
