import React, { useState, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { MoreVert, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import EditIcon from "@mui/icons-material/Edit";
import PreviewMode from "./PreviewMode";
import ClearIcon from "@mui/icons-material/Clear";
import "./colors.css";
import SuccessGradientMessage from "./SuccessGradientMessage";
import "./colors.css";
import CreateForm from "../../assets/icons/CreateForm.svg";
import { useDeleteFormMutation, useGetFormsQuery } from "../../features/formBuilder/formBuilderSlice"
import DataTable from "../../shared/DataGrid";
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

const FormsDataGrid = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showPreview, setShowPreview] = useState(false);
  const [selectedFormJson, setSelectedFormJson] = useState(null);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [backdropMessage, setBackdropMessage] = useState("");

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const handleCopyLink = (row) => {
    const link = `${process.env.REACT_APP_SITE_URL}/form_link/${row.id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => { })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const AddCircleIcon = () => <img src={CreateForm} alt="plus" />;

  const {
    data: forms,
    isLoading: isGetFormsLoading,
    isFetching,
    isSuccess
  } = useGetFormsQuery({
    page: paginationModel.page + 1,
    page_size: paginationModel.pageSize
  });

  const handlePaginationModelChange = useCallback((newModel) => {
    setPaginationModel(newModel);
  }, []);

  // useEffect(() => {
  //   // console.log('isLoading:', isLoading);
  //   // console.log('isError', isError);
  //   // console.log('isSuccess', isSuccess);
  //   // console.log('error', error);
  //   // console.log('form', forms);
  //   console.log("*****", forms)
  // }, [isLoading, error, forms, isError, isSuccess]);

  const [deleteForm, { isLoading: isDeleteFormLoading, isSuccess: isDeleteFormSuccess },] = useDeleteFormMutation()

  React.useEffect(() => {
    if (isDeleteFormSuccess) {
      setBackdropMessage("Deleted Successfully");
      setIsBackdropOpen(true);
      setTimeout(() => {
        setIsBackdropOpen(false);
      }, 2000);
    }
  }, [isDeleteFormSuccess])

  const columns = [
    {
      field: "form_name",
      headerName: "Form Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-[#FFF1E7]",
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      headerClassName: "bg-[#FFF1E7]",
      renderCell: (params) => (
        <div className="flex items-center justify-center w-full h-full relative">
          <div
            className={`w-12 h-6 rounded-full ${params.value ? "bg-[#FE634E]" : "bg-gray-200"
              } relative cursor-pointer`}
          >
            <div
              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${params.value ? "left-7" : "left-1"
                }`}
            />
          </div>
        </div>
      ),
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "bg-[#FFF1E7]",
    },
    {
      field: "created_date",
      headerName: "Created Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "bg-[#FFF1E7]",
    },
    {
      field: "created_time",
      headerName: "Created Time",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "bg-[#FFF1E7]",
    },
    {
      field: "modified_by",
      headerName: "Modified By",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "bg-[#FFF1E7]",
    },
    {
      field: "modified_date",
      headerName: "Modified Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "bg-[#FFF1E7]",
    },
    {
      field: "modified_time",
      headerName: "Modified Time",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "bg-[#FFF1E7]",
    },
    {
      field: "checkFormData",
      headerName: "Form Preview", // You might want to change this to "Collection of Form data" to match the new design
      headerAlign: "center",
      flex: 1,
      align: "center",
      headerClassName: "bg-[#FFF1E7]",

      renderCell: (params) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleView(params.row);
          }}
          className="bg-[#FFF1E7] px-2 py-2 flex items-center justify-center mx-auto transform translate-y-2"
        >
          <span className="text-[#FE634E] cursor-pointer hover:text-[#FF3D30] text-sm text-center">
            {" "}
            Check form Data
          </span>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerClassName: "bg-[#FFF1E7]",
      renderCell: (params) => (
        <>
          <div
            className="cursor-pointer flex items-center h-full"
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e, params.row);
            }}
          >
            <MoreVert />
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleCopyLink(selectedRow);
                handleClose();
                setBackdropMessage("Link copied successfully!");
                setIsBackdropOpen(true);
                setTimeout(() => {
                  setIsBackdropOpen(false);
                }, 2000);
              }}
              className="!text-[12px]"
            >
              <InsertLinkIcon className="mr-2" fontSize="small" />
              Copy Link
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleEdit(selectedRow);
                handleClose();
              }}
              className="!text-[12px]"
            >
              <EditIcon className="mr-2" fontSize="small" />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete(selectedRow);
                handleClose();
              }}
              className="!text-[12px]"
            >
              <DeleteIcon className="mr-2" fontSize="small" />
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDelete = (obj) => {
    deleteForm(obj.id)
  };

  const handleView = (formData) => {
    // const formJson = {
    //   id: formData.id,
    //   form_name: formData.form_name,
    //   number_of_columns: formData.number_of_columns,
    //   fields: formData.fields,
    //   status: formData.status,
    //   created_by: formData.created_by,
    // };
    setSelectedFormJson(formData);
    setShowPreview(true);
  };

  const handleEdit = (selectedRow) => {
    navigate(`/form/${selectedRow.id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-[#1A1F25] font-medium font-['Plus Jakarta Sans'] text-[20px] leading-[25.2px] mb-6">
        All forms
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 border-gray-200">
        <div className="flex justify-between items-center mb-6">
          {/* <TextField placeholder="Search your items..." variant="outlined" size="small" style={{ width: "300px" }} /> */}
          <TextField
            placeholder="Search your forms"
            variant="outlined"
            size="small"
            style={{
              width: "300px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            // Optional: Add clear button
            InputProps={{
              endAdornment: searchText && (
                <IconButton onClick={() => setSearchText("")} size="small">
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/form/add")}
            sx={{
              backgroundColor: "#FE634E",
              "&:hover": {
                backgroundColor: "#FE634E",
              },
              textTransform: "none",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              Width: "195px",
              Height: "60px",
              Top: "370px",
              Left: "1625px",
              Radius: "3px",
              color:"#FFFFFF"
            }}
          >
            Create form
          </Button>
        </div>

        <div>
          {/* <DataGrid
            rows={forms?.results || []}
            columns={columns}
            rowCount={forms?.count || 0}
            paginationModel={paginationModel}
            pageSizeOptions={[5, 10, 20]}
            onPaginationModelChange={handlePaginationModelChange}
            paginationMode="server"
            // loading={isGetFormsLoading || isFetching} 
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#FFF1E7',
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
            }}
          /> */}
          <DataTable
            rows={forms?.results ?? []}
            columns={columns}
            rowCount={forms?.count ?? 0}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel} />
        </div>
      </div>

      {showPreview && selectedFormJson && (
        <PreviewMode
          formJson={selectedFormJson}
          setFormJson={setSelectedFormJson}
          open={showPreview}
          handleClose={() => {
            setShowPreview(false);
            setSelectedFormJson(null);
          }}
          action="save"
        />
      )}
      <SuccessGradientMessage
        message={backdropMessage}
        isBackdropOpen={isBackdropOpen}
        set
        IsBackdropOpen={setIsBackdropOpen}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isDeleteFormLoading || isGetFormsLoading || isFetching}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default FormsDataGrid;
