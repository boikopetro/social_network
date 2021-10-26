import {getAuthUsersData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

const INITIALIZED_SUCCESS = "SN/APP/INITIALIZED_SUCCESS"
const initialState = {
    initialized: false
}
type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>


const appReducer = (state = initialState, action: ActionType): InitialStateType => {
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


const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const)
}

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUsersData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })

}

export default appReducer