import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../shared';
import ProfileImagePencilIcon from '../../assets/icons/profile-image-pencil-icon.svg';
import ProfileImageIcon from '../../assets/icons/profile-image-icon.svg';

import {
  getUserProfile,
  updateLocalProfileInfo,
  updateProfile,
  updateProfileImage,
} from '../../services/profile';
import { useDispatch, useSelector } from 'react-redux';
import { profileStatus, user } from '../../utils/constant';
import Accordian from '../../shared/Accordian';
import PersonalInfoSection from './section-edit/personal-info-section';
import { FormProvider, useForm } from 'react-hook-form';
import FormContextProvider from './form-context-provider';
import { components } from 'react-select';
import ProfessionalBakgroundSection from './section-edit/ProfessionalBakgroundSection';
import EducationalBackgroundSection from './section-edit/EducationalBackgroundSection';
import AreaOfExpertiseSection from './section-edit/AreaOfExpertiseSection';
import MentorshipExperienceSection from './section-edit/MentorshipExperienceSection';
import DocumentUploadSection from './section-edit/DocumentUploadSection';
import MentorshipPreferenceSection from './section-edit/MentorshipPreferenceSection';
import GoalsAndExpectatonsSection from './section-edit/GoalsAndExpectatonsSection';
import AvailabilityAndCommitmentSection from './section-edit/AvailabilityAndCommitmentSection';
import AdditionalInformationSection from './section-edit/AdditionalInformationSection';
import ArrowDown from '../../assets/icons/blue-arrow-down.svg';
import CurrentStatusSection from './section-edit/MenteeCurrentStatusSection';
import MenteeCurrentStatusSection from './section-edit/MenteeCurrentStatusSection';
import MenteeExpectionAndGoalsSection from './section-edit/MenteeExpectionAndGoalsSection';
import MenteeSkillandInterestsSection from './section-edit/MenteeSkillandInterestsSection';
import MenteeCareerAcademicGoalsSection from './section-edit/MenteeCareerAcademicGoalsSection';
import MenteeMentoringPreferencesSection from './section-edit/MenteeMentoringPreferencesSection';
import MenteeAvailabilitySection from './section-edit/MenteeAvailabilitySection';
import MenteeDetailedCareerAcademicGoalsSection from './section-edit/MenteeDetailedCareerAcademicGoalsSection';
import MenteeChallengesAndObstaclesSection from './section-edit/MenteeChallengesAndObstaclesSection';
import MenteeMentoringExperienceSection from './section-edit/MenteeMentoringExperienceSection';
import MenteeLearningSylePreferencesSection from './section-edit/MenteeLearningSylePreferencesSection';
import MenteeNetworkingProfessionalDevelopementSection from './section-edit/MenteeNetworkingProfessionalDevelopementSection';
import MenteePersonalDevelopmentSection from './section-edit/MenteePersonalDevelopmentSection';
import MenteeMentoringRelationshipDynamicsSection from './section-edit/MenteeMentoringRelationshipDynamicsSection';
import MenteeLongTermVisionSection from './section-edit/MenteeLongTermVisionSection';
import { roleBasedSections } from './MyProfile';
import dayjs from 'dayjs';

const EditProfile = ({ setEditMode }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [removeFiles, setRemoveFiles] = useState([]);
  const contentRef = useRef(null);
  const userInfo = useSelector((state) => state.userInfo);
  const userRole = userInfo?.data?.role;

  const allProfileSections = [
    { title: 'Personal Information', component: <PersonalInfoSection /> },
    {
      title: 'Current Status',
      component: <MenteeCurrentStatusSection />,
    },
    {
      title: 'Skill and Interests',
      component: <MenteeSkillandInterestsSection />,
    },
    {
      title: 'Expectation and goals',
      component: <MenteeExpectionAndGoalsSection />,
    },
    {
      title: 'Professional Bakground',
      component: <ProfessionalBakgroundSection />,
    },
    {
      title: 'Educational Background',
      component: <EducationalBackgroundSection />,
    },
    { title: 'Area of expertise', component: <AreaOfExpertiseSection /> },
    {
      title: 'Mentorship Experience',
      component: <MentorshipExperienceSection />,
    },
    {
      title: 'Document upload',
      component: <DocumentUploadSection setRemoveFiles={setRemoveFiles} />,
    },
    {
      title: 'Career/Academic Goals',
      component: <MenteeCareerAcademicGoalsSection />,
    },
    {
      title: 'Mentoring Preferences',
      component: <MenteeMentoringPreferencesSection />,
    },
    {
      title: 'Availability',
      component: <MenteeAvailabilitySection />,
    },
    {
      title: 'Detailed Career/academic Goals',
      component: <MenteeDetailedCareerAcademicGoalsSection />,
    },
    {
      title: 'Challenges and Obstacles',
      component: <MenteeChallengesAndObstaclesSection />,
    },
    {
      title: 'Mentoring Experience',
      component: <MenteeMentoringExperienceSection />,
    },
    {
      title: 'Learning style & Preferences',
      component: <MenteeLearningSylePreferencesSection />,
    },
    {
      title: 'Networking & Professional Developement',
      component: <MenteeNetworkingProfessionalDevelopementSection />,
    },
    {
      title: 'Personal Development',
      component: <MenteePersonalDevelopmentSection />,
    },
    {
      title: 'Mentoring Relationship Dynamics',
      component: <MenteeMentoringRelationshipDynamicsSection />,
    },
    {
      title: 'Long-term Vision',
      component: <MenteeLongTermVisionSection />,
    },
    // ----
    {
      title: 'Mentorship Preference',
      component: <MentorshipPreferenceSection />,
    },
    {
      title: 'Goals and Expections',
      component: <GoalsAndExpectatonsSection />,
    },
    {
      title: 'Availability and Commitment',
      component: <AvailabilityAndCommitmentSection />,
    },
    {
      title: 'Additional Information',
      component: <AdditionalInformationSection />,
    },
  ];

  const profileSection = allProfileSections.filter((section) =>
    roleBasedSections[userRole]?.includes(section.title)
  );

  const { profile, loading, status } = useSelector(
    (state) => state.profileInfo
  );

  const loadUserProfile = () => {
    dispatch(getUserProfile());
  };

  const uploadUserImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let bodyFormData = new FormData();
      bodyFormData.append('profile_image', e.target.files[0]);
      dispatch(updateProfileImage(bodyFormData)).then(() => loadUserProfile());
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(() => {
    if (status === profileStatus.update) {
      // setTimeout(() => {
      setEditMode(false);
      loadUserProfile();
      // }, 3000);
    }
  }, [status]);

  const onSubmit = (data) => {
    const formData = new FormData();

    // Add documents to FormData (assumes documents is a file or array of files)

    if (userRole === user.mentee) {
      const selectedFields = [
        'full_name',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'secondary_phone_number',
        // 'dob',
        'gender',
        'location',
        'current_education',
        'career_goals',
        'gain_skills',
        'fields_of_interest',
        'expectations_of_future',
        'specialization_study',
        'work_experience',
        'extra_curricular_activities',
        'mentoring_expectations',
        'mentor_meet_frequency',
        'mentor_communication_method',
        'strongest_skills',
        'areas_of_improvement',
        'related_hobbies_interests',
        'expectations_mentoring_relationship',
        'goals_from_mentorship',
        'mentee_thoughts_mentor',
        'days_times_for_meetings',
        'available_for_virtual_meeting',
        'inspiration_for_current_field',
        'projects_research_topics',
        'dreams_career_path',
        'preferred_companies_to_work',
        'current_challenges_faced',
        'obstacles_encountered',
        'handle_setbacks',
        'past_mentoring_exp',
        'values_from_past_mentoring_exp',
        'mentoring_relationship_expectations',
        'feedback_preference',
        'learning_style_preference',
        'structured_sessions_preference',
        'networking_opportunities_prefs',
        'assistance_req',
        'professional_resources_prefs',
        'develop_skills_quality_prefs',
        'personal_challenges_overcoming',
        'stress_management_methods',
        'mentor_qualities',
        'interested_mentoring_activities',
        'measures_mentoring_relationship',
        'mentor_guidance_from_distance',
        'long_term_aspirations',
        'plans_giveback_community',
        'legacy_from_life',
        'additional_information',
        'request_need_mentor_to_know',
        'linked_in',
        'socila_media',
        'professional_bio',
        'address',
      ];

      selectedFields.forEach((field) => {
        if (data[field]) {
          formData.append(field, data[field]);
        }
      });
      formData.append('dob', dayjs(data.dob).format('YYYY-MM-DD'));

      if (data.documents) {
        if (Array.isArray(data.documents)) {
          data.documents.forEach((file, index) => {
            formData.append(`documents`, file);
          });
        } else {
          formData.append('documents', data.documents);
        }
      }

      formData.append('files_to_remove', removeFiles || []);

      return dispatch(updateProfile(formData));
    } else if (userRole === user.mentor) {
      if (data.documents) {
        if (Array.isArray(data.documents)) {
          data.documents.forEach((file, index) => {
            formData.append(`documents`, file);
          });
        } else {
          formData.append('documents', data.documents);
        }
      }

      formData.append('first_name', data.first_name || '');
      formData.append('last_name', data.last_name || '');
      formData.append('phone_number', data.phone_number || '');
      formData.append(
        'secondary_phone_number',
        data.secondary_phone_number || ''
      );
      formData.append('professional_bio', data.professional_bio || '');

      formData.append('job_title', data.job_title || '');
      formData.append('current_employer', data.current_employer || '');
      formData.append('industry_type', data.industry_type || '');
      formData.append('linked_in', data.linked_in || '');
      formData.append('highest_degree', data.highest_degree || '');
      formData.append('field_of_study', data.field_of_study || '');
      formData.append('institution_name', data.institution_name || '');
      formData.append('institution_location', data.institution_location || '');

      formData.append('areas_of_expertise', data.areas_of_expertise || '');
      formData.append(
        'confident_areas_of_expertise',
        data.confident_areas_of_expertise || ''
      );
      formData.append('prev_mentorship', data.prev_mentorship || false);
      formData.append('mentor_exp_desc', data.mentor_exp_desc || '');
      formData.append(
        'interested_mentee_type',
        data.interested_mentee_type || ''
      );
      formData.append('communication_mode', data.communication_mode || '');
      formData.append(
        'availability_frequency',
        data.availability_frequency || ''
      );
      formData.append(
        'mentorship_achievement',
        data.mentorship_achievement || ''
      );
      formData.append('mentor_expectations', data.mentor_expectations || '');
      formData.append('max_mentee_count', data.max_mentee_count || null);
      formData.append(
        'pref_mentorship_duration',
        data.pref_mentorship_duration || ''
      );
      formData.append('additional_info', data.additional_info || '');
      formData.append('address', data.address || '');
      formData.append('location', data.location || '');
      formData.append('social_media', data.social_media || '');
      formData.append('reviewandrating', data.reviewandrating || false);
      formData.append('years_of_experience', data.years_of_experience || '');
      formData.append('gender', data.gender || '');
      formData.append('files_to_remove', removeFiles || []);


      return dispatch(updateProfile(formData));
    } else if (userRole === user.admin) {
      const adminFields = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'secondary_phone_number',
        'gender',
        'location',
        'linked_in',
        'professional_bio',
        'address',
      ];
      adminFields.forEach((field) => {
        if (data[field]) {
          formData.append(field, data[field]);
        }
      });

      return dispatch(updateProfile(formData));
    }
  };

  return (
    <FormContextProvider onSubmit={onSubmit} initialValues={profile}>
      <div className='border px-12 py-6 rounded-lg bg-white'>
        <div className='flex items-center  justify-between'>
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
          <div className='space-x-4'>
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
            />
          </div>
        </div>

        <div
          ref={contentRef}
          style={{
            maxHeight: showAll
              ? `${contentRef.current.scrollHeight}px`
              : '825px',
            overflow: 'hidden',
            transition: 'max-height 0.5s ease',
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
            className='underline mt-3 flex items-center gap-2 text-font-primary-main font-semibold text-lg cursor-pointer'
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View less' : 'View more'}
            <img
              className={`mt-1 transition-all duration-300 ${
                showAll ? 'rotate-180' : ''
              }`}
              src={ArrowDown}
              alt=''
            />
          </div>
        )}
      </div>
    </FormContextProvider>
  );
};

export default EditProfile;
