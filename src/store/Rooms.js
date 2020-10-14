import * as ActionTypes from "./Actions";
import Axios from '../axios'
export const fetchSuccess = (rooms) => {
  return {
    type: ActionTypes.FETCH_ROOM_SUCCESS,
    rooms,
  };
};

export const fetchStart = () => {
  return {
    type: ActionTypes.FETCH_ROOM_START,
  };
};
export const fetchFail = (error) => {
  return {
    type: ActionTypes.FETCH_ROOM_FAIL,
    error,
  };
};

export const fetchRooms = (token) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    const res = await Axios.get("/rooms", {
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const rooms =  res.data;
    if (res.status !== 200 && res.status !== 201) {
      dispatch(fetchFail(rooms));
    } else {
      dispatch(fetchSuccess(rooms));
    }
  };
};
/********************************* */

/*export const pushRoom=(room,friends)=>{
    return {
        type:ActionTypes.PUSH_ROOM,
        room,friends
    }
}*/

/************************************************* */

export const roomSuccess = (room, id) => {
  return {
    type: ActionTypes.ROOM_SUCCESS,
    room,
    id,
  };
};

export const roomStart = () => {
  return {
    type: ActionTypes.ROOM_START,
  };
};
export const roomFail = (error, id) => {
  return {
    type: ActionTypes.ROOM_FAIL,
    error,
    id,
  };
};

export const fetchRoom = (token, id) => {
  return async (dispatch) => {
    dispatch(roomStart());
    const res = await Axios.get(`/room?room=${id}&&limit=30`, {
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });
    const room =  res.data;
    if (res.status !== 200 && res.status !== 201) {
      dispatch(roomFail(room, id));
    } else {
      dispatch(roomSuccess(room, id));
    }
  };
};
export const message = (photo) => {
    return async dispatch => {
        try {
            const form=new FormData()
            form.append("photo",photo)
            const res = await Axios('http://localhost:9004/message', form)
            const data = await res.data
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }
}


export const searchRoom=(begain,rooms)=>{
  let n=null
  n= rooms.filter(r=>{
    return r.name.startsWith(begain)
 })
  return{
    type:ActionTypes.SEARCH_ROOM,
    serached:n
  }
}