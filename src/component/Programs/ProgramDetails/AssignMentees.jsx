import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { useForm } from "react-hook-form";
import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { AssignMenteesFields } from "../../../utils/formFields";
import CalendarIcon from "../../../assets/images/calender_1x.png";
import UserImage from "../../../assets/icons/user-icon.svg";
import HTMLIcon from "../../../assets/images/html1x.png";
import TextIcon from "../../../assets/images/text1x.png";

import { Button } from "../../../shared";
import MuiModal from "../../../shared/Modal";
import { MenteeAssignColumns } from "../../../mock";
import DataTable from "../../../shared/DataGrid";
import SuccessTik from "../../../assets/images/blue_tik1x.png";
import {
  getAllCategories,
  getProgramListWithCategory,
} from "../../../services/programInfo";
import "./program.css";

import {
  assignProgramTask,
  getMenteeDetails,
  getProgramDetails,
  getProgramMentees,
  getProgramTaskMentees,
  upateProgramTask,
  updateProgram,
} from "../../../services/userprograms";
import {
  pipeUrls,
  programActionStatus,
  programStatus,
} from "../../../utils/constant";
import dayjs from "dayjs";
import CloseIcon from "../../../assets/images/cancel-colour1x.png";
import moment from "moment";

export default function AssignMentees() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const state = useLocation()?.state;
  const [addMenteeModal, setMentalModal] = useState(false);
  const [taskSuccess, setTaskSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const calendarRef = useRef([]);
  const dispatch = useDispatch();
  const type = searchParams.get("type");
  const from_type = searchParams.get("from");
  const {
    programdetails,
    loading: programLoading,
    error,
    status,
    programMenteeList,
  } = useSelector((state) => state.userPrograms);

  console.log("programdetails", programdetails, programMenteeList);
  const {
    category,
    loading: apiLoading,
    programListByCategory,
  } = useSelector((state) => state.programInfo);
  const [menteeFields, setMenteeFields] = useState(
    AssignMenteesFields(type === "new" ? false : true, type, getValues)
  );
  const [dateFormat, setDateFormat] = useState({});
  const [menteeAllList, setAllMenteeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedMemberColumn, setUpdatedMemberColumn] =
    useState(MenteeAssignColumns);
  const allFields = watch();

  const onSubmit = (data) => {
    let apiData = {
      ...data,
      program_id:
        type === "new" ? allFields?.program_id : state?.data?.program_id,
      start_date: new Date(data.start_date).toISOString(),
      end_date: new Date(data.end_date).toISOString(),
      mentor: type === "new" ? allFields?.mentor_id : state?.data?.mentor_id,
      due_date: new Date(moment(data.due_date).format("YYYY-MM-DD")),
    };
    if (type === "edit" && from_type !== "program") {
      apiData = {
        ...apiData,
        task_id: state?.data?.task_id,
      };
    }

    if (type === "edit" && from_type !== "program") {
      dispatch(upateProgramTask(apiData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setTaskSuccess(true);
          setTimeout(() => {
            setTaskSuccess(false);
            navigate("/mentor-tasks?type=menteetask");
          }, 2000);
        }
      });
    } else {
      dispatch(assignProgramTask(apiData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setTaskSuccess(true);
          setTimeout(() => {
            setTaskSuccess(false);
            navigate("/mentor-tasks?type=menteetask");
          }, 2000);
        }
      });
    }
  };

  // useEffect(() => {
  //     if (status === programStatus.taskassigned) {
  //         if (programdetails.status === programActionStatus.yettostart) {
  //             dispatch(updateProgram({ id: programdetails.id, status: programActionStatus.assigned }))
  //         }
  //         setTaskSuccess(true)
  //         // setTimeout(() => {
  //         //     navigate(`${pipeUrls.startprogram}/${programdetails.id}`)
  //         // }, [3000])
  //     }
  // }, [status])

  const handleAddMentee = () => {
    setMentalModal(true);

    const updateMemberColumns = [...MenteeAssignColumns].map((mcol) => {
      if (mcol.field === "action") {
        return {
          ...mcol,
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
                onClick={() => {
                  navigate(`/mentee-details/${params.id}`);
                }}
              >
                View Details
              </button>
            );
          },
        };
      }
      return mcol;
    });

    setUpdatedMemberColumn(updateMemberColumns);
  };

  const footerAction = (key) => {
    setMentalModal(false);
  };

  // useEffect(() => {
  //     if (taskSuccess) {
  //         setTimeout(() => {
  //             setTaskSuccess(false)

  //             navigate(`${pipeUrls.startprogram}/${programdetails.id}`)
  //         }, [2000])
  //     }
  // }, [taskSuccess])

  useEffect(() => {
    const fields = [...menteeFields].map((field) => {
      if (field.name === "category_id") {
        return {
          ...field,
          options: category,
        };
      }
      return field;
    });

    setMenteeFields(fields);
  }, [category]);

  useEffect(() => {
    if (type === "new" && allFields?.category_id) {
      reset({
        ...getValues(),
        program_id: "",
        mentor: "",
        duration: "",
        start_date: "",
        end_date: "",
        mentees_list: [],
        due_date: "",
        task_name: "",
        task_details: "",
        reference_links: "",
      });
      setAllMenteeList([]);
      dispatch(getProgramListWithCategory(allFields?.category_id)).then(
        (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            const constructedData = res?.payload?.map((e) => {
              return {
                ...e,
                name: e?.program_name,
              };
            });
            const fields = [...menteeFields].map((field) => {
              if (field.name === "program_id") {
                return {
                  ...field,
                  options: constructedData ?? [],
                };
              }
              return field;
            });

            setMenteeFields(fields);
          }
        }
      );
    }
  }, [allFields?.category_id]);

  //   useEffect(() => {
  //     if (
  //       (allFields?.program_id || allFields?.program_id_val) &&
  //       currentProgramDetail
  //     ) {
  //       setMenteeFields((prevFields) => {
  //         const updatedFields = prevFields.map((field) => {
  //           if (field.name === "goal_id") {
  //             return {
  //               ...field,
  //               options: currentProgramDetail?.goals ?? [],
  //             };
  //           }
  //           return field;
  //         });

  //         return updatedFields;
  //       });
  //     }
  //   }, [allFields?.program_id, allFields?.program_id_val, currentProgramDetail]);

  useEffect(() => {
    if (type === "new" && allFields?.program_id) {
      const programOption = menteeFields?.filter(
        (e) => e?.name === "program_id"
      )?.[0]?.options;
      const filteredData = programOption?.filter(
        (e) => e?.id === Number(allFields?.program_id)
      )?.[0];
      reset({
        ...getValues(),
        mentor: filteredData?.mentor_name,
        duration: filteredData?.duration + " Days",
        start_date: new Date(filteredData?.start_date),
        end_date: new Date(filteredData?.end_date),
      });
      dispatch(getProgramTaskMentees(allFields?.program_id)).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          const constructedData = res?.payload?.map((e) => {
            return {
              ...e,
              name: `${e?.first_name} ${e?.last_name}`,
            };
          });
          const fields = [...menteeFields].map((field) => {
            if (field.name === "mentor") {
              return {
                ...field,
                options: constructedData ?? [],
              };
            }
            return field;
          });

          setMenteeFields(fields);
        }
      });
    }
  }, [allFields?.program_id]);

  // selectedProgram
  // getProgramMentees

  useEffect(() => {
    if (!Object.keys(programdetails).length) {
      const programId = params.id;
      if (programId && programId !== "") {
        dispatch(getProgramDetails(programId));
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (state?.data && Object.keys(state?.data).length) {
      let fieldValue = {
        category_id: state?.data?.category_id,
        program_id: state?.data?.program_name,
        mentor: state?.data?.mentor_name,
        start_date: new Date(state?.data?.program_startdate),
        end_date: new Date(state?.data?.program_enddate),
        duration: `${state?.data?.program_duration} days`,
        mentees_list: state?.data?.list_mentees ?? [],
        due_date: new Date(state?.data?.due_date),
        task_name: state?.data?.task_name,
        task_details: state?.data?.task_details,
        reference_links: state?.data?.reference_link,
        mentor_id: state?.data?.mentor_id,
      };
      setAllMenteeList(state?.data?.list_mentees ?? []);
      reset(fieldValue);
    }
  }, [programdetails]);

  useEffect(() => {
    if (!category.length) {
      dispatch(getAllCategories());
    }
    if (type !== "new") {
      dispatch(getProgramTaskMentees(state?.data?.program_id));
    }
  }, []);

  const handleAddPopupData = (value) => {
    if (value.length) {
      setValue("mentees_list", value);
      setMentalModal(false);
      setAllMenteeList(value);
    }
  };

  const CustomFooterStatusComponent = (props) => {
    return (
      <div className="flex gap-6 justify-center items-center py-4">
        <button
          onClick={() => setMentalModal(false)}
          className="py-3 px-6 w-[16%] rounded-[3px] text-font-secondary-black !border !border-font-secondary-black"
        >
          Cancel
        </button>
        <button
          onClick={() => handleAddPopupData(props.selectedRows)}
          className="text-white py-3 px-6 w-[16%] bg-background-primary-main rounded-[3px]"
        >
          Add Volunteer
        </button>
      </div>
    );
  };

  return (
    <div className="px-9 my-6 grid">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={programLoading || apiLoading || loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {type === "new" || type === "edit" ? (
        <div
          className="grid mb-10"
          style={{
            boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)",
            borderRadius: "5px",
          }}
        >
          {type === "new" || type === "edit" ? (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              className="border-b-2 pt-8 pr-6 pb-6 pl-6"
            >
              <Typography
                className="!text-[20px] !text-[#18283D]"
                sx={{ fontWeight: 600 }}
              >
                {type === "new"
                  ? "Create New Task"
                  : from_type === "program"
                  ? "Create New Task"
                  : "Edit Task"}
              </Typography>
              <div className="cursor-pointer" onClick={() => navigate(-1)}>
                <img src={CloseIcon} alt="CloseIcon" />
              </div>
            </Stack>
          ) : (
            <div className="breadcrum">
              <nav
                className="flex px-7 pt-6 pb-5 mx-2 border-b-2 justify-between"
                aria-label="Breadcrumb"
              >
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <span
                      className="inline-flex items-center text-sm font-medium cursor-pointer"
                      style={{ color: "rgba(89, 117, 162, 1)" }}
                    >
                      Program
                    </span>
                    <svg
                      class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
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
                      <span
                        className="ms-1 text-sm font-medium cursor-pointer"
                        style={{ color: "rgba(89, 117, 162, 1)" }}
                        onClick={() => navigate(-1)}
                      >
                        {programdetails?.program_name}{" "}
                      </span>
                      <svg
                        class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
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
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="ms-1 text-sm font-medium cursor-pointer text-gray-700">
                        Assign Task to Volunteers{" "}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          )}
          <div className="content px-8">
            <div className="py-9">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap gap-4">
                  {menteeFields.map((field, index) => {
                    const dateField =
                      field.type === "date"
                        ? register(field.name, field.inputRules)
                        : undefined;
                    return (
                      <div
                        className={`relative mb-6 ${field.width}`}
                        key={index}
                      >
                        <label
                          className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor={field.label}
                        >
                          {field.label}
                        </label>
                        {field.type === "input" ? (
                          <>
                            <input
                              {...register(field.name, field.inputRules)}
                              type={field.fieldtype}
                              className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none 
                                                                    focus-visible:outline-none text-[14px] h-[60px]"
                              placeholder={field.placeholder}
                              style={{
                                color: "#232323",
                                borderRadius: "3px",
                              }}
                              disabled={field.disabled}
                              aria-invalid={!!errors[field.name]}
                            />

                            {errors[field.name] && (
                              <p className="error" role="alert">
                                {errors[field.name].message}
                              </p>
                            )}
                          </>
                        ) : field.type === "dropdown" ? (
                          <>
                            <select
                              {...register(field.name, field.inputRules)}
                              className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg  
                                                                                focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                              placeholder={field.placeholder}
                              style={{
                                color: "#232323",
                                borderRadius: "3px",
                              }}
                              disabled={field.disabled}
                            >
                              <option value="">Select</option>
                              {field?.options.map((option, index) => (
                                <option
                                  value={option.id}
                                  key={index}
                                  selected={getValues(field.name) === option.id}
                                >
                                  {option.name}
                                </option>
                              ))}
                            </select>
                            {errors[field.name] && (
                              <p className="error" role="alert">
                                {errors[field.name].message}
                              </p>
                            )}
                          </>
                        ) : field.type === "textbox" ? (
                          <>
                            <textarea
                              id="message"
                              rows="4"
                              className={`block p-2.5 input-bg w-full text-sm text-gray-900  rounded-lg border
                                                                                focus:visible:outline-none focus:visible:border-none ${
                                                                                  field.width ===
                                                                                  "width-82"
                                                                                    ? "h-[282px]"
                                                                                    : ""
                                                                                }`}
                              placeholder={field.placeholder}
                              {...register(field.name, field.inputRules)}
                            ></textarea>
                            {errors[field.name] && (
                              <p className="error" role="alert">
                                {errors[field.name].message}
                              </p>
                            )}
                          </>
                        ) : field.type === "checkbox" ? (
                          <div className="flex items-center me-4">
                            {field.options.map((option, index) => (
                              <div
                                className="flex items-center me-4"
                                key={index}
                              >
                                <input
                                  type="radio"
                                  className="w-4 h-4 text-blue-600 bg-gray-100
                                                                                            border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                                                            dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                                                                            dark:border-gray-600"
                                  {...register(field.name, field.inputRules)}
                                />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  {option.value}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : field.type === "date" ? (
                          <>
                            <div
                              className="relative input-bg"
                              onClick={(e) => {
                                !field.disabled &&
                                  calendarRef?.current[index]?.show();
                              }}
                            >
                              <Calendar
                                className="calendar-control w-full"
                                {...dateField}
                                {...register(field.name, field.inputRules)}
                                value={getValues(field.name)}
                                // value={field.disabled ? new Date(state?.data[field.name]) : dateFormat[field.name]}
                                onChange={(e) => {
                                  dateField.onChange(e);
                                  setDateFormat({
                                    ...dateFormat,
                                    [field.name]: e.value,
                                  });
                                  calendarRef?.current[index]?.hide();
                                }}
                                disabled={field.disabled}
                                // {...field.name === 'due_date' ?
                                //     {
                                //         minDate: getValues('start_date'),
                                //         maxDate: getValues('end_date')
                                //     }
                                //     : {}
                                // }

                                minDate={new Date()}
                                maxDate={
                                  field.name === "due_date"
                                    ? new Date(getValues("end_date"))
                                    : ""
                                }
                                showTime={field.name !== "due_date"}
                                hourFormat="12"
                                dateFormat="dd/mm/yy"
                                style={{ width: "42%" }}
                                ref={(el) => (calendarRef.current[index] = el)}
                              />
                              <img
                                className="absolute top-5 right-2 cursor-pointer"
                                src={CalendarIcon}
                                alt="CalendarIcon"
                              />
                            </div>
                            {errors[field.name] && (
                              <p className="error" role="alert">
                                {errors[field.name].message}
                              </p>
                            )}
                          </>
                        ) : field.type === "text" ? (
                          <>
                            <div className="flex justify-between">
                              <div
                                className="input-bg h-[60px] w-[86%] mt-2 flex items-center 
                                                                                                text-[12px] gap-2 px-6"
                                style={{ borderRadius: "3px" }}
                              >
                                {menteeAllList &&
                                  menteeAllList
                                    .slice(0, 6)
                                    .map((popupfield, index) => {
                                      return (
                                        <>
                                          <p className="flex items-center gap-1">
                                            {
                                              // popupfield?.profile_image?.length === 0 ?
                                              //     <p className='flex items-center px-3 py-3' style={{
                                              //         background: 'rgba(223, 237, 255, 1)', borderRadius: '50%',

                                              //     }}></p> :
                                              <img
                                                src={
                                                  popupfield?.profile_image
                                                    ? popupfield?.profile_image
                                                    : UserImage
                                                }
                                                alt=""
                                                className="h-[25px] w-[25px] rounded-[50%]"
                                              />
                                            }
                                            {`${
                                              popupfield?.full_name ||
                                              popupfield?.first_name
                                            }`}
                                          </p>
                                        </>
                                      );
                                    })}

                                {menteeAllList && menteeAllList?.length > 6 && (
                                  <p className="flex items-center gap-1">
                                    <p
                                      className="text-white flex items-center px-2 py-1"
                                      style={{
                                        background: "rgb(29, 91, 191)",
                                        borderRadius: "50%",
                                      }}
                                    >
                                      {menteeAllList?.length - 6}
                                    </p>
                                    Others
                                  </p>
                                )}
                              </div>
                              <input
                                {...register(field.name, field.inputRules)}
                                type={field.fieldtype}
                                className="w-full hidden border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none 
                                                                                                focus-visible:outline-none text-[14px] h-[60px]"
                                placeholder={field.placeholder}
                                style={{
                                  color: "#232323",
                                  borderRadius: "3px",
                                }}
                                aria-invalid={!!errors[field.name]}
                              />
                              <button
                                type="button"
                                className="h-[60px] mt-2 w-[13%] text-[14px] border border-dashed border-background-primary-main text-font-primary-main"
                                onClick={handleAddMentee}
                              >
                                + Add Volunteer
                              </button>
                            </div>
                            {errors[field.name] && (
                              <p className="error" role="alert">
                                {errors[field.name].message}
                              </p>
                            )}
                          </>
                        ) : field.type === "link" ? (
                          <div className="flex justify-between">
                            <div
                              className="input-bg h-[60px] w-full mt-2 flex items-center 
                                                                                                             text-[12px] gap-2 cursor-pointer px-6"
                              style={{ borderRadius: "3px" }}
                            >
                              {programdetails.certifications &&
                                programdetails.certifications.map(
                                  (certification, index) => {
                                    return (
                                      <p className="underline">
                                        {certification.name}
                                      </p>
                                    );
                                  }
                                )}

                              {programdetails.learning_materials &&
                                programdetails.learning_materials.map(
                                  (certification, index) => {
                                    return (
                                      <p className="underline">
                                        {certification.name}
                                      </p>
                                    );
                                  }
                                )}

                              {/* {
                                                                                                    menteeAllList && menteeAllList?.length > 6 &&

                                                                                                    <p className='flex items-center gap-1'>
                                                                                                        <p className='text-white flex items-center px-2 py-1' style={{
                                                                                                            background: 'rgb(29, 91, 191)', borderRadius: '50%',

                                                                                                        }}>{menteeAllList.length - 6}</p>
                                                                                                        Others</p>

                                                                                                } */}
                            </div>
                          </div>
                        ) : field.type === "editor" ? (
                          <>
                            <div className="flex gap-3">
                              <textarea
                                id="message"
                                rows="4"
                                className={`block p-2.5 input-bg w-[100%] h-[200px] text-sm text-gray-900  rounded-lg border
                                                                                            focus:visible:outline-none focus:visible:border-none ${
                                                                                              field.width ===
                                                                                              "width-82"
                                                                                                ? "h-[282px]"
                                                                                                : ""
                                                                                            }`}
                                placeholder={field.placeholder}
                                {...register(field.name, field.inputRules)}
                              ></textarea>
                              {/* <div className='flex flex-col gap-6 items-center justify-center input-bg w-[4%]' style={{ borderRadius: '3px' }}>
                                                                                                        <img src={TextIcon} alt="TextIcon" />
                                                                                                        <img src={HTMLIcon} alt="HTMLIcon" />
                                                                                                    </div> */}
                            </div>
                            {errors[field.name] && (
                              <p className="error" role="alert">
                                {errors[field.name].message}
                              </p>
                            )}
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-6 justify-center align-middle py-16">
                  <Button
                    btnName="Cancel"
                    btnCls="w-[15%]"
                    btnCategory="secondary"
                    onClick={() => navigate(-1)}
                  />
                  <Button
                    btnType="submit"
                    btnCls="w-[15%]"
                    btnName={"Submit"}
                    btnCategory="primary"
                  />
                </div>
              </form>
              <MuiModal
                modalSize="lg"
                modalOpen={addMenteeModal}
                title="Select Volunteer"
                modalClose={() => setMentalModal(false)}
              >
                <DataTable
                  rows={programMenteeList}
                  columns={updatedMemberColumn}
                  footerAction={footerAction}
                  footerComponent={CustomFooterStatusComponent}
                  selectedAllRows={menteeAllList}
                />
              </MuiModal>

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={taskSuccess}
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
                      {type === "new"
                        ? "New task for Volunteer has been successfully created"
                        : from_type === "program"
                        ? "New task for Volunteer has been successfully created"
                        : "Volunteer’s task has been Successfully re-edited"}
                    </p>
                  </div>
                </div>
              </Backdrop>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
