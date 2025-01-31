import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../shared";
import ProfileImageIcon from "../../../assets/icons/profile-image-icon.svg";
import ProfileImagePencilIcon from "../../../assets/icons/profile-image-pencil-icon.svg";
import {
  getUserProfile,
  updateLocalProfileInfo,
  updateProfile,
  updateProfileImage,
} from "../../../services/profile";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { profileStatus, user, view } from "../../../utils/constant";
import { PersonalInfoFields, ProfileFields } from "../../../utils/formFields";
import { Backdrop, CircularProgress } from "@mui/material";
import PersonalInfoSection from "../section-edit/personal-info-section";
import ProfessionalBakgroundSection from "../section-edit/ProfessionalBakgroundSection";
import EducationalBackgroundSection from "../section-edit/EducationalBackgroundSection";
import AreaOfExpertiseSection from "../section-edit/AreaOfExpertiseSection";
import MentorshipExperienceSection from "../section-edit/MentorshipExperienceSection";
import DocumentUploadSection from "../section-edit/DocumentUploadSection";
import MentorshipPreferenceSection from "../section-edit/MentorshipPreferenceSection";
import GoalsAndExpectatonsSection from "../section-edit/GoalsAndExpectatonsSection";
import AvailabilityAndCommitmentSection from "../section-edit/AvailabilityAndCommitmentSection";
import AdditionalInformationSection from "../section-edit/AdditionalInformationSection";

import SuccessTik from "../../../assets/images/blue_tik1x.png";
import ArrowDown from "../../../assets/icons/blue-arrow-down.svg";
import Accordian from "../../../shared/Accordian";
import FormContextProvider from "../form-context-provider";
import { roleBasedSections } from "../MyProfile";
import MenteeCurrentStatusSection from "../section-edit/MenteeCurrentStatusSection";
import MenteeSkillandInterestsSection from "../section-edit/MenteeSkillandInterestsSection";
import MenteeExpectionAndGoalsSection from "../section-edit/MenteeExpectionAndGoalsSection";
import MenteeCareerAcademicGoalsSection from "../section-edit/MenteeCareerAcademicGoalsSection";
import MenteeMentoringPreferencesSection from "../section-edit/MenteeMentoringPreferencesSection";
import MenteeAvailabilitySection from "../section-edit/MenteeAvailabilitySection";
import MenteeDetailedCareerAcademicGoalsSection from "../section-edit/MenteeDetailedCareerAcademicGoalsSection";
import MenteeChallengesAndObstaclesSection from "../section-edit/MenteeChallengesAndObstaclesSection";
import MenteeMentoringExperienceSection from "../section-edit/MenteeMentoringExperienceSection";
import MenteeLearningSylePreferencesSection from "../section-edit/MenteeLearningSylePreferencesSection";
import MenteeNetworkingProfessionalDevelopementSection from "../section-edit/MenteeNetworkingProfessionalDevelopementSection";
import MenteePersonalDevelopmentSection from "../section-edit/MenteePersonalDevelopmentSection";
import MenteeMentoringRelationshipDynamicsSection from "../section-edit/MenteeMentoringRelationshipDynamicsSection";
import MenteeLongTermVisionSection from "../section-edit/MenteeLongTermVisionSection";
import { GroupProfileForm } from "../section-edit/groupProfileForm";
import { ProfileNotes } from "../section-edit/profileNotes";
import BadgeIcon from "../../../assets/icons/badgeIcon.svg";

export const allProfileSections = (profile = "") => [
  {
    title: "Personal Information",
    component: <PersonalInfoSection type={view.viewOnly} />,
  },
  profile?.mentee_type === "group" && {
    title: "Volunteer List",
    component: <GroupProfileForm data={profile} />,
  },
  {
    title: "Current Status",
    component: <MenteeCurrentStatusSection type={view.viewOnly} />,
  },
  {
    title: "Skill and Interests",
    component: <MenteeSkillandInterestsSection type={view.viewOnly} />,
  },
  {
    title: "Expectation and goals",
    component: <MenteeExpectionAndGoalsSection type={view.viewOnly} />,
  },
  {
    title: "Professional Bakground",
    component: <ProfessionalBakgroundSection type={view.viewOnly} />,
  },
  {
    title: "Educational Background",
    component: <EducationalBackgroundSection type={view.viewOnly} />,
  },
  {
    title: "Area of expertise",
    component: <AreaOfExpertiseSection type={view.viewOnly} />,
  },
  {
    title: "Mentorship Experience",
    component: <MentorshipExperienceSection type={view.viewOnly} />,
  },
  {
    title: "Document upload",
    component: <DocumentUploadSection type={view.viewOnly} />,
  },
  {
    title: "Career/Academic Goals",
    component: <MenteeCareerAcademicGoalsSection type={view.viewOnly} />,
  },
  {
    title: "Mentoring Preferences",
    component: <MenteeMentoringPreferencesSection type={view.viewOnly} />,
  },
  {
    title: "Availability",
    component: <MenteeAvailabilitySection type={view.viewOnly} />,
  },
  {
    title: "Detailed Career/academic Goals",
    component: (
      <MenteeDetailedCareerAcademicGoalsSection type={view.viewOnly} />
    ),
  },
  {
    title: "Challenges and Obstacles",
    component: <MenteeChallengesAndObstaclesSection type={view.viewOnly} />,
  },
  {
    title: "Mentoring Experience",
    component: <MenteeMentoringExperienceSection type={view.viewOnly} />,
  },
  {
    title: "Learning style & Preferences",
    component: <MenteeLearningSylePreferencesSection type={view.viewOnly} />,
  },
  {
    title: "Networking & Professional Developement",
    component: (
      <MenteeNetworkingProfessionalDevelopementSection type={view.viewOnly} />
    ),
  },
  {
    title: "Personal Development",
    component: <MenteePersonalDevelopmentSection type={view.viewOnly} />,
  },
  {
    title: "Mentoring Relationship Dynamics",
    component: (
      <MenteeMentoringRelationshipDynamicsSection type={view.viewOnly} />
    ),
  },
  {
    title: "Long-term Vision",
    component: <MenteeLongTermVisionSection type={view.viewOnly} />,
  },
  // ----
  {
    title: "Mentorship Preference",
    component: <MentorshipPreferenceSection type={view.viewOnly} />,
  },
  {
    title: "Goals and Expections",
    component: <GoalsAndExpectatonsSection type={view.viewOnly} />,
  },
  {
    title: "Availability and Commitment",
    component: <AvailabilityAndCommitmentSection type={view.viewOnly} />,
  },
  {
    title: "Additional Information",
    component: <AdditionalInformationSection type={view.viewOnly} />,
  },
  {
    title: "Supervisor Notes",
    component: <ProfileNotes data={profile} />,
  },
];

const ProfileTab = ({ setEditMode }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const contentRef = useRef(null);
  const { profile, loading, status } = useSelector(
    (state) => state.profileInfo
  );
  const userInfo = useSelector((state) => state.userInfo);
  const userRole = userInfo?.data?.role;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm();

  const profileSection = allProfileSections(profile.mentee_type).filter(
    (section) => roleBasedSections[userRole]?.includes(section.title)
  );

  const loadUserProfile = () => {
    dispatch(getUserProfile());
  };

  const uploadUserImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let bodyFormData = new FormData();
      bodyFormData.append("profile_image", e.target.files[0]);
      dispatch(updateProfileImage(bodyFormData)).then(() => loadUserProfile());
    }
  };

  const handleEditMode = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  useEffect(() => {
    if (Object.keys(profile).length) {
      const name = profile?.name?.split(" ");
      reset({
        first_name: name[0] || "",
        last_name: name[1] || "",
        phone_number: profile?.phone_number,
        secondary_phone_number: profile?.secondary_phone_number || "",
        email: profile?.email,
        address: profile?.address,
        professional_bio: profile?.professional_bio,
        documents: profile?.documents.map((doc) => (
          <div className="">
            <Link
              target="_blank"
              className="underline text-font-primary-main"
              to={doc.file}
            >
              {doc.file_display_name}
            </Link>
          </div>
        )),
      });
    }
  }, [profile]);

  // useEffect(() => {
  //   loadUserProfile();
  // }, []);

  // useEffect(() => {
  //   if (status === profileStatus.update) {
  //     setTimeout(() => {
  //       setEditMode(false);
  //       loadUserProfile();
  //     }, 3000);
  //   }
  // }, [status]);

  return (
    <FormContextProvider initialValues={profile}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === profileStatus.update}
      >
        <div className="px-5 py-1 flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20"
            style={{ background: "#fff", borderRadius: "10px" }}
          >
            <img src={SuccessTik} alt="SuccessTik" />
            <p
              className="text-[16px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#1D5BBF] to-[#00AEBD]"
              style={{
                fontWeight: 600,
              }}
            >
              Profile updated Successfully
            </p>
          </div>
        </div>
      </Backdrop>
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">Profile Information</p>
        <div>
          <Button
            onClick={handleEditMode}
            btnType="button"
            btnName="Edit"
            btnCls={"w-[140px]"}
          />
        </div>
      </div>

      <div>
        <div>
          <div className="flex flex-row gap-5 items-center">
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

                  <input
                    type="file"
                    class="hidden"
                    onChange={uploadUserImage}
                  />
                </label>
              </div>
            </div>
            {userRole === "mentor" && (
              <img
                src={BadgeIcon}
                alt="badgeIcon"
                className="h-[100px] w-[100px]"
              />
            )}
          </div>

          {/* <div className='grid grid-cols-6 gap-3 mt-12'>
            {PersonalInfoFields.map((profilefield, index) => {
              // console.log(getValues(profilefield.name));
              return (
                <div className={`${profilefield.width}`} key={index}>
                  <div className='mb-5'>
                    <label
                      className='block tracking-wide  text-xs mb-2'
                      style={{ color: 'rgba(116, 116, 116, 1)' }}
                    >
                      {profilefield.label}
                    </label>

                    <p className='text-[14px] flex flex-wrap items-center justify-start gap-4'>
                      {getValues(profilefield.name)
                        ? getValues(profilefield.name)
                        : '-'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div> */}

          <div
            ref={contentRef}
            style={{
              maxHeight: showAll
                ? `${contentRef.current.scrollHeight}px`
                : "350px",
              overflow: "hidden",
              transition: "max-height 0.5s ease",
            }}
          >
            {profileSection.map((section, index) => (
              <Accordian key={index} title={section.title} defaultValue={true}>
                {section.component}
              </Accordian>
            ))}
          </div>

          {userRole !== user.admin && (
            <div
              className="underline mt-3 flex items-center gap-2 text-font-primary-main font-semibold text-lg cursor-pointer"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "View less" : "View more"}
              <img
                className={`mt-1 transition-all duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
                src={ArrowDown}
                alt=""
              />
            </div>
          )}
          {(userRole === "mentee" || userRole === "mentor") && (
            <div className="mt-6">
              <p className="text-font-primary-main text-[16px] font-bold border-b border-border-main pb-4">
                Supervisor Notes
              </p>
              <p className="text-font-secondary-black text-[14px] pt-3">
                {profile?.profile_notes ?? "-"}
              </p>
            </div>
          )}
        </div>
      </div>
    </FormContextProvider>
  );
};

export default ProfileTab;
