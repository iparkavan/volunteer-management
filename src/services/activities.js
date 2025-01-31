import {
    createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "./api";


export const userActivities = createAsyncThunk(
    "userActivities",
    async (query = '') => {
        let queryString = ''
        if (Object.keys(query).length) {
            queryString += '?'
            for (let a in query) {
                queryString += `${a}=${query[a]}`
            }
        }
        const getActivities = await api.get(`notification/notification${queryString}`);
        if (getActivities.status === 200 && getActivities.data) {
            return getActivities.data;
        }
        return getActivities;
    }
);



export const userActivitiyVisited = createAsyncThunk(
    "userActivitiyVisited",
    async (id) => {
        const getActivityVisit = await api.get(`notification/visited/${id}`);
        if (getActivityVisit.status === 200 && getActivityVisit.data) {
            return getActivityVisit.data;
        }
        return getActivityVisit;
    }
);


export const docuSign = createAsyncThunk(
    "docuSign",
    async () => {
        const docuSign = await api.get(`docusign/auth`);
        if (docuSign.status === 200 && docuSign.data) {
            return docuSign.data;
        }
        return docuSign;
    }
);