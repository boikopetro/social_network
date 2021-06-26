import React, {ChangeEvent} from "react";
import {MessagesPageType} from "../../redux/store";
import styles from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

type DialogsPropsType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: () => void
    dialogsPage: MessagesPageType
    isAuth: boolean
};
const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage;
    const newMessageBody = state.newMessageBody;
    const dialogsElements = state.dialogs
        .map(el => <DialogItem name={el.name} id={el.id} key={el.id}/>);
    const messagesElements = state.messages
        .map(el => <Message message={el.message} key={el.id}/>);
    const addMessage = () => {
        props.sendMessage()
    };
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.currentTarget.value
        props.updateNewMessageBody(body)
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea onChange={onMessageChange} value={newMessageBody} placeholder="message"/>
            </div>
            <div>
                <button onClick={addMessage}>add</button>
            </div>
        </div>
    )
};
export default Dialogs