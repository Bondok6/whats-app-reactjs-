import * as actionTypes from './Actions';
import Axios from '../axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userId,photo) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        photo,
        userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.LOGOUT
    }
}

export const authTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    };
};


export const authSignUp = (photo,name, email, password) => {
    return async dispatch => {
        try {
            dispatch(authStart());
            const formData=new FormData();
            formData.append("photo",photo);
            formData.append("username",name);
            formData.append("email",email);
            formData.append("password",password);
            const res = await Axios.post('/signup', formData)
            if (res.status !== 200 && res.status !== 201) {
                dispatch(authFail(res.data.msg))
            } else {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.user.id);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(res.data.token, res.data.user.id,res.data.user.photo));
                dispatch(authTimeOut(res.data.expiresIn));
            }

        } catch (err) {
            dispatch(authFail(err))
        }
    };
};



export const authSignIn = (email, password) => {
    return async dispatch => {
        try {
            dispatch(authStart());
            const res = await Axios.post('/login', {email, password})
            const data = await res.data;
            if (res.status !== 200 && res.status !== 201) {
                dispatch(authFail(data.msg))
            } else {
                const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(data.token, data.user.id,data.user.photo));
                dispatch(authTimeOut(data.expiresIn))
            }
        } catch (error) {
            dispatch(authFail(error));
        }
    }
}

export const authCheckState = () => {
    return async dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate < new Date()) {
                dispatch(logout());
            } else {
                
                const userId = localStorage.getItem("userId");
                const res=await Axios.get("/user",{
                    headers:{
                        "authorization":`Bearer ${token}`
                    }
                })
                const data= res.data;
                dispatch(authSuccess(token, userId,data.photo));
                dispatch(authTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}