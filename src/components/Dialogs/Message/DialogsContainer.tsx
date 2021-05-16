import React from "react";
import Dialogs from "../Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../redux/dialogs-reducer";
import {AppStoreType} from "../../../redux/redux-store";


type DialogsContainerPropsType = {
    store: AppStoreType
};
const DialogsContainer = (props: DialogsContainerPropsType) => {
    const state = props.store.getState().dialogsPage;

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    };
    const onNewMessageChange = (body:string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    };

    return (
      <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={state}/>
    )
};

export default DialogsContainer;