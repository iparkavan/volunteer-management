import { createSlice } from "@reduxjs/toolkit";
import { acceptMember, createCategory, deleteCategory, getCategory, getCategoryView, updateCategoryLocalState } from "../../services/category";

const initialState = {
    formDetails: {},
    categories: [],
    viewData: [],
    status: "",
    loading: false,
    error: ""
}

export const adminCategory = createSlice({
    name: "adminCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                return {
                    ...state,
                    status: "pending",
                    loading: true,
                };
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: "done",
                    loading: false,
                };
            })
            .addCase(createCategory.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        // Get Category data

        builder
            .addCase(getCategory.pending, (state) => {
                return {
                    ...state,
                    status: "pending",
                    loading: true,
                };
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                console.log("abcd", action)
                return {
                    ...state,
                    status: "done",
                    categories: action.payload,
                    loading: false,
                };
            })
            .addCase(getCategory.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        // Delete Category
        builder
            .addCase(deleteCategory.pending, (state) => {
                return {
                    ...state,
                    status: "pending",
                    loading: true,
                };
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: "done",
                    loading: false,
                };
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        // reset Localstate

        builder.addCase(updateCategoryLocalState, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })


        // View 

        builder
            .addCase(getCategoryView.pending, (state) => {
                return {
                    ...state,
                    status: "pending",
                    loading: true,
                };
            })
            .addCase(getCategoryView.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: "done",
                    viewData: action.payload,
                    loading: false,
                };
            })
            .addCase(getCategoryView.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(acceptMember.pending, (state) => {
                return {
                    ...state,
                    status: "pending",
                    loading: true,
                };
            })
            .addCase(acceptMember.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: "done",
                    loading: false,
                };
            })
            .addCase(acceptMember.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
    }
})

export default adminCategory.reducer;