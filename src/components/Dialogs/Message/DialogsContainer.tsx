import React from "react";
import Dialogs from "../Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../redux/dialogs-reducer";
/*import {AppStoreType} from "../../../redux/redux-store";*/
import StoreContext from "../../../StoreContext";


/*type DialogsContainerPropsType = {
    store: AppStoreType
};*/
const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
            (store:any) => {
                const state = store.getState().dialogsPage;

                const onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                };
                const onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageBodyCreator(body))
                };
                return <Dialogs updateNewMessageBody={onNewMessageChange}
                                sendMessage={onSendMessageClick}
                                dialogsPage={state}/>
            }
        }
        </StoreContext.Consumer>
    )
};

export default DialogsContainer;