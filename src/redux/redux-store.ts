import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";

export type ReduxStoreType = typeof rootReducer
export type AppStoreType = typeof store
export type AppStateType = ReturnType<ReduxStoreType>

const rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
});

const store = createStore(rootReducer);


export default store;
