import { EquipmentFormFields } from "../equipmentManagement/formFields";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";
import { Button, Stack, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Grid2 from "@mui/material/Unstable_Grid2";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../services/profile";
import CustomAccordian from "../../shared/Accordian/accordian";
import { updateMenteeQuestions } from "../../services/loginInfo";

export function GroupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userInfo);

  const [formData, setFormData] = React.useState([
    {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      secondary_phone_number: "",
      linkedInProfileLink: "",
      gender: "",
      location: "",
      documents: [],
      error: {
        phone_number: "",
        gender: "",
        documents: "",
      },
    },
  ]);

  React.useEffect(() => {
    dispatch(getUserProfile()).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const loadFormData = [...formData];
        const constructedData = {
          ...formData[0],
          first_name: res?.payload?.first_name,
          last_name: res?.payload?.last_name,
          email: res?.payload?.email,
        };
        loadFormData[0] = constructedData;
        setFormData(loadFormData);
      }
    });
  }, []);

  const [fields, setFields] = React.useState([
    {
      title: "Main User",
      index: 0,
      field: [
        {
          type: "textbox",
          label: "First Name",
          placeholder: "Enter First Name",
          isRequired: true,
          col: 6,
          key: "first_name",
          isDisable: true,
        },
        {
          type: "textbox",
          label: "Last Name",
          placeholder: "Enter Last Name",
          isRequired: true,
          col: 6,
          key: "last_name",
          isDisable: true,
        },
        {
          type: "textbox",
          label: "E-mail",
          placeholder: "Enter E-mail",
          isRequired: true,
          col: 6,
          key: "email",
          isDisable: true,
        },
        {
          type: "textbox",
          fieldType: "text",
          label: "Primary Phone Number",
          placeholder: "Enter Primary Phone Number",
          isRequired: true,
          col: 6,
          key: "phone_number",
          is_pattern: true,
          pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}",
        },
        {
          type: "textbox",
          fieldType: "text",
          label: "Secondary Phone Number",
          placeholder: "Enter Secondary Phone Number",
          isRequired: false,
          col: 6,
          key: "secondary_phone_number",
          is_pattern: true,
          pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}",
        },
        {
          type: "textbox",
          label: "Linked In Profile Link",
          placeholder: "Enter Profile Link",
          isRequired: false,
          col: 6,
          key: "linkedInProfileLink",
        },
        {
          type: "checkbox",
          label: "Gender",
          isRequired: false,
          options: [
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
            {
              label: "Others",
              value: "others",
            },
          ],
          col: 6,
          key: "gender",
        },
        {
          type: "textbox",
          label: "Location",
          placeholder: "Enter Location",
          isRequired: false,
          col: 6,
          key: "location",
        },
        {
          type: "upload",
          label: "Upload Government ID Proof",
          isRequired: true,
          col: 12,
          key: "documents",
          isMultiFile: true,
        },
      ],
    },
  ]);

  const updateState = (key, value, index) => {
    if (key === "documents") {
      const duplicateFormData = [...formData];
      const selectedData = formData[index];
      const updatedData = {
        ...selectedData,
        documents: [...selectedData?.documents, ...Array.from(value)],
        error: {
          ...selectedData?.error,
          documents: "",
        },
      };

      duplicateFormData[index] = updatedData;
      setFormData(duplicateFormData);
    } else if (key === "related_as") {
      setFormData((prevFormData) => {
        const newFormData = [...prevFormData];
        newFormData[index] = {
          ...newFormData[index],
          related_as: value,
          relationship:
            value !== "family" ? "" : newFormData[index].relationship,
          error: {
            ...newFormData[index].error,
            related_as: "",
          },
        };
        return newFormData;
      });

      // Update the fields to show/hide Specify field
      setFields((prevFields) => {
        const newFields = [...prevFields];
        const updatedFields = newFields[index].field.map((field) => {
          if (field.key === "related_as") {
            return {
              ...field,
              col: value === "family" ? 3 : 6,
            };
          }
          if (field.key === "relationship") {
            return {
              ...field,
              isHide: value !== "family",
            };
          }
          return field;
        });
        newFields[index] = {
          ...newFields[index],
          field: updatedFields,
        };
        return newFields;
      });
    } else {
      setFormData((prevFormData) => {
        const newFormData = [...prevFormData];
        newFormData[index] = {
          ...newFormData[index],
          [key]: value,
          error: {
            ...newFormData[index].error,
            [key]: "",
          },
        };
        return newFormData;
      });
    }
  };

  const handleConstructPayload = () => {
    let groupFormData = new FormData();
    const mainData = formData[0];
    const volunteerData = formData?.filter((e, i) => i !== 0);

    groupFormData?.append("mentee_type", "group");
    groupFormData.append(
      "full_name",
      `${mainData?.first_name} ${mainData?.last_name}`
    );
    groupFormData.append("first_name", mainData?.first_name);
    groupFormData.append("last_name", mainData?.last_name);
    groupFormData.append("email", mainData?.email);
    groupFormData.append("phone_number", mainData?.phone_number);
    groupFormData.append(
      "secondary_phone_number",
      mainData?.secondary_phone_number
    );
    groupFormData.append("gender", mainData?.gender);
    groupFormData.append("location", mainData?.location);
    groupFormData.append("linked_in", mainData?.linkedInProfileLink);

    volunteerData?.map((val, i) => {
      groupFormData.append(
        `volunteers[${i}]`,
        JSON.stringify({
          full_name: `${val?.first_name} ${val?.last_name}`,
          first_name: val?.first_name,
          last_name: val?.last_name,
          email: val?.email,
          phone_number: val?.phone_number,
          secondary_phone_number: val?.secondary_phone_number,
          gender: val?.gender,
          location: val?.location,
          linked_in: val?.linkedInProfileLink,
          relationship: val?.relationship,
          related_as: val?.related_as
        })
      );
      if (val?.documents?.length > 0) {
        val?.documents?.forEach((file, index) => {
          groupFormData.append(`volunteers[${i}][documents][${index}]`, file);
        });
      }
    });
    mainData?.documents?.forEach((file) => {
      groupFormData.append("documents", file);
    });

    return groupFormData;
  };

  function handleSave() {
    if (handleValidate()) {
      const payload = handleConstructPayload();

      dispatch(updateMenteeQuestions(payload)).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          dispatch({ type: "logout" });
          navigate("/login");
        }
      });
    }
  }

  const getVolunteerFields = (index) => ({
    title: `Volunteer ${index}`,
    index: index,
    field: [
      {
        type: "textbox",
        label: "First Name",
        placeholder: "Enter First Name",
        isRequired: true,
        col: 6,
        key: "first_name",
      },
      {
        type: "textbox",
        label: "Last Name",
        placeholder: "Enter Last Name",
        isRequired: true,
        col: 6,
        key: "last_name",
      },
      {
        type: "checkbox",
        label: "Related as",
        isRequired: true,
        options: [
          {
            label: "Family",
            value: "family",
          },
          {
            label: "Friend",
            value: "friend",
          },
        ],
        col: 6,
        key: "related_as",
      },
      {
        type: "textbox",
        label: "Specify",
        placeholder: "Enter Specify Name",
        isRequired: formData[index]?.related_as === "family",
        col: 3,
        key: "relationship",
        isHide: formData[index]?.related_as !== "family",
      },
      {
        type: "checkbox",
        label: "Gender",
        isRequired: false,
        options: [
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
          {
            label: "Others",
            value: "others",
          },
        ],
        col: 6,
        key: "gender",
      },
      {
        type: "textbox",
        label: "E-mail",
        placeholder: "Enter E-mail",
        isRequired: true,
        col: 6,
        key: "email",
      },
      {
        type: "textbox",
        label: "Primary Phone Number",
        placeholder: "Enter Primary Phone Number",
        isRequired: true,
        col: 6,
        key: "phone_number",
        is_pattern: true,
        pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}",
      },
      {
        type: "textbox",
        label: "Secondary Phone Number",
        placeholder: "Enter Secondary Phone Number",
        isRequired: false,
        col: 6,
        key: "secondary_phone_number",
        is_pattern: true,
        pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}",
      },
      {
        type: "upload",
        label: "Upload Government ID Proof",
        isRequired: true,
        col: 12,
        key: "documents",
        isMultiFile: true,
      },
    ],
  });

  function handleAddVolDisable() {
    return fields.length > 10;
  }

  function handleValidate() {
    let isValid = true;
    const updatedFormData = formData.map((form, index) => {
      let newErrors = {
        // related_as:"",
        phone_number: "",
        gender: "",
        documents: [],
      };
      if (form.related_as != undefined || form.related_as != null) {
        newErrors = {
          related_as: "",
          phone_number: "",
          gender: "",
          documents: [],
        };
      }

      if (form?.related_as !== undefined && !form?.related_as) {
        newErrors.related_as = "Relation is required";
        isValid = false;
      }
      if (!form?.first_name) {
        newErrors.first_name = "First Name is required";
        isValid = false;
      }
      if (!form?.last_name) {
        newErrors.last_name = "Last Name is required";
        isValid = false;
      }
      if (!form?.email) {
        newErrors.email = "Email is required";
        isValid = false;
      }
      if (!form?.phone_number) {
        newErrors.phone_number = "Primary Phone Number is required";
        isValid = false;
      } else if (
        !/^(?:\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})$/.test(
          form?.phone_number
        )
      ) {
        newErrors.phone_number = "Phone number format is invalid";
        isValid = false;
      }
      // if (!form?.gender) {
      //   newErrors.gender = "Gender is required";
      //   isValid = false;
      // }
      if (form?.documents?.length === 0) {
        newErrors.documents = "Government ID is required";
        isValid = false;
      }

      if (form?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "Invalid email format";
        isValid = false;
      }

      // if (form?.phone_number && !/^\d{10}$/.test(form.phone_number)) {
      //   newErrors.phone_number = "Phone number must be 10 digits";
      //   isValid = false;
      // }

      return {
        ...form,
        error: newErrors,
      };
    });

    setFormData(updatedFormData);
    return isValid;
  }

  function handleAddNewVolunteer() {
    setFields((prevFields) => {
      return [...prevFields, getVolunteerFields(prevFields.length)];
    });
    setFormData((prev) => [
      ...prev,
      {
        first_name: "",
        last_name: "",
        related_as: "",
        gender: "",
        email: "",
        phone_number: "",
        secondary_phone_number: "",
        documents: [],
      },
    ]);

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1);
  }

  function handleDeleteVolunteer(e, index) {
    e.stopPropagation();
    setFormData((prevFormData) => {
      const newFormData = [...prevFormData];
      newFormData.splice(index, 1);
      return newFormData;
    });

    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields.splice(index, 1);

      // reset the title indexes after deletion
      let i = 1;

      newFields.map((val, index) => {
        if (index > 0) {
          val.title = val.title.slice(0, 10) + i;
          i++;
          // console.log(val)
        }
      });
      return newFields;
    });
  }

  const handleFileDelete = (key, value, index) => {
    const duplicateFormData = [...formData];
    const selectedData = formData[index];
    const updatedData = {
      ...selectedData,
      documents: selectedData?.documents?.filter((e, i) => i !== value),
    };

    duplicateFormData[index] = updatedData;
    setFormData(duplicateFormData);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 5 }}>
        <Grid2 container spacing={3}>
          {/* <Grid2 item size={12}>
            <h2
              className="text-xl text-left"
              style={{ color: "rgba(24, 40, 61, 1)", fontWeight: 600 }}
            >
              Fill the Question and Answer
            </h2>
          </Grid2> */}
          {fields?.map((data, index) => {
            return (
              <Grid2 item size={12}>
                <CustomAccordian
                  title={data?.title}
                  children={
                    <EquipmentFormFields
                      fields={data?.field}
                      formData={formData[index]}
                      handleChange={(key, value) =>
                        updateState(key, value, index)
                      }
                      handleDeleteFile={(key, value) =>
                        handleFileDelete(key, value, data?.index)
                      }
                    />
                  }
                  defaultValue={true}
                  isCloseBtn={index > 0}
                  handleCloseBtn={(e) => handleDeleteVolunteer(e, index)}
                />
                {/* <Accordion defaultExpanded={true}>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      },
                      "& .MuiAccordionSummary-expandIconWrapper": {
                        marginRight: "40px",
                      },
                      position: "relative",
                    }}
                  >
                    <div>{data?.title}</div>
                    {data?.title[0] === "V" && (
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={(e) => handleDeleteVolunteer(e, index)}
                          sx={{
                            position: "absolute",
                            right: "8px",
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </AccordionSummary>
                  <Divider
                    sx={{
                      height: "1px",
                      backgroundColor: "#353F4F",
                      // margin: '0px 8px',
                      width: "98%",
                      mx: "auto",
                    }}
                  />
                  <br></br>
                  <AccordionDetails sx={{ pb: "40px" }}>
                    <EquipmentFormFields
                      fields={data?.field}
                      formData={formData[index]}
                      handleChange={(key, value) =>
                        updateState(key, value, index)
                      }
                      handleDeleteFile={(key, value) =>
                        handleFileDelete(key, value, data?.index)
                      }
                    />
                  </AccordionDetails>
                </Accordion> */}
              </Grid2>
            );
          })}
        </Grid2>
        <br></br>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box>
            <Button
              variant="outlined"
              sx={{
                color: "grey.700",
                borderColor: "grey.300",
                marginRight: 2,
                "&:hover": {
                  borderColor: "grey.400",
                  backgroundColor: "grey.50",
                },
              }}
              onClick={() => {
                navigate("/login-type");
              }}
            >
              Cancel
            </Button>

            {/* <span onMouseOver={handleValidate}> */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FE634E",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#FE634E",
                },
              }}
              onClick={handleSave}
            // disabled={handleSaveDisable()}
            >
              Save
            </Button>
            {/* </span> */}
          </Box>

          <Button
            className="!absolute !right-0"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddNewVolunteer}
            disabled={handleAddVolDisable()}
          >
            Add New Volunteer
          </Button>
        </Box>
      </Box>
    </>
  );
}
