import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "./api";

// User Create Account
export const userAccountCreate = createAsyncThunk(
  "userCreate",
  async (data) => {
    const userCreate = await api.post("register", data);
    if (userCreate.status === 201) {
      localStorage.setItem("access_token", userCreate.data.access);
      localStorage.setItem("refresh_token", userCreate.data.refresh);
      let decoded = jwtDecode(userCreate.data.access);
      return { status: userCreate.status, userResponse: decoded };
    }

    return userCreate;
  }
);

export const updateInfo = createAsyncThunk("updateInfo", async () => {
  const userToken = localStorage.getItem("access_token");
  if (userToken) {
    let decoded = jwtDecode(userToken);
    return decoded;
  }
  return {};
});

export const updateUserInfo = createAction("update/userInfo");

export const resetUserInfo = createAction("reset/userInfo");

// User Login
export const userAccountLogin = createAsyncThunk("userLogin", async (data) => {
  const userlogin = await api.post("login", data);
  if (userlogin.status) {
    if (userlogin.status === 200) {
      let decoded = jwtDecode(userlogin.data.access);
      if (decoded?.userinfo?.approve_status === "new") {
        return {};
      }
      localStorage.setItem("access_token", userlogin.data.access);
      localStorage.setItem("refresh_token", userlogin.data.refresh);
      return decoded;
    }
    if (userlogin.status === 401) {
      userlogin.error = "Invalid Credentials";
    }
  }
  return userlogin;
});

// Get User Token
export const userAccessToken = createAsyncThunk(
  "refreshUserToken",
  async (data) => {
    const userToken = await api.post("/token/", data);
    if (userToken.status && userToken.status === 200) {
      localStorage.setItem("access_token", userToken.data.access);
      localStorage.setItem("refresh_token", userToken.data.refresh);
      let decoded = jwtDecode(userToken.data.access);
      return decoded;
    }
    return userToken;
  }
);

// Update User Role
export const updateUserRole = createAsyncThunk(
  "updateUserRole",
  async (data) => {
    const updateRole = await api.post("update-role", data);
    if (updateRole.status && updateRole.status === 200) {
      localStorage.setItem("access_token", updateRole.data.access);
      localStorage.setItem("refresh_token", updateRole.data.refresh);
      let decoded = jwtDecode(updateRole.data.access);
      return decoded;
    }
    return {
      ...updateRole,
    };
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "userTriggerOtp",
  async (data) => {
    const triggerOtp = await api.post("trigger-otp", data);
    if (triggerOtp.status === 200) {
      return triggerOtp;
    }
    if (triggerOtp.status === 500) {
      return {
        ...triggerOtp,
        error: "Server error",
      };
    }
    if (triggerOtp.status === 429) {
      return {
        ...triggerOtp,
        error: "Error",
      };
    }
    if (triggerOtp.status === 401) {
      return {
        ...triggerOtp,
        error: triggerOtp?.message || "Invalid Email",
      };
    }
    return triggerOtp;
  }
);

// Validate OTP
export const validateOTP = createAsyncThunk("userValidateOTP", async (data) => {
  const validateOTP = await api.post("validate-otp", data);
  if (validateOTP.status === 200) {
    return validateOTP;
  }
  return validateOTP;
});

// Validate OTP
export const updatePassword = createAsyncThunk(
  "userUpdatePassword",
  async (data) => {
    const updatePassword = await api.post("update-pwd", data);
    if (updatePassword.status === 200) {
      return updatePassword;
    }
    return updatePassword;
  }
);

// Update Questions
export const updateQuestions = createAsyncThunk(
  "userUpdateQuestions",
  async (data) => {
    const updateQuestion = await api.put("user_info_update", data);
    if (updateQuestion.status === 200) {
      let decoded = jwtDecode(updateQuestion.data.access);
      localStorage.setItem("access_token", updateQuestion.data.access);
      localStorage.setItem("refresh_token", updateQuestion.data.refresh);
      return decoded;
    }
    return updateQuestion;
  }
);

// Update Mentee Questions
export const updateMenteeQuestions = createAsyncThunk(
  "userUpdateMenteeQuestions",
  async (data) => {
    const updateQuestion = await api.post("mentee_info_update", data);
    if (updateQuestion.status === 201) {
      let decoded = jwtDecode(updateQuestion.data.access);
      if (decoded?.userinfo?.approve_status === "new") {
        return {};
      }

      localStorage.setItem("access_token", updateQuestion.data.access);
      localStorage.setItem("refresh_token", updateQuestion.data.refresh);
      return decoded;
    }
    return updateQuestion;
  }
);

export const editMenteeQuestions = createAsyncThunk(
  "editMenteeQuestions",
  async (data) => {
    const updateQuestion = await api.put("profile/edit_profile", data);
    if (updateQuestion.status === 200) {
      return updateQuestion;
    }
    return updateQuestion;
  }
);

export const updateMenteeDocument = createAsyncThunk(
  "updateMenteeDocument",
  async (data) => {
    const updateDocument = await api.post("user/documents", data);
    if (updateDocument.status === 201 || updateDocument.status === 200) {
      return updateDocument;
    }
    return updateDocument;
  }
);
