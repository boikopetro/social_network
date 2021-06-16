import {addPostAC, setUserProfileAC, updateNewPostTextAC} from "./profile-reducer";
import  {sendMessageAC, updateNewMessageBodyAC} from "./dialogs-reducer";
import {InitialStateType} from "./users-reducer";

/*const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: "1", post: "hi hi hi", likeCounter: 99},
                {id: "2", post: "post", likeCounter: 9}
            ],
            newPostText: ""
        },
        dialogsPage: {
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
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("rerender");
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber();
    }
}*/

// ----------------types--------------
/*
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionsType) => void
}
*/

export type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof setUserProfileAC>

export type PostType = {
    id: string,
    post: string,
    likeCounter: number
}
export type ProfilePostsTypes = Array<PostType>

export type MessageType = {
    id: string,
    message: string
}
export type MessagesPropsType = Array<MessageType>

export type DialogItemType = {
    id: string
    name: string
}
type DialogsType = Array<DialogItemType>

export type ProfilePageType = {
    posts: ProfilePostsTypes
    newPostText: string
    profile: any
}
export type MessagesPageType = {
    messages: MessagesPropsType
    newMessageBody: string
    dialogs: DialogsType
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: MessagesPageType
    usersPage: InitialStateType
}


