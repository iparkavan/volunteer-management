import { rtkQueryApiServices } from '../../services/api';


export const paymentApi = rtkQueryApiServices.injectEndpoints({
  endpoints: (builder) => ({
    paymentProcessing: builder.query({
      query: (programId) => ({
        url: `/payments/create-payment-intent/${programId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { usePaymentProcessingQuery } = paymentApi;
