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
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 my-10">
        Available Homes
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {homes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No homes found.
          </div>
        ) : (
          homes.map((home) => (
            <div
              key={home._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition w-100"
            >
              <img
                src={`http://localhost:3500${home.image}`}
                alt={home.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {home.title}
                </h2>
                <p className="text-blue-600 font-bold mb-2">${home.price}</p>
                <p className="text-gray-600 mb-2">{home.location}</p>
                <p className="text-gray-700 text-sm">{home.description}</p>

                {/* Add buttons or links here based on userType */}
                {/* Example buttons (replace with your logic if needed): */}
                <div className="flex space-x-2 mt-4">
                  <a
                    href={`/host/edit-home/home/${home._id}`}
                    className="px-4 cursor-pointer py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </a>

                  <button
                    href={`/host/delete-home/home/${home._id}`}
                    onClick={() => handleDelete(home._id)}
                    className="px-4 cursor-pointer py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
