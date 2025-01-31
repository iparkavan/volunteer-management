import { useState, useEffect, useMemo } from "react";
// import { protectedApi } from "../services/api";
// import Swal from "sweetalert2";
// import { notifySuccess } from "../helper/toastNotication";

function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [internalEvents, setInternalEvents] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);
  const [internalEventsLoading, setInternalEventsLoading] = useState(true);
  const [externalEventsLoading, setExternalEventsLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useEffect(() => {
    // fetchEvents();
    fetchAppointments();
  }, []);

  const fetchProfileType = async () => {
    // try {
    //   const response = await protectedApi.get("/profile-type/");
    //   return response.data;
    // } catch (error) {
    //   console.error("Error fetching profile type:", error);
    // }
  };

  const fetchAppointments = async () => {
    // try {
    //   setAppointmentsLoading(true);
    //   const currentUserProfile = await fetchProfileType();

    //   const response = await protectedApi.get(`/appointments`);
    //   let eventData = response.data.map((event) => {
    //     const date = new Date(event.start_time);
    //     // Add 30 minutes
    //     const duration = +event.duration.split(":")[1];
    //     // const duration = 30;
    //     date.setMinutes(date.getMinutes() + duration);
    //     // Convert back to ISO string
    //     const endDateTime = date.toISOString();

    //     return {
    //       ...event,
    //       isExternal: false,
    //       summary: event.meeting_title,
    //       start: {
    //         dateTime: event.start_time,
    //       },
    //       end: {
    //         dateTime: endDateTime,
    //       },
    //     };
    //   });

    //   if (currentUserProfile?.user) {
    //     eventData = eventData.filter((eventItm) => {
    //       if (eventItm.staff) {
    //         return eventItm.staff === currentUserProfile?.user;
    //       } else return false;
    //     });
    //   }

    //   setAppointments(eventData);
    // } catch (error) {
    //   console.error("Error fetching calendar appointments:", error);
    // } finally {
    //   setAppointmentsLoading(false);
    // }
  };

  const fetchGoogleEvents = async () => {
    // try {
    //   const response = await protectedApi.get(`/rest/v1/calendar/events/`);
    //   const external = response.data.data
    //     ? response.data.data.map((event) => ({
    //         isExternal: true,
    //         ...event,
    //       }))
    //     : [];
    //   setExternalEvents(external);
    // } catch (error) {
    //   console.error("Error fetching calendar events:", error);
    // } finally {
    //   setExternalEventsLoading(false);
    // }
  };

  const fetchInternalEvents = async () => {
    // try {
    //   const response = await protectedApi.get(`/django/calendar/events/`);
    //   const internal = response.data
    //     ? response.data.map((event) => ({
    //         isExternal: false,
    //         summary: event.summary,
    //         start: {
    //           dateTime: event.start_datetime,
    //         },
    //         end: {
    //           dateTime: event.end_datetime,
    //         },
    //         htmlLink: event.meeting_link,
    //         fullEvent: event,
    //       }))
    //     : [];

    //   setInternalEvents(internal);
    // } catch (error) {
    //   console.error("Error fetching calendar events:", error);
    // } finally {
    //   setInternalEventsLoading(false);
    // }
  };

  const fetchEvents = async () => {
    await Promise.all([fetchGoogleEvents(), fetchInternalEvents()]);
  };

  const deleteAppointment = async (id) => {
    // try {
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: `Do you want to delete appointment ?`,
    //     icon: "error",
    //     showCancelButton: true,
    //     confirmButtonColor: "#d33",
    //     //  "#43B09C",
    //     cancelButtonColor: "#e3e3e3",
    //     confirmButtonText: "Delete",
    //   })
    //     .then(async (result) => {
    //       if (result.isConfirmed) {
    //         const response = await protectedApi.get(
    //           `/appointment/${id}/delete`
    //         );
    //         notifySuccess(response?.data?.message || "Deleted Successfuly");
    //         fetchAppointments();
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error deleting appointment", error);
    //     });
    // } catch (error) {
    //   console.error("Error deleting appointment", error);
    // } finally {
    //   setInternalEventsLoading(false);
    // }
  };

  const combinedEventList = useMemo(() => {
    return [...internalEvents, ...externalEvents];
  }, [internalEvents, externalEvents]);

  return {
    internalEventsLoading,
    externalEventsLoading,
    appointmentsLoading,
    internalEvents,
    externalEvents,
    eventList: combinedEventList,
    appointmentsList: appointments,
    fetchGoogleEvents,
    fetchInternalEvents,
    fetchEvents,
    fetchAppointments,
    deleteAppointment,
  };
}

export default useAppointments;
