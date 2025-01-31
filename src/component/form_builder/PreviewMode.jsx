import React, { act, useState } from "react";
import "./colors.css";

import { Modal, Box, Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FileText, X } from "lucide-react";
import SignatureCanvas from "./SignatureCanvas";
import {
  validateForm,
  scrollToFirstError,
  validateField,
} from "./FormValidation";
import { useGetFormLastDataQuery, usePostFormDataMutation } from "../../features/formBuilder/formBuilderSlice";
import { Backdrop, CircularProgress } from "@mui/material";

const PreviewMode = ({ formJson, setFormJson, open, handleClose, action }) => {
  const [allFormData, setAllFormData] = React.useState(null);
  const [currentFormData, setCurrentFormData] = React.useState({});
  const [signatureImagePreview, setSignatureImagePreview] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [signatureDrawing, setSignatureDrawing] = useState(false);
  const [signatureDrawingColor, setSignatureDrawingColor] = useState("#000000");
  const [signatureDrawingWidth, setSignatureDrawingWidth] = useState(2);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const [validationErrors, setValidationErrors] = useState({});

  const {
    data: formLastData,
    isLoading: isGetFormLastDataQueryLoading,
    error,
    isError,
    isSuccess
  } = useGetFormLastDataQuery(formJson.id);

  const [
    postFormData,
    { isLoading: isPostFormDataLoading, isSuccess: isPostFormDataSuccess },
  ] = usePostFormDataMutation();

  const labelStyles = "font-medium text-[14px] text-gray-500 mb-2";
  React.useEffect(() => {
    if (action == "view") {
      setIsEditing(true)
    }
    // setCurrentFormData(formJson?.form_data);
    setCurrentFormData(formLastData)
  }, [formJson?.id, isPostFormDataLoading,
    error,
    isError,
    isSuccess]);

  React.useEffect(() => {
    if (isPostFormDataSuccess == true) {
      handleClose()
    }
  }, [isPostFormDataSuccess])

  // React.useEffect(()=>{
  //   handleClose()
  // },[isPostFormDataSuccess])

  const renderFieldError = (fieldLabel) => {
    const error = validationErrors[fieldLabel];
    if (error) {
      return (
        <div className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </div>
      );
    }
    return null;
  };

  const renderElementPreview = (element) => {
    // console.log(element);
    const field_info = element.field_info || {};
    const error = validationErrors[field_info.label];
    const handleInputChange = (key, value) => {
      if (!isEditing) return;
      setCurrentFormData((prev) => ({
        ...prev,
        [key]: value,
      }));

      const fieldError = validateField(
        {
          type: element.type,
          field_info: field_info,
        },
        value
      );

      setValidationErrors((prev) => {
        if (!fieldError) {
          const { [key]: _, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [key]: fieldError,
        };
      });
    };

    const renderInputByType = () => {
      let inputClass = "w-full p-2 border rounded focus:outline-[#76818E]";
      if (error) {
        inputClass += " border-red-500"; // Add red border if there's an error
      }
      switch (element.type) {
        case "signature":
          return (
            <div>
              <SignatureCanvas
                field_info={field_info}
                element={element}
                handleClearSignature={handleClearSignature}
                setSignatureImagePreview={setSignatureImagePreview}
                disabled={!isEditing}
              />
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );

        case "text":
          return (
            <div className="w-full">
              <input
                type="text"
                className={`w-full p-2 border rounded focus:outline-[#76818E]
          ${error ? "border-red-500" : "border-gray-300"}
          ${isEditing
                    ? "hover:border-gray-400"
                    : "bg-gray-50 cursor-not-allowed"
                  }`}
                placeholder={`Enter ${field_info?.label || "text"}`}
                value={currentFormData?.[field_info?.label] || ""}
                onChange={(e) =>
                  handleInputChange(field_info?.label, e.target.value)
                }
                disabled={!isEditing}
              />
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );

        case "textarea":
          return (
            <div>
              <textarea
                className={`w-full p-2 border rounded focus:outline-[#76818E]
                ${error ? "border-red-500" : "border-gray-300"}
                ${isEditing
                    ? "hover:border-gray-400"
                    : "bg-gray-50 cursor-not-allowed"
                  }`}
                placeholder={`Enter ${field_info?.label || "text"}`}
                value={currentFormData?.[field_info?.label] || ""}
                onChange={(e) =>
                  handleInputChange(field_info?.label, e.target.value)
                }
                disabled={!isEditing}
              />
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );

        case "select":
          return (
            <div>
              <select
                className={`w-full p-2 border rounded focus:outline-[#76818E]
              ${error ? "border-red-500" : "border-gray-300"}
              ${isEditing
                    ? "hover:border-gray-400"
                    : "bg-gray-50 cursor-not-allowed"
                  }`}
                value={currentFormData?.[field_info?.label] || ""}
                onChange={(e) =>
                  handleInputChange(field_info?.label, e.target.value)
                }
                disabled={!isEditing}
              >
                <option value="">Select an option</option>
                {field_info?.options?.map((option, index) => (
                  <option key={index} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );

        // case "radio":
        // return (
        //   <div className="flex space-x-6">
        //     {field_info?.options?.map((option, index) => (
        //       <label key={index} className="flex items-center font-medium">
        //         <input
        //           type="radio"
        //           name={field_info?.label}
        //           className="mr-2 accent-[#FE634E]"
        //           checked={
        //             currentFormData?.[field_info?.label] === option?.value
        //           }
        //           onChange={() =>
        //             handleInputChange(field_info?.label, option?.value)
        //           }
        //         />
        //         <span>{option?.label}</span>
        //       </label>
        //     ))}
        //   </div>
        // );

        case "radio":
          return (
            <div className="flex space-x-6">
              {field_info?.options?.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center font-medium cursor-pointer"
                >
                  {/* Hide native input */}
                  <input
                    type="radio"
                    name={field_info?.label}
                    className="hidden peer" // Hide the radio input and use peer for styling
                    checked={
                      currentFormData?.[field_info?.label] === option?.value
                    }
                    onChange={() =>
                      handleInputChange(field_info?.label, option?.value)
                    }
                    disabled={!isEditing}
                  />
                  {/* Custom radio circle */}
                  <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FE634E] mr-2 peer-checked:before:w-3 peer-checked:before:h-3 peer-checked:before:rounded-full peer-checked:before:bg-[#FE634E]"></span>
                  <span>{option?.label}</span>
                </label>
              ))}
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );

        case "date":
        case "time":
          return (
            <div>
              <input
                type={element.type}
                className={`w-full p-2 border rounded focus:outline-[#76818E]
                ${error ? "border-red-500" : "border-gray-300"}
                ${isEditing
                    ? "hover:border-gray-400"
                    : "bg-gray-50 cursor-not-allowed"
                  }`}
                value={currentFormData?.[field_info?.label] || ""}
                onChange={(e) =>
                  handleInputChange(field_info?.label, e.target.value)
                }
                disabled={!isEditing}
              />
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );

        // case "file":
        //   return (
        //     <input
        //       type="file"
        //       className="w-full p-2 border rounded"
        //       onChange={(e) => {
        //         const file = e.target?.files?.[0];
        //         handleInputChange(
        //           field_info?.label,
        //           file ? file.name : ""
        //         );
        //       }}
        //     />
        //   );

        case "image":
          return (
            <div>
              {currentFormData?.[field_info?.label] && (
                <div className="mb-2">
                  <img
                    // Support both file objects and existing file paths
                    src={
                      currentFormData[field_info.label] instanceof File
                        ? URL.createObjectURL(currentFormData[field_info.label])
                        : `${process.env.REACT_APP_BASE_URL}${currentFormData[field_info.label]
                        }`
                    }
                    alt={field_info?.label}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className={`w-full p-2 border rounded focus:outline-[#76818E]
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${isEditing
                      ? "hover:border-gray-400"
                      : "bg-gray-50 cursor-not-allowed"
                    }`}
                  onChange={(e) => {
                    const file = e.target?.files?.[0];
                    if (file) {
                      // Directly set the File object
                      handleInputChange(field_info?.label, file);
                      handleInputChange(
                        `${field_info?.label}_filename`,
                        file.name
                      );
                    }
                  }}
                  disabled={!isEditing}
                  // Key attribute to reset the file input
                  key={currentFormData?.[`${field_info?.label}_filename`]}
                />
                {currentFormData?.[`${field_info?.label}_filename`] && (
                  <div className="text-sm text-gray-600 mt-1">
                    Current file:{" "}
                    {currentFormData[`${field_info?.label}_filename`]}
                  </div>
                )}
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );

        case "file":
          return (
            <div>
              {currentFormData?.[field_info?.label] && (
                <div className="mb-2">
                  <a
                    href={
                      currentFormData[field_info.label] instanceof File
                        ? URL.createObjectURL(currentFormData[field_info.label])
                        : `${process.env.REACT_APP_BASE_URL}${currentFormData[field_info.label]
                        }`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {currentFormData[`${field_info?.label}_filename`] ||
                      "View Uploaded File"}
                  </a>
                </div>
              )}
              <div className="relative">
                <input
                  type="file"
                  className={`w-full p-2 border rounded focus:outline-[#76818E]
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${isEditing
                      ? "hover:border-gray-400"
                      : "bg-gray-50 cursor-not-allowed"
                    }`}
                  onChange={(e) => {
                    const file = e.target?.files?.[0];
                    if (file) {
                      // Directly set the File object
                      handleInputChange(field_info?.label, file);
                      handleInputChange(
                        `${field_info?.label}_filename`,
                        file.name
                      );
                    }
                  }}
                  disabled={!isEditing}
                  // Key attribute to reset the file input
                  key={currentFormData?.[`${field_info?.label}_filename`]}
                />
                {currentFormData?.[`${field_info?.label}_filename`] && (
                  <div className="text-sm text-gray-600 mt-1">
                    Current file:{" "}
                    {currentFormData[`${field_info?.label}_filename`]}
                  </div>
                )}
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );
        case "number":
          return (
            <div className="w-full">
              <input
                type="number"
                className={`w-full p-2 border rounded
          ${error ? "border-red-500" : "border-gray-300"}
          ${isEditing
                    ? "hover:border-gray-400"
                    : "bg-gray-50 cursor-not-allowed"
                  }`}
                placeholder={`Enter ${field_info?.label || "number"}`}
                value={currentFormData?.[field_info?.label] || ""}
                min={field_info?.min}
                max={field_info?.max}
                step={field_info?.step}
                onChange={(e) =>
                  handleInputChange(field_info?.label, e.target.value)
                }
                disabled={!isEditing}
              />
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div key={element.id} className="p-4">
        <div className="mb-2">
          <label className={labelStyles}>
            {field_info && field_info.label
              ? field_info.label.charAt(0).toUpperCase() +
              field_info.label.slice(1).toLowerCase()
              : element.type.charAt(0).toUpperCase() +
              element.type.slice(1).toLowerCase()}
            {/* {field_info?.label || element.type} */}
            {field_info?.is_required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        </div>
        {renderInputByType()}
      </div>
    );
  };

  const handleClearSignature = (element) => {
    // handleInputChange(element.id, "");
    setSignatureImage(null);
    setSignatureImagePreview(null);

    setSignatureDrawing(false);
    setSignatureDrawingColor("#000000");
    setSignatureDrawingWidth(2);
  };

  const handleSave = () => {
    // Only validate if in editing mode
    if (!isEditing) {
      handleClose();
      return;
    }

    // Validate the form using the utility
    const { hasError, errors } = validateForm(formJson, currentFormData);

    if (hasError) {
      // Update validation errors state
      setValidationErrors(errors);

      // Scroll to the first error
      scrollToFirstError();
      return;
    }
    // Clear any existing validation errors
    setValidationErrors({});

    const formJsonModified = { ...formJson, form_data: currentFormData };
    setCurrentFormData(currentFormData);
    console.log(currentFormData);
    setFormJson((prev) => ({
      ...prev,
      form_data: currentFormData,
    }));
    console.log(currentFormData);

    if (action === "save") {
      const { dynamic_table_name, column_mappings, ...rest } =
        formJsonModified.form_data;

      const formData = new FormData();

      // Add all fields to FormData
      Object.keys(rest).forEach((key) => {
        if (rest[key] instanceof File) {
          formData.append(key, rest[key]);
        } else {
          formData.append(key, rest[key]);
        }
      });
      postFormData({ id: formJson?.id, data: formData });

    } else {
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "900px",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 1,
            height: "80vh",
            overflow: "hidden",
          }}
        >
          <Box
            className="font-jakarta"
            sx={{
              bgcolor: "#FFF1E7",
              borderBottom: "1px solid #e0e0e0",
              px: 3,
              py: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Form Preview: {formJson?.form_name || "Untitled Form"}
            </Typography>

            <IconButton
              aria-label="close"
              onClick={handleClose}
              size="small"
              sx={{ color: "#666" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 4,
              overflowY: "auto",
              maxHeight: "calc(80vh - 150px)",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Grid container spacing={3}>
              {formJson?.fields?.map((element) => (
                <Grid
                  item
                  xs={
                    formJson?.fields?.length === 1
                      ? 12
                      : 12 / parseInt(formJson?.number_of_columns)
                  }
                  key={element.id}
                >
                  {renderElementPreview(element)}
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* {
            <Box sx={{ p: 3, textAlign: "left", mb: 3 }}>
              <button
                onClick={toggleEdit}
                className="p-2 mt-20 bg-save text-white rounded"
              >
                {isEditing ? "Cancel Edit" : "Edit Form"}
              </button>
            </Box>
          } */}

          {action == "save" && (
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <button
                onClick={toggleEdit}
                className="p-2 ml-10 bg-save text-white rounded"
              >
                Edit Form
              </button>

              <button
                onClick={handleSave}
                className="p-2 mr-10 bg-save text-white rounded"
              >
                Save Form
              </button>
            </Box>
          )}
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isGetFormLastDataQueryLoading || isPostFormDataLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </>
    </Modal>
  );
};

export default PreviewMode;
