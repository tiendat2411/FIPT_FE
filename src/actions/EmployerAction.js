import {
    allEmployersRequest, allEmployersSuccess, allEmployersFail,
    employerDetailsRequest, employerDetailsSuccess, employerDetailsFail,
    deleteEmployerRequest, deleteEmployerSuccess, deleteEmployerFail
} from "../slices/EmployerSlice";
import {toast} from 'react-toastify'
import axios from "axios";

export const getAllEmployers = () => async (dispatch) => {
    try {
        dispatch(allEmployersRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        };

        const { data } = await axios.get("http://localhost:8080/employers", config);
        dispatch(allEmployersSuccess(data.result));
    } catch (err) {
        dispatch(allEmployersFail(err.response.data.message));
    }
}