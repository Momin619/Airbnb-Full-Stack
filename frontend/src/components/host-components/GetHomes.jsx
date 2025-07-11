import { useEffect, useState } from "react";
import api from "../../api/api";

function GetHomes() {
  const [homes, setHomes] = useState([]);

  const fetchHomes = async () => {
    try {
      const response = await api.get("/host/homes");
      setHomes(response.data.homes);
    } catch (error) {
      console.error("Error fetching homes:", error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this home?")) return;

    try {
      await api.delete(`/host/delete-home/home/${id}`);
      // Remove the deleted home from state
      setHomes((prevHomes) => prevHomes.filter((home) => home._id !== id));
    } catch (error) {
      console.error("Failed to delete home:", error);
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
        Available Homes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No homes found.
          </div>
        ) : (
          homes.map((home) => (
            <div
              key={home._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
            >
              <img
                src={`http://localhost:3500${home.image}`}
                alt={home.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {home.title}
                  </h2>
                  <p className="text-blue-600 font-bold mb-1">${home.price}</p>
                  <p className="text-gray-600 mb-2">{home.location}</p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {home.description}
                  </p>
                </div>

                <div className="flex space-x-2 mt-4">
                  <a
                    href={`/host/edit-home/home/${home._id}`}
                    className="flex-1 text-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(home._id)}
                    className="flex-1 text-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
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

export default GetHomes;
