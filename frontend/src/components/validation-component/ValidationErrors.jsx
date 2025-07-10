import React from "react";

function ValidationErrors({ errors = [] }) {
  if (errors.length === 0) return null;
  return (
    <>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
        <ul className="list-disc list-inside space-y-1">
          {errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ValidationErrors;
