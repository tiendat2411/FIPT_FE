import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
    name: 'job',
    initialState: {
        loading: false,
        saveJobLoading: false,
        error: null,
        jobDetails: {
            __v: 0,
            _id: "",
            name: "",
            jobValue: "",
            user: "",
            description: "",
            recruitedDate: "",
            acceptedDate: "",
            jobCategory: "",
            wage: 0,
            address: "",
            contactInfo: "",
            requirements: "",
            employer: "",
            schedule:[],
            imageUrls: [],
            status: ""
        },
        jobValue: {
            __v: 0,
            _id: "",
            job: "",
            commnunicationSkill: 0,
            collaborationSkill: 0,
            problemSolvingSkill: 0,
            networkingSkill: 0,
            expertiseSkill1: 0,
            expertiseSkill2: 0,
            expertiseSkill3: 0,
            wageScore: 0,
            timeScore: 0,
            mainExpertiseSkill1: "",
            mainExpertiseSkill2: "",
            mainExpertiseSkill3: "",
        },
        savedJobs:[],
        allJobs: [],
        jobPerPage: [],
        totalPages: 0,
    },
    reducers: {
        newPostRequest: (state) => {
            state.loading = true;
        },
        newPostSuccess: (state) => {
            state.loading = false;
        },
        newPostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        allJobsRequest: (state) => {
            state.loading = true;
        },
        allJobsSuccess: (state, action) => {
            state.loading = false;
            state.allJobs = action.payload;
        },
        allJobsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        jobPerPageRequest: (state) => {
            state.loading = true;
        },
        jobPerPageSuccess: (state, action) => {
            state.loading = false;
            state.jobPerPage = action.payload;
        },
        jobPerPageFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        totalPagesRequest: (state) => {
            state.loading = true;
        },
        totalPagesSuccess: (state, action) => {
            state.totalPages = action.payload;
        },
        totalPagesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        jobDetailsRequest: (state) => {
            state.loading = true;
        },
        jobDetailsSuccess: (state, action) => {
            state.loading = false;
            state.jobDetails = action.payload;
        },
        jobDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }, 

        jobSaveRequest: (state) => {
            state.saveJobLoading = true;
        },
        jobSaveSuccess: (state) => {
            state.saveJobLoading = false;
        },
        jobSaveFail: (state, action) => {
            state.saveJobLoading = false;
            state.error = action.payload;
        }, 


        getSavedJobsRequest: (state, action) => {
            state.loading = true
        },
        getSavedJobsSuccess: (state, action) => {
            state.loading = false 
            state.savedJobs = action.payload.savedJob
        },
        getSavedJobsFail: (state, action) => {
            state.loading = false
            state.error = action.payload;
        }

    }

})

export const { newPostRequest, newPostSuccess, newPostFail, allJobsRequest, allJobsSuccess, allJobsFail,
    jobPerPageRequest, jobPerPageSuccess, jobPerPageFail,
    totalPagesRequest, totalPagesSuccess, totalPagesFail,
    jobDetailsRequest, jobDetailsSuccess, jobDetailsFail,
    jobSaveRequest, jobSaveSuccess, jobSaveFail,
    getSavedJobsRequest, getSavedJobsSuccess, getSavedJobsFail
} = JobSlice.actions;

export default JobSlice.reducer;