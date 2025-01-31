import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

import api from './api';

export const getUserProfile = createAsyncThunk('getUserProfile', async () => {
  const userProfile = await api.get('profile/profile_info');
  if (userProfile.status === 200 && userProfile.data) {
    return userProfile.data;
  }
  return userProfile;
});

export const updateLocalProfileInfo = createAction(
  'update/updateLocalProfileInfo'
);

export const updateProfile = createAsyncThunk('updateProfile', async (data) => {
  const userProfile = await api.put('profile/edit_profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (userProfile.status === 200 && userProfile.data) {
    return userProfile.data;
  }
  return userProfile;
});

export const updateProfileImage = createAsyncThunk(
  'updateProfileImage',
  async (data) => {
    // api.interceptors.request.use(function (config) {
    //     config.headers["Content-Type"] = "multipart/form-data";
    //     return config;
    // });
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const userImage = await api.patch('profile/upload_image', data, {
      headers: headers,
    });
    if (userImage.status === 200 && userImage.data) {
      return userImage.data;
    }
    return userImage;
  }
);
