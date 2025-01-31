import { rtkQueryApiServices, rtkQueryServiceTags } from '../../services/api';

const { CERTIFICATE } = rtkQueryServiceTags;

export const certificatesApi = rtkQueryApiServices.injectEndpoints({
    endpoints: (builder) => ({
        getAllCertificates: builder.query({
            query: (params = '') => ({
                url: `/request`,
                params,
            }),
            providesTags: [CERTIFICATE],
        }),

        createCertificate: builder.mutation({
            query: (data) => ({
                url: '/request',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [CERTIFICATE],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllCertificatesQuery,
    useCreateCertificateMutation,
} = certificatesApi;
