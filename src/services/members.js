import {
    createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "./api";


export const getMembers = createAsyncThunk(
    "getMembers",
    async (query = '') => {
        let queryString = new URLSearchParams(query).toString()
        const getActivities = await api.get(`mentee_program/launched-programs${queryString}`);
        if (getActivities.status === 200 && getActivities.data) {
            return getActivities.data;
        }
        return getActivities;
    }
);


export const getMembersList = createAsyncThunk(
    "getMembersList",
    async (query = '') => {
        let queryString = Object.entries(query).map(([key, value])=>`${key}=${value}`).join("&")
        // new URLSearchParams(query).toString()
        const getMembersInfo = await api.get(`members/member-list?${queryString}`);
        if (getMembersInfo.status === 200 && getMembersInfo.data) {
            return {
                role: query.role_name,
                data: getMembersInfo.data
            };
        }
        return getMembersInfo;
    }
);

export const activateUser = createAsyncThunk(
    "activateUser",
    async (data) => {
        const activateUserInfo = await api.post(`members/active`, data);
        if (activateUserInfo.status === 200 && activateUserInfo.data) {
            return activateUserInfo.data;
        }
        return activateUserInfo;
    }
);

export const deactivateUser = createAsyncThunk(
    "deactivateUser",
    async (data) => {
        const deactivateUserInfo = await api.post(`members/members-request`, data);
        if (deactivateUserInfo.status === 200 && deactivateUserInfo.data) {
            return deactivateUserInfo.data;
        }
        return deactivateUserInfo;
    }
);

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (data) => {
        const deleteUserInfo = await api.post(`users/delete`, data);
        if (deleteUserInfo.status === 200 && deleteUserInfo.data) {
            return deleteUserInfo.data;
        }
        return deleteUserInfo;
    }
);


export const getAssignMentorProgram = createAsyncThunk(
    "getAssignMentorProgram",
    async (query = '') => {
        let queryString = new URLSearchParams(query).toString()
        const getAssignMentorProgramInfo = await api.get(`members/assign-mentors?${queryString}`);
        if (getAssignMentorProgramInfo.status === 200 && getAssignMentorProgramInfo.data) {
            return { keys: Object.keys(query), data: getAssignMentorProgramInfo.data };
        }
        return getAssignMentorProgramInfo;
    }
);


export const submitAssignProgram = createAsyncThunk(
    "submitAssignProgram",
    async (data) => {
        const submitAssignProgramInfo = await api.post(`members/assign-mentors`, data);
        if (submitAssignProgramInfo.status === 200 && submitAssignProgramInfo.data) {
            return submitAssignProgramInfo.data;
        }
        return submitAssignProgramInfo;
    }
);

