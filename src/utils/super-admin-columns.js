import { Menu, MenuItem } from '@mui/material';
import MoreIcon from '../assets/icons/moreIcon.svg';

import { dateFormat } from '../utils';

export const TicketsColumns = [
  {
    field: 'ticket_id',
    headerName: 'Ticket Id',
    flex: 1,
    id: 0,
    renderCell: (params) => {
      return <div>{params.row.id}</div>;
    },
  },
  {
    field: 'ticket_subject',
    headerName: 'Subject Name',
    flex: 1,
    id: 1,
    renderCell: (params) => {
      return <div>{params.row.subject}</div>;
    },
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    id: 2,
    renderCell: (params) => {
      return <div>{params.row.description}</div>;
    },
  },
  {
    field: 'Email',
    headerName: 'Email',
    flex: 1,
    id: 3,
    renderCell: (params) => {
      return <div>{params.row.created_by_detail.email}</div>;
    },
  },
  {
    field: 'created_at',
    headerName: 'Request date',
    flex: 1,
    id: 4,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.created_at)}</div>;
    },
  },
  {
    field: 'Request by',
    headerName: 'Request by',
    flex: 1,
    id: 5,
    renderCell: (params) => {
      return (
        <div>
          {params.row.created_by_detail.first_name}{' '}
          {params.row.created_by_detail.last_name}
        </div>
      );
    },
  },
  {
    field: 'Position',
    headerName: 'Position',
    flex: 1,
    id: 6,
    renderCell: (params) => {
      return <div>{params.row.created_by_detail.role}</div>;
    },
  },
  // {
  //   field: 'ticket_attachment',
  //   headerName: 'File size',
  //   flex: 1,
  //   id: 7,
  //   renderCell: (params) => {
  //     return (
  //       <div>
  //         {params.row.ticket_attachment ? 'Available' : 'Not Available'}
  //       </div>
  //     );
  //   },
  // },
  {
    field: 'due_date',
    headerName: 'Due date',
    flex: 1,
    id: 8,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.due_date)}</div>;
    },
  },
  {
    field: 'changed_at',
    headerName: 'Last update date',
    flex: 1,
    id: 9,
    renderCell: (params) => {
      return <div>{dateFormat(params.row.changed_at)}</div>;
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    id: 10,
    renderCell: (params) => {
      return <div>{params.row.status}</div>;
    },
  },
];
