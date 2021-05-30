import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";

export type ReduxStoreType = typeof reducers
export type AppStoreType = typeof store
export type AppStateType = ReturnType<ReduxStoreType>

const reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
});

const store = createStore(reducers);


export default store;
