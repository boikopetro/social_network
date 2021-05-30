import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {RootStateType} from "../../redux/store";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../redux/users-reducer";

const mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId: string) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsersAC(users));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);