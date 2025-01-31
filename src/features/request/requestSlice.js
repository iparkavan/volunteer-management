import {
    createSlice
} from "@reduxjs/toolkit";
import {
    requestStatus
} from "../../utils/constant";
import {
    cancelMemberRequest,
    certificateRequest,
    getCategoryList,
    getMemberRequest,
    getprogramRequest,
    getReportRequest,
    getResourceRequest,
    goalsRequest,
    programCancelRequest,
    programRescheduleRequest,
    updateGoalRequest,
    updateLocalRequest,
    updateMemberRequest,
    updateMentorAutoApproval,
    updateProgramMenteeRequest,
    updateCertificateRequest,
    updateProgramRequest,
    updateReportRequest,
    getlearningAccessRequest,
    getExtendProgramRequest,
    getTestimonialRequest,
    getReopenRequest,
    updateTestimonial,
    getTestimonialView
} from "../../services/request";

const initialState = {
    programRequest: [],
    programExtend: [],
    memberRequest: [],
    resourceRequest: [],
    goalsRequest: [],
    testimonialsRequest: [],
    technicalSupportRequest: [],
    certificateRequestList: [],
    reportRequest: [],
    categoryList: [],
    reportsRequest: [],
    learningAccessRequests: [],
    testimonialRequest: [],
    reopenRequest: [],
    testimonialData: {},
    loading: false,
    status: "",
    error: "",
};

export const requestSlice = createSlice({
    name: "requestInfo",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getprogramRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getprogramRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    programRequest: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(getprogramRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(getExtendProgramRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getExtendProgramRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    programExtend: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(getExtendProgramRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(getResourceRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getResourceRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    resourceRequest: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(getResourceRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(updateProgramRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateProgramRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.programupdate,
                    loading: false,
                };
            })
            .addCase(updateProgramRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(updateCertificateRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateCertificateRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.certificateupdate,
                    loading: false,
                };
            })
            .addCase(updateCertificateRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });





        builder
            .addCase(updateProgramMenteeRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateProgramMenteeRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.programupdate,
                    loading: false,
                };
            })
            .addCase(updateProgramMenteeRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });




        builder.addCase(updateLocalRequest, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })

        builder
            .addCase(goalsRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(goalsRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    goalsRequest: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(goalsRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(certificateRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(certificateRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    certificateRequestList: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(certificateRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(updateGoalRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateGoalRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.goalupdate,
                    loading: false,
                };
            })
            .addCase(updateGoalRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getCategoryList.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getCategoryList.fulfilled, (state, action) => {
                return {
                    ...state,
                    categoryList: action.payload,
                    status: requestStatus.categoryload,
                    loading: false,
                };
            })
            .addCase(getCategoryList.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(getMemberRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getMemberRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    memberRequest: action.payload,
                    status: requestStatus.memberload,
                    loading: false,
                };
            })
            .addCase(getMemberRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(updateMemberRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateMemberRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.memberupdate,
                    loading: false,
                };
            })
            .addCase(updateMemberRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(cancelMemberRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(cancelMemberRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.membercancel,
                    loading: false,
                };
            })
            .addCase(cancelMemberRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(programRescheduleRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(programRescheduleRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.reschedule,
                    loading: false,
                };
            })
            .addCase(programRescheduleRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(programCancelRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(programCancelRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.cancel,
                    loading: false,
                };
            })
            .addCase(programCancelRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(updateMentorAutoApproval.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateMentorAutoApproval.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.autoapproval,
                    loading: false,
                };
            })
            .addCase(updateMentorAutoApproval.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });



        builder
            .addCase(getReportRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getReportRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    reportsRequest: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(getReportRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });




        builder
            .addCase(updateReportRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateReportRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    reportsRequest: action.payload,
                    status: requestStatus.reportupdate,
                    loading: false,
                };
            })
            .addCase(updateReportRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            // learning Access Request

            builder
            .addCase(getlearningAccessRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getlearningAccessRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    learningAccessRequests: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(getlearningAccessRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(getTestimonialRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getTestimonialRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    testimonialRequest: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(getTestimonialRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(getReopenRequest.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getReopenRequest.fulfilled, (state, action) => {
                return {
                    ...state,
                    reopenRequest: action.payload,
                    status: requestStatus.load,
                    loading: false,
                };
            })
            .addCase(getReopenRequest.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            
            builder
            .addCase(updateTestimonial.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateTestimonial.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: requestStatus.testimonialupdate,
                    loading: false,
                };
            })
            .addCase(updateTestimonial.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder
            .addCase(getTestimonialView.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getTestimonialView.fulfilled, (state, action) => {
                return {
                    ...state,
                    testimonialData: action.payload,
                    loading: false,
                };
            })
            .addCase(getTestimonialView.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
            // getTestimonialView
    },
});

export default requestSlice.reducer;