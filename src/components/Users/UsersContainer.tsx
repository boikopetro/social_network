import React from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/store";
import {
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount, toggleIsFetching,
    unfollow,
    UsersType
} from "../../redux/users-reducer";
import axios from "axios";
import Users, {UsersPropsType} from "./Users";
import preloader from "./../../assets/images/Hourglass.gif";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";

type UsersContainerType = {
    componentDidMount: any
    onPageChanged: (pageNumber: number) => void
    render: () => UsersPropsType
}

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        //@ts-ignore
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                //@ts-ignore
                this.props.toggleIsFetching(false);
                //@ts-ignore
                this.props.setUsers(response.data.items);
                //@ts-ignore
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {

        this.props.setCurrentPage(pageNumber);

        this.props.toggleIsFetching(true);

        //@ts-ignore
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                //@ts-ignore
                this.props.toggleIsFetching(false);
                //@ts-ignore
                this.props.setUsers(response.data.items);
            });
        //@ts-ignore
        this.props.setCurrentPage(pageNumber)
    }

    render() {
        //@ts-ignore
        return <>{this.props.isFetching ? <Preloader/> : null}
            <Users//@ts-ignore
                totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                //@ts-ignore
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                //@ts-ignore
                users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}
            />
        </>
    }
}

type MapStateToPropsType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}
const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}
/*const mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: string) => {
            dispatch(follow(userId));
        },
        unfollow: (userId: string) => {
            dispatch(unfollow(userId));
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsers(users));
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPage(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCount(totalCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetching(isFetching))
        },

    }
}*/


export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    toggleIsFetching,
})(UsersContainer);