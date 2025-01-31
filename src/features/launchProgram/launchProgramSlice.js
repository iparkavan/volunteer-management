import {
    createSlice
} from "@reduxjs/toolkit";

import { getLaunchPrograms } from "../../services/launchProgram";

const initialState = {
    launchProgram: [],
    loading: false,
    status: "",
    error: "",
};

export const launchProgramSlice = createSlice({
    name: "launchProgram",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLaunchPrograms.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getLaunchPrograms.fulfilled, (state, action) => {
                return {
                    ...state,
                    launchProgram: action.payload,
                    loading: false,
                };
            })
            .addCase(getLaunchPrograms.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

      
    },
});

export default launchProgramSlice.reducer;