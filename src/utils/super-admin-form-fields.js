export const NewTicketFields = [
  {
    type: 'input',
    name: 'first_name',
    fieldtype: 'text',
    label: 'First Name',
    placeholder: 'Enter First Name',
    inputRules: {
      required: 'This field is required',
    },
    size: true,
    disable: true,
    width: 'col-span-1',
  },
  {
    type: 'input',
    name: 'last_name',
    fieldtype: 'text',
    label: 'Last Name',
    placeholder: 'Enter Last Name',
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    disable: true,
    width: 'col-span-1',
  },
  {
    type: 'input',
    name: 'subject_name',
    fieldtype: 'text',
    label: 'Subject Name',
    placeholder: 'Enter Subject Name',
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    disable: true,
    width: 'col-span-1',
  },
  {
    type: 'radio',
    name: 'gender',
    label: 'Position',
    placeholder: '',
    options: [
      {
        key: 'Admin',
        value: 'admin',
      },
      {
        key: 'Mentor',
        value: 'mentor',
      },
      {
        key: 'Mentee',
        value: 'mentee',
      },
    ],
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: 'col-span-1',
  },
  {
    type: 'input',
    name: 'email',
    fieldtype: 'email',
    label: 'E-mail',
    placeholder: 'Enter Email',
    inputRules: {
      required: 'This field is required',
    },
    size: true,
    disable: true,
  },

  {
    type: 'date',
    name: 'due_date',
    fieldtype: 'text',
    label: 'Due date',
    placeholder: 'Enter Due date',
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: 'col-span-1',
  },
  {
    type: 'file',
    name: 'assignee_attachment',
    fieldtype: 'file',
    label: 'Document Upload',
    placeholder: '',
    inputRules: {
      required: 'This field is required',
    },
    size: false,
    width: 'col-span-2',
  },
  {
    type: 'textbox',
    name: 'description',
    fieldtype: 'text',
    label: 'Description',
    placeholder: 'Enter Description',
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: 'col-span-2',
  },
];

export const UpdateTicketFields = [
  {
    type: 'textbox',
    name: 'comment',
    fieldtype: 'text',
    placeholder: 'Enter comment',
    label: 'Enter your comment',
    placeholder: 'comments',
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: 'col-span-1',
  },
  {
    type: 'date',
    name: 'due_date',
    fieldtype: 'text',
    label: 'Due date',
    placeholder: 'Enter Due date',
    inputRules: {
      // required: "This field is required",
    },
    size: true,
    width: 'col-span-1',
  },
  {
    type: 'file',
    name: 'attachment',
    fieldtype: 'file',
    label: 'Document Upload',
    placeholder: '',
    inputRules: {
      required: 'This field is required',
    },
    size: false,
    width: 'col-span-1',
  },
];
