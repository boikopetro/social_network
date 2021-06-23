import { PostType, ProfilePageType} from "./store";
import {sendMessageAC, updateNewMessageBodyAC} from "./dialogs-reducer";
import {usersApi} from "../api/api";

export type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof setUserProfileAC>


const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

const initialState = {
    posts: [
        {id: "1", post: "hi hi hi", likeCounter: 99},
        {id: "2", post: "post", likeCounter: 9}
    ],
    newPostText: "",
    profile: null,

}

const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: "8",
                post: state.newPostText,
                likeCounter: 77777
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText,
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }
}

export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text} as const);
export const setUserProfileAC = (profile:ProfilePageType) => ({type: SET_USER_PROFILE, profile} as const);
export const getUserProfileAC = (userId: string) => (dispatch: any) => {
    usersApi.getProfile(userId)
        .then(response => {
           dispatch(setUserProfileAC(response.data));
        });
}
export const addPostAC = () => ({type: ADD_POST} as const);

export default profileReducer;