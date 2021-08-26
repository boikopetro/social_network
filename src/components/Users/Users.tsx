import React from "react";
import {UsersType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UsersType
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    followingInProgress: []
}


const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}: UsersPropsType) => {
    return <div>
        <div>
            {
                users.map((u: any) =>
                    <User key={u.id}
                          user={u}
                          followingInProgress={props.followingInProgress}
                          unfollow={props.unfollow}
                          follow={props.follow}
                    />)
            }
        </div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
    </div>
}


export default Users;