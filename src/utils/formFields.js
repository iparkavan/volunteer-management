import moment from "moment";
import { dateFormat } from ".";
import { getCurrentWeekAndDay } from "./constant";

export const formatPhoneNumber = (value) => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, "");

  // Format based on length
  if (numericValue.length <= 3) {
    return numericValue;
  } else if (numericValue.length <= 6) {
    return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
  } else {
    return `(${numericValue.slice(0, 3)}) ${numericValue.slice(
      3,
      6
    )}-${numericValue.slice(6, 10)}`;
  }
};

export const formatZipCode = (value) => {
  value = value.replace(/\D/g, "");

  if (value.length > 5) {
    value = value.slice(0, 5) + "-" + value.slice(5, 9);
  }

  value = value.slice(0, 10);

  return value;
};

const phoneValidaionRule = {
  value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
  message: "Invalid phone number format",
};

const { currentDayName } = getCurrentWeekAndDay();

export const PersonalInformationFields = [
  {
    type: "input",
    name: "first_name",
    fieldtype: "text",
    label: "First Name",
    placeholder: "Enter First Name",
    inputRules: {
      required: "This field is required",
    },
    size: true,
    disable: true,
  },
  {
    type: "input",
    name: "last_name",
    fieldtype: "text",
    label: "Last Name",
    placeholder: "Enter Last Name",
    inputRules: {
      required: "This field is required",
    },
    size: true,
    disable: true,
  },
  {
    type: "input",
    name: "email",
    fieldtype: "email",
    label: "E-mail",
    placeholder: "Enter Email",
    inputRules: {
      required: "This field is required",
    },
    size: true,
    disable: true,
  },
  {
    type: "input",
    name: "phone_number",
    // fieldtype: 'number',
    label: "Primary Contact Number",
    placeholder: "Enter Primary Contact Number",
    inputRules: {
      required: "This field is required",
      pattern: { ...phoneValidaionRule },
    },
    size: true,
  },
  {
    type: "input",
    name: "secondary_phone_number",
    // fieldtype: 'number',
    label: "Secondary Contact Number",
    placeholder: "Enter Secondary Number",
    inputRules: {
      // required: "This field is required",
      pattern: { ...phoneValidaionRule },
    },
    size: true,
  },
  //  {
  //   type: "dropdown",
  //   name: "linkedin",
  //   label: "LinkedIn Profile (if available)",
  //   placeholder: "",
  //   options: [{
  //       key: "yes",
  //       value: "Yes"
  //     },
  //     {
  //       key: "no",
  //       value: "No"
  //     },
  //   ],
  //   inputRules: {
  //     // required: "This field is required",
  //   },
  //   size: true,
  // },
  {
    type: "input",
    name: "linked_in",
    fieldtype: "text",
    label: "LinkedIn Profile Link",
    placeholder: "Enter LinkedIn Profile Link",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
  },
  {
    type: "checkbox",
    name: "gender",
    label: "Gender",
    placeholder: "",
    options: [
      {
        key: "male",
        value: "Male",
      },
      {
        key: "female",
        value: "Female",
      },
      {
        key: "others",
        value: "Others",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
  },
  {
    type: "input",
    name: "location",
    fieldtype: "text",
    label: "Location",
    placeholder: "Enter Location",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
  },
];

export const ProfessionalBackgroundFields = [
  {
    type: "input",
    name: "job_title",
    fieldtype: "text",
    label: "Current Job Title",
    placeholder: "Current Job Title",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "current_employer",
    fieldtype: "text",
    label: "Current Employer ",
    placeholder: "Current Employer ",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "industry_type",
    fieldtype: "text",
    label: "Industry",
    placeholder: "Industry",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-4",
  },
  // {
  //   type: 'input',
  //   name: 'linked_in',
  //   label: 'LinkedIn Profile (if available)',
  //   placeholder: 'LinkedIn Profile',

  //   inputRules: {
  //     // required: 'This field is required',
  //   },
  //   size: true,
  //   width: 'col-span-2',
  // },
];

export const EducationalBackgroundFields = [
  {
    type: "input",
    name: "highest_degree",
    fieldtype: "text",
    label: "Highest Degree Achieved",
    placeholder: "Highest Degree Achieved",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "field_of_study",
    fieldtype: "text",
    label: "Field of Study",
    placeholder: "Field of Study",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "institution_name",
    fieldtype: "text",
    label: "Institution Name",
    placeholder: "Institution Name",
    inputRules: {
      // required: 'This field is required',
    },
    size: false,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "institution_location",
    fieldtype: "text",
    label: "Institution Location",
    placeholder: "Institution Location",
    inputRules: {
      // required: 'This field is required',
    },
    size: false,
    width: "col-span-2",
  },
];

export const AreaOfExpertiseFields = [
  {
    type: "input",
    name: "areas_of_expertise",
    fieldtype: "text",
    label: "List areas of expertise",
    placeholder: "(e.g., project management, software development, marketing)",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "confident_areas_of_expertise",
    fieldtype: "text",
    label:
      "What specific skills or knowledge are you most confident in sharing with a mentee?",
    placeholder: "Skills",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
];

export const MentorShipExperienceFields = [
  {
    type: "input",
    name: "years_of_experience",
    fieldtype: "number",
    label: "How many years of experience?",
    placeholder: "Enter year of experience",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
  {
    type: "radio",
    name: "prev_mentorship",
    label: "Have you previously mentored someone?",
    options: [
      {
        key: true,
        value: "Yes",
      },
      {
        key: false,
        value: "No",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "mentor_exp_desc",
    fieldtype: "text",
    label: "If yes, please briefly describe your mentorship experience",
    placeholder: "mentorship experience",
    size: false,
    width: "col-span-2",
  },
];

export const MentorshipPreferenceFields = [
  {
    type: "input",
    name: "interested_mentee_type",
    fieldtype: "text",
    label: "What type of mentee are you most interested in mentoring?",
    placeholder:
      "(e.g., students, early-career professionals, career changers)",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "communication_mode",
    fieldtype: "text",
    label: "Preferred method of communication",
    placeholder: "(e.g., email, video calls, in-person meetings)",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "availability_frequency",
    fieldtype: "text",
    label: "How often are you available to meet with a mentee?",
    placeholder: "(e.g., weekly, bi-weekly, monthly)",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const GoalsandExperienceFields = [
  {
    type: "input",
    name: "mentorship_achievement",
    fieldtype: "text",
    label: "What do you hope to achieve through this mentorship program?",
    placeholder: "",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
  },
  {
    type: "input",
    name: "mentor_expectations",
    fieldtype: "text",
    label: "What are your expectations from the mentee?",
    placeholder: "",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
  },
];

export const AvailabilityCommitmentFields = [
  {
    type: "input",
    name: "max_mentee_count",
    fieldtype: "text",
    label: "How many mentees are you willing to take on at a time?",
    placeholder: "",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
  },
  {
    type: "input",
    name: "pref_mentorship_duration",
    fieldtype: "text",
    label: "What is your preferred duration for a mentorship relationship?",
    placeholder: "",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
  },
];
export const MentorDocumentUplaod = [
  {
    type: "file",
    name: "documents",
    fieldtype: "file",
    label: "Document Upload",
    placeholder: "",
    inputRules: {
      required: "At least one file is required",
    },
    size: false,
    width: "col-span-1",
  },
];
export const AdditionalInformationFields = [
  {
    type: "textbox",
    name: "additional_info",
    label:
      "Is there any additional information you would like to provide about yourself or your mentorship style?",
    placeholder: "",
    inputRules: {
      // required: "This field is required",
    },
  },
];

export const StepFormFields = [
  PersonalInformationFields,
  AreaOfExpertiseFields,
  EducationalBackgroundFields,
  MentorShipExperienceFields,
  GoalsandExperienceFields,
  MentorDocumentUplaod,
];

const ageField = () => {
  const field = [];
  for (let a = 10; a <= 99; a++) {
    field.push({
      key: a,
      value: a,
    });
  }
  return field;
};

export const MenteePersonalInformationFields = [
  {
    type: "input",
    name: "full_name",
    fieldtype: "text",
    label: "First Name",
    placeholder: "Enter First Name",
    inputRules: {
      required: "This field is required",
    },
    size: true,
    disabled: true,
    disable: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "last_name",
    fieldtype: "text",
    label: "Last Name",
    placeholder: "Enter Last Name",
    inputRules: {
      required: "This field is required",
    },
    size: true,
    disabled: true,
    disable: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "email",
    fieldtype: "email",
    label: "E-mail",
    placeholder: "Enter Email",
    inputRules: {
      required: "This field is required",
    },
    size: true,
    disabled: true,
    disable: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "phone_number",
    // fieldtype: 'number',
    label: "Primary Number",
    placeholder: "Primary Number",
    inputRules: {
      required: "This field is required",
      pattern: { ...phoneValidaionRule },
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "secondary_phone_number",
    // fieldtype: 'number',
    label: "Secondary Contact Number",
    placeholder: "Secondary Number",
    inputRules: {
      pattern: { ...phoneValidaionRule },
    },
    size: true,
    width: "col-span-2",
  },
  // {
  //   type: "input",
  //   name: "phone_number",
  //   // fieldtype: 'number',
  //   label: "Primary Contact Number",
  //   placeholder: "Enter Primary Contact Number",
  //   inputRules: {
  //     required: "This field is required",
  //     pattern: {
  //       value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
  //       message: "Invalid phone number format",
  //     },
  //   },
  //   size: true,
  //   width: "col-span-2",
  // },
  // {
  //   type: "input",
  //   name: "secondary_phone_number",
  //   // fieldtype: 'number',
  //   label: "Secondary Contact Number",
  //   placeholder: "Enter Secondary Contact Number",
  //   inputRules: {
  //     pattern: {
  //       value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
  //       message: "Invalid phone number format",
  //     },
  //   },
  //   size: true,
  //   width: "col-span-2",
  // },
  {
    type: "date",
    name: "dob",
    label: "Date Of Birth",
    placeholder: "Select Program Start Date and Time",
    inputRules: {
      // required: 'This field is required',
    },
    // disabled: true,
    size: true,
    width: "col-span-2",
  },
  {
    type: "checkbox",
    name: "gender",
    label: "Gender",
    placeholder: "",
    options: [
      {
        key: "male",
        value: "male",
      },
      {
        key: "female",
        value: "female",
      },
      {
        key: "others",
        value: "others",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "location",
    fieldtype: "text",
    label: "Location",
    placeholder: "Enter Location",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "dropdown",
    name: "current_education",
    label: "Current Education level",
    placeholder: "",
    options: [
      {
        key: "UG",
        value: "Under Graduate",
      },
      {
        key: "HSC",
        value: "Higher Secondary",
      },
      {
        key: "PG",
        value: "Post Graduate",
      },
      {
        key: "PHD",
        value: "Doctorate/Ph.D",
      },
    ],
    inputRules: {
      required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeCareerInformationFields = [
  {
    type: "input",
    name: "career_goals",
    fieldtype: "text",
    label: "What are your current academic or career goals?",
    placeholder: "Enter career goals",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "gain_skills",
    fieldtype: "text",
    label:
      "What specific skills or knowledge do you hope to gain from a mentor?",
    placeholder: "Enter skills or knowledge",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "fields_of_interest",
    fieldtype: "text",
    label: "What field or industry are you interested in?",
    placeholder: "Enter field or industry ",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "dropdown",
    name: "expectations_of_future",
    label: "Where do you see yourself in 5 years?",
    placeholder: "",
    options: [
      {
        key: "option1",
        value: "Option 1",
      },
      {
        key: "option2",
        value: "Option 2",
      },
      {
        key: "option3",
        value: "Option 3",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
];

export const MenteeCurrentStatusFields = [
  {
    type: "input",
    name: "specialization_study",
    fieldtype: "text",
    label: "What is your current major or field of study (if applicable)?",
    placeholder: "Enter current major or field",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "work_experience",
    fieldtype: "text",
    label: "Do you have any work experience? If so, please describe.",
    placeholder: "Enter work experience",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "extra_curricular_activities",
    fieldtype: "text",
    label:
      "Are you currently involved in any extracurricular activities, clubs, or organizations?",
    placeholder: "Enter extracurricular activities",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeMentoringPreferenceFields = [
  {
    type: "dropdown",
    name: "mentoring_expectations",
    label: "What type of mentoring are you looking for? ",
    placeholder: "",
    options: [
      {
        key: "option1",
        value: "Option 1",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "dropdown",
    name: "mentor_meet_frequency",
    label: "How often would you like to meet with your mentor?",
    placeholder: "",
    options: [
      {
        key: "option1",
        value: "Option 1",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "dropdown",
    name: "mentor_communication_method",
    label: "What is your preferred method of communication with your mentor?",
    placeholder: "",
    options: [
      {
        key: "option1",
        value: "Option 1",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeSkillsFields = [
  {
    type: "input",
    name: "strongest_skills",
    fieldtype: "text",
    label: "What are your strongest skills?",
    placeholder: "Strongest skills?",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "areas_of_improvement",
    fieldtype: "text",
    label: "What areas do you feel you need the most improvement in?",
    placeholder: "You need the most improvement in",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "related_hobbies_interests",
    fieldtype: "text",
    label: "What are your hobbies or interests outside of academics or work?",
    placeholder: "Your hobbies or interests outside of academics or work?",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeExpectationGoalsFields = [
  {
    type: "input",
    name: "expectations_mentoring_relationship",
    fieldtype: "text",
    label: "What are your expectations from your mentoring relationship?",
    placeholder: "Your expectations from your mentoring relationship",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "goals_from_mentorship",
    fieldtype: "text",
    label:
      "Do you have any specific goals you want to achieve through this mentorship?",
    placeholder:
      "you have any specific goals you want to achieve through this mentorship",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "mentee_thoughts_mentor",
    fieldtype: "text",
    label:
      "Is there anything specific you would like your mentor to know about you?",
    placeholder:
      "Is there anything specific you would like your mentor to know about you",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeAvailabilitysFields = [
  {
    type: "input",
    name: "days_times_for_meetings",
    fieldtype: "text",
    label: "What days and times are you typically available for meetings?",
    placeholder: "Days and times are you typically available for meetings",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "available_for_virtual_meeting",
    fieldtype: "text",
    label:
      "Are you open to virtual meetings if in-person meetings are not possible?",
    placeholder:
      "Are you open to virtual meetings if in-person meetings are not possible?",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
];

export const MenteeDetailedCareerFields = [
  {
    type: "input",
    name: "inspiration_for_current_field",
    fieldtype: "text",
    label: "What inspired you to pursue your current field or major?",
    placeholder: "inspired you to pursue your current field or major",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "projects_research_topics",
    fieldtype: "text",
    label:
      "Are there any specific projects or research topics you are passionate about?",
    placeholder:
      "Are there any specific projects or research topics you are passionate about?",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "dreams_career_path",
    fieldtype: "text",
    label: "What is your dream job or career path?",
    placeholder: "Your dream job or career path",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "preferred_companies_to_work",
    fieldtype: "text",
    label:
      "Have you identified any specific companies or organizations you would like to work for in the future?",
    placeholder:
      "Have you identified any specific companies or organizations you would like to work for in the future?",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
];

export const MenteeChallengesFields = [
  {
    type: "input",
    name: "current_challenges_faced",
    fieldtype: "text",
    label:
      "What are the biggest challenges you are currently facing in your academic or career journey?",
    placeholder:
      "The biggest challenges you are currently facing in your academic or career journey",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "obstacles_encountered",
    fieldtype: "text",
    label:
      "Have you encountered any obstacles that have hindered your progress?",
    placeholder:
      "Have you encountered any obstacles that have hindered your progress?",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "handle_setbacks",
    fieldtype: "text",
    label: "How do you typically handle setbacks or failures?",
    placeholder: "You typically handle setbacks or failures",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeMentoringExperienceFields = [
  {
    type: "input",
    name: "past_mentoring_exp",
    fieldtype: "text",
    label:
      "Have you had a mentor before? If so, what was your experience like?",
    placeholder:
      "Have you had a mentor before? If so, what was your experience like",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "values_from_past_mentoring_exp",
    fieldtype: "text",
    label:
      "What did you find most valuable about your previous mentoring experience?",
    placeholder:
      "You find most valuable about your previous mentoring experience",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "mentoring_relationship_expectations",
    fieldtype: "text",
    label:
      "What would you like to be different in this mentoring relationship compared to previous ones?",
    placeholder:
      "Would you like to be different in this mentoring relationship compared to previous ones",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeLearningFields = [
  {
    type: "dropdown",
    name: "feedback_preference",
    label: "How do you prefer to receive feedback and guidance?",
    placeholder: "",
    options: [
      {
        key: "option1",
        value: "Option 1",
      },
      {
        key: "option2",
        value: "Option 2",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "learning_style_preference",
    fieldtype: "text",
    label: "What is your preferred learning style?",
    placeholder: "Your preferred learning style",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "structured_sessions_preference",
    fieldtype: "text",
    label:
      "Do you prefer structured sessions with specific topics, or more informal, flexible discussions?",
    placeholder:
      "You prefer structured sessions with specific topics, or more informal, flexible discussions",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeNetworkingFields = [
  {
    type: "input",
    name: "networking_opportunities_prefs",
    fieldtype: "text",
    label:
      "Are you interested in networking opportunities through your mentor?",
    placeholder:
      "Are you interested in networking opportunities through your mentor?",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "assistance_req",
    fieldtype: "text",
    label:
      "Do you need assistance with resume writing, interview preparation, or job search strategies?",
    placeholder: "Your preferred learning style",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "professional_resources_prefs",
    fieldtype: "text",
    label:
      "Would you like to learn about professional development resources such as workshops, seminars, or conferences?",
    placeholder:
      "Would you like to learn about professional development resources such as workshops, seminars, or conferences",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteePersonalDevelopmentFields = [
  {
    type: "input",
    name: "develop_skills_quality_prefs",
    fieldtype: "text",
    label:
      "What personal qualities or skills would you like to develop further?",
    placeholder:
      "Personal qualities or skills would you like to develop further?",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "personal_challenges_overcoming",
    fieldtype: "text",
    label:
      "Are there any specific personal challenges you are working on overcoming?",
    placeholder:
      "Are there any specific personal challenges you are working on overcoming?",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "stress_management_methods",
    fieldtype: "text",
    label: "How do you manage stress and maintain a healthy work-life balance?",
    placeholder:
      "Would you like to learn about professional development resources such as workshops, seminars, or conferences",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];

export const MenteeMentoringRelationshipFields = [
  {
    type: "input",
    name: "mentor_qualities",
    fieldtype: "text",
    label: "What qualities are you looking for in a mentor?",
    placeholder: "What qualities are you looking for in a mentor??",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "interested_mentoring_activities",
    fieldtype: "text",
    label:
      "Are there any specific mentoring activities or exercises you are interested in?",
    placeholder:
      "Are there any specific mentoring activities or exercises you are interested in?",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "measures_mentoring_relationship",
    fieldtype: "text",
    label: "How do you measure success in a mentoring relationship?",
    placeholder: "You measure success in a mentoring relationship",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "mentor_guidance_from_distance",
    fieldtype: "text",
    label:
      "Do you prefer a mentor who takes a hands-on approach or one who offers guidance from a distance?",
    placeholder:
      "You prefer a mentor who takes a hands-on approach or one who offers guidance from a distance",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
];

export const MenteeLongTermFields = [
  {
    type: "input",
    name: "long_term_aspirations",
    fieldtype: "text",
    label: "What are your long-term personal and professional aspirations?",
    placeholder: "Your long-term personal and professional aspirations",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "plans_giveback_community",
    fieldtype: "text",
    label:
      "How do you plan to give back to your community or field in the future?",
    placeholder:
      "You plan to give back to your community or field in the future",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "legacy_from_life",
    fieldtype: "text",
    label:
      "What legacy do you want to leave behind in your career or personal life?",
    placeholder:
      "legacy do you want to leave behind in your career or personal life",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-2",
  },
];
export const MenteeDocumentUplaod = [
  {
    type: "file",
    name: "documents",
    fieldtype: "file",
    label: "Document Upload",
    placeholder: "",
    inputRules: {
      required: "This field is required",
    },
    size: false,
  },
];

export const MenteeAdditionalFields = [
  {
    type: "input",
    name: "additional_information",
    fieldtype: "text",
    label:
      "Is there any additional information you would like to share that could help in matching you with a mentor?",
    placeholder:
      "Is there any additional information you would like to share that could help in matching you with a mentor",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
  {
    type: "input",
    name: "request_need_mentor_to_know",
    fieldtype: "text",
    label:
      "How do you plan to give back to your community or field in the future?",
    placeholder:
      "You plan to give back to your community or field in the future",
    inputRules: {
      // required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
];

export const MenteeStepFormFields = [
  MenteePersonalInformationFields,
  MenteeCareerInformationFields,
  MenteeCurrentStatusFields,
  MenteeMentoringPreferenceFields,
  MenteeLongTermFields,
  MenteeDocumentUplaod,
];

export const Stepname = [
  "personal_information",
  "area_of_expertise",
  "educational_background",
  "mentor_ship_experience",
  "goals_expectations",
  "document_upload",
];

export const MenteeStepname = [
  "personal_information",
  "current_status",
  "skills_and_interests",
  "expectations_goals",
  "long_term_vision",
  "document_upload",
];
export const equipmentTabs = [
  { id: "vehicle", label: "Vehicles" },
  { id: "machinery", label: "Machinery" },
  { id: "essentials", label: "Essentials" },
];

export const ProgramTabs = [
  {
    name: "Program Information",
    key: "program_information",
  },
  {
    name: "About Program",
    key: "about_program",
  },
  {
    name: "Program Testimonials",
    key: "program_testimonials",
  },
];

export const CourseLevelOptions = [
  {
    key: "beginner",
    value: "Beginner",
  },
  {
    key: "intermediate",
    value: "Intermediate",
  },
  {
    key: "expert",
    value: "Expert",
  },
];

export const SessionCounts = () => {
  const sessions = [];
  for (let n = 1; n <= 20; n++) {
    sessions.push({
      key: n,
      value: n,
    });
  }
  return sessions;
};

export const ProgramInformationFields = [
  {
    type: "dropdown",
    name: "environment",
    label: "Program Environment",
    placeholder: "Select Environment",
    inputRules: {
      // required: "This field is required",
    },
    options: [
      {
        key: "Assign Program",
        value: "Assign Program",
      },
      {
        key: "Own",
        value: "Own",
      },
    ],
    width: "width-32",
    for: ["admin"],
  },

  {
    type: "dropdown",
    name: "category",
    label: "Incident Type",
    placeholder:
      "Fire Relief / Hurricane Relief / Flood Relief / Resource Management",
    inputRules: {
      required: "This field is required",
    },
    options: [],
    width: "w-full",
    for: ["mentor"],
  },

  {
    type: "dropdown",
    name: "category",
    label: "Incident Type",
    placeholder:
      "Fire Relief / Hurricane Relief / Flood Relief / Resource Management",
    inputRules: {
      required: "This field is required",
    },
    options: [],
    width: "width-32",
    for: ["admin"],
  },
  {
    type: "dropdown",
    name: "program_type",
    label: "Type of program",
    placeholder: "Training/Field Session",
    inputRules: {
      // valueAsNumber: true,
      required: "This field is required",
    },
    options: [],
    width: "width-32",
    for: ["mentor", "admin"],
  },
  {
    type: "input",
    name: "program_name",
    fieldtype: "text",
    label: "Program Title",
    placeholder: "Enter Enter Program Title",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
    for: ["mentor"],
  },
  // {
  //   type: "input",
  //   name: "title",
  //   fieldtype: "text",
  //   label: "Program Title",
  //   placeholder: "Enter Enter Program Title",
  //   inputRules: {
  //     required: "This field is required",
  //   },
  //   width: "width-32",
  //   for: ["admin"],
  // },
  {
    type: "input",
    name: "environment_name",
    fieldtype: "text",
    label: "Environment Name",
    placeholder: "Enter envirnoment Name",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
    for: ["admin"],
  },
  {
    type: "dropdown",
    name: "session_count",
    label: "Sessions",
    placeholder: "Select Sessions",
    inputRules: {
      required: 'This field is required',
    },
    options: SessionCounts(),
    width: "width-32",
    for: ["mentor"],
  },
  {
    type: "textbox",
    name: "session_details",
    label: "Session Description",
    placeholder: "",
    inputRules: {
      required: 'This field is required',
    },
    width: "w-full",
    for: ["mentor"],
  },

  {
    type: "textbox",
    name: "description",
    label: "Program Description",
    placeholder: "Enter program description",
    inputRules: {
      required: 'This field is required',
    },
    width: "w-full",
    for: ["mentor"],
  },
  {
    type: "date",
    name: "start_date",
    label: "Program Start Date and Time",
    placeholder: "Select Program Start Date and Time",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
    for: ["admin"],
  },
  {
    type: "date",
    name: "end_date",
    label: "Program End Date and Time",
    placeholder: "Select Program End Date and Time",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
    for: ["admin"],
  },
  // {
  //   type: "input",
  //   name: "address",
  //   label: "Address",
  //   placeholder: "Enter Address",
  //   inputRules: {
  //     required: "This field is required",
  //   },
  //   width: "width-32",
  //   for: ["admin"],
  // },
  {
    type: "input",
    name: "phone_number",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    inputRules: {
      required: "This field is required",
      pattern: { ...phoneValidaionRule },
    },
    width: "width-32",
    for: ["admin"],
  },
  {
    type: "textbox",
    name: "description",
    label: "Program Description",
    placeholder: "",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
    for: ["admin"],
  },
  {
    type: "textbox",
    name: "prerequisites",
    label: "Prerequisites",
    placeholder: "Enter prerequisites",
    inputRules: {
      required: "prerequisites is required",
    },
    width: "w-full",
    for: ["admin", 'mentor'],
  },
  {
    type: "dropdown",
    name: "no_of_subprograms",
    label: "Number of Subject",
    placeholder: "Select Number of Subject",
    inputRules: {
      valueAsNumber: true,
      required: "This field is required",
    },
    options: Array.from({ length: 6 }, (_, i) => i + 1).map((count) => ({
      key: count,
      value: count,
    })),
    width: "w-full",
    for: ["admin"],
  },
  {
    type: "dynamicFields",
    name: "sub_programs",
    label: "",
    for: ["admin"],
    width: "w-full",
    dynamicFields: [
      {
        type: "input",
        name: "title",
        fieldtype: "text",
        label: "Title",
        placeholder: "Enter Title",
        inputRules: {
          required: "Title is required",
        },
        width: "w-full",
        for: ["admin"],
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Enter Description",
        inputRules: {
          required: "Description is required",
        },
        width: "w-full",
        for: ["admin"],
      },
      {
        type: "popup-input",
        name: "equipments",
        label: "Relevant Equipment",
        fieldtype: "text",
        placeholder: "Add Relevant Equipment",
        inputRules: {
          // required: 'This field is required',
        },
        width: "w-full",
        icon: "add",
        for: ["admin"],
      },
      {
        type: "date",
        name: "start_date",
        label: "Start Date",
        placeholder: "Select Start Date",
        inputRules: {
          required: "Start Date is required",
        },
        width: "width-32",
        for: ["admin"],
      },
      {
        type: "date",
        name: "end_date",
        label: "End Date",
        placeholder: "Select End Date",
        inputRules: {
          required: "End Date is required",
        },
        width: "width-32",
        for: ["admin"],
      },
      {
        type: "radio",
        name: "flexible_time",
        label: "Is Flexible?",
        placeholder: "",
        options: [
          { key: "true", value: "Yes" },
          { key: "false", value: "No" },
        ],
        inputRules: {
          required: "This field is required",
        },
        size: true,
        for: ["admin"],
      },
      {
        type: "popup-input",
        name: "mentor_id",
        label: "Select Program Manager",
        placeholder: "Select Program Manager",
        fieldtype: "text",
        inputRules: {
          // required: 'This field is required',
        },
        width: "width-32",
        icon: "add",
        for: ["admin"],
      },
    ],
  },
  // {
  //   type: 'popup-input',
  //   name: 'program_admin',
  //   label: 'Select Admin Materials',
  //   fieldtype: 'text',
  //   placeholder: 'Select Admin Materials',
  //   inputRules: {
  //     // required: 'This field is required',
  //   },
  //   width: 'w-full',
  //   icon: 'add',
  //   for: ['admin'],
  // },  

  {
    type: "dropdown",
    name: "course_level",
    label: "Program Level",
    placeholder: "Select Program Level",
    inputRules: {
      required: "This field is required",
    },
    options: CourseLevelOptions,
    width: "width-32",
    for: ["admin", "mentor"],
  },
  {
    type: "date",
    name: "start_date",
    label: "Program Start Date and Time",
    placeholder: "Select Program Start Date and Time",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
    for: ["mentor"],
  },
  {
    type: "date",
    name: "end_date",
    label: "Program End Date and Time",
    placeholder: "Select Program End Date and Time",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
    for: ["mentor"],
  },
  {
    type: "popup-input",
    name: "learning_materials",
    label: "Volunteers Learning Materials",
    fieldtype: "text",
    placeholder: "Add Volunteers Learning Materials",
    inputRules: {
      // required: 'This field is required',
    },
    width: "w-full",
    icon: "add",
    for: ["mentor"],
  },
  {
    type: "popup-input",
    name: "equipments",
    label: "Relevant Equipment",
    fieldtype: "text",
    placeholder: "Add Relevant Equipment",
    inputRules: {
      // required: 'This field is required',
    },
    width: "w-full",
    icon: "add",
    for: ["mentor"],
  },
  {
    type: "input",
    name: "max_mentee_count",
    label: "Maximum Volunteer Limits",
    fieldtype: "number",
    placeholder: "Select Maximum Volunteer Limits",
    inputRules: {
      // required: 'This field is required',
    },
    width: "width-32",
    for: ["mentor"],
  },
  {
    type: "dropdown",
    name: "group_chat_requirement",
    label: "If you need Group Chat Discussions for this Program",
    placeholder: "Select",
    inputRules: {
      // required: 'This field is required',
    },
    options: [
      {
        key: "true",
        value: "Yes",
      },
      {
        key: "false",
        value: "No",
      },
    ],
    width: "width-32",
    for: ["mentor"],
  },
  {
    type: "dropdown",
    name: "individual_chat_requirement",
    label: "If you need Individual chat discussions for this Program",
    placeholder: "Select",
    inputRules: {
      // required: 'This field is required',
    },
    options: [
      {
        key: "true",
        value: "Yes",
      },
      {
        key: "false",
        value: "No",
      },
    ],
    width: "width-32",
    for: ["mentor"],
  },
  {
    type: "dropdown",
    name: "program_mode",
    label: "Program Mode",
    placeholder: "Select",
    inputRules: {
      required: "This field is required",
    },
    options: [
      {
        key: "physical_location",
        value: "Physical Location",
      },
      {
        key: "virtual_meeting",
        value: "Virtual Meeting",
      },
    ],
    width: "w-full",
    for: ["mentor", "admin"],
  },
  {
    type: "input",
    name: "address_line1",
    label: "Address 1",
    placeholder: "Enter Address 1",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
    for: ["admin", "mentor"],
  },
  {
    type: "input",
    name: "address_line2",
    label: "Address 2",
    placeholder: "Enter Address 2",
    inputRules: {
      // required: 'This field is required',
    },
    width: "width-32",
    for: ["admin", "mentor"],
  },
  {
    type: "asyncSelect",
    name: "state",
    label: "State",
    placeholder: "Enter State",
    inputRules: {
      required: "This field is required",
    },
    options: [],
    width: "width-32",
    for: ["admin", "mentor"],
  },
  {
    type: "asyncSelect",
    name: "city",
    label: "City",
    placeholder: "Enter City",
    inputRules: {
      required: "This field is required",
    },
    options: [],
    width: "width-32",
    for: ["admin", "mentor"],
  },
  {
    type: "asyncSelect",
    name: "zip_code",
    label: "Zip code",
    placeholder: "Enter Zip code",
    inputRules: {
      required: "This field is required",
      pattern: {
        value: /^\d{5}(-\d{4})?$/,
        message: "ZIP code must be in the format XXXXX or XXXXX-XXXX.",
      },
    },
    width: "width-32",
    for: ["admin", "mentor"],
  },
];

export const AboutProgramFields = [
  {
    type: "textbox",
    name: "benefits",
    label: "Benefits",
    placeholder: "Enter benefits details",
    inputRules: {
      // required: 'This field is required',
    },
    width: "w-full",
    for: ["mentor"],
  },

  {
    type: "popup-input",
    name: "goals",
    label: "Goals",
    fieldtype: "text",
    placeholder: "Multiple goals added",
    inputRules: {
      // required: 'This field is required',
    },
    width: "w-full",
    icon: "add",
    for: ["mentor", "admin"],
  },

  {
    type: "popup-input",
    name: "certifications",
    label: "Program Certificates",
    fieldtype: "text",
    placeholder: "Add Certificates",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
    icon: "add",
    for: ["admin", "mentor"],
  },

  {
    type: "textbox",
    name: "skill_details",
    label: "Skills description",
    placeholder: "Enter skills description",
    inputRules: {
      // required: 'This field is required',
    },
    width: "w-full",
    for: ["mentor"],
  },

  // {
  //   type: 'popup-input',
  //   name: 'skills',
  //   label: 'Skills Gained',
  //   fieldtype: 'text',
  //   placeholder: 'Multiple Skills added',
  //   inputRules: {
  //     // required: 'This field is required',
  //   },
  //   width: 'w-full',
  //   icon: 'add',
  //   for: ['mentor'],
  // },
  {
    type: "file",
    name: "program_image",
    label: "Program Banner",
    fieldtype: "text",
    placeholder: "Multiple Skills added",
    inputRules: {
      // required: 'This field is required',
    },
    width: "w-full",
    for: ["mentor"],
    is_image: true,
  },
  {
    type: "radio",
    name: "is_sponsored",
    label: "Sponsor Availability:",
    placeholder: "",
    options: [
      { key: "true", value: "Yes" },
      { key: "false", value: "No" },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    for: ["admin", "mentor"],
  },
  {
    type: "input",
    name: "enrollment_fees",
    label: "Fees",
    fieldtype: "number",
    placeholder: "Enter fees",
    inputRules: {
      valueAsNumber: true,
      required: "This field is required",
    },
    width: "width-82",
    for: ["admin", "mentor"],
  },
  {
    type: "file",
    name: "sponsor_logos",
    label: "Add Sponsor Logo",
    fieldtype: "text",
    placeholder: "Multiple Skills added",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
    for: ["admin", "mentor"],
  },
];

export const ProgramTestimonialsFields = [
  {
    type: "popup-input",
    name: "members",
    label: "Members",
    placeholder: "Add request for testimonials",
    fieldtype: "text",
    inputRules: {
      // required: 'This field is required',
    },
    width: "w-full",
    icon: "add",
    for: ["mentor"],
  },
  {
    type: "dropdown",
    name: "testimonial_types",
    label: "Testimonials Type",
    placeholder: "",
    inputRules: {
      // required: 'This field is required',
    },
    options: [
      {
        key: "video",
        value: "Video",
      },
      {
        key: "pdf",
        value: "PDF",
      },
      {
        key: "image",
        value: "Image",
      },
      {
        key: "blog",
        value: "Blog",
      },
      {
        key: "case_study",
        value: "Case Studies",
      },
      {
        key: "success_story",
        value: "Success Story",
      },
    ],
    width: "w-full",
    for: ["mentor"],
  },
  {
    type: "textbox",
    name: "testimonial_description",
    label: "Description",
    placeholder: "",
    inputRules: {
      // required: 'This field is required',
    },
    width: "w-full",
    for: ["mentor"],
  },
];

export const ProgramFields = [
  ProgramInformationFields,
  AboutProgramFields,
  ProgramTestimonialsFields,
];

export const AssignMenteesFields = (bool = true, type, getValues) => {
  return [
    {
      type: "dropdown",
      name: "category_id",
      label: "Category",
      placeholder: "Select Category",
      inputRules: {
        required: "This field is required",
      },
      options: [
        {
          key: "yes",
          value: "Category 1",
        },
        {
          key: "no",
          value: "Category 2",
        },
      ],
      width: "width-32",
      disabled: bool,
    },
    {
      type: type === "new" ? "dropdown" : "input",
      name: "program_id",
      fieldtype: "text",
      label: "Program Name",
      placeholder: "Enter Program Name",
      inputRules: {
        required: "This field is required",
      },
      width: "width-32",
      disabled: bool,
      options: [],
    },
    {
      type: "input",
      name: "mentor",
      fieldtype: "text",
      label: "Program Manager Name",
      placeholder: "Enter Program Manager Name",
      inputRules: {
        // required: "This field is required",
      },
      width: "width-32",
      disabled: bool,
      options: [],
    },
    {
      type: "date",
      name: "start_date",
      label: "Program Start Date and Time",
      placeholder: "Select Program Start Date and Time",
      inputRules: {
        // required: "This field is required",
      },
      width: "width-32",
      disabled: true,
    },
    {
      type: "date",
      name: "end_date",
      label: "Program End Date and Time",
      placeholder: "Select Program End Date and Time",
      inputRules: {
        // required: "This field is required",
      },
      width: "width-32",
      disabled: true,
    },
    {
      type: "input",
      name: "duration",
      label: "Program Duration",
      fieldtype: "text",
      placeholder: "Program Duration",
      inputRules: {
        required: "This field is required",
      },
      width: "width-32",
      disabled: bool,
    },
    {
      type: "text",
      name: "mentees_list",
      label: "Add Volunteer for this Program",
      width: "w-full",
      inputRules: {
        required: "This field is required",
      },
    },
    {
      type: "input",
      name: "reference_links",
      fieldtype: "text",
      label: "Reference Book",
      placeholder: "Enter Reference Book with comma(,) seperators",
      inputRules: {
        required: "This field is required",
      },
      width: "w-full",
    },
    {
      type: "dropdown",
      name: "goal_id",
      fieldtype: "text",
      label: "Goals",
      placeholder: "Select Goals",
      // inputRules: {
      //   required: "This field is required",
      // },
      width: "w-full",
      // disabled: bool,
      options: [],
    },
    {
      type: "input",
      name: "task_name",
      fieldtype: "text",
      label: "Task Name",
      placeholder: "Enter Task Name",
      inputRules: {
        required: "This field is required",
      },
      width: "w-full",
    },
    {
      type: "editor",
      name: "task_details",
      fieldtype: "text",
      label: "Task Details",
      placeholder: "List out Task Details",
      inputRules: {
        required: "This field is required",
      },
      width: "w-full",
    },
    {
      type: "date",
      name: "due_date",
      label: "Due Date",
      placeholder: "Due Date",
      inputRules: {
        required: "This field is required",
      },
      width: "w-full",
    },
  ];
};

export const ReportFields = (bool = false) => [
  {
    type: "dropdown",
    name: "category",
    label: "Category",
    placeholder: "Select Category",
    inputRules: {
      required: "This field is required",
    },
    options: [],
    width: "w-[49.4%]",
    disabled: bool,
  },
  {
    type: "dropdown",
    name: "program",
    label: "Program Name",
    placeholder: "Select Program Name",
    inputRules: {
      required: "This field is required",
    },
    options: [],
    width: "w-[49.4%]",
    disabled: bool,
  },

  // {
  //   type: "dropdown",
  //   name: "mentor_manager",
  //   label: "Program Creator",
  //   placeholder: "Select Mentor Manager",
  //   inputRules: {
  //     // required: "This field is required",
  //   },
  //   options: [],
  //   width: 'width-32',
  // },
  {
    type: "input",
    name: "mentor_name",
    fieldtype: "text",
    label: "Program Manager Name",
    placeholder: "Program Manager Name",
    inputRules: {
      // required: "This field is required",
    },
    width: "width-32",
    disabled: true,
  },
  {
    type: "date",
    name: "start_date",
    label: "Program Start Date and Time",
    placeholder: "Select Program Start Date and Time",
    inputRules: {
      // required: "This field is required",
    },
    width: "width-32",
    disabled: true,
  },
  {
    type: "date",
    name: "end_date",
    label: "Program End Date and Time",
    placeholder: "Select Program End Date and Time",
    inputRules: {
      // required: "This field is required",
    },
    width: "width-32",
    disabled: true,
  },
  {
    type: "popup-input",
    name: "participated_mentees",
    label: "Participated Volunteers",
    placeholder: "Select Meneteed",
    inputRules: {
      // required: "This field is required",
    },
    options: [],
    width: "w-full",
    // disabled: false,
  },
  {
    type: "input",
    name: "report_name",
    fieldtype: "text",
    label: "Report Name",
    placeholder: "Report Name",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
  },
  {
    type: "editor",
    name: "description",
    fieldtype: "text",
    label: "Report Link",
    placeholder: "Report Link",
    // inputRules: {
    //   required: 'This field is required',
    // },
    width: "w-full",
    disabled: bool,
  },
];

export const EditProfileFields = [
  {
    type: "input",
    name: "name",
    fieldtype: "text",
    label: "Name",
    placeholder: "Enter Name",
    inputRules: {
      required: "This field is required",
    },
    width: "width-49",
    disabled: true,
  },
  {
    type: "input",
    name: "position",
    fieldtype: "text",
    label: "Postion",
    placeholder: "Enter Postion",
    inputRules: {
      required: "This field is required",
    },
    width: "width-49",
  },
  {
    type: "textbox",
    name: "professional_bio",
    label: "Professional Bio",
    placeholder: "Enter Professional Bio",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
    disabled: true,
  },
  {
    type: "input",
    name: "link",
    fieldtype: "text",
    label: "Link",
    placeholder: "Enter Link",
    inputRules: {
      required: "This field is required",
    },
    width: "width-49",
  },
  {
    type: "input",
    name: "email",
    fieldtype: "text",
    label: "Email",
    placeholder: "Enter Email",
    inputRules: {
      required: "This field is required",
    },
    width: "width-49",
    disabled: true,
  },
  {
    type: "input",
    name: "phone_number",
    // fieldtype: 'number',
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    inputRules: {
      required: "This field is required",
      pattern: { ...phoneValidaionRule },
    },
    width: "width-49",
  },
  {
    type: "input",
    name: "location",
    fieldtype: "text",
    label: "Location",
    placeholder: "Enter Location",
    inputRules: {
      required: "This field is required",
    },
    width: "width-49",
    icon: "location",
  },
  {
    type: "input",
    name: "address",
    fieldtype: "text",
    label: "Address",
    placeholder: "Enter Address",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
  },
  {
    type: "input",
    name: "social_media",
    fieldtype: "text",
    label: "Social Media",
    placeholder: "Social Media",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
  },
  // {
  //   type: "logo",
  //   name: "logo",
  //   fieldtype: "text",
  //   label: "Social Media",
  //   placeholder: "Enter Address",
  //   inputRules: {
  //     required: "This field is required",
  //   },
  //   width: 'w-full',
  // }
];

export const reportColumns = [
  {
    field: "name",
    headerName: "Report Name",
    flex: 1,
    id: 3,
    status: ["all", "new", "pending", "approved", "rejected", "draft"],
  },
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 0,
    status: ["all", "new", "pending", "approved", "rejected", "draft"],
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 1,
    status: ["all", "new", "pending", "approved", "rejected", "draft"],
  },
  {
    field: "participates_count",
    headerName: "Volunteer",
    flex: 1,
    id: 2,
    status: ["all", "new", "pending", "approved", "rejected", "draft"],
  },
  // {
  //   field: 'created_at',
  //   headerName: 'Create Time/ Date',
  //   flex: 1,
  //   id: 4,
  //   status: ['all', 'new', 'pending', 'approved', 'rejected']
  // },
  {
    field: "created_at",
    headerName: "Requested Date",
    flex: 1,
    id: 4,
    status: ["all", "new", "pending", "approved", "rejected"],
    renderCell: (params) => <span>{dateFormat(params.row.created_at)}</span>,
  },
  {
    field: "approved_date",
    headerName: "Approved Time/ Date",
    flex: 1,
    id: 5,
    status: ["all", "approved"],
    renderCell: (params) => <span>{dateFormat(params.row.approved_date)}</span>,
  },
  {
    field: "approved_by_full_name",
    headerName: "Approved by",
    flex: 1,
    id: 6,
    status: ["all", "approved"],
  },
  {
    field: "updated_at",
    headerName: "Last updated Date",
    flex: 1,
    id: 5,
    status: ["all", "new", "pending", "approved", "rejected"],
    renderCell: (params) => <span>{dateFormat(params.row.updated_at)}</span>,
  },
  {
    field: "last_updated_by",
    headerName: "Last updated by",
    flex: 1,
    id: 6,
    status: ["all", "new", "pending", "approved", "rejected"],
  },
  // {
  //   field: 'rejected_date',
  //   headerName: 'Rejected Date',
  //   flex: 1,
  //   id: 7,
  //   status: ['all', 'cancel'],
  //   renderCell: (params) => <span>{dateFormat(params.row.rejected_date)}</span>
  // },
  // {
  //   field: 'rejecter',
  //   headerName: 'Rejected by',
  //   flex: 1,
  //   id: 8,
  //   status: ['all', 'cancel']
  // },
  // {
  //   field: 'file',
  //   headerName: 'File',
  //   flex: 1,
  //   id: 9,
  //   status: ['all', 'new', 'pending', 'approved', 'cancel', 'draft']
  // },
];

export const myMentorColumns = [
  {
    field: "designation",
    headerName: "Designation",
    flex: 1,
    id: 1,
  },
  {
    field: "skills",
    headerName: "Skills",
    flex: 1,
    id: 2,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 3,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    id: 4,
  },
];

export const CreateMeetingFields = [
  {
    type: "input",
    name: "title",
    fieldtype: "text",
    label: "Add Title",
    placeholder: "Enter Title",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
  },
  {
    type: "dropdown",
    name: "date_category",
    label: "Date",
    placeholder: "Select Date",
    inputRules: {
      required: "This field is required",
    },
    options: [
      {
        key: "do_not_repeat",
        value: "Does Not repeat",
      },
      {
        key: "daily",
        value: "Daily",
      },
      {
        key: "every_week",
        value: "Every weekday(Monday to Friday)",
      },
      {
        key: "weekly",
        value: `Weekly On ${currentDayName}`,
      },
      {
        key: "custom",
        value: "Custom",
      },
    ],
    width: "width-32",
  },
  {
    type: "time",
    name: "start",
    fieldtype: "time",
    label: "Start Time",
    placeholder: "Start Time",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
  },
  {
    type: "time",
    name: "end",
    fieldtype: "time",
    label: "End Time",
    placeholder: "End Time",
    inputRules: {
      required: "This field is required",
    },
    width: "width-32",
  },
  {
    type: "dropdown",
    name: "notification_time",
    label: "Add Notification",
    placeholder: "Select Date",
    inputRules: {
      required: "This field is required",
    },
    options: [
      {
        key: "5",
        value: "5",
      },
      {
        key: "10",
        value: "10",
      },
      {
        key: "15",
        value: "15",
      },
      {
        key: "20",
        value: "20",
      },
      {
        key: "25",
        value: "25",
      },
      {
        key: "30",
        value: "30",
      },
    ],
    width: "w-[10%]",
  },

  {
    type: "dropdown",
    name: "notification_type",
    label: "",
    placeholder: "Minutes",
    inputRules: {
      required: "This field is required",
    },
    options: [
      {
        key: "minutes",
        value: "Minutes",
      },
      {
        key: "hours",
        value: "Hours",
      },
    ],
    width: "w-[21.5%]",
  },
  {
    type: "input",
    name: "guests",
    fieldtype: "text",
    label: "Add Guest(Optional)",
    placeholder: "Enter Guests",
    inputRules: {},
    width: "w-[66%]",
  },
  {
    type: "popup-input",
    name: "attendees",
    label: "Add Volunteer",
    fieldtype: "text",
    placeholder: "Select Volunteer",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
    icon: "add",
  },
  {
    type: "dropdown",
    name: "event",
    label: "Event",
    placeholder: "Select the Event",
    inputRules: {
      required: "This field is required",
    },
    options: [
      {
        key: "all_event",
        value: "All Event",
      },
      {
        key: "this_event",
        value: "This Event",
      },
      {
        key: "this_event_and_following_events",
        value: "This Event And Following Events",
      },
    ],
    width: "w-full",
  },
];

export const CreateCertificateFields = [
  {
    type: "dropdown",
    name: "category",
    label: "Category",
    placeholder: "Select Category",
    inputRules: {
      required: "This field is required",
    },
    options: [],
    width: "width-32",
  },
  {
    type: "dropdown",
    name: "program",
    label: "Program Name",
    placeholder: "Select Program Name",
    inputRules: {
      required: "This field is required",
    },
    options: [],
    width: "width-32",
  },
  {
    type: "input",
    name: "mentor_name",
    fieldtype: "text",
    label: "Program Manager Name",
    placeholder: "Program Manager Name",
    inputRules: {},
    width: "width-32",
    disabled: true,
  },
  {
    type: "input",
    name: "course_level",
    fieldtype: "text",
    label: "Course Level",
    placeholder: "Course Level",
    inputRules: {},
    width: "width-32",
    disabled: true,
  },
  {
    type: "date",
    name: "start_date",
    label: "Program Start Date and Time",
    placeholder: "Select Program Start Date and Time",
    inputRules: {},
    width: "width-32",
    disabled: true,
  },
  {
    type: "date",
    name: "end_date",
    label: "Program End Date and Time",
    placeholder: "Select Program End Date and Time",
    inputRules: {},
    width: "width-32",
    disabled: true,
  },
  {
    type: "input",
    name: "duration",
    label: "Duration",
    placeholder: "Duration",
    inputRules: {},
    width: "w-[49%]",
    disabled: true,
  },
  {
    type: "popup-input",
    name: "participated_mentees",
    label: "Participated Volunteer",
    placeholder: "Select Volunteer",
    inputRules: {},
    options: [],
    width: "w-[49%]",
  },
  {
    type: "popup-input",
    name: "pass_mentee_list",
    label: "Pass Volunteer",
    placeholder: "Select Volunteer",
    inputRules: {},
    options: [],
    width: "w-[49%]",
  },
  {
    type: "popup-input",
    name: "fail_mentee_list",
    label: "No Pass Volunteer",
    placeholder: "Select Volunteer",
    inputRules: {},
    options: [],
    width: "w-[49%]",
  },
];

export const ProfileFields = [
  {
    type: "input",
    name: "first_name",
    fieldtype: "text",
    label: "First Name",
    placeholder: "Enter First Name",
    inputRules: {},
    disabled: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "last_name",
    fieldtype: "text",
    label: "Last Name",
    placeholder: "Enter Last Name",
    inputRules: {},
    disabled: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "phone_number",
    fieldtype: "number",
    label: "Primary Contact Number",
    placeholder: "Enter Primary Contact Number",
    inputRules: {
      required: "This field is required",
      pattern: {
        value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
        message: "Invalid phone number format",
      },
    },
    width: "col-span-2",
  },
  {
    type: "input",
    name: "secondary_phone_number",
    fieldtype: "number",
    label: "Secondary Contact Number",
    placeholder: "Enter Secondary Contact Number",
    inputRules: {
      pattern: {
        value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
        message: "Invalid phone number format",
      },
    },
    width: "col-span-2",
  },
  {
    type: "input",
    name: "email",
    fieldtype: "text",
    label: "Email",
    placeholder: "Enter Email",
    inputRules: {},
    disabled: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "address",
    fieldtype: "text",
    label: "Address",
    placeholder: "Enter Address",
    inputRules: {},
    width: "col-span-2",
  },
  {
    type: "input",
    name: "strongest_skills",
    fieldtype: "text",
    label: "Skills",
    placeholder: "Enter skills",
    inputRules: {},
    width: "col-span-2",
  },
  // {
  //   type: 'input',
  //   name: 'category',
  //   fieldtype: 'text',
  //   label: 'Category',
  //   placeholder: 'Enter category',
  //   inputRules: {},
  //   width: 'col-span-2',
  // },
  {
    type: "input",
    name: "Professional_Bio",
    fieldtype: "text",
    label: "Professional Bio",
    placeholder: "Enter category",
    inputRules: {},
    width: "col-span-6",
  },
  // {
  //   type: 'input',
  //   name: 'documents',
  //   fieldtype: 'text',
  //   label: 'Documents',
  //   placeholder: 'Enter category',
  //   inputRules: {},
  //   width: 'col-span-6',
  // },
];

export const categoryCreateEditFields = [
  {
    type: "input",
    name: "category_name",
    fieldtype: "text",
    label: "Category Name",
    placeholder: "Enter Category Name",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
    for: ["admin"],
  },
  {
    type: "textbox",
    name: "description",
    label: "Description",
    placeholder: "Enter Description",
    inputRules: {
      required: "This field is required",
    },
    width: "w-full",
    for: ["admin"],
  },
];

export const EquipmentTableColumn = [
  {
    field: "equipment_name",
    headerName: "Equipment Name",
    flex: 1,
    id: 1,
  },
  {
    field: "equipment_category",
    headerName: "Category",
    flex: 1,
    id: 1,
    renderCell: (params) => (
      <span>
        {(params?.row?.equipment_category).charAt(0).toUpperCase() +
          (params?.row?.equipment_category).slice(1)}
      </span>
    ),
  },
  {
    field: "equipment_type",
    headerName: "Type",
    flex: 1,
    id: 1,
    renderCell: (params) => (
      <span>
        {(params?.row?.equipment_type).charAt(0).toUpperCase() +
          (params?.row?.equipment_type).slice(1)}
      </span>
    ),
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    id: 1,
    renderCell: (params) => (
      <span>{`${params?.row?.city ? params?.row?.city : "-"}${params?.row?.state ? "," : ""
        }${params?.row?.state ? params?.row?.state : ""}`}</span>
    ),
  },
  {
    field: "equipment_descriptions",
    headerName: "Description",
    flex: 1,
    id: 1,
  },
  {
    field: "updated_by",
    headerName: "Last Updated By",
    flex: 1,
    id: 1,
    renderCell: (params) => (
      <span>{params?.row?.changed_by_detail?.full_name ?? "..."}</span>
    ),
  },
  {
    field: "updated_date",
    headerName: "Last Updated Date",
    flex: 1,
    id: 1,
    renderCell: (params) => (
      <span>
        {params?.row?.changed_at
          ? moment(new Date(params?.row?.changed_at)).format("MM-DD-YYYY")
          : "..."}
      </span>
    ),
  },
  {
    field: "deactivated_date",
    headerName: "Deactivated Date",
    flex: 1,
    id: 1,
    renderCell: (params) => (
      <span>
        {params?.row?.equipment_deactivated_date
          ? moment(new Date(params?.row?.equipment_deactivated_date)).format(
            "DD/MM/YYYY"
          )
          : "..."}
      </span>
    ),
  },
];

export const PersonalInfoFields = [
  {
    type: "input",
    name: "first_name",
    fieldtype: "text",
    label: "First Name",
    placeholder: "Enter First Name",
    inputRules: {
      required: "This field is required",
    },
    size: true,
    disabled: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "last_name",
    fieldtype: "text",
    label: "Last Name",
    placeholder: "Enter Last Name",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    disabled: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "email",
    fieldtype: "email",
    label: "E-mail",
    placeholder: "Enter Email",
    inputRules: {
      required: "This field is required",
    },
    size: true,
    disabled: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "phone_number",
    // fieldtype: 'number',
    label: "Primary Number",
    placeholder: "Enter Primary Contact Number",
    inputRules: {
      required: "This field is required",
      pattern: {
        value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
        message: "Invalid phone number format",
      },
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "secondary_phone_number",
    // fieldtype: 'number',
    label: "Secondary Contact Number",
    placeholder: "Enter Secondary Contact Number",
    inputRules: {
      pattern: {
        value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
        message: "Invalid phone number format",
      },
    },
    size: true,
    width: "col-span-2",
  },
  // {
  //   type: 'input',
  //   name: 'phone_number',
  //   fieldtype: 'number',
  //   label: 'Primary Contact Number',
  //   placeholder: 'Enter Primary Contact Number',
  //   inputRules: {
  //     required: 'This field is required',
  //     pattern: {
  //       value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
  //       message: 'Invalid phone number format',
  //     },
  //   },
  //   size: true,
  //   width: 'col-span-2',
  // },
  // {
  //   type: "input",
  //   name: "secondary_phone_number",
  //   fieldtype: "number",
  //   label: "Secondary Contact Number",
  //   placeholder: "Enter Secondary Number",
  //   inputRules: {
  //     // required: "This field is required",
  //     pattern: {
  //       value: /^(\(\d{3}\) \d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/,
  //       message: "Invalid phone number format",
  //     },
  //   },
  //   size: true,
  //   width: "col-span-2",
  // },
  {
    type: "input",
    name: "address",
    label: "Address",
    placeholder: "Enter you address",
    inputRules: {
      // required: 'This field is required',
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "linked_in",
    fieldtype: "text",
    label: "LinkedIn Profile Link",
    placeholder: "Enter LinkedIn Profile Link",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "radio",
    name: "gender",
    label: "Gender",
    placeholder: "",
    options: [
      {
        key: "male",
        value: "male",
      },
      {
        key: "female",
        value: "female",
      },
      {
        key: "others",
        value: "others",
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "location",
    fieldtype: "text",
    label: "Location",
    placeholder: "Enter Location",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-2",
  },
  {
    type: "input",
    name: "professional_bio",
    fieldtype: "text",
    label: "Professional Bio",
    placeholder: "Enter your bio",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-6",
  },
];

export const reportAdminColumns = [
  {
    field: "name",
    headerName: "Report Name",
    flex: 1,
    id: 1,
    status: ["all", "approved", "rejected"],
  },
  {
    field: "created_by_full_name",
    headerName: "Program Manager Name",
    flex: 1,
    id: 1,
    status: ["approved", "rejected"],
  },
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 1,
    status: ["all", "approved", "rejected"],
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 1,
    status: ["all", "approved", "rejected"],
  },
  {
    field: "created_at",
    headerName: "Create Date",
    flex: 1,
    id: 1,
    status: ["all"],
  },
  {
    field: "participates_count",
    headerName: "Volunteer",
    flex: 1,
    id: 1,
    status: ["all", "approved", "rejected"],
  },
  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 1,
    status: ["approved", "rejected"],
  },
  {
    field: "updated_by_full_name",
    headerName: "Last Updated By",
    flex: 1,
    id: 1,
    status: ["approved", "rejected"],
  },

  // {
  //   field: 'designation',
  //   headerName: 'Designation',
  //   flex: 1,
  //   id: 1,
  // },
  // {
  //   field: 'designation',
  //   headerName: 'Designation',
  //   flex: 1,
  //   id: 1,
  // },
  // {
  //   field: 'designation',
  //   headerName: 'Designation',
  //   flex: 1,
  //   id: 1,
  // },
];

export const menteeTicketCreationField = [
  {
    type: "input",
    name: "subject",
    fieldtype: "text",
    label: "Ticket Subject",
    placeholder: "Ticket Subject",
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: "col-span-1",
  },
  {
    type: "file",
    name: "attachments",
    fieldtype: "file",
    label: "Document Upload",
    placeholder: "",
    inputRules: {
      required: "This field is required",
    },
    size: false,
    width: "col-span-1",
  },
  {
    type: "textarea",
    name: "description",
    label: "Description",
    placeholder: "Enter Description",
    inputRules: {
      // required: 'Description is required',
    },
    width: "w-full",
    for: ["admin"],
  },
];
