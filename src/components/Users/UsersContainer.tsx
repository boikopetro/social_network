import React from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/store";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC, toggleIsFetchingAC,
    unfollowAC,
    UsersType
} from "../../redux/users-reducer";
import axios from "axios";
import Users, {UsersPropsType} from "./Users";
import preloader from "./../../assets/images/Hourglass.gif";
import Preloader from "../common/Preloader/Preloader";

/*type UsersContainerType = {
    componentDidMount: any
    onPageChanged: (pageNumber: number) => void
    render: () => UsersPropsType
}*/

class UsersContainer extends React.Component {
    componentDidMount() {
        //@ts-ignore
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

    //@ts-ignore
    onPageChanged = (pageNumber: number) => {
        //@ts-ignore
        this.props.setCurrentPage(pageNumber);
        //@ts-ignore
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
        return <>{this.props.isFetching ? <Preloader /> : null}
            <Users//@ts-ignore
                totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                //@ts-ignore
                users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
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
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);