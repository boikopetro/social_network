import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStateType} from "./redux/store";

const rerenderEntireTree = (state:RootStateType) => {
    ReactDOM.render(
        <App store={store} />
        ,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState());
reportWebVitals();
store.subscribe(() => {
    rerenderEntireTree(store.getState())
});
