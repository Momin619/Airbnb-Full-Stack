// src/components/Error.jsx
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center py-20 px-6">
      <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link to="/login" className="text-blue-500 hover:underline">
        Go back to login
      </Link>
    </div>
  );
};

export default Error;
