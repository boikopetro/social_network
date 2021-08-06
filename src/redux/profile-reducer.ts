import {PostType} from "./store";
import {sendMessageAC} from "./dialogs-reducer";
import {profileApi, usersApi} from "../api/api";
import {Dispatch} from "redux";

export type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatus>

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

type ContactsType = {
    facebook: null
    website: null
    vk: null
    twitter: null
    instagram: null
}

type PhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: PhotosType
    userId: string | null
}

const initialState: initStateType = {
    posts: [
        {id: "1", post: "hi hi hi", likeCounter: 99},
        {id: "2", post: "post", likeCounter: 9},
    ],
    profile: {} as ProfileType,
    status: "",
}
type initStateType = {
    posts: Array<PostType>
    profile: ProfileType
    status: string
}

const profileReducer = (state = initialState, action: ActionsType): initStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: "8",
                post: action.newPostText,
                likeCounter: 77777
            };
            debugger
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}

export const setUserProfileAC = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
export const getUserProfileAC = (userId: string | null) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await usersApi.getProfile(userId)
    dispatch(setUserProfileAC(response.data))
}

export const getStatus = (userId: string | null) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileApi.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const addPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)

export default profileReducer;