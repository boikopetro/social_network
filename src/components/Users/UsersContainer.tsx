import React from "react";
import {connect} from "react-redux";
import {follow, requestUsers, unfollow,} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {
    getCurrentPageSelector,
    getIsFetchingSelector,
    getIsFollowingInProgressSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsers
} from "../../redux/users-selectors";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {UsersType} from "../../redux/types/types";

type MapStateType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    users: UsersType
    totalUsersCount: number
    followingInProgress: Array<number>
}
type MapDispatchType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type UsersContainerType = MapStateType & MapDispatchType

class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                //key={this.props.users.id}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        users: getUsers(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getIsFollowingInProgressSelector(state),
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        getUsers: requestUsers,
    }), withAuthRedirect)(UsersContainer)
