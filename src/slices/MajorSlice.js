import { createSlice } from "@reduxjs/toolkit";

const MajorSlice = createSlice({
    name: "major",
    initialState: {
        loading: false,
        error: null,
        majors: [],
        majorDetails: {
            _id: "",
            name: "",
            communicationWeight: 0,
            collaborationWeight: 0,
            problemSolvingWeight: 0,
            networkingWeight: 0,
            wage: 0,
            time: "",
            expertiseSkillName1: "",
            expertiseSkillName2: "",
            expertiseSkillName3: "",
        },
    },
    reducers: {
        allMajorsRequest: (state) => {
            state.loading = true;
        },
        allMajorsSuccess: (state, action) => {
            state.loading = false;
            state.majors = action.payload;
        },
        allMajorsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        majorDetailsRequest: (state) => {
            state.loading = true;
        },
        majorDetailsSuccess: (state, action) => {
            state.loading = false;
            state.majorDetails = action.payload;
        },
        majorDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteMajorRequest: (state) => {
            state.loading = true;
        },
        deleteMajorSuccess: (state) => {
            state.loading = false;
        },
        deleteMajorFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    
    allMajorsRequest, allMajorsSuccess, allMajorsFail, 
    majorDetailsRequest, majorDetailsSuccess, majorDetailsFail, 
    deleteMajorRequest, deleteMajorSuccess, deleteMajorFail

} = MajorSlice.actions;

export default MajorSlice.reducer;