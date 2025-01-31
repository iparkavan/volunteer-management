import { EquipmentFormFields } from "../equipmentManagement/formFields";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { useSubmitQAsMutation } from "../../features/vm-questions/vmQuestion.service";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../services/profile";
import {
  updateMenteeDocument,
  updateMenteeQuestions,
} from "../../services/loginInfo";

export function IndividualPage() {
  const navigate = useNavigate();
  const [submitQAs, { isSuccess, isLoading, data }] = useSubmitQAsMutation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  console.log("userInfo ===>", userInfo);
  // Form data state with object structure
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    secondary_phone_number: "",
    linked_in: "",
    gender: "",
    location: "",
    documents: [],
    error: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      gender: "",
    },
  });

  const fields = [
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
      label: "LinkedIn Profile Link",
      placeholder: "Enter Profile Link",
      isRequired: false,
      col: 6,
      key: "linked_in",
    },
    {
      type: "checkbox",
      label: "Gender",
      isRequired: true,
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
      isMultiFile: true,
      key: "documents",
    },
  ];

  React.useEffect(() => {
    dispatch(getUserProfile()).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setFormData({
          ...formData,
          first_name: res?.payload?.first_name,
          last_name: res?.payload?.last_name,
          email: res?.payload?.email,
        });
      }
    });
  }, []);

  // Updated state handler for object structure
  const updateState = (key, value) => {
    if (key === "documents") {
      const constructedDocument = Array.from(value);
      setFormData({
        ...formData,
        documents: [...formData?.documents, ...constructedDocument],
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
        error: {
          ...prevData.error,
          [key]: "", // Clear error when field is updated
        },
      }));
    }
  };
  console.log("formData ===>", formData);
  // Updated validation handler for object structure
  const handleValidate = () => {
    let isValid = true;
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      gender: "",
    };

    // Required field validations
    if (!formData.first_name) {
      newErrors.first_name = "First Name is required";
      isValid = false;
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last Name is required";
      isValid = false;
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Primary Phone Number is required";
      isValid = false;
    } else if (
      !/^(?:\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})$/.test(
        formData.phone_number
      )
    ) {
      newErrors.phone_number = "Phone number format is invalid";
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    // Email format validation (if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Update form data with new errors
    setFormData((prevData) => ({
      ...prevData,
      error: newErrors,
    }));

    return isValid;
  };

  // Updated save handler with payload transformation
  const handleSave = async () => {
    if (handleValidate()) {
      const questionPaylod = {
        full_name: `${formData?.first_name} ${formData?.last_name}`.trim(),
        email: formData?.email,
        phone_number: formData?.phone_number,
        secondary_phone_number: formData?.secondary_phone_number,
        linked_in: formData?.linked_in,
        gender: formData?.gender,
        location: formData?.location,
        mentee_type: "individual",
      };
      const uploadedFile = new FormData();

      formData?.documents?.forEach((file, index) => {
        uploadedFile.append("documents", file);
      });

      dispatch(updateMenteeQuestions(questionPaylod)).then((res) => {
        dispatch(updateMenteeDocument(uploadedFile)).then((res) => {
          if (res?.meta?.requestStatus === "fulfilled") {
            // navigate("/dashboard");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            dispatch({ type: "logout" });
            navigate("/login");
          }
        });
      });
    }
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     //set to local storage
  //     console.log(data?.refresh);
  //     console.log(data?.access);
  //     // localStorage.setItem('access_token', data?.access);
  //     // localStorage.setItem('refresh_token', data?.refresh);
  //     //naviaget to dashboard
  //     navigate("/programs");
  //   }
  // }, [isSuccess]);

  const handleDeleteFile = (key, value) => {
    setFormData({
      ...formData,
      documents: formData?.documents?.filter((d, i) => i !== value),
    });
  };

  return (
    <Box sx={{ padding: 5 }}>
      {/* <h2 className="text-[20px] text-font-secondary-black mb-5 font-bold">
        Fill the Question and Answer
      </h2> */}

      <Box className="!border !border-border-secondary p-4 rounded-[4px]">
        <Typography className="!text-[16px] !text-font-secondary-black px-2 py-4 !border-b !border-border-main">
          User Information
        </Typography>

        <Box mt={2} height={"100%"}>
          <EquipmentFormFields
            fields={fields}
            formData={formData}
            handleChange={updateState}
            handleDeleteFile={handleDeleteFile}
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            mt={6}
          >
            <Stack direction="row" alignItems={"center"} spacing={2}>
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
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* <Box
                sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <Box>
                    <Button
                        variant="outlined"
                        sx={{
                            color: 'grey.700',
                            borderColor: 'grey.300',
                            marginRight: 2,
                            '&:hover': {
                                borderColor: 'grey.400',
                                backgroundColor: 'grey.50'
                            }
                        }}
                        onClick={() => {
                            navigate("/login-type")
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#FE634E',
                            '&:hover': {
                                backgroundColor: '#FE634E'
                            }
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </Box> */}
    </Box>
  );
}
