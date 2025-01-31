import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import { pipeUrls, ProgramStatusInCard } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../../utils";

const ActionMenu = ({ params }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (action) => {
    switch (action) {
      case "view":
        navigate(
          `${pipeUrls.programdetails}/${params?.id}${
            params?.admin_program_request_id
              ? `?request_id=${params?.admin_program_request_id}`
              : "admin_assign_program" in params
              ? `?program_create_type=admin_program`
              : ""
          }`
        );
        break;
      // case "changeMentor":
      //   // Handle change mentor action
      //   break;
      // case "discussions":
      //   // Handle discussions action
      //   break;
      // case "share":
      //   // Handle share action
      //   break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? "action-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleMenuClick("view")}>
          <VisibilityIcon sx={{ mr: 1 }} fontSize="small" />
          View
        </MenuItem>
        {/* <MenuItem onClick={() => handleMenuClick("changeMentor")}>
          <PeopleIcon sx={{ mr: 1 }} fontSize="small" />
          Change Program Manager
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("discussions")}>
          <ChatIcon sx={{ mr: 1 }} fontSize="small" />
          Discussions
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("share")}>
          <ShareIcon sx={{ mr: 1 }} fontSize="small" />
          Share
        </MenuItem> */}
      </Menu>
    </div>
  );
};

const SubprogramsDataGrid = ({ data }) => {
  const columns = [
    { field: "mentor_name", headerName: "Program Manager Name", flex: 1 },
    { field: "subprogram", headerName: "Sub program", flex: 1 },
    { field: "program_name", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1.5 },
    { field: "start_date", headerName: "Start date", flex: 1,
      renderCell: (params) => {
        return <div>{dateFormat(params.row.start_date)}</div>;
      },
     },
    { field: "end_date", headerName: "End date", flex: 1,
      renderCell: (params) => {
        return <div>{dateFormat(params.row.end_date)}</div>;
      },
     },
    { field: "acceptedDate", headerName: "Accepted date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: ProgramStatusInCard[params.row?.status].bg,
            color: ProgramStatusInCard[params.row?.status].color,
            padding: "6px 12px",
            fontSize: "0.875rem",
            borderRadius: 4,
          }}
        >
          {ProgramStatusInCard[params.row?.status].text}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => <ActionMenu params={params.row} />,
    },
  ];

  return (
    <div>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#FFF1E7",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F9FAFB",
          },
        }}
        hideFooter={true}
      />
    </div>
  );
};

export default SubprogramsDataGrid;
