import {ActionsType, MessagesPageType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

export const updateNewMessageBodyCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body} as const);
export const sendMessageCreator = () => ({type: SEND_MESSAGE} as const);

const initialState = {
    messages: [
        {id: "0", message: "hi"},
        {id: "1", message: "text"},
        {id: "2", message: "hi"}
    ],
    newMessageBody: "",
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
    let stateCopy;

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };
        case SEND_MESSAGE:
            const body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: "",
                messages: [...state.messages, {id: "9", message: body}]
            };
        default:
            return state;
    }
}
export default dialogsReducer;