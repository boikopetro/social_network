import React from "react";
import Dialogs from "../Dialogs";
import {sendMessageAC, updateNewMessageBodyAC} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";
import store, {AppStateType} from "../../../redux/redux-store";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {MessagesPageType} from "../../../redux/store";

type MapStateToPropsType = { dialogsPage: MessagesPageType }

type MapDispatchToPropsType = { updateNewMessageBody: (body: string) => void } & { sendMessage: () => void }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch: typeof store.dispatch): MapDispatchToPropsType => {
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
