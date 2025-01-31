import React from "react";
import viewEquipmentIcon from "../../assets/icons/viewEquipmentIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import DataTable from "../../shared/DataGrid";
import { dateFormat } from "../../utils";
import { SearchBoxVM } from "../../shared/searchBoxVM";
import { useDispatch, useSelector } from "react-redux";
import { getEquipmentHistory } from "./network/equipment";

export const EquipmentHistory = () => {
  const navigate = useNavigate();
  const state = useLocation()?.state;
  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [searchText, setSearchText] = React.useState("");
  const { equipmentHistoryData, loading } = useSelector(
    (state) => state.equipment
  );

  
  const details = state?.data;

  const statusStyle = {
    available:
      "!border !border-[#16B681] rounded-[50px] !text-[#16B681] !bg-[#EBFFF3] !text-[14px] py-1 px-2 capitalize",
    inuse:
      "!border !border-[#FE634E] rounded-[50px] !text-[#FE634E] !bg-[#FFF8F2] !text-[14px] py-1 px-2 capitalize",
    deactivated:
      "!border !border-[#BF453A] rounded-[50px] !text-[#BF453A] !bg-[#FFE7E7] !text-[14px] py-1 px-2 capitalize",
    archived:
      "!border !border-[#4F4F4F] rounded-[50px] !text-[#4F4F4F] !bg-[#DFDFDF] !text-[14px] py-1 px-2 capitalize",
  };

  const equimentHistoryColumn = [
    {
      field: "program_name",
      headerName: "Program Name",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div>
            <a
              href={`/program-details/${params?.row?.program?.id}`}
              className="text-[#1D5BBF] text-[14px]"
            >
              {params?.row?.program?.program_name}
            </a>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return <div>{params?.row?.program?.category_name}</div>;
      },
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return <div>{dateFormat(params?.row?.program?.start_date)}</div>;
      },
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return <div>{dateFormat(params?.row?.program?.end_date)}</div>;
      },
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return params.row?.program?.city && params.row?.program?.state
          ? `${params.row?.program?.city_details?.name}, ${params.row?.program?.state_details?.name}`
          : "-";
      },
    },
    {
      field: "used_by",
      headerName: "Used by",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div>
            <a
              href={`/mentor-details/${params?.row?.created_by}`}
              className="text-[#1D5BBF] text-[14px]"
            >
              {params?.row?.used_by}
            </a>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    handleGetHistoryList();
  }, []);

  const handleGetHistoryList = (searchValue = "") => {
    const payload = {
      page: paginationModel?.page + 1,
      limit: paginationModel?.pageSize,
      search: searchValue,
    };
    dispatch(getEquipmentHistory({ id: details?.id, payload }));
  };

  const handleSearch = (text) => {
    setSearchText(text);
    handleGetHistoryList(text)
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{
          border: "1px solid rgba(228, 237, 255, 1)",
          marginTop: "30px",
        }}
        className="px-5 pt-5 mx-6"
      >
        <div>
          <Stack
            direction={"row"}
            spacing={3}
            alignItems={"center"}
            width={"100%"}
          >
            {details?.equipment_image ? (
              <img
                src={details?.equipment_image ?? viewEquipmentIcon}
                alt="viewEquipmentIcon"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.15)",
                  borderRadius: "5px",
                  boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)",
                  height: "120px",
                  width: "120px",
                }}
              />
            ) : (
              <div
                className="px-4 py-4 bg-white"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.15)",
                  borderRadius: "5px",
                  boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)",
                }}
              >
                <img src={viewEquipmentIcon} alt="viewEquipmentIcon" />
              </div>
            )}
            <Stack spacing={2} width={"100%"}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <h3 className="text-primary-black text-[24px]">
                    {details?.equipment_name}
                  </h3>
                  <div className={statusStyle[details?.equipment_status]}>
                    {details?.equipment_status}
                  </div>
                </Stack>
              </Stack>

              <Typography className="!text-[#353F4F] !text-[16px]">
                {details?.equipment_descriptions}
              </Typography>
            </Stack>
          </Stack>

          <Box className="mb-3">
            <Box className="flex w-full justify-end my-4">
              <SearchBoxVM
                handleSearch={(value) => handleSearch(value)}
                value={searchText}
              />
            </Box>
            <DataTable
              rows={equipmentHistoryData?.results ?? []}
              columns={equimentHistoryColumn}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              rowCount={equipmentHistoryData?.count}
              hideCheckbox
              // hideFooter={getEquipmentData?.results?.length === 0}
            />
          </Box>
        </div>
      </div>
    </>
  );
};
