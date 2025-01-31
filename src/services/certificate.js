import {
    createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "./api";


export const getCertificates = createAsyncThunk(
    "getCertificates",
    async (query = {}) => {
        let queryString = ''
        if (Object.keys(query).length) {
            queryString += '?'
            for (let a in query) {
                queryString += `${a}=${query[a]}`
            }
        }

        const getCertificate = await api.get(`/mentee_program/certifications${queryString}`);
        if (getCertificate.status === 200 && getCertificate.data) {
            return getCertificate.data;
        }
        return getCertificate
    }
);

export const createCertificate = createAsyncThunk(
    "createCertificate",
    async (data) => {
        const createRept = await api.post(`request/`, data);
        if (createRept.status === 200 && createRept.data) {
            return createRept.data;
        }
        return createRept
    }
);
export const certificateDownload = createAsyncThunk(
    "certificateDownload",
    async (id) => {
        const createRept = await api.get(`mentee_program/certifications/download?id=${id}&action=view`);
        if (createRept.status === 200 && createRept.data) {
            return createRept.data;
        }
        return createRept
    }
);
export const getCertificateList = createAsyncThunk(
    "getCertificateList",
    async (data) => {
        const createRept = await api.get(`request/${data}`);
        if (createRept.status === 200 && createRept.data) {
            return createRept.data;
        }
        return createRept
    }
);
export const getCertificateMember = createAsyncThunk(
    "getCertificateMember",
    async (data) => {
        const createRept = await api.get(`request/${data}`);
        if (createRept.status === 200 && createRept.data) {
            return createRept.data;
        }
        return createRept
    }
);
export const triggerCertificateAction = createAsyncThunk(
    "triggercertificateAction",
    async (queryString) => {
        const query = Object.keys(queryString).length ? `?program_id=${queryString.program_id}&certificate_id=${queryString.certificate_id}&action=${queryString.action_type}` : ''
        const certificateAction = await api.get(`/mentee_program/certifications/download/${query}`);
        if (certificateAction.status === 200 && certificateAction.data) {
            return {
                ...certificateAction.data,
                action_type: queryString.action_type
            };
        }
        return certificateAction
    }
);