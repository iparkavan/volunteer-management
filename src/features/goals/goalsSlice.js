import {
    createSlice
} from "@reduxjs/toolkit";
import {
    createGoal,
    deleteGoalInfo,
    getAllGoals,
    getGoalInfo,
    getGoalsCount,
    getGoalsHistory,
    getGoalsOverAllData,
    getGoalsProgressData,
    getGoalsRequest,
    getMenteeGoals,
    getRecentGoalActivity,
    reCreateGoal,
    updateGoal,
    updateGoalStatus,
    updateHistoryGoal,
    updateLocalGoalInfo,
} from "../../services/goalsInfo";
import {
    goalStatus
} from "../../utils/constant";

const initialState = {
    goalsList: [],
    createdGoal: {},
    goalsCount: {},
    goalInfo: {},
    goalOverAll: [],
    goalProgress: [],
    goalRequest: [],
    goalActivity: [],
    goalHistory: [],
    goalMenteeList: [],
    loading: false,
    status: "",
    error: "",
};

export const goalsSlice = createSlice({
    name: "goalsInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllGoals.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getAllGoals.fulfilled, (state, action) => {
                return {
                    ...state,
                    goalsList: action.payload,
                    goalHistory: action.payload,
                    status: goalStatus.load,
                    loading: false,
                };
            })
            .addCase(getAllGoals.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    goalsList: [],
                    goalHistory: [],
                    error: action.error.message,
                };
            });

        builder
            .addCase(createGoal.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                return {
                    ...state,
                    createdGoal: action.payload,
                    status: goalStatus.create,
                    loading: false,
                };
            })
            .addCase(createGoal.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(getGoalsOverAllData.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getGoalsOverAllData.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: '',
                    goalOverAll: action.payload,
                    loading: false,
                };
            })
            .addCase(getGoalsOverAllData.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(getGoalInfo.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getGoalInfo.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: '',
                    goalInfo: action.payload,
                    loading: false,
                };
            })
            .addCase(getGoalInfo.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(getGoalsCount.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getGoalsCount.fulfilled, (state, action) => {
                return {
                    ...state,
                    goalsCount: action.payload,
                    loading: false,
                };
            })
            .addCase(getGoalsCount.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(updateGoal.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: goalStatus.update,
                    loading: false,
                };
            })
            .addCase(updateGoal.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(updateGoalStatus.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateGoalStatus.fulfilled, (state, action) => {
                const status = action.payload.actionstatus || goalStatus.statusupdate
                return {
                    ...state,
                    status: status,
                    loading: false,
                };
            })
            .addCase(updateGoalStatus.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(deleteGoalInfo.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(deleteGoalInfo.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: goalStatus.delete,
                    loading: false,
                };
            })
            .addCase(deleteGoalInfo.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(getGoalsRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getGoalsRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    goalRequest: action.payload,
                    loading: false,
                };
            })
            .addCase(getGoalsRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getGoalsHistory.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getGoalsHistory.fulfilled, (state, action) => {
                return {
                    ...state,
                    goalHistory: action.payload,
                    goalsList: action.payload,
                    loading: false,
                };
            })
            .addCase(getGoalsHistory.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getGoalsProgressData.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getGoalsProgressData.fulfilled, (state, action) => {
                return {
                    ...state,
                    goalProgress: action.payload,
                    loading: false,
                };
            })
            .addCase(getGoalsProgressData.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getRecentGoalActivity.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getRecentGoalActivity.fulfilled, (state, action) => {
                return {
                    ...state,
                    goalActivity: action.payload,
                    loading: false,
                };
            })
            .addCase(getRecentGoalActivity.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });



        builder.addCase(updateLocalGoalInfo, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })




        builder
            .addCase(getMenteeGoals.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getMenteeGoals.fulfilled, (state, action) => {
                return {
                    ...state,
                    goalMenteeList: action.payload,
                    loading: false,
                };
            })
            .addCase(getMenteeGoals.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });



        builder
            .addCase(updateHistoryGoal.pending, (state) => {
                return {
                    ...state,
                    status: "pending",
                    loading: true,
                };
            })
            .addCase(updateHistoryGoal.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: "done",
                    loading: false,
                };
            })
            .addCase(updateHistoryGoal.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    status: "",
                    error: action.error.message,
                };
            });


            builder
            .addCase(reCreateGoal.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(reCreateGoal.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: "done",
                    loading: false,
                };
            })
            .addCase(reCreateGoal.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
    },
});

export default goalsSlice.reducer;