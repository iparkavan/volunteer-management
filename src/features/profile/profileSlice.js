import {
  createSlice
} from "@reduxjs/toolkit";
import {
  getUserProfile,
  updateLocalProfileInfo,
  updateProfile,
  updateProfileImage,
} from "../../services/profile";
import {
  profileStatus
} from "../../utils/constant";

const initialState = {
  profile: {},
  loading: false,
  status: "",
  error: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        return {
          ...state,
          status: profileStatus.load,
          profile: action.payload,
          loading: false,
        };
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(updateProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        return {
          ...state,
          status: profileStatus.update,
          loading: false,
        };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(updateProfileImage.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        return {
          ...state,
          status: profileStatus.image,
          loading: false,
        };
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });


    builder.addCase(updateLocalProfileInfo, (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    })
  },
});

export default profileSlice.reducer;