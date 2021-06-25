import React from "react";
import Dialogs from "../Dialogs";
import {sendMessageAC, updateNewMessageBodyAC} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";
import store, {AppStateType} from "../../../redux/redux-store";

/*type MapStateToPropsType = (state:AppStateType) => {
    dialogsPage: MessagesPageType
}
type MapDispatchToPropsType = (dispatch:typeof store.dispatch) => {
    updateNewMessageBody: () => void
    sendMessage: (body:string) => void
}*/
const mapStateToProps = (state:AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: typeof store.dispatch) => {
    return {
        updateNewMessageBody: (body:string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);


export default DialogsContainer;