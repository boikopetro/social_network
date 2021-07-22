import {AppStateType} from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users
}

export const getPageSizeSelector = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageSelector = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getIsFollowingInProgressSelector = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}