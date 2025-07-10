import React from "react";

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      <span className="mt-4 text-blue-600 text-lg font-semibold">
        Loading...
      </span>
    </div>
  </div>
);

export default Loading;
