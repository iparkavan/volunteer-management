import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import vmFileDelete from "../../../assets/icons/vmFileDelete.svg";
import UploadIcon from "../../../assets/icons/vmUploadIcon.svg";

export const CustomUpload = ({
  handleChange = () => false,
  uploadedFile = [],
  handleDelete = () => false,
  isMultiFile = false,
}) => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <label
          className="flex flex-col items-center justify-center h-[100%] w-full border-2
                         border-gray-300 border-dashed cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-8 pb-8">
            <img src={UploadIcon} alt="" />
            <p
              className="text-xs text-gray-500 dark:text-gray-400"
              style={{ marginTop: "12px" }}
            >
              Add Document
            </p>
          </div>
          <input
            type="file"
            // accept="image/png, image/jpeg, image/jpg, image/webp, image/heic"
            onChange={(val) => {
              if (val.target.files) {
                handleChange(
                  isMultiFile ? val.target.files : val.target.files[0]
                );

                // Reset the input value
                val.target.value = null;
              }
            }}
            className="hidden"
            multiple={isMultiFile}
          />
        </label>
      </div>

      {isMultiFile && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {uploadedFile?.map((doc, i) => {
            return (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                className="!border !border-[#FE634E] rounded-[50px] p-2 max-w-[150px] mt-[20px]"
              >
                <Typography className="!text-[#232323] !text-[14px] truncate max-w-[200px]">
                  {doc?.name}
                </Typography>
                <div className="cursor-pointer" onClick={() => handleDelete(i)}>
                <img src={vmFileDelete} alt="vmFileDelete" className="h-[20px] w-[20px]" />
                </div>
              </Stack>
            );
          })}
        </Box>
      )}

      {uploadedFile?.name && !isMultiFile && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          className="!border !border-[#FE634E] rounded-[50px] p-2 max-w-[150px] mt-[20px]"
        >
          <Typography className="!text-[#232323] !text-[14px] truncate max-w-[200px]">
            {uploadedFile?.name}
          </Typography>
          <div className="cursor-pointer" onClick={() => handleDelete(0)}>
            <img src={vmFileDelete} alt="vmFileDelete" className="h-[20px] w-[20px]" />
          </div>
        </Stack>
      )}
    </div>
  );
};
