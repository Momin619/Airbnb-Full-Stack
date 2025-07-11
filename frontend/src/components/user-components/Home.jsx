import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../loading-component/Loading";
function Home() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchHomes = async () => {
    try {
      const response = await api.get("/host/homes");
      setHomes(response.data.homes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching homes:", error);
    }
  };

  // const { homeId } = useParams();
  const navigate = useNavigate();

  const addtoFavourite = async (homeId) => {
    try {
      await api.post(`/favourite/home/${homeId}`);
      navigate("/favourites"); // redirect after success
    } catch (error) {
      console.error("Failed to add to favourites:", error);
    }
  };

  const fetchHomeDetails = async (id) => {
    navigate(`/home-details/home/${id}`);
  };
  useEffect(() => {
    fetchHomes();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {homes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No homes found.
          </div>
        ) : (
          homes.map((home) => (
            <div
              key={home._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition w-full max-w-sm sm:max-w-md md:max-w-full mx-auto"
            >
              <img
                src={`http://localhost:3500${home.image}`}
                alt={home.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 break-words">
                  {home.title}
                </h2>
                <p className="text-blue-600 font-bold mb-2 text-lg">
                  ${home.price}
                </p>
                <p className="text-gray-600 mb-2 text-sm">{home.location}</p>
                <p className="text-gray-700 text-sm break-words line-clamp-3">
                  {home.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-4">
                  <button
                    onClick={() => addtoFavourite(home._id)}
                    className="w-full sm:w-auto cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Add to Favourite
                  </button>
                  <button
                    onClick={() => fetchHomeDetails(home._id)}
                    className="w-full cursor-pointer sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Home Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
