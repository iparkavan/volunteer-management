import { createSlice } from "@reduxjs/toolkit";

import { reportsStatus } from "../../utils/constant";
import {
  createReport,
  deleteReports,
  getAllReports,
  getCompletedProgramsByCategoryId,
  getProgramsByCategoryId,
  getReportDetails,
  getReportProgramDetails,
  handleCancelReport,
  handlehtmlsend,
  updateReport,
  updateReportDetails,
  updateReportImage,
  updateReportLocalState,
  uploadVideoFiles,
} from "../../services/reportsInfo";

const initialState = {
  allreports: [],
  categoryPrograms: [],
  programDetails: {},
  reportDetails: {},
  loading: false,
  status: "",
  error: "",
  uploadedImageUrl: "",
  uploadedVideoUrl: "",
};

export const reportsSlice = createSlice({
  name: "reportsInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReports.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        return {
          ...state,
          allreports: action.payload,
          status: reportsStatus.load,
          loading: false,
        };
      })
      .addCase(getAllReports.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getProgramsByCategoryId.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getProgramsByCategoryId.fulfilled, (state, action) => {
        return {
          ...state,
          status: "",
          categoryPrograms: action.payload,
          loading: false,
        };
      })
      .addCase(getProgramsByCategoryId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getCompletedProgramsByCategoryId.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getCompletedProgramsByCategoryId.fulfilled, (state, action) => {
        return {
          ...state,
          status: "",
          categoryPrograms: action.payload,
          programDetails: {},
          loading: false,
        };
      })
      .addCase(getCompletedProgramsByCategoryId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getReportProgramDetails.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getReportProgramDetails.fulfilled, (state, action) => {
        return {
          ...state,
          programDetails: action.payload,
          status: reportsStatus.load,
          loading: false,
        };
      })
      .addCase(getReportProgramDetails.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(createReport.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createReport.fulfilled, (state, action) => {
        return {
          ...state,
          status: reportsStatus.create,
          programDetails: {},
          loading: false,
        };
      })
      .addCase(createReport.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getReportDetails.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getReportDetails.fulfilled, (state, action) => {
        return {
          ...state,
          reportDetails: action.payload,
          loading: false,
        };
      })
      .addCase(getReportDetails.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder
      .addCase(updateReportDetails.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateReportDetails.fulfilled, (state, action) => {
        return {
          ...state,
          status: reportsStatus.update,
          loading: false,
        };
      })
      .addCase(updateReportDetails.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(deleteReports.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteReports.fulfilled, (state, action) => {
        return {
          ...state,
          status: reportsStatus.delete,
          loading: false,
        };
      })
      .addCase(deleteReports.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder.addCase(updateReportLocalState, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });

    builder
      .addCase(updateReportImage.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateReportImage.fulfilled, (state, action) => {
        if (action.payload?.message === "Created successfully.")
          return {
            ...state,
            status: "done",
            loading: false,
            uploadedImageUrl: action.payload.data[0].image,
          };
        return state;
      })
      .addCase(updateReportImage.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(uploadVideoFiles.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(handlehtmlsend.fulfilled, (state, action) => {
        return {
          ...state,
          status: "done",
          loading: false,
        };
        return state;
      })
      .addCase(handlehtmlsend.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder.addCase(handlehtmlsend.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder
      .addCase(handleCancelReport.fulfilled, (state, action) => {
        return {
          ...state,
          status: "done",
          loading: false,
        };
      })
      .addCase(handleCancelReport.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder
      .addCase(handleCancelReport.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateReport.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        return {
          ...state,
          status: reportsStatus.create,
          programDetails: {},
          loading: false,
        };
      })
      .addCase(updateReport.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

export default reportsSlice.reducer;
