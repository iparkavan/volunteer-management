import React, { useEffect, useState } from "react";

import UploadIcon from "../../assets/images/image_1x.png";
import DeleteIcon from "../../assets/images/delete_1x.png";
import CancelIcon from "../../assets/images/cancel-colour1x.png";
import EditIcon from "../../assets/images/Edit1x.png";
import FileIcon from "../../assets/icons/linkIcon.svg";
import ReportUserIcon from "../../assets/images/report.png";
import SuccessTik from "../../assets/images/blue_tik1x.png";
import ReportVideoIcon from "../../assets/images/report1.png";
import { Button } from "../../shared";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { getReportDetails } from "../../services/reportsInfo";
import { dateTimeFormat } from "../../utils";
import { reportAllStatus } from "../../utils/constant";
import TickColorIcon from "../../assets/icons/tickColorLatest.svg";
import { updateReportRequest } from "../../services/request";
import { CancelPopup } from "../Mentor/Task/cancelPopup";
import { Typography } from "@mui/material";

const ViewReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [startTask, setStartTask] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const { reportDetails, loading: reportsLoading } = useSelector(
    (state) => state.reports
  );
  const userInfo = useSelector((state) => state.userInfo);
  const role = userInfo.data.role;

  useEffect(() => {
    console.log("reportDetails", reportDetails);
  }, [reportDetails]);

  const [confirmPopup, setConfirmPopup] = React.useState({
    bool: false,
    activity: false,
    type: "",
  });

  const handleSubmitTask = () => {
    if (!startTask) {
      setStartTask(false);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (params.id === "5") {
      setStartTask(true);
    }

    if (params && params.id !== "") {
      dispatch(getReportDetails(params.id));
    }
  }, [params]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        if (params.id === "5") navigate("/dashboard");
        else navigate("/mentee-tasks");
      }, 3000);
    }
  }, [loading]);

  const handleOpenPopup = (type) => {
    setConfirmPopup({
      ...confirmPopup,
      [type]: true,
      type: type,
    });
  };

  const handleClosePopup = () => {
    setConfirmPopup({
      [confirmPopup?.type]: false,
      activity: false,
      type: "",
    });
  };

  const handleReportRequest = (type = "", reason = "") => {
    let payload = {};
    if (type === "rejected") {
      payload = {
        id: reportDetails.id,
        status: type,
        rejection_reason: reason,
      };
    } else {
      payload = {
        id: reportDetails.id,
        status: type,
      };
    }
    dispatch(updateReportRequest(payload)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setConfirmPopup({
          ...confirmPopup,
          [type === "approved" ? "approve" : "reject"]: false,
          activity: true,
        });
        setTimeout(() => {
          setConfirmPopup({
            ...confirmPopup,
            [type === "approved" ? "approve" : "reject"]: false,
            activity: false,
            type: "",
          });
          dispatch(getReportDetails(params.id));
        }, 2000);
      }
    });
  };

  return (
    <div className="px-9 py-9">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <div className="px-5 py-1 flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20"
            style={{ background: "#fff", borderRadius: "10px" }}
          >
            <img src={SuccessTik} alt="SuccessTik" />
            <p
              className="text-[16px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1D5BBF] to-[#00AEBD]"
              style={{
                fontWeight: 600,
              }}
            >
              Task Submitted Successfully
            </p>
          </div>
        </div>
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={reportsLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!reportsLoading && Object.keys(reportDetails)?.length > 0 && (
        <div
          className="px-3 py-5"
          style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="flex justify-between px-5 pb-4 mb-8 items-center border-b-2">
            <div className="flex gap-5 items-center text-[20px]">
              <p>View {reportDetails?.report_name} </p>

              {reportDetails?.report_status === "pending" && (
                <div
                  className="inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                  onClick={() => navigate(`/edit-report/${reportDetails.id}`)}
                >
                  <img src={EditIcon} alt="EditIcon" />
                </div>
              )}
            </div>

            <div className="flex gap-8 items-center">
              <div className="relative">
                <div
                  className="inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <img src={CancelIcon} alt="CancelIcon" />
                </div>
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="relative flex gap-6 justify-between">
              <table className="w-[50%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody style={{ border: "1px solid #232323" }}>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      style={{ border: "1px solid #232323" }}
                      className="px-6 py-4 font-medium whitespace-nowrap text-font-secondary-black"
                    >
                      Category
                    </th>
                    <td
                      className="px-6 py-4 text-white"
                      style={{ background: "#FE634E" }}
                    >
                      {reportDetails.category_name}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      style={{ border: "1px solid #232323" }}
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-font-secondary-black"
                    >
                      Program Name
                    </th>
                    <td
                      className="px-6 py-4 text-white"
                      style={{ background: "#FE634E" }}
                    >
                      {reportDetails.program_name}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      style={{ border: "1px solid #232323" }}
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-font-secondary-black"
                    >
                      Course Level
                    </th>
                    <td
                      className="px-6 py-4 text-white"
                      style={{
                        background: "#FE634E",
                        textTransform: "capitalize",
                      }}
                    >
                      {reportDetails?.program_course_level}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      style={{ border: "1px solid #232323" }}
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-font-secondary-black"
                    >
                      Mentor Name
                    </th>
                    <td
                      className="px-6 py-4 text-white"
                      style={{ background: "#FE634E" }}
                    >
                      {reportDetails.created_by_full_name}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="w-[50%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody style={{ border: "1px solid #232323" }}>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      style={{ border: "1px solid #232323" }}
                      className="px-6 py-4 font-medium whitespace-nowrap text-font-secondary-black"
                    >
                      Program Start Date and Time
                    </th>
                    <td
                      className="px-6 py-4 text-white"
                      style={{ background: "#4f4f4f" }}
                    >
                      {dateTimeFormat(
                        reportDetails.program_start_date_and_time
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      style={{ border: "1px solid #232323" }}
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap text-font-secondary-black"
                    >
                      Program End Date and Time
                    </th>
                    <td
                      className="px-6 py-4 text-white"
                      style={{ background: "#4f4f4f" }}
                    >
                      {dateTimeFormat(reportDetails.program_end_date_and_time)}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      style={{ border: "1px solid #232323" }}
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-font-secondary-black"
                    >
                      Participated Mentees
                    </th>
                    <td
                      className="px-6 py-4 text-white"
                      style={{ background: "#4f4f4f" }}
                    >
                      {reportDetails?.participates?.length} Member
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {reportDetails?.rejection_reason && (
              <div className="border border-[#E0382D] rounded-[5px] bg-[#FFE7E7] mt-[20px]">
                <Typography
                  className="text-[#E0382D] !text-[18px] border border-b-[#E0382D]"
                  p={"12px 20px"}
                >
                  Cancelled Reason
                </Typography>
                <Typography
                  className="text-[#18283D] !text-[14px]"
                  p={"12px 20px"}
                >
                  {reportDetails?.rejection_reason}
                </Typography>
              </div>
            )}

            <div
              className="task-desc  mt-5 px-5 py-6 border border-border-black"
            >
              <div
                className="flex items-center hidden"
                style={{ background: "rgba(248, 249, 250, 1)" }}
              >
                <p className="text-[20px] w-[50%] px-20 leading-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  incididunt ut labore et dolore magna aliqua.{" "}
                </p>
                <img
                  style={{ width: "50%" }}
                  src={ReportUserIcon}
                  alt="ReportUserIcon"
                />
              </div>

              <div className="leading-10 py-6 hidden">
                any organizations rely on PL/SQL for data integration, but
                Informatica ETL offers a more efficient approach. This migration
                unlocks significant benefits, including streamlined workflows,
                improved scalability, and easier maintenance. Let's explore why
                migrating to Informatica ETL can be the key to unlocking your
                data's full potential.
              </div>

              <img
                className="w-full hidden"
                src={ReportVideoIcon}
                alt="ReportVideoIcon"
              />

              <div className="py-8 leading-9 hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum."
              </div>

              <div className="flex flex-col gap-3 mb-10">
                <div>Report Name : {reportDetails.name}</div>

                <div>Report Description : {reportDetails.comments}</div>
              </div>

              {reportDetails?.html_content && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: reportDetails?.html_content,
                      }}
                    ></div>
                  )}
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {role === "admin" && reportDetails?.status === "approved" ? (
                  <Typography
                    style={{
                      background: "#16B681",
                      borderRadius: "3px",
                      padding: "8px 16px",
                      color: "white",
                      display: "inline-block",
                      marginRight: 30,
                    }}
                  >
                    {" "}
                    Approved{" "}
                  </Typography>
                ) : reportDetails?.status === "rejected" ||
                  reportDetails?.status === "cancelled" ? (
                  <Typography
                    style={{
                      background: "rgb(224, 56, 45)",
                      borderRadius: "3px",
                      padding: "8px 16px",
                      color: "white",
                      display: "inline-block",
                      marginRight: 30,

                      // lineHeight: "30px",
                      // borderRadius: "3px",
                      // width: "110px",
                      // height: "34px",
                      // color: "rgb(224, 56, 45)",
                      // fontSize: "12px",
                      // textAlign: "center",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // background: "#fff",
                    }}
                    color="error"
                  >
                    {" "}
                    Rejected{" "}
                  </Typography>
                ) : null}
                   {role !== "admin" && (
                <span className="pr-2">
                  {/* <Button
                    btnType="button"
                    btnCls="w-[14%]"
                    onClick={() => {
                      navigate("/reports");
                    }}
                    btnName="Cancel"
                    btnCategory="secondary"
                  /> */}

                  {
                    // reportDetails.report_status === reportAllStatus.pending &&
                    ["new", "draft", "pending"].includes(
                      reportDetails?.status
                    ) && (
                      <Button
                        btnType="button"
                       btnCls="w-[120px] text-[#FFFFFF] bg-[#FE634E]"
                        onClick={() => {
                          navigate(`/edit-report/${reportDetails.id}`);
                        }}
                        btnName="Edit"
                      />
                    )
                  }

                  {/* <Button btnType="button" btnCls="w-[14%]"
                                    onClick={() => { navigate('/reports') }} btnName='Close'
                                    btnStyle={{ background: 'rgba(29, 91, 191, 1)' }}
                                /> */}
                </span>
              )}
                {role !== "admin" && <Button
                  btnType="button"
                  btnCls="w-[120px]"
                  onClick={() => {
                    navigate(-1);
                  }}
                  btnName="Close"
                  btnCategory="secondary"
                />}
              </div>
              {role === "admin" && reportDetails?.status === "new" ? (
                <div className="close-btn flex justify-center gap-7 pb-5">
                  <Button
                    btnType="button"
                    btnCategory="secondary"
                    btnName="Reject"
                    btnCls="!border !border-[#FFE7E7] !text-[#E0382D] !bg-[#FFE7E7] w-[120px]"
                    onClick={() => handleOpenPopup("reject")}
                  />

                  {
                    <Button
                      btnType="button"
                      btnCls="w-[120px]"
                      onClick={() => handleOpenPopup("approve")}
                      btnName="Approve"
                    />
                  }
                </div>
              ) : null}
            </div>
          </div>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => 1 }}
            open={confirmPopup.approve}
          >
            <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
              <img src={TickColorIcon} alt="TickColorIcon" />

              <div className="py-5">
                <p
                  style={{
                    color: "rgba(24, 40, 61, 1)",
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  Are you sure want to approve Report?
                </p>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-6 justify-center align-middle">
                  <Button
                    btnCls="w-[110px]"
                    btnName={"Cancel"}
                    btnCategory="secondary"
                    onClick={() => handleClosePopup()}
                  />
                  <Button
                    btnType="button"
                    btnCls="w-[110px]"
                    btnName={"Approve"}
                    style={{ background: "#16B681" }}
                    btnCategory="primary"
                    onClick={() => handleReportRequest("approved")}
                  />
                </div>
              </div>
            </div>
          </Backdrop>

          <CancelPopup
            open={confirmPopup?.reject}
            handleClosePopup={() => handleClosePopup()}
            handleSubmit={(reason) => handleReportRequest("rejected", reason)}
            header="Reject Reason"
          />

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={confirmPopup?.activity}
          >
            <div className="px-5 py-1 flex justify-center items-center">
              <div
                className="flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20"
                style={{ background: "#fff", borderRadius: "10px" }}
              >
                <img src={SuccessTik} alt="SuccessTik" />
                <p
                  className="text-[16px] font-semibold bg-clip-text !text-font-primary-main"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {confirmPopup?.type === "approve"
                    ? "Report Succesfully Approved"
                    : "Report Succesfully Rejected"}
                </p>
              </div>
            </div>
          </Backdrop>
        </div>
      )}
    </div>
  );
};

export default ViewReport;
