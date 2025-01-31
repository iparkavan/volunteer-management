import { rtkQueryApiServices, rtkQueryServiceTags } from '../../services/api';

const { GOALS } = rtkQueryServiceTags;

export const goalsApi = rtkQueryApiServices.injectEndpoints({
    endpoints: (builder) => ({
        getAllGoals: builder.query({
            query: (params = '') => ({
                url: `goals/get${params ? "" : "/all"}/goals${params ? `/${params}` : ""}`,
                params,
            }),
            providesTags: [GOALS],
        }),

        createGoal: builder.mutation({
            query: (data) => ({
                url: 'goals/create/goal',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [GOALS],
        }),

        getGoalInfo: builder.query({
            query: (id) => `goals/goal/${id}`,
            providesTags: (result, error, id) => [{ type: 'GoalInfo', id }],
        }),

        getGoalsCount: builder.query({
            query: (query) => {
                const queryString = query?.user_id
                    ? `time_frame=${query?.time_frame}&user_id=${query?.user_id}`
                    : `time_frame=${query?.time_frame}`;
                return `/goals/goal/status/count?${queryString}`;
            },
            providesTags: ['GoalsCount'],
        }),

        updateGoalStatus: builder.mutation({
            query: (data) => ({
                url: 'goals/update/goal',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [GOALS, 'GoalInfo'],
            transformResponse: (response, meta, arg) => ({
                ...response,
                actionstatus: arg.action,
            }),
        }),

        updateGoal: builder.mutation({
            query: (data) => ({
                url: 'goals/update/goal',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [GOALS, 'GoalInfo'],
        }),

        deleteGoal: builder.mutation({
            query: (id) => ({
                url: `goals/delete-goal/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [GOALS],
        }),

        getGoalsProgress: builder.query({
            query: () => 'goals/goals-progress-chart',
            providesTags: ['GoalsProgress'],
        }),

        getGoalsOverall: builder.query({
            query: (query) => `goals/goals-overall-perfromance?${query}`,
            providesTags: ['GoalsOverall'],
        }),

        getGoalsRequest: builder.query({
            query: (params) => ({
                url: `goals/get/goals/request`,
                params,
            }),
            providesTags: ['GoalsRequest'],
        }),

        getGoalsHistory: builder.query({
            query: (params) => ({
                url: `goals/get/all/goals`,
                params,
            }),
            providesTags: ['GoalsHistory'],
        }),

        getRecentGoalActivity: builder.query({
            query: () => 'goals/get/goals/activities',
            providesTags: ['GoalActivity'],
        }),

        getMenteeGoals: builder.query({
            query: (queryString = '') => {
                const query = queryString !== '' ? `?status=${queryString}` : '';
                return `goals/mentee-goals${query}`;
            },
            providesTags: ['MenteeGoals'],
        }),

        updateHistoryGoal: builder.mutation({
            query: (data) => ({
                url: 'goals/update/goal',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['GoalsHistory', GOALS],
        }),

        reCreateGoal: builder.mutation({
            query: (data) => ({
                url: 'goals/recreate/goal',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [GOALS],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllGoalsQuery,
    useCreateGoalMutation,
    useGetGoalInfoQuery,
    useGetGoalsCountQuery,
    useUpdateGoalStatusMutation,
    useUpdateGoalMutation,
    useDeleteGoalMutation,
    useGetGoalsProgressQuery,
    useGetGoalsOverallQuery,
    useGetGoalsRequestQuery,
    useGetGoalsHistoryQuery,
    useGetRecentGoalActivityQuery,
    useGetMenteeGoalsQuery,
    useUpdateHistoryGoalMutation,
    useReCreateGoalMutation,
} = goalsApi;
