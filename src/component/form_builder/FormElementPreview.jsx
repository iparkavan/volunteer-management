import React, { useState } from "react";
import { Trash2, Calendar, FileText, X } from "lucide-react";

const FormElementPreview = ({
  element,
  field_info = {},
  isSelected,
  onSelect,
  onDelete,
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const commonInputStyles =
    "w-full p-3 border border-gray-200 rounded-md text-[14px] font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300";

  const labelStyles = "font-medium  text-[14px] text-gray-500 mb-2";

  const renderElementContent = () => {
    switch (element.type) {
      case "text":
        return (
          <input
            type="text"
            className={commonInputStyles}
            placeholder={(field_info && field_info.label) || "Enter text"}
            readOnly
          />
        );
      case "textarea":
        return (
          <textarea
            className={`${commonInputStyles} min-h-[100px] resize-none`}
            placeholder={(field_info && field_info.label) || "Enter text"}
            readOnly
          />
        );
      case "time":
        return (
          <input
            type="time"
            className={commonInputStyles}
            placeholder={field_info.label || "Select time"}
            disabled
          />
        );
      case "number":
        return (
          <input
            type="number"
            className={commonInputStyles}
            placeholder={(field_info && field_info.label) || "Enter number"}
            readOnly
          />
        );

      case "signature":
        return (
          <div className="relative border rounded-md">
            {/* Canvas/Signature Preview Area */}
            <div
              className="w-full h-32 bg-gray-50 rounded-t-md border-b flex items-center justify-center"
            >
              <div className="text-gray-400 text-sm">
                {(field_info && field_info.label) || "Click here to sign"}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between p-2 bg-white rounded-b-md">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FileText size={16} className="text-gray-400" />
                <span>Signature</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                  title="Clear signature"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Required Indicator */}
            {field_info?.is_required && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
            )}
          </div>
        );

      case "date":
        return (
          <div className="relative">
            <input
              type="text"
              className={commonInputStyles}
              placeholder={(field_info && field_info.label) || "Select date"}
              readOnly
            />
            <Calendar
              className="absolute right-3 top-3 text-gray-400"
              size={20}
            />
          </div>
        );
      case "select":
        return (
          <select
            className={`${commonInputStyles} appearance-none bg-white`}
            disabled
          >
            <option>
              {(field_info && field_info.label) || "Select an option"}
            </option>
            {(field_info.options || []).map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
          
        
      case "file":
      case "image":
        return (
          <div className="w-full">
            <input
              disabled
              type="file"
              // className={`${commonInputStyles}
              //  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}

              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{
                backgroundColor: "FE634E",
                color: "white",
                fontWeight: "",
              }}
              placeholder={`Select ${field_info.label || element.type}`}
            />
          </div>
        );
      case "radio":
        return (
          <div
            className={`flex ${
              field_info?.displayType === "vertical"
                ? "flex-col space-y-3"
                : "space-x-6"
            }`}
          >
            {(field_info?.options || []).map((option, index) => (
              <label
                key={index}
                className="flex items-center text-[14px] text-gray-700"
              >
                <input
                  type="radio"
                  className="w-4 h-4 mr-2 text-blue-600 border-gray-300 focus:ring-blue-500"
                  disabled
                  checked={option.isDefault}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      default:
        return (
          <div className="text-[14px]">
            {(field_info && field_info.label) || element.type}
          </div>
        );
    }
  };

  return (
    <div
      className={`p-4 rounded-lg relative hover:bg-gray-50 transition-colors duration-150 ${
        isSelected ? "ring-2 ring-blue-200 bg-blue-50" : ""
      }`}
      onClick={() => onSelect(element)}
      onMouseEnter={() => setShowDeleteIcon(true)}
      onMouseLeave={() => setShowDeleteIcon(false)}
    >
      <div className={labelStyles}>
        {field_info && field_info.label
          ? field_info.label.charAt(0).toUpperCase() +
            field_info.label.slice(1).toLowerCase()
          : element.type.charAt(0).toUpperCase() +
            element.type.slice(1).toLowerCase()}
        {field_info && field_info.is_required && (
          <span className="text-red-500 ml-1 text-[16px]">*</span>
        )}
      </div>
      {renderElementContent()}

      {showDeleteIcon && (
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors duration-150"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(element.id);
          }}
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
};

export default FormElementPreview;
