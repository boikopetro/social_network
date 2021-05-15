import { combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

const reducers = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer
});

const store = createStore(reducers);

export type ReduxStoreType = typeof reducers
export type AppStoreType = typeof store


export type AppStateType = ReturnType<ReduxStoreType>

export default store;


/*
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStoreType = typeof storeexport
type AppStateType = ReturnType<typeof rootReducer>
export default store*/
