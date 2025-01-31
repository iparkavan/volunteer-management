import React, { useEffect, useState } from "react";
import ArrowRightIcon from "../../assets/icons/arrowRightColor.svg";
import Mobilenumber from "../../assets/images/Mobilenumber1x.png";
import Location from "../../assets/images/Locationcolour1x.png";
import Linked from "../../assets/images/linked-in1x.png";
import File from "../../assets/images/html1x.png";
import Cancel from "../../assets/images/cancel-colour1x.png";
import Male from "../../assets/images/male-profile1x.png";
import SearchIcon from "../../assets/icons/search.svg";
import CancelIcon from "../../assets/images/cancel1x.png";
import CardWrapper from "../../shared/Card/CardWrapper";
import CancelColorIcon from "../../assets/icons/cancelCircle.svg";
import MaleProfileIcon from "../../assets/images/male-profile1x.png";
import FemaleProfileIcon from "../../assets/images/female-profile1x.png";
import StarIcon from "../../assets/icons/filledYellowStar.svg";
import EmailIcon from "../../assets/icons/EmailColor.svg";
import CalendarIcon from "../../assets/images/Birthdaydate1x.png";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import TickColorIcon from "../../assets/icons/tickColorLatest.svg";
import UserImage from "../../assets/images/chatimage.png";
import { Backdrop, Box, Grid } from "@mui/material";
import "./MentorProfile.css";
import { Button } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import MuiModal from "../../shared/Modal";
import {
  cancelMemberRequest,
  getCategoryList,
  updateMemberRequest,
} from "../../services/request";
import DataTable from "../../shared/DataGrid";
import { categoryColumns } from "../../mock";

import { getProfileInfo } from "../../services/userList";
import { programFeeds, recentRequest } from "../../utils/mock";
import ToastNotification from "../../shared/Toast";
import { dateFormat } from "../../utils";

function MentorProfile() {
  const { mentorProfile, loading, status } = useSelector(
    (state) => state.profileInfo
  );
  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const userInfo = useSelector((state) => state.userInfo);
  const role = userInfo.data.role || "";
  const [confirmPopup, setConfirmPopup] = useState({
    show: false,
    title: "",
    type: "",
    action: "",
  });
  const [categoryPopup, setCategoryPopup] = useState({
    show: false,
    selectedItem: [],
  });
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.userList);
  const { categoryList } = useSelector((state) => state.requestList);
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchMentoProfile = async () => {
    if (id) {
      dispatch(getProfileInfo({id: id}));
    }
  };
  const handleOpenConfirmPopup = (
    title,
    pageType,
    request,
    type = "accept"
  ) => {
    setConfirmPopup({
      show: true,
      title: title,
      requestType: pageType,
      type: type,
      action: request,
    });
  };
  const handleCancelConfirmPopup = () => {
    setConfirmPopup({
      show: false,
      title: "",
      requestType: "",
      type: "",
      action: "",
    });
  };
  const handleMemberCancelRequest = () => {
    handleOpenConfirmPopup(`Mentor Request`, "", "", "cancel");
  };
  const handleConfirmPopup = (selectedInfo) => {
    dispatch(
      cancelMemberRequest({
        member_id: +id,
      })
    ).then(() => {
      handleCancelConfirmPopup();

      navigate("/all-request?type=member_join_request");
    });
  };
  const handleCloseCategoryPopup = () => {
    setCategoryPopup({ show: false, selectedItem: [] });
  };

  const handleMemberAcceptRequest = () => {
    dispatch(getCategoryList())
    setCategoryPopup({ show: true, selectedItem: [] });
  };

  useEffect(() => {
    fetchMentoProfile();
  }, []);

  const handleSelectedItems = (selectedInfo) => {
    const categoryId = [];
    let data = { ...categoryPopup };
    if (selectedInfo.length) {
      data = { ...data, selectedItem: selectedInfo };
    }
    data.selectedItem.forEach((selected) =>
      categoryId.push(selected.categories_id)
    );
    const payload = {
      member_id: +id,
      categories_id: categoryId,
    };
    dispatch(updateMemberRequest(payload)).then(() => {
      setCategoryPopup({ show: false, selectedItem: [] });

      navigate("/all-request?type=member_join_request");
    });
  };
  const footerComponent = (props) => {
    return (
      <div className="flex gap-6 justify-center items-center py-4">
        <button
          onClick={() => setCategoryPopup({ show: false, selectedItem: [] })}
          className="py-3 px-6 w-[16%]"
          style={{
            border: "1px solid rgba(29, 91, 191, 1)",
            borderRadius: "3px",
            color: "rgba(29, 91, 191, 1)",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleSelectedItems(props.selectedRows);
          }}
          className="text-white py-3 px-6 w-[16%]"
          style={{
            background:
              "linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)",
            borderRadius: "3px",
          }}
        >
          Submit
        </button>
      </div>
    );
  };
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const skilList = [{ name: "Jave" }, { name: "C++" }, { name: "React" }];
  const CertificationList = [
    { name: " Teaching Program Certification 1" },
    { name: " Teaching Program Certification 2" },
    { name: " Teaching Program Certification 3" },
  ];
  const ExperionceList = [
    { name: " Software Developer", company: "Google", year: "1" },
    { name: " Jave Developer", company: "RS", year: "3" },
  ];
  const EducationList = [
    { name: " BCA", collage: "SIR", year: "2020" },
    { name: " MCA", collage: "RS", year: "2024" },
  ];
  return (
    <div className="px-8 mt-10 pb-5">
      <div
        className="px-3 py-5"
        style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
      >
        {showToast.show && <ToastNotification message={showToast.message} />}

        <div className="flex justify-between px-5 pb-4 mb-8 items-center border-b-2">
          <div className="flex gap-5 items-center text-[14px]">
            <p style={{ color: "rgba(89, 117, 162, 1)", fontWeight: 500 }}>
              Objectives
            </p>
            <img src={ArrowRightIcon} alt="ArrowRightIcon" />
            <p style={{ color: "rgba(89, 117, 162, 1)", fontWeight: 500 }}>
              All Request
            </p>
            <img src={ArrowRightIcon} alt="ArrowRightIcon" />
            <p style={{ color: "rgba(89, 117, 162, 1)", fontWeight: 500 }}>
              Member Join Request
            </p>
            <img src={ArrowRightIcon} alt="ArrowRightIcon" />
            <p>View New Program Manager Profile</p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/all-request?type=member_join_request")}
          >
            <img src={Cancel} alt="link" className="w-[20px] h[10px]" />
          </div>
        </div>

        <Grid container spacing={3}>
          <Grid item md={8} sm={12}>
            <Grid container spacing={3}>
              <Grid item md={12} sm={12}>
                {" "}
                <div
                  className="pb-3 w-full  bg-white rounded-lg"
                  style={{
                    boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
                    borderRadius: "10px",
                  }}
                >
                  <Box className="flex gap-6  p-4">
                    <Box>
                      <img
                        src={
                          userDetails?.profile_image
                            ? userDetails?.profile_image
                            : Male
                        }
                        alt="UserImage"
                        className="rounded-full w-[100px] h-[100px] ring-4"
                      />
                    </Box>

                    <Box className="pl-5 flex-[0.7]">
                      <Box className="flex flex-col">
                        <Box className="font-bold">
                          {userDetails?.first_name +
                            " " +
                            userDetails.last_name}
                        </Box>
                        <Box className="text-[12px]">Software Developer</Box>
                      </Box>
                      <div className="grid grid-cols-2 gap-7">
                        <div>
                          <div className="contact-info flex gap-3 items-center pt-2 pb-4">
                            <img src={Mobilenumber} alt="PhoneIcon" />
                            <span className="text-[12px]">
                              {" "}
                              {userDetails?.phone_number}
                            </span>
                          </div>
                          <div className="contact-info flex gap-3 items-center pt-2">
                            <img src={CalendarIcon} alt="CalendarIcon" />
                            <span className="text-[12px]">
                              {dateFormat(userDetails?.dob)}
                            </span>
                          </div>
                        </div>

                        <div className="pb-5">
                          <div className="contact-info flex gap-3 items-center pt-2 pb-4">
                            <img src={EmailIcon} alt="EmailIcon" />
                            <span className="text-[12px]">
                              {userDetails?.email}
                            </span>
                          </div>
                          <div className="contact-info flex gap-3 items-center pt-2">
                            <img src={Location} alt="LocationIcon" />
                            <span className="text-[12px]">
                              {userDetails?.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Box>
                </div>
              </Grid>
              <Grid item md={12} sm={12}>
                {" "}
                <CardWrapper title="About Mentor">
                  <Box className="p-5 text-[13px]">
                    The purple cat danced on the moon, Singing tunes to a
                    floating spoon. A penguin wore a big red hat, While juggling
                    stars with a baseball bat. The clouds all cheered, "Hooray,
                    hooray!" As the rainbow skipped the night away.
                  </Box>
                </CardWrapper>
              </Grid>
              <Grid item md={12} sm={12}>
                {" "}
                <CardWrapper title="Experience">
                  <Box className="p-4">
                    {ExperionceList.map((val, i) => (
                      <Box className="flex gap-2 items-center">
                        <Box>
                          <img
                            src={Linked}
                            alt="link"
                            className="w-[30px] h[20px]"
                          />
                        </Box>
                        <Box className="p-5 text-[13px]">
                          <p>{val.name}</p>
                          <p>{val.company}</p>
                          <p>{val.year}</p>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardWrapper>
              </Grid>
              <Grid item md={12} sm={12}>
                {" "}
                <CardWrapper title="Education">
                  <Box className="p-4">
                    {EducationList.map((val, i) => (
                      <Box className="flex gap-2 items-center">
                        <Box>
                          <img
                            src={Linked}
                            alt="link"
                            className="w-[30px] h[20px]"
                          />
                        </Box>
                        <Box className="p-5 text-[13px]">
                          <p>{val.name}</p>
                          <p>{val.collage}</p>
                          <p>{val.year}</p>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardWrapper>
              </Grid>
              <Grid item md={12} sm={12}>
                {" "}
                <CardWrapper title="Certification">
                  <Box className="p-4">
                    {CertificationList.map((val, i) => (
                      <Box
                        className={`flex gap-2 ${
                          i === CertificationList.length - 1 ? "" : "border-b-2"
                        }  items-center`}
                      >
                        <Box>
                          <img
                            src={File}
                            alt="link"
                            className="w-[30px] h[20px]"
                          />
                        </Box>
                        <Box className="p-5 text-[13px] flex-1">{val.name}</Box>
                        <Box>
                          {" "}
                          <button
                            className={`inline-block rounded px-6 py-1 h-8 text-gray-600 text-[14px] leading-[0.25rem] font-normal`}
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            style={{
                              background: "white",
                              border: "1px solid gray",
                            }}
                          >
                            {"View"}
                          </button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardWrapper>
              </Grid>
              <Grid item md={12} sm={12}>
                {" "}
                <CardWrapper title="Skills">
                  <Box className="p-4">
                    <Box>
                      {skilList.map((val, i) => (
                        <Box className="flex gap-2">
                          <p className="text-[14px] pb-3">{i + 1}.</p>
                          <p className="text-[14px]">{val.name}</p>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </CardWrapper>
              </Grid>
              <Grid item md={12} sm={12}>
                {" "}
                <Box className="pl-2">
                  {/* {role === "mentee" && ( */}
                  <div
                    style={{
                      boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.05)",
                      borderRadius: "10px",
                    }}
                    className="mt-8"
                  >
                    <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                      <div className="flex gap-4">
                        <div
                          className="card-dash"
                          style={{
                            background:
                              "#FE634E",
                          }}
                        ></div>
                        <h4>{"Related Program Managers"}</h4>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p
                          className="text-[12px] py-2 px-2"
                          style={{
                            background: "rgba(223, 237, 255, 1)",
                            borderRadius: "5px",
                          }}
                        >
                          View All
                        </p>
                      </div>
                    </div>

                    <div className="content flex gap-4 py-5 px-5 overflow-x-auto">
                      {recentRequest.map((recentRequest, index) => (
                        <div
                          key={index}
                          className="lg:w-4/12 md:w-1/3 py-3 px-3"
                          style={{
                            border: "1px solid rgba(219, 224, 229, 1)",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="flex gap-2 pb-3">
                            <div className="w-1/4">
                              {" "}
                              <img
                                src={
                                  index % 2 === 0
                                    ? MaleProfileIcon
                                    : FemaleProfileIcon
                                }
                                alt="male-icon"
                              />{" "}
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="text-[12px]">
                                {recentRequest.name}
                                <span>(Mentor)</span>
                              </p>
                              <p className="text-[12px]">Software Developer</p>
                              <p className="text-[12px] flex gap-1">
                                <img src={StarIcon} alt="StarIcon" /> 4.5
                                Ratings
                              </p>

                              <button
                                style={{
                                  border: "1px solid rgba(29, 91, 191, 1)",
                                  color: "rgba(29, 91, 191, 1)",
                                  fontSize: "12px",
                                  borderRadius: "30px",
                                  padding: "7px",
                                }}
                              >
                                Connect
                              </button>
                            </div>
                            <div
                              className="pt-1 cursor-pointer"
                              style={{ marginLeft: "auto" }}
                            >
                              <img src={MoreIcon} alt="MoreIcon" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* )} */}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4} sm={12}>
            <Grid container spacing={3}>
              <Grid item md={12} sm={12}>
                {" "}
                <div
                  className="pb-3 w-full  bg-white rounded-lg"
                  style={{
                    boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
                    borderRadius: "10px",
                  }}
                >
                  <Box className="py-4">
                    <Box className="cursor-pointer flex justify-end items-center h-full p-2">
                      <img src={MoreIcon} alt="MoreIcon" />
                    </Box>
                    <Box className="flex justify-center gap-4">
                      <Box className="flex flex-col">
                        <Box className="text-[12px]">Followers</Box>
                        <Box className="font-[600] text-center text-[14px]">
                          56
                        </Box>
                      </Box>
                      <Box className="flex flex-col">
                        <Box className="text-[12px]">Following</Box>
                        <Box className="font-[600] text-center text-[14px]">
                          14
                        </Box>
                      </Box>
                    </Box>
                    <Box className="flex justify-center gap-3 pt-3 pb-1">
                      <button
                        className={`inline-block rounded px-5 py-1 h-8 text-red-400  text-[14px] leading-[0.25rem] font-normal`}
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        onClick={handleMemberCancelRequest}
                        style={{
                          background: "transparent",
                          border: "1px solid red",
                        }}
                      >
                        {"Reject"}
                      </button>
                      <button
                        className={`inline-block rounded px-5 py-1 h-8 text-white text-[14px] leading-[0.25rem] font-normal`}
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        onClick={handleMemberAcceptRequest}
                        style={{
                          background: "#00aebd",
                          border: "1px solid #00aebd",
                        }}
                      >
                        {"Approve"}
                      </button>
                    </Box>
                  </Box>
                </div>
              </Grid>
              <Grid item md={12} sm={12}>
                {" "}
                <div
                  className="pb-3 w-full bg-white rounded-lg"
                  style={{
                    boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
                    borderRadius: "10px",
                  }}
                >
                  <Box className="border-b-2 ">
                    <Box className="text-blue-600 text-[14px] font-[600] py-4 px-5">
                      Social Network
                    </Box>
                  </Box>
                  <Box className="flex justify-center items-center p-16">
                    <img src={Linked} alt="link" className="w-[30px] h[20px]" />
                  </Box>
                </div>
              </Grid>
              <Grid item md={12} sm={12}>
                {" "}
                <Box
                  style={{
                    boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
                    borderRadius: "10px",
                    height: "auto",
                  }}
                >
                  <Box>
                    <CardWrapper title="Program Feeds" viewAll>
                      <div style={{ height: "750px", overflowY: "scroll" }}>
                        {programFeeds.map((programFeeds, index) => (
                          <div
                            key={index}
                            className="program-feed-root mx-7 my-3"
                          >
                            <div className="flex items-center py-3 px-3 gap-4">
                              <img
                                src={UserImage}
                                className={`program-user-image ${
                                  getWindowDimensions().width <= 1536
                                    ? "w-1/4"
                                    : "w-1/6"
                                } rounded-xl`}
                                style={{
                                  height:
                                    getWindowDimensions().width <= 1536
                                      ? "105px"
                                      : "100px",
                                }}
                                alt=""
                              />
                              <div className="feed-content flex flex-col gap-4">
                                <h3>{programFeeds.title}</h3>
                                <h4
                                  className="text-[12px]"
                                  style={{ color: "rgba(29, 91, 191, 1)" }}
                                >
                                  {"10 Mins ago"}
                                </h4>
                                <h4 className="text-[12px]">
                                  {programFeeds.desc}
                                </h4>
                              </div>
                              <div
                                style={{
                                  background: "rgba(241, 247, 255, 1)",
                                  padding: "14px 18px",
                                }}
                              >
                                <img src={MoreIcon} alt="MoreIcon" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardWrapper>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <MuiModal
          modalSize="md"
          modalOpen={categoryPopup.show}
          modalClose={handleCloseCategoryPopup}
          noheader
        >
          <div className="px-5 py-5">
            <div
              className="flex justify-center flex-col gap-5 px-5 pb-5 mt-4 mb-4"
              style={{
                border: "1px solid rgba(29, 91, 191, 1)",
                borderRadius: "10px",
              }}
            >
              <div
                className="flex justify-between px-3 py-4 items-center"
                style={{ borderBottom: "1px solid rgba(29, 91, 191, 1)" }}
              >
                <p
                  className="text-[18px]"
                  style={{ color: "rgba(0, 0, 0, 1)" }}
                >
                  Select Category
                </p>
                <img
                  className="cursor-pointer"
                  onClick={handleCloseCategoryPopup}
                  src={CancelIcon}
                  alt="CancelIcon"
                />
              </div>
              <div className="flex justify-between px-3 mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 text-sm text-gray-900 border-none"
                    placeholder="Search here..."
                    style={{
                      border: '1px solid #FE634E',
                      borderRadius: "50px",
                      height: "60px",
                      width: "100%",
                    }}
                  />
                  <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                    <img src={SearchIcon} alt="SearchIcon" />
                  </div>
                </div>
                {/* <div>
                                    <select className='form-control' style={{ border: '1px solid #000', height: '50px', width: '250px', padding: '6px' }}>
                                        <option value="category">Category</option>
                                        <option value="general">General Category</option>
                                    </select>
                                </div> */}
              </div>

              <DataTable
                rows={categoryList}
                columns={categoryColumns}
                height={"460px"}
                footerComponent={footerComponent}
                selectedAllRows={categoryPopup.selectedItem}
              />
            </div>
          </div>
        </MuiModal>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={confirmPopup.show}
        >
          <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
            <img
              src={
                confirmPopup.type === "accept"
                  ? TickColorIcon
                  : confirmPopup.type === "cancel"
                  ? CancelColorIcon
                  : ""
              }
              alt="TickColorIcon"
            />
            <span
              style={{ color: "#232323", fontWeight: 600, fontSize: "24px" }}
            >
              {confirmPopup.type === "accept"
                ? "Approve"
                : confirmPopup.type === "cancel"
                ? "Reject"
                : ""}
            </span>
            <div className="py-5">
              <p
                style={{
                  color: "rgba(24, 40, 61, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Are you sure want to {confirmPopup.type} {confirmPopup.title}?
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-6 justify-center align-middle">
                <Button
                  btnCls="w-[110px]"
                  btnName={
                    confirmPopup.type === "accept"
                      ? "Cancel"
                      : confirmPopup.type === "cancel"
                      ? "No"
                      : ""
                  }
                  btnCategory="secondary"
                  onClick={handleCancelConfirmPopup}
                />
                <Button
                  btnType="button"
                  btnCls="w-[110px]"
                  btnName={
                    confirmPopup.type === "accept"
                      ? "Approve"
                      : confirmPopup.type === "cancel"
                      ? "Yes"
                      : ""
                  }
                  style={{
                    background:
                      confirmPopup.type === "accept" ? "#16B681" : "#E0382D",
                  }}
                  btnCategory="primary"
                  onClick={handleConfirmPopup}
                />
              </div>
            </div>
          </div>
        </Backdrop>
      </div>
    </div>
  );
}

export default MentorProfile;
