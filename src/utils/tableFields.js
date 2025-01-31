import { dateFormat } from ".";
import { CourseLevelOptions } from "./formFields";
import StarColorIcon from '../assets/icons/starColor.svg';
import { programStatusColor, programStatusText, requestStatusColor, requestStatusText } from "./constant";

export const myMenteeColumns = [
  {
    field: "full_name",
    headerName: "Name",
    flex: 1,
    id: 0,
  },
  {
    field: "Professional_Bio",
    headerName: "Professional",
    flex: 1,
    id: 1,
  },
  {
    field: "phone_number",
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
    field: "last_attend_program",
    headerName: "Last Attended Program",
    flex: 1,
    id: 1,
  },
];

export const myReqMenteeColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    id: 1,
  },
  {
    field: "profession",
    headerName: "professional",
    flex: 1,
    id: 1,
  },
  {
    field: "contact",
    headerName: "Contact",
    flex: 1,
    id: 1,
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
    field: 'created_at',
    headerName: 'Request Date',
    flex: 1,
    id: 1,
    renderCell: (params) => {
        return <div>{dateFormat(params.row?.created_at)}</div>
    }
},
{
    field: 'last_updated_date',
    headerName: 'Last Updated Date',
    flex: 1,
    id: 1,
    renderCell: (params) => {
        return <div>{dateFormat(params.row?.last_updated_date)}</div>
    }
},
]

export const discussionColumns = [
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    id: 2,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    id: 3,
  },
  {
    field: "task",
    headerName: "Tasks",
    flex: 1,
    id: 4,
  },
  {
    field: "users",
    headerName: "Users",
    flex: 1,
    id: 5,
  },
  {
    field: "comments",
    headerName: "Comments",
    flex: 1,
    id: 6,
  },
  {
    field: "last_update_by",
    headerName: "Last update by",
    flex: 1,
    id: 7,
  },
];

export const memberRequestColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 2,
    id: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 3,
    id: 2,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 2,
    id: 3,
  },
];

export const launchProgramColumns = [
  {
    field: "categories",
    headerName: "Category",
    flex: 1,
    id: 0,
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 1,
  },
  {
    field: "launch_date",
    headerName: "Launch Date",
    flex: 1,
    id: 2,
  },
  {
    field: "launch_by",
    headerName: "Launch by",
    flex: 1,
    id: 1,
  },
];


export const certificateColumns = [{
        field: 'category_name',
        headerName: 'Category',
        flex: 1,
        id: 0,
        for: ['mentor', 'mentee','admin'],
        status: []
    },
    {
        field: 'program_name',
        headerName: 'Program Name',
        flex: 1,
        id: 1,
        for: ['mentor', 'mentee','admin']
    },
    {
        field: 'program_location',
        headerName: 'Location',
        flex: 1,
        id: 1,
        for: ['mentee']
    },
    {
        field: 'start_date',
        headerName: 'Start Date',
        flex: 1,
        id: 1,
        for: ['mentee'],
        renderCell: (params) => {
            return <div>{dateFormat(params.row.program_start_date_and_time)}</div>
        }
    },
    {
        field: 'end_date',
        headerName: 'End Date',
        flex: 1,
        id: 1,
        for: ['mentee'],
        renderCell: (params) => {
            return <div>{dateFormat(params.row.program_end_date_and_time)}</div>
        }
    },
    {
        field: 'approved_date',
        headerName: 'Approved Date',
        flex: 1,
        id: 1,
        for: ['mentee'],
        renderCell: (params) => {
            return <div>{dateFormat(params.row.approved_date)}</div>
        }
    },
    {
        field: 'approved_by_full_name',
        headerName: 'Approved by',
        flex: 1,
        id: 1,
        for: ['mentee']
    },

    {
        field: 'participates_count',
        headerName: 'Volunteer',
        flex: 1,
        id: 2,
        for: ['mentor','admin']
    }, {
        field: 'pass_participates_count',
        headerName: 'Pass',
        flex: 1,
        id: 1,
        for: ['mentor']
    },
    {
        field: 'fail_participates_count',
        headerName: 'No Pass',
        flex: 1,
        id: 1,
        for: ['mentor']
    },
    {
        field: 'created_at',
        headerName: 'Request Date',
        flex: 1,
        id: 1,
        for: ['mentor','admin'],
        renderCell: (params) => {
            return <div>{dateFormat(params.row.created_at)}</div>
        }
    },
    {
        field: 'created_by_full_name',
        headerName: 'Requested by',
        flex: 1,
        id: 1,
        for: ['admin']
    },
    {
        field: 'updated_at',
        headerName: 'Last updated Date',
        flex: 1,
        id: 1,
        for: ['mentor','admin'],
        renderCell: (params) => {
            return <div>{dateFormat(params.row.updated_at)}</div>
        }
    },
    {
        field: 'updated_by_full_name',
        headerName: 'Last updated by',
        flex: 1,
        id: 1,
        for: ['mentor', 'admin']
    }
];
export const certificateMenberColumns = [
  {
    field: "mentee_name",
    headerName: "Volunteer",
    flex: 1,
    id: 1,
  },
  {
    field: "program_name",
    headerName: "Program Name",
    flex: 1,
    id: 1,
  },

];




export const programListColumns = [
  {
      field: 'category_name',
      headerName: 'Category',
      flex: 1,
      id: 0,
      renderCell : (params) => {
        return <>{params.row.categories && params.row.categories[0]?.name}</>
      }
  },
  {
      field: 'program_name',
      headerName: 'Program Name',
      flex: 1,
      id: 1
  },
  {
      field: 'session_count',
      headerName: 'Sessions',
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return <div className="pl-4">{params.row.session_count}</div>
      }
  },
  {
      field: 'course_level',
      headerName: 'Course Level',
      flex: 1,
      id: 3,
      renderCell: (params) => {
        return <div>{CourseLevelOptions.find(course => course.key === params.row.course_level)?.value}</div>
      }
  },
  {
      field: 'to_request',
      headerName: 'Start date & End Date',
      flex: 1,
      id: 4,
      renderCell: (params) => {
        return <div>{dateFormat(params.row.start_date)} & {dateFormat(params.row.end_date)}</div>
    }
  },
  {
      field: 'duration',
      headerName: 'Durations',
      flex: 1,
      id: 5,
      renderCell: (params) => {
        return <div className="pl-4">{params.row.duration} {params?.row?.duration>1?"Days":"Day"}</div>
      }
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    id: 5,
    renderCell: (params) => {
        return <>
            <div className='cursor-pointer flex items-center justify-center h-full relative'>

                <span className='w-[100px] flex justify-center h-[30px] px-4'
                    style={{
                        background: programStatusColor[params?.row?.status]?.bgColor, lineHeight: '30px',
                        borderRadius: '3px', width: '110px', height: '34px',  fontSize: '12px', color: programStatusColor?.[params?.row?.status]?.color
                    }}>
                    {programStatusText?.[params?.row?.status]}
                </span>
            </div>
        </>
    }
},
  // {
  //     field: 'mentor_manager_id',
  //     headerName: 'M.M',
  //     flex: 1,
  //     id: 6
  // },
  {
      field: 'members',
      headerName: 'Volunteers',
      flex: 1,
      id: 7,
      renderCell : (params) => {
          return <div className="pl-4">{params?.row?.members?.length ?? ""}</div>
      }
  },
  {
      field: 'ratings',
      headerName: 'Ratings',
      flex: 1,
      id: 8,
      renderCell : (params) => {
        let rating = params.row.mentor_rating === 0 ? 3 : params.row.mentor_rating
        return <div className='flex gap-2 items-center text-[12px]'>
         
        <img src={StarColorIcon} alt="StarColorIcon" />
        <span>{rating}</span>
  
    </div>
    }
  }
];
