import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Loading from "../loading-component/Loading";
function FavouriteHomes() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchFavourites = async () => {
    try {
      const response = await api.get("/favourites");
      setFavourites(response.data.favourites);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  const removeFromFavourites = async (homeId) => {
    try {
      await api.post(`/remove-favourite/home/${homeId}`);
      setFavourites((prev) => prev.filter((home) => home._id !== homeId));
    } catch (error) {
      console.error("Failed to remove from favourites:", error);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
          Your Favourite Homes
        </h1>

        {favourites.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            You have no favourite homes yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-10 justify-items-center">
            {favourites.map((home) => (
              <div
                key={home._id}
                className="w-full max-w-4xl rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={`http://localhost:3500${home.image}`}
                  alt={home.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1 break-words">
                    {home.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{home.location}</p>
                  <p className="text-gray-700 text-base mt-2">
                    {home.description}
                  </p>
                  <p className="text-green-600 font-bold mt-2 text-lg">
                    ${home.price}
                  </p>

                  <button
                    onClick={() => removeFromFavourites(home._id)}
                    className="bg-red-500 text-white px-5 py-2 mt-4 cursor-pointer rounded hover:bg-red-600 transition"
                  >
                    Remove from favourites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouriteHomes;
