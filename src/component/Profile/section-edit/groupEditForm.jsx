import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateProfileImage } from "../../../services/profile";
import ProfileImageIcon from "../../../assets/icons/profile-image-icon.svg";
import ProfileImagePencilIcon from "../../../assets/icons/profile-image-pencil-icon.svg";
import { Backdrop, Box, Grid, Stack } from "@mui/material";
import { EquipmentFormFields } from "../../equipmentManagement/formFields";
import CustomAccordian from "../../../shared/Accordian/accordian";
import { editMenteeQuestions } from "../../../services/loginInfo";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared";
import SuccessTik from "../../../assets/images/blue_tik1x.png";
import api from "../../../services/api";

export const GroupEditForm = ({ setEditMode = () => false }) => {
  const initialField = [
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
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading, status } = useSelector(
    (state) => state.profileInfo
  );
  const uploadUserImage = (e) => {
    // debugger
    if (e.target.files && e.target.files[0]) {
      let bodyFormData = new FormData();
      bodyFormData.append("profile_image", e.target.files[0]);
      dispatch(updateProfileImage(bodyFormData)).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          refetchProfileData();
        }
      });
    }
  };

  const [fields, setFields] = React.useState(initialField);
  const [activity, setActivity] = React.useState(false);
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

  const getVolunteerFields = (index, data) => {
    const volunteerFormData = profile?.volunteer_group?.map((e) => {
      return {
        id: e?.id,
        first_name: e?.first_name,
        last_name: e?.last_name,
        related_as: e?.related_as ?? "",
        gender: e?.gender,
        email: e?.email,
        phone_number: e?.phone_number,
        secondary_phone_number: e?.secondary_phone_number,
        relationship: e?.relationship,
        documents: e?.documents?.map((e) => {
          return {
            ...e,
            name: e?.file_display_name,
            url: e?.file,
          };
        }),
      };
    });
    if (index === 1) {
      const mainFormData = {
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        email: profile?.email,
        phone_number: profile?.phone_number,
        secondary_phone_number: profile?.secondary_phone_number ?? "",
        linkedInProfileLink: profile?.linked_in ?? "",
        gender: profile?.gender,
        location: profile?.location,
        documents: profile?.documents?.map((e) => {
          return {
            ...e,
            name: e?.file_display_name,
            url: e?.file,
          };
        }),
        error: {
          phone_number: "",
          gender: "",
          documents: "",
        },
      };
      setFormData([mainFormData, ...volunteerFormData]);
    } else {
      setFormData([...formData, ...volunteerFormData]);
    }

    return {
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
          col: data?.related_as === "family" ? 3 : 6,
          key: "related_as",
        },
        {
          type: "textbox",
          label: "Specify",
          placeholder: "Enter Specify Name",
          isRequired: formData[index]?.related_as === "family",
          col: 3,
          key: "relationship",
          isHide: data?.related_as !== "family",
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
          isDisable: true,
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
    };
  };

  const refetchProfileData = () => {
    dispatch(getUserProfile());
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const volunteerFormField = await Promise.resolve(
        profile?.volunteer_group?.map((vg, ind) => {
          return getVolunteerFields(ind + 1, vg);
        })
      );

      await Promise.resolve(
        setFields([...initialField, ...volunteerFormField])
      );
    };

    fetchData();
  }, []);

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

    groupFormData?.append("user_id", profile?.id);
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
          id: val?.id,
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
          related_as: val?.related_as,
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

  const handleSave = async () => {
    if (handleValidate()) {
      const payload = handleConstructPayload();

      // dispatch(editMenteeQuestions(payload)).then((res) => {
      //     if (res?.meta?.requestStatus === "fulfilled") {
      //         setActivity(true)
      //         setTimeout(() => {
      //             setActivity(false)
      //             refetchProfileData()
      //             setEditMode(false)
      //         }, 2000);

      //     }
      // });

      const res = await api.put("profile/edit_profile", payload);
      if (res?.status === 200) {
        setActivity(true);
        refetchProfileData();
        setTimeout(() => {
          setActivity(false);
          setEditMode(false);
        }, 2000);
      }
    }
  };

  function handleAddVolDisable() {
    return fields.length > 10;
  }

  // function handleValidate() {
  //   let isValid = true;
  //   const updatedFormData = formData.map((form, index) => {
  //     let newErrors = {
  //       // related_as:"",
  //       phone_number: "",
  //       gender: "",
  //       documents: [],
  //     };
  //     if (form.related_as != undefined || form.related_as != null) {
  //       newErrors = {
  //         related_as: "",
  //         phone_number: "",
  //         gender: "",
  //         documents: [],
  //       };
  //     }

  //     if (form?.related_as !== undefined && !form?.related_as) {
  //       newErrors.related_as = "Relation is required";
  //       isValid = false;
  //     }
  //     if (!form?.first_name) {
  //       newErrors.first_name = "First Name is required";
  //       isValid = false;
  //     }
  //     if (!form?.last_name) {
  //       newErrors.last_name = "Last Name is required";
  //       isValid = false;
  //     }
  //     if (!form?.email) {
  //       newErrors.email = "Email is required";
  //       isValid = false;
  //     }
  //     // if (!form?.phone_number) {
  //     //     newErrors.phone_number = "Primary Phone Number is required";
  //     //     isValid = false;
  //     // }
      
  //     if (!form?.phone_number) {
  //       newErrors.phone_number = "Primary Phone Number is required";
  //       isValid = false;
  //     }else if (
  //       !/^(?:\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})$/.test(
  //         form?.phone_number
  //       )
  //     ) {
  //       newErrors.phone_number = "Phone number format is invalid";
  //       isValid = false;
  //     }

  //     // if (!form?.gender) {
  //     //   newErrors.gender = "Gender is required";
  //     //   isValid = false;
  //     // }
  //     if (form?.documents?.length === 0) {
  //       newErrors.documents = "Government ID is required";
  //       isValid = false;
  //     }

  //     if (form?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
  //       newErrors.email = "Invalid email format";
  //       isValid = false;
  //     }

  //     // if (form?.phone_number && !/^\d{10}$/.test(form.phone_number)) {
  //     //     newErrors.phone_number = "Phone number must be 10 digits";
  //     //     isValid = false;
  //     // }

  //     // if (
  //     //     !/^(?:\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})$/.test(
  //     //         form?.phone_number
  //     //     )
  //     //   ) {
  //     //     newErrors.phone_number = "Phone number format is invalid";
  //     //     isValid = false;
  //     //   }

  //     return {
  //       ...form,
  //       error: newErrors,
  //     };
  //   });

  //   setFormData(updatedFormData);
  //   return isValid;
  // }

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
      }else if (
        /^\(\d{3}\) \d{3}-\d{4}$/.test(
          form?.phone_number
        ) === false
      ) {
        newErrors.phone_number = "Phone number format is invalid";
        isValid = false;
      }

      if (
        formData.secondary_phone_number &&
        /^\(\d{3}\) \d{3}-\d{4}$/.test(
          form?.secondary_phone_number
        ) === false
      ) {
        newErrors.secondary_phone_number = "Secondary Phone number format is invalid";
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
        }
      });
      return newFields;
    });
  }

  const handleFileDelete = (key, value, index) => {
    const duplicateFormData = [...formData];
    const selectedData = formData[index];
    // const updatedData = {
    //     ...selectedData,
    //     documents: selectedData?.documents?.filter((e, i) => i !== value),

    // };

    const deletedFileId = selectedData?.documents?.[value]?.id;

    const updatedData = {
      ...selectedData,
      documents: selectedData?.documents?.filter((e, i) => i !== value),
      deleted_document: [
        ...(selectedData.deleted_document || []),
        deletedFileId,
      ],
    };

    duplicateFormData[index] = updatedData;
    setFormData(duplicateFormData);
  };

  return (
    <Box className="p-4 rounded-[10px] border-border-main bg-background-secondary-white">
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <div className="py-4 relative w-[12%]">
          <div className="upload-profile">
            <label
              className="w-[40%] pb-3 rounded-lg text-white text-[14px] cursor-pointer"
              style={{
                border: "none",
              }}
            >
              <img
                src={profile?.image || ProfileImageIcon}
                style={{ borderRadius: "50%", height: "143px" }}
                alt="ProfileImageIcon"
              />
              <img
                src={ProfileImagePencilIcon}
                className="absolute top-[50%] left-2 cursor-pointer"
                alt="ProfileImagePencilIcon"
              />

              <input type="file" class="hidden" onChange={uploadUserImage} />
            </label>
          </div>
        </div>

        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Button
            btnName="Cancel"
            btnCls="w-[140px]"
            btnCategory="secondary"
            onClick={() => setEditMode(false)}
          />
          <Button
            btnName={`${loading ? "Saving..." : "Save Changes"}`}
            btnCls={"w-[160px]"}
            onClick={handleSave}
          />
        </Stack>
      </Stack>

      <Box>
        <Grid container>
          {fields?.map((data, index) => {
            return (
              <Grid item size={12}>
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
                  // isCloseBtn={index > 0}
                  // handleCloseBtn={(e) => handleDeleteVolunteer(e, index)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={activity}
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
              Profile Updated Successfully
            </p>
          </div>
        </div>
      </Backdrop>
    </Box>
  );
};
