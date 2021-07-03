import React from "react";
import Dialogs from "../Dialogs";
import {sendMessageAC} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";
import store, {AppStateType} from "../../../redux/redux-store";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {MessagesPageType} from "../../../redux/store";

type MapStateToPropsType = { dialogsPage: MessagesPageType }

type MapDispatchToPropsType = { sendMessage: (newMessageBody: string) => void }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch: typeof store.dispatch): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageAC(newMessageBody))
        }
    }
}

export default compose<React.ComponentType>(
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs);
