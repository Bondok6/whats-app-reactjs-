import * as ActionTypes from "./Actions";

const initialState = {
  rooms: [],
  loading: false,
  loadRoon:false,
  error: null,
  room:[],
  id:null,
  roomName:null,
  friends:null,
  serached:[]
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ROOM_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.FETCH_ROOM_SUCCESS:
      return {
        ...state,
        rooms: action.rooms,
        loading: false,
        error: null,
      };
    case ActionTypes.FETCH_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ActionTypes.PUSH_ROOM:
      return {
        ...state,
        rooms: state.rooms.concat({
          name: action.room,
          friends: action.friends,
        }),
      };
    case ActionTypes.ROOM_START:
      return {
          ...state,
          loadRoon:true
      };
    case ActionTypes.ROOM_FAIL:
      return {
          ...state,
          error:action.error,
          loadRoon:false,
          id:action.id
      };
    case ActionTypes.ROOM_SUCCESS:
      return {
          ...state,
          room:action.room.messages,
          loadRoon:false,
          id:action.id,
          roomName:action.room.room.name,
          friends:action.room.room.friends
         /*  photo:action.room.room.name */  //in advance **
      };
    case ActionTypes.SEARCH_ROOM:
      return{
        ...state,
        serached:action.serached
      }  
    default:
      return state;
  }
};
export default Reducer;
