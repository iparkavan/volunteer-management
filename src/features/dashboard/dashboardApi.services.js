import { rtkQueryApiServices, rtkQueryServiceTags } from "../../services/api";

const { BULK_UPLOAD } = rtkQueryServiceTags;

export const dashboardApis = rtkQueryApiServices.injectEndpoints({
  endpoints: (builder) => ({
    exportImportWithParams: builder.mutation({
      query: (params) => ({
        url: `/bulk/export-import`,
        method: 'GET',
        params,
        responseHandler: 'text',
      }),
    }),

    // Endpoint 2: General Export/Import
    exportImport: builder.mutation({
      query: (formData) => ({
        url: '/bulk/export-import',
        method: 'POST',
        body: formData,
      }),
    }),

    // Endpoint 3: Retrieve Tables
    retrieveTables: builder.query({
      query: () => ({
        url: '/bulk/retrive-tables',
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: [BULK_UPLOAD],
    }),
  }),
});

export const { useExportImportWithParamsMutation,
  useExportImportMutation,
  useRetrieveTablesQuery, } = dashboardApis;
