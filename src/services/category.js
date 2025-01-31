import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const createCategory = createAsyncThunk(
    "createCategory",
    async (payload) => {
        const createCat = await api.post(`/category`, payload);
        if (createCat.status === 200 && createCat.data) {
            return createCat.data;
        }
        return createCat
    }
);


export const getCategory = createAsyncThunk(
    "getCategory",
    async (query) => {
        let filteredQuery = Object.fromEntries(
            Object.entries(query).filter(([key, value]) => !(key === "search" && value.trim().length === 0))
        );
        let queryString = new URLSearchParams(filteredQuery).toString()
        const getCat = await api.get(`/category?${queryString}`);
        if (getCat.status === 200 && getCat.data) {
            return getCat.data;
        }
        return getCat
    }
);


export const deleteCategory = createAsyncThunk(
    "deleteCategory",
    async (id) => {
        const deleteCat = await api.patch(`/category`, { id });
        if (deleteCat.status === 200 && deleteCat.data) {
            return deleteCat.data;
        }
        return deleteCat
    }
);

export const updateCategoryLocalState = createAction('update/updateRequest')


export const editCategory = createAsyncThunk(
    "editCategory",
    async (payload) => {
        const editCat = await api.put(`/category`, payload);
        if (editCat.status === 200 && editCat.data) {
            return editCat.data;
        }
        return editCat
    }
);

// category view api 

export const getCategoryView = createAsyncThunk(
    "getCategoryView",
    async (query) => {
        let filteredQuery = Object.fromEntries(
            Object.entries(query).filter(([key, value]) => !(key === "search" && value.trim().length === 0))
        );
        let queryString = new URLSearchParams(filteredQuery).toString()
        const getCat = await api.get(`/categorybasedlist?${queryString}`);
        if (getCat.status === 200 && getCat.data) {
            return getCat.data;
        }
        return getCat
    }
);

export const acceptMember = createAsyncThunk(
    "acceptMember",
    async (payload) => {
        const createCat = await api.post(`/user/accept_member`, payload);
        if (createCat.status === 200 && createCat.data) {
            return createCat.data;
        }
        return createCat
    }
);
