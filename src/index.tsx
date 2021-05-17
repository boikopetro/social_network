import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStateType} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import StoreContext from "./StoreContext";

const rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <StoreContext.Provider value={store}>
                <App />
            </StoreContext.Provider>
        </BrowserRouter>
        ,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState());
reportWebVitals();
store.subscribe(() => {
    rerenderEntireTree(store.getState())
});
