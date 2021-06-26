import {usersApi} from "../api/api";
import {Dispatch} from "redux";

export type InitialStateType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: any
}
export type UsersType = Array<UserType>

export type UserType = {
    id: string
    photos: any
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}
type LocationType = {
    city: string
    country: string
}

type ActionsType = ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowingProgress>


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


const initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed: true}
                    }
                    return el;
                })
            }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(el => {
                    if (el.id === action.userId) {
                        return {...el, followed: false}
                    }
                    return el;
                })
            }
        }

        case SET_USERS: {
            return {...state, users: action.users};
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage};
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count};
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,

                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    //@ts-ignore
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        }
        default:
            return state;
    }
}

export const followSuccess = (userId: string) => ({type: FOLLOW, userId} as const);
export const unfollowSuccess = (userId: string) => ({type: UNFOLLOW, userId} as const);
export const setUsers = (users: UsersType) => ({type: SET_USERS, users} as const);
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const);
export const setUsersTotalCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
} as const);
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const);
export const toggleIsFollowingProgress = (isFetching: boolean, userId: string) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
} as const);

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        usersApi.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setUsersTotalCount(data.totalCount));
            });
    }
}

export const follow = (userId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        usersApi.followUser(userId)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleIsFollowingProgress(false, userId))
            });
    }
}

export const unfollow = (userId: string) => {
    return (dispatch: any) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        usersApi.unFollowUser(userId)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleIsFollowingProgress(false, userId))
            });
    }
}

export default usersReducer;