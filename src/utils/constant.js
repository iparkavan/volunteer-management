export const StepsList = [
  {
    name: 'Personal Information',
    status: 'In-Progress',
    key: 'personal_information',
  },
  {
    name: 'Skills and Area of Expertise',
    status: 'Waiting',
    key: 'area_of_expertise',
  },
  {
    name: 'Educational Background',
    status: 'Waiting',
    key: 'educational_background',
  },
  {
    name: 'Program Managing Experience',
    status: 'Waiting',
    key: 'mentor_ship_experience',
  },
  {
    name: 'Goals and Expectations',
    status: 'Waiting',
    key: 'goals_expectations',
  },
  {
    name: 'Document Upload',
    status: 'Waiting',
    key: 'document_upload',
  },
];

export const MenteeStepsList = [
  {
    name: 'Personal Information',
    status: 'In-Progress',
    key: 'personal_information',
  },
  {
    name: 'Current Status',
    status: 'Waiting',
    key: 'current_status',
  },
  {
    name: 'Skills and Interests',
    status: 'Waiting',
    key: 'skills_and_interests',
  },
  {
    name: 'Expectations & Goals',
    status: 'Waiting',
    key: 'expectations_goals',
  },
  {
    name: 'Long-term Vision',
    status: 'Waiting',
    key: 'long_term_vision',
  },
  {
    name: 'Document Upload',
    status: 'Waiting',
    key: 'document_upload',
  },
];

export const userStatus = {
  load: 'loaded',
  create: 'created',
  pending: 'pending',
  login: 'loggedin',
  token: 'tokenfetched',
  getToken: 'getToken',
  role: 'roleUpdated',
  otp: 'otpTriggered',
  otpSuccess: 'otpVerified',
  changePassword: 'passwordUpdated',
  questions: 'questionsUpdated',
  categoryPrograms: 'categoryprogramloaded',
};

export const programStatus = {
  load: 'loaded',
  create: 'programcreated',
  update: 'programupdated',
  exist: 'alreadyexist',
  error: 'error',
  curated: 'curated',
  yetToPlan: 'yettoplan',
  bookmarked: 'bookmarked',
  planned: 'planned',
  assigned: 'assigned',
  inProgress: 'inprogress',
  start: 'start',
  paused: 'paused',
  completed: 'completed',
  taskassigned: 'taskassigned',
  taskstarted: 'taskstarted',
  tasksubmitted: 'tasksubmitted',
};

export const goalStatus = {
  load: 'loaded',
  request: 'request',
  create: 'created',
  statusupdate: 'statusupdate',
  active: 'active',
  start: 'start',
  abort: 'abort',
  complete: 'complete',
  update: 'updated',
  delete: 'deleted',
};

export const feedStatus = {
  load: 'loaded',
  create: 'created',
  update: 'updated',
  delete: 'deleted',
  createcomment: 'createdcomment',
  postlike: 'postlike',
};

export const reportsStatus = {
  load: 'loaded',
  create: 'created',
  update: 'updated',
  delete: 'deleted',
};
export const certificateStatus = {
  load: 'loaded',
  create: 'created',
  update: 'updated',
  download: 'download',
  delete: 'deleted',
};

export const calendarStatus = {
  load: 'loaded',
  create: 'created',
};

export const requestStatus = {
  load: 'loaded',
  programupdate: 'programupdated',
  certificateupdate: 'certificateupdated',
  goalupdate: 'goalupdated',
  categoryload: 'categoryloaded',
  memberload: 'memberloaded',
  memberupdate: 'memberupdated',
  membercancel: 'membercancelled',
  reschedule: 'rescheduled',
  reportupdate: 'reportupdated',
  cancel: 'cancelled',
  autoapproval: 'autoapproval',
  testimonialupdate: 'testimonialupdated',
};

export const profileStatus = {
  load: 'loaded',
  update: 'updated',
  image: 'imageupdated',
};

export const goalPeriods = [
  {
    name: '1 Month',
    value: 1,
  },
  {
    name: '3 Months',
    value: 3,
  },
  {
    name: '6 Months',
    value: 6,
  },
  {
    name: '12 Months',
    value: 12,
  },
];
export const StatusbuttonStyles = {
  base: {
    borderRadius: '5px',
    padding: '12px 64px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  },
  gradient: {
    background: 'linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)',
  },
  success: {
    background: '#16B681',
  },
  danger: {
    border: '1px solid #E0382D',
    color: '#E0382D',
  },
};

export const activityStatusColor = {
  create: 'rgba(29, 91, 191, 1)',
  active: 'rgba(18, 179, 71, 1)',
  delete: 'rgba(224, 56, 45, 1)',
  complete: 'rgba(0, 174, 189, 1)',
  ongoing: 'rgba(255, 212, 27, 1)',
  abort: 'rgba(255, 0, 215, 1)',
  update: 'rgba(255, 118, 0, 1)',
  approve: 'rgba(0, 174, 189, 1)'
};

export const goalDataStatus = {
  inactive: 'Not Active Goal',
  create: 'Waiting for Approval',
  pending: 'Waiting for Approval',
  active: 'Active',
  ongoing: 'Ongoing',
  completed: 'Completed',
  aborted: 'Aborted',
  new: 'New',
  cancel: 'Cancel',
};

export const goalStatusColor = {
  inactive: {
    color: 'rgba(255, 118, 0, 1)',
    bg: 'rgba(255, 242, 231, 1)',
  },
  create: {
    color: 'rgba(255, 118, 0, 1)',
    bg: 'rgba(255, 242, 231, 1)',
  },
  pending: {
    color: 'rgba(255, 118, 0, 1)',
    bg: 'rgba(255, 242, 231, 1)',
  },
  active: {
    color: 'rgba(255, 212, 27, 1)',
    bg: 'rgba(255, 247, 216, 1)',
  },
  ongoing: {
    color: 'rgba(255, 118, 0, 1)',
    bg: 'rgba(255, 242, 231, 1)',
  },
  completed: {
    color: 'rgba(47, 147, 132, 1)',
    bg: 'rgba(218, 252, 231, 1)',
  },
  aborted: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  cancel: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
};

export const goalRequestStatus = {
  inactive: 'Inactive',
  active: 'Active',
  new: 'New',
  pending: 'Pending',
  accept: 'Accept',
  decline: 'Decline',
  cancel: 'Cancel',
  in_progress: 'In Progress',
  completed: 'Completed',
};
export const goalHeadingStatus = {
  inactive: 'Inactive Goal',
  active: 'Active Goal',
  new: 'New Goal',
  pending: 'Pending Goal',
  accept: 'Accept Goal',
  decline: 'Declined Goal',
  cancel: 'Cancelled Goal',
  in_progress: 'Goal In Progress',
  completed: 'Completed Goal',
};

export const goalRequestColor = {
  inactive: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  new: {
    color: 'rgba(29, 91, 191, 1)',
    bg: 'rgba(238, 245, 255, 1)',
  },
  create: {
    color: 'rgba(29, 91, 191, 1)',
    bg: 'rgba(238, 245, 255, 1)',
  },
  active: {
    color: 'rgba(255, 212, 27, 1)',
    bg: 'rgba(255, 247, 216, 1)',
  },
  accept: {
    color: 'rgba(22, 182, 129, 1)',
    bg: 'rgba(235, 255, 243, 1)',
  },
  pending: {
    color: 'rgba(255, 213, 0, 1)',
    bg: 'rgba(255, 251, 233, 1)',
  },
  decline: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  cancel: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  in_progress: {
    color: 'rgba(255, 118, 0, 1)',
    bg: 'rgba(255, 242, 231, 1)',
  },
  completed: {
    color: 'rgba(47, 147, 132, 1)',
    bg: 'rgba(218, 252, 231, 1)',
  },
};

export const certificateText = {
  inprogress: 'In-Progress',
  yettoapprove: 'Yet to Approve',
  yettojoin: 'Yet to Join',
  yettostart: 'Yet to Start',
  assigned: 'Assigned',
  paused: 'Paused',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const resultText = {
  Pass: 'Pass',
  Fail: 'No Pass',
};

export const certificateResultText = {
  pass: 'Pass',
  fail: 'No Pass',
};

export const empty = [
  {
    title: '',
    value: 100,
    color: 'rgba(0, 174, 189, 1)',
  },
];
export const resultColor = {
  Pass: {
    color: 'rgba(47, 147, 132, 1)',
    bg: 'rgba(218, 252, 231, 1)',
  },
  Fail: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
};

export const certificateResultColor = {
  pass: {
    color: 'rgba(47, 147, 132, 1)',
    bg: 'rgba(218, 252, 231, 1)',
  },
  fail: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
};
export const certificateColor = {
  yettoapprove: {
    color: '#000',
    bg: '#fff',
  },
  yettostart: {
    color: '#000',
    bg: '#fff',
  },
  assigned: {
    color: '#000',
    bg: '#fff',
  },
  yettojoin: {
    color: 'rgba(255, 212, 27, 1)',
    bg: 'rgba(255, 247, 216, 1)',
  },
  inprogress: {
    color: 'rgba(255, 118, 0, 1)',
    bg: 'rgba(255, 242, 231, 1)',
  },
  completed: {
    color: 'rgba(47, 147, 132, 1)',
    bg: 'rgba(218, 252, 231, 1)',
  },
  paused: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  cancelled: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
};

export const requestStatusText = {
  new: 'New',
  pending: 'Pending',
  accept: 'Accept',
  launched: 'Launched',
  cancel: 'Cancel',
  Wating_for_response: 'Wating for Response',
  active: 'Active',
  deactivated: 'Deactivated',
  rejected: 'Rejected',
  approved: 'Approved',
  in_progress: 'In Progress',
  cancelled: 'Cancelled',
};
export const certificateRequestStatusText = {
  new: 'New',
  pending: 'Pending',
  accept: 'Accept',
  launched: 'Launched',
  cancel: 'Cancel',
  Wating_for_response: 'Wating for your Response',
  active: 'Active',
  deactivated: 'Deactivated',
  approved: 'Approved',
  rejected: 'Rejected',
};
export const programStatusText = {
  inprogress: 'Ongoing',
  completed: 'Completed',
  cancelled: 'Cancelled',
  new_program_request_rejected: 'Rejected',
  yettojoin: 'Yet to Launch',
  yettostart: 'Yet to Start',
  draft: 'Draft',
  yettoapprove: 'Waiting for Approval',
};

export const programStatusColor = {
  yettojoin: {
    bgColor: 'rgba(238, 245, 255, 1)',
    color: 'rgba(29, 91, 191, 1)',
  },
  yettostart: {
    bgColor: 'rgba(255, 251, 233, 1)',
    color: 'rgba(255, 213, 0, 1)',
  },
  completed: {
    bgColor: 'rgba(235, 255, 243, 1)',
    color: '#33bc93',
  },
  cancelled: {
    bgColor: 'rgba(255, 231, 231, 1)',
    color: 'rgba(224, 56, 45, 1)',
  },

  draft: {
    bgColor: 'rgba(207, 225, 255, 1)',
    color: 'rgba(29, 91, 191, 1)',
  },
  yettoapprove: {
    bgColor: 'rgba(255, 251, 233, 1)',
    color: 'rgba(255, 213, 0, 1)',
  },
  new_program_request_rejected: {
    bgColor: 'rgba(255, 231, 231, 1)',
    color: 'rgba(224, 56, 45, 1)',
  },
  inprogress: {
    bgColor: '#ffead1',
    color: '#ffb155',
  },
};

export const requestStatusColor = {
  new: {
    bgColor: 'rgba(238, 245, 255, 1)',
    color: 'rgba(29, 91, 191, 1)',
  },
  pending: {
    bgColor: 'rgba(255, 251, 233, 1)',
    color: 'rgba(255, 213, 0, 1)',
  },
  Wating_for_response: {
    bgColor: 'rgba(255, 251, 233, 1)',
    color: 'rgba(29, 91, 191, 1)',
  },
  accept: {
    bgColor: 'rgba(235, 255, 243, 1)',
    color: 'rgba(22, 182, 129, 1)',
  },
  launched: {
    bgColor: 'rgba(235, 255, 243, 1)',
    color: 'rgba(22, 182, 129, 1)',
  },
  cancel: {
    bgColor: 'rgba(255, 231, 231, 1)',
    color: 'rgba(224, 56, 45, 1)',
  },
  active: {
    bgColor: 'rgba(235, 255, 243, 1)',
    color: 'rgba(22, 182, 129, 1)',
  },
  deactivated: {
    bgColor: 'rgba(207, 225, 255, 1)',
    color: 'rgba(29, 91, 191, 1)',
  },
  review: {
    bgColor: 'rgba(207, 225, 255, 1)',
    color: 'rgba(29, 91, 191, 1)',
  },
  rejected: {
    bgColor: 'rgba(255, 231, 231, 1)',
    color: 'rgba(224, 56, 45, 1)',
  },
  approved: {
    bgColor: 'rgba(235, 255, 243, 1)',
    color: 'rgba(22, 182, 129, 1)',
  },
  in_progress: {
    bgColor: 'rgba(255, 242, 231, 1)',
    color: 'rgba(255, 118, 0, 1)',
  },
  cancelled: {
    bgColor: 'rgba(255, 231, 231, 1)',
    color: 'rgba(224, 56, 45, 1)',
  },
};

export const memberStatusColor = {
  accept: {
    bgColor: 'rgba(235, 255, 243, 1)',
    color: 'rgba(22, 182, 129, 1)',
  },
  cancel: {
    bgColor: 'rgba(255, 231, 231, 1)',
    color: 'rgba(224, 56, 45, 1)',
  },
};

export const taskStatusText = {
  draft: 'Draft',
  inprogress: 'In-Progress',
  rejected: 'Cancel',
  pending: 'Pending',
  newtask: 'New',
  waiting_for_approval: 'Waiting',
  completed: 'Completed',
  reassigned: "Re Assigned"
};

export const ticketStatusText = {
  all: 'All',
  new: 'New',
  pending: 'Pending',
  inprogress: 'In_Progress',
  closed: 'Closed',
  reject: 'Reject',
};

// STATUS_CHOICES = [
//   ('new', 'New'),
//   ('in_progress', 'In Progress'),
//   ('closed', 'Closed'),
//   ('rejected', 'Rejected'),
//   ('pending', 'Pending'),
//   ('reopened', 'Reopened'),
// ];

export const TicketStatusColor = {
  all: {
    color: 'rgba(255, 212, 27, 1)',
    bg: 'rgba(255, 247, 216, 1)',
  },
  rejected: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  pending: {
    color: 'rgba(255, 213, 0, 1)',
    bg: 'rgba(255, 251, 233, 1)',
  },
  in_progress: {
    color: '#FF7600',
    bg: '#FFF2E7',
  },
  closed: {
    color: 'rgba(255, 213, 0, 1)',
    bg: 'rgba(255, 251, 233, 1)',
  },
  new: {
    color: 'rgba(29, 91, 191, 1)',
    bg: 'rgba(207, 225, 255, 1)',
  },
  resolved: {
    color: '#16B681',
    bg: '#EBFFF3',
  },
};

export const taskStatusColor = {
  draft: {
    color: 'rgba(255, 212, 27, 1)',
    bg: 'rgba(255, 247, 216, 1)',
  },
  rejected: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  pending: {
    color: 'rgba(255, 213, 0, 1)',
    bg: 'rgba(255, 251, 233, 1)',
  },
  inprogress: {
    color: 'rgba(29, 91, 191, 1)',
    bg: 'rgba(207, 225, 255, 1)',
  },
  waiting_for_approval: {
    color: 'rgba(255, 213, 0, 1)',
    bg: 'rgba(255, 251, 233, 1)',
  },
  newtask: {
    color: 'rgba(29, 91, 191, 1)',
    bg: 'rgba(207, 225, 255, 1)',
  },
  completed: {
    color: 'rgba(22, 182, 129, 1)',
    bg: 'rgba(235, 255, 243, 1)',
  },
  reassigned: {
    color: 'rgba(29, 91, 191, 1)',
    bg: 'rgba(207, 225, 255, 1)',
  },
};

export const reportStatusColor = {
  draft: {
    color: 'rgba(224, 56, 45, 1)',
    bg: '#fff',
  },
  new: {
    color: 'rgba(29, 91, 191, 1)',
    bg: 'rgba(238, 245, 255, 1)',
  },
  pending: {
    color: 'rgba(255, 213, 0, 1)',
    bg: 'rgba(255, 251, 233, 1)',
  },
  accept: {
    color: 'rgba(22, 182, 129, 1)',
    bg: 'rgba(235, 255, 243, 1)',
  },
  cancel: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  deleted: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  rejected: {
    color: 'rgba(224, 56, 45, 1)',
    bg: 'rgba(255, 231, 231, 1)',
  },
  approved: {
    color: 'rgba(22, 182, 129, 1)',
    bg: 'rgba(235, 255, 243, 1)',
  },
};

export const reportStatus = {
  pending: 'Pending',
  accept: 'Accept',
  cancel: 'Cancel',
  draft: 'Draft',
  new: 'New',
  deleted: 'Deleted',
  rejected: 'Rejected',
  approved: 'Approved',
};

export const reportAllStatus = {
  pending: 'pending',
  accept: 'accept',
  cancel: 'cancel',
  draft: 'draft',
  new: 'new',
};

export const PasswordRulesSet = {
  character: 'character',
  upperlowercase: 'upperlowercase',
  number: 'number',
  email: 'email',
  common: 'common',
};

export const statusAction = [
  'yettoapprove',
  'yettojoin',
  'yettostart',
  'inprogress',
  'completed',
  'cancelled',
  'bookmarked',
  'draft',
  'reschedule',
  'assign_program',  
];

export const programActionStatus = {
  all: 'all',
  yettoapprove: 'yettoapprove',
  yettojoin: 'yettojoin',
  yettostart: 'yettostart',
  yettoassign: 'yettoassign',
  assigned: 'assigned',
  paused: 'paused',
  inprogress: 'inprogress',
  completed: 'completed',
  started: 'started',
  cancelled: 'cancelled',
  learning: 'learning',
  bookmark: 'bookmarked',
  planned: 'planned',
  draft: 'draft',
  reschedule: 'reschedule',
  program_join_request_accepted: 'program_join_request_accepted',
  program_assign: 'assign_program',
  recent_join: 'recently_joined',
  ongoing: 'ongoing', 
};

export const pipeUrls = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  programs: '/programs',
  programdetails: '/program-details',
  programtask: '/program-task',
  assigntask: '/assign-task',
  assignmentess: '/assign-mentees',
  createprogram: '/create-program',
  startprogram: '/start-program',
  reports: '/reports',
  menteetask: '/mentee-tasks',
  mentortask: '/mentor-tasks',
};

export const programFilterUrls = {
  yettoapprove: `?type=${programActionStatus.yettoapprove}`,
  yettojoin: `?type=${programActionStatus.yettojoin}`,
  recent_join: `?type=${programActionStatus.recent_join}`,
  ongoing: `?type=${programActionStatus.ongoing}`,
  planned: `?type=${programActionStatus.planned}`,
  yettostart: `?type=${programActionStatus.yettostart}`,
  inprogress: `?type=${programActionStatus.inprogress}`,
  completed: `?type=${programActionStatus.completed}`,
  reschedule: `?type=${programActionStatus.reschedule}`,
  cancelled: `?type=${programActionStatus.cancelled}`,
  learning: `?type=${programActionStatus.learning}`,
  bookmark: `?type=${programActionStatus.bookmark}`,
  draft: `?type=${programActionStatus.draft}`,
  programAssign: `?type=${programActionStatus.program_assign}`,  
};

export const menteeCountStatus = {
  all: 'allprogram',
  [programActionStatus.inprogress]: 'ongoing',
  [programActionStatus.completed]: 'completed',
  [programActionStatus.yettojoin]: 'curated',
  [programActionStatus.learning]: 'mylearning',
  [programActionStatus.bookmark]: 'bookmark',
  [programActionStatus.planned]: 'planned',
};

export const programMenus = (page = 'dashboard') => {
  const pipeUrl = page === 'program' ? pipeUrls.programs : pipeUrls.dashboard;
  return [
    {
      name: 'All Programs',
      count: 0,
      page: pipeUrls.programs,
      for: ['mentor', 'mentee', 'admin'],
      mentorStatus: 'all',
      menteeStatus: 'allprogram',
      adminStatus: 'all',
      status: 'all',
    },
    {
      name: 'Active Programs',
      count: 0,
      page: `${pipeUrl}${programFilterUrls.yettojoin}`,
      menteePage: `${pipeUrl}${programFilterUrls.planned}`,
      for: ['admin', 'mentor', 'mentee'],
      mentorStatus: programActionStatus.yettojoin,
      adminStatus: programActionStatus.yettojoin,
      menteeStatus: 'planned',
      status: programActionStatus.yettojoin,
    },
    {
      name: 'Recently Joined Programs',
      count: 0,
      page: `${pipeUrl}${programFilterUrls.yettostart}`,
      menteePage: `${pipeUrl}${programFilterUrls.recent_join}`,
      for: ['mentor', 'admin', 'mentee'],
      mentorStatus: programActionStatus.yettostart,
      adminStatus: programActionStatus.yettostart,
      menteeStatus: 'recently_joined',
      status: programActionStatus.yettostart,
    },
    {
      name: 'Ongoing Programs',
      count: 0,
      page: `${pipeUrl}${programFilterUrls.inprogress}`,
      menteePage: `${pipeUrl}${programFilterUrls.ongoing}`,
      for: ['mentor', 'admin', 'mentee'],
      mentorStatus: programActionStatus.inprogress,
      adminStatus: programActionStatus.inprogress,
      menteeStatus: 'ongoing',
      status: programActionStatus.inprogress,
    },
    {
      name: 'Assign Programs',
      count: 0,
      page: `${pipeUrl}${programFilterUrls.programAssign}`,
      for: ['mentor', 'admin'],
      mentorStatus: programActionStatus.program_assign,
      adminStatus: programActionStatus.program_assign,
      status: programActionStatus.program_assign,
    },
    // {
    //   name: 'Drafted Programs',
    //   count: 0,
    //   page: `${pipeUrl}${programFilterUrls.draft}`,
    //   for: ['mentor'],
    //   mentorStatus: 'draft',
    //   menteeStatus: '',
    //   status: programActionStatus.draft,
    // },    

    {
      name: 'Bookmarked Programs',
      count: 0,
      page: `${pipeUrl}${programFilterUrls.bookmark}`,
      for: ['mentor', 'mentee', 'admin'],
      mentorStatus: programActionStatus.bookmark,
      menteeStatus: programActionStatus.bookmark,
      status: programActionStatus.bookmark,
    },
    {
      name: 'Rescheduled Programs',
      count: 0,
      page: `${pipeUrl}${programFilterUrls.reschedule}`,
      for: ['mentor', 'mentee', 'admin'],
      mentorStatus: 'reschedule',
      menteeStatus: 'reschedule',
      status: programActionStatus.reschedule,
    },
    {
      name: 'Completed Programs',
      count: 0,
      page: `${pipeUrl}${programFilterUrls.completed}`,
      for: ['mentor', 'mentee', 'admin'],
      mentorStatus: 'completed',
      menteeStatus: 'completed',
      status: programActionStatus.completed,
    },
    {
      name: 'Cancelled Programs',
      count: 0,
      page: `${pipeUrl}${programFilterUrls.cancelled}`,
      for: ['mentee', 'mentor', 'admin'],
      mentorStatus: 'cancelled',
      menteeStatus: 'cancelled',
      status: programActionStatus.cancelled,
    },
  ];
};

export const RequestStatusArray = [
  {
    key: 'program_request',
    name: 'Program Requests',
  },
  {
    key: 'member_join_request',
    name: 'Member Join Requests',
  },
  {
    key: 'goal_request',
    name: 'Goal Requests',
  },
  {
    key: 'resource_access_request',
    name: 'Resource Access Requests',
  },
  {
    key: 'technical_support_request',
    name: 'Technical Support Requests',
  },
  {
    key: 'testimonial_request',
    name: 'Testimonial Requests',
  },
  {
    key: 'certificate_request',
    name: 'Certificate Requests',
  },
  {
    key: 'report_request',
    name: 'Report Requests',
  },
  {
    key: 'learning_access_requests',
    name: 'Learning Access Requests',
  },
  {
    key: 'new_goals_request',
    name: 'Goal Requests',
  },
];

export const RequestStatus = {
  programRequest: {
    key: 'program_request',
    name: 'Program Requests',
  },
  memberJoinRequest: {
    key: 'member_join_request',
    name: 'Member Join Requests',
  },
  goalRequest: {
    key: 'goal_request',
    name: 'Goal Requests',
  },
  resourceAccessRequest: {
    key: 'resource_access_request',
    name: 'Resource Access Requests',
  },
  technicalSupportRequest: {
    key: 'technical_support_request',
    name: 'Technical Support Requests',
  },
  testimonicalRequest: {
    key: 'testimonial_request',
    name: 'Testimonial Requests',
  },
  certificateRequest: {
    key: 'certificate_request',
    name: 'Certificate Requests',
  },
  reportRequest: {
    key: 'report_request',
    name: 'Report Requests',
  },
  learningAccessRequests: {
    key: 'learning_access_requests',
    name: 'Learning Access Requests',
  },
  newGoalsRequests: {
    key: 'new_goals_request',
    name: 'Goal Requests',
  },
  extendedRequests: {
    key: 'extended_request',
    name: 'Extended Requests',
  },
  reOpenRequests: {
    key: 're_open_request',
    name: 'Re-open Requests',
  },
};

export const myRequestOverview = [
  {
    name: 'Program Requests',
    key: RequestStatus.programRequest.key,
    count: 0,
    status: RequestStatus.programRequest.key,
    for: ['admin', 'mentor', 'mentee'],
  },
  {
    name: 'Member Join Requests',
    key: RequestStatus.memberJoinRequest,
    count: 0,
    status: RequestStatus.memberJoinRequest.key,
    for: ['admin'],
  },
  // {
  //   name: 'Resource Access Requests',
  //   key: RequestStatus.resourceAccessRequest,
  //   count: 0,
  //   status: RequestStatus.resourceAccessRequest.key,
  //   for: ['admin', 'mentor'],
  // },
  {
    name: 'Goal Requests',
    key: RequestStatus.newGoalsRequests.key,
    count: 0,
    status: RequestStatus.newGoalsRequests.key,
    for: ['mentee', 'mentor'],
  },
  {
    name: 'Certificate Requests',
    key: RequestStatus.certificateRequest,
    count: 0,
    status: RequestStatus.certificateRequest.key,
    for: ['admin', 'mentor'],
  },
  {
    name: 'Report Requests',
    key: RequestStatus.reportRequest,
    count: 0,
    status: RequestStatus.reportRequest.key,
    for: ['admin', 'mentor'],
  },
  {
    name: 'Testimonial Requests',
    key: RequestStatus.testimonicalRequest,
    count: 0,
    status: RequestStatus.testimonicalRequest.key,
    for: ['admin', 'mentor'],
  },
  // {
  //   name: 'Technical Support Requests',
  //   key: RequestStatus.technicalSupportRequest,
  //   count: 0,
  //   status: RequestStatus.technicalSupportRequest.key,
  //   for: ['admin'],
  // },
  {
    name: 'Goal Requests',
    key: RequestStatus.goalRequest,
    count: 0,
    status: RequestStatus.goalRequest.key,
    for: ['admin'],
  },
  // {
  //   name: 'Extended Requests',
  //   key: RequestStatus.extendedRequests,
  //   count: 0,
  //   status: RequestStatus.extendedRequests.key,
  //   for: ['admin', 'mentor'],
  // },
  // {
  //   name: 'Re-open Requests',
  //   key: RequestStatus.reOpenRequests,
  //   count: 0,
  //   status: RequestStatus.reOpenRequests.key,
  //   for: ['mentor'],
  // },
  // {
  //   name: 'Learning Access Requests',
  //   key: RequestStatus.learningAccessRequests.key,
  //   count: 0,
  //   status: RequestStatus.learningAccessRequests.key,
  //   for: ['mentee'],
  // },
];

export const menteesRequestOverview = [
  {
    name: 'Program Requests',
    key: RequestStatus.programRequest.key,
    count: 0,
    status: RequestStatus.programRequest.key,
    for: ['mentor', 'admin'],
  },
  {
    name: 'Member Join Requests',
    key: RequestStatus.memberJoinRequest,
    count: 0,
    status: RequestStatus.memberJoinRequest.key,
    for: ['admin'],
  },
  // {
  //   name: 'Resource Access Requests',
  //   key: RequestStatus.resourceAccessRequest,
  //   count: 0,
  //   status: RequestStatus.resourceAccessRequest.key,
  //   for: ['mentor', 'admin'],
  // },
  {
    name: 'Goal Requests',
    key: RequestStatus.goalRequest,
    count: 0,
    status: RequestStatus.goalRequest.key,
    for: ['admin'],
  },
];

export const adminRequestOverview = [
  {
    name: 'Program Manager Changes request',
    key: RequestStatus.programRequest.key,
    count: 0,
    status: RequestStatus.programRequest.key,
    for: ['mentor'],
  },
  {
    name: 'Testimonial Requests',
    key: RequestStatus.testimonicalRequest,
    count: 0,
    status: RequestStatus.testimonicalRequest.key,
    for: ['admin'],
  },
];

export const allowedImagesTypes = ['png', 'jpeg', 'jpg'];

export const allowedDocTypes = ['pdf', 'doc', 'docx', 'txt'];

export const allowedVideoTypes = ['avi', 'mp4', 'mov'];

export const TaskFileTypes = [
  ...allowedImagesTypes,
  ...allowedDocTypes,
  ...allowedVideoTypes,
];

export const TaskAllStatus = {
  yettostart: 'yettostart',
  start: 'start',
  pending: 'pending',
  submitted: 'submitted',
  completed: 'completed',
  rejected: 'rejected',
  draft: 'draft',
  newtask: 'newtask',
  inprogress: 'inprogress',
};

export const TaskStatus = {
  newtask: 'New',
  yettostart: 'Start',
  rejected: 'Cancelled',
  start: 'In-Progress',
  inprogress: 'In-Progress',
  pending: 'Pending',
  completed: 'Completed',
  submitted: 'Submitted',
  cancelled: 'Cancelled',
  draft: 'Draft',
  waiting_for_approval: 'Waiting for Approval',
  reassigned: "Re Assigned"
};

export const TaskApiStatus = {
  update: 'update',
  create: 'create',
  load: 'loaded',
  updatemark: 'updatemark',
};

export const ProgramStatusInCard = {
  inprogress: {
    text: 'Ongoing',
    color: '#FF8A00',
    bg: '#FFE3C2',
  },
  yettojoin: {
    text: 'Start',
    color: '#FF8A00',
    bg: '#FFE3C2',
  },
  yettoapprove: {
    text: 'Waiting for Approval',
    color: '#FF8A00',
    bg: '#FFE3C2',
  },

  yettostart: {
    text: 'Ongoing',
    color: '#FF8A00',
    bg: '#FFE3C2',
  },
  started: {
    text: 'Ongoing',
    color: '#FF8A00',
    bg: '#FFE3C2',
  },
  assigned: {
    text: 'Ongoing',
    color: '#FF8A00',
    bg: '#FFE3C2',
  },
  paused: {
    text: 'Ongoing',
    color: '#FF8A00',
    bg: '#FFE3C2',
  },
  completed: {
    text: 'Completed',
    color: 'rgb(22, 182, 129)',
    bg: 'rgb(235, 255, 243)',
  },
  cancelled: {
    text: 'Cancelled',
    color: 'rgb(224, 56, 45)',
    bg: 'rgb(255, 231, 231)',
  },
  new_program_request_rejected: {
    text: 'Rejected',
    color: 'rgb(224, 56, 45)',
    bg: 'rgb(255, 231, 231)',
  },
};

export const programApprovalStage = {
  yettojoin: {
    status: 'yettojoin',
    text: 'Waiting for supervisor approval',
    type: 'waiting',
  },
  yettoapprove: {
    status: 'yettoapprove',
    text: 'Waiting for supervisor approval',
    type: 'waiting',
  },
  new_program_request_rejected: {
    status: 'new_program_request_rejected',
    text: 'Program request rejected by supervisor',
    type: 'reject',
  },
  join_request_submitted: {
    status: 'join_request_submitted',
    text: 'Waiting for join request supervisor approval',
    type: 'waiting',
  },
  join_request_rejected: {
    status: 'join_request_rejected',
    text: 'Join request rejected by supervisor',
    type: 'reject',
  },
  start_request_submitted: {
    status: 'start_request_submitted',
    text: 'Waiting for start request supervisor approval',
    type: 'waiting',
  },
  start_request_rejected: {
    status: 'start_request_rejected',
    text: 'Start request rejected by supervisor',
    type: 'reject',
  },
  schedule_request_submitted: {
    status: 'schedule_request_submitted',
    text: 'Waiting for schedule request supervisor approval',
    type: 'waiting',
  },
  cancel_request_submitted: {
    status: 'cancel_request_submitted',
    text: 'Waiting for cancel request supervisor approval',
    type: 'waiting',
  },
};

export const programWaitingActiveApproval = ['yettoapprove'];

export const programAdminRejected = [
  'new_program_request_rejected',
  'join_request_rejected',
  'start_request_rejected',
];

export const programNotLaunched = ['yettojoin'];

export const programRequestApproval = [
  'join_request_submitted',
  'start_request_submitted',
  'schedule_request_submitted',
  'cancel_request_submitted',
];

export const programNotStarted = [
  'yettoassigned',
  'assigned',
  'yettostart',
  'started',
  'start',
];

export const programInProgress = ['inprogress'];

export const programPaused = ['paused'];

export const programCompleted = ['completed'];

export const programCancelled = ['cancelled'];

export const programNotReady = ['yettoapprove', 'draft'];

export const menteeNotJoinCondition = [
  ...programNotReady,
  ...programCancelled,
  ...programCompleted,
  'program_join_request_submitted',
  'program_join_request_rejected',
  programActionStatus.yettojoin

];

export const menteeProgramStatus = {
  program_join_request_submitted: {
    status: 'program_join_request_submitted',
    text: 'Waiting for Program Manager approval',
    type: 'waiting',
  },
  program_join_request_rejected: {
    status: 'program_join_request_rejected',
    text: 'Join request rejected by Program Manager',
    type: 'reject',
  },
  program_join_request_accepted: {
    status: 'program_join_request_accepted',
    text: 'Join request accepted by Program Manager',
    type: 'success',
  },
};

export function capitalizeEachWord(string) {
  return string
    .split(' ') // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a single string
}

export const MentorMenteeProfileViewList = (hide) => {
  return [
    {
      label: 'First Name',
      value: 'first_name',
      grid: 4,
    },
    {
      label: 'Last Name',
      value: 'last_name',
      grid: 4,
    },
    {
      label: 'Primary Phone Number',
      value: 'phone_number',
      grid: 4,
    },
    {
      label: 'Secondary Contact Number',
      value: 'secondary_phone_number',
      grid: 4,
    },
    {
      label: 'Mail Id',
      value: 'email',
      grid: 4,
    },
    {
      label: 'Location',
      value: 'location',
      grid: 4,
    },
    {
      label: 'Skils',
      value: 'strongest_skills',
      grid: 4,
    },
    {
      label: 'Professional Bio',
      value: 'Professional_Bio',
      grid: 12,
    },
    {
      label: 'Documents',
      value: 'documents',
      grid: 12,
      hide: hide,
    },
  ];
};

export const followBtnText = {
  new: 'Follow',
  waiting: 'Requested',
  accepted: 'Unfollow',
};

export const equipmentStatusColor = {
  inuse: {
    color: '#FE634E',
    bg: '#FFF1E7',
  },
  available: {
    color: '#16B681',
    bg: '#EBFFF3',
  },
  deactivated: {
    color: '#BF453A',
    bg: '#FFE7E7',
  },
  archived: {
    color: '#4F4F4F',
    bg: '#DFDFDF',
  },
};

export const equipmentStatusText = {
  inuse: 'In Use',
  available: 'Available',
  archive: 'Archive',
  deactivated: 'Deactivated',
  archived: 'Archive',
};

export const taskStatus = {
  completed: 'Completed',
  rejected: 'Cancel',
  pending: 'Pending',
  new: 'New',
  cancel: 'Cancel',
  inprogress: 'In Progress',
  reassigned: 'Re Assigned'
};

export const taskStatusColorNew = {
  completed: {
    bg: '#EBFFF3',
    color: '#16B681',
  },
  rejected: {
    bg: '#FFE7E7',
    color: '#E0382D',
  },
  pending: {
    bg: '#FFFBE9',
    color: '#FFD500',
  },
  new: {
    bg: '#EEF5FF',
    color: '#1D5BBF',
  },
  cancel: {
    bg: '#FFE7E7',
    color: '#E0382D',
  },
  inprogress: {
    bg: '#FFFBE9',
    color: '#FFD500',
  },
  reassigned: {
    bg: '#EEF5FF',
    color: '#1D5BBF',
  }
};

export const view = {
  viewOnly: 'viewOnly',
};

export function getCurrentWeekAndDay(date = new Date()) {
  const currentDayOfMonth = date.getDate();
  const currentDayOfWeek = date.getDay();
  // console.log(currentDayOfMonth, currentDayOfWeek);

  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeekStart = startOfMonth.getDay();

  const adjustedDate = currentDayOfMonth + dayOfWeekStart;

  const weekNumber = Math.ceil(adjustedDate / 7);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDayName = daysOfWeek[currentDayOfWeek];

  return { weekNumber, currentDayName };
}

export const user = {
  mentor: 'mentor',
  mentee: 'mentee',
  admin: 'admin',
  super_admin: 'super_admin',
};

export const roleName = {
  mentor: 'Program Manager',
  mentee: 'Volunteer',
  admin: 'Supervisor',
  super_admin: 'Admin',
  fresher: "Fresher"
}

export const eqipmentStatusStyles = {
  available:
    "!border !border-[#16B681] rounded-[50px] !text-[#16B681] !bg-[#EBFFF3] !text-[14px] py-1 px-2 capitalize",
  inuse:
    "!border !border-[#FE634E] rounded-[50px] !text-[#FE634E] !bg-[#FFF8F2] !text-[14px] py-1 px-2 capitalize",
  deactivated:
    "!border !border-[#BF453A] rounded-[50px] !text-[#BF453A] !bg-[#FFE7E7] !text-[14px] py-1 px-2 capitalize",
  archived:
    "!border !border-[#4F4F4F] rounded-[50px] !text-[#4F4F4F] !bg-[#DFDFDF] !text-[14px] py-1 px-2 capitalize",
};