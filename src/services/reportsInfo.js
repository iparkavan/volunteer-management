import {
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";

import api from "./api";

// Get All Reports
export const getAllReports = createAsyncThunk(
    "getAllReports",
    async (query = '') => {
        const queryString = query !== '' ? `?${new URLSearchParams(query).toString()}` : ''
        const allReports = await api.get(`request/${queryString}`);
        if (allReports.status === 200 && allReports.data) {
            return allReports.data;
        }
        return allReports
    }
);

export const updateReportLocalState = createAction('update/updateReportLocalState')

export const getCompletedProgramsByCategoryId = createAsyncThunk(
    "getCompletedProgramsByCategoryId",
    async (query) => {
        const allPrograms = await api.get(`program/completed-program-list?category_id=${query.categoryId}&type=${query.type}`);
        if (allPrograms.status === 200 && allPrograms.data) {
            return allPrograms.data;
        }
        return allPrograms
    }
);

export const getProgramsByCategoryId = createAsyncThunk(
    "getProgramsByCategoryId",
    async (categoryId) => {
        const allPrograms = await api.get(`reports/get-programs-by-id/${categoryId}`);
        if (allPrograms.status === 200 && allPrograms.data) {
            return allPrograms.data;
        }
        return allPrograms
    }
);

export const getReportProgramDetails = createAsyncThunk(
    "getReportProgramDetails",
    async (id,type) => {
        if (id) {
            const getDetailsofProgram = await api.get(`programs/${id}`);
            if (getDetailsofProgram.status === 200 && getDetailsofProgram.data && getDetailsofProgram.data.program) {
                return getDetailsofProgram.data.program;
            }

            return type?getDetailsofProgram.data: getDetailsofProgram;
        } else {
            return {};

        }
    }
);


export const createReport = createAsyncThunk(
    "createReport",
    async (data) => {
        const createRept = await api.post(`request/`, data);
        if (createRept.status === 200 && createRept.data) {
            return createRept.data;
        }
        return createRept
    }
);

export const updateReport = createAsyncThunk(
    "updateReport",
    async (data) => {
        const createRept = await api.put(`request/${data?.id}/`, data);
        if (createRept.status === 200 && createRept.data) {
            return createRept.data;
        }
        return createRept
    }
);


export const getReportDetails = createAsyncThunk(
    "getReportDetails",
    async (reportId) => {
        const reportDetails = await api.get(`request/${reportId}`);
        if (reportDetails.status === 200 && reportDetails.data) {
            return reportDetails.data;
        }
        return reportDetails
    }
);


export const updateReportDetails = createAsyncThunk(
    "updateReportDetails",
    async (data) => {
        const payload = Object.fromEntries(
            Object.entries(data).filter(([key]) => key !== "id")
        );
        const reportUpdate = await api.put(`request/${data?.id}/`, data);
        if (reportUpdate.status === 200 && reportUpdate.data) {
            return reportUpdate.data;
        }
        return reportUpdate
    }
);


export const deleteReports = createAsyncThunk(
    "deleteReports",
    async (data) => {
        const deleteReport = await api.post('request/report-delete/', data);
        if (deleteReport.status === 200 && deleteReport.data) {
            return deleteReport.data;
        }
        return deleteReport
    }
);


export const updateReportImage = createAsyncThunk(
    "updateReportImage",
    async (data) => {
        const updateReportImage = await api.post(`request/content_request/images/${data?.id}`, data?.data);
        if (updateReportImage.status === 200 && updateReportImage.data) {
            return updateReportImage.data;
        }
        return updateReportImage

    }
);

export const uploadVideoFiles = createAsyncThunk(
    "uploadVideoFiles",
    async (data) => {
        const uploadVideoFiles = await api.post(`request/content_request/videos/${data?.id}`, data?.data);
        if (uploadVideoFiles.status === 200 && uploadVideoFiles.data) {
            return uploadVideoFiles.data;
        }
        return uploadVideoFiles
    }

);

export const handlehtmlsend = createAsyncThunk(
    "handlehtmlsend",
    async (data) => {
        const handlehtmlsend = await api.post(`request/content_request/html/${data?.id}`, data?.data);
        if (handlehtmlsend.status === 200 && handlehtmlsend.data) {
            return handlehtmlsend.data;
        }
        return handlehtmlsend
    }

);

export const handleCancelReport = createAsyncThunk(
    "handleCancelReport",
    async (id) => {
        const handleCancelReport = await api.post(`request/confirm_save_html_content/${id}/false`);
        if (handleCancelReport.status === 200 && handleCancelReport.data) {
            return handleCancelReport.data;
        }
        return handleCancelReport
    }

);

