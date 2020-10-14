import * as actionTypes from './Actions';

const initState={
    userId:null,
    loading:false,
    token:null,
    username:null,
    error:null,
    signUp:false,
    photo:null
};

const Reducer =(state=initState,action)=>{
    switch (action.type) {
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading:true,
                error:null,
                signUp:action.signUp
            };
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.token,
                userId:action.userId,
                username:action.username,
                loading:false,
                signUp:action.signUp,
                photo:action.photo
            };
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error,
                signUp:action.signUp
            };
        case actionTypes.LOGOUT:
            return{
                ...state,
                token:null,
                userId:null,
                username:null,
                photo:null,
                error:null
            }            
        default:
            return state;
    }
}
export default Reducer