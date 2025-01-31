import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import { Backdrop, CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useSearchParams } from "react-router-dom";

import DataTable from "../../shared/DataGrid";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import ViewIcon from "../../assets/images/view1x.png";
import SearchIcon from "../../assets/images/search1x.png";
import CalenderIcon from "../../assets/images/calender_1x.png";
import EditIcon from "../../assets/images/Edit1x.png";
import DownloadIcon from "../../assets/images/download1x.png";
import DeleteIcon from "../../assets/images/delete1x.png";
import OverDeleteIcon from "../../assets/images/delete_1x.png";
import CancelIcon from "../../assets/images/cancel1x.png";
import { Button } from "../../shared";
import { deleteReports, getAllReports } from "../../services/reportsInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  pipeUrls,
  reportAllStatus,
  reportsStatus,
  reportStatus,
  reportStatusColor,
} from "../../utils/constant";
import { reportAdminColumns, reportColumns } from "../../utils/formFields";
import api from "../../services/api";
import CreatePostModal from "../Feeds/CreatePostModal";
import SettingsModal from "../Feeds/SettingsModal";
import SuccessTik from "../../assets/images/blue_tik1x.png";
import { useForm } from "react-hook-form";
import { createPost, updateFeedRequest } from "../../services/feeds";

const Reports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allreports, loading, status } = useSelector((state) => state.reports);
  const userInfo = useSelector((state) => state.userInfo);
  const role = userInfo.data.role;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filter, setFilter] = useState({ search: "", filter_by: "" });
  const [requestTab, setRequestTab] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [reportData, setReportData] = useState({
    action: "",
    selectedItem: [],
  });
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  // feed State start

  const [postModal, setPostModal] = useState({
    create: false,
    settings: false,
    control: false,
    visibility: false,
    activity: false,
  });
  const [formData, setFormData] = useState({
    visibility: "anyone",
    comment_control: "anyone",
    brand_partnership: false,
    is_published: true,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm();

  const handleCreatePostPopup = () => {
    setPostModal({ ...postModal, create: true, visibility: false });
    handleClose();
  };

  const handleClosePostPopup = () => {
    setPostModal({ ...postModal, create: false });
  };

  const handleVisibilty = () => {
    setPostModal({ ...postModal, settings: true });
  };

  const handleSettingsBack = () => {
    setPostModal({ ...postModal, settings: false, create: true });
  };

  const handleSettingsData = (data) => {
    setFormData({ ...formData, ...data });
    setPostModal({ ...postModal, settings: false, create: true });
  };

  const onSubmit = (data) => {
    const formDatas = new FormData();

    if (data.image) {
      if (Array.isArray(data.image)) {
        data.image.forEach((file, index) => {
          formDatas.append("image", file);
        });
      } else {
        formDatas.append("image", data.image);
      }
    }

    formDatas.append("title", data.title);
    formDatas.append("content", data.content);
    formDatas.append("brand_partnership", formData.brand_partnership);
    formDatas.append("comment_control", formData.comment_control);
    formDatas.append("visibility", formData.visibility);
    formDatas.append("is_published", formData.is_published);
    formDatas.append("request", reportData?.selectedItem?.[0]?.id);

    // console.log(formDatas);
    dispatch(createPost(formDatas)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setPostModal({
          ...postModal,
          create: false,
          activity: true,
        });
        setTimeout(() => {
          setPostModal({
            ...postModal,
            create: false,
            activity: false,
          });
          dispatch(updateFeedRequest({ status: "" }));
        }, 2000);
      }
    });
  };

  // feed State end

  const requestBtns = [
    {
      name: "All Reports",
      key: "all",
    },
    {
      name: "New Reports",
      key: "new",
    },
    {
      name: "Pending Reports",
      key: "pending",
    },
    {
      name: "Completed Reports",
      key: "approved",
    },
    {
      name: "Rejected Reports",
      key: "rejected",
    },
    {
      name: "Draft Reports",
      key: "draft",
    },
  ];

  const requestAdminBtn = [
    {
      name: "My Reports",
      key: "all",
    },
    {
      name: "Approved Reports",
      key: "approved",
    },
    {
      name: "Cancel Reports",
      key: "rejected",
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, data) => {
    setReportData({ action: "single", selectedItem: data });
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteReport = async () => {
    const ids = [];
    reportData.selectedItem.forEach((rows) => ids.push(rows.id));
    const reportId = { ids: ids };
    dispatch(deleteReports(reportId));
  };

  const reportColumn = [
    ...(role === "admin" ? reportAdminColumns : reportColumns).filter(
      (rColumn) => rColumn.status.includes(requestTab)
    ),
    {
      field: "report_status",
      headerName: "Status",
      flex: 1,
      id: 10,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background: reportStatusColor[params.row.status]?.bg || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  height: "34px",
                  color: reportStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {reportStatus[params.row.status]}
              </span>
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      id: 11,
      renderCell: (params) => {
        return (
          <>
            {
              <>
                <div
                  className="cursor-pointer flex items-center h-full"
                  onClick={(e) => handleClick(e, [params.row])}
                >
                  <img src={MoreIcon} alt="MoreIcon" />
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {role === "mentor" &&
                    reportData.selectedItem[0]?.status === "rejected" && (
                      <MenuItem
                        onClick={() =>
                          navigate(
                            `/edit-report/${reportData.selectedItem[0].id}?type=re-open`
                          )
                        }
                        className="!text-[12px]"
                      >
                        <img
                          src={ViewIcon}
                          alt="ViewIcon"
                          className="pr-3 w-[30px]"
                        />
                        Re-Open
                      </MenuItem>
                    )}

                  {role === "mentor" &&
                    (reportData.selectedItem[0]?.status === "new" ||
                      reportData.selectedItem[0]?.status === "pending" ||
                      reportData.selectedItem[0]?.status === "draft") && (
                      <MenuItem
                        onClick={() =>
                          navigate(
                            `/edit-report/${reportData.selectedItem[0].id}`
                          )
                        }
                        className="!text-[12px]"
                      >
                        <img
                          src={EditIcon}
                          alt="EditIcon"
                          className="pr-3 w-[30px]"
                        />
                        Edit
                      </MenuItem>
                    )}

                  <MenuItem
                    onClick={() =>
                      navigate(`/view-report/${reportData.selectedItem[0].id}`)
                    }
                    className="!text-[12px]"
                  >
                    <img
                      src={ViewIcon}
                      alt="ViewIcon"
                      className="pr-3 w-[30px]"
                    />
                    View
                  </MenuItem>
                  {/* {
                                    params.row.report_status === reportAllStatus.accept
                                    &&

                                    <MenuItem onClick={() => console.log('download', params)} className='!text-[12px]'>
                                        <img src={DownloadIcon} alt="DownloadIcon" className='pr-3 w-[30px]' />
                                        Download
                                    </MenuItem>
                                } */}

                  {role === "mentor" &&
                    (reportData.selectedItem[0]?.status === "new" ||
                      reportData.selectedItem[0]?.status === "pending" ||
                      reportData.selectedItem[0]?.status === "draft") && (
                      <MenuItem
                        onClick={handleDeleteSelectedRows}
                        className="!text-[12px]"
                      >
                        <img
                          src={DeleteIcon}
                          alt="DeleteIcon"
                          className="pr-3 w-[27px]"
                        />
                        Delete
                      </MenuItem>
                    )}
                  {reportData?.selectedItem?.[0]?.status === "approved" && (
                    <MenuItem
                      onClick={handleCreatePostPopup}
                      className="!text-[12px]"
                    >
                      <img
                        src={ViewIcon}
                        alt="ViewIcon"
                        className="pr-3 w-[27px]"
                      />
                      Post to Feed
                    </MenuItem>
                  )}
                </Menu>
              </>
            }
          </>
        );
      },
    },
  ];

  const title =
    (role === "admin" ? requestAdminBtn : requestBtns).find(
      (option) => option.key === requestTab
    )?.name || "";

  const handleTab = (key) => {
    let typeString = `?type=${key}`;
    if (key === "all") {
      typeString = "";
    }
    navigate(`${pipeUrls.reports}${typeString}`);
    setFilter({ filter_by: "", search: "" });
    setRequestTab(key);
    setPaginationModel({
      page: 0,
      pageSize: 10,
    });
  };

  const handleSelectedRow = (row) => {
    setReportData({ action: "multiple", selectedItem: row });
  };

  const handleDeleteSelectedRows = () => {
    setDeleteModal(true);
    handleClose();
  };

  const getReports = () => {
    const filterType = searchParams.get("type");
    const filterSearch = searchParams.get("search");
    const filterDate = searchParams.get("filter_by");
    let query = {};
    if (filterType && filterType !== "") {
      query.status =
        role === "admin" && requestTab === "all"
          ? "approved"
          : filterType === "cancel"
          ? "rejected"
          : filterType;
    }

    if (role === "admin" && requestTab === "all") {
      query.status = "approved";
    }

    if (filterSearch && filterSearch !== "") {
      query.search = filterSearch;
    }

    if (filterDate && filterDate !== "") {
      query.filter_by = filterDate;
    }
    query.request_type = "report";
    if (role === "admin") {
      query.request_by = "mentor";
    }
    dispatch(
      getAllReports({
        ...query,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
      })
    );
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setReportData({ action: "", selectedItem: [] });
  };

  const getQueryString = () => {
    const filterType = searchParams.get("type");
    let query = {};
    if (filterType && filterType !== "") {
      query = { type: filterType };
    }
    if (filter.search !== "") query.search = filter.search;
    if (filter.filter_by !== "") query.filter_by = filter.filter_by;
    return query;
  };

  const handleSearch = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  useEffect(() => {
    let query = getQueryString();
    setSearchParams(query);
  }, [filter]);

  useEffect(() => {
    getReports();
  }, [searchParams, paginationModel]);

  useEffect(() => {
    if (status === reportsStatus.delete) {
      setDeleteModal(false);
      getReports();
    }
  }, [status]);

  return (
    <div className="reports px-9 py-9">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deleteModal || loading}
      >
        {deleteModal && (
          <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
            <div
              style={{
                border: "1px solid rgba(229, 0, 39, 1)",
                borderRadius: "15px",
              }}
              className="relative flex flex-col gap-2 justify-center 
                        items-center py-14 px-16"
            >
              <img
                className="absolute top-2 right-3 cursor-pointer"
                onClick={() => setDeleteModal(false)}
                src={CancelIcon}
                alt="CancelIcon"
              />

              <img
                className="w-[50px]"
                src={OverDeleteIcon}
                alt="OverDeleteIcon"
              />

              <div className="py-5 mb-3">
                <p
                  style={{
                    color: "rgba(24, 40, 61, 1)",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  Are you sure want to delete this?
                </p>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-6 justify-center align-middle">
                  <button
                    style={{
                      background: "rgba(229, 0, 39, 1)",
                      color: "#fff",
                      borderRadius: "3px",
                      width: "130px",
                      padding: "13px",
                    }}
                    onClick={handleCancelDelete}
                  >
                    No
                  </button>
                  <button
                    style={{
                      border: "1px solid rgba(229, 0, 39, 1)",
                      color: "rgba(229, 0, 39, 1)",
                      borderRadius: "3px",
                      width: "130px",
                      padding: "13px",
                    }}
                    onClick={() => handleDeleteReport()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && <CircularProgress color="inherit" />}
      </Backdrop>

      <div
        className="px-3 py-5"
        style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="flex justify-between px-5 pb-4 mb-8 items-center border-b-2">
          <div className="flex gap-5 items-center ">
            <p>Reports</p>
          </div>
          <div className="flex gap-8 items-center">
            {reportData.action === "multiple" &&
            reportData.selectedItem.length ? (
              <img
                className="cursor-pointer"
                onClick={handleDeleteSelectedRows}
                src={OverDeleteIcon}
                alt="OverDeleteIcon"
              />
            ) : null}

            <div
              className="relative flex gap-3 py-3 px-3"
              style={{ border: "1px solid rgba(24, 40, 61, 0.25)" }}
            >
              <img src={CalenderIcon} alt="CalenderIcon" />
              <select
                className="focus:outline-none"
                onChange={(e) =>
                  setFilter({ ...filter, filter_by: e.target.value })
                }
              >
                <option value="month" selected={filter.filter_by === "month"}>
                  Month
                </option>
                <option value="week" selected={filter.filter_by === "week"}>
                  Week
                </option>
                <option value="day" selected={filter.filter_by === "day"}>
                  Day
                </option>
              </select>
            </div>
            <Button
              style={{ backgroundColor: "#FE634E" }}
              btnName="Create Report"
              onClick={() =>
                navigate("/create-report", { state: { type: "new" } })
              }
              btnCls="!py-4"
            />
          </div>
        </div>

        <div className="mx-5">
          <div className="flex gap-7 mb-6">
            {(role === "admin" ? requestAdminBtn : requestBtns).map(
              (actionBtn, index) => (
                <button
                  key={index}
                  className="px-5 py-4 text-[14px]"
                  style={{
                    background:
                      requestTab === actionBtn.key ? "#FE634E" : "#fff",
                    border:
                      requestTab !== actionBtn.key
                        ? "1px solid #FE634E"
                        : "none",
                    color: requestTab === actionBtn.key ? "#fff" : "#000",
                    borderRadius: "3px",
                    width: "180px",
                  }}
                  onClick={() => handleTab(actionBtn.key)}
                >
                  {actionBtn.name}
                </button>
              )
            )}
          </div>

          <div className="reports-table-container">
            <div className="flex justify-between px-5 pb-4 mb-8 items-center">
              <div className="flex gap-5 items-center ">
                <p className="text-[18px] font-semibold">{title}</p>
              </div>
              <div className="flex gap-8 items-center">
                <div className="relative">
                  <input
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 text-sm text-gray-900 border-none"
                    placeholder="Search here..."
                    style={{
                      border: "1px solid #FE634E",
                      height: "60px",
                      width: "345px",
                    }}
                    value={filter.search}
                    onChange={handleSearch}
                  />
                  <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                    <img src={SearchIcon} alt="SearchIcon" />
                  </div>
                </div>
              </div>
            </div>
            <DataTable
              rows={allreports?.results ?? []}
              columns={
                role === "admin" && requestTab === "all"
                  ? reportColumn?.filter((e) => e?.field !== "report_status")
                  : reportColumn
              }
              handleSelectedRow={handleSelectedRow}
              rowCount={allreports?.count}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              hideFooter={allreports?.results?.length === 0}
            />
          </div>
        </div>
      </div>
      {/* Create Feed */}
      {postModal.create && (
        <CreatePostModal
          register={register}
          handleSubmit={handleSubmit}
          formData={formData}
          errors={errors}
          reset={reset}
          setValue={setValue}
          getValues={getValues}
          open={postModal.create}
          handlePostData={onSubmit}
          handleClose={handleClosePostPopup}
          handleVisibilty={handleVisibilty}
          isReport={true}
          reportData={reportData?.selectedItem}
        />
      )}

      {postModal.settings && (
        <SettingsModal
          formData={formData}
          register={register}
          errors={errors}
          reset={reset}
          handleSubmit={handleSubmit}
          handleSettingsData={onSubmit}
          open={postModal.settings}
          handleClose={handleClose}
          handleSettingsBack={handleSettingsBack}
          handlePostData={handleSettingsData}
        />
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={postModal?.activity}
      >
        <div className="px-5 py-1 flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20"
            style={{ background: "#fff", borderRadius: "10px" }}
          >
            <img src={SuccessTik} alt="SuccessTik" />
            <p
              className="text-[16px] font-semibold bg-clip-text text-font-primary-main"
              style={{
                fontWeight: 600,
              }}
            >
              Your post is successfully uploaded
            </p>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default Reports;
