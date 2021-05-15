import React, {ChangeEvent} from "react";
import {ActionsType, MessagesPageType, } from "../../redux/store";
import styles from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";


type DialogsPropsType = {
    messagesPage: MessagesPageType
    newMessageValue: string
    dispatch: (action: ActionsType) => void
};
const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.messagesPage.dialogs
        .map(el => <DialogItem name={el.name} id={el.id}/>);

    const messagesElements = props.messagesPage.messages
        .map(el => <Message message={el.message}/>);

    const addMessage = () => {
        props.dispatch(sendMessageCreator(props.newMessageValue))
    };
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.currentTarget.value
        props.dispatch(updateNewMessageBodyCreator(body))
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
                <textarea onChange={onMessageChange} value={props.newMessageValue} placeholder="message"></textarea>
            </div>
            <div>
                <button onClick={addMessage}>add</button>
            </div>
        </div>
    )
};
export default Dialogs