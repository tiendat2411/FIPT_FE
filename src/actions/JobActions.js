import {newPostRequest, newPostSuccess, newPostFail, allJobsRequest, allJobsSuccess, allJobsFail,
    jobDetailsRequest, jobDetailsSuccess, jobDetailsFail,  jobSaveRequest, jobSaveSuccess, jobSaveFail,
    getSavedJobsRequest, getSavedJobsSuccess, getSavedJobsFail,
    jobPerPageSuccess,jobPerPageFail,jobPerPageRequest
}  from '../slices/JobSlice'
import {toast} from 'react-toastify'
import {me} from '../actions/UserActions'
import axios from 'axios'


export const createJobPost = (jobData) => async (dispatch) => {
    try{
        dispatch(newPostRequest()) ;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            } 
        }

        const {data} = await axios.post("http://localhost:8080/jobs",jobData,config) ;        

        dispatch(newPostSuccess()) ;
        toast.success("Job posted successfully !")

    }catch(err){
        dispatch(newPostFail(err.response.data.message))
    }
}

export const getAllJobs = () => async (dispatch) => {
    try{
        dispatch(allJobsRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            } 
        }

        const {data} = await axios.get("http://localhost:8080/jobs/all-jobs", config) ; 
        console.log(data.result);
        dispatch(allJobsSuccess(data.result));

    }catch(err){
        dispatch(allJobsFail(err.response.data.message))   
    }
}


export const getSingleJob = (id) => async (dispatch) => {
    try{
        dispatch(jobDetailsRequest()) ;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            } 
        }

        const {data} = await axios.get(`http://localhost:8080/jobs/${id}`, config) ;

        dispatch(jobDetailsSuccess(data.result));

    }catch(err){
        dispatch(jobDetailsFail(err.response.data.message))   
    }
}

export const saveJob = (id) => async (dispatch) => {
    try{
        dispatch(jobSaveRequest()) ;

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        
        
        const {data} = await axios.get(`http://localhost:3000/api/v1/saveJob/${id}`,config) ;

        dispatch(me())
        dispatch(jobSaveSuccess()) ;
        toast.success(data.message)   

    }catch(err){
        dispatch(jobSaveFail(err.response.data.message)) ;
    }
} 


export const getSavedJobs = () => async (dispatch) => {
    try{
        dispatch(getSavedJobsRequest())

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }


        const {data} = await axios.get("http://localhost:3000/api/v1/getSavedJobs",config) ;

        dispatch(getSavedJobsSuccess(data))

    }catch(err){
        dispatch(getSavedJobsFail(err.response.data.message))
    }
}

export const fetchJobsWithPagination = ({ page, size, search, category, wage, employer }) => async (dispatch)  => {
    try {
        dispatch(jobPerPageRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            },
            params: {
                page,
                size,
                search: search || '',     // Từ khóa tìm kiếm (nếu có)
                category: category || '', // Bộ lọc theo danh mục (nếu có)
                wage: wage || 0,      // Bộ lọc lương (mặc định là 0)
                employer: employer || ''    // Bộ lọc theo công ty (nếu có)
              }, 
        }

        const {data} = await axios.get("http://localhost:8080/jobs",config);
        dispatch(jobPerPageSuccess(data.result.content));
        dispatch(totalPagesSuccess(data.result.totalPages));
    
    } catch (error) {
        dispatch(jobPerPageFail(err.response.data.message))
    }
  };