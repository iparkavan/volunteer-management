import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserImage from "../../assets/icons/user-icon.svg";
import {
  activityStatusColor,
  empty,
  programActionStatus,
  programMenus,
  roleName,
} from "../../utils/constant";

import RightArrow from "../../assets/icons/rightArrow.svg";
import protectedApi from "../../services/api";
import {
  chartProgramList,
  getProgramCounts,
} from "../../services/userprograms";
import CardWrapper from "../../shared/Card/CardWrapper";
import ListCard from "../../shared/Card/ListCard";
import Tooltip from "../../shared/Tooltip";
import DashboardPrograms from "./Admin/DashboardPrograms";
import MemberRequest from "./MemberRequest";
import { ProgramFeeds } from "./programFeeds";
import ProgramMetrix from "./ProgramMetrix";
import api from "../../services/api";
import MaleIcon from "../../assets/images/male-profile1x.png";
import FemaleIcon from "../../assets/images/female-profile1x.png";

export default function Admin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userInfo = useSelector((state) => state.userInfo);
  const userpragrams = useSelector((state) => state.userPrograms);

  const [programMenusList, setProgramMenusList] = useState([]);
  const [chartList, setChartList] = useState([]);
  const [membersCount, setMembersCount] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [topMentotList, setTopMentorList] = useState([]);

  const role = userInfo.data.role;
  const dispatch = useDispatch();
  const handleViewAllMembers = () => {
    console.log("View all");
  };

  // const membersList = [
  //     {
  //         name: 'Mentor Managers',
  //         count: 10
  //     },
  //     {
  //         name: 'Mentors',
  //         count: 20
  //     },
  //     {
  //         name: 'Mentees',
  //         count: 30
  //     },
  //     {
  //         name: 'Technical Supports',
  //         count: 40
  //     },
  // ]

  const fetchMembersCount = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await protectedApi.get("/dashboard/member-count");
      setMembersCount(response.data);
    } catch (error) {
      console.error("Error fetching member-count data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  useEffect(() => {
    fetchMembersCount();
    dispatch(getProgramCounts());
    getTopMentors();
  }, []);
  useEffect(() => {
    const totalCount = userpragrams.statusCounts;
    if (Object.keys(totalCount).length) {
      const programMenu = [...programMenus("dashboard")]
        .filter((men) => men.for.includes(role))
        .map((menu) => {
          if (menu.status === "all") {
            return { ...menu, count: userpragrams.totalPrograms };
          }

          // Admin Response Count
          if (role === "admin") {
            return { ...menu, count: totalCount[menu.adminStatus] };
          }

          return menu;
        });
      setProgramMenusList(programMenu);
    }
  }, [userpragrams]);
  const getTopMentors = async () => {
    const topMentor = await api.get("rating/top_mentor");
    if (topMentor.status === 200 && topMentor.data?.results) {
      setTopMentorList(topMentor.data.results);
    }
  };

  const data = [
    { title: "Ongoing Programs", value: 40, color: "#1D5BBF" },
    { title: "Completed", value: 25, color: "#00AEBD" },
    { title: "Abort Programs", value: 35, color: "#FEA7BB" },
  ];

  const activityList = [
    {
      id: 1,
      name: "Report 1",
      action_message: "Approved by Supervisor",
      time_since_action: "10 min ago",
      action: "create",
    },
    {
      id: 2,
      name: "Report 1",
      action_message: "Approved by Supervisor",
      time_since_action: "10 min ago",
      action: "create",
    },
    {
      id: 3,
      name: "Report 1",
      action_message: "Approved by Supervisor",
      time_since_action: "10 min ago",
      action: "create",
    },
    {
      id: 4,
      name: "Report 1",
      action_message: "Approved by Supervisor",
      time_since_action: "10 min ago",
      action: "create",
    },
    {
      id: 5,
      name: "Report 1",
      action_message: "Approved by Supervisor",
      time_since_action: "10 min ago",
      action: "create",
    },
  ];

  const handlePerformanceFilter = (e) => {
    const res = e?.target?.value || "date";
    dispatch(chartProgramList(res));
  };

  const handleDetails = () => {
    console.log("handleDetails");
  };

  // useEffect(() => {
  //     const programMenu = [...programMenus('dashboard')].filter(men => men.for.includes(role)).map(menu => {
  //         return { ...menu, count: 0 }
  //     })
  //     setProgramMenusList(programMenu)
  // }, [userpragrams])

  useEffect(() => {
    chartData();
  }, [userpragrams.chartProgramDetails]);

  const chartData = () => {
    if (
      userpragrams?.chartProgramDetails?.data &&
      userpragrams?.chartProgramDetails?.data?.length > 0
    ) {
      const res = userpragrams?.chartProgramDetails?.data.every(
        (val) => val.value === 0
      );
      if (res) {
        return setChartList(empty);
      } else {
        return setChartList(userpragrams?.chartProgramDetails?.data);
      }
    }
  };

  return (
    <div className="dashboard-content px-8 mt-10 py-5">
      <div className="grid grid-cols-7 gap-7">
        <div className="col-span-2">
          <div
            className="pb-3 w-full  bg-white rounded-lg"
            style={{
              boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
              background: "rgba(255, 255, 255, 1)",
            }}
          >
            <div className="flex flex-col items-center pb-10 pt-14 border-b-2">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                src={UserImage}
                alt="User logo"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                {userInfo?.data?.first_name} {userInfo?.data?.last_name}
              </h5>
              <span
                className="text-sm text-gray-500 "
                style={{ textTransform: "capitalize" }}
              >
                {roleName[userInfo.data.role]}
                {/* | {role === 'mentee'?"Student":role === 'mentor'?"Teaching Professional":role === 'admin'?"Organizational Supervisor":""} */}
              </span>
            </div>

            <ul className="flex flex-col gap-2 p-4 md:p-0 mt-4 font-medium">
              {programMenusList.map((menu, index) => {
                if (role === "admin" && index > 3) return null;
                return (
                  <li className="" key={index}>
                    <div
                      className={`flex justify-between py-2 px-6 rounded cursor-pointer menu-content 
                                    ${
                                      searchParams.get("type") ===
                                        menu.status ||
                                      (searchParams.get("is_bookmark") ===
                                        "true" &&
                                        menu.status ===
                                          programActionStatus.bookmark) ||
                                      (searchParams.get("type") === null &&
                                        searchParams.get("is_bookmark") ===
                                          null &&
                                        menu.status ===
                                          programActionStatus.yettojoin)
                                        ? "active"
                                        : ""
                                    }`}
                      aria-current="page"
                      onClick={() => navigate(menu.page)}
                    >
                      <span className="text-sm">{menu.name}</span>
                      <span className="text-base">{menu.count}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-center mt-2 mb-2">
              <button
                className="text-white flex justify-center items-center gap-3 px-4 py-3 text-[12px] rounded-[3px] bg-background-primary-main"
                onClick={() => navigate("/programs")}
                style={{ backgroundColor: "#FE634E" }}
              >
                <span>View All</span>
                <img src={RightArrow} alt={"RightArrow"} />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <ListCard
              title="Members"
              viewall
              handleViewall={handleViewAllMembers}
              items={membersCount}
            />
          </div>

          <div
            className="recent-request mt-4"
            style={{
              boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
            }}
          >
            <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
              <div className="flex gap-4">
                <div
                  className="card-dash !bg-background-primary-main !border-background-primary-main"
                ></div>
                <h4>Top Program Managers</h4>
              </div>
              <div className="flex justify-center mt-2 mb-2">
                <p
                  className="text-[12px] py-2 px-2 cursor-pointer bg-background-primary-light text-font-primary-main rounded-[3px]"
                  onClick={() => navigate("/mentors?req=topmentor")}
                >
                  View All
                </p>
              </div>
            </div>

            <div className="content flex flex-col gap-2 py-2 px-2 overflow-x-auto h-[730px]">
              {topMentotList.map((recentReq, index) => {
                let name = `${recentReq.first_name} ${recentReq.last_name}`;
                return (
                  <div
                    key={index}
                    className="py-3 px-3 border border-background-primary-main rounded-[10px]"
                    onClick={() =>
                      navigate(
                        `/mentor-details/${recentReq?.id}?fromType=topmentor`
                      )
                    }
                  >
                    <div
                      className="flex gap-2 pb-3 border-b border-background-primary-main"
                    >
                      <div className="w-1/4">
                        {" "}
                        <img
                          src={index % 2 === 0 ? MaleIcon : FemaleIcon}
                          alt="male-icon"
                        />{" "}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p
                          className="text-[12px]"
                          style={{
                            width: "100px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          title={name}
                        >
                          {name}
                        </p>
                        <p className="text-[10px]">{recentReq.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3">
                      <div className="flex items-center gap-1">
                        <span
                          className="lg:w-2 lg:h-2  rounded-full !bg-background-primary-main"
                        ></span>
                        <span className="lg:text-[8px]">
                          Attended({recentReq.attended || 0})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className="lg:w-2 lg:h-2  rounded-full !bg-black"
                        ></span>
                        <span className="lg:text-[8px]">
                          Completed({recentReq.completed || 0})
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-5">
          <CardWrapper title="Metrics at a Glance">
            <ProgramMetrix />
          </CardWrapper>

          <div className="py-3">
            <DashboardPrograms />
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-8 gap-7 mt-4">
                <div className='col-span-3'>
                    <ProgramPerformance data={userpragrams?.chartProgramDetails?.data &&
                        userpragrams?.chartProgramDetails?.data?.length > 0 ?
                        userpragrams?.chartProgramDetails?.data : data} total={userpragrams?.chartProgramDetails?.total_program_count || 10} handleFilter={handlePerformanceFilter} handleDetails={handleDetails} height={'440px'} />
                </div>
                <div className='col-span-5'>
                    <ReportsInfo />
                </div>

            </div> */}

      <div className="grid grid-cols-10 gap-7 mt-4">
        <div className="col-span-2">
          <CardWrapper title="Recent Activities" viewAll>
            <div style={{ height: "640px" }}>
              {activityList.length ? (
                <div className="program-status flex items-center flex-col justify-center w-max py-4 px-4">
                  {activityList.map((recentActivity) => (
                    <div
                      className="flex items-center flex-col relative"
                      key={recentActivity.id}
                    >
                      <div className="absolute top-0 left-full ml-4 w-max">
                        <Tooltip title={recentActivity.name}>
                          <p className="activity-name text-[14px]">
                            {recentActivity.name}
                          </p>
                        </Tooltip>
                        <Tooltip title={recentActivity.action_message}>
                          <h6
                            className="text-[10px] activity-msg"
                            style={{
                              color: activityStatusColor[recentActivity.action],
                            }}
                          >
                            {recentActivity.action_message}
                          </h6>
                        </Tooltip>
                      </div>
                      <div className="timeline absolute lg:right-[-205px] md:right-[-227px] sm:right-[-200px] text-[10px]">
                        {recentActivity.time_since_action}
                      </div>
                      <div className="w-8 h-3  mx-[-1px]  flex items-center justify-center">
                        <span
                          className="w-3 h-3  rounded-full"
                          style={{
                            background:
                              activityStatusColor[recentActivity.action],
                          }}
                        ></span>
                      </div>
                      <div
                        className="w-1 h-16 "
                        style={{ background: "rgba(0, 174, 189, 1)" }}
                      ></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-5">
                  There is no recent activities
                </div>
              )}
            </div>
          </CardWrapper>
        </div>
        <div className="col-span-4">
          <MemberRequest />
          {/* <div style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px', padding: '20px', marginTop: '20px' }} >
                        <div className='flex justify-evenly items-center'>
                            <div style={{ background: 'rgba(217, 228, 242, 1)', color: 'rgba(29, 91, 191, 1)', borderRadius: '3px', padding: '10px', fontWeight: 600 }}>
                                NGO Performance
                            </div>
                            <div className='flex items-center gap-2'>
                                <span style={{ fontWeight: 600 }}>4.6</span>
                                <p>
                                    <img className='h-[24px]' src={BlueStarIcon} alt="BlueStarIcon" />
                                </p>
                            </div>
                            <div>
                                (78,293,393 <span style={{ color: 'rgba(29, 91, 191, 1)', fontWeight: 600 }}> Views</span>)
                            </div>
                        </div>
                    </div> */}
        </div>

        <div className="col-span-4">
          <ProgramFeeds />
        </div>
      </div>
    </div>
  );
}
