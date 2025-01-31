import {
    createSlice
} from "@reduxjs/toolkit";
import { createEquipment, getEquipment, getEquipmentHistory, getParticularEquipment, getTrackData, updateEquipment } from "./equipment";

const initialState = {
    getEquipmentData: [],
    getParticularEquipmentData: {},
    trackData: {},
    equipmentHistoryData: {},
    loading: false,
    status: "",
    error: "",
};

export const equipmentSlice = createSlice({
    name: "equipmentData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createEquipment.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(createEquipment.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(createEquipment.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getEquipment.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getEquipment.fulfilled, (state, action) => {
                return {
                    ...state,
                    getEquipmentData: action?.payload ?? [],
                    loading: false,
                };
            })
            .addCase(getEquipment.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(getParticularEquipment.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getParticularEquipment.fulfilled, (state, action) => {
                return {
                    ...state,
                    getParticularEquipmentData: action?.payload ?? [],
                    loading: false,
                };
            })
            .addCase(getParticularEquipment.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(updateEquipment.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateEquipment.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(updateEquipment.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(getTrackData.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getTrackData.fulfilled, (state, action) => {
                return {
                    ...state,
                    trackData: action?.payload,
                    loading: false,
                };
            })
            .addCase(getTrackData.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(getEquipmentHistory.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getEquipmentHistory.fulfilled, (state, action) => {
                return {
                    ...state,
                    equipmentHistoryData: action?.payload ?? [],
                    loading: false,
                };
            })
            .addCase(getEquipmentHistory.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
    }
})


export default equipmentSlice.reducer;