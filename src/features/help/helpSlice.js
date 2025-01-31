import {
    createSlice
} from "@reduxjs/toolkit";
import {
    getHelpFAQ,
    getHelpContact
} from "../../services/help";

const initialState = {
    helpFAQ: [],
    helpContact: [],
    loading: false,
    status: "",
    error: "",
};

export const helpSlice = createSlice({
    name: "helpInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHelpFAQ.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getHelpFAQ.fulfilled, (state, action) => {
                return {
                    ...state,
                    helpFAQ: action.payload,
                    loading: false,
                };
            })
            .addCase(getHelpFAQ.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getHelpContact.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getHelpContact.fulfilled, (state, action) => {
                return {
                    ...state,
                    helpContact: action.payload,
                    loading: false,
                };
            })
            .addCase(getHelpContact.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

    },
});

export default helpSlice.reducer;