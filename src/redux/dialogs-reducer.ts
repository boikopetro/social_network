import {ActionsType} from "./profile-reducer";

const SEND_MESSAGE = "SEND-MESSAGE";

export type DialogItemType = {
    id: string
    name: string
}
export type MessageType = {
    id: string,
    message: string
}
type DialogsType = Array<DialogItemType>
type MessagesType = Array<MessageType>
export type InitialStateType = {
    messages: MessagesType
    dialogs: DialogsType
}

export const sendMessageAC = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const);

const initialState: InitialStateType = {
    messages: [
        {id: "0", message: "hi"},
        {id: "1", message: "text"},
        {id: "2", message: "hi"}
    ],
    dialogs: [
        {id: "0", name: "Jack"},
        {id: "1", name: "Nick"},
        {id: "2", name: "Kate"},
        {id: "3", name: "Patrick"},
        {id: "4", name: "Sara"},
        {id: "5", name: "Bob"}
    ]
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            const body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: "9", message: body}],
            };
        default:
            return state;
    }
}
export default dialogsReducer;