import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../../shared/Card/CardWrapper";
import { getPost } from "../../services/feeds";
import UserImage from "../../assets/icons/user-icon.svg";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import { Box, Grid, Menu, MenuItem, Stack, Typography } from "@mui/material";
import FeedImage from "../../assets/images/feed1.png";
import { useNavigate } from "react-router-dom";
import ViewIcon from "../../assets/icons/View.svg";
import UnFollowIcon from "../../assets/icons/unfollowIcon.svg";
import HideIcon from "../../assets/icons/hideIcon.svg";
import ReportIcon from "../../assets/icons/reportIcon.svg";
import EditIcon from "../../assets/icons/editIcon.svg"
import { FeedCard } from "./feedCard";

export const ProgramFeeds = ({ feedsList = [] }) => {
  const dispatch = useDispatch();
  const { feeds } = useSelector((state) => state.feeds);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //   function getWindowDimensions() {
  //     const { innerWidth: width, innerHeight: height } = window;
  //     return {
  //       width,
  //       height,
  //     };
  //   }

  React.useEffect(() => {
    if (feedsList?.length === 0) {
      let feedData = {
        page: 1,
        pageSize: 5,
      };
      dispatch(getPost(feedData));
    }
  }, []);

  return (
    <>
      <CardWrapper
        title="Program Feeds"
        viewAll
        handleViewAll={() => navigate("/feeds")}
      >
        <div
          style={{ height: "640px", overflowY: "scroll", background: "#fff" }}
        >
          {(feedsList?.length > 0 ? feedsList : feeds?.results)?.map((programFeeds, index) => (
            <FeedCard programFeeds={programFeeds} />
          ))}
        </div>
      </CardWrapper>
    </>
  );
};
