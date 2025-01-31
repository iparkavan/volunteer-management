import React, { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useSearchParams,
  useParams,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Backdrop,
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import PauseIcon from "../../../assets/images/pause1x.png";
import ResumeIcon from "../../../assets/images/resume1x.png";
import {
  programActionStatus,
  programCompleted,
  requestStatus,
} from "../../../utils/constant";
import {
  getMenteeJoinedInProgram,
  updateProgram,
} from "../../../services/userprograms";
import {
  programCancelRequest,
  programRescheduleRequest,
  updateLocalRequest,
  updateProgramMenteeRequest,
  updateProgramRequest,
} from "../../../services/request";
import PlusCircle from "../../../assets/icons/Pluscircle.svg";
import UserImage from "../../../assets/icons/user-icon.svg";
import ShareIcon from "../../../assets/images/share1x.png";
import RescheduleIcon from "../../../assets/images/reschedule1x.png";
import MoreIcon from "../../../assets/images/more1x.png";
import AbortIcon from "../../../assets/images/abort1x.png";
import LocationIcon from "../../../assets/images/Location1x.png";
import CalendarIcon from "../../../assets/images/calender_1x.png";
import RatingsIcon from "../../../assets/images/ratings1x.png";
import CertificateIcon from "../../../assets/images/certficate1x.png";
import QuoteIcon from "../../../assets/images/quotes1x.png";
import MuiModal from "../../../shared/Modal";
import SuccessTik from "../../../assets/images/blue_tik1x.png";
import LinkIcon from "../../../assets/images/link1x.png";
import TickColorIcon from "../../../assets/icons/tickColorLatest.svg";
import TimeHistoryIcon from "../../../assets/icons/time-history-icon.svg";
import CancelIcon from "../../../assets/images/cancel1x.png";
import CompleteIcon from "../../../assets/images/completed1x.png";
import { Button } from "../../../shared";
import {
  convertDateFormat,
  dateFormat,
  formatDateTimeISO,
  todatDateInfo,
} from "../../../utils";
import "./program-details.css";
import Ratings from "../Ratings";
import { getUserProfile } from "../../../services/profile";
import DataTable from "../../../shared/DataGrid";
import { JoinedProgramMenteeColumn } from "../../../mock";
import ToastNotification from "../../../shared/Toast";
import { Calendar } from "primereact/calendar";
import {
  getProgramMentees,
  insertProgramNotes,
} from "../../../services/programInfo";
import ConfirmIcon from "../../../assets/icons/Popup-confirmation.svg";
import CloseIcon from "../../../assets/icons/close_x.svg";
import {
  useAcceptProgramMutation,
  useGetSpecificProgramDetailsQuery,
  useLaunchProgramMutation,
} from "../../../features/program/programApi.services";
import SubprogramsDataGrid from "./SubProgramTable";
import ProgramActions from "./ProgramActions";
import { toast } from "react-toastify";
import SkillsSet from "../../SkillsSet";
import moment from "moment";
import CustomAccordian from "../../../shared/Accordian/accordian";
import { EquipmentFormFields } from "../../equipmentManagement/formFields";
import ColorLocation from "../../../assets/icons/colorLocation.svg";
import ProgramHistoryIcon from "../../../assets/icons/historyIcon.svg";
import EquipmentSection from "./EquipmentSection";
import PaidTickIcon from "../../../assets/icons/paidTickIcon.svg";
import EditSVGIcon from "../../../assets/icons/editIcon.svg";
import { CustomModal } from "../../../shared/CustomModal/CustomModal";
import { CancelPopup } from "../../Mentor/Task/cancelPopup";
import SuccessGradientMessage from "../../success-gradient-message";
import ProgramReasons from "./ProgramReasons";

export default function ProgramDetails({ setProgramDetailsId }) {
  const dateInfo = todatDateInfo();

  const params = useParams();
  const [searchParams] = useSearchParams();
  const [acceptProgram, { isSuccess: isAccepted, reset: resetProgramAccept }] =
    useAcceptProgramMutation();
  const requestId = searchParams.get("request_id") || "";
  const requestStatusParams = searchParams.get("status") || "";
  const program_create_type = searchParams.get("program_create_type") || "";
  const typeParams = searchParams.get("type");
  const from = searchParams.get("from");
  const userdetails = useSelector((state) => state.userInfo);
  const role = userdetails.data.role || "";
  const reqRole = requestId && userdetails.data.role === "admin";
  const [cancelPopup, setCancelPopup] = useState(false);
  const [cancelPopupConfirmation, setCancelPopupConfirmation] = useState(false);
  const [loading, setLoading] = useState({ initial: true, join: false });
  const calendarRef = useRef([]);
  const [taskJoined, setTaskJoined] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState(false);
  const [dateFormatted, setDateFormat] = useState({});
  const [taskJoinedRequest, setTaskJoinedRequest] = useState(false);
  const [moreMenuModal, setMoreMenuModal] = useState({
    share: false,
    reschedule: false,
  });

  const [completeProgram, setCompleteProgram] = React.useState({
    bool: false,
    activity: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    launchProgram,
    { isLoading: isLaunchingProgram, isError, error: actionError },
  ] = useLaunchProgramMutation();

  const {
    data: programdetails,
    isLoading: programLoading,
    refetch,
  } = useGetSpecificProgramDetailsQuery(
    {
      id: params?.id,
      requestId: requestId,
      ...(program_create_type && { program_create_type }),
    },
    {
      skip: !params?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  const [activeTab, setActiveTab] = useState("about_program");
  const [ratingModal, setRatingModal] = useState({
    modal: false,
    success: false,
  });

  const [certificateActiveTab, setCertificateActiveTab] =
    useState("participated");

  const [viewMenteeModal, setViewMenteeModal] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState({
    accept: false,
    cancel: false,
    programId: "",
  });
  const { profile, loading: profileLoading } = useSelector(
    (state) => state.profileInfo
  );
  const { programMentees, loading: programLoading1 } = useSelector(
    (state) => state.programInfo
  );
  const { menteeJoined, status } = useSelector((state) => state.userPrograms);
  const {
    loading: requestLoading,
    status: requestProgramStatus,
    error: requestError,
  } = useSelector((state) => state.requestList);
  const rating =
    programdetails?.mentor_rating === 0 ? 3 : programdetails?.mentor_rating;
  const url = `${process.env.REACT_APP_SITE_URL}/program-details/${params.id}`;
  const state = useLocation()?.state;

  const [notesForm, setNotesForm] = React.useState({
    date: new Date(),
    time: new Date(),
    location: "",
    comment: "",
    error: {
      date: "",
      time: "",
      location: "",
      comment: "",
    },
  });
  const [notesActivity, setNotesActivity] = React.useState(false);
  const [selectedLM, setSelectedLM] = React.useState({
    bool: false,
    data: "",
  });

  const tabs = [
    {
      name: "About Program",
      key: "about_program",
    },
    !programdetails?.sub_programs && {
      name: "Program Testimonials",
      key: "program_testimonials",
    },
  ].filter(Boolean);

  const reqStatus = {
    approved: "Approved",
    rejected: "Rejected",
    new: "New",
  };
  const reqStatusColor = {
    approved: "#16B681",
    rejected: "#E0382D",
    new: "#16B681",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const participatedTabs = [
    {
      name: "Participated",
      key: "participated",
    },
    {
      name: "Completed",
      key: "completed",
    },
  ];

  const notesFields = [
    {
      type: "date",
      label: "Date",
      isRequired: true,
      col: 4,
      key: "date",
      isDisable: true,
    },
    {
      type: "time",
      label: "Time",
      isRequired: true,
      col: 4,
      key: "time",
      isDisable: true,
    },
    {
      type: "textbox",
      label: "Location",
      isRequired: true,
      col: 4,
      key: "location",
      endAdornment: <img src={ColorLocation} alt="color_location" />,
      background: "#FFF8F2",
    },
    {
      type: "textarea",
      label: "Comment",
      isRequired: true,
      col: 12,
      key: "comment",
      background: "#FFF8F2",
    },
  ];

  const updateState = (key, value) => {
    setNotesForm({
      ...notesForm,
      [key]: value,
      error: {
        ...notesForm?.error,
        [key]: "",
      },
    });
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTab = (key) => {
    setActiveTab(key);
  };

  const handleCerificateTab = (key) => {
    setCertificateActiveTab(key);
  };
  const handleOpenConfirmPopup = () => {
    handleClose();
    setCompleteProgram({
      ...completeProgram,
      bool: true,
    });
  };

  const handleCloseConfirmPopup = () => {
    setCompleteProgram({
      bool: false,
      activity: false,
    });
  };

  const handleComplete = (programId) => {
    handleClose();
    dispatch(
      updateProgram({
        id: programdetails.id,
        status: programActionStatus.completed,
      })
    ).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setCompleteProgram({
          bool: false,
          activity: true,
        });
        setTimeout(() => {
          setCompleteProgram({
            bool: false,
            activity: false,
          });
          navigate(`/program-completion/${programId}`);
        }, 2000);
      }
    });
  };

  const handleJoinProgram = async (request_type) => {
    if (role === "mentee" && !userdetails?.data?.is_registered) {
      navigate(`/questions?program_id=${programdetails.id}`);
    } else if (role === "mentee" && !userdetails?.data?.document_upload) {
      navigate(`/mentee-doc-upload/${programdetails.id}`);
    } else {
      await launchProgram({ program: programdetails?.id, request_type });
    }
  };

  // useEffect(() => {
  //   if (programLaunchedSuccessful) {
  //     navigate(
  //       `${pipeUrls.startprogram}/${params.id}?program_create_type=${program_create_type}`
  //     );
  //   }
  // }, [params.id, programLaunchedSuccessful]);

  const handleAcceptProgram = async () => {
    await acceptProgram({
      id: requestId,
      program: programdetails?.id,
      request_type: "program_assign",
      status: "approved",
    });
  };
  // Handle Accept Program Popup
  const handleConfirmPopup = () => {
    if (role === "admin") {
      dispatch(
        updateProgramRequest({
          id: parseInt(requestId),
          status: "approved",
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          setConfirmPopup({
            ...confirmPopup,
            accept: false,
          });
          refetch();
        }
      });
    }
    if (role === "mentor") {
      dispatch(
        updateProgramMenteeRequest({
          id: parseInt(requestId),
          status: "approved",
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          setConfirmPopup({
            ...confirmPopup,
            accept: false,
          });
          refetch();
        }
      });
    }
  };

  const handleCancelSubmit = (reason) => {
    if (role === "mentor") {
      dispatch(
        updateProgramMenteeRequest({
          id: programdetails?.request_data?.id,
          status: "rejected",
          rejection_reason: reason,
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          // handleCloseCancelReasonPopup();
          setCancelPopup(false);
          setCancelPopupConfirmation(true);
          setTimeout(() => {
            setCancelPopupConfirmation(false);
            refetch();
          }, 2000);
        }
      });
    }

    if (role === "mentee") {
      dispatch(
        updateProgramRequest({
          id: programdetails?.request_data?.id,
          status: "rejected",
          reason: reason,
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          setCancelPopup(false);
          setCancelPopupConfirmation(true);
          setTimeout(() => {
            setCancelPopupConfirmation(false);
            refetch();
          }, 2000);
        }
      });
    }
  };

  // Handle Submit Cancel Program Popup
  const handleCancelReasonPopupSubmit = (data) => {
    if (data.cancel_reason !== "") {
      if (confirmPopup.cancel) {
        if (role === "admin") {
          dispatch(
            updateProgramRequest({
              id: parseInt(requestId),
              status: "rejected",
              reason: data.cancel_reason,
            })
          ).then((res) => {
            if (res?.meta?.requestStatus === "fulfilled") {
              setConfirmPopup({
                ...confirmPopup,
                cancel: false,
              });
              refetch();
            }
          });
        }

        if (role === "mentor") {
          dispatch(
            updateProgramMenteeRequest({
              id: parseInt(requestId),
              status: "rejected",
              rejection_reason: data.cancel_reason,
            })
          ).then((res) => {
            if (res?.meta?.requestStatus === "fulfilled") {
              setConfirmPopup({
                ...confirmPopup,
                cancel: false,
              });
              refetch();
            }
          });
        }
      }
    }
  };

  // Accept / Cancel Program Request
  const handleAcceptCancelProgramRequest = (action, programid) => {
    let popup = { ...confirmPopup, programId: programid };
    if (action === "accept") {
      setConfirmPopup({ ...popup, accept: true });
    }
    if (action === "cancel") {
      setConfirmPopup({ ...popup, cancel: true });
    }
  };

  // Handle Close Accept / Cancel Popup
  const resetAcceptCancelPopup = () => {
    setConfirmPopup({ accept: false, cancel: false, programId: "" });
  };

  const handleInstructor = (programdetails) => {
    const mentorId = programdetails?.mentor_info?.id || "";

    // if (mentorId !== '' && mentorId !== userdetails?.data?.user_id) {
    navigate(`/mentor-profile/${mentorId}`);
    // }
  };

  const ratingModalSuccess = () => {
    setRatingModal({ modal: false, success: true });
  };

  const ratingModalClose = () => {
    setRatingModal({ modal: false, success: false });
  };

  const handleViewJoinedMentees = (programInfo) => {
    dispatch(getProgramMentees(programInfo?.id));
    setViewMenteeModal(true);
  };

  const JoinMenteeColumn = [
    ...JoinedProgramMenteeColumn,
    {
      field: "action",
      headerName: "View",
      width: 150,
      id: 3,
      renderCell: (params) => {
        return (
          <button
            style={{
              background: "rgb(29, 91, 191)",
              color: "rgb(255, 255, 255)",
              padding: "2px 20px",
              height: "32px",
              margin: "9px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "3px",
            }}
            onClick={() => navigate(`/mentee-details/${params.row?.id}`)}
          >
            {" "}
            View Profile{" "}
          </button>
        );
      },
    },
  ];

  const handleMenu = (key) => {
    switch (key) {
      case "create-task":
        navigate("/assign-mentees/1");
        handleClose();
        break;
      case "share":
        setMoreMenuModal({ ...moreMenuModal, share: true });
        handleClose();
        break;
      case "reschedule":
        setMoreMenuModal({ ...moreMenuModal, reschedule: true });
        handleClose();
        break;

      case "cancel":
        setMoreMenuModal({ ...moreMenuModal, reschedule: false, cancel: true });
        handleClose();
        break;
      case "edit":
        navigate(`/update-program/${params?.id}`);
        break;
      case "discussion":
        break;
      default:
        break;
    }
  };

  const handleMoreMenuClosePopup = () => {
    setMoreMenuModal({ share: false, reschedule: false, cancel: false });
    reset();
  };

  const handleDateClick = () => {
    setTimeout(() => {
      document
        .querySelector(".p-datepicker")
        ?.classList.add("program-date-picker");
    }, 200);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setMessage(true);
      })
      .catch(() => {
        setMessage(false);
      });
  };

  const handleCloseNotify = () => {
    setMessage(false);
  };

  const onSubmit = (data) => {
    if (moreMenuModal.reschedule) {
      const formattedStartDate = convertDateFormat(data.reschedule_start_date);
      const formattedEndDate = convertDateFormat(data.reschedule_end_date);

      const payload = {
        // reschedule_start_date: formattedStartDate,
        // reschedule_end_date: formattedEndDate,
        // program_id: params.id,
        // reason: data.reason,

        request_type: "program_reschedule",
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        program: params.id,
        comments: data?.reason,
      };
      dispatch(programRescheduleRequest(payload));
    }

    if (moreMenuModal.cancel) {
      dispatch(
        programCancelRequest({
          program: params.id,
          comments: data.cancel_reason,
          request_type: "program_cancel",
        })
      );
    }
  };

  useEffect(() => {
    if (ratingModal.success) {
      setTimeout(() => {
        setRatingModal({ modal: false, success: false });
      }, 3000);
    }
  }, [ratingModal.success]);

  useEffect(() => {
    if (
      programdetails &&
      Object.keys(programdetails)?.length &&
      !programLoading
    ) {
      // const notAllowedCond = [
      //   "completed",
      //   "yettoapprove",
      //   "draft",
      //   "cancelled",
      // ];

      // if (!notAllowedCond.includes(programdetails.status)) {
      //   if (
      //     role === "mentee" &&
      //     programdetails.status !== "yettojoin" &&
      //     programdetails.mentee_join_status === "program_join_request_accepted"
      //   ) {
      //     navigate(
      //       `${pipeUrls.startprogram}/${params.id}?program_create_type=${program_create_type}`
      //     );
      //   }

      //   if ((role === "mentor" || role === "admin") && requestId === "") {
      //     if (programdetails.status === programActionStatus.yettostart) {
      //       navigate(
      //         `${pipeUrls.startprogram}/${params.id}?program_create_type=${program_create_type}`
      //       );
      //     } else if (
      //       programdetails.status === programActionStatus.inprogress ||
      //       programdetails.status === programActionStatus.assigned ||
      //       programdetails.status === programActionStatus.paused ||
      //       programdetails.status === programActionStatus.started
      //     ) {
      //       navigate(
      //         `${pipeUrls.startprogram}/${params.id}?program_create_type=${program_create_type}`
      //       );
      //     }
      //   }
      // }

      if (
        role === "mentee" &&
        programdetails.status === "completed" &&
        !programdetails.mentee_program_rating
      ) {
        setRatingModal({ modal: true, success: false });
      }

      setLoading({ ...loading, initial: false });
    }
  }, [programdetails, menteeJoined]);

  useEffect(() => {
    const programId = params.id;
    if (programId && programId !== "") {
      if (role === "mentee") {
        dispatch(getMenteeJoinedInProgram({ id: programId }));
      }
    }

    if (!Object.keys(profile)?.length) {
      dispatch(getUserProfile());
    }
  }, [params.id, role]);

  useEffect(() => {
    if (status === programActionStatus.yettostart) {
      setLoading({ initial: false, join: true });
    }
  }, [status]);

  useEffect(() => {
    if (requestProgramStatus === requestStatus.programupdate) {
      setTimeout(() => {
        setConfirmPopup({ accept: false, cancel: false, programId: "" });
        dispatch(updateLocalRequest({ status: "" }));
      }, [2000]);
    }

    if (
      requestProgramStatus === requestStatus.reschedule ||
      requestProgramStatus === requestStatus.cancel
    ) {
      setMoreMenuModal({ share: false, reschedule: false });
      reset();
      setDateFormat({});
      setTimeout(() => {
        dispatch(updateLocalRequest({ status: "" }));
      }, 3000);
    }
  }, [requestProgramStatus]);

  useEffect(() => {
    if (taskJoined) {
      setTimeout(() => {
        // if (role === 'mentor') navigate(`${pipeUrls.assigntask}/${programdetails.id}`)
        // if (role === "mentee")
        //   navigate(`${pipeUrls.startprogram}/${programdetails.id}`);
        refetch();
      }, [3000]);
    }
  }, [taskJoined]);

  useEffect(() => {
    if (loading.join) {
      if (role === "mentee") setTaskJoinedRequest(true);
      setTimeout(() => {
        setLoading({ ...loading, join: false });

        // if (role === 'mentor') navigate(`${pipeUrls.programtask}/${programdetails.id}`)
        if (role === "mentee") setTaskJoinedRequest(false);
      }, [3000]);
    }
  }, [loading.join]);

  const dateStartField = moreMenuModal.reschedule
    ? register("reschedule_start_date", { required: "This field is required" })
    : undefined;
  const dateEndField = moreMenuModal.reschedule
    ? register("reschedule_end_date", { required: "This field is required" })
    : undefined;

  // const payment = useSelector((state) => state.payment);

  // const [programDetailsId, setProgramDetailsId] = useState(null);
  //   const [clientSecret, setClientSecret] = useState();

  // const stripePromise = loadStripe(process.env.REACT_APP_STRIP_SECRET_KEY);

  useEffect(() => {
    if (isError) {
      toast.error(actionError?.data?.errors?.[0]);
    }
  }, [actionError, isError]);

  useEffect(() => {
    if (isAccepted) {
      setTimeout(() => {
        resetProgramAccept();
        navigate(`/update-program/${programdetails?.id}`);
      }, 3000);
    }
  }, [isAccepted, programdetails?.id]);

  // notes functions

  const handleValidate = () => {
    let error = notesForm.error;
    let isValid = true;
    if (notesForm?.date === "") {
      isValid = false;
      error.date = "Date is Required";
    }
    if (notesForm?.time === "") {
      isValid = false;
      error.time = "Time is Required";
    }
    if (notesForm?.location === "") {
      isValid = false;
      error.location = "Location is Required";
    }
    if (notesForm?.comment === "") {
      isValid = false;
      error.comment = "Comment is Required";
    }
    setNotesForm({
      ...notesForm,
      error: error,
    });
    return isValid;
  };

  const handleSubmitNotes = () => {
    if (handleValidate()) {
      const payload = {
        post_date: moment(notesForm?.date).format("yyyy-MM-DD"),
        post_time: moment(notesForm?.time).format("hh:mm"),
        address: notesForm?.location,
        description: notesForm?.comment,
        program: params.id,
      };
      dispatch(insertProgramNotes(payload)).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          setNotesForm({
            date: "",
            time: "",
            location: "",
            comment: "",
          });
          setNotesActivity(true);
          setTimeout(() => {
            setNotesActivity(false);
          }, 2000);
        }
      });
    }
  };

  const handleNewTaskFromAdmin = (data) => {
    const constructedData = {
      ...data,

      program_category_name: programdetails?.category_name,
      program_name: programdetails?.program_name,
      program_startdate: programdetails?.start_date,
      program_enddate: programdetails?.end_date,
      task_name: programdetails?.task_name ?? "",
      reference_link: programdetails?.reference_links ?? "",
      task_details: programdetails?.task_details ?? "",
      due_date: programdetails?.due_date,
      // "assign_task_id": null,
      list_mentees: programdetails?.participated_mentees,
      program_id: programdetails?.id,
      program_duration: programdetails?.duration,
      category_id: programdetails?.categories?.[0]?.id,
      // "mentor_id": programdetails?.created_by,
      mentor_name: programdetails?.mentor_name,
      // "task_id": null,
      state_date: programdetails?.start_date,
    };

    navigate(`/assign-mentees/?type=edit&from=program`, {
      state: {
        data: constructedData,
      },
    });
  };

  // payment status start
  const start_date = moment(programdetails?.start_date);
  const current_date = moment();
  const daysDifference = start_date.diff(current_date, "days");

  let statusMessage;

  if (daysDifference > 3) {
    statusMessage = `${daysDifference} more days left`;
  } else if (daysDifference === 0) {
    statusMessage = "Program is started today!";
  } else if (daysDifference < 0) {
    const absDifference = Math.abs(daysDifference);
    statusMessage = `Program started ${absDifference} day${
      absDifference > 1 ? "s" : ""
    } ago`;
  } else {
    statusMessage = `${daysDifference} day${
      daysDifference > 1 ? "s" : ""
    } left for the program to start`;
  }

  return (
    <div className="px-9 my-6 grid">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          loading.initial || loading.join || programLoading || requestLoading
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={ratingModal.success}
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
              Thank you for providing the rating for this program
            </p>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={completeProgram.bool}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
          <img src={TickColorIcon} alt="TickColorIcon" />
          <span
            style={{
              color: "#232323",
              fontWeight: 600,
              fontSize: "24px",
            }}
          >
            Complete
          </span>
          <div className="py-5">
            <p
              style={{
                color: "rgba(24, 40, 61, 1)",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Are you sure you want to complete the program?
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-6 justify-center align-middle">
              <Button
                btnCls="w-[110px]"
                btnName={"No"}
                btnCategory="secondary"
                onClick={handleCloseConfirmPopup}
              />
              <Button
                btnType="button"
                btnCls="w-[110px]"
                btnName={"Yes"}
                style={{ background: "#16B681" }}
                btnCategory="primary"
                onClick={() => handleComplete(programdetails?.id)}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isAccepted}
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
              Program accepted successfully
            </p>
          </div>
        </div>
      </Backdrop>

      <Ratings
        open={ratingModal.modal}
        modalSuccess={ratingModalSuccess}
        modalClose={ratingModalClose}
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          requestProgramStatus === requestStatus.reschedule ||
          requestProgramStatus === requestStatus.cancel
        }
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
              Program{" "}
              {requestProgramStatus === requestStatus.reschedule
                ? "Rescheduled "
                : requestProgramStatus === requestStatus.cancel
                ? "Cancelled "
                : ""}{" "}
              Successfully
            </p>
          </div>
        </div>
      </Backdrop>

      {/* Program Request Updated Popup */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={requestProgramStatus === requestStatus.programupdate}
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
              {programdetails?.program_name} Request is Successfully updated
            </p>
          </div>
        </div>
      </Backdrop>

      <MuiModal
        modalSize="md"
        modalOpen={viewMenteeModal}
        modalClose={undefined}
        noheader
      >
        <div className="px-5 py-5">
          <div
            className="flex justify-center flex-col gap-5  mt-4 mb-4"
            style={{
              border: "1px solid #FE634E",
              borderRadius: "10px",
            }}
          >
            <div
              className="flex justify-between px-3 py-4 items-center"
              style={{ borderBottom: "1px solid #FE634E" }}
            >
              <p className="text-[18px]" style={{ color: "rgba(0, 0, 0, 1)" }}>
                Joining Volunteers{" "}
              </p>
              <img
                className="cursor-pointer"
                onClick={() => setViewMenteeModal(false)}
                src={CancelIcon}
                alt="CancelIcon"
              />
            </div>
            <div className="px-5">
              <DataTable
                rows={programMentees?.length > 0 && programMentees}
                columns={JoinMenteeColumn}
                hideCheckbox
              />
            </div>
          </div>
        </div>
      </MuiModal>

      {/* Program Accept Popup */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={confirmPopup.accept}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
          <img src={TickColorIcon} alt="TickColorIcon" />
          <span style={{ color: "#232323", fontWeight: 600, fontSize: "24px" }}>
            Approve
          </span>
          <div className="py-5">
            <p
              style={{
                color: "rgba(24, 40, 61, 1)",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Are you sure you want to approve Program Request?
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-6 justify-center align-middle">
              <Button
                btnCls="w-[110px]"
                btnName={"Cancel"}
                btnCategory="secondary"
                onClick={resetAcceptCancelPopup}
              />
              <Button
                btnType="button"
                btnCls="w-[110px]"
                btnName={"Approve"}
                style={{ background: "#16B681" }}
                btnCategory="primary"
                onClick={handleConfirmPopup}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      {/* Program Cancel Popup */}
      {confirmPopup.cancel && (
        <MuiModal
          modalSize="md"
          modalOpen={confirmPopup.cancel}
          modalClose={resetAcceptCancelPopup}
          noheader
        >
          <div className="px-5 py-5">
            <div
              className="flex justify-center flex-col gap-5  mt-4 mb-4"
              style={{
                border: "1px solid #FE634E",
                borderRadius: "10px",
              }}
            >
              <div
                className="flex justify-between px-3 py-4 items-center"
                style={{ borderBottom: "1px solid #FE634E" }}
              >
                <p
                  className="text-[18px]"
                  style={{ color: "rgba(0, 0, 0, 1)" }}
                >
                  Reject Reason{" "}
                </p>
                <img
                  className="cursor-pointer"
                  onClick={resetAcceptCancelPopup}
                  src={CancelIcon}
                  alt="CancelIcon"
                />
              </div>

              <div className="px-5">
                {requestError !== "" ? (
                  <p className="error" role="alert">
                    {requestError}
                  </p>
                ) : null}

                <form onSubmit={handleSubmit(handleCancelReasonPopupSubmit)}>
                  <div className="relative pb-8">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Reject Reason
                    </label>

                    <div className="relative">
                      <textarea
                        {...register("cancel_reason", {
                          required: "This field is required",
                        })}
                        id="message"
                        rows="4"
                        className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                                    focus-visible:outline-none focus-visible:border-none`}
                        style={{ border: "2px solid rgba(229, 0, 39, 1)" }}
                        placeholder={""}
                      ></textarea>
                      {errors["cancel_reason"] && (
                        <p className="error" role="alert">
                          {errors["cancel_reason"].message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center gap-5 items-center pt-5 pb-10">
                    <Button
                      btnName="Cancel"
                      btnCls="w-[18%]"
                      btnCategory="secondary"
                      onClick={resetAcceptCancelPopup}
                    />
                    <button
                      type="submit"
                      className="text-white py-3 px-7 w-[18%]"
                      style={{
                        background: "#FE634E",
                        borderRadius: "3px",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </MuiModal>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading.join && role === "mentor"}
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
              Successfully Launched a program
            </p>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={taskJoinedRequest}
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
              Program join request submitted successfully to Mentor
            </p>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openPopup}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] p-[12px] justify-center items-center">
          <div className="border border-[#E50027] rounded-[15px] h-[100%] w-[100%] justify-center items-center flex flex-col relative">
            <div
              className="absolute top-[12px] right-[12px] cursor-pointer"
              onClick={() => setOpenPopup(false)}
            >
              <img src={CloseIcon} alt="ConfirmIcon" />
            </div>
            <img src={ConfirmIcon} alt="ConfirmIcon" />

            <div className="py-5">
              <p
                style={{
                  color: "rgba(24, 40, 61, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Are you sure you want to accept this program?
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-6 justify-center align-middle">
                <Button
                  btnName="No"
                  btnCategory="secondary"
                  btnCls="border !border-[#1D5BBF] !text-[#1D5BBF] w-[110px]"
                  onClick={() => setOpenPopup(false)}
                />
                <Button
                  btnType="button"
                  btnCls="w-[110px]"
                  btnName={"Yes"}
                  btnCategory="primary"
                  onClick={() => handleAcceptProgram()}
                />
              </div>
            </div>
          </div>
        </div>
      </Backdrop>

      {message && (
        <ToastNotification
          openToaster={message}
          message={"URL copied!"}
          handleClose={handleCloseNotify}
          toastType={"success"}
        />
      )}

      <MuiModal
        modalOpen={moreMenuModal.share}
        modalClose={handleMoreMenuClosePopup}
        noheader
      >
        <div
          className="px-5 py-1 flex justify-center items-center"
          style={{ border: "1px solid #FE634E" }}
        >
          <div className="flex justify-center items-center flex-col gap-8 py-10 px-20 mt-5">
            <div>{programdetails?.program_name}</div>
            <input
              className="input-bg text-[12px] h-[60px] w-[396px] px-5"
              style={{ borderRadius: "27px" }}
              disabled
              value={url}
            />
            <div className="flex gap-7">
              <img
                className="cursor-pointer"
                src={LinkIcon}
                alt="LinkIcon"
                onClick={handleCopy}
              />
            </div>

            <div className="flex  justify-center align-middle pt-4">
              <Button
                btnType="button"
                onClick={handleMoreMenuClosePopup}
                btnName="Close"
                btnCategory="primary"
              />
            </div>
          </div>
        </div>
      </MuiModal>

      {moreMenuModal.reschedule && (
        <MuiModal
          modalOpen={moreMenuModal.reschedule}
          modalClose={handleMoreMenuClosePopup}
          noheader
        >
          <div style={{ border: "1px solid #FE634E" }}>
            <div
              className="flex justify-between items-center px-3 py-4 mx-1"
              style={{ borderBottom: "1px solid #FE634E" }}
            >
              <div>Reschedule {programdetails.name}</div>
              <img
                className="cursor-pointer"
                onClick={() =>
                  setMoreMenuModal({ share: false, reschedule: false })
                }
                src={CancelIcon}
                alt="CancelIcon"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-4 py-7">
                <div className="flex flex-wrap gap-4">
                  <div className={`relative mb-6 w-[48%]`}>
                    <label
                      className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor={"Reschedule Date"}
                    >
                      Reschedule Start Date
                    </label>

                    <div className="relative input-bg">
                      <Calendar
                        className="calendar-control w-full"
                        {...dateStartField}
                        value={dateFormatted["reschedule_start_date"]}
                        onChange={(e) => {
                          dateStartField.onChange(e);
                          setDateFormat({
                            reschedule_end_date: "",
                            reschedule_start_date: e.value,
                          });
                          calendarRef?.current[0]?.hide();
                        }}
                        onClick={handleDateClick}
                        disabled={false}
                        minDate={new Date()}
                        maxDate={
                          ["yettostart", "yettojoin"].includes(
                            programdetails?.status
                          )
                            ? ""
                            : new Date(programdetails?.end_date)
                        }
                        showTime={false}
                        hourFormat="12"
                        dateFormat="dd/mm/yy"
                        style={{ width: "60%" }}
                        ref={(el) => (calendarRef.current[0] = el)}
                        viewDate={
                          ["yettostart", "yettojoin"].includes(
                            programdetails?.status
                          )
                            ? new Date()
                            : new Date(programdetails?.start_date)
                        }
                      />

                      <img
                        className="absolute top-5 right-2 cursor-pointer"
                        src={CalendarIcon}
                        alt="CalendarIcon"
                        onClick={() => {
                          handleDateClick();
                          calendarRef?.current[0]?.show();
                        }}
                      />
                    </div>
                    {errors["reschedule_start_date"] && (
                      <p className="error" role="alert">
                        {errors["reschedule_start_date"].message}
                      </p>
                    )}
                  </div>

                  <div className={`relative mb-6 w-[48%]`}>
                    <label
                      className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor={"Reschedule Date"}
                    >
                      Reschedule End Date
                    </label>

                    <div className="relative input-bg">
                      <Calendar
                        className="calendar-control w-full"
                        {...dateEndField}
                        value={dateFormatted["reschedule_end_date"]}
                        onChange={(e) => {
                          dateEndField.onChange(e);
                          setDateFormat({
                            ...dateFormatted,
                            ["reschedule_end_date"]: e.value,
                          });
                          calendarRef?.current[1]?.hide();
                        }}
                        onClick={handleDateClick}
                        disabled={false}
                        minDate={
                          dateFormatted.reschedule_start_date
                            ? new Date(dateFormatted.reschedule_start_date)
                            : new Date()
                        }
                        maxDate={
                          ["yettojoin", "yettostart"].includes(
                            programdetails?.status
                          )
                            ? ""
                            : new Date(programdetails?.end_date)
                        }
                        showTime={false}
                        hourFormat="12"
                        dateFormat="dd/mm/yy"
                        style={{ width: "60%" }}
                        ref={(el) => (calendarRef.current[1] = el)}
                        viewDate={
                          new Date(
                            dateFormatted.reschedule_start_date ??
                              programdetails?.start_date
                          )
                        }
                      />

                      <img
                        className="absolute top-5 right-2 cursor-pointer"
                        src={CalendarIcon}
                        alt="CalendarIcon"
                        onClick={() => {
                          handleDateClick();
                          calendarRef?.current[1]?.show();
                        }}
                      />
                    </div>
                    {errors["reschedule_end_date"] && (
                      <p className="error" role="alert">
                        {errors["reschedule_end_date"].message}
                      </p>
                    )}
                  </div>

                  <div className={`relative mb-6 w-full`}>
                    <label
                      className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor={"Comments"}
                    >
                      Comments
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className={`block p-2.5 input-bg w-full text-sm text-gray-900  rounded-lg border
                                                                   focus:visible:outline-none focus:visible:border-none}`}
                      placeholder={""}
                      {...register("reason", {
                        required: "This field is required",
                      })}
                    ></textarea>

                    {errors["reason"] && (
                      <p className="error" role="alert">
                        {errors["reason"].message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 justify-center align-middle py-5">
                <Button
                  btnName="Cancel"
                  btnCategory="secondary"
                  onClick={() =>
                    setMoreMenuModal({ share: false, reschedule: false })
                  }
                />
                <Button
                  btnType="submit"
                  btnName="Submit"
                  btnCategory="primary"
                />
              </div>
            </form>
          </div>
        </MuiModal>
      )}

      {moreMenuModal.cancel && (
        <MuiModal
          modalSize="md"
          modalOpen={moreMenuModal.cancel}
          modalClose={handleMoreMenuClosePopup}
          noheader
        >
          <div className="px-5 py-5">
            <div
              className="flex justify-center flex-col gap-5  mt-4 mb-4"
              style={{
                border: "1px solid #FE634E",
                borderRadius: "10px",
              }}
            >
              <div
                className="flex justify-between px-3 py-4 items-center"
                style={{ borderBottom: "1px solid #FE634E" }}
              >
                <p
                  className="text-[18px]"
                  style={{ color: "rgba(0, 0, 0, 1)" }}
                >
                  Cancel Reason{" "}
                </p>
                <img
                  className="cursor-pointer"
                  onClick={handleMoreMenuClosePopup}
                  src={CancelIcon}
                  alt="CancelIcon"
                />
              </div>

              <div className="px-5">
                {requestError !== "" ? (
                  <p className="error" role="alert">
                    {requestError}
                  </p>
                ) : null}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative pb-8">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Cancel Reason
                    </label>

                    <div className="relative">
                      <textarea
                        {...register("cancel_reason", {
                          required: "This field is required",
                        })}
                        id="message"
                        rows="4"
                        className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                                                                focus-visible:outline-none focus-visible:border-none`}
                        style={{ border: "2px solid rgba(229, 0, 39, 1)" }}
                        placeholder={""}
                      ></textarea>
                      {errors["cancel_reason"] && (
                        <p className="error" role="alert">
                          {errors["cancel_reason"].message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center gap-5 items-center pt-5 pb-10">
                    <Button
                      btnName="Cancel"
                      btnCls="w-[18%]"
                      btnCategory="secondary"
                      onClick={handleMoreMenuClosePopup}
                    />
                    <button
                      type="submit"
                      className="text-white py-3 px-7 w-[18%]"
                      style={{
                        background: "#FE634E",
                        borderRadius: "3px",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </MuiModal>
      )}

      {!programLoading &&
      programdetails &&
      Object.keys(programdetails)?.length ? (
        <div
          className="grid mb-10"
          style={{
            boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)",
            borderRadius: "5px",
          }}
        >
          <div className="breadcrum">
            <nav
              className="flex justify-between px-7 pt-6 pb-5 mx-2 border-b-2"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <p
                    href="#"
                    className="inline-flex items-center text-sm font-medium cursor-pointer"
                    style={{ color: "rgba(89, 117, 162, 1)" }}
                    onClick={() =>
                      navigate(state?.from === "category" ? -1 : "/programs")
                    }
                  >
                    {state?.from === "category" ? "Category View" : "Program"}
                  </p>
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </li>
                <li>
                  <div className="flex items-center">
                    <p
                      href="#"
                      className="ms-1 text-sm font-medium text-gray-700 "
                    >
                      Program Details{" "}
                    </p>
                  </div>
                </li>
              </ol>
              {(role === "mentor" ||
                (role === "admin" &&
                  ![
                    "program_new",
                    "program_join",
                    "program_reschedule",
                    "program_cancel",
                  ].includes(typeParams)) ||
                (role === "mentee" &&
                  (programdetails.status === programActionStatus.inprogress ||
                    programdetails.mentee_join_status ===
                      programActionStatus.program_join_request_accepted ||
                    programdetails?.program_interest) &&
                  !["program_join", "program_cancel"].includes(
                    typeParams
                  ))) && (
                <>
                  <div onClick={handleClick} className="cursor-pointer">
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
                    {(role === "mentor" || role === "admin") && (
                      <>
                        <MenuItem
                          onClick={() => handleMenu("share")}
                          className="!text-[12px]"
                        >
                          <img
                            src={ShareIcon}
                            alt="ShareIcon"
                            className="pr-3 w-[25px]"
                          />
                          Share
                        </MenuItem>
                        {/* {((role === "admin" &&
                          programdetails?.created_by ===
                            userdetails?.data?.user_id) ||
                          (programdetails.participated_mentees_count === 0 &&
                            programdetails?.created_by ===
                            userdetails?.data?.user_id) &&
                          !["cancelled", "inprogress", "completed"].includes(programdetails?.status)) && (
                            <MenuItem
                              onClick={() => handleMenu("edit")}
                              className="!text-[12px]"
                            >
                              <img
                                src={EditSVGIcon}
                                alt="EditSVGIcon"
                                className="pr-3 w-[25px]"
                              />
                              Edit
                            </MenuItem>
                          )} */}
                          {programdetails.participated_mentees_count === 0 &&
                            programdetails?.created_by ===
                              userdetails?.data?.user_id && (
                              <MenuItem
                                onClick={() => handleMenu("edit")}
                                className="!text-[12px]"
                              >
                                <img
                                  src={EditSVGIcon}
                                  alt="EditSVGIcon"
                                  className="pr-3 w-[25px]"
                                />
                                Edit
                              </MenuItem>
                            )}
                        {/* {!requestStatusParams &&
                          ![
                            "yettoapprove",
                            "cancelled",
                            "new_program_request_rejected",
                            "completed",
                          ].includes(programdetails?.status) &&
                          role !== "admin" && (
                            <MenuItem
                              onClick={() => handleMenu("reschedule")}
                              className="!text-[12px]"
                            >
                              <img
                                src={RescheduleIcon}
                                alt="RescheduleIcon"
                                className="pr-3 w-[25px]"
                              />
                              Reschedule
                            </MenuItem>
                          )} */}

                        {!requestStatusParams &&
                          ![
                            "yettoapprove",
                            "cancelled",
                            "new_program_request_rejected",
                            "completed",
                          ].includes(programdetails?.status) &&
                          !reqRole &&
                          !programdetails.hasOwnProperty(
                            "admin_assign_program"
                          ) &&
                          programdetails?.created_by ===
                            userdetails?.data?.user_id && (
                            // role !== 'admin' && (
                            <MenuItem
                              onClick={() => handleMenu("reschedule")}
                              className="!text-[12px]"
                            >
                              <img
                                src={RescheduleIcon}
                                alt="RescheduleIcon"
                                className="pr-3 w-[25px]"
                              />
                              Reschedule
                            </MenuItem>
                          )}

                        {/* {!requestStatusParams &&
                          ![
                            "yettoapprove",
                            "cancelled",
                            "new_program_request_rejected",
                            "completed",
                          ].includes(programdetails?.status) &&
                          role !== "admin" && (
                            <MenuItem
                              onClick={() => handleMenu("cancel")}
                              className="!text-[12px]"
                            >
                              <img
                                src={AbortIcon}
                                alt="Cancel"
                                className="pr-3 w-[25px]"
                              />
                              Cancel
                            </MenuItem>
                          )} */}

                        {
                          !requestStatusParams &&
                            ![
                              "yettoapprove",
                              "cancelled",
                              "new_program_request_rejected",
                              "completed",
                            ].includes(programdetails?.status) &&
                            !reqRole &&
                            programdetails?.created_by ===
                              userdetails?.data?.user_id && (
                              // role !== 'admin' && (
                              <MenuItem
                                onClick={() => handleMenu("cancel")}
                                className="!text-[12px]"
                              >
                                <img
                                  src={AbortIcon}
                                  alt="Cancel"
                                  className="pr-3 w-[25px]"
                                />
                                Cancel
                              </MenuItem>
                            )
                          // )
                        }
                        {[
                          programActionStatus.inprogress,
                          programActionStatus.assigned,
                          programActionStatus.started,
                        ].includes(programdetails.status) && (
                          <>
                            {programdetails?.created_by ===
                              userdetails?.data?.user_id && (
                              <MenuItem
                                onClick={() => handleOpenConfirmPopup()}
                                className="!text-[12px]"
                              >
                                <img
                                  src={CompleteIcon}
                                  alt="AbortIcon"
                                  className="pr-3 w-[25px]"
                                />
                                Complete
                              </MenuItem>
                            )}
                            {programdetails?.created_by ===
                              userdetails?.data?.user_id && (
                              <MenuItem
                                onClick={() => handleNewTaskFromAdmin()}
                                className="!text-[12px]"
                              >
                                <img
                                  src={PlusCircle}
                                  alt="PlusCircle"
                                  className="pr-3 w-[25px]"
                                />
                                Assign Task to Volunteers
                              </MenuItem>
                            )}
                          </>
                        )}
                        {["cancelled", "inprogress", "completed"].includes(
                          programdetails?.status
                        ) && (
                          <MenuItem
                            onClick={() =>
                              navigate(`/historyNotes/${params.id}`)
                            }
                            className="!text-[12px]"
                          >
                            <img
                              src={ProgramHistoryIcon}
                              alt="ProgramHistoryIcon"
                              className="pr-3 w-[25px]"
                            />
                            Program Notes History
                          </MenuItem>
                        )}
                      </>
                    )}
                    {role === "mentee" && (
                      <>
                        {
                          // programdetails.status ===
                          //   (programActionStatus.inprogress ||
                          //     programdetails.status ===
                          //     programActionStatus.cancelled) &&
                          //   programdetails.mentee_join_status ===
                          //   programActionStatus.program_join_request_accepted
                          (programdetails.status ===
                            programActionStatus.inprogress ||
                            programdetails.mentee_join_status ===
                              programActionStatus.program_join_request_accepted) && (
                            <MenuItem
                              onClick={() => handleMenu("cancel")}
                              className="!text-[12px]"
                            >
                              <img
                                src={AbortIcon}
                                alt="AbortIcon"
                                className="pr-3 w-[25px]"
                              />
                              Cancel
                            </MenuItem>
                          )
                        }
                        {["cancelled", "inprogress", "completed"].includes(
                          programdetails?.status
                        ) && (
                          <MenuItem
                            onClick={() =>
                              navigate(`/historyNotes/${params.id}`)
                            }
                            className="!text-[12px]"
                          >
                            <img
                              src={ProgramHistoryIcon}
                              alt="ProgramHistoryIcon"
                              className="pr-3 w-[25px]"
                            />
                            Program Notes History
                          </MenuItem>
                        )}
                      </>
                    )}
                  </Menu>
                </>
              )}
            </nav>

            <div className="content px-8">
              <div className="grid grid-cols-3 gap-4 py-6">
                {/* Left Side Content */}
                <div className="left-side-content col-span-2">
                  <div className="flex items-center gap-6 pb-6">
                    <h3
                      className="font-semibold text-[18px]"
                      style={{ color: "#FE634E" }}
                    >
                      {programdetails.program_name}
                    </h3>
                    {programdetails?.categories?.length ? (
                      <div
                        className="text-[10px] px-3 py-2"
                        style={{
                          background: "rgba(238, 240, 244, 1)",
                          color: "rgba(253, 0, 58, 1)",
                          borderRadius: "5px",
                        }}
                      >
                        {programdetails.categories[0].name}
                      </div>
                    ) : null}

                    {programdetails.reschedule_info?.length > 0 && (
                      <div className="flex gap-3 items-center">
                        <span
                          style={{
                            background: "rgba(255, 213, 0, 1)",
                            borderRadius: "3px",
                            padding: "10px",
                          }}
                        >
                          <img src={TimeHistoryIcon} alt="TimeHistoryIcon" />
                        </span>
                        <p
                          style={{
                            background: "rgba(255, 249, 216, 1)",
                            color: "rgba(255, 213, 0, 1)",
                            padding: "10px",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {programdetails.reschedule_info}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-[12px]">
                    {programdetails.description}
                  </div>

                  {programdetails.prerequisites && (
                    <div className="text-[12px] my-3">
                      <span className="font-semibold text-background-primary-main">
                        Prerequisites:{" "}
                      </span>
                      {programdetails.prerequisites}
                    </div>
                  )}

                  {programdetails.session_details && (
                    <div className="text-[12px] my-3">
                      <span className="font-semibold text-background-primary-main">
                        Session Details:{" "}
                      </span>
                      {programdetails.session_details}
                    </div>
                  )}

                  <div className="flex gap-6 py-6">
                    <div className="flex gap-2 items-center">
                      <img src={LocationIcon} alt="LocationIcon" />
                      <span className="text-[12px]">
                        {/* {programdetails.venue} */}
                        {programdetails?.program_mode === "virtual_meeting"
                          ? "Online"
                          : `${programdetails.city_details?.name}, ${programdetails.state_details?.abbreviation}`}
                      </span>
                    </div>

                    <div
                      style={{ borderRight: "1px solid rgba(24, 40, 61, 1)" }}
                    ></div>

                    <div className="flex gap-3 items-center">
                      <img src={CalendarIcon} alt="CalendarIcon" />
                      <span className="text-[12px]">
                        {formatDateTimeISO(programdetails?.start_date)}
                      </span>
                    </div>

                    <div
                      style={{ borderRight: "1px solid rgba(24, 40, 61, 1)" }}
                    ></div>

                    <div className="flex items-center gap-x-3 text-[12px] mb-4">
                      {!profileLoading && (
                        <img
                          src={
                            programdetails?.mentor_profile_image || UserImage
                          }
                          style={{
                            borderRadius: "50%",
                            width: "35px",
                            height: "35px",
                          }}
                          alt="UserImage"
                        />
                      )}

                      <span>Instructor :</span>
                      {role !== "mentor" ? (
                        <span
                          style={{
                            color: "#FE634E",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => handleInstructor(programdetails)}
                        >
                          {programdetails?.mentor_name}
                        </span>
                      ) : (
                        <span style={{ color: "#FE634E" }}>
                          {programdetails?.mentor_name}
                        </span>
                      )}
                    </div>
                  </div>

                  {Array.isArray(programdetails?.learning_materials) &&
                    programdetails?.learning_materials?.length > 0 && (
                      <div className="py-5">
                        <p className="text-[14px] font-normal mb-2">
                          Learning Materials:
                        </p>
                        <div className="flex items-center gap-x-3">
                          {programdetails?.learning_materials.map(
                            (material) => (
                              <button
                                key={material.id}
                                className={`px-6 py-3 text-[12px] bg-gray-200 text-black rounded-full`}
                                onClick={() =>
                                  setSelectedLM({
                                    bool: true,
                                    data: material,
                                  })
                                }
                              >
                                {material.name}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  {programdetails?.request_data?.status !== "rejected" &&
                    "equipments" in programdetails &&
                    programdetails?.equipments?.length > 0 && (
                      <EquipmentSection
                        equipmentsData={programdetails?.equipments}
                        currentProgram={programdetails}
                      />
                    )}

                  <div className="flex gap-2 mb-5">
                    {programdetails?.group_chat_requirement && (
                      <p
                        onClick={() => navigate("/discussions")}
                        className="text-[14px] font-semibold text-font-primary-main px-4 py-2 border border-dashed border-background-primary-main rounded-[3px] bg-background-primary-light cursor-pointer"
                      >
                        Group Discussions
                      </p>
                    )}
                    {programdetails?.individual_chat_requirement && (
                      <p
                        onClick={() => navigate("/discussions/32")}
                        className="text-[14px] font-semibold text-font-primary-main px-4 py-2 border border-dashed border-background-primary-main rounded-[3px] bg-background-primary-light cursor-pointer"
                      >
                        Individual Discussions
                      </p>
                    )}
                  </div>

                  <ProgramActions
                    role={role}
                    programdetails={programdetails}
                    programCompleted={programCompleted}
                    handleJoinProgram={handleJoinProgram}
                    isLaunchingProgram={isLaunchingProgram}
                    requestId={requestId}
                    handleAcceptCancelProgramRequest={
                      handleAcceptCancelProgramRequest
                    }
                    reqStatusColor={reqStatusColor}
                    reqStatus={reqStatus}
                    requestStatusParams={requestStatusParams}
                    setOpenPopup={setOpenPopup}
                    setCancelPopup={setCancelPopup}
                    type={typeParams}
                    from={from}
                  />

                  {role === "mentee" &&
                    !programdetails?.is_sponsored &&
                    (programdetails?.mentee_join_status ===
                      "program_join_payment_initiate" ||
                      programdetails?.mentee_join_status ===
                        "program_join_payment_pending") && (
                      <div className="mt-3">
                        {programdetails?.mentee_join_status ===
                          "program_join_payment_initiate" && (
                          <p className="text-font-error-main text-[14px] font-semibold mb-2">
                            {statusMessage}
                          </p>
                        )}
                        <Button
                          btnType="button"
                          btnCls={
                            programdetails?.mentee_join_status ===
                            "program_join_payment_pending"
                              ? "w-[200px] !bg-[#FFE3C2] !text-[#FF8A00] !border-none"
                              : "w-auto"
                          }
                          btnName={
                            programdetails?.mentee_join_status ===
                            "program_join_payment_pending"
                              ? "Pending Payment"
                              : `Pay Now $ ${programdetails?.enrollment_fees}`
                          }
                          btnCategory={
                            programdetails?.mentee_join_status ===
                            "program_join_payment_pending"
                              ? "secondary"
                              : "primary"
                          }
                          onClick={() => {
                            if (programdetails?.id) {
                              setProgramDetailsId(programdetails?.id);
                              navigate("/payment-checkout");
                              localStorage.setItem(
                                "program_id",
                                programdetails?.id
                              );
                            }
                          }}
                          disabled={
                            programdetails?.mentee_join_status ===
                            "program_join_payment_pending"
                          }
                        />
                        {programdetails?.mentee_join_status ===
                          "program_join_payment_pending" && (
                          <p className="text-font-error-main text-[14px] font-semibold mt-2">
                            Please Contact Administrator
                          </p>
                        )}
                      </div>
                    )}
                </div>

                {/* Right Side Content */}
                <div className="right-side-content">
                  <div
                    style={{
                      border: "1px solid rgba(223, 237, 255, 1)",
                      borderRadius: "10px",
                    }}
                    className="px-6 pt-6 pb-3"
                  >
                    <ul className="flex flex-col gap-3">
                      {/* {role === "mentee" && (
                        <li
                          className="flex justify-between text-[12px]"
                          style={{
                            borderBottom: "1px solid rgba(217, 217, 217, 1)",
                            paddingBottom: "10px",
                          }}
                        >
                          <span>Ratings</span>
                          <span className="flex gap-2 items-center">
                            {Array.from(
                              { length: rating },
                              (_, i) => i + 1
                            ).map(() => {
                              return (
                                <img
                                  src={RatingsIcon}
                                  style={{ width: "12px", height: "12px" }}
                                  alt="RatingsIcon"
                                />
                              );
                            })}
                            {rating}
                          </span>
                        </li>
                      )} */}
                      <li
                        className="flex justify-between text-[12px]"
                        style={{
                          borderBottom: "1px solid rgba(217, 217, 217, 1)",
                          paddingBottom: "10px",
                          paddingTop: "14px",
                        }}
                      >
                        <span>Course Level</span>
                        <span style={{ textTransform: "capitalize" }}>
                          {programdetails.course_level}
                        </span>
                      </li>
                      {programdetails.sub_program?.length > 0 ? (
                        <li
                          className="flex justify-between text-[12px]"
                          style={{
                            borderBottom: "1px solid rgba(217, 217, 217, 1)",
                            paddingBottom: "10px",
                            paddingTop: "14px",
                          }}
                        >
                          <span>Sub Programs</span>
                          <span style={{ textTransform: "capitalize" }}>
                            {programdetails.sub_program?.length}
                          </span>
                        </li>
                      ) : (
                        <>
                          <li
                            className="flex justify-between text-[12px]"
                            style={{
                              borderBottom: "1px solid rgba(217, 217, 217, 1)",
                              paddingBottom: "10px",
                              paddingTop: "14px",
                            }}
                          >
                            <span>Session</span>
                            <span>{programdetails.session_count}</span>
                          </li>

                          <li
                            className="flex justify-between text-[12px]"
                            style={{
                              borderBottom: "1px solid rgba(217, 217, 217, 1)",
                              paddingBottom: "10px",
                              paddingTop: "14px",
                            }}
                          >
                            {" "}
                            <span>Start Date</span>
                            <span>{`${dateFormat(
                              programdetails?.start_date
                            )} `}</span>
                          </li>
                          <li
                            className="flex justify-between text-[12px]"
                            style={{
                              borderBottom: "1px solid rgba(217, 217, 217, 1)",
                              paddingBottom: "10px",
                              paddingTop: "14px",
                            }}
                          >
                            {" "}
                            <span>End Date</span>
                            <span>
                              {" "}
                              {`${dateFormat(programdetails?.end_date)}`}
                            </span>
                          </li>

                          <li
                            className="flex justify-between text-[12px]"
                            style={{
                              borderBottom: "1px solid rgba(217, 217, 217, 1)",
                              paddingBottom: "10px",
                              paddingTop: "14px",
                            }}
                          >
                            {" "}
                            <span>Start Time</span>
                            <span>
                              {programdetails?.start_date
                                ? moment(programdetails?.start_date).format(
                                    "hh:mm A"
                                  )
                                : "-"}
                            </span>
                          </li>

                          <li
                            className="flex justify-between text-[12px]"
                            style={{
                              borderBottom: "1px solid rgba(217, 217, 217, 1)",
                              paddingBottom: "10px",
                              paddingTop: "14px",
                            }}
                          >
                            {" "}
                            <span>End Time</span>
                            <span>
                              {programdetails?.end_date
                                ? moment(programdetails?.end_date).format(
                                    "hh:mm A"
                                  )
                                : "-"}
                            </span>
                          </li>

                          <li
                            className="flex justify-between text-[12px]"
                            style={{
                              borderBottom: "1px solid rgba(217, 217, 217, 1)",
                              paddingBottom: "10px",
                              paddingTop: "14px",
                            }}
                          >
                            {" "}
                            <span>Duration</span>
                            <span>
                              {programdetails.duration} {" days"}
                            </span>
                          </li>
                          <li
                            className="flex justify-between text-[12px]"
                            style={{
                              borderBottom: "1px solid rgba(217, 217, 217, 1)",
                              paddingBottom: "10px",
                              paddingTop: "14px",
                            }}
                          >
                            {" "}
                            <span>Schedule</span>
                            <span>Flexible schedule</span>
                          </li>
                          {(role === "mentor" || role === "admin") &&
                            programdetails?.created_by ===
                              userdetails?.data?.user_id && (
                              <li
                                className="flex justify-between text-[12px]"
                                style={{
                                  borderBottom:
                                    "1px solid rgba(217, 217, 217, 1)",
                                  paddingBottom: "10px",
                                  paddingTop: "14px",
                                }}
                              >
                                {" "}
                                <span>Joined Volunteers</span>
                                <span
                                  className="underline cursor-pointer"
                                  onClick={() =>
                                    handleViewJoinedMentees(programdetails)
                                  }
                                >
                                  {programdetails.participated_mentees_count}
                                </span>
                              </li>
                            )}
                          {!programdetails.is_sponsored &&
                            programdetails?.mentee_join_status !==
                              "program_join_request_accepted" && (
                              <li
                                className="flex justify-between text-[12px]"
                                style={{
                                  borderBottom:
                                    "1px solid rgba(217, 217, 217, 1)",
                                  paddingBottom: "10px",
                                  paddingTop: "14px",
                                }}
                              >
                                <span>Fees</span>
                                <span className="!text-font-primary-main">
                                  $ {programdetails?.enrollment_fees}
                                </span>
                              </li>
                            )}

                          {programdetails?.mentee_join_status ===
                            "program_join_request_accepted" &&
                            !programdetails?.is_sponsored && (
                              <li
                                className="flex justify-between text-[12px]"
                                style={{
                                  paddingBottom: "10px",
                                  paddingTop: "14px",
                                }}
                              >
                                <span className="flex gap-2">
                                  Paid{" "}
                                  <span>
                                    <img src={PaidTickIcon} alt="" />
                                  </span>
                                </span>
                                <span className="text-font-primary-main">
                                  $ {programdetails?.enrollment_fees}
                                </span>
                              </li>
                            )}
                        </>
                      )}
                      {/* <li
                        className='flex justify-between text-[12px]'
                        style={{ paddingBottom: '10px', paddingTop: '14px' }}
                      >
                        <span
                          className='cursor-pointer'
                          onClick={() => {
                            setProgramDetailsId(programdetails?.id);
                            // navigate('/payment');
                          }}
                        >
                          Buy
                        </span>
                        {payment?.paymentData?.data?.client_secret && (
                          <Elements
                            stripe={stripePromise}
                            options={{
                              clientSecret:
                                payment?.paymentData?.data?.client_secret,
                              theme: 'stripe',
                              loader: 'auto',
                            }}
                          >
                            <CheckoutForm />
                          </Elements>
                        )}
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>

              <ProgramReasons
                programdetails={programdetails}
                role={role}
                requestId={requestId}
                programActionStatus={programActionStatus}
              />

              {/* Notes Section */}
              {["inprogress"].includes(programdetails?.status) && (
                // role !== "admin" &&
                <Box>
                  <CustomAccordian
                    title={"Program Notes:"}
                    titleColor={"#FE634E"}
                    children={
                      <>
                        <EquipmentFormFields
                          fields={notesFields}
                          formData={notesForm}
                          handleChange={updateState}
                        />
                        <Stack
                          justifyContent={"end"}
                          direction={"row"}
                          alignItems={"end"}
                          width={"100%"}
                          mt={"12px"}
                        >
                          <Button
                            btnCategory="secondary"
                            btnName="Save"
                            btnCls="!bg-background-primary-main !text-font-secondary-white !border-none w-[150px]"
                            onClick={() => handleSubmitNotes()}
                          />
                        </Stack>
                      </>
                    }
                    defaultValue={true}
                  />

                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={notesActivity}
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
                          Program Notes added successfully
                        </p>
                      </div>
                    </div>
                  </Backdrop>
                </Box>
              )}
              {/* Notes Section End */}

              {"sub_program" in programdetails &&
                programdetails?.sub_program?.length > 0 && (
                  <SubprogramsDataGrid data={programdetails?.sub_program} />
                )}
              {role === "mentee" &&
                (programdetails.status === programActionStatus.inprogress ||
                  programdetails.status === programActionStatus.paused) && (
                  <CustomAccordian
                    title={"Program Task"}
                    titleColor={"#FE634E"}
                    defaultValue
                    children={
                      <>
                        <SkillsSet programdetails={programdetails} />
                      </>
                    }
                  />
                )}
              {/* Detail Section */}
              <div
                className="details-section px-6 py-11 mb-10"
                style={{
                  background: "rgba(249, 249, 249, 1)",
                  borderRadius: "10px",
                }}
              >
                <div className="tabs flex gap-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`px-12 py-3 text-[12px] ${
                        activeTab === tab.key ? "tab-active" : "tab"
                      } `}
                      onClick={() => handleTab(tab.key)}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                <div className="tab-content px-6 pt-10 text-[12px]">
                  <div
                    className={`about-programs ${
                      activeTab === "about_program" ? "block" : "hidden"
                    }`}
                  >
                    {Array.isArray(programdetails?.goals) &&
                      programdetails?.goals?.length > 0 && (
                        <div className="py-5">
                          <p className="text-[12px] mb-2">Goals:</p>
                          <div className="flex items-center gap-x-3">
                            {programdetails?.goals.map((goal) => (
                              <button
                                key={goal.id}
                                className={`px-6 py-3 text-[12px] bg-gray-200 text-black rounded-full`}
                                onClick={() =>
                                  navigate(
                                    `/view-goal/${goal.id}?breadcrumbsType=program_goal_view`
                                  )
                                }
                              >
                                {`${goal.description?.substring(0, 10)}...`}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                    {Array.isArray(programdetails?.admin_goals) &&
                      programdetails?.admin_goals?.length > 0 && (
                        <div className="py-5">
                          <p className="text-[12px] mb-2">Admin Goals:</p>
                          <div className="flex items-center gap-x-3">
                            {programdetails?.admin_goals.map((goal) => (
                              <button
                                key={goal.id}
                                className={`px-6 py-3 text-[12px] bg-gray-200 text-black rounded-full`}
                                onClick={() =>
                                  navigate(`/view-goal/${goal.id}`)
                                }
                              >
                                {`${goal.description?.substring(0, 10)}...`}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    {programdetails?.skill_details?.length ? (
                      <div className="skills pt-8">
                        <div className="font-semibold pb-5">
                          Skills you'll gain
                        </div>
                        {programdetails?.skill_details}
                      </div>
                    ) : null}

                    {programdetails?.sponsor_logos?.length > 0 && (
                      <div className="sponsor pt-8">
                        <div className="font-semibold pb-5">Sponsored by </div>
                        <div>
                          {programdetails?.sponsor_logos?.map((e) => {
                            return (
                              <div>
                                <img
                                  style={{ width: "100px", height: "100px" }}
                                  src={e}
                                  alt="SponsorIcon"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {role !== "admin" &&
                      !programdetails?.admin_assign_program && (
                        <div className="benefits py-3">
                          <div className="font-semibold pb-3">Benefits</div>
                          {programdetails.benefits}
                        </div>
                      )}
                    <div className="program-certificate pt-8">
                      <div className="font-semibold pb-3">
                        Types of Certificates
                      </div>
                      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-10">
                        <ul className="flex flex-wrap -mb-px">
                          {participatedTabs.map((participatedTab) => (
                            <li className="me-2" key={participatedTab.key}>
                              <p
                                className={`inline-block p-4 border-b-2 cursor-pointer border-transparent rounded-t-lg ${
                                  certificateActiveTab === participatedTab.key
                                    ? "active  text-blue-600 border-blue-500"
                                    : ""
                                } `}
                                onClick={() =>
                                  handleCerificateTab(participatedTab.key)
                                }
                              >
                                {participatedTab.name}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {participatedTabs.map((participatedTab) => (
                        <div
                          className={`certificate-tab-content flex items-center justify-between relative ${
                            participatedTab.key === certificateActiveTab
                              ? "block"
                              : "hidden"
                          }`}
                          key={participatedTab.key}
                        >
                          <div className="px-9 py-16 w-4/6 leading-6">
                            {participatedTab.key === "participated" &&
                              "The ability for members to earn badges and receive certifications is another essential feature of our Mentoring Management program. It helps in creating engaging and impactful relationships between mentors and mentees."}

                            {participatedTab.key === "completed" &&
                              "All the badges and certifications are secured through a blockchain system to ensure authenticity and traceability. This innovative approach not only enhances motivation but also provides tangible recognition of achievements, encouraging continuous growth and engagement."}
                          </div>
                          <img
                            className="absolute right-0"
                            src={CertificateIcon}
                            alt="CertificateIcon"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`program-outcomes ${
                      activeTab === "program_testimonials" ? "block" : "hidden"
                    }`}
                  >
                    <div className="testimonials bg-white px-5 py-7">
                      <div className="grid grid-cols-3 gap-8">
                        {programdetails?.testimonial_content?.map((e) => {
                          return (
                            <div
                              className="pt-16 pb-2 px-7 leading-5 relative"
                              style={{
                                background: "rgba(248, 249, 250, 1)",
                              }}
                            >
                              <img
                                src={QuoteIcon}
                                className="absolute top-[-16px]"
                                alt="QuoteIcon"
                              />
                              <div className="relative">
                                <p className="pb-7">{e?.comments ?? "-"}</p>
                                <hr
                                  className="absolute"
                                  style={{ width: "100%" }}
                                />
                              </div>

                              <div className="flex gap-3 py-5">
                                <img
                                  src={e?.profile_image ?? UserImage}
                                  alt="user"
                                  style={{
                                    borderRadius: "50%",
                                    width: "38px",
                                    height: "35px",
                                  }}
                                />
                                <div className="flex flex-col">
                                  <span
                                    style={{
                                      color: "rgba(0, 174, 189, 1)",
                                    }}
                                  >
                                    {e?.name}
                                  </span>
                                  <span className="capitalize">{e?.role}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <CancelPopup
        open={cancelPopup}
        header={"Cancel Reason"}
        handleClosePopup={() => handleCloseConfirmPopup("cancel")}
        handleSubmit={(reason) => {
          handleCancelSubmit(reason);
        }}
      />
      <SuccessGradientMessage
        message={"Program Cancelled successfully"}
        cancelPopupConfirmation={cancelPopupConfirmation}
        setCancelPopupConfirmation={setCancelPopupConfirmation}
      />
      <CustomModal
        open={selectedLM?.bool}
        handleClose={() =>
          setSelectedLM({
            bool: false,
            data: "",
          })
        }
        width="lg"
        content={
          <Box
            className={"!border !border-background-primary-main rounded-[10px]"}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              className="!bg-background-primary-light px-4 py-4"
            >
              <Typography className="!text-font-secondary-black !font-bold !text-[20px]">
                {selectedLM?.data?.name}
              </Typography>
              <div
                onClick={() =>
                  setSelectedLM({
                    bool: false,
                    data: "",
                  })
                }
                className="cursor-pointer"
              >
                <img src={CancelIcon} alt="CancelIcon" />
              </div>
            </Stack>
            <Box className="px-4 py-4">
              <a
                className="!text-font-secondary-black"
                href={selectedLM?.data?.file_url}
                target="_blank"
              >
                {selectedLM?.data?.file_name ??
                  (
                    selectedLM?.data?.file ?? selectedLM?.data?.file_url
                  )?.substring(
                    (
                      selectedLM?.data?.file ?? selectedLM?.data?.file_url
                    )?.lastIndexOf("/") + 1
                  )}
              </a>
            </Box>
          </Box>
        }
      />
    </div>
  );
}
