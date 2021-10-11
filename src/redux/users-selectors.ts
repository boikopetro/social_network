import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";
import {UsersType} from "./types/types";

export const getUsersSelector = (state: AppStateType): UsersType => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})

export const getPageSizeSelector = (state: AppStateType): number => {
    return state.usersPage.pageSize
}

export const getTotalUsersCountSelector = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageSelector = (state: AppStateType): number => {
    return state.usersPage.currentPage
}

export const getIsFetchingSelector = (state: AppStateType): boolean => {
    return state.usersPage.isFetching
}

export const getIsFollowingInProgressSelector = (state: AppStateType): any => {
    return state.usersPage.followingInProgress
}