import {
    createSlice
} from "@reduxjs/toolkit";

import {
    feedStatus
} from "../../utils/constant";
import {
    activateUser,
    deactivateUser,
    deleteUser,
    getAssignMentorProgram,
    getMembersList,
    submitAssignProgram
} from "../../services/members";

const initialState = {
    mentor: [],
    mentee: [],
    assignProgramInfo: {
        category: [],
        mentor: [],
        programs: []
    },
    loading: false,
    status: "",
    error: "",
};

export const memberSlice = createSlice({
    name: "members",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMembersList.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getMembersList.fulfilled, (state, action) => {
                let {
                    role,
                    data
                } = action.payload
                return {
                    ...state,
                    [role]: data,
                    status: feedStatus.load,
                    loading: false,
                    error: ''
                };
            })
            .addCase(getMembersList.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(activateUser.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(activateUser.fulfilled, (state, action) => {
                return {
                    status: '',
                    loading: false,
                    error: ''
                };
            })
            .addCase(activateUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(deleteUser.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                return {
                    status: '',
                    loading: false,
                    error: ''
                };
            })
            .addCase(deleteUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(deactivateUser.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deactivateUser.fulfilled, (state, action) => {
                return {
                    status: '',
                    loading: false,
                    error: ''
                };
            })
            .addCase(deactivateUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(getAssignMentorProgram.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getAssignMentorProgram.fulfilled, (state, action) => {
                const {
                    data,
                    keys
                } = action.payload
                let category = []
                let mentors = []
                let program = []
                if (keys.length === 1 && keys.includes('user_id')) {
                    category = data
                }

                if (keys.length === 2 && keys.includes('user_id') && keys.includes('category_id')) {
                    category = state.assignProgramInfo.category;
                    mentors = data.mentor_details || []
                    program = data.program_details || []
                }

                return {
                    ...state,
                    assignProgramInfo: {
                        category: category,
                        mentor: mentors,
                        programs: program
                    },
                    status: feedStatus.load,
                    loading: false,
                    error: ''
                };
            })
            .addCase(getAssignMentorProgram.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(submitAssignProgram.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(submitAssignProgram.fulfilled, (state, action) => {
                return {
                    status: '',
                    loading: false,
                    error: ''
                };
            })
            .addCase(submitAssignProgram.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


    },
});

export default memberSlice.reducer;