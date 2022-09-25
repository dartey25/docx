import {MessagesActions, MessagesActionTypes, MessagesState} from "../../types/messages";


const initialState: MessagesState = {
    messages: [],
    currentSelectedMessage: null,
    loading: false
}


const messagesReducer = (state = initialState, {type, payload}: MessagesActions): MessagesState => {
    switch (type) {
        case MessagesActionTypes.SET_MESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false
            }
        case MessagesActionTypes.SET_LOADING:
            return {
                ...state,
                loading: payload
            }
        case MessagesActionTypes.SET_CURRENT_SELECTED_MESSAGE:
            return {
                ...state,
                currentSelectedMessage: payload
            }
        default:
            return state;
    }
}

export default messagesReducer;