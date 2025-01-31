import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateProfileImage } from '../../../services/profile';
import ProfileImageIcon from '../../../assets/icons/profile-image-icon.svg';
import ProfileImagePencilIcon from '../../../assets/icons/profile-image-pencil-icon.svg';
import { Button } from '../../../shared';
import { Backdrop, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EquipmentFormFields } from '../../equipmentManagement/formFields';
import { editMenteeQuestions, updateMenteeDocument } from '../../../services/loginInfo';
import SuccessTik from '../../../assets/images/blue_tik1x.png';
import api from '../../../services/api';

export const IndivitualEditForm = ({
    setEditMode = () => false
}) => {
    const dispatch = useDispatch()
    const { profile, loading, status } = useSelector(
        (state) => state.profileInfo
    );
    const [activity, setActivity] = React.useState(false)
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
        deleted_document: [],
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
            pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}"
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
            pattern: "\\(\\d{3}\\) \\d{3}-\\d{4}|\\d{3}-\\d{3}-\\d{4}"
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
            isMultiFile: true,
            key: "documents",
        },
    ];

    React.useEffect(() => {
        const constructedDocuments = profile?.documents?.map((e) => {
            return {
                ...e,
                url: e?.file,
                name: e?.file_display_name
            }
        })
        setFormData({
            first_name: profile?.first_name ?? "",
            last_name: profile?.last_name ?? "",
            email: profile?.email ?? "",
            phone_number: profile?.phone_number ?? "",
            secondary_phone_number: profile?.secondary_phone_number ?? "",
            linked_in: profile?.linked_in ?? "",
            gender: profile?.gender ?? "",
            location: profile?.location ?? "",
            documents: constructedDocuments,
            deleted_document: [],
            error: {
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                gender: "",
            },
        })
    }, [])

    const refetchProfileData = () => {
        dispatch(getUserProfile());
    }

    const uploadUserImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let bodyFormData = new FormData();
            bodyFormData.append('profile_image', e.target.files[0]);
            dispatch(updateProfileImage(bodyFormData)).then((res) => {
                if (res?.meta?.requestStatus === "fulfilled") {
                    refetchProfileData()
                }
            })
        }
    }

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
          
          if (formData.secondary_phone_number && formData.secondary_phone_number &&
            !/^(?:\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})$/.test(
              formData.secondary_phone_number
            )
          ) {
            newErrors.secondary_phone_number = "Secondary Phone number format is invalid";
            isValid = false;
          }

        // if (!formData.gender) {
        //     newErrors.gender = "Gender is required";
        //     isValid = false;
        // }
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
            let editFormData = new FormData()

            editFormData.append("full_name", `${formData?.first_name} ${formData?.last_name}`.trim())
            editFormData.append("email", formData?.email)
            editFormData.append("phone_number", formData?.phone_number)
            editFormData.append("secondary_phone_number", formData?.secondary_phone_number)
            editFormData.append("linked_in", formData?.linked_in)
            editFormData.append("gender", formData?.gender)
            editFormData.append("location", formData?.location)
            editFormData.append("mentee_type", "individual")
            editFormData.append("files_to_remove", [...formData?.deleted_document])

            const filteredFile = formData?.documents?.filter((e) => !e?.id)
            if (filteredFile?.length > 0) {
                filteredFile?.forEach((file, index) => {
                    editFormData.append("documents", file);
                });
            }

            const res = await api.put("profile/edit_profile", editFormData)
            if (res?.status === 200) {
                setActivity(true)
                refetchProfileData()
                setTimeout(() => {
                    setActivity(false)
                    setEditMode(false)
                }, 2000);
            }
        }
    };

    const handleDeleteFile = (key, value) => {
        const deletedFileId = formData?.documents?.[value]?.id;
        setFormData({
            ...formData,
            documents: formData?.documents?.filter((d, i) => i !== value),
            deleted_document: [
                ...(formData?.deleted_document || []),
                deletedFileId
            ],
        });
    };



    return (
        <Box className="p-4 rounded-[10px] border-border-main bg-background-secondary-white">
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <div className='py-4 relative w-[12%]'>
                    <div className='upload-profile'>
                        <label
                            className='w-[40%] pb-3 rounded-lg text-white text-[14px] cursor-pointer'
                            style={{
                                border: 'none',
                            }}
                        >
                            <img
                                src={profile?.image || ProfileImageIcon}
                                style={{ borderRadius: '50%', height: '143px' }}
                                alt='ProfileImageIcon'
                            />
                            <img
                                src={ProfileImagePencilIcon}
                                className='absolute top-[50%] left-2 cursor-pointer'
                                alt='ProfileImagePencilIcon'
                            />

                            <input type='file' class='hidden' onChange={uploadUserImage} />
                        </label>
                    </div>
                </div>

                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Button
                        btnName='Cancel'
                        btnCls='w-[140px]'
                        btnCategory='secondary'
                        onClick={() => setEditMode(false)}
                    />
                    <Button
                        btnType='submit'
                        btnName={`${loading ? 'Saving...' : 'Save Changes'}`}
                        btnCls={'w-[160px]'}
                        onClick={handleSave}
                    />
                </Stack>
            </Stack>

            <Box>
                <EquipmentFormFields
                    fields={fields}
                    formData={formData}
                    handleChange={updateState}
                    handleDeleteFile={handleDeleteFile}
                />
            </Box>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={activity}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div
                        className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}
                    >
                        <img src={SuccessTik} alt='SuccessTik' />
                        <p
                            className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
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
    )
}