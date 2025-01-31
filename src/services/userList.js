import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

import api from './api';

export const getMyMentors = createAsyncThunk('getMyMentors', async (data) => {
  const myMentors = await api.get(
    `/mentors/my_mentors?page=${data?.page + 1 ?? 1}&limit=${
      data?.pageSize
    }&search=${data?.search ?? ''}`
  );
  if (myMentors.status === 200 && myMentors.data) {
    return myMentors.data.mentor || myMentors.data;
  }
  return myMentors;
});

export const getMyTopMentors = createAsyncThunk(
  'getMyMentors',
  async (data) => {
    const myMentors = await api.get(
      `/rating/top_mentor?page=${data?.page + 1 ?? 1}&limit=${
        data?.pageSize
      }&search=${data?.search ?? ''}`
    );
    if (myMentors.status === 200 && myMentors.data) {
      return myMentors.data.mentor || myMentors.data;
    }
    return myMentors;
  }
);

export const getMyReqMentors = createAsyncThunk(
  'getMyMentors',
  async (query) => {
    let filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([key, value]) =>
          !(key === 'search' && value.trim().length === 0) &&
          !(key === 'status' && value === 'all')
      )
    );
    let queryString = new URLSearchParams(filteredQuery).toString();
    const myMentors = await api.get(`/rating/request-mentor?${queryString}`);
    if (myMentors.status === 200 && myMentors.data) {
      return myMentors.data.mentor || myMentors.data;
    }
    return myMentors;
  }
);

export const getMyMentorInfo = createAsyncThunk(
  'getMyMentorInfo',
  async (id) => {
    const myMentor = await api.get(`/mentors/${id}`);
    if (myMentor.status === 200 && myMentor.data) {
      return myMentor.data.mentor || myMentor.data;
    }
    return myMentor;
  }
);

export const getProfileInfo = createAsyncThunk(
  'getProfileInfo',
  async (data) => {
    const url = data?.follow_id
      ? `/user/${data?.id}?follow_id=${data?.follow_id}`
      : `/user/${data?.id}`;
    const myProfile = await api.get(url);
    if (myProfile.status === 200 && myProfile.data) {
      return myProfile.data.mentor || myProfile.data;
    }
    return myProfile;
  }
);

export const getMentorProgramActivity = createAsyncThunk(
  'getMentorProgramActivity',
  async (id) => {
    const programActivity = await api.get(
      `/mentors/programs_activity_list/${id}`
    );
    if (programActivity.status === 200 && programActivity.data) {
      return programActivity.data;
    }
    return programActivity;
  }
);

export const getMyMentees = createAsyncThunk('getMyMentees', async (query) => {
  let filteredQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([key, value]) => !(key === 'search' && value.trim().length === 0)
    )
  );
  let queryString = new URLSearchParams(filteredQuery).toString();
  // page=${data?.page + 1 ?? 1}&limit=${data?.pageSize}
  const myMenteeList = await api.get(`/mentee/my_mentee?${queryString}`);
  if (myMenteeList.status === 200 && myMenteeList.data) {
    return myMenteeList.data;
  }
  return myMenteeList;
});

export const getMyReqMentees = createAsyncThunk(
  'getMyReqMentees',
  async (query) => {
    let filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([key, value]) =>
          !(key === 'search' && value.trim().length === 0) &&
          !(key === 'status' && value === 'all')
      )
    );
    let queryString = new URLSearchParams(filteredQuery).toString();
    const myMenteeList = await api.get(
      `/program_request/follow-request?${queryString}`
    );
    // page=${data?.page + 1 ?? 1}&limit=${data?.pageSize}
    if (myMenteeList.status === 200 && myMenteeList.data) {
      return myMenteeList.data;
    }
    return myMenteeList;
  }
);

export const getMyMenteeInfo = createAsyncThunk(
  'getMyMenteeInfo',
  async (id) => {
    const myMentee = await api.get(`/mentee/${id}`);
    if (myMentee.status === 200 && myMentee.data) {
      return myMentee.data.mentor || myMentee.data;
    }
    return myMentee;
  }
);

export const getMenteeProgramActivity = createAsyncThunk(
  'getMenteeProgramActivity',
  async (id) => {
    const myMenteeProgramActivity = await api.get(
      `/programs_activity_list/${id}`
    );
    if (
      myMenteeProgramActivity.status === 200 &&
      myMenteeProgramActivity.data
    ) {
      return (
        myMenteeProgramActivity.data.mentor || myMenteeProgramActivity.data
      );
    }
    return myMenteeProgramActivity;
  }
);

export const getFollowList = createAsyncThunk('getFollowList', async (id) => {
  const followInfo = await api.get(`/post/user-status/${id}`);
  if (followInfo.status === 200 && followInfo.data) {
    return followInfo.data;
  }
  return followInfo;
});

export const userFollow = createAsyncThunk('userFollow', async (data) => {
  const userFollowInfo = await api.post(
    `/program_request/follow-request`,
    data
  );
  if (userFollowInfo.status === 200 && userFollowInfo.data) {
    return userFollowInfo.data;
  }
  return userFollowInfo;
});

export const userUnFollow = createAsyncThunk('userUnFollow', async (data) => {
  const userUnFollowInfo = await api.post(`/post/unfollow`, data);
  if (userUnFollowInfo.status === 200 && userUnFollowInfo.data) {
    return userUnFollowInfo.data;
  }
  return userUnFollowInfo;
});

export const menteeFollowReq = createAsyncThunk(
  'menteeFollowReq',
  async (data) => {
    const menteeFollowReqInfo = await api.post(
      '/program_request/follow-request',
      data
    );
    if (menteeFollowReqInfo.status === 200 && menteeFollowReqInfo.data) {
      return menteeFollowReqInfo.data;
    }
    return menteeFollowReqInfo;
  }
);

export const mentorAcceptReq = createAsyncThunk(
  'mentorAcceptReq',
  async (data) => {
    const mentorAcceptReqInfo = await api.patch(
      '/program_request/follow-request',
      data
    );
    if (mentorAcceptReqInfo.status === 200 && mentorAcceptReqInfo.data) {
      return mentorAcceptReqInfo.data;
    }
    return mentorAcceptReqInfo;
  }
);

export const updateUserList = createAsyncThunk(
  'updateUserList',
  async (data) => {
    return data;
  }
);

export const menteeUnFollowReq = createAsyncThunk(
  'menteeUnFollowReq',
  async (data) => {
    const menteeFollowReqInfo = await api.post('/post/unfollow', data);
    if (menteeFollowReqInfo.status === 200 && menteeFollowReqInfo.data) {
      return menteeFollowReqInfo.data;
    }
    return menteeFollowReqInfo;
  }
);

export const menteeCancelReq = createAsyncThunk(
  'menteeCancelReq',
  async (data) => {
    const menteeFollowReqInfo = await api.patch('/rating/request-mentor', data);
    if (menteeFollowReqInfo.status === 200 && menteeFollowReqInfo.data) {
      return menteeFollowReqInfo.data;
    }
    return menteeFollowReqInfo;
  }
);


export const getRequestView = createAsyncThunk('getRequestView', async (id) => {
  const getRequestView = await api.get(`request/${id}/`);
  if (getRequestView.status === 200 && getRequestView.data) {
    return getRequestView.data;
  }
  return getRequestView;
});