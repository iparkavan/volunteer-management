import { IconButton } from "@mui/material";
import { dateFormat } from "./utils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { taskStatusColor, taskStatusText } from "./utils/constant";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import formatSize from "./utils/sizeFormatUtil";
export const loginUser = [
  {
    email: "tsubramaniyan2@gmail.com",
    password: "12345",
  },
  {
    email: "subramaniyant@dataterrain.com",
    password: "12345",
  },
];

function createData(
  name,
  professional,
  contact,
  email,
  location,
  attended_programs,
  last_attended_programs
) {
  return {
    name,
    professional,
    contact,
    email,
    location,
    attended_programs,
    last_attended_programs,
  };
}

export const menteeRows = [
  createData("India", "IN", 1324171354, 3287263, 3287263, 3287263, 3287263),
  createData("Italy", "IT", 60483973, 301340, 3287263, 3287263, 3287263),
  createData(
    "United States",
    "US",
    327167434,
    9833520,
    3287263,
    3287263,
    3287263
  ),
  createData("Canada", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada2", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada3", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada4", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada5", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada6", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada7", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada8", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada9", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada1", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada10", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada54", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada32", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada86", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
  createData("Canada95", "CA", 37602103, 9984670, 3287263, 3287263, 3287263),
];

export const menteeColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    id: 0,
  },
  {
    field: "professional",
    headerName: "Professional",
    flex: 1,
    id: 1,
  },
  {
    field: "contact",
    headerName: "Contact",
    flex: 1,
    id: 2,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 1,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    id: 2,
  },
  {
    field: "attn_program",
    headerName: "Attended Programs",
    flex: 1,
    id: 2,
  },
  {
    field: "last_attn_program",
    headerName: "Last Attend Program",
    flex: 1,
    id: 1,
  },
];

function menteesListData(
  id,
  name,
  professional,
  contact,
  email,
  location,
  attn_program,
  last_attn_program
) {
  return {
    id,
    name,
    professional,
    contact,
    email,
    location,
    attn_program,
    last_attn_program,
  };
}

const menteeRowData = () => {
  const data = [];
  for (let a = 1; a <= 1000000; a++) {
    data.push(
      menteesListData(
        a,
        `Name ${a}`,
        `Student `,
        "1234567890",
        "John Doe@gmail.com",
        "Lorem ipsum dolor sit amet..",
        "Teaching program",
        "Teaching program"
      )
    );
  }
  return data;
};

export const menteeRow = menteeRowData();

export const menteeMoreMenu = [
  {
    name: "Edit",
    onClickEvent: (data) => console.log("Edit Event", data),
  },
  {
    name: "Delete",
    onClickEvent: (data) => console.log("Delete Event", data),
  },
];

export const assignMenteeColumns = [
  {
    field: "first_name",
    headerName: "first_name",
    width: 140,
    id: 0,
  },
  {
    field: "professional",
    headerName: "Professional",
    width: 150,
    id: 1,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 150,
    id: 2,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    id: 3,
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    id: 4,
  },
  {
    field: "certificates",
    headerName: "Certificates",
    width: 150,
    id: 5,
  },
  {
    field: "view",
    headerName: "View",
    width: 200,
    id: 6,
  },
];

function addignCreateData(
  name,
  professional,
  contact,
  email,
  location,
  certificates,
  view
) {
  return {
    name,
    professional,
    contact,
    email,
    location,
    certificates,
    view,
  };
}
export const assignMenteeRows = [
  addignCreateData(
    "Name 1",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 2",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 3",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 4",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 5",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 6",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 7",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 8",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 9",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 10",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 11",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 12",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 13",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 14",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 15",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 16",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 17",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 18",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 19",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
  addignCreateData(
    "Name 20",
    "Freelancer",
    1324171354,
    "John Doe@gmail.com",
    "Lorem ipsum dolor sit amet..",
    "06",
    3287263
  ),
];

function materialData(material_name, material_type, material_size, action) {
  return {
    material_name,
    material_type,
    material_size,
    action,
  };
}

const createMaterialRow = () => {
  const data = [];
  for (let a = 1; a <= 20; a++) {
    data.push(materialData(`Materials Name ${a}`, "Video.mp4", "5MB", 3287263));
  }
  return data;
};

export const createMaterialsRows = createMaterialRow();

export const MaterialColumns = [
  {
    field: "name",
    headerName: "Material Name",
    flex: 1,
    id: 0,
  },
  {
    field: "material_type",
    headerName: "Material Type",
    flex: 1,
    id: 1,
  },
  {
    field: "material_size",
    headerName: "Material Size",
    flex: 1,
    id: 2,
    renderCell: ({ row }) => formatSize(row?.material_size)
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    id: 3,
  },
];
export const RecurringTableColumns = [
  {
    field: "program_name",
    headerName: "Name",
    flex: 2,
    id: 0,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    flex: 3,
    id: 1,
    renderCell: ({ row }) => moment(row?.start_date).format("MM/DD/YYYY hh:mm"),
  },
  {
    field: "end_date",
    headerName: "End Date",
    flex: 3,
    id: 2,
    renderCell: ({ row }) => moment(row?.end_date).format("MM/DD/YYYY hh:mm"),
  },
  {
    field: "actions",
    headerName: "Action",
    flex: 1,
    id: 3,
    renderCell: () => (
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    ),
  },
];
export const RecurringListMenuItems = [
  {
    label: "Edit",
    action: "edit",
    visible: false,
    icon: <EditIcon sx={{ mr: 1 }} fontSize="small" />,
  },
  { label: "View", action: "view", visible: false, icon: <VisibilityOutlinedIcon sx={{ mr: 1 }} fontSize="small" /> },
];

export const GoalColumns = [
  {
    field: "description",
    headerName: "Goal Name ",
    flex: 3,
    id: 0,
  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   flex: 1,
  //   id: 1,
  // },
  // {
  //   field: 'progress',
  //   headerName: 'Progress level',
  //   flex: 1,
  //   id: 2,
  // },
  {
    field: "action",
    headerName: "Action",
    align: "center",
    flex: 1,
    id: 3,
  },
];

export const EquipmentColumns = [
  {
    field: "equipment_name",
    headerName: "Equipment Title",
    flex: 2,
    id: 0,    
  },
  {
    field: "vendor_supplier_location",
    headerName: "Location",
    flex: 2,
    id: 1,
    renderCell: (params) => { return params.row?.city && params.row?.country ? `${params.row?.city}, ${params.row?.country}` : "-" }
  },
  {
    field: "action",
    align: 'center',
    headerName: "Action",
    flex: 1,
    id: 4
  }
]

export const MemberColumns = [
  {
    field: "first_name",
    headerName: "Full Name",
    flex: 1,
    id: 0,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 1,
  },
  // {
  //     field: 'action',
  //     headerName: 'Action',
  //     width: 200,
  //     id: 4,
  // },
];

export const MenteeAssignColumns = [
  {
    field: "full_name",
    headerName: "Full Name",
    // width: 400,
    id: 0,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    // width: 250,
    id: 1,
    flex: 1,
  },
  {
    field: "dob",
    headerName: "DOB",
    // width: 200,
    id: 2,
    flex: 1,
  },
  {
    field: "gender",
    headerName: "Gender",
    // width: 200,
    id: 3,
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    // width: 200,
    id: 4,
    flex: 1,
  },
];

export const MentorAssignColumns = [
  {
    field: 'name',
    headerName: 'Program Manager Name',
    flex: 1,
    id: 0,
  },
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 1,
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
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
    field: "certificates",
    headerName: "Certificates",
    flex: 1,
    id: 4,
  },
  {
    field: "action",
    headerName: "View",
    flex: 1,
    id: 5,
  },
];

function skillData(name, skills_desc, action) {
  return {
    name,
    skills_desc,
    action,
  };
}
const createSkillsRow = () => {
  const data = [];
  for (let a = 1; a <= 20; a++) {
    data.push(skillData(`Skills Name ${a}`, "test", 3287263));
  }
  return data;
};

export const createSkillsRows = createSkillsRow();

export const SkillsColumns = [
  {
    field: "name",
    headerName: "Skills Name",
    flex: 1,
    id: 0,
  },
  {
    field: "desc",
    headerName: "Skills Description",
    flex: 1,
    id: 1,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    id: 3,
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
          onClick={() => console.log("click")}
        >
          {" "}
          View Details{" "}
        </button>
      );
    },
  },
];

function certificateData(name, action) {
  return {
    name,
    action,
  };
}

const certificateRow = () => {
  const data = [];
  for (let a = 1; a <= 20; a++) {
    data.push(certificateData(`Certificate Name ${a}`, 3287263));
  }
  return data;
};

export const certificateRows = certificateRow();

export const CertificateColumns = [
  {
    field: "name",
    headerName: "Certificate Name",
    width: 700,
    id: 0,
  },
  {
    field: "action",
    headerName: "Action",
    width: 430,
    id: 3,
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
          onClick={() => console.log("click")}
        >
          {" "}
          View Details{" "}
        </button>
      );
    },
  },
];

function topMentorData(id, name, designation, skills, ratings) {
  return {
    id,
    name,
    designation,
    skills,
    ratings,
  };
}
const topMentorRow = () => {
  const data = [];
  for (let a = 1; a <= 10; a++) {
    data.push(topMentorData(a, `Test ${a}`, "Developer", "Teaching", "4.5"));
  }
  return data;
};

export const topMentorRows = topMentorRow();

function programActivityData(id, name, manager, start_date, end_date, admin) {
  return {
    id,
    name,
    manager,
    start_date,
    end_date,
    admin,
  };
}

const programActivityRow = () => {
  const data = [];
  for (let a = 1; a <= 10; a++) {
    data.push(
      programActivityData(
        a,
        `Program Name ${a}`,
        `Johnson ${a}`,
        "04/23/2024",
        "04/23/2024",
        "Admin"
      )
    );
  }
  return data;
};

export const programActivityRows = programActivityRow();

export const mentorColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    id: 0,
  },
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

function mentorListData(id, name, designation, skills, email, location) {
  return {
    id,
    name,
    designation,
    skills,
    email,
    location,
  };
}

const mentorData = () => {
  const data = [];
  for (let a = 1; a <= 30; a++) {
    data.push(
      mentorListData(
        a,
        `Name ${a}`,
        `Developer`,
        `Teaching ${a}`,
        "John Doe@gmail.com",
        "Lorem ipsum dolor sit amet.."
      )
    );
  }
  return data;
};

export const mentorRows = mentorData();

const taskData = () => {
  const data = [];
  for (let a = 1; a <= 30; a++) {
    data.push({
      id: a,
      assigned_date: "02/05/2024",
      task_name: `Task Name ${a + 1}`,
      program_name: `Teaching Program ${a + 1}`,
      task_description: "Lorem ipsum dolor......",
      start_date: "02/05/2024",
      completed_date: "02/05/2024",
      task_sent: "Mentor",
      status: "Done",
      file_size: "5mb",
      mark: "09",
    });
  }
  return data;
};

export const taskRows = taskData();

export const taskColumns = [
  {
    field: "created_at",
    headerName: "Assigned Date",
    flex: 1,
    id: 0,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.created_at)}</div>;
    },
  },
  {
    field: "task_name",
    headerName: "Task Name",
    flex: 1,
    id: 1,
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 2,
  },
  {
    field: "task_description",
    headerName: "Task Description",
    flex: 1,
    id: 1,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    flex: 1,
    id: 2,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.start_date)}</div>;
    },
  },
  {
    field: "submited_date",
    headerName: "Completed  Date",
    flex: 1,
    id: 2,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.submited_date)}</div>;
    },
  },
  {
    field: "mentor_name",
    headerName: "Task Sent by",
    flex: 1,
    id: 2,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    id: 2,
  },
  // {
  //     field: 'file_size',
  //     headerName: 'File',
  //     flex: 1,
  //     id: 2,
  // },
  {
    field: "result",
    headerName: "Result",
    flex: 1,
    id: 2,
  },
];

const mentorTaskData = () => {
  const data = [];
  for (let a = 1; a <= 30; a++) {
    data.push({
      id: a,
      program_name: `Teaching Program ${a + 1}`,
      mentee_name: `Mentee ${a + 1}`,
      task_description: "Lorem ipsum dolor......",
      create_date: "02/05/2024",
      sub_date: "02/05/2024",
      task_status: "Done",
      mark: "09",
      file_by: "5mb",
    });
  }
  return data;
};

export const mentorTaskRows = mentorTaskData();

export const mentorTaskColumns = [
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 0,
  },
  {
    field: "task_name",
    headerName: "Task Name",
    flex: 1,
    id: 1,
  },
  {
    field: "mentee_name",
    headerName: "Mentee Name",
    flex: 1,
    id: 1,
  },
  {
    field: "task_description",
    headerName: "Task description",
    flex: 1,
    id: 2,
  },
  {
    field: "created_at",
    headerName: "Create Date",
    flex: 1,
    id: 2,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.created_at)}</div>;
    },
  },
  {
    field: "submited_date",
    headerName: "Submited Date",
    flex: 1,
    id: 2,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.submited_date)}</div>;
    },
  },
  {
    field: "status",
    headerName: "Task Status",
    flex: 1,
    id: 2,
    renderCell: (params) => {
      return (
        <>
          <div className="cursor-pointer flex items-center h-full relative">
            <span
              className="w-[80px] flex justify-center h-[30px] px-3"
              style={{
                background: taskStatusColor[params.row.status]?.bg || "",
                lineHeight: "30px",
                borderRadius: "3px",
                width: "110px",
                height: "34px",
                color: taskStatusColor[params.row.status]?.color || "",
                fontSize: "12px",
              }}
            >
              {" "}
              {taskStatusText[params.row.status]}
            </span>
          </div>
        </>
      );
    },
  },
  {
    field: "result",
    headerName: "Result",
    flex: 1,
    id: 2,
    renderCell: (params) => {
      return (
        <>
          <div
            style={{
              color:
                params.row.result === "Pass"
                  ? "rgba(22, 182, 129, 1)"
                  : "rgba(224, 56, 45, 1)",
            }}
          >
            {params.row.result}
          </div>
        </>
      );
    },
  },
  // {
  //     field: 'file_by',
  //     headerName: 'File by',
  //     flex: 1,
  //     id: 2,
  // }
];

export const goalsColumns = [
  {
    field: "goal_name",
    headerName: "Goal Name",
    id: 0,
    flex: 1,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    id: 1,
    flex: 1,
  },
];

function goalsListData(id, goal_name, start_date, period) {
  return {
    id,
    goal_name,
    start_date,
    period,
  };
}

const goalsRowData = () => {
  const data = [];
  for (let a = 1; a <= 30; a++) {
    data.push(
      goalsListData(a, `Name ${a}`, `Student `, "03/24/2024", "3 Months")
    );
  }
  return data;
};

export const goalsRow = goalsRowData();

const goalsRequestRowData = () => {
  const data = [];
  for (let a = 1; a <= 30; a++) {
    data.push({
      id: a,
      goal_name: `Goal ${a}`,
      goal_designation: `Designation ${a}`,
      goal_description: "Desc",
      request_date: "03/24/2024",
      approved_date: "03/24/2024",
      status: "Accept",
    });
  }
  return data;
};

export const goalsRequestRow = goalsRequestRowData();

export const menteeGoalsRequestColumn = [
  {
    field: 'mentee_name',
    headerName: 'Volunteer Name',
    id: 0,
    flex: 1,
  },
  {
    field: "goal_name",
    headerName: "Goal Name",
    id: 0,
    flex: 1,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    id: 1,
    flex: 1,
  },
  {
    field: "completed_date",
    headerName: "Completed Date",
    id: 1,
    flex: 1,
  },
  {
    field: "period_time",
    headerName: "Period Time",
    id: 1,
    flex: 1,
  },
];

export const mentorMenteeGoalsColumn = [
  {
    field: 'created_by_name',
    headerName: 'Volunteer Name',
    id: 0,
    flex: 1,
  },
  {
    field: "category_name",
    headerName: "Category",
    id: 0,
    flex: 1,
  },
  {
    field: "goal_name",
    headerName: "Goal Name",
    id: 0,
    flex: 1,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    id: 1,
    flex: 1,
  },
];

const menteeGoalsRequestRowData = () => {
  const data = [];
  for (let a = 1; a <= 30; a++) {
    data.push({
      id: a,
      mentee_name: `Volunteer ${a}`,
      goal_name: `Goal ${a}`,
      start_date: "03/24/2024",
      completed_date: "03/24/2024",
      period_time: "3 Months",
      performance: `${a}%`,
      goal_status: "Completed",
    });
  }
  return data;
};

export const menteeGoalsRequestRow = menteeGoalsRequestRowData();

const discussionRowData = () => {
  const data = [];
  for (let a = 1; a <= 30; a++) {
    data.push({
      id: a,
      program_name: `Volunteer ${a}`,
      Description: "testfsdfd",
      date: "03/24/2024",
      task: `Task ${a}`,
      users: a,
      comments: `${a}`,
      last_updated_by: "John",
    });
  }
  return data;
};

export const discussionRow = discussionRowData();

export const discussionColumns = [
  {
    field: "program_name",
    headerName: "Program Name",
    width: 200,
    id: 0,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    id: 1,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    id: 2,
  },
  {
    field: "task",
    headerName: "Tasks",
    width: 250,
    id: 1,
  },
  {
    field: "users",
    headerName: "Users",
    width: 400,
    id: 2,
  },
  {
    field: "comments",
    headerName: "Comments",
    width: 250,
    id: 2,
  },
  {
    field: "last_updated_by",
    headerName: "Last update by",
    width: 250,
    id: 1,
  },
];

export const goalsHistoryColumn = [
  {
    field: "goal_name",
    headerName: "Goal Name",
    flex: 1,
    id: 0,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    flex: 1,
    id: 1,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.start_date)}</div>;
    },
  },
];

export const RecentDiscussion = [
  {
    id: 1,
    name: "John",
    message: "Hi, Maria, What is the?",
    posted: "10Min ago",
  },
  {
    id: 2,
    name: "John",
    message: "Hi, Maria, What is the?",
    posted: "10Min ago",
  },
  {
    id: 3,
    name: "John",
    message: "Hi, Maria, What is the?",
    posted: "10Min ago",
  },
  {
    id: 4,
    name: "John",
    message: "Hi, Maria, What is the?",
    posted: "10Min ago",
  },
  {
    id: 5,
    name: "John",
    message: "Hi, Maria, What is the?",
    posted: "10Min ago",
  },
  {
    id: 6,
    name: "John",
    message: "Hi, Maria, What is the?",
    posted: "10Min ago",
  },
];

export const PostList = [
  {
    name: "Program name1 posts",
    type: "Mentor",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    likeCount: 20,
    commentCount: 30,
    shareCount: 20,
    replyCount: 10,
    posted: "Oct13 at 10m ago",
  },
  {
    name: "Program name2 posts",
    type: "Mentee",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    likeCount: 20,
    commentCount: 30,
    shareCount: 20,
    replyCount: 10,
    posted: "Oct13 at 10m ago",
  },
  {
    name: "Program name3 posts",
    type: "Mentor",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    likeCount: 20,
    commentCount: 30,
    shareCount: 20,
    replyCount: 10,
    posted: "Oct13 at 10m ago",
  },
  {
    name: "Program name4 posts",
    type: "Mentee",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    likeCount: 20,
    commentCount: 30,
    shareCount: 20,
    replyCount: 10,
    posted: "Oct13 at 10m ago",
  },
  {
    name: "Program name5 posts",
    type: "Mentor",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    likeCount: 20,
    commentCount: 30,
    shareCount: 20,
    replyCount: 10,
    posted: "Oct13 at 10m ago",
  },
  {
    name: "Program name6 posts",
    type: "Mentee",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    likeCount: 20,
    commentCount: 30,
    shareCount: 20,
    replyCount: 10,
    posted: "Oct13 at 10m ago",
  },
];

export const listCertificateColumn = [
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 0,
  },
  {
    field: "description",
    headerName: "Program Description",
    flex: 1,
    id: 0,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    flex: 1,
    id: 1,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.start_date)}</div>;
    },
  },
  {
    field: "end_date",
    headerName: "End Date",
    flex: 1,
    id: 1,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.end_date)}</div>;
    },
  },
  {
    field: "program_admin",
    headerName: "Program Supervisor",
    flex: 1,
    id: 1,
  },
  {
    field: "venue",
    headerName: "Program Location",
    flex: 1,
    id: 1,
  },
];

const certificatesRow = () => {
  const data = [];
  for (let a = 1; a <= 50; a++) {
    data.push({
      id: a,
      program_name: `Program Name ${a}`,
      program_desc: "Lorem ipsum dolor sitsdfsdf sdfsdfsd sdsd",
      start_date: "04/23/2024",
      end_date: "04/23/2024",
      program_admin: `Supervisor ${a}`,
      program_location: "USA",
      status: "completed",
    });
  }
  return data;
};

export const listCertificateRow = certificatesRow();

export const programRequestColumns = [
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 0,
    for: ["admin", "mentor", "mentee"],
    mainTab: ["my", "mentees", "admin"],
    tab:["program_cancel","program_join","program_reschedule","program_new"]
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 1,
    for: ["admin", "mentor", "mentee"],
    mainTab: ["my", "mentees", "admin"],
    tab:["program_cancel","program_join","program_reschedule","program_new"]
    
  },
  {
    field: "created_by_full_name",
    headerName: "Volunteer name",
    flex: 1,
    id: 10,
    for: ["admin", "mentor"],
    mainTab: ["mentees"],
    tab:["program_join","program_cancel"]
  },
  {
    field: "created_by_full_name",
    headerName: "Requested By",
    flex: 1,
    id: 2,
    for: ["admin", "mentee"],
    mainTab: ["my", "admin"],
    tab:["program_cancel","program_reschedule","program_new"]
  },

  {
    field: "position",
    headerName: "Position",
    flex: 1,
    id: 3,
    for: ["admin"],
    mainTab: ["my", "mentees", "admin"],
    tab:["program_cancel","program_reschedule","program_new"]
  },
  // {
  //   field: 'to_request',
  //   headerName: 'Requeste To',
  //   flex: 1,
  //   id: 4,
  //   for: ['mentor'],
  // },
  {
    field: "created_at",
    headerName: "Requested Date",
    flex: 1,
    id: 5,
    for: ["admin", "mentor", "mentee"],
    mainTab: ["my", "mentees", "admin"],
    tab:["program_cancel","program_join","program_reschedule","program_new"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.created_at)}</div>;
    },
  },
  {
    field: "start_date",
    headerName: "Start & End Date",
    flex: 1,
    id: 11,
    for: ["admin", "mentor", "mentee"],
    tab:["program_reschedule"],
    mainTab: ["my", "mentees", "admin"],
    renderCell: (params) => {
      return <div>{`${dateFormat(params.row.start_date)} & ${dateFormat(params.row.end_date)}`}</div>;
    },
  },
  {
    field: "comment",
    headerName: "Reschedule Reason",
    flex: 1,
    id: 12,
    for: ["admin", "mentor"],
    tab:["program_reschedule"],
    mainTab: ["my", "admin"],
    renderCell: (params) => {
      return <div>{params.row.comments}</div>;
    },
  },
  // {
  //   field: 'cancelled_reason',
  //   headerName: 'Cancel Reason',
  //   flex: 1,
  //   id: 6,
  //   for: ['mentor'],
  // },
  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 7,
    for: ["admin", "mentee", "mentor"],
    mainTab: ["my", "mentees", "admin"],
    tab:["program_cancel","program_join","program_reschedule","program_new"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.updated_at)}</div>;
    },
  },
  {
    field: "updated_by_full_name",
    headerName: "Last Updated By",
    flex: 1,
    id: 8,
    for: ["admin", "mentee", "mentor"],
    mainTab: ["my", "mentees", "admin"],
    tab:["program_cancel","program_join","program_reschedule","program_new"]
  },
  {
    field: 'rejection_reason',
    headerName: 'Cancel Reason',
    flex: 1,
    id: 8,
    for: ['admin', 'mentee', 'mentor'],
    mainTab: ["my", "mentees", "admin"],
    tab:["program_cancel"]
  },
  {
    field: 'auto_approval',
    headerName: 'Auto Approval',
    flex: 1,
    id: 9,
    for: ["admin"],
    mainTab: ["my", "mentees", "admin"],
    tab:["program_cancel","program_join","program_reschedule","program_new"]
  },
  // {
  //   field: 'approved_date_time',
  //   headerName: 'Approved Date & Time',
  //   flex: 1,
  //   id: 9,
  //   for: ['mentor'],
  // },
  // {
  //   field: 'approved_by',
  //   headerName: 'Aborted By',
  //   flex: 1,
  //   id: 10,
  //   for: ['mentor'],
  // },
  // {
  //   field: 'rejected_date_time',
  //   headerName: 'Rejected Date & Time',
  //   flex: 1,
  //   id: 11,
  //   for: ['mentor'],
  // },
  // {
  //   field: 'rejected_by',
  //   headerName: 'Rejected By',
  //   flex: 1,
  //   id: 12,
  //   for: ['mentor'],
  // },

  // {
  //   field: 'aborted_date',
  //   headerName: 'Aborted Date',
  //   flex: 1,
  //   id: 13,
  //   for: ['mentor'],
  // },
  // {
  //   field: 'aborted_by',
  //   headerName: 'Aborted By',
  //   flex: 1,
  //   id: 14,
  //   for: ['mentor'],
  // },
];
export const programExtendRequestColumns = [
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 0,
    for: ["admin", "mentor", "mentee"],
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 1,
    for: ["admin", "mentor", "mentee"],
  },
  {
    field: "created_by_full_name",
    headerName: "Requested By",
    flex: 1,
    id: 2,
    for: ["admin", "mentee"],
  },
  {
    field: "position",
    headerName: "Position",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
  {
    field: "to_request",
    headerName: "Requeste To",
    flex: 1,
    id: 4,
    for: ["mentor"],
  },
  {
    field: "created_at",
    headerName: "Request Date",
    flex: 1,
    id: 5,
    for: ["admin", "mentor", "mentee"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.created_at)}</div>;
    },
  },
  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 7,
    for: ["admin", "mentee", "mentor"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.updated_at)}</div>;
    },
  },
  {
    field: "updated_by_full_name",
    headerName: "Last Updated By",
    flex: 1,
    id: 8,
    for: ["admin", "mentee", "mentor"],
  },
  {
    field: "auto_approval",
    headerName: "Auto Approval",
    flex: 1,
    id: 8,
    for: ["admin"],
  },
];

export const learningAccessRequestsColumns = [
  {
    field: "name",
    headerName: "Material Name",
    flex: 1,
    id: 0,
    for: ["mentee"],
    minWidth: 150,
  },
  {
    field: "material_link",
    headerName: "Material Link",
    flex: 1,
    id: 1,
    for: ["mentee"],
    minWidth: 150,
  },
  {
    field: "requested_by",
    headerName: "Requested To",
    flex: 1,
    id: 2,
    for: ["mentee"],
    minWidth: 150,
  },
  {
    field: "requested_date",
    headerName: "Request Data",
    flex: 1,
    id: 3,
    for: ["mentee"],
    minWidth: 150,
  },
  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 4,
    for: ["mentee"],
    minWidth: 150,
  },
  {
    field: "updated_by",
    headerName: "Last Update by",
    flex: 1,
    id: 5,
    for: ["mentee"],
    minWidth: 150,
  },
  // {
  //     field: 'status',
  //     headerName: 'Status',
  //     flex: 1,
  //     id: 6,
  //     for: ['mentee'],
  //     minWidth: 150,
  // },
  {
    field: "url",
    headerName: "Document",
    flex: 1,
    id: 7,
    for: ["mentee"],
    minWidth: 150,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    id: 8,
    for: ["mentee"],
    minWidth: 150,
  },
];
export const newGoalsRequestsColumns = [
  {
    field: "goal_name",
    headerName: "Goal Name",
    flex: 1,
    id: 0,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    id: 1,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
  {
    field: "request_date",
    headerName: "Request Date ",
    flex: 1,
    id: 2,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
  {
    field: "requested_to",
    headerName: "Requested to",
    flex: 1,
    id: 3,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
  {
    field: "last_updated_date",
    headerName: "Last Updated Date",
    flex: 1,
    id: 4,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
  {
    field: "last_update_by",
    headerName: "Last Update by",
    flex: 1,
    id: 5,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    id: 6,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    id: 8,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
];

export const memberMentorRequestColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    id: 0,
    for: ["admin", "mentor"],
  },
  // {
  //   field: "designation",
  //   headerName: "Designation",
  //   flex: 1,
  //   id: 1,
  //   for: ["admin", "mentor"],
  // },
  {
    field: "skills",
    headerName: "Skills",
    flex: 1,
    id: 2,
    for: ["admin"],
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 4,
    for: ["mentor"],
  },
  {
    field: "address",
    headerName: "Location",
    flex: 1,
    id: 5,
    for: ["admin", "mentor"],
  },
  {
    field: "years_of_experience",
    headerName: "Program Management Experience",
    flex: 1,
    id: 6,
    for: ["mentor"],
  },
];

export const memberMenteeRequestColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    id: 0,
    for: ["admin", "mentor"],
  },
  {
    field: "age",
    headerName: "Age",
    flex: 1,
    id: 1,
    for: ["admin", "mentor"],
  },
  {
    field: "dob",
    headerName: "D.O.B",
    flex: 1,
    id: 2,
    for: ["admin"],
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 4,
    for: ["mentor"],
  },
  {
    field: "address",
    headerName: "Location",
    flex: 1,
    id: 5,
    for: ["admin", "mentor"],
  },
  {
    field: "major_field_of_study",
    headerName: "Major Field Studies",
    flex: 1,
    id: 6,
    for: ["mentor"],
  },
  {
    field: "skills",
    headerName: "Skills",
    flex: 1,
    id: 6,
    for: ["mentor"],
  },
  {
    field: "requested_date",
    headerName: "Request Date",
    flex: 1,
    id: 6,
    for: ["mentor"],
  },
];

export const goalsRequestColumns = [
  {
    field: "requested_date",
    headerName: "Request Date",
    flex: 1,
    id: 2,
    for: ["admin"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.requested_date)}</div>;
    },
  },
  {
    field: "requested_by",
    headerName: "Requested By",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 4,
    for: ["mentor"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.updated_at)}</div>;
    },
  },
  {
    field: "updated_by",
    headerName: "Last Updated By",
    flex: 1,
    id: 5,
    for: ["admin", "mentor"],
  },
];

export const resourceAccessRequestColumns = [
  {
    field: "material_name",
    headerName: "Material Name",
    flex: 1,
    id: 1,
    for: ["admin", "mentor"],
  },
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 12,
    for: ["admin", "mentor", "mentee"],
  },
  {
    field: "comments",
    headerName: "Reason",
    flex: 1,
    id: 3,
    for: ["mentor"],
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 14,
    for: ["admin"],
  },
  {
    field: "created_at",
    headerName: "Request Date ",
    flex: 1,
    id: 5,
    for: ["mentee", "mentor", "admin"],
    minWidth: 150,
  },
  {
    field: "created_by_full_name",
    headerName: "Requested to",
    flex: 1,
    id: 6,
    for: ["mentee", "mentor", "admin"],
    minWidth: 150,
  },
  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 7,
    for: ["mentee", "mentor", "admin"],
    minWidth: 150,
  },
  {
    field: "updated_by_full_name",
    headerName: "Last Update by",
    flex: 1,
    id: 8,
    for: ["mentee", "mentor", "admin"],
    minWidth: 150,
  },
  {
    field: "material_url",
    headerName: "Material Link",
    flex: 1,
    id: 9,
    for: ["admin", "mentor"],
  },
  {
    field: "url",
    headerName: "Document",
    flex: 1,
    id: 11,
    for: ["mentee", "mentor"],
    minWidth: 150,
  },
];

export const techinicalSupportRequestColumns = [
  {
    field: "name",
    headerName: "Techinical Support Name",
    flex: 1,
    id: 0,
    for: ["admin", "mentor"],
  },
  {
    field: "reason",
    headerName: "Reason Request",
    flex: 1,
    id: 1,
    for: ["admin", "mentor"],
  },
  {
    field: "dob",
    headerName: "Request Date & Time",
    flex: 1,
    id: 2,
    for: ["admin"],
  },
  {
    field: "phone",
    headerName: "Requested By",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
];

export const testimonialRequestColumns = [
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 0,
    for: ["admin", "mentor"],
  },
  {
    field: "testimonial_type",
    headerName: "Testimonial Type",
    flex: 1,
    id: 1,
    for: ["admin", "mentor"],
  },
  {
    field: "requested_to",
    headerName: "To Request",
    flex: 1,
    id: 2,
    for: ["admin"],
  },
  {
    field: "request_date",
    headerName: "Requested Date",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
  {
    field: "requested_by",
    headerName: "Requested By",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 3,
    for: ["admin"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.updated_at)}</div>;
    },
  },
  {
    field: "updated_by",
    headerName: "Last Updated By",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
];

export const certificateRequestColumns = [
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 0,
    for: ["admin", "mentor"],
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 1,
    for: ["admin", "mentor"],
  },
  {
    field: "participates_count",
    headerName: "Volunteers",
    flex: 1,
    id: 2,
    for: ["admin"],
  },
  {
    field: "created_by_full_name",
    headerName: "Requested By",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
  {
    field: "created_at",
    headerName: "Requested Date",
    flex: 1,
    id: 4,
    for: ["admin"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.created_at)}</div>;
    },
  },

  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 5,
    for: ["admin"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.updated_at)}</div>;
    },
  },
  {
    field: "updated_by_full_name",
    headerName: "Last Updated By",
    flex: 1,
    id: 4,
    for: ["admin", "mentor"],
  },
];

export const reportRequestColumns = [
  {
    field: "name",
    headerName: "Report Name",
    flex: 1,
    id: 0,
    for: ["admin", "mentor"],
  },
  {
    field: "created_by_full_name",
    headerName: "Program Manager Name",
    flex: 1,
    id: 1,
    for: ["admin", "mentor"],
  },
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 2,
    for: ["admin"],
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 2,
    for: ["admin"],
  },
  {
    field: "participates_count",
    headerName: "Volunteers",
    flex: 1,
    id: 2,
    for: ["admin"],
  },
  {
    field: "updated_at",
    headerName: "Last Updated Date",
    flex: 1,
    id: 3,
    for: ["admin"],
    renderCell: (params) => {
      return <div>{dateFormat(params.row.updated_at)}</div>;
    },
  },
  {
    field: "updated_by_full_name",
    headerName: "Last Updated By",
    flex: 1,
    id: 3,
    for: ["admin"],
  },
];

export const categoryColumns = [
  {
    field: "name",
    headerName: "Category Name",
    flex: 1,
    id: 0,
    for: ["admin", "mentor"],
  },
  {
    field: "count_members",
    headerName: "Count",
    flex: 1,
    id: 1,
    for: ["admin", "mentor"],
  },
];

const programRequestList = () => {
  const data = [];
  for (let a = 1; a <= 50; a++) {
    data.push({
      id: a,
      category: `Category Name ${a}`,
      program_name: `Program Name ${a}`,
      reason_request: "Aborted",
      to_request: "Cameron Green",
      request_date: "3/7/2024",
      aborted_date: `3/7/2024`,
      aborted_by: "Cameron Green",
    });
  }
  return data;
};

export const programRequestData = programRequestList();

const discussionList = () => {
  const data = [];
  for (let a = 1; a <= 5; a++) {
    data.push({
      id: a,
      program_name: `Program Name ${a}`,
      description: `Desc ${a}`,
      date: "3/7/2024",
      task: `Task ${a}`,
      users: `User ${a}`,
      comments: "Test Comment",
      last_update_by: `User ${a}`,
    });
  }
  return data;
};

export const discussionData = discussionList();

export const CalendarMentee = [
  {
    field: "first_name",
    headerName: "Full Name",
    flex: 1,
    id: 0,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 1,
  },
];

const membersList = () => {
  const data = [];
  for (let a = 1; a <= 50; a++) {
    data.push({
      id: a,
      name: `Name ${a}`,
      reason: `Desc ${a}`,
      location: "Test Comment",
    });
  }
  return data;
};

export const membersData = membersList();

export const allMembersColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    id: 0,
    for: ["mentor", "mentee"],
  },
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 1,
    for: ["mentor", "mentee"],
  },
  {
    field: "designation",
    headerName: "Designation",
    flex: 1,
    id: 2,
    for: ["mentee", "mentee"],
  },
  {
    field: "skills",
    headerName: "Skills",
    flex: 1,
    id: 3,
    for: ["mentee", "mentee"],
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    flex: 1,
    id: 4,
    for: ["mentor", "mentee"],
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "years_of_experience",
    headerName: "Experience",
    flex: 1,
    id: 5,
    align: "center",
    for: ["mentor", "mentee"],
  },
  {
    field: "attended_programs",
    headerName: "Attended Programs",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "certificates",
    headerName: "Certificates",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  // {
  //   field: "auto_approval",
  //   headerName: "Auto Approval",
  //   flex: 1,
  //   id: 5,
  //   for: ["mentor"],
  // },
  // {
  //   field: "ratings",
  //   headerName: "Ratings",
  //   flex: 1,
  //   id: 5,
  //   for: ["mentor", "mentee"],
  // },
];
export const assignMentorColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    id: 0,
    for: ["mentor", "mentee"],
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    id: 1,
    for: ["mentor", "mentee"],
  },
  {
    field: "designation",
    headerName: "Designation",
    flex: 1,
    id: 2,
    for: ["mentee", "mentee"],
  },
  {
    field: "skills",
    headerName: "Skills",
    flex: 1,
    id: 3,
    for: ["mentee", "mentee"],
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    flex: 1,
    id: 4,
    for: ["mentor", "mentee"],
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "experience",
    headerName: "Experience",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "attended_programs",
    headerName: "Attended Programs",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "certificates",
    headerName: "Certificates",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "auto_approval",
    headerName: "Auto Approval",
    flex: 1,
    id: 5,
    for: ["mentor"],
  },
  {
    field: "ratings",
    headerName: "Ratings",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
];
export const MentorChangeViewColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    id: 0,
    for: ["mentor", "mentee"],
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    id: 1,
    for: ["mentor", "mentee"],
  },
  {
    field: "designation",
    headerName: "Sessions",
    flex: 1,
    id: 2,
    for: ["mentee", "mentee"],
  },
  {
    field: "skills",
    headerName: "Course Level",
    flex: 1,
    id: 3,
    for: ["mentee", "mentee"],
  },
  {
    field: "phone_number",
    headerName: "Start & End Date",
    flex: 1,
    id: 4,
    for: ["mentor", "mentee"],
  },
  {
    field: "email",
    headerName: "Durations",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "location",
    headerName: "Volunteers",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "experience",
    headerName: "Progress graph",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },

  {
    field: "ratings",
    headerName: "Ratings",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
  {
    field: "attended_programs",
    headerName: "Status",
    flex: 1,
    id: 5,
    for: ["mentor", "mentee"],
  },
];

export const JoinedMenteeColumn = [
  {
    field: "mentee_name",
    headerName: "Volunteer Name",
    width: 300,
    id: 0,
  },
  {
    field: "category",
    headerName: "Category",
    width: 300,
    id: 1,
  },
];
export const JoinedProgramMenteeColumn = [
  {
    field: "full_name",
    headerName: "Volunteer Name",
    width: 150,
    id: 0,
  },
  // {
  //   field: 'category',
  //   headerName: 'Category',
  //   width: 200,
  //   id: 1,
  // },
  {
    field: "role",
    headerName: "Professional",
    width: 150,
    id: 1,
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    width: 150,
    id: 1,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    id: 1,
  },
  {
    field: "certificate",
    headerName: "Certificates",
    width: 100,
    id: 1,
  },
];

export const AdminCategory = [
  {
    field: "mentor_count",
    headerName: "Program Managers",
    flex: 1,
    id: 0,
  },
  {
    field: "mentee_count",
    headerName: "Volunteers",
    flex: 1,
    id: 0,
  },
  {
    field: "program_count",
    headerName: "Programs",
    flex: 1,
    id: 0,
  },
];

export const categoryViewMentors = [
  {
    field: "first_name",
    headerName: "Name",
    flex: 1,
    id: 0,
  },
  {
    field: "areas_of_expertise",
    headerName: "Designation",
    flex: 1,
    id: 0,
  },
  {
    field: "skills",
    headerName: "Skills",
    flex: 1,
    id: 0,
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    flex: 1,
    id: 0,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 0,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    id: 0,
  },
  {
    field: "years_of_experience",
    headerName: "Experience",
    flex: 1,
    id: 0,
  },
  {
    field: "attend_program_count",
    headerName: "Attend Program",
    flex: 1,
    id: 0,
  },
];

export const categoryViewMentees = [
  {
    field: "full_name",
    headerName: "Name",
    flex: 1,
    id: 0,
  },
  {
    field: "current_education",
    headerName: "Designation",
    flex: 1,
    id: 0,
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    flex: 1,
    id: 0,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 0,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    id: 0,
  },
  // {
  //     field: 'experience',
  //     headerName: 'Experience',
  //     flex: 1,
  //     id: 0,
  // },
  {
    field: "enrolled_program_count",
    headerName: "Enrolled Program",
    flex: 1,
    id: 0,
  },
  {
    field: "certificates_count",
    headerName: "Certificates",
    flex: 1,
    id: 0,
  },
];

export const categoryViewProgram = [
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 0,
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 0,
  },
  {
    field: "mentor_count",
    headerName: "Program Managers",
    flex: 1,
    id: 0,
  },
  {
    field: "mentee_count",
    headerName: "Volunteers",
    flex: 1,
    id: 0,
  },
];

export const mentorTaskListColumns = [
  {
    field: "category_name",
    headerName: "Category",
    flex: 1,
    id: 0,
  },
  {
    field: "prgrame_name",
    headerName: "Program Name",
    flex: 1,
    id: 0,
  },
  {
    field: "task_name",
    headerName: "Task Name",
    flex: 1,
    id: 0,
  },
  {
    field: "task_details",
    headerName: "Task Description",
    flex: 1,
    id: 0,
  },
  {
    field: "total_mentees",
    headerName: "Total Volunteer",
    flex: 1,
    id: 0,
  },
];

export const menteeTaskListFromMentor = [
  {
    field: "mentee_name",
    headerName: "Volunteer Name",
    flex: 1,
    id: 0,
  },
  {
    field: "phone_number",
    headerName: "Phone Number",
    flex: 1,
    id: 0,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    id: 0,
  },
];
