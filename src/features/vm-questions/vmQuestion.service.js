import { rtkQueryApiServices } from "../../services/api";

export const vmQaApi = rtkQueryApiServices.injectEndpoints({
    endpoints: (builder) => ({
        submitQAs: builder.mutation({
            query: (payload) => ({
                url: 'mentee_info_update',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

export const {
    useSubmitQAsMutation,
} = vmQaApi;
