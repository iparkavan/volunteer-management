import { rtkQueryApiServices } from "../../services/api";

export const formBuilderApi = rtkQueryApiServices.injectEndpoints({
    endpoints: (builder) => ({

        getForms: builder.query({
            query: (params = {}) => ({
                url: '/form_builder/forms/',
                params: {
                    page: params.page || 1,
                    limit: params.page_size || 5,
                }
            }),
            providesTags: ['Forms'],
        }),

        getForm: builder.query({
            query: (id) => `form_builder/forms/${id}/`,
            providesTags: (id) => [{ type: 'Form', id: id }],
        }),

        postForm: builder.mutation({
            query: ({ action, data }) => ({
                url: `/form_builder/forms/${action}/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Forms']
        }),

        putForm: builder.mutation({
            query: ({ id, data }) => ({
                url: `/form_builder/forms/${id}/`,
                method: 'PUT',
                body: { data },
            }),

            invalidatesTags: ({ id }) => [
                { type: 'Form', id },
                'Forms',
            ],
        }),

        deleteForm: builder.mutation({
            query: (id) => ({
                url: `/form_builder/forms/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: (id) => [
                { type: 'Form', id },
                'Forms'
            ]
        }),

        getFormLastData: builder.query({
            query: (id) => `form_builder/forms/${id}/data/last_data`,
            providesTags: (id) => [{ type: 'FormSaveData', id: id }],
        }),

        getFormAllData: builder.query({
            query: (id) => `form_builder/forms/${id}/data/all_data`,
            providesTags: (id) => [{ type: 'allFormSaveData', id: id }],
        }),

        postFormData: builder.mutation({
            query: ({ id, data }) => ({
                url: `/form_builder/forms/${id}/data/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (id) => [{ type: 'FormSaveData', id: id }]
        })

    }),
});

export const {
    useGetFormsQuery,
    useGetFormQuery,
    usePostFormMutation,
    usePutFormMutation,
    useDeleteFormMutation,
    useGetFormLastDataQuery,
    useGetFormAllDataQuery,
    usePostFormDataMutation,
} = formBuilderApi;
