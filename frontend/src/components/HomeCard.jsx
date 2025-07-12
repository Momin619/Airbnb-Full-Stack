function HomeCard({ home, children }) {
  return (
    <div
      key={home._id}
      className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition w-full sm:w-full md:w-[22rem] lg:w-[22rem] mx-auto"
    >
      <img
        src={`http://localhost:3500${home.image}`}
        alt={home.title}
        className="w-full h-60 object-cover"
        loading="lazy"
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 break-words">
          {home.title}
        </h2>
        <p className="text-blue-600 font-bold mb-2 text-lg">${home.price}</p>
        <p className="text-gray-600 mb-2 text-sm">{home.location}</p>
        <p className="text-gray-700 text-sm break-words line-clamp-3">
          {home.description}
        </p>

        {/* ✅ Fixed layout for buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0 mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
