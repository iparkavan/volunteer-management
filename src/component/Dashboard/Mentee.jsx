import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

import UserInfoCard from "./UserInfoCard";

import SearchIcon from "../../assets/icons/search.svg";
import UserImage from "../../assets/images/user.jpg";
import MaleIcon from "../../assets/images/male-profile1x.png";
import FemaleIcon from "../../assets/images/female-profile1x.png";

import { pipeUrls } from "../../utils/constant";
import { programStatus } from "../../utils/constant";
import {
  getMenteeProgramCount,
  getMenteePrograms,
} from "../../services/userprograms";

import "./dashboard.css";
import ProgramCard from "../../shared/Card/ProgramCard";
import { programFeeds } from "../../utils/mock";
import Invite from "./Invite";
import api from "../../services/api";
import MuiModal from "../../shared/Modal";
import { CategoryPopup } from "./categoryPopup";
import CloseIcon from "../../assets/icons/blueCloseIcon.svg";
import { acceptMember, getCategory } from "../../services/category";
import { jwtDecode } from "jwt-decode";
import { FeedCard } from "./feedCard";
import { getPost } from "../../services/feeds";
// import { ProgramFeeds } from './programFeeds';

export const Mentee = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [topMentotList, setTopMentorList] = useState([]);
  const [openCategory, setOpenCategory] = React.useState(false);
  const userpragrams = useSelector((state) => state.userPrograms);
  const userInfo = useSelector((state) => state.userInfo);
  const { feeds } = useSelector((state) => state.feeds);
  const token = localStorage.getItem("access_token");
  let decoded = jwtDecode(token);

  React.useEffect(() => {
    if (!decoded?.category_added) {
      setOpenCategory(true);
    }
  }, []);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const role = userInfo.data.role;

  const getPrograms = () => {
    const filterType = searchParams.get("type");
    const isBookmark = searchParams.get("is_bookmark");
    const categoryFilter = searchParams.get("category_id");

    let query = {};

    if (filterType && filterType !== "") {
      query = { type: "status", value: filterType };
    }

    if (isBookmark && isBookmark !== "") {
      query = { type: "is_bookmark", value: isBookmark };
    }

    if (categoryFilter && categoryFilter !== "") {
      query.category_id = categoryFilter;
    }

    dispatch(getMenteePrograms(query));
  };

  const getTopMentors = async () => {
    const topMentor = await api.get("rating/top_mentor");
    if (topMentor.status === 200 && topMentor.data?.results) {
      setTopMentorList(topMentor.data.results);
    }
  };

  useEffect(() => {
    if (role !== "" && userInfo?.data?.is_registered) {
      getPrograms();
    }
  }, [searchParams, role]);

  useEffect(() => {
    const filterType = searchParams.get("type");
    const isBookmark = searchParams.get("is_bookmark");
    dispatch(getMenteeProgramCount());
    getTopMentors();
    if (
      filterType === null &&
      isBookmark === null &&
      userInfo?.data?.is_registered
    ) {
      dispatch(getMenteePrograms({}));
    }
  }, []);

  const handleNavigateDetails = (program) => {
    let baseUrl = pipeUrls.programdetails;
    if (Object.keys(program).length) {
      const filterType = searchParams.get("type");
      navigate(`${baseUrl}/${program.id}`);
    }
  };

  const handleBookmark = async (program) => {
    const payload = {
      program_id: program.id,
      marked: !program.is_bookmark,
    };
    setLoading(true);

    const bookmark = await api.post("bookmark", payload);
    if (bookmark.status === 201 && bookmark.data) {
      setLoading(false);
      getPrograms();
      if (role === "mentee") dispatch(getMenteeProgramCount());
    }
  };

  useEffect(() => {
    if (
      userpragrams.status === programStatus.bookmarked &&
      userInfo?.data?.is_registered
    ) {
      getPrograms();
    }
  }, [userpragrams.status]);

  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [category, setCategory] = React.useState([]);

  const handleGetCategory = (searchText = "") => {
    const payload = {
      search: searchText,
    };
    dispatch(getCategory(payload)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setCategory(res?.payload ?? []);
      }
    });
  };

  const handleUpdateGategory = (type = "") => {
    let payload = {};
    if (type === "update") {
      payload = {
        type: "mentee_category",
        categories_id: selectedCategory,
      };
    } else {
      payload = {
        type: "mentee_category",
      };
    }
    dispatch(acceptMember(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setOpenCategory(false);
        setCategory([]);
        localStorage.setItem("access_token", res?.payload?.access);
        localStorage.setItem("refresh_token", res?.payload?.refresh);
        getPrograms();
      }
    });
  };

  const handleSelectCategory = (value) => {
    if (selectedCategory.includes(value)) {
      // Remove the value if it's already selected
      setSelectedCategory(selectedCategory.filter((id) => id !== value));
    } else {
      // Add the value if it's not already selected
      setSelectedCategory([...selectedCategory, value]);
    }
  };

   React.useEffect(() => {
      let feedData = {
        page: 1,
        pageSize: 5,
      };
      dispatch(getPost(feedData));
    }, []);

  return (
    <>
      <div className="dashboard-content px-8 mt-10">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={userpragrams.loading || loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <div className="grid grid-cols-5 gap-7">
          <div>
            <UserInfoCard />
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
                    className="card-dash"
                    style={{
                      background: "#FE634E",
                      border: "1px solid #FE634E",
                    }}
                  ></div>
                  <h4>Top Program Managers</h4>
                </div>
                <div className="flex justify-center mt-2 mb-2">
                  <p
                    className="text-[12px] py-2 px-2 cursor-pointer"
                    style={{
                      background: "#FFF8F2",
                      color: "#FE634E",
                      borderRadius: "3px",
                    }}
                    onClick={() => navigate("/mentors?type=topmentor")}
                  >
                    View All
                  </p>
                </div>
              </div>

              <div className="content flex flex-col gap-4 py-5 px-5 overflow-x-auto">
                {topMentotList.map((recentReq, index) => {
                  let name = `${recentReq.first_name} ${recentReq.last_name}`;
                  return (
                    <div
                      key={index}
                      className="py-3 px-3"
                      style={{
                        border: "1px solid #FE634E",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        className="flex gap-2 pb-3"
                        style={{
                          borderBottom: "1px solid #FE634E",
                        }}
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
                            className="text-[14px]"
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
                          <p className="text-[12px]">{recentReq.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-3">
                        <div className="flex items-center gap-1">
                          <span
                            className="lg:w-2 lg:h-2  rounded-full"
                            style={{ background: "rgba(29, 91, 191, 1)" }}
                          ></span>
                          <span className="lg:text-[10px]">
                            Attended({recentReq.attended || 0})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span
                            className="lg:w-2 lg:h-2  rounded-full"
                            style={{ background: "rgba(0, 174, 189, 1)" }}
                          ></span>
                          <span className="lg:text-[10px]">
                            Completed({recentReq.completed || 0})
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-6">
              <Invite />
            </div>
          </div>

          <div className="col-span-4">
            {searchParams.get("type") === null &&
              searchParams.get("is_bookmark") === null && (
                <ProgramCard
                  title="All Programs"
                  viewpage="/programs"
                  handleNavigateDetails={handleNavigateDetails}
                  handleBookmark={handleBookmark}
                  programs={userpragrams.allprograms}
                  loadProgram={getPrograms}
                />
              )}

            {(searchParams.get("type") === "yettojoin" ||
              searchParams.get("type") === "planned") && (
              <ProgramCard
                title="Active Programs"
                viewpage="/programs?type=yettojoin"
                handleNavigateDetails={handleNavigateDetails}
                handleBookmark={handleBookmark}
                programs={userpragrams.yettojoin}
                loadProgram={getPrograms}
              />
            )}

            {searchParams.get("type") === "yettostart" && (
              <ProgramCard
                title="Recent Join Programs"
                viewpage="/programs?type=yettostart"
                handleNavigateDetails={handleNavigateDetails}
                handleBookmark={handleBookmark}
                programs={userpragrams.yettostart}
                loadProgram={getPrograms}
              />
            )}

            {searchParams.get("type") === "inprogress" && (
              <ProgramCard
                title="Ongoing Programs"
                viewpage="/programs?type=inprogress"
                handleNavigateDetails={handleNavigateDetails}
                handleBookmark={handleBookmark}
                programs={userpragrams.inprogress}
                loadProgram={getPrograms}
              />
            )}

            <div className="mt-4">
              <div
                className="program-feeds"
                style={{
                  boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.05)",
                  borderRadius: "10px",
                }}
              >
                <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                  <div className="flex gap-4">
                    <div
                      className="card-dash"
                      style={{
                        background: "#FE634E",
                        border: "1px solid #FE634E",
                      }}
                    ></div>
                    <h4>Program Feeds</h4>
                  </div>
                  <div className="flex gap-4 items-center">
                    <img src={SearchIcon} alt="statistics" />
                    <p
                      className="text-[12px] py-2 px-2 cursor-pointer !bg-background-primary-light text-font-primary-main"
                      onClick={() => navigate("/feeds")}
                      style={{
                        borderRadius: "5px",
                        backgroundColor: "#FE634E",
                      }}
                    >
                      View All
                    </p>
                  </div>
                </div>

                <div className="content flex overflow-x-auto">
                  {feeds?.results?.map((programFeeds, index) => (
                    // <div
                    //   key={index}
                    //   style={{
                    //     border: '1px solid #FE634E',
                    //     borderRadius: '5px',
                    //   }}
                    //   className='program-feed-root mx-7 my-7'
                    // >
                    //   <div className='flex py-3 px-3 gap-4 w-[340px]'>
                    //     <img
                    //       src={UserImage}
                    //       className={`program-user-image ${
                    //         getWindowDimensions().width <= 1536
                    //           ? 'w-1/5'
                    //           : 'w-1/6'
                    //       } rounded-xl h-[100px]`}
                    //       style={{
                    //         height:
                    //           getWindowDimensions().width <= 1536
                    //             ? '90px'
                    //             : '100px',
                    //       }}
                    //       alt=''
                    //     />
                    //     <div className='feed-content flex flex-col gap-4'>
                    //       <h3>{programFeeds.title}</h3>
                    //       <h4 className='text-[12px]'>{programFeeds.desc}</h4>
                    //       <div className='flex gap-3'>
                    //         <span
                    //           style={{
                    //             background: '#FFF8F2',
                    //             borderRadius: '30px',
                    //           }}
                    //           className='tags py-1 px-4 text-[13px]'
                    //         >
                    //           Tag
                    //         </span>
                    //         <span
                    //           style={{
                    //             background: '#FFF8F2',
                    //             borderRadius: '30px',
                    //           }}
                    //           className='tags py-1 px-4 text-[13px]'
                    //         >
                    //           Tag
                    //         </span>
                    //         <span
                    //           style={{
                    //             background: '#FFF8F2',
                    //             borderRadius: '30px',
                    //           }}
                    //           className='tags py-1 px-4 text-[13px]'
                    //         >
                    //           Tag
                    //         </span>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <div className="min-w-[450px]">
                      <FeedCard programFeeds={programFeeds} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <ProgramFeeds /> */}
          </div>
        </div>
      </div>

      {/* category Popup */}
      <MuiModal
        modalOpen={openCategory}
        modalClose={() => {
          setOpenCategory(false);
          handleUpdateGategory("skip");
        }}
        noheader
        padding={0}
      >
        <Stack
          p={"12px 18px"}
          className="border-b border-[#D9E4F2]"
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>Select Category's</Typography>
          <div
            onClick={() => {
              setOpenCategory(false);
              handleUpdateGategory("skip");
            }}
          >
            <img src={CloseIcon} />
          </div>
        </Stack>
        <CategoryPopup
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleGetCategory={handleGetCategory}
          handleUpdateGategory={handleUpdateGategory}
          handleSelectCategory={handleSelectCategory}
        />
      </MuiModal>
    </>
  );
};
