import ProgramImage from "../assets/images/logo_image.jpg";
import {
  programStatus
} from "./constant";

export const menusList = [{
    name: "All Programs",
    count: 13,
    page: '/programs'
  },
  {
    name: "Curated Programs",
    count: 62,
    page: '/programs?type=curated'
  },
  {
    name: "Recently Joined Programs",
    count: 12,
    page: '/programs?type=yettoplan'
  },
  {
    name: "Ongoing Programs",
    count: 78,
    page: '/programs?type=planned'
  },
  {
    name: "Bookmarked Programs",
    count: 24,
    page: '/programs?type=bookmarked'
  },
  {
    name: "Completed Programs",
    count: 67,
    page: '/programs?type=completed'
  },
];

export const Impressions = [{
    name: "Total views",
    count: 10,
  },
  {
    name: "Total Impressions",
    count: 27,
  },
];

export const Teams = [{
    name: "Team Members",
    count: 10,
  },
  {
    name: "Groups",
    count: 27,
  },
];

export const recentActivities = [{
    name: "Program 1 Report",
    status: "Approved by Supervisor",
    color: "rgba(29, 91, 191, 1)",
  },
  {
    name: "Program 2 Report",
    status: "Started by Rhea Ripley",
    color: "rgba(0, 174, 189, 1)",
  },
  {
    name: "Yoga Content Created",
    status: "Created by Steve",
    color: "rgba(255, 75, 38, 1)",
  },
  {
    name: "Program 1 Report",
    status: "Approved by Supervisor",
    color: "rgba(18, 179, 71, 1)",
  },
  {
    name: "Program 1 Report",
    status: "Approved by Supervisor",
    color: "rgba(255, 213, 0, 1)",
  },
];

export const curatedPrograms = [{
    id: 1,
    programImage: ProgramImage,
    category: "Category1",
    program_name: "Teaching Education Program1",
    sessions: "Session 1",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-07-02T17:45:21.439Z",
    program_end_date: "2024-07-03T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.yetToPlan
  },
  {
    id: 2,
    programImage: ProgramImage,
    category: "Category2",
    program_name: "Teaching Education Program2",
    sessions: "Session 2",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-06-28T17:45:21.439Z",
    program_end_date: "2024-06-28T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills2",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.planned
  },
  {
    id: 3,
    programImage: ProgramImage,
    category: "Category3",
    program_name: "Teaching Education Program3",
    sessions: "Session 3",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-06-28T17:45:21.439Z",
    program_end_date: "2024-06-29T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.inProgress
  },
  {
    id: 4,
    programImage: ProgramImage,
    category: "Category4",
    program_name: "Teaching Education Program1",
    sessions: "Session 4",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-06-29T17:45:21.439Z",
    program_end_date: "2024-06-30T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.completed
  },
  {
    id: 5,
    programImage: ProgramImage,
    category: "Category5",
    program_name: "Teaching Education Program2",
    sessions: "Session 5",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-06-30T17:45:21.439Z",
    program_end_date: "2024-06-31T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.yetToPlan
  },
  {
    id: 6,
    programImage: ProgramImage,
    category: "Category6",
    program_name: "Teaching Education Program3",
    sessions: "Session 6",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-07-03T17:45:21.439Z",
    program_end_date: "2024-07-04T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.planned
  },
  {
    id: 7,
    programImage: ProgramImage,
    category: "Category7",
    program_name: "Teaching Education Program1",
    sessions: "Session 7",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-07-02T17:45:21.439Z",
    program_end_date: "2024-07-02T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.inProgress
  },
  {
    id: 8,
    programImage: ProgramImage,
    category: "Category8",
    program_name: "Teaching Education Program2",
    sessions: "Session 8",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-07-04T17:45:21.439Z",
    program_end_date: "2024-07-05T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: true,
    status: programStatus.completed
  },
  {
    id: 9,
    programImage: ProgramImage,
    category: "Category9",
    program_name: "Teaching Education Program3",
    sessions: "Session 9",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-07-05T17:45:21.439Z",
    program_end_date: "2024-07-05T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: true,
    status: programStatus.yetToPlan
  },
  {
    id: 10,
    programImage: ProgramImage,
    category: "Category10",
    program_name: "Teaching Education Program10",
    sessions: "Session 1",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-07-02T17:45:21.439Z",
    program_end_date: "2024-07-03T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.yetToPlan
  },
  {
    id: 11,
    programImage: ProgramImage,
    category: "Category11",
    program_name: "Teaching Education Program11",
    sessions: "Session 1",
    decription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    course_level: "Medium",
    program_start_date: "2024-07-02T17:45:21.439Z",
    program_end_date: "2024-07-03T17:45:21.440Z",
    learning_materials: "Materials",
    mentee_limits: "10",
    group_discussion: "yes",
    individual_discussion: "yes",
    location: "USA",
    about_program: "About program desc",
    skills: "Skills1",
    sponsor_logo: {},
    benefits: "Benefits data",
    certificates: "Certificates",
    posted: new Date(),
    bookmark: false,
    status: programStatus.inProgress
  }


];


export const recentRequest = [{
    name: 'Rhea Ripley',
    type: 'Student',
    attended: 25,
    completed: 14
  },
  {
    name: 'Jhon Smith',
    type: 'CSR Employee',
    attended: 78,
    completed: 47
  },
  {
    name: 'Michael St',
    type: 'Student',
    attended: 32,
    completed: 12
  },
  {
    name: 'Rhea Ripley',
    type: 'Student',
    attended: 85,
    completed: 43
  },
  {
    name: 'Rhea Ripley',
    type: 'Student',
    attended: 44,
    completed: 16
  },
]


export const programFeeds = [{
    title: 'Math’s Teaching  Program',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    title: 'Math’s Teaching  Program',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    title: 'Math’s Teaching  Program',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    title: 'Math’s Teaching  Program',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    title: 'Math’s Teaching  Program',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
]