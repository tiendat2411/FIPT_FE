import {
    allCategoriesRequest, allCategoriesSuccess, allCategoriesFail, 
    categoryDetailsRequest, categoryDetailsSuccess, categoryDetailsFail, 
    createCategoryRequest, createCategorySuccess, createCategoryFail, 
    deleteCategoryRequest, deleteCategorySuccess, deleteCategoryFail
} from '../slices/CategorySlice'
import {toast} from 'react-toastify'
import axios from 'axios'

export const getAllCategories = () => async (dispatch) => {
    try{
        dispatch(allCategoriesRequest()) ;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            } 
        }

        const {data} = await axios.get("http://localhost:8080/categories", config) ; 
        console.log(data.result);
        dispatch(allCategoriesSuccess(data.result));

    }catch(err){
        dispatch(allCategoriesFail(err.response.data.message))   
    }
}