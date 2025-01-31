import {
    createSlice
} from "@reduxjs/toolkit";

import {
    createPost,
    getPost,
    getPostDetails,
    getRecentPosts,
    getUserPost,
    postComment,
    postCommentLike,
    updateFeedTrack,
    getFeedTrack,
    updateFeedRequest
} from "../../services/feeds";
import {
    feedStatus
} from "../../utils/constant";

const initialState = {
    feeds: [],
    feedDetails: {},
    recentPosts: [],
    userPost: [],
    feedTrack:[],
    loading: false,
    status: "",
    error: "",
};

export const feedSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPost.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getPost.fulfilled, (state, action) => {
                return {
                    ...state,
                    feeds: action.payload,
                    status: feedStatus.load,
                    loading: false,
                };
            })
            .addCase(getPost.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(getPostDetails.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getPostDetails.fulfilled, (state, action) => {
                return {
                    ...state,
                    feedDetails: action.payload,
                    status: feedStatus.load,
                    loading: false,
                };
            })
            .addCase(getPostDetails.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(createPost.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(createPost.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: feedStatus.create,
                    loading: false,
                };
            })
            .addCase(createPost.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(getRecentPosts.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getRecentPosts.fulfilled, (state, action) => {
                return {
                    ...state,
                    recentPosts: action.payload,
                    status: feedStatus.load,
                    loading: false,
                };
            })
            .addCase(getRecentPosts.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });
        
        builder
            .addCase(getFeedTrack.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getFeedTrack.fulfilled, (state, action) => {
                return {
                    ...state,
                    feedTrack: action.payload,
                    status: feedStatus.load,
                    loading: false,
                };
            })
            .addCase(getFeedTrack.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(updateFeedTrack.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(updateFeedTrack.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: feedStatus.load,
                    loading: false,
                };
            })
            .addCase(updateFeedTrack.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });



        builder
            .addCase(getUserPost.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(getUserPost.fulfilled, (state, action) => {
                return {
                    ...state,
                    userPost: action.payload,
                    status: feedStatus.load,
                    loading: false,
                };
            })
            .addCase(getUserPost.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });


        builder
            .addCase(postComment.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(postComment.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: feedStatus.createcomment,
                    loading: false,
                };
            })
            .addCase(postComment.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

        builder
            .addCase(postCommentLike.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
            .addCase(postCommentLike.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: feedStatus.postlike,
                    loading: false,
                };
            })
            .addCase(postCommentLike.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                };
            });

            builder.addCase(updateFeedRequest, (state, action) => {
                return {
                  ...state,
                  ...action.payload,
                };
              });
    },
});

export default feedSlice.reducer;