import {sendMessageAC} from "./dialogs-reducer";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "./types/types";
import {profileApi} from "../api/profileApi";

export type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof savePhotoSuccessAC>

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

type initialStateType = {
    posts: Array<PostType>
    profile: ProfileType
    status: string
}

const initialState: initialStateType = {
    posts: [
        {id: 1, post: "hi hi hi", likeCounter: 99},
        {id: 2, post: "post", likeCounter: 9},
    ],
    profile: {} as ProfileType,
    status: "",
}

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: 8,
                post: action.newPostText,
                likeCounter: 77777,
                newPostText: "",
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

export const getStatus = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    const data = await profileApi.getStatus(userId)
    dispatch(setStatusAC(data))
}
export const getUserProfile = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    const data = await profileApi.getProfile(userId)
    dispatch(setUserProfileAC(data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch<ActionsType>) => {
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}
export const savePhoto = (file: File) => async (dispatch: Dispatch<ActionsType>) => {
    const data = await profileApi.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(data.data.photos))
    }
}

export const saveProfileData = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;