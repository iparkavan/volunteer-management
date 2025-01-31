import {
    createSlice
} from "@reduxjs/toolkit";

import {
    getAllTasks,
    getMenteeAllTask,
    getMenteeTaskfromMentor,
    getMenteeTaskListFromMentor,
    getSpecificTask,
    updateAllPassFail,
    updateCancelAllTask,
    updateSinglePassFail,
    updateTaskMark
} from "../../services/task";
import {
    TaskApiStatus
} from "../../utils/constant";

const initialState = {
    taskList: [],
    task: {},
    menteeTask: [],
    menteeProgramTask: [],
    menteeTaskList:[],
    loading: false,
    status: "",
    error: "",
};

export const taskSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                return {
                    ...state,
                    taskList: action.payload,
                    status: TaskApiStatus.load,
                    loading: false,
                };
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getSpecificTask.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getSpecificTask.fulfilled, (state, action) => {
                return {
                    ...state,
                    task: action.payload,
                    status: TaskApiStatus.load,
                    loading: false,
                };
            })
            .addCase(getSpecificTask.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getMenteeTaskfromMentor.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getMenteeTaskfromMentor.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: TaskApiStatus.load,
                    menteeTask: action.payload,
                    loading: false,
                };
            })
            .addCase(getMenteeTaskfromMentor.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });



        builder
            .addCase(updateTaskMark.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateTaskMark.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: TaskApiStatus.updatemark,
                    loading: false,
                };
            })
            .addCase(updateTaskMark.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });



            builder
            .addCase(getMenteeAllTask.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getMenteeAllTask.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: '',
                    menteeProgramTask: action.payload,
                    loading: false,
                };
            })
            .addCase(getMenteeAllTask.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(getMenteeTaskListFromMentor.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getMenteeTaskListFromMentor.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: TaskApiStatus.load,
                    menteeTaskList: action.payload,
                    loading: false,
                };
            })
            .addCase(getMenteeTaskListFromMentor.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(updateAllPassFail.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateAllPassFail.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: TaskApiStatus.load,
                    menteeTaskList: action.payload,
                    loading: false,
                };
            })
            .addCase(updateAllPassFail.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


            builder
            .addCase(updateSinglePassFail.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateSinglePassFail.fulfilled, (state, action) => {
                return {
                    ...state,
                    // status: TaskApiStatus.load,
                    // menteeTaskList: action.payload,
                    loading: false,
                };
            })
            .addCase(updateSinglePassFail.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(updateCancelAllTask.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateCancelAllTask.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addCase(updateCancelAllTask.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


    },
});

export default taskSlice.reducer;