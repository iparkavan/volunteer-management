import React, { useEffect } from "react";
import MaleIcon from "../../assets/images/male-profile1x.png";
import FemaleIcon from "../../assets/images/female-profile1x.png";
import RightArrowIcon from "../../assets/icons/RightSingleArrow.svg";
import { useNavigate } from "react-router-dom";
import { getTimeFromDate } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  userActivities,
  userActivitiyVisited,
} from "../../services/activities";

export default function Notification({ handleClose }) {
  const { activity, loading } = useSelector((state) => state.activity);
  const { data } = useSelector((state) => state.userInfo);
  const role = data?.role || "";
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleNavigation = () => {
    handleClose && handleClose();
    navigate("/notification");
  };

  const handleVisitActivity = (data) => {
    dispatch(userActivitiyVisited(data.id));
    // console.log(data, "notification");
    const actionType = data?.notification_type;
    switch (actionType) {
      case "program":
        handleClose && handleClose();
        navigate(
          data.related_data?.type
            ? `/program-details/${data.related_data.program_id}`
            : `/program-details/${data.related_data.program_id}?request_id=${data.related_data.program_request_id}`
        );
        break;
      case "task":
        const url =
          role === "mentee"
            ? `mentee-tasks-details/${data.related_data.task_id}`
            : `/viewTask/${data.related_data.task_id}`;
        handleClose && handleClose();
        navigate(url);
        break;
      case "goal":
        const Goalurl =
          role === "mentee" || role === "mentor"
            ? `/view-goal/${data.related_data.goal_id}`
            : `/view-goal/${data.related_data.goal_id}?requestId=${data.related_data.goal_request_id}`;
        handleClose && handleClose();
        navigate(Goalurl);
        break;
      case "report":
        const reporturl =
          role === "mentor"
            ? `view-report/${data.related_data.report_id}`
            : `view-report/${data.related_data.report_id}`;
        handleClose && handleClose();
        navigate(reporturl);
        break;
      // case 'report':
      //     const reporturl = role === 'mentor' ? `view-report/${data.related_data.report_id}` : `mentor-tasks-details/${data.related_data.report_id}?request_id=${data.related_data?.report_request_id}`
      //     handleClose && handleClose()
      //     navigate(reporturl)
      //     break;
      case "member":
        const memberurl =
          role === "mentor"
            ?data.related_data?.program_request_id? `/mentee-details/${data.related_data.member_id}?type=mentee_request&request_id=${data.related_data?.program_request_id}`:`/mentee-details/${data.related_data.member_id}`
            : `mentor-details/${data.related_data.member_id}?request_id=${data.related_data?.member_request_id}`;
        handleClose && handleClose();
        navigate(
          memberurl,
          role === "mentor"&&data.related_data?.program_request_id
            ? {
                state: {
                  data: {
                    id: data.related_data?.program_request_id,
                    status: "new",
                  },
                },
              }
            : {}
        );
        break;
      case "certificate":
        const certificateurl =
          role === "mentor" || role === "mentee"
            ? `certificate_mentees/${data.related_data.program_id}`
            : `certificate_mentees/${data.related_data.program_id}?request_id=${data.related_data?.certificate_id}`;
        handleClose && handleClose();
        navigate(
          certificateurl,
          role === "mentor"
            ? {
                state: {
                  status: "approved",
                },
              }
            : role === "admin"
            ? {
                state: {
                  rowId: data.related_data?.certificate_id,
                  status: "new",
                },
              }
            : {}
        );
        break;
      default:
        handleNavigation();
        break;
    }
  };

  useEffect(() => {
    dispatch(userActivities());
  }, []);

  return (
    <div className="notification-container">
      <div className="title">Notifications</div>
      {
      // !loading ? (
        <>
          {activity?.notifications?.length ? (
            <ul>
              {activity?.notifications?.map((list, index) => {
                return (
                  <li
                    className="notification-list cursor-pointer items-center"
                    onClick={() => handleVisitActivity(list)}
                    key={index}
                  >
                    <img
                      src={index % 2 === 0 ? MaleIcon : FemaleIcon}
                      alt="MaleIcon"
                    />
                    <p className="notification-message">{list.content}</p>
                    <p className="text-[12px]">{list.created_time}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-2 py-3">No activities found</div>
          )}
          {activity?.notifications?.length ? (
            <div className="py-4 w-full">
              <button
                className="py-3 px-16 text-white text-[14px] w-full flex items-center justify-center"
                style={{
                  background:
                    "#FE634E",
                  borderRadius: "5px",
                }}
                onClick={handleNavigation}
              >
                See all notifications
                <span className="pl-8 pt-1">
                  <img
                    style={{ width: "22px", height: "22px" }}
                    src={RightArrowIcon}
                    alt="RightArrowIcon"
                  />
                </span>
              </button>
            </div>
          ) : null}
        </>
      // ) : (
      //   <div>Loading...</div>
      // )
      }
    </div>
  );
}
