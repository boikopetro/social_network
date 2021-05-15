import {ActionsType, MessagesPageType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

export const updateNewMessageBodyCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body} as const);
export const sendMessageCreator = (postText: string) => ({type: SEND_MESSAGE} as const);

const initialState = {
    messages: [
        {id: "0", message: "hi"},
        {id: "1", message: "text"},
        {id: "2", message: "hi"}
    ],
    newMessageText: "",
    dialogs: [
        {id: "0", name: "Jack"},
        {id: "1", name: "Nick"},
        {id: "2", name: "Kate"},
        {id: "3", name: "Patrick"},
        {id: "4", name: "Sara"},
        {id: "5", name: "Bob"}
    ]
}


const dialogsReducer = (state: MessagesPageType = initialState, action: ActionsType) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageText = action.body;
            return state;
        case SEND_MESSAGE:
            const body = state.newMessageText;
            state.newMessageText = "";
            state.messages.push({id: "9", message: body})
            return state;
        default:
            return state;
    }
}
export default dialogsReducer;