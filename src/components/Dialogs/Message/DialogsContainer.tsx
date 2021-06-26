import React from "react";
import Dialogs from "../Dialogs";
import {sendMessageAC, updateNewMessageBodyAC} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";
import store, {AppStateType} from "../../../redux/redux-store";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {MessagesPageType} from "../../../redux/store";


/*
type MapStateToPropsType = (state: AppStateType) => {
    dialogsPage: MessagesPageType
}
type MapDispatchToPropsType = (dispatch: typeof store.dispatch) => {
    updateNewMessageBody: () => void
    sendMessage: (body: string) => void
}
*/

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch: typeof store.dispatch) => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyAC(body))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs);
