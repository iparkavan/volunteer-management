import { rtkQueryApiServices, rtkQueryServiceTags } from '../../services/api';

const { MATERIAL } = rtkQueryServiceTags;

export const materialsApi = rtkQueryApiServices.injectEndpoints({
    endpoints: (builder) => ({
        getAllMaterials: builder.query({
            query: (params = '') => ({
                url: `/materials`,
                params,
            }),
            providesTags: [MATERIAL],
        }),

        createMaterial: builder.mutation({
            query: (data) => ({
                url: '/materials',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [MATERIAL],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllMaterialsQuery,
    useCreateMaterialMutation,
} = materialsApi;
