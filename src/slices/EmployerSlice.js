import { createSlice } from "@reduxjs/toolkit";

const EmployerSlice = createSlice({
    name: 'Employer',
    initialState: {
        loading: false,
        error: null,
        allEmployers: [],
        employerDetails: {
            _id: "",
            account: {
                _id: "",
                username: "",
                password: "",
                email: "",
                role: "",
                isActive: true,
                creationDate: "",
            },
            name: "",
            email: "",
            phoneNumber: "",
            avatar: "",
            description: "",
            contactInfo: "",
            jobList: [],
            applicationList: [],
        }
    },
    reducers: {
        allEmployersRequest: (state) => {
            state.loading = true
        },
        allEmployersSuccess: (state, action) => {
            state.loading = false
            state.allEmployers = action.payload
        },
        allEmployersFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        employerDetailsRequest: (state) => {
            state.loading = true
        },
        employerDetailsSuccess: (state, action) => {
            state.loading = false
            state.employerDetails = action.payload
        },
        employerDetailsFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        deleteEmployerRequest: (state) => {
            state.loading = true
        },
        deleteEmployerSuccess: (state) => {
            state.loading = false
        },
        deleteEmployerFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
});

export const {
    allEmployersRequest, allEmployersSuccess, allEmployersFail,
    employerDetailsRequest, employerDetailsSuccess, employerDetailsFail,
    deleteEmployerRequest, deleteEmployerSuccess, deleteEmployerFail
} = EmployerSlice.actions;

export default EmployerSlice.reducer;