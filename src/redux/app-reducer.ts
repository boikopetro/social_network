import {getAuthUsersData} from "./auth-reducer";

type appReducerType = ReturnType<typeof initializedSuccess>

type InitialStateType = {
    initialized: boolean
}
const initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: appReducerType): InitialStateType => {
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
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUsersData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })

}

export default appReducer