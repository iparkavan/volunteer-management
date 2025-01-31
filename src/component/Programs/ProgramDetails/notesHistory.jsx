import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Circle from "../../../assets/icons/notesCircle.svg";
import {
  getProgramNotes,
  getProgramNotesUserList,
} from "../../../services/programInfo";
import { SelectBox } from "../../../shared/SelectBox";

const HistoryNotes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = React.useState("all");

  const { historyNotes, noteUserList, loading } = useSelector(
    (state) => state.programInfo
  );

  React.useEffect(() => {
    if (id) {
      dispatch(getProgramNotes({ id: id }));
      dispatch(getProgramNotesUserList(id));
    }
  }, [id]);

  const handleFilterChange = (value) => {
    console.log(value);
    setSelectedUser(value);
    if (value === "all") {
      dispatch(getProgramNotes({ id: id }));
    } else {
      dispatch(getProgramNotes({ id: id, created_by: value }));
    }
  };

  const breadcrumbs = [
    <Typography
      className="!text-[14px] !text-font-secondary-black cursor-pointer"
      onClick={() => navigate(`/dashboard`)}
    >
      Dashboard
    </Typography>,
    <Typography
      className="!text-[14px] !text-font-secondary-black cursor-pointer"
      onClick={() => navigate(`/program-details/${id}`)}
    >
      Program Details
    </Typography>,
    <Typography key="2" variant="body2" color={"primary"}>
      Program Notes history
    </Typography>,
  ];

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="py-5 px-4">
        <Breadcrumbs
          className="pb-4"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <div className="px-4 mt-2 shadow shadow-[#0000000D]">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-row justify-between items-center border-b border-border-main pb-2">
            <div className="mb-4 text-lg font-bold">Program Notes History</div>
            <SelectBox
              menuList={[{ label: "All", value: "all" }, ...noteUserList]}
              handleChange={(e) => handleFilterChange(e.target.value)}
              value={selectedUser}
              placeholder="Filter"
            />
          </div>
          <div className="w-full bg-[#FFF8F2] py-3 px-4 mt-2">
            <div className="grid items-center grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="text-left">Date & Time</div>
              <div className="text-left">Update content</div>
              <div className="text-right">Commented by</div>
            </div>
          </div>
          {historyNotes?.map((item, index) => (
            <div
              key={index}
              className="grid items-start grid-cols-3 gap-4 px-4 text-sm text-gray-700 min-h-32"
            >
              <div className="flex flex-col items-start justify-start h-full py-4 text-left w-fit">
                <div>Date: {moment(item?.post_date).format("MM-DD-YYYY")}</div>
                <div>
                  Time:{" "}
                  {moment(
                    new Date(`${item?.post_date} ${item?.post_time}`)
                  ).format("h:mm A")}
                </div>
              </div>

              <div className={`text-center relative flex h-full w-full`}>
                <div
                  key={index}
                  className={`flex flex-col items-center h-full  ${
                    index === 0 && "pt-4"
                  }`}
                >
                  <img src={Circle} alt="Circle" className="min-w-8 max-w-8" />

                  {index !== historyNotes?.length - 1 && (
                    <div
                      className={`h-full !border !border-dashed !border-[#353F4F]`}
                    ></div>
                  )}
                </div>
                <div className="flex flex-col items-start justify-start w-full px-4">
                  {/* <div className="relative z-10 inline-block py-2 bg-white">
                    <div className="flex ">
                      <div>{item?.description}</div>
                    </div>
                  </div> */}

                  {/* Comments (if any) */}
                  {item?.description && (
                    <div className="w-full mt-4 text-left">
                      <div className="font-semibold text-font-primary-main">
                        Comments:{" "}
                        <span className="text-font-secondary-black">
                          {item?.description}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="w-full mt-4 text-left">
                    <div className="font-semibold text-font-primary-main">
                      Location:{" "}
                      <span className="text-font-secondary-black">
                        {item?.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Updated By */}
              <div className="flex items-center justify-end h-full text-right capitalize text-font-primary-main">
                {item?.created_by_full_name}{" "}
                {`(${
                  item?.role === "mentee"
                    ? "Volunteer"
                    : item?.role === "mentor"
                    ? "Program Manager"
                    : item?.role === "admin"
                    ? "Supervisor"
                    : ""
                })`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HistoryNotes;
