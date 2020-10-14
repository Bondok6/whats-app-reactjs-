import * as ActionTypes from './Actions'
const initState = {
    contacts: [],
    loading: false,
    checkedContacts: [],
    error: null,

};

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_START:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case ActionTypes.FETCH_CONTACTS:
            return {
                ...state,
                loading: false,
                contacts: action.contacts
            };
        case ActionTypes.POP_CONTACT:
            return {
                ...state,
                checkedContacts: state.checkedContacts.filter(id => {
                    return id !== action.contact
                })
            }
        case ActionTypes.PUSH_CONTACT:
            return {
                ...state,
                checkedContacts: state.checkedContacts.concat(action.contact)
            };
        case ActionTypes.CLEAR_CONTACTS:
            return{
                ...state,
                checkedContacts:[]
            }    
        default:
            return state
    }
}
export default Reducer