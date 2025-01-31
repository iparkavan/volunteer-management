import { rtkQueryApiServices, rtkQueryServiceTags } from '../../services/api';

const { EQUIPMENT } = rtkQueryServiceTags;

export const equipmentApi = rtkQueryApiServices.injectEndpoints({
  endpoints: (builder) => ({
    createEquipment: builder.mutation({
      query: (data) => ({
        url: 'equipment/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [EQUIPMENT],
    }),

    getEquipment: builder.query({
      query: (params) => ({
        url: `equipment`, params
      }),
      providesTags: [EQUIPMENT],
    }),

    getParticularEquipment: builder.query({
      query: (id) => `equipment/${id}`,
      providesTags: [EQUIPMENT],
    }),

    updateEquipment: builder.mutation({
      query: ({ id, data }) => ({
        url: `equipment/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [EQUIPMENT],
    }),

    getTrackData: builder.query({
      query: (id) => `equipmenttrack/${id}`,
      providesTags: [EQUIPMENT],
    }),

    deactiveEquipment: builder.mutation({
      query: (id) => ({
        url: `equipmenttract/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: [EQUIPMENT],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateEquipmentMutation,
  useGetEquipmentQuery,
  useGetParticularEquipmentQuery,
  useUpdateEquipmentMutation,
  useGetTrackDataQuery,
  useDeactiveEquipmentMutation,
} = equipmentApi;
