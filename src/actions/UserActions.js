import {
    registerRequest, registerSuccess, registerFail, loginRequest, loginSuccess, loginFail
    , isLoginRequest, isLoginSuccess, isLoginFail, getMeRequest, getMeSuccess, getMeFail,
    changePasswordRequest, changePasswordSuccess, changePasswordFail,
    updateProfileRequest, updateProfileSuccess, updateProfileFail,
    deleteAccountRequest, deleteAccountSuccess, deleteAccountFail, logoutClearState
} from '../slices/UserSlice'
import { toast } from 'react-toastify'
import axios from 'axios'



export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest())

        const { data } = await axios.post("http://localhost:8080/user/register", userData);

        dispatch(registerSuccess())
        // localStorage.setItem('userToken', data.token)
        dispatch(logOrNot())
        toast.success("Registration successful !")

    } catch (err) {
        dispatch(registerFail(err.response.data.message))
        if (err.response.data.message.includes("duplicate")) {
            toast.error("User already exists.")
        } else {
            toast.error(err.response.data.message)
        }
    }
}


export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch(loginRequest())

        const { data } = await axios.post("http://localhost:8080/auth/token", userData);

        dispatch(loginSuccess())
        localStorage.setItem('userToken', data.result.token)
        localStorage.setItem("role", data.result.role)
        dispatch(logOrNot(userData))
        dispatch(me())
        toast.success("Login successful !")

    } catch (err) {
        dispatch(loginFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}


export const logOrNot = (userData) => async (dispatch) => {
    try {
        dispatch(isLoginRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const body = {
            email: userData.email,
            password: userData.password,
        };

        const { data } = await axios.post("http://localhost:8080/user/isLogin", body, config);

        dispatch(isLoginSuccess(data.result.isLogin))


    } catch (err) {
        dispatch(isLoginFail())
    }
}


export const me = () => async (dispatch) => {
    try {
        dispatch(getMeRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axios.get("http://localhost:8080/user/myInfo", config);

        dispatch(getMeSuccess(data.result))

    } catch (err) {
        dispatch(getMeFail())
    }
}


export const changePass = (userData) => async (dispatch) => {
    try {
        dispatch(changePasswordRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axios.put("http://localhost:3000/api/v1/changePassword", userData, config)

        dispatch(changePasswordSuccess())
        toast.success("Password Changed successfully !")

    } catch (err) {
        dispatch(changePasswordFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}


export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const body = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            email: userData.email,
            avatar: userData.avatar,
            resume: userData.resume,
            phoneNumber: userData.phoneNumber,
            description: userData.description,
        }

        console.log(userData.resume);


        const { data } = await axios.put(`http://localhost:8080/user/update-profile/${userData.id}`, body, config)

        dispatch(updateProfileSuccess())
        toast.success("Profile Updated successfully !")
        dispatch(me())

    } catch (err) {
        dispatch(updateProfileFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}


export const deleteAccount = (userData) => async (dispatch) => {
    try {
        console.log(userData)


        dispatch(deleteAccountRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axios.put("http://localhost:3000/api/v1/deleteAccount", userData, config)

        console.log(data)

        dispatch(deleteAccountSuccess())
        if (data.message === "Account Deleted") {
            toast.success("Account Deleted successfully !")
            localStorage.removeItem('userToken')
            dispatch(logOrNot())
            dispatch(logoutClearState())
        } else {
            toast.error("Wrong Password !")
        }


    }
    catch (err) {
        dispatch(deleteAccountFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}


export const uploadImage = (image) => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        const formData = new FormData();
        formData.append('file', image);
        formData.append('otherParam', 'value');

        const { data } = await axios.post("http://localhost:8080/image/upload", formData, config);

        // dispatch(me());

        return data; // Trả về giá trị của data

    } catch (err) {
        console.log(err);
        throw err; // Ném lỗi để xử lý bên ngoài nếu cần
    }
};
