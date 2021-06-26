import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {ProfilePageType, RootStateType} from "../../redux/store";
import {getUserProfileAC} from "../../redux/profile-reducer";
import {MapStatePropsTypeForRedirect, withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfilePageType
}

export type MapDispatchPropsType = {
    getUserProfileAC: (userId: string) => void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType & MapStatePropsTypeForRedirect
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = "1";
        }
        this.props.getUserProfileAC(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileAC}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);