import { createSlice } from '@reduxjs/toolkit';
import {
  getMyMentors,
  getMyMentorInfo,
  getMentorProgramActivity,
  getMyMentees,
  getMyMenteeInfo,
  getMenteeProgramActivity,
  getProfileInfo,
  getFollowList,
  userFollow,
  userUnFollow,
  menteeFollowReq,
  getMyReqMentees,
  mentorAcceptReq,
  updateUserList,
  menteeUnFollowReq,
  menteeCancelReq,
  getRequestView,
} from '../../services/userList';

const initialState = {
  mentorList: [],
  mentorDetails: {},
  programActivity: [],
  menteeList: [],
  menteeDetails: {},
  userDetails: {},
  followInfo: {},
  menteeFollowReqInfo: {},
  requestData: {},
  loading: false,
  status: '',
  error: '',
};

export const userListSlice = createSlice({
  name: 'helpInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyMentors.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMyMentors.fulfilled, (state, action) => {
        return {
          ...state,
          mentorList: action.payload,
          loading: false,
        };
      })
      .addCase(getMyMentors.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getMyMentorInfo.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMyMentorInfo.fulfilled, (state, action) => {
        return {
          ...state,
          mentorDetails: action.payload,
          menteeDetails: {},
          loading: false,
        };
      })
      .addCase(getMyMentorInfo.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getProfileInfo.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        return {
          ...state,
          mentorDetails: {},
          menteeDetails: {},
          userDetails: action.payload,
          loading: false,
        };
      })
      .addCase(getProfileInfo.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getMentorProgramActivity.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMentorProgramActivity.fulfilled, (state, action) => {
        return {
          ...state,
          programActivity: action.payload,
          loading: false,
        };
      })
      .addCase(getMentorProgramActivity.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getMyMentees.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMyMentees.fulfilled, (state, action) => {
        return {
          ...state,
          menteeList: action.payload,
          loading: false,
        };
      })
      .addCase(getMyMentees.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getMyReqMentees.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMyReqMentees.fulfilled, (state, action) => {
        return {
          ...state,
          menteeList: action.payload,
          loading: false,
        };
      })
      .addCase(getMyReqMentees.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getMyMenteeInfo.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMyMenteeInfo.fulfilled, (state, action) => {
        return {
          ...state,
          menteeDetails: action.payload,
          mentorDetails: [],
          loading: false,
        };
      })
      .addCase(getMyMenteeInfo.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getMenteeProgramActivity.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getMenteeProgramActivity.fulfilled, (state, action) => {
        return {
          ...state,
          programActivity: action.payload,
          loading: false,
        };
      })
      .addCase(getMenteeProgramActivity.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getFollowList.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getFollowList.fulfilled, (state, action) => {
        return {
          ...state,
          followInfo: action.payload,
          loading: false,
        };
      })
      .addCase(getFollowList.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(userFollow.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(userFollow.fulfilled, (state, action) => {
        return {
          ...state,
          status: '',
          loading: false,
        };
      })
      .addCase(userFollow.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(userUnFollow.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(userUnFollow.fulfilled, (state, action) => {
        return {
          ...state,
          status: '',
          loading: false,
        };
      })
      .addCase(userUnFollow.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(menteeFollowReq.pending, (state) => {
        return {
          ...state,
          loading: true,
          status: 'pending',
        };
      })
      .addCase(menteeFollowReq.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'done',
          loading: false,
        };
      })
      .addCase(menteeFollowReq.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(mentorAcceptReq.pending, (state) => {
        return {
          ...state,
          loading: true,
          status: 'pending',
        };
      })
      .addCase(mentorAcceptReq.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'done',
          loading: false,
        };
      })
      .addCase(mentorAcceptReq.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder.addCase(updateUserList.fulfilled, (state, action) => {
      return {
        ...state,
        status: '',
        loading: false,
      };
    });

    builder
      .addCase(menteeUnFollowReq.pending, (state) => {
        return {
          ...state,
          loading: true,
          status: 'pending',
        };
      })
      .addCase(menteeUnFollowReq.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'done',
          loading: false,
        };
      })
      .addCase(menteeUnFollowReq.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(menteeCancelReq.pending, (state) => {
        return {
          ...state,
          loading: true,
          status: 'pending',
        };
      })
      .addCase(menteeCancelReq.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'done',
          loading: false,
        };
      })
      .addCase(menteeCancelReq.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });



      builder
      .addCase(getRequestView.pending, (state) => {
        return {
          ...state,
          loading: true,
          status: 'pending',
        };
      })
      .addCase(getRequestView.fulfilled, (state, action) => {
        return {
          ...state,
          requestData: action.payload,
          loading: false,
        };
      })
      .addCase(getRequestView.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

export default userListSlice.reducer;
