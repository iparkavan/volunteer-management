import React, { useEffect, useState } from "react";
import InlineCalendar from "../../shared/Calendar/InlineCalendar";
import "./calendar.css";
import PlusWhiteIcon from "../../assets/icons/PlusWhite.svg";
import CalendarMain from "../Calendar/CalendarMain";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCalendarEvents,
  getCalendarFilterEvents,
} from "../../services/scheduler";
import { Backdrop, CircularProgress } from "@mui/material";
import { user } from "../../utils/constant";

export default function Scheduler() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, filteredEvents, loading } = useSelector(
    (state) => state.events
  );
  const { data: userInfo } = useSelector((state) => state.userInfo);
  const [eventsFilter, setEventsFilter] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  const [actionActionBtn, setActionActionBtn] = useState("all");
  const eventColors = {
    all: "rgba(0, 174, 189, 1)",
    upcoming: "rgba(29, 91, 191, 1)",
    reschedule: "rgba(255, 138, 0, 1)",
    completed: "rgba(22, 182, 129, 1)",
    cancelled: "rgba(224, 56, 45, 1)",
    draft: "rgba(183, 183, 183, 1)",
  };

  let calendarEvents = [
    {
      name: "All Meetings",
      key: "all",
      total: 10,
      view: ["admin", "mentor", "mentee"],
    },
    {
      name: "Upcoming Meetings",
      key: "upcoming",
      total: 10,
      view: ["admin", "mentor", "mentee"],
    },
    {
      name: "Rescheduled Meetings",
      key: "reschedule",
      total: 10,
      view: ["admin", "mentor"],
    },
    {
      name: "Completed Meetings",
      key: "completed",
      total: 10,
      view: ["admin", "mentor", "mentee"],
    },
    {
      name: "Cancelled Meetings",
      key: "cancelled",
      total: 10,
      view: ["admin", "mentor", "mentee"],
    },
    {
      name: "Draft Meetings",
      key: "draft",
      total: 10,
      view: ["admin", "mentor"],
    },
  ];

  useEffect(() => {
    setEventsFilter(calendarEvents);
    dispatch(getCalendarEvents());
  }, [dispatch]);

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      const startDate = dateRange.start.format("YYYY-MM-DD");
      const endDate = dateRange.end.format("YYYY-MM-DD");
      dispatch(
        getCalendarFilterEvents({ startDate, endDate, status: actionActionBtn })
      );
    }
  }, [dateRange, actionActionBtn, dispatch]);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length) {
      const events = calendarEvents.filter((event) =>
        event.view.includes(userInfo.role)
      );
      setEventsFilter(events);
    }
  }, [userInfo]);

  return (
    <div className="calendar-container px-9 py-9">
      <div
        className="px-3 py-5"
        style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
      >
        <nav
          className="flex px-7 pt-6 pb-5 mx-2 border-b-2"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-[26px] font-medium"
                style={{ color: "rgba(24, 40, 61, 1)" }}
              >
                Scheduler
              </a>
            </li>
          </ol>
        </nav>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <div className="grid grid-cols-5 gap-7 py-5">
          <div className="left-container col-span-1">
            <div
              className="my-program-list pb-3 mb-4 px-6"
              style={{
                boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
                border: "1px solid rgba(219, 224, 229, 1)",
              }}
            >
              <div className="title flex justify-between py-7">
                <h4
                  className="text-base font-semibold"
                  style={{ color: "rgba(24, 40, 61, 1)" }}
                >
                  My meetings
                </h4>
              </div>
              <div className="flex gap-5 flex-col justify-center items-center pb-5">
                {(userInfo.role === user.mentor||userInfo.role === user.admin) && (
                  <button
                    className="flex gap-3 justify-center py-3 w-full text-[13px]"
                    style={{
                      background: "#FE634E",
                      color: "#fff",
                      borderRadius: "3px",
                    }}
                    onClick={() => navigate("/create-meeting")}
                  >
                    <img src={PlusWhiteIcon} alt="PlusWhiteIcon" />
                    Add New Meeting
                  </button>
                )}

                {eventsFilter.map((calendarevent, index) => (
                  <div
                    key={index}
                    className={`action-btn flex justify-between cursor-pointer !border !border-background-primary-main ${
                      actionActionBtn === calendarevent.key
                        ? "!bg-background-primary-light"
                        : ""
                    }`}
                    onClick={() => {
                      const currentParams = new URLSearchParams(searchParams);
                      currentParams.set("status", calendarevent.key);
                      setSearchParams(currentParams);
                      setActionActionBtn(calendarevent.key);
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      <div
                        style={{
                          background: `${eventColors[calendarevent.key]}`,
                          height: "10px",
                          width: "10px",
                        }}
                      ></div>
                      <span className="text-[13px]">{calendarevent.name}</span>
                    </div>
                    {/* <div className='font-semibold'>{calendarevent.total}</div> */}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="events-calendar pb-3 px-2"
              style={{
                boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
                border: "1px solid rgba(219, 224, 229, 1)",
              }}
            >
              <InlineCalendar />
            </div>
          </div>

          {!loading && (
            <div className="col-span-4">
              <div
                style={{
                  border: "1px solid rgba(219, 224, 229, 1)",
                  boxShadow: "rgba(0, 0, 0, 0.05) 4px 4px 25px 0px",
                  borderRadius: "10px",
                }}
              >
                <CalendarMain
                  title="Meeting Scheduler"
                  addSection={false}
                  events={filteredEvents}
                  setDateRange={setDateRange}
                  actionActionBtn={actionActionBtn}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
