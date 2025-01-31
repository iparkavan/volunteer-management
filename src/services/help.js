import {
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";

import api from "./api";


export const getHelpFAQ = createAsyncThunk(
    "getHelpFAQ",
    async () => {
        const helpFAQData = await api.get('/profile/help_desk_faq/');
        if (helpFAQData.status === 200 && helpFAQData.data) {
            return helpFAQData.data;
        }
        return helpFAQData
    }
);

export const getHelpContact = createAsyncThunk(
    "getHelpContact",
    async () => {
        const helpContactData = await api.get('/profile/help_desk_contact/');
        if (helpContactData.status === 200 && helpContactData.data) {
            return helpContactData.data;
        }
        return helpContactData
    }
);