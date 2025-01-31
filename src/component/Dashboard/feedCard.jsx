import { Box, Grid, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ViewIcon from "../../assets/icons/View.svg";
import UnFollowIcon from "../../assets/icons/unfollowIcon.svg";
import HideIcon from "../../assets/icons/hideIcon.svg";
import ReportIcon from "../../assets/icons/reportIcon.svg";
import EditIcon from "../../assets/icons/editIcon.svg"
import FeedImage from "../../assets/images/feed1.png";
import UserImage from "../../assets/icons/user-icon.svg";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import ShowMoreText from "react-show-more-text";

export const FeedCard = ({ programFeeds = "" }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      m={"22px"}
      className="!border !border-background-primary-main p-2 rounded-[10px] cursor-pointer"
      onClick={() => navigate(`/feed-details/${programFeeds?.id}`)}
    >
      <Stack direction={"row"} alignItems={"start"} spacing={2} width={"100%"}>
        <Box className="w-[140px]">
          <img
            src={programFeeds?.media_files?.[0]?.media_files ?? FeedImage}
            alt=""
            className="h-[120px] w-[100%] rounded-[10px]"
          />
        </Box>
        <Stack spacing={1} width={"100%"}>
          <Stack spacing={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Typography className="!text-font-secondary-black !text-[18px] font-bold">
                {programFeeds.title}
              </Typography>
              <div
                className="bg-background-primary-light"
                style={{
                  padding: "14px 18px",
                  cursor: "pointer",
                }}
                // onClick={() =>
                //   navigate(`/feed-details/${programFeeds?.id}`)
                // }
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
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
                <MenuItem
                  onClick={() => navigate(`/feed-details/${programFeeds?.id}`)}
                >
                  <img src={ViewIcon} alt="" />
                  <Typography className="!text-font-secondary-black text-[12px] font-semibold pl-2">
                    View
                  </Typography>
                </MenuItem>
                {/* <MenuItem
                          onClick={() =>
                            navigate(`/feed-details/${programFeeds?.id}`)
                          }
                        >
                          <img src={EditIcon} alt="" />
                          <Typography className="!text-font-secondary-black text-[12px] font-semibold pl-2">
                            Edit
                          </Typography>
                        </MenuItem>                        
                        <MenuItem onClick={handleClose}>
                          <img src={UnFollowIcon} alt="" />
                          <Typography className="!text-font-secondary-black text-[12px] font-semibold pl-2">
                            Unfollow
                          </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <img src={HideIcon} alt="" />
                          <Typography className="!text-font-secondary-black text-[12px] font-semibold pl-2">
                            Hide
                          </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <img src={ReportIcon} alt="" />
                          <Typography className="!text-font-secondary-black text-[12px] font-semibold pl-2">
                            Report
                          </Typography>
                        </MenuItem> */}
              </Menu>
            </Stack>
            <Typography className="!text-font-primary-main !text-[12px]">
              {programFeeds?.time_since_action}
            </Typography>
          </Stack>
          {/* <Typography>{programFeeds.content ?? programFeeds?.desc ?? ""}</Typography> */}

          <ShowMoreText
            lines={3} 
            more={<span className="custom-more-less">Show more</span>} 
            less={<span className="custom-more-less">Show less</span>}
            anchorClass="my-anchor-class"
            expanded={false}
          >
            <Typography
            className="custom-content"
              style={{ fontSize: "14px", color: "#232323" }}
            >
              {programFeeds.content ?? programFeeds?.desc ?? ""}
            </Typography>
          </ShowMoreText>
          <Grid container spacing={1}>
            {programFeeds?.tags_list?.map((tag) => {
              return (
                <Grid item xs={3}>
                  <Typography className="!bg-background-primary-light px-[12px] py-[4px] rounded-[50px] !text-font-primary-main text-center !text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {tag}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};
