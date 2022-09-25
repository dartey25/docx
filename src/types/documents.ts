import {GridSelectionModel} from "@mui/x-data-grid/models/gridSelectionModel";

export interface MessagesState {
    messages: any[];
    currentSelectedMessage: GridSelectionModel | null;
    loading: boolean;
}

export enum MessagesActionTypes {
    SET_MESSAGES = "SET_MESSAGES",
    SET_LOADING = "MESSAGES:SET_LOADING",
    SET_CURRENT_SELECTED_MESSAGE = "SET_CURRENT_SELECTED_MESSAGE"
}

interface SetMessagesAction {
    type: typeof MessagesActionTypes.SET_MESSAGES;
    payload: any[];
}

interface SetLoadingAction {
    type: typeof MessagesActionTypes.SET_LOADING;
    payload: boolean;
}

interface SetCurrentSelectedMessageAction {
    type: typeof MessagesActionTypes.SET_CURRENT_SELECTED_MESSAGE;
    payload: GridSelectionModel | null;
}


export type MessagesActions = SetMessagesAction | SetLoadingAction | SetCurrentSelectedMessageAction;