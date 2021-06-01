export type InitialStateType = {
    users: UsersType
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

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

const initialState = {
    users: [],
}

const usersReducer = (state:InitialStateType  = initialState, action: ActionsType): InitialStateType => {
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
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state;
    }
}

export const followAC = (userId: string) => ({type: FOLLOW, userId} as const);
export const unfollowAC = (userId: string) => ({type: UNFOLLOW, userId} as const);
export const setUsersAC = (users: UsersType) => ({type: SET_USERS, users} as const);

export default usersReducer;