import {Dispatch} from "redux"
import {getAuthUsersData} from "./auth-reducer";

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

type appReducerType = ReturnType<typeof initializedSuccess>

type InitialStateType = {
    initialized: boolean
}

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"
const initialState = {
    initialized: false,
}

const appReducer = (state: InitialStateType = initialState, action: appReducerType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUsersData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })

}

export default appReducer