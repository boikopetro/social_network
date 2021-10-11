import React from 'react'
import Profile from "./Profile"
import {connect} from "react-redux"
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfileData,
    updateStatus
} from "../../redux/profile-reducer"
import {MapStatePropsTypeForRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {AppStateType} from "../../redux/redux-store"
import {ProfileType} from "../../redux/types/types";

type PathParamsType = {
    userId: string | null
}
type MapStatePropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: string | null
    isAuth: boolean
}
export type MapDispatchPropsType = {
    getUserProfileAC: (userId: string | null) => void
    getStatus: (userId: string | null) => void
    updateStatus: (status: string) => void
    savePhoto: () => void
    saveProfile: any
}
type OwnPropsType = MapStatePropsType & MapDispatchPropsType & MapStatePropsTypeForRedirect
//@ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfileAC(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfileAC: getUserProfile, getStatus, updateStatus, savePhoto, saveProfile: saveProfileData}),
    withRouter,
    //withAuthRedirect,
)(ProfileContainer)