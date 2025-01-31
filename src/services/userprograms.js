import {
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";

import api from "./api";
import {
    programActionStatus
} from "../utils/constant";

// Get All Programs
export const getUserPrograms = createAsyncThunk(
    "getUserPrograms",
    async (query) => {
        let updateQuery = query
        if (query.value === 'planned') {
            updateQuery = { ...query, value: 'yettojoin' }
        }

        let queryParams = ''
        if (updateQuery && Object.keys(updateQuery).length) {
            if (updateQuery.hasOwnProperty('type')) {
                queryParams = (queryParams === '' ? '?' : '&') + `${updateQuery.type}=${updateQuery.value}`
            }

            if (updateQuery.hasOwnProperty('page')) {
                queryParams = (queryParams === '' ? '?' : `${queryParams}&`) + `${updateQuery.page}=${updateQuery.number}`
            }

            if (updateQuery.hasOwnProperty('search')) {
                queryParams = (queryParams === '' ? '?' : `${queryParams}&`) + `${updateQuery.search.search}=${updateQuery.search.value}`
            }

            if (updateQuery.hasOwnProperty('date')) {
                queryParams = (queryParams === '' ? '?' : `${queryParams}&`) + `${updateQuery.date.date}=${updateQuery.date.value}`
            }

            if (updateQuery.hasOwnProperty('category_id')) {
                queryParams = (queryParams === '' ? '?' : `${queryParams}&`) + `category_id=${updateQuery.category_id}`
            }
        }
        queryParams = queryParams !== '' ? `${queryParams}&limit=6` : '?limit=6'

        const getUserProgram = await api.get(`programs${queryParams}`);
        if ((getUserProgram.status === 200 || getUserProgram.status === 301) && getUserProgram.data) {
            const response = {
                ...getUserProgram.data,
                filterType: updateQuery?.type || '',
                filterValue: updateQuery?.value || ''
            }
            return response;
        }
        return getUserProgram;
    }
);

export const getAllProgramDetails = createAsyncThunk(
    "getAllProgramDetails",
    async () => {

        const getDetailsofProgram = await api.get(`program/admin-program`);
        if (getDetailsofProgram.status === 200 && getDetailsofProgram.data && getDetailsofProgram.data.program) {
            return getDetailsofProgram.data.program;
        }
        return getDetailsofProgram;
    }
);


export const updateProgram = createAsyncThunk(
    "updateProgram",
    async (data) => {
        const updateUserProgram = await api.post("update_program", data);
        if (updateUserProgram.status === 200 && updateUserProgram.data) {
            let status = ''
            if (data.status && data.status !== '') {
                status = data.status
            }
            if (data.hasOwnProperty('is_bookmark') && data.is_bookmark !== '') {
                status = programActionStatus.bookmark
            }
            return {
                programdetails: updateUserProgram.data,
                status
            };
        }
        return updateUserProgram;
    }
);
export const launchProgram = createAsyncThunk(
    "launchProgram",
    async (data) => {
        const updateUserProgram = await api.post("request/", data);
        if (updateUserProgram.status === 200 && updateUserProgram.data) {
            let status = ''
            // if (data.status && data.status !== '') {
            //     status = data.status
            // }
            // if (data.hasOwnProperty('is_bookmark') && data.is_bookmark !== '') {
            //     status = programActionStatus.bookmark
            // }
            return {
                programdetails: updateUserProgram.data,
                status
            };
        }
        return updateUserProgram;
    }
);
export const acceptProgram = createAsyncThunk(
    "acceptProgram",
    async (data) => {
        const { id, ...restOfData } = data
        const updateUserProgram = await api.patch(`request/${id}/`, restOfData);
        if (updateUserProgram.status === 200 && updateUserProgram.data) {
            let status = ''
            // if (data.status && data.status !== '') {
            //     status = data.status
            // }
            // if (data.hasOwnProperty('is_bookmark') && data.is_bookmark !== '') {
            //     status = programActionStatus.bookmark
            // }
            return {
                programdetails: updateUserProgram.data,
                status
            };
        }
        return updateUserProgram;
    }
);


export const getProgramCounts = createAsyncThunk(
    "getProgramCounts",
    async (query) => {
        if (!query || Object.keys(query).length === 0) {
            const getProgramAllCounts = await api.get(`program_status_count`);
            if (getProgramAllCounts.status === 200 && getProgramAllCounts.data) {
                return getProgramAllCounts.data;
            }
            return getProgramAllCounts;
        } else {
            let filteredQuery = Object.fromEntries(
                Object.entries(query).filter(
                    ([key, value]) =>
                        !(key === "search" && value.trim().length === 0) &&
                        !(key === "status" && value === "all") &&
                        !(key === "filter_by" && value === "all")
                )
            );
            let queryString = new URLSearchParams(filteredQuery).toString();

            const getProgramAllCounts = await api.get(
                `program_status_count?${queryString}`
            );
            if (getProgramAllCounts.status === 200 && getProgramAllCounts.data) {
                return getProgramAllCounts.data;
            }
            return getProgramAllCounts;
        }
    }
);

export const getProgramDetails = createAsyncThunk(
    "getProgramDetails",
    async (data) => {
        const { id, role } = data

        const getDetailsofProgram = await api.get(role === "admin" ? `program/admin-program/${id}` : `programs/${id}`);
        if (getDetailsofProgram.status === 200 && getDetailsofProgram.data && getDetailsofProgram.data) {
            return getDetailsofProgram.data;
        }
        return getDetailsofProgram;
    }
);



export const getSpecificProgramDetails = createAsyncThunk(
    "getSpecificProgramDetails",
    async (ids) => {
        const { id, requestId = '' } = ids

        const getDetailsofProgram = await api.get(`programs/${id}?request_id=${requestId}`);
        // const getDetailsofProgram = await api.get(`fetch_program_detail/${queryString}`);
        if (getDetailsofProgram.status === 200 && getDetailsofProgram.data && getDetailsofProgram.data.program) {
            return getDetailsofProgram.data.program;
        }
        return getDetailsofProgram;
    }
);

export const getMentees = createAsyncThunk(
    "getMentees",
    async () => {
        const getMenteesList = await api.get('mentees');
        if (getMenteesList.status === 200 && getMenteesList.data) {
            return getMenteesList.data;
        }
        return getMenteesList;
    }
);

export const getProgramTaskMentees = createAsyncThunk(
    "getProgramTaskMentees",
    async (id = '') => {
        const allMentees = await api.get(`program/participates?program_id=${id}`);
        if (allMentees.status === 200 && allMentees.data) {
            return allMentees.data;
        }
        return allMentees;
    }
);

export const getProgramMentees = createAsyncThunk(
    "getProgramMentees",
    async (id = '') => {
        const allMentees = await api.get('program_task_assign/list_mentee');
        if (allMentees.status === 200 && allMentees.data) {
            return allMentees.data;
        }
        return allMentees;
    }
);

export const assignProgramTask = createAsyncThunk(
    "assignProgramTask",
    async (data) => {
        const headers = {
            'Content-Type': 'application/json',
        }
        const programTaskAssign = await api.post('program_task_assign/create_task', data, {
            headers: headers
        });
        if (programTaskAssign.status === 201 && programTaskAssign.data) {
            return programTaskAssign.data;
        }
        return programTaskAssign;
    }
);

export const upateProgramTask = createAsyncThunk(
    "upateProgramTask",
    async (data) => {
        const headers = {
            'Content-Type': 'application/json',
        }
        const upateProgramTask = await api.patch('program_task_assign/mentortask', data, {
            headers: headers
        });
        if (upateProgramTask.status === 201 && upateProgramTask.data) {
            return upateProgramTask.data;
        }
        return upateProgramTask;
    }
);


export const getMenteeDetails = createAsyncThunk(
    "getMenteeDetails",
    async (menteeId) => {
        const menteeDetails = await api.post(`program_task_assign/list_mentee?id=${menteeId}`);
        if (menteeDetails.status === 200 && menteeDetails.data) {
            return menteeDetails.data;
        }
        return menteeDetails;
    }
);


export const getMenteePrograms = createAsyncThunk(
    "getMenteePrograms",
    async (query) => {

        let queryString = query
        if (queryString.value === 'yettojoin') {
            queryString.value = 'planned';
        }

        if (queryString.value === 'yettostart') {
            queryString.value = 'recently_joined';
        }

        if (queryString.value === 'inprogress') {
            queryString.value = 'ongoing';
        }


        let queryParams = ''
        if (queryString && Object.keys(queryString).length) {
            if (queryString.hasOwnProperty('type')) {
                queryParams = (queryParams === '' ? '?' : '&') + `${queryString.type}=${queryString.value}`
            }

            if (queryString.hasOwnProperty('page')) {
                queryParams = (queryParams === '' ? '?' : `${queryParams}&`) + `${queryString.page}=${queryString.number}`
            }

            if (queryString.hasOwnProperty('search')) {
                queryParams = (queryParams === '' ? '?' : `${queryParams}&`) + `${queryString.search.search}=${queryString.search.value}`
            }

            if (queryString.hasOwnProperty('date')) {
                queryParams = (queryParams === '' ? '?' : `${queryParams}&`) + `${queryString.date.date}=${queryString.date.value}`
            }


            if (queryString.hasOwnProperty('category_id')) {
                queryParams = (queryParams === '' ? '?' : `${queryParams}&`) + `category_id=${queryString.category_id}`
            }


        }
        queryParams = queryParams !== '' ? `${queryParams}&limit=6` : '?limit=6'


        // const queryParams = queryString && Object.keys(queryString).length ? `?${queryString.type}=${queryString.value}&limit=9` : '?limit=9'
        const getUserProgram = await api.get(`programs${queryParams}`);
        if (getUserProgram.status === 200 && getUserProgram.data) {
            const response = {
                ...getUserProgram.data,
                filterType: queryString?.type || '',
                filterValue: queryString?.value || ''
            }
            return response;
        }
        return getUserProgram;
    }
);


export const getMenteeJoinedInProgram = createAsyncThunk(
    "getMenteeJoinedInProgram",
    async (data) => {
        const menteeJoinedProgram = await api.post('mentee_program/enroll_check', data);
        if (menteeJoinedProgram.status === 200 && menteeJoinedProgram.data) {
            return menteeJoinedProgram.data;
        }
        return menteeJoinedProgram;
    }
);

export const menteeJoinProgram = createAsyncThunk(
    "menteeJoinProgram",
    async (data) => {
        const menteeJoinProgram = await api.post('mentee_program/join_program', data);
        if (menteeJoinProgram.status === 200 && menteeJoinProgram.data) {
            return menteeJoinProgram.data;
        }
        return menteeJoinProgram;
    }
);


export const getMenteeProgramCount = createAsyncThunk(
    "getMenteeProgramCount",
    async (query) => {
        if (!query || Object.keys(query).length === 0) {
            const menteeProgramCount = await api.get(`program_status_count`);
            if (menteeProgramCount.status === 200 && menteeProgramCount.data) {
                return menteeProgramCount.data;
            }
            return menteeProgramCount;
        } else {


            let filteredQuery = Object.fromEntries(
                Object.entries(query).filter(
                    ([key, value]) =>
                        !(key === 'search' && value.trim().length === 0) &&
                        !(key === 'status' && value === 'all')
                )
            );
            let queryString = new URLSearchParams(filteredQuery).toString();

            const menteeProgramCount = await api.get(`program_status_count?${queryString}`);
            if (menteeProgramCount.status === 200 && menteeProgramCount.data) {
                return menteeProgramCount.data;
            }
            return menteeProgramCount;
        }
    }
);


export const startProgramTask = createAsyncThunk(
    "startProgramTask",
    async (data) => {
        const startTask = await api.patch('program_task_assign/task_start', data);
        if (startTask.status === 200 && startTask.data) {
            return startTask.data;
        }
        return startTask;
    }
);


export const getProgramTaskDetails = createAsyncThunk(
    "getProgramTaskDetails",
    async (taskId) => {
        const queryString = taskId !== '' ? `?task_id=${taskId}` : ''
        const taskdetails = await api.get(`program_task_assign/task_submission${queryString}`);
        if (taskdetails.status === 200 && taskdetails.data) {
            return taskdetails.data;
        }
        return taskdetails;
    }
);


export const submitProgramTaskDetails = createAsyncThunk(
    "submitProgramTaskDetails",
    async (data) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const submitTask = await api.post("program_task_assign/task_submission", data, { headers: headers });
        if (submitTask.status === 201 && submitTask.data) {
            return submitTask.data;
        }
        return submitTask;
    }
);

export const chartProgramList = createAsyncThunk(
    "chartProgramList",
    async (data) => {
        const chartProgram = await api.get(`program-performance?filter_by=${data}`);
        if (chartProgram.status === 200 && chartProgram.data) {
            return chartProgram.data;
        }
        return chartProgram;
    }
);

export const updateUserProgramInfo = createAction('update/userProgramInfo')

export const updateProgramImage = createAsyncThunk(
    "updateProgramImage",
    async ({ id, data }) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const updateProgramImageData = await api.patch(`programs/${id}`, data, {
            headers: headers
        });
        if (updateProgramImageData.status === 201) {
            return updateProgramImageData;
        }
        return updateProgramImageData;
    }
);


export const updateTaskSubmission = createAsyncThunk(
    "updateTaskSubmission",
    async (payload) => {
        const updateTaskSubmission = await api.put(`/program_task_assign/task_submission`, payload);
        if (updateTaskSubmission.status === 200 && updateTaskSubmission.data) {
            return updateTaskSubmission.data;
        }
        return updateTaskSubmission
    }
);