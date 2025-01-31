import {
    createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "../../../services/api";

export const createEquipment = createAsyncThunk(
    "createEquipment",
    async (data) => {
        const createEquipment = await api.post(`equipment/`, data);
        if (createEquipment.status === 200 && createEquipment.data) {
            return createEquipment.data;
        }
        return createEquipment
    }
);


export const getEquipment = createAsyncThunk(
    "getEquipment",
    async (query) => {
        let filteredQuery = Object.fromEntries(
            Object.entries(query).filter(([key, value]) => !(key === "search" && value.trim().length === 0) &&
                !(key === "status" && value.trim().length === 0) && 
                !(key === "filter" && value === "all")
            )
        );
        let queryString = new URLSearchParams(filteredQuery).toString()
        const getEquipment = await api.get(`equipment?${queryString}`);
        if (getEquipment.status === 200 && getEquipment.data) {
            return getEquipment.data;
        }
        return getEquipment
    }
);

// equipment/19/


export const getParticularEquipment = createAsyncThunk(
    "getParticularEquipment",
    async (id) => {
        const getParticularEquipment = await api.get(`equipment/${id}`);
        if (getParticularEquipment.status === 200 && getParticularEquipment.data) {
            return getParticularEquipment.data;
        }
        return getParticularEquipment
    }
);

export const updateEquipment = createAsyncThunk(
    "updateEquipment",
    async (data) => {
        const updateEquipment = await api.put(`equipment/${data?.id}/`, data?.data);
        if (updateEquipment.status === 200 && updateEquipment.data) {
            return updateEquipment.data;
        }
        return updateEquipment
    }
);


export const getTrackData = createAsyncThunk(
    "getTrackData",
    async (id) => {
        const getTrackData = await api.get(`equipmenttrack/${id}`);
        if (getTrackData.status === 200 && getTrackData.data) {
            return getTrackData.data;
        }
        return getTrackData
    }
);

export const deactiveEquipment = createAsyncThunk(
    "deactiveEquipment",
    async (id) => {
        const deactiveEquipment = await api.put(`equipmenttract/${id}`);
        if (deactiveEquipment.status === 200 && deactiveEquipment.data) {
            return deactiveEquipment.data;
        }
        return deactiveEquipment
    }
);

export const getEquipmentHistory = createAsyncThunk(
    "getEquipmentHistory",
    async (data) => {
        console.log("data ===>", data)
        const query = data?.payload
        console.log("query ===>", query)
        let filteredQuery = Object.fromEntries(
            Object.entries(query).filter(([key, value]) => !(key === "search" && value.trim().length === 0))
        );
        let queryString = new URLSearchParams(filteredQuery).toString()
        const getEquipmentHistory = await api.get(`equipmet-program-tracking/${data?.id}/`);
        if (getEquipmentHistory.status === 200 && getEquipmentHistory.data) {
            return getEquipmentHistory.data;
        }
        return getEquipmentHistory
    }
);