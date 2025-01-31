import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Button,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  Avatar,
} from "@mui/material";
import { UploadFile, Download } from "@mui/icons-material";
import {
  useExportImportMutation,
  useExportImportWithParamsMutation,
  useRetrieveTablesQuery,
} from "../../features/dashboard/dashboardApi.services";
import { MuiCustomModal } from "../../shared/Modal/MuiCustomModal";
import modal_tick_icon from "../../assets/icons/modal_tick_icon.svg";
import { toast } from "react-toastify";

const BulkUpload = () => {
  const [targetTable, setTargetTable] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [downloadableFiles, setDownloadableFiles] = useState([]);
  const [error, setError] = useState(null);
  const [showBackdrop, setShowBackdrop] = React.useState(false);

  const { data } = useRetrieveTablesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const findSelectedItem = data
    ? data?.find((item) => item?.model_name === targetTable)
    : {};
  const { fields, ...restOfItems } = findSelectedItem || {};

  const [exportImportWithParams] = useExportImportWithParamsMutation();

  const handleExportClick = async () => {
    try {
      const response = await exportImportWithParams({
        ...restOfItems,
      }).unwrap();

      // Check if response exists and has content
      if (response) {
        // Create blob based on response type
        let blob;
        if (typeof response === "string") {
          blob = new Blob([response], { type: "text/csv" });
        } else if (response instanceof Blob) {
          blob = response;
        } else {
          // If response is JSON or other format, stringify it
          blob = new Blob([JSON.stringify(response)], {
            type: "application/json",
          });
        }

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${targetTable}_export.csv`; // Use table name in filename

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success("File downloaded successfully");
      } else {
        toast.error("No data received from server");
      }
    } catch (error) {
      toast.error(
        "Failed to export file: " + (error.message || "Unknown error")
      );
    }
  };

  const [
    exportImport,
    {
      data: exportResponse,
      isLoading,
      isError: isErrorFileExport,
      isSuccess: isFileExported,
      reset,
    },
  ] = useExportImportMutation();

  const getFileExtension = (fileName) => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts.pop() : ""; // Get the last part after the dot
  };

  const handleTableChange = (event) => {
    setTargetTable(event.target.value);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !targetTable) {
      setError("Please select a file and a target table.");
      return;
    }

    const formData = new FormData();
    // selectedFiles.forEach((file) => {
    const fileName = selectedFiles[0]?.name; // e.g., "document.pdf"
    const extension = getFileExtension(fileName);

    formData.append("file", selectedFiles[0]);
    formData.append("format", extension);
    // });
    for (const key in restOfItems) {
      if (Object.prototype.hasOwnProperty.call(restOfItems, key)) {
        const element = restOfItems[key];

        formData.append(key, element);
      }
    }
    // for (let [key, value] of formData.entries()) {
    //   console.log(`formData: ${key}: ${value}`);
    // }
    // try {
    await exportImport(formData);
    //   .unwrap();
    //   setDownloadableFiles(response.downloadableFiles || []);
    //   setSelectedFiles([]);
    //   setError(null);
    //   const fileInput = document.getElementById("file-input");
    //   if (fileInput) fileInput.value = "";
    // } catch (error) {
    //   setError("Upload failed. Please try again.");
    // }
  };

  const handleFormReset = () => {
    setDownloadableFiles([]);
    setError("");
    setSelectedFiles([]);
    setTargetTable("");
    setShowBackdrop(false);
    reset();
  };

  useEffect(() => {
    if (isFileExported || isErrorFileExport) {
      setShowBackdrop(true);

      // Set timeout to handle cleanup after 3 seconds
      const timer = setTimeout(() => {
        // Reset all states
        setShowBackdrop(false);

        // Only navigate on success cases
        if (isFileExported) {
          handleFormReset();
        }
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isErrorFileExport, isFileExported]);

  return (
    <div className={"p-3 w-11/12 mx-auto shadow-lg bg-white rounded-sm mt-4"}>
      <Typography variant="h5" gutterBottom>
        Import/Bulk Upload
      </Typography>

      <div className="mb-4 max-w-lg mx-auto">
        <div>
          <div className="flex items-center justify-between gap-x-2 my-3">
            <p className="text-black text-lg font-medium">
              Select Target table
            </p>
            <p className="text-gray-400 text-xs">
              Uploaded dataset will reflect in this targeted table
            </p>
          </div>
          <TextField
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid",
              },
            }}
            select
            value={targetTable}
            onChange={handleTableChange}
            placeholder="Select the destination table for data upload"
            InputProps={{
              endAdornment: <Button onClick={handleExportClick}>Export</Button>,
            }}
          >
            {data?.map((item) => {
              return (
                <MenuItem key={item?.model_name} value={item?.model_name}>
                  {item?.model_name}
                </MenuItem>
              );
            })}
          </TextField>
        </div>
        <div className="text-center">
          <Box
            sx={{
              p: 3,
              border: "2px dashed rgba(154, 154, 154, 1)",
              textAlign: "center",
              my: 3,
              cursor: "pointer",
            }}
            className={"rounded-sm"}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              // multiple
              onChange={handleFileSelect}
              style={{ display: "none" }}
              id="file-input"
              accept=".xlsx,.csv"
            />
            <label htmlFor="file-input">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <UploadFile sx={{ fontSize: 48, mb: 2 }} />
                {selectedFiles.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="textSecondary">
                      {selectedFiles.length} file(s) selected
                    </Typography>
                    {selectedFiles.map((file, index) => (
                      <Typography key={index} variant="body2">
                        {file.name}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <>
                    <Typography variant="body1" gutterBottom>
                      Drag & Drop or Choose file to upload
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      XLSX or CSV
                    </Typography>
                  </>
                )}
              </Box>
            </label>
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={isLoading || selectedFiles.length === 0 || !targetTable}
            sx={{ mb: 3 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Upload"}
          </Button>
        </div>
        <div>
          {downloadableFiles.length > 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Template Files to Download
              </Typography>
              {downloadableFiles.map((file, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1">{file.name}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: 2 }}
                    >
                      {file.size}
                    </Typography>
                  </Box>
                  <Button
                    startIcon={<Download />}
                    onClick={() => window.open(file.url)}
                  >
                    Download
                  </Button>
                </Paper>
              ))}
            </Box>
          )}
        </div>
      </div>
      <MuiCustomModal
        PaperProps={{
          sx: {
            background: "rgba(249, 249, 249, 1)",
            minHeight: 20,
          },
        }}
        open={showBackdrop}
        maxWidth="sm"
        onClose={() => setShowBackdrop(false)}
      >
        <div className="flex justify-center items-center flex-col gap-y-4">
          {isFileExported && <Avatar src={modal_tick_icon} />}
          <p
            className={`
            ${isFileExported ? "to-background-primary-main" : "text-red-500"} 
          pb-4 text-center font-normal text-md`}
            role="alert"
          >
            {exportResponse?.message}
          </p>
        </div>
      </MuiCustomModal>
    </div>
  );
};

export default BulkUpload;
