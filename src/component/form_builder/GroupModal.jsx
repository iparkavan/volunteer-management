import React, { useState } from "react";
import { X } from "lucide-react";

const GroupModal = ({ onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = () => {
    if (groupName.trim() !== "") {
      onSubmit(groupName);
      onClose();
    } 
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Enter Group Name
        </h3>
        <div className="mb-4">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter a group name"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-500 text-white rounded "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
