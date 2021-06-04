export type InitialStateType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
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

type ActionsType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
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
        default:
            return state;
    }
}

export const followAC = (userId: string) => ({type: FOLLOW, userId} as const);
export const unfollowAC = (userId: string) => ({type: UNFOLLOW, userId} as const);
export const setUsersAC = (users: UsersType) => ({type: SET_USERS, users} as const);
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const);
export const setUsersTotalCountAC = (totalUsersCount:number) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount} as const);

export default usersReducer;