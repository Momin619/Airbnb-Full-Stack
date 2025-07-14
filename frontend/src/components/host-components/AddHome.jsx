import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddHome() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const [homeData, setHomeData] = useState({
    title: "",
    price: "",
    description: "",
    location: "",
  });
  const [image, setImage] = useState(null); // single or multiple
  const [rulesPdf, setRulesPdf] = useState(null);
  const navigate = useNavigate();
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
      const response = await api.post("/host/add-home", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success", response.data);
      navigate("/host/home");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Check console.");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto  bg-white rounded-lg mt-10 p-6 w-full px-4 sm:px-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Add a New Home
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {["title", "price", "location"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "price" ? "number" : "text"}
                name={field}
                id={field}
                value={homeData[field]}
                onChange={handleOnChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

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
              required
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
              className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Add Home
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default AddHome;
