import React from "react";
import {
  Modal,
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParams, useNavigate } from "react-router-dom";
import { formBaseUrl } from "../../services/api"
import { useGetFormQuery } from "../../features/formBuilder/formBuilderSlice";
import { OnDeviceTraining } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";

export default function FormLink() {
  const { id } = useParams();
  
  const {
    data: form,
    isLoading : isGetFormLoading,
    isFetching,
    error,
    isError,
    isSuccess
  } = useGetFormQuery(id);

  const renderInputByType = (element) => {
    console.log(element);
    const field_info = element.field_info || {};
    switch (element.type) {
      case "select":
        return (
          <select className="w-full p-2 border border-gray-300 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-50 outline-none">
            <option value="">Select an option</option>
            {(field_info.options || []).map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {(field_info.options || []).map((option, index) => (
              <label
                key={index}
                className="inline-flex items-center bg-blue-50 cursor-pointer mr-6"
              >
                <input
                  type="radio"
                  name={`radio-${element.id}`}
                  className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-50 outline-none"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );
      case "text":
        return (
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-50 outline-none"
            placeholder={`Enter ${field_info.label || "text"}`}
          />
        );
      case "textarea":
        return (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-50 outline-none"
            placeholder={`Enter ${field_info.label || "text"}`}
          />
        );
      case "date":
        return (
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-50 outline-none"
            placeholder={`Enter ${field_info.label || "date"}`}
          />
        );
      case "time":
        return (
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-50 outline-none"
            placeholder={`Enter ${field_info.label || "time"}`}
          />
        );
      case "file":
        return (
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-50 outline-none"
            placeholder={`Select ${field_info.label || "attachment"}`}
            accept={element.field_info?.allowedExtensions}
          />
        );
      case "image":
        return (
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-50 outline-none"
            placeholder={`Select ${field_info.label || "image"}`}
            accept="image/jpeg, image/png"
          />
        );

      case "number":
        return (
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md bg-blue-50 focus:ring-2 focus:ring-blue-50 outline-none"
            placeholder={`Enter ${field_info.label || "number"}`}
            min={field_info.min}
            max={field_info.max}
            step={field_info.step}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* {form == null ? (
        <></>
      ) : ( */}
        <div className="min-h-[800px] bg-gray-100 py-6 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md min-h-[700px] flex flex-col">
              {/* Header */}
              <div className="bg-blue-50 px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-800">
                  {form?.form_name || "Untitled Form"}
                </h2>
              </div>

              {/* Form Content */}
              <div className="p-6 flex-grow">
                <div
                  className={`grid ${form?.number_of_columns === 1
                      ? "space-y-4"
                      : "grid-cols-2"
                    } gap-6`}
                >
                  {form?.fields.map((element) => (
                    <div key={element.id} className="bg-white">
                      <div className="mb-2">
                        <label className="block text-gray-600 text-sm mb-1">
                          {element.field_info?.label || "New " + element.type}
                          {element.field_info?.is_required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        <div className="mt-1">{renderInputByType(element)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer for Save Button */}
              <div className="bg-white px-6 py-6 mt-auto flex justify-center">
                <button
                  className="bg-[#FE634E] hover:bg-[#E55A44] text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
                  onClick={() => {
                    console.log("Form submitted");
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isGetFormLoading || isFetching}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
        </div>
      {/* )} */}
    </>
  );
}
