import {
    createSlice
} from "@reduxjs/toolkit";
import {
    getCertificates,
    createCertificate,
    getCertificateList,
    triggerCertificateAction,
    certificateDownload,
    getCertificateMember
} from "../../services/certificate";
import { certificateStatus } from "../../utils/constant";

const initialState = {
    certificates: [],
    certificatesList: [],
    certificatesMembers: [],
    certificate: {},
    certificateHTML:{},
    loading: false,
    status: "",
    error: "",
};

export const certificateSlice = createSlice({
    name: "certificates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCertificates.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getCertificates.fulfilled, (state, action) => {
                return {
                    ...state,
                    certificates: action.payload,
                    loading: false,
                };
            })
            .addCase(getCertificates.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        builder
            .addCase(getCertificateMember.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    certificatesMembers: []
                };
            })
            .addCase(getCertificateMember.fulfilled, (state, action) => {
                return {
                    ...state,
                    certificatesMembers: action.payload,
                    loading: false,
                };
            })
            .addCase(getCertificateMember.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
            builder
            .addCase(createCertificate.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(createCertificate.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: certificateStatus.create,
                    loading: false,
                };
            })
            .addCase(createCertificate.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
            builder
            .addCase(certificateDownload.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(certificateDownload.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: certificateStatus.download,
                    certificateHTML:action.payload,
                    loading: false,
                };
            })
            .addCase(certificateDownload.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
            builder
            .addCase(getCertificateList.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getCertificateList.fulfilled, (state, action) => {
                return {
                    ...state,
                    certificatesList:action.payload,
                    status: certificateStatus.load,
                    loading: false,
                };
            })
            .addCase(getCertificateList.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(triggerCertificateAction.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(triggerCertificateAction.fulfilled, (state, action) => {
                let response = {
                    ...state,
                    loading: false
                }
                if (action.payload.action_type === 'view') {
                    response.certificate = action.payload
                }
                return response;
            })
            .addCase(triggerCertificateAction.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

    },
});

export default certificateSlice.reducer;