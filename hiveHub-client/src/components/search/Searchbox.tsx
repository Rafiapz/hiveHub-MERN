import React from "react";

function Searchbox() {
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
      />
    </>
  );
}

export default Searchbox;
