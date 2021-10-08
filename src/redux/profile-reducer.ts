import {sendMessageAC} from "./dialogs-reducer";
import {profileApi, usersApi} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";

export type PostType = {
    id: string,
    post: string,
    likeCounter: number
}

export type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof savePhotoSuccessAC>

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

export type ContactsType = {
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: PhotosType
    userId: string | null
    savePhoto: any
}
type initialStateType = {
    posts: Array<PostType>
    profile: ProfileType
    status: string
}

const initialState: initialStateType = {
    posts: [
        {id: "1", post: "hi hi hi", likeCounter: 99},
        {id: "2", post: "post", likeCounter: 9},
    ],
    profile: {} as ProfileType,
    status: "",
}


const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: "8",
                post: action.newPostText,
                likeCounter: 77777
            };
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
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}
export const savePhotoSuccessAC = (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)
export const setUserProfileAC = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const)
export const addPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)

export const getStatus = (userId: string | null) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileApi.getStatus(userId)
    dispatch(setStatusAC(response.data))
}
export const getUserProfile = (userId: string | null) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await usersApi.getProfile(userId)
    dispatch(setUserProfileAC(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileApi.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data.photos))
    }
}

export const saveProfileData = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;