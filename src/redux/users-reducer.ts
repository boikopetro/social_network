import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helper";
import {UsersType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {usersApi} from "../api/usersApi";

const FOLLOW = "SN/USERS/FOLLOW";
const UNFOLLOW = "SN/USERS/UNFOLLOW";
const SET_USERS = "SN/USERS/SET_USERS";
const SET_CURRENT_PAGE = "SN/USERS/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SN/USERS/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "SN/USERS/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS";
const initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}


type ActionsTypes = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsTypes>

type InitialStateType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number> //array of users ids
}

const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
    setUsers: (users: UsersType) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId,
    } as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        const data = await usersApi.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setUsersTotalCount(data.totalCount))
    }
}


const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    const apiMethod = await usersApi.followUser.bind(usersApi)
    await _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    const apiMethod = await usersApi.unFollowUser.bind(usersApi)
    await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)
}

export default usersReducer