import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
function EditHome() {
  const [homeData, setHomeData] = useState({
    title: "",
    price: "",
    description: "",
    location: "",
  });
  const { id } = useParams();
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await api.get(`/host/edit-home/home/${id}`);
        const home = res.data.home;
        setHomeData({
          title: home.title,
          price: home.price,
          description: home.description,
          location: home.location,
        });
      } catch (err) {
        console.error("Failed to fetch home:", err);
      }
    };
    fetchHome();
  }, [id]);

  const [image, setImage] = useState(null); // single or multiple
  const [rulesPdf, setRulesPdf] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setHomeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") {
      setImage(files); // files is FileList, can be multiple
    } else if (name === "rulesPdf") {
      setRulesPdf(files[0]); // single file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append text fields
    for (const key in homeData) {
      formData.append(key, homeData[key]);
    }

    // Append files
    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
    }

    if (rulesPdf) {
      formData.append("rulesPdf", rulesPdf);
    }

    try {
      const response = await api.post(`/host/edit-home/home/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success", response.data.home);
      alert("Home updated  successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Check console.");
    }
  };
  return (
    <>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-10 p-6 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Edit Home
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={homeData.title}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={homeData.price}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={homeData.description}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={homeData.location}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image Upload
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              multiple
              accept="image/*"
              // required/
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="rulesPdf"
              className="block text-sm font-medium text-gray-700"
            >
              Home Rules PDF
            </label>
            <input
              type="file"
              name="rulesPdf"
              id="rulesPdf"
              onChange={handleFileChange}
              accept="application/pdf"
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 cursor-pointer rounded-md hover:bg-blue-700 transition"
            >
              Edit Home
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditHome;
