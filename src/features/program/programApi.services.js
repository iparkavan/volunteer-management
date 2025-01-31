import { rtkQueryApiServices, rtkQueryServiceTags } from "../../services/api";

const { PROGRAM, GOALS } = rtkQueryServiceTags;

// Helper function to build query string
const buildQueryString = (query) => {
  let queryParams = "";

  if (query.value === "planned") {
    query = { ...query, value: "yettojoin" };
  }

  if (query && Object.keys(query).length) {
    if (query.type) {
      queryParams =
        (queryParams === "" ? "?" : "&") + `${query.type}=${query.value}`;
    }
    if (query.page) {
      queryParams =
        (queryParams === "" ? "?" : `${queryParams}&`) +
        `${query.page}=${query.number}`;
    }
    if (query.search) {
      queryParams =
        (queryParams === "" ? "?" : `${queryParams}&`) +
        `${query.search.search}=${query.search.value}`;
    }
    if (query.date) {
      queryParams =
        (queryParams === "" ? "?" : `${queryParams}&`) +
        `${query.date.date}=${query.date.value}`;
    }
    if (query.category_id) {
      queryParams =
        (queryParams === "" ? "?" : `${queryParams}&`) +
        `category_id=${query.category_id}`;
    }
  }

  return queryParams !== "" ? `${queryParams}&limit=6` : "?limit=6";
};

export const programsApi = rtkQueryApiServices.injectEndpoints({
  endpoints: (builder) => ({
    // Create new program
    createProgram: builder.mutation({
      query: ({ bodyFormData, role }) => ({
        url: role ? "program/admin-program" : "programs",
        method: "POST",
        body: bodyFormData,
      }),
    }),

    // Update program
    updateProgram: builder.mutation({
      query: ({ program_id, bodyFormData, role }) => ({
        url: role
          ? `program/admin-program/${program_id}`
          : `programs/${program_id}`,
        method: "PUT",
        body: bodyFormData,
      }),
      invalidatesTags: [PROGRAM],
    }),

    // Update program
    updateProgramStatus: builder.mutation({
      query: (body) => ({
        url: `update_program`,
        method: "POST",
        body,
      }),
      invalidatesTags: [PROGRAM],
    }),

    // Get all categories
    getAllCategories: builder.query({
      query: () => "category",
    }),

    // Get Program Goals
    getProgramGoals: builder.query({
      query: () => `goals/program-goals`,
      providesTags: [GOALS],
    }),

    // Get certificates by category
    getCertificates: builder.query({
      query: (params) => ({ url: `certificate`, params }),
    }),

    // Get skills by category
    getSkills: builder.query({
      query: (params) => ({ url: `skills`, params }),
    }),

    // Get members by category
    getMembers: builder.query({
      query: (params) => ({ url: `members`, params }),
    }),

    // Get all mentors
    getAllMentors: builder.query({
      query: (params) => ({
        url: "members/member-list",
        params,
      }),
    }),

    // Get programs by category
    getProgramsByCategory: builder.query({
      query: (categoryId) =>
        `program_task_assign/list_program?id=${categoryId}`,
    }),

    // Get program mentees
    getProgramMentees: builder.query({
      query: (programId) => `program/participates?program_id=${programId}`,
    }),

    // Validate program name
    validateProgramName: builder.query({
      query: ({ program_name, program_id }) =>
        `programs/validate_program_name?program_name=${program_name}${
          program_id ? `&program_id=${program_id}` : ""
        }`,
    }),

    // Get program list with category
    getProgramListWithCategory: builder.query({
      query: (categoryId) =>
        `/program/completed-program-list?category_id=${categoryId}&type=task`,
    }),
    // Programs
    getAllPrograms: builder.query({
      query: (params) => ({
        url: `programs`,
        params,
      }),
    }),

    getCountryStates: builder.query({
      query: () => ({
        url: `program/states`,
      }),
    }),

    getCities: builder.query({
      query: (params) => ({
        url: `program/cities`,
        params,
      }),
    }),

    getAllAdminProgramDetails: builder.query({
      query: (params) => ({ url: "program/admin-program", params }),
      // transformResponse: (response) => response.program,
    }),

    // Get program details
    getProgramDetailsById: builder.query({
      query: ({ id, requestId, role }) => ({
        url:
          role === "admin"
            ? `program/admin-program/${id}`
            : `programs/${id}${requestId ? `?request_id=${requestId}` : ""}`,
      }),
      providesTags: [PROGRAM],
    }),

    getSpecificProgramDetails: builder.query({
      query: ({ id, requestId = "", program_create_type }) =>
        `programs/${id}${requestId ? `?request_id=${requestId}` : ""}${
          program_create_type
            ? `?program_create_type=${program_create_type}`
            : ""
        }`,
      providesTags: [PROGRAM],
    }),

    launchProgram: builder.mutation({
      query: (data) => ({
        url: "request/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [PROGRAM],
    }),

    acceptProgram: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `request/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [PROGRAM],
    }),

    joinAllProgram: builder.mutation({
      query: (id) => ({
        url: `request/join-all-subprograms/${id}`,
        method: "POST",
      }),
      invalidatesTags: [PROGRAM],
    }),

    // Program Counts and Statistics
    getProgramCounts: builder.query({
      query: (query) => {
        if (!query || Object.keys(query).length === 0) {
          return "program_status_count";
        }
        const filteredQuery = Object.fromEntries(
          Object.entries(query).filter(
            ([key, value]) =>
              !(key === "search" && value.trim().length === 0) &&
              !(key === "status" && value === "all")
          )
        );
        const queryString = new URLSearchParams(filteredQuery).toString();
        return `program_status_count?${queryString}`;
      },
    }),

    // Mentees
    getMentees: builder.query({
      query: () => "mentees",
    }),

    getProgramTaskMentees: builder.query({
      query: (id = "") => `program/participates?program_id=${id}`,
    }),

    getMenteePrograms: builder.query({
      query: (query) => ({
        url: `programs${buildQueryString(query)}`,
        transformResponse: (response) => ({
          ...response,
          filterType: query?.type || "",
          filterValue: query?.value || "",
        }),
      }),
    }),

    // Program Tasks
    assignProgramTask: builder.mutation({
      query: (data) => ({
        url: "program_task_assign/create_task",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    updateProgramTask: builder.mutation({
      query: (data) => ({
        url: "program_task_assign/mentortask",
        method: "PATCH",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    startProgramTask: builder.mutation({
      query: (data) => ({
        url: "program_task_assign/task_start",
        method: "PATCH",
        body: data,
      }),
    }),

    getProgramTaskDetails: builder.query({
      query: (taskId) =>
        `program_task_assign/task_submission${
          taskId ? `?task_id=${taskId}` : ""
        }`,
    }),

    submitProgramTask: builder.mutation({
      query: (data) => ({
        url: "program_task_assign/task_submission",
        method: "POST",
        body: data,
        headers: { "Content-Type": "multipart/form-data" },
      }),
    }),

    updateTaskSubmission: builder.mutation({
      query: (data) => ({
        url: "/program_task_assign/task_submission",
        method: "PUT",
        body: data,
      }),
    }),

    // Other endpoints
    getChartProgramList: builder.query({
      query: (filterBy) => `program-performance?filter_by=${filterBy}`,
    }),

    updateProgramImage: builder.mutation({
      query: (data) => ({
        url: "programs",
        method: "PATCH",
        body: data,
        headers: { "Content-Type": "multipart/form-data" },
      }),
    }),

    getMenteeJoinedInProgram: builder.mutation({
      query: (data) => ({
        url: "mentee_program/enroll_check",
        method: "POST",
        body: data,
      }),
    }),

    menteeJoinProgram: builder.mutation({
      query: (data) => ({
        url: "mentee_program/join_program",
        method: "POST",
        body: data,
      }),
    }),

    markProgramInterest: builder.mutation({
      query: (data) => ({
        url: "programs/interest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [PROGRAM],
    }),

    getMenteeProgramCount: builder.query({
      query: (query) => {
        if (!query || Object.keys(query).length === 0) {
          return "programs/program-status-count";
        }
        const filteredQuery = Object.fromEntries(
          Object.entries(query).filter(
            ([key, value]) =>
              !(key === "search" && value.trim().length === 0) &&
              !(key === "status" && value === "all")
          )
        );
        return `programs/program-status-count?${new URLSearchParams(
          filteredQuery
        ).toString()}`;
      },
    }),

    // for volunter management
    getEquipment: builder.query({
      query: (params) => ({
        url: "relevantequipment/",
        params,
      }),
      providesTags: [PROGRAM],
      // Optional: Transform the response if needed
      transformResponse: (response) => response,
    }),

    // Get program types
    getProgramTypes: builder.query({
      query: () => "program/program-type/",
      transformResponse: (response) => response,
    }),

    // Get incident types
    getIncidentTypes: builder.query({
      query: () => "program/incident-type/",
      transformResponse: (response) => response,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAllAdminProgramDetailsQuery,
  useGetProgramDetailsByIdQuery,
  useGetSpecificProgramDetailsQuery,
  useUpdateProgramMutation,
  useUpdateProgramStatusMutation,
  useLaunchProgramMutation,
  useJoinAllProgramMutation,
  useAcceptProgramMutation,
  useGetProgramCountsQuery,
  useGetProgramGoalsQuery,
  useGetMenteesQuery,
  useGetProgramTaskMenteesQuery,
  useGetMenteeProgramsQuery,
  useAssignProgramTaskMutation,
  useUpdateProgramTaskMutation,
  useStartProgramTaskMutation,
  useGetProgramTaskDetailsQuery,
  useSubmitProgramTaskMutation,
  useUpdateTaskSubmissionMutation,
  useGetChartProgramListQuery,
  useUpdateProgramImageMutation,
  useGetMenteeJoinedInProgramMutation,
  useMenteeJoinProgramMutation,
  useGetMenteeProgramCountQuery,
  useGetAllProgramsQuery,
  useCreateProgramMutation,
  useMarkProgramInterestMutation,
  useGetAllCategoriesQuery,
  useGetCertificatesQuery,
  useGetSkillsQuery,
  useGetMembersQuery,
  useGetAllMentorsQuery,
  useGetProgramsByCategoryQuery,
  useGetProgramMenteesQuery,
  useGetCountryStatesQuery,
  useGetCitiesQuery,
  useValidateProgramNameQuery,
  useGetProgramListWithCategoryQuery,
  useGetEquipmentQuery,
  useGetProgramTypesQuery,
  useGetIncidentTypesQuery,
} = programsApi;
