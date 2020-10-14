import * as ActionTypes from './Actions'
import Axios from '../axios'
export  const start=()=>{
    return{
        type:ActionTypes.FETCH_START
    }
}
export const contacts=(contacts)=>{
    return{
    type:ActionTypes.FETCH_CONTACTS,
    contacts
    }
}
export const contactsFail=(error)=>{
    return{
        type:ActionTypes.FETCH_FAIL,
        error
    }
}

export const fetchContacts= (token)=>{
    return async dispatch=>{
        dispatch(start())
      const res= await Axios.get('/contacts?paginate=false',{
            headers:{
                "authorization":`Bearer ${localStorage.getItem("token")}`,
            }
        })

       const cons=await res.data
       if(res.status!==200&&res.status!==201){
        dispatch(contactsFail(cons))
       }else{
        dispatch(contacts(cons))
       }
    }
}


export const popContact=(contact)=>{
    return{
        type:ActionTypes.POP_CONTACT,
        contact
    }
}


export const pushContact=(contact)=>{
    return{
        type:ActionTypes.PUSH_CONTACT,
        contact
    }
}


export const clearContact=()=>{
    return{
        type:ActionTypes.CLEAR_CONTACTS
    };
};