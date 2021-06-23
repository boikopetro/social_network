import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {ProfilePageType, RootStateType} from "../../redux/store";
import {getUserProfileAC} from "../../redux/profile-reducer";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: ProfilePageType
}
type MapDispatchPropsType = {
    getUserProfileAC: (userId: string) => void
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType
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
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfileAC})(WithUrlDataContainerComponent);