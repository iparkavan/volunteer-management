import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const postPayments = createAsyncThunk(
  'postPayments',
  async (programId) => {
    // let queryString = new URLSearchParams(query).toString();
    const getActivities = await api.post(
      `/payments/create-payment-intent/${programId}`
    );
    console.log('getActivities ==>', getActivities);
    if (getActivities.status === 200 && getActivities.data) {
      return getActivities.data;
    }
    return getActivities;
  }
);
