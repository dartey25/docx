import {MessagesActions, MessagesActionTypes} from "../../types/messages";
import {default as messagesApi} from "../../util/api/messages";
import {GridSelectionModel} from "@mui/x-data-grid/models/gridSelectionModel";

const setMessages= (items: any[]): MessagesActions => ({
    type: MessagesActionTypes.SET_MESSAGES,
    payload: items
})

const setLoading= (loading: boolean): MessagesActions => ({
    type: MessagesActionTypes.SET_LOADING,
    payload: loading
})

export const setCurrentSelectedMessage = (message: GridSelectionModel | null): MessagesActions => ({
    type: MessagesActionTypes.SET_CURRENT_SELECTED_MESSAGE,
    payload: message
})

export const fetchMessages = (id: number) => (dispatch: any) => {
    dispatch(setLoading(true));
    // @ts-ignore
    messagesApi.getAllByDialogId(id).then(({ data }) => {
        dispatch(setMessages(data));
    }).catch(() => {
        dispatch(setLoading(false));
    });
}

