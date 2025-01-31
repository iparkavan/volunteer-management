import {
    createAsyncThunk,
} from "@reduxjs/toolkit";
import api from "./api";


export const getLaunchPrograms = createAsyncThunk(
    "getLaunchPrograms",
    async (query='') => {
        let queryString = new URLSearchParams(query).toString()
        if(queryString !== ''){
            queryString = `?${queryString}`
        }
        const getLaunchProgramsInfo = await api.get(`mentors/launched-programs${queryString}`);
        if (getLaunchProgramsInfo.status === 200 && getLaunchProgramsInfo.data) {
            return getLaunchProgramsInfo.data;
        }
        return getLaunchProgramsInfo;
    }
);

