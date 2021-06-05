import React from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/store";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowAC,
    UsersType
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";

class UsersContainer extends React.Component {
    componentDidMount() {
        //@ts-ignore
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                //@ts-ignore
                this.props.setUsers(response.data.items);
                //@ts-ignore
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: string) => {
        //@ts-ignore
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                //@ts-ignore
                this.props.setUsers(response.data.items);
            });
        //@ts-ignore
        this.props.setCurrentPage(pageNumber)
    }

    render() {
        //@ts-ignore
        return <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
            //@ts-ignore
                      currentPage={this.props.currentPage}
            //@ts-ignore
                      onPageChanged={this.onPageChanged} users={this.props.users}
            //@ts-ignore
                      follow={this.props.follow} unfollow={this.props.unfollow}
        />
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
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
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount:number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);