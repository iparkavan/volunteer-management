import {
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";

import api from "./api";

export const getMenteeAllTask = createAsyncThunk(
    "getMenteeAllTask",
    async (query = {}) => {
        let queryString = Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&")

        const getMenteeTask = await api.get(`/program_task_assign/mentee_tasks_all?${queryString}`);
        if (getMenteeTask.status === 200 && getMenteeTask.data) {
            return getMenteeTask.data;
        }
        return getMenteeTask
    }
);

export const getAllTasks = createAsyncThunk(
    "getAllTasks",
    async (query = {}) => {
        let queryString = Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&")

        const getAllTask = await api.get(`/program_task_assign/task_list_mentee?${queryString}`);
        if (getAllTask.status === 200 && getAllTask.data) {
            return getAllTask.data;
        }
        return getAllTask
    }
);

export const getSpecificTask = createAsyncThunk(
    "getSpecificTask",
    async (query) => {
        let queryString = ''
        if (Object.keys(query).length) {
            const total = Object.keys(query).length
            queryString += '?'
            let m = 0;
            for (let a in query) {
                m++
                queryString += `${a}=${query[a]}${m === total ? '' : '&'}`

            }
        }

        const getSpecificTaskData = await api.get(`/program_task_assign/fetch_task_id${queryString}`);
        if (getSpecificTaskData.status === 200 && getSpecificTaskData.data) {
            return getSpecificTaskData.data;
        }
        return getSpecificTaskData
    }
);


export const getMenteeTaskfromMentor = createAsyncThunk(
    "getMenteeTaskfromMentor",
    async (query = {}, pageModel = {}) => {

        let queryString = Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&")

        // let filteredQuery = Object.fromEntries(
        //     Object.entries(query).filter(([key, value]) => !(key === "search" && value.trim().length === 0)
        //         && !(key === "status" && value.trim().length === 0))
        // );
        // let queryString = new URLSearchParams(filteredQuery).toString()

        const getAllTask = await api.get(`/program_task_assign/mentortask?${queryString}`);
        if (getAllTask.status === 200 && getAllTask.data) {
            return getAllTask.data;
        }
        return getAllTask
    }
);


export const updateTaskMark = createAsyncThunk(
    "updateTaskMark",
    async (data) => {
        const updateMark = await api.patch(`/program_task_assign/fetch_task_id`, data);
        if (updateMark.status === 200 && updateMark.data) {
            return updateMark.data;
        }
        return updateMark
    }
);


export const getMenteeTaskListFromMentor = createAsyncThunk(
    "getMenteeTaskListFromMentor",
    async (query = {}) => {

        let filteredQuery = Object.fromEntries(
            Object.entries(query).filter(([key, value]) => !(key === "search" && value.trim().length === 0)
                && !(key === "status" && value.trim().length === 0))
        );
        let queryString = new URLSearchParams(filteredQuery).toString()

        const getAllTask = await api.get(`/program_task_assign/task_list_mentor?${queryString}`);
        if (getAllTask.status === 200 && getAllTask.data) {
            return getAllTask.data;
        }
        return getAllTask
    }
);

export const updateAllPassFail = createAsyncThunk(
    "updateAllPassFail",
    async (payload) => {
        const updateAllPassFail = await api.patch(`/program_task_assign/fetch_task_id`, payload);
        if (updateAllPassFail.status === 200 && updateAllPassFail.data) {
            return updateAllPassFail.data;
        }
        return updateAllPassFail
    }
);


export const updateSinglePassFail = createAsyncThunk(
    "updateSinglePassFail",
    async (payload) => {
        const updateSinglePassFail = await api.patch(`/program_task_assign/fetch_task_id`, payload);
        if (updateSinglePassFail.status === 200 && updateSinglePassFail.data) {
            return updateSinglePassFail.data;
        }
        return updateSinglePassFail
    }
);

export const updateCancelAllTask = createAsyncThunk(
    "updateCancelAllTask",
    async (payload) => {
        const updateCancelAllTask = await api.put(`/program_task_assign/mentortask-cancel`, payload);
        if (updateCancelAllTask.status === 200 && updateCancelAllTask.data) {
            return updateCancelAllTask.data;
        }
        return updateCancelAllTask
    }
);
