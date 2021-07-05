import React, {ChangeEvent} from "react";
import {MessagesPageType} from "../../redux/store";
import styles from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type DialogsPropsType = {
    sendMessage: (newMessageBody: string) => void
    dialogsPage: MessagesPageType
    isAuth: boolean
};
const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage;
    const dialogsElements = state.dialogs
        .map(el => <DialogItem name={el.name} id={el.id} key={el.id}/>);
    const messagesElements = state.messages
        .map(el => <Message message={el.message} key={el.id}/>);
    const addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }
    //if (!props.isAuth) return <Redirect to={"/login"}/>

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>

        </div>
    )
};
const maxLength10 = maxLengthCreator(10);
const AddMessageForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={"newMessageBody"}
                       placeholder={"message"}
                       validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>add</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs