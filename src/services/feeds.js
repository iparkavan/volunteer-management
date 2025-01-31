import {
    createAsyncThunk,
    createAction
} from "@reduxjs/toolkit";
import api from "./api";



export const createPost = createAsyncThunk(
    "createPost",
    async (data) => {
        const createPostResponse = await api.post('post/create-post', data);
        if (createPostResponse.status === 200 && createPostResponse.data) {
            return createPostResponse.data;
        }
        return createPostResponse;
    }
);

export const getPost = createAsyncThunk(
    "getPost",
    async (data = {}) => {
        let url = 'post/view-post';
        
        if (data.page) {
            url += `?page=${data.page}`;
        }
        if (data.pageSize) {
            url += `&limit=${data.pageSize}`;
        }

        console.log("URL:", url);

        const getPostData = await api.get(url);

        if (getPostData.status === 200 && getPostData.data) {
            return getPostData.data;
        }
        return getPostData;
    }
);


export const getPostDetails = createAsyncThunk(
    "getPostDetails",
    async (id) => {
        const getPostDetail = await api.get(`post/view-post/${id}`);
        if (getPostDetail.status === 200 && getPostDetail.data) {
            return getPostDetail.data;
        }
        return getPostDetail;
    }
);

export const getRecentPosts = createAsyncThunk(
    "getRecentPosts",
    async () => {
        const getRecentPostDetail = await api.get('post/recent-posts');
        if (getRecentPostDetail.status === 200 && getRecentPostDetail.data) {
            return getRecentPostDetail.data;
        }
        return getRecentPostDetail;
    }
);

export const getFeedTrack = createAsyncThunk(
    "getFeedTrack",
    async (id) => {
        const getFeedTrack = await api.get(`post/track-post?id=${id}`);
        if (getFeedTrack.status === 200 && getFeedTrack.data) {
            return getFeedTrack.data;
        }
        return getFeedTrack;
    }
);

export const updateFeedTrack = createAsyncThunk(
    "updateFeedTrack",
    async (data) => {
        const updateFeedTrackInfo = await api.post('post/track-post', data);
        if (updateFeedTrackInfo.status === 200 && updateFeedTrackInfo.data) {
            return updateFeedTrackInfo.data;
        }
        return updateFeedTrackInfo;
    }
);


export const getUserPost = createAsyncThunk(
    "getUserPost",
    async () => {
        const userPost = await api.get('post/user-posts');
        if (userPost.status === 200 && userPost.data) {
            return userPost.data;
        }
        return userPost;
    }
);


export const postComment = createAsyncThunk(
    "postComment",
    async (data) => {
        const createCommentforPost = await api.post('post/comments/create', data);
        if (createCommentforPost.status === 200 && createCommentforPost.data) {
            return createCommentforPost.data;
        }
        return createCommentforPost;
    }
);

export const postCommentLike = createAsyncThunk(
    "postCommentLike",
    async (data) => {
        const createCommentLike = await api.post('post/like', data);
        if ((createCommentLike.status === 201 || createCommentLike.status === 200) && createCommentLike.data) {
            return createCommentLike.data;
        }
        return createCommentLike;
    }
);

export const updateFeedRequest = createAction('update/updateRequest')