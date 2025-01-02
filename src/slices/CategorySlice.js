import { createSlice } from "@reduxjs/toolkit";
import { allAppliedJobsRequest } from "./ApplicationSlice";

const CategorySlice = createSlice({
    name: 'Category',
    initialState: {
        loading: false,
        error: null,
        categories: [],
        categoryDetails: {
            _id: "",
            name: "",
            description: "",
            jobCategory: [],
            routeList: []
        }   
    },
    reducers: {
        allCategoriesRequest: (state) => {
            state.loading = true
        },
        allCategoriesSuccess: (state, action) => {
            state.loading = false
            state.categories = action.payload
        },
        allCategoriesFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        categoryDetailsRequest: (state) => {
            state.loading = true
        },
        categoryDetailsSuccess: (state, action) => {
            state.loading = false
            state.categoryDetails = action.payload
        },
        categoryDetailsFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        createCategoryRequest: (state) => {
            state.loading = true
        },
        createCategorySuccess: (state) => {
            state.loading = false
        },
        createCategoryFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        deleteCategoryRequest: (state) => {
            state.loading = true
        },
        deleteCategorySuccess: (state) => {
            state.loading = false
        },
        deleteCategoryFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    
    allCategoriesRequest, allCategoriesSuccess, allCategoriesFail, 
    categoryDetailsRequest, categoryDetailsSuccess, categoryDetailsFail, 
    createCategoryRequest, createCategorySuccess, createCategoryFail, 
    deleteCategoryRequest, deleteCategorySuccess, deleteCategoryFail

} = CategorySlice.actions

export default CategorySlice.reducer;