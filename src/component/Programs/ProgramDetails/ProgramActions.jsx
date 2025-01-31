import React from "react";
import { Box, Stack } from "@mui/material";
import {
  menteeNotJoinCondition,
  menteeProgramStatus,
  programActionStatus,
  programApprovalStage,
  programCancelled,
  programCompleted,
} from "../../../utils/constant";
import DoubleArrowIcon from "../../../assets/images/double_arrow 1x.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../../../shared";

const ProgramActions = ({
  role,
  programdetails,
  handleJoinProgram,
  isLaunchingProgram,
  requestId,
  requestStatusParams,
  setCancelPopup,
  handleAcceptCancelProgramRequest,
  setOpenPopup,
  type,
  from
}) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Common status button styles
  const buttonStyles = {
    base: {
      borderRadius: "5px",
      padding: "12px 64px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
    },
    gradient: {
      background: "#FE634E",
    },
    success: {
      background: "#16B681",
    },
    danger: {
      border: "1px solid #E0382D",
      color: "#E0382D",
    },
    width30: {
      width: "30%",
    },
  };

  // const renderRequestStatus = () => {
  //   if (!requestStatusParams) return null;

  //   return (
  //     <div className="py-9">
  //       <div
  //         className="py-3 px-16 text-white text-[14px] flex justify-center items-center"
  //         style={{
  //           ...buttonStyles.base,
  //           background: reqStatusColor[programdetails?.request_data?.status],
  //           width: "30%",
  //         }}
  //       >
  //         {reqStatus[programdetails?.request_data?.status]}
  //       </div>
  //     </div>
  //   );
  // };

  const renderCompletedStatus = () => {
    if (!programCompleted.includes(programdetails.status)) return null;

    return (
      <div className="py-9">
        <span
          className="py-3 px-16 text-white text-[14px]"
          style={{
            ...buttonStyles.gradient,
          }}
        >
          Program Completed
        </span>
      </div>
    );
  };

  const renderMentorActions = () => {
    if (role !== "mentor") return null;

    console.log("Status:", programdetails.status);
    console.log("Request Data Status:", programdetails?.request_data?.status);

    // High-priority condition
    if ((programdetails.status === "yettojoin")) {
      return (
        <div className="py-9">
          <button
            className="py-3 px-16 text-white text-[14px] flex items-center"
            style={{ ...buttonStyles.base, ...buttonStyles.gradient }}
            onClick={() =>
              !isLaunchingProgram && handleJoinProgram("program_join")
            }
          >
            {isLaunchingProgram ? "loading..." : "Launch Program"}
            <span className="pl-8 pt-1">
              <img
                style={{ width: "15px", height: "13px" }}
                src={DoubleArrowIcon}
                alt="DoubleArrowIcon"
              />
            </span>
          </button>
        </div>
      );
    }

    // Lower-priority conditions follow
    if (
      programdetails.status === "yettoapprove" &&
      programdetails?.admin_program
    ) {
      return (
        <button
          className="py-3 px-16 text-white mt-4"
          style={{
            ...buttonStyles.base,
            ...buttonStyles.gradient,
            // ...buttonStyles.width30,
          }}
          onClick={() => setOpenPopup(true)}
        >
          Accept this program
        </button>
      );
    }

    if (
      programCompleted.includes(programdetails.status) ||
      programCancelled.includes(programdetails.status)
    )
      return null;

    if (requestId !== "") {
      if (
        programdetails.status === "accept" ||
        (programdetails.status !== "yettostart" &&
          programdetails?.request_data?.status === "approved")
      ) {
        return (
          <div className="flex item-center gap-x-3">
            {programdetails.status !== "yettojoin" &&
              programdetails.status !== "inprogress" && (
                <button
                  className="py-3 px-16 mt-7 text-white text-[14px] flex items-center cursor-auto"
                  style={{ ...buttonStyles.base, ...buttonStyles.success }}
                  onClick={() => undefined}
                >
                  Approved
                </button>
              )}
            {programdetails?.program_created_is_admin &&
              programdetails.status !== "inprogress" && (
                <button
                  className="py-3 px-16 mt-7 text-white text-[14px] flex items-center"
                  style={{ ...buttonStyles.base, ...buttonStyles.gradient }}
                  onClick={() =>
                    navigate(`/update-program/${programdetails?.id}`)
                  }
                >
                  Edit
                </button>
              )}
          </div>
        );
      }

      if (programdetails.status === "cancel") {
        return (
          <button
            className="py-3 mt-7 px-16 text-white text-[14px] flex items-center"
            style={{ ...buttonStyles.base, ...buttonStyles.danger }}
            onClick={() => undefined}
          >
            Rejected
          </button>
        );
      }
    }

    if (
      programApprovalStage[programdetails.status] &&
      !programdetails?.admin_program
    ) {
      return (

        <div>
          <div className="flex gap-4 pt-10">
            <button
              className="py-3 px-16 text-white text-[14px] flex items-center"
              style={{
                ...buttonStyles.base,
                ...buttonStyles.danger,
                cursor: "not-allowed",
              }}
              onClick={() => undefined}
            >
              {programApprovalStage[programdetails.status].type === "waiting" && (
                <i className="pi pi-clock" style={{ color: "red" }}></i>
              )}
              {programApprovalStage[programdetails.status].type === "reject" && (
                <i className="pi pi-ban" style={{ color: "red" }}></i>
              )}
              <span className="pl-3">
                {programApprovalStage[programdetails.status]?.text}
              </span>
            </button>
          </div>
          {["new", "pending"].includes(
            programdetails?.request_data?.status
          ) && (
              <div className="flex items-center justify-start gap-6 mt-4">
                {/* <button
                  onClick={() => setCancelPopup(true)}
                  className="!border-[2px] border-red-500 rounded-md text-red-500 px-4 py-2 font-semibold text-sm flex items-center"
                > */}
                <Button
                  onClick={() => setCancelPopup(true)}
                  btnCls="w-auto h-11 !border-[2px] !border-red-500 rounded-md !text-red-500 px-4 py-2 !font-semibold !text-sm flex items-center"
                  btnName="Cancel Request"
                  btnCategory="secondary"
                />
                <Button
                  btnType="button"
                  btnCls="w-[110px] h-11"
                  btnName={"Edit"}
                  btnCategory="primary"
                  onClick={() =>
                    navigate(`/update-program/${programdetails?.id}`)
                  }
                />
              </div>
            )}
        </div>
      );
    }

    if (programdetails.status === "draft") {
      return (
        <div className="py-9">
          <div
            className="py-3 px-16 text-white text-[14px] flex justify-center items-center"
            style={{
              ...buttonStyles.base,
              ...buttonStyles.gradient,
              ...buttonStyles.width30,
            }}
          >
            Drafted
          </div>
        </div>
      );
    }

    if (
      (programdetails.status === "yettostart" ||
        programdetails.status === "inprogress") &&
      ["new", "pending"].includes(programdetails?.request_data?.status) &&
      programdetails?.request_data?.request_type !== "program_reschedule" &&
      programdetails?.request_data?.request_type !== "program_cancel"
    ) {
      return (
        <div className="py-9">
          <Stack direction="row" alignItems="center" spacing="20px">
            <button
              className="py-3 px-16 text-white text-[14px] flex items-center"
              style={{ ...buttonStyles.base, ...buttonStyles.danger }}
              onClick={() =>
                handleAcceptCancelProgramRequest("cancel", programdetails.id)
              }
            >
              {searchParams.has("type") &&
                searchParams.get("type") === "program_cancel"
                ? "Continue"
                : "Reject Request"}
            </button>
            <button
              className="py-3 px-16 text-white text-[14px] flex items-center"
              style={{ ...buttonStyles.base, ...buttonStyles.success }}
              onClick={() =>
                handleAcceptCancelProgramRequest("accept", programdetails.id)
              }
            >
              Approve Request
            </button>
          </Stack>
        </div>
      );
    }

    const showApproveRejectButtons =
      (programdetails?.status === "inprogress" ||
        programdetails?.status === "yettostart") &&
      programdetails?.request_data?.request_type === "program_new" &&
      ["new", "pending"].includes(programdetails?.request_data?.status);
      
      // old condition
      
      // (programdetails.status === "yettostart" ||
      //   programdetails.status === "inprogress") &&
      // programdetails?.request_data?.status === "new" &&
      // programdetails?.request_data?.request_type === "program_cancel"
    

    if (showApproveRejectButtons) {
      return (
        <div className="py-9">
          <Stack direction="row" alignItems="center" spacing="20px">
            <button
              className="py-3 px-16 text-white text-[14px] flex items-center"
              style={{ ...buttonStyles.base, ...buttonStyles.danger }}
              onClick={() =>
                handleAcceptCancelProgramRequest("cancel", programdetails.id)
              }
            >
              {searchParams.has("type") &&
                searchParams.get("type") === "program_cancel"
                ? "Continue"
                : "Reject Request"}
            </button>
            <button
              className="py-3 px-16 text-white text-[14px] flex items-center"
              style={{ ...buttonStyles.base, ...buttonStyles.success }}
              onClick={() =>
                handleAcceptCancelProgramRequest("accept", programdetails.id)
              }
            >
              Approve Request
            </button>
          </Stack>
        </div>
      );
    }

    return null;
  };

  const renderMenteeActions = () => {
    if (
      role !== "mentee" ||
      programCompleted.includes(programdetails.status) ||
      programCancelled.includes(programdetails.status)
    )
      return null;

    if (
      programdetails?.status === "yettostart" &&
      programdetails?.mentee_join_status === "program_join_request_accepted"
    ) {
      return (
        <button
          className="py-3 my-3 px-16 text-white text-[14px] flex items-center"
          style={{
            ...buttonStyles.base,
            ...buttonStyles.gradient,
            cursor: "not-allowed",
          }}
          onClick={() => undefined}
        >
          Program Manager yet to start
        </button>
      );
    }

    if (programdetails?.request_data?.status === "rejected") {
      return (
        <button
          className="py-3 mt-7 px-16 text-white text-[14px] flex items-center cursor-default"
          style={{ ...buttonStyles.base, ...buttonStyles.danger }}
          onClick={() => undefined}
        >
          Rejected
        </button>
      );
    }

    return (
      <div className="py-9">
        {menteeProgramStatus[programdetails.mentee_join_status] ? (
          <>
          {
          ["new", "pending", "rejected"].includes(
                  programdetails?.request_data?.status
                ) && 
                (
                  <button
                    onClick={() => setCancelPopup(true)}
                    className="border-[2px] border-red-500 rounded-md text-red-500 px-4 py-2 font-semibold text-sm flex items-center"
                  >
                    Cancel Request
                  </button>
                )}
            {programdetails.mentee_join_status !==
              menteeProgramStatus.program_join_request_accepted.status && (
                <div className="space-y-4">
                  <button
                    className="py-3 px-16 text-white text-[14px] flex items-center"
                    style={{
                      ...buttonStyles.base,
                      ...buttonStyles.danger,
                      cursor: "not-allowed",
                    }}
                    onClick={() => undefined}
                  >
                    {menteeProgramStatus[programdetails.mentee_join_status]
                      .type === "waiting" && (
                        <i className="pi pi-clock" style={{ color: "red" }}></i>
                      )}
                    {menteeProgramStatus[programdetails.mentee_join_status]
                      .type === "reject" && (
                        <i className="pi pi-ban" style={{ color: "red" }}></i>
                      )}
                    <span className="pl-3">
                      {
                        menteeProgramStatus[programdetails.mentee_join_status]
                          ?.text
                      }
                    </span>
                  </button>                  
                </div>
              )}
          </>
        ) : (
          !menteeNotJoinCondition.includes(programdetails.status) &&
          ![
            "program_join_payment_initiate",
            "program_join_payment_pending",
            "program_join_request_submitted",
            "program_join_request_rejected",
          ].includes(programdetails?.mentee_join_status) &&
          !programdetails?.admin_assign_program && (
            <button
              className="py-3 px-16 text-white text-[14px] flex items-center"
              style={{ ...buttonStyles.base, ...buttonStyles.gradient }}
              onClick={() =>
                !isLaunchingProgram && handleJoinProgram("program_join")
              }
            >
              {isLaunchingProgram ? "Loading..." : "Join Program"}
              <span className="pl-8 pt-1">
                <img
                  style={{ width: "15px", height: "13px" }}
                  src={DoubleArrowIcon}
                  alt="DoubleArrowIcon"
                />
              </span>
            </button>
          )
        )}
      </div>
    );
  };

  // const renderAdminActions = () => {
  //   if (role !== "admin") return null;

  //   // Show "Program Manager yet to start" for yettostart status with approved request

  //   if (
  //     programdetails.status === "yettostart" &&
  //     programdetails?.request_data?.status !== "new"
  //   ) {
  //     return (
  //       <button
  //         className="py-3 my-3 px-16 text-white text-[14px] flex items-center"
  //         style={{
  //           ...buttonStyles.base,
  //           ...buttonStyles.gradient,
  //           cursor: "not-allowed",
  //         }}
  //         onClick={() => undefined}
  //       >
  //         Program Manager yet to start
  //       </button>
  //     );
  //   }

  //   // Show "In Progress" status for inprogress status with approved request
  //   if (
  //     programdetails.status === "inprogress" &&
  //     programdetails?.request_data?.status === "approved"
  //   ) {
  //     return (
  //       <div className="py-9">
  //         <div
  //           className="py-3 px-16 text-white text-[14px] flex justify-center items-center"
  //           style={{
  //             ...buttonStyles.base,
  //             ...buttonStyles.gradient,
  //             ...buttonStyles.width30,
  //           }}
  //         >
  //           In Progress
  //         </div>
  //       </div>
  //     );
  //   }

  //   // const showRequestButtons =
  //   //   programdetails?.status !== "started" && // Exclude "started" status
  //   //   ((programdetails?.status === "yettoapprove" &&
  //   //     programdetails?.request_data?.request_type !== "program_assign") ||
  //   //     (programdetails?.status === "inprogress" &&
  //   //       programdetails?.request_data?.status !== "rejected") || // Explicit check for "inprogress"
  //   //     (programdetails?.request_data?.request_type === "program_reschedule" &&
  //   //       programdetails?.request_data?.status === "new") ||
  //   //     (programdetails?.request_data?.request_type === "program_cancel" &&
  //   //       programdetails?.request_data?.status === "new"));

  //   const showRequestButtons =
  //     programdetails?.status !== "started" && // Exclude "started" status
  //     (programdetails?.status === "yettoapprove" ||
  //       (programdetails?.status === "inprogress" &&
  //         programdetails?.request_data?.status &&
  //         programdetails?.request_data?.status !== "approved" &&
  //         programdetails?.request_data?.status !== "rejected") || // Explicit check for "inprogress"
  //       (programdetails?.request_data?.request_type === "program_reschedule" &&
  //         programdetails?.request_data?.status === "new") ||
  //       (programdetails?.request_data?.request_type === "program_cancel" &&
  //         programdetails?.request_data?.status === "new"));

  //   if (showRequestButtons) {
  //     return (
  //       <Box mt={2}>
  //         <Stack direction="row" alignItems="center" spacing="20px">
  //           <button
  //             className="py-3 px-16 text-white text-[14px] flex items-center"
  //             style={{ ...buttonStyles.base, ...buttonStyles.danger }}
  //             onClick={() =>
  //               handleAcceptCancelProgramRequest("cancel", programdetails.id)
  //             }
  //           >
  //             {searchParams.has("type") &&
  //               searchParams.get("type") === "program_cancel"
  //               ? "Continue"
  //               : "Reject Request"}
  //           </button>
  //           <button
  //             className="py-3 px-16 text-white text-[14px] flex items-center"
  //             style={{ ...buttonStyles.base, ...buttonStyles.success }}
  //             onClick={() =>
  //               handleAcceptCancelProgramRequest("accept", programdetails.id)
  //             }
  //           >
  //             Approve Request
  //           </button>
  //         </Stack>
  //       </Box>
  //     );
  //   }

  //   if (
  //     programdetails?.request_data?.status === "rejected" ||
  //     (!requestStatusParams &&
  //       programdetails?.status === "new_program_request_rejected")
  //   ) {
  //     return (
  //       <Box mt={2}>
  //         <button
  //           className="py-3 px-16 text-white text-[14px] flex items-center"
  //           style={{
  //             ...buttonStyles.base,
  //             ...buttonStyles.danger,
  //             cursor: "not-allowed",
  //           }}
  //           onClick={() => undefined}
  //         >
  //           Rejected
  //         </button>
  //       </Box>
  //     );
  //   }

  //   if (
  //     programdetails?.status === "yettojoin" &&
  //     // programdetails?.request_data?.request_type === "program_new"
  //     programdetails?.request_data?.status === "approved"
  //   ) {
  //     return (
  //       <button
  //         className="py-3 px-16 text-white text-[14px] flex items-center"
  //         style={{
  //           ...buttonStyles.base,
  //           ...buttonStyles.gradient,
  //           cursor: "not-allowed",
  //         }}
  //         onClick={() => undefined}
  //       >
  //         Program Manager yet to launch
  //       </button>
  //     );
  //   }

  //   return null;
  // };

  // Render common status buttons
  
  const renderAdminActions = () => {
    if (role !== "admin") return null;

    const showRequestButtons =
      programdetails?.status !== "started" && // Exclude "started" status
      (programdetails?.status === "yettoapprove" ||
        (programdetails?.status === "inprogress" &&
          programdetails?.request_data?.status &&
          programdetails?.request_data?.status !== "approved" &&
          programdetails?.request_data?.status !== "rejected") || // Explicit check for "inprogress"
        (programdetails?.request_data?.request_type === "program_reschedule" &&
          programdetails?.request_data?.status === "new") ||
        (programdetails?.request_data?.request_type === "program_cancel" &&
          programdetails?.request_data?.status === "new"));

    if (showRequestButtons && from !== "subprogram") {
      return (
        <Box mt={2}>
          <Stack direction="row" alignItems="center" spacing="20px">
            <button
              className="py-3 px-16 text-white text-[14px] flex items-center"
              style={{ ...buttonStyles.base, ...buttonStyles.danger }}
              onClick={() =>
                handleAcceptCancelProgramRequest("cancel", programdetails.id)
              }
            >
              {searchParams.has("type") &&
              searchParams.get("type") === "program_cancel"
                ? "Continue"
                : "Reject Request"}
            </button>
            <button
              className="py-3 px-16 text-white text-[14px] flex items-center"
              style={{ ...buttonStyles.base, ...buttonStyles.success }}
              onClick={() =>
                handleAcceptCancelProgramRequest("accept", programdetails.id)
              }
            >
              Approve Request
            </button>
          </Stack>
        </Box>
      );
    }
    if (programdetails?.request_data?.status === "approved") {
      return (
        <Box mt={2}>
          <button
            className="py-3 px-16 text-white text-[14px] flex items-center"
            style={{
              ...buttonStyles.base,
              ...buttonStyles.success,
              cursor: "not-allowed",
            }}
            onClick={() => undefined}
          >
            Approved
          </button>
        </Box>
      );
    }
    if (
      programdetails?.request_data?.status === "rejected" ||
      (!requestStatusParams &&
        programdetails?.status === "new_program_request_rejected")
    ) {
      return (
        <Box mt={2}>
          <button
            className="py-3 px-16 text-white text-[14px] flex items-center"
            style={{
              ...buttonStyles.base,
              ...buttonStyles.danger,
              cursor: "not-allowed",
            }}
            onClick={() => undefined}
          >
            Rejected
          </button>
        </Box>
      );
    }

    if (
      programdetails.status === "yettojoin" &&
      !["new", "pending"].includes(programdetails?.request_data?.status) &&
      programdetails?.created_by === userInfo?.data?.user_id
    ) {
      return (
        <div className="py-9">
          <button
            className="py-3 px-16 text-white text-[14px] flex items-center"
            style={{ ...buttonStyles.base, ...buttonStyles.gradient }}
            onClick={() =>
              !isLaunchingProgram && handleJoinProgram("program_join")
            }
          >
            {isLaunchingProgram ? "loading..." : "Launch Program"}
            <span className="pl-8 pt-1">
              <img
                style={{ width: "15px", height: "13px" }}
                src={DoubleArrowIcon}
                alt="DoubleArrowIcon"
              />
            </span>
          </button>
        </div>
      );
    }

    if (
      programdetails?.status === "yettojoin" &&
      // programdetails?.request_data?.request_type === "program_new"
      programdetails?.request_data?.status === "approved"
    ) {
      return (
        <button
          className="py-3 px-16 text-white text-[14px] flex items-center"
          style={{
            ...buttonStyles.base,
            ...buttonStyles.success,
            cursor: "not-allowed",
          }}
          onClick={() => undefined}
        >
          Program Manager yet to launch
        </button>
      );
    }

    return null;
  };


  const renderCommonStatus = () => {
    // Start Program button
    if (
      ((programdetails.status === programActionStatus.yettostart &&
        !requestId &&
        (role === "mentor" || role === "admin")) ||
        (type === "admin_assign_program" &&
          requestId &&
          programdetails.status === programActionStatus.yettostart &&
          (role === "mentor" || role === "admin"))) &&
      programdetails?.created_by === userInfo?.data?.user_id


      // programdetails.status === programActionStatus.yettostart &&
      // programdetails?.request_data?.status !== "rejected" &&
      // programdetails?.request_data?.request_type !== "program_cancel" &&
      // role === "mentor"
    ) {
      return (
        <div className="my-8">
          <button
            className="py-3 px-16 text-white text-[14px] flex items-center"
            style={{ ...buttonStyles.base, ...buttonStyles.gradient }}
            onClick={() =>
              !isLaunchingProgram && handleJoinProgram("program_start")
            }
          >
            {isLaunchingProgram ? "Loading..." : "Start Program"}
          </button>
        </div>
      );
    }

    if (programdetails?.status === "inprogress") {
      if (
        programdetails?.program_mode === "virtual_meeting" &&
        (role !== "mentee" ||
          (role === "mentee" && programdetails?.program_joined_status)) &&
        ((role === "admin" &&
          programdetails?.created_by === userInfo?.data?.user_id) ||
          role === "mentee" ||
          role === "mentor")
      ) {
        return (
          <div className="my-8">
            <a
              href={programdetails?.meeting_link}
              target="_blank"
              className="py-3 px-16 text-white text-[14px] rounded-sm cursor-pointer"
              style={{ ...buttonStyles.gradient }}
              rel="noreferrer"
            >
              {"Join Meeting"}
            </a>
          </div>
        );
      }
    }
    
    // Cancelled status
    if (programdetails.status === "cancelled") {
      return (
        <div className="flex gap-4 pt-10">
          <button
            className="py-3 px-16 text-white text-[14px] flex items-center"
            style={{
              ...buttonStyles.base,
              ...buttonStyles.danger,
              cursor: "not-allowed",
            }}
            onClick={() => undefined}
          >
            Cancelled
          </button>
        </div>
      );
    }

    if (
      programdetails?.status === "inprogress" &&
      programdetails?.request_data?.request_type === "approved"
    ) {
      return (
        <div className="py-9">
          <span
            className="py-3 px-16 text-white text-[14px]"
            style={{ ...buttonStyles.base, ...buttonStyles.gradient }}
          >
            In Progress
          </span>
        </div>
      );
    }

    if (programdetails.status === "cancelled") {
      return (
        <div className="flex gap-4 pt-10">
          <button
            className="py-3 px-16 text-white text-[14px] flex items-center"
            style={{
              ...buttonStyles.base,
              ...buttonStyles.danger,
              cursor: "not-allowed",
            }}
            onClick={() => undefined}
          >
            {requestId ? "Program Cancelled" : "Cancelled"}
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      {renderCompletedStatus()}
      {renderMentorActions()}
      {renderMenteeActions()}
      {renderAdminActions()}
      {renderCommonStatus()}
      {/* {renderRequestStatus()} */}
    </div>
  );
};

export default ProgramActions;
