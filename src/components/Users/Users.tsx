import React from "react";

import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../redux/types/types";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UsersType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}


const Users: React.FC<UsersPropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
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