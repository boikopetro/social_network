import {ProfileType} from "./profile-reducer";
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

/*
export type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof setUserProfileAC>
*/


/*export type ProfilePageType = {
    posts: ProfilePostsTypes
    newPostText: string
    profile: ProfileType
    status: string
}*/

/*
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: MessagesPageType
    usersPage: InitialStateType
}
*/


