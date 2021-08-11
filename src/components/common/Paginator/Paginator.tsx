import React from "react";
import styles from "./Paginator.module.css";
import {UsersType} from "../../../redux/users-reducer";

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

//@ts-ignore
const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        {pages.map(el => {
            return <span className={currentPage === el ? styles.selectedPage : ""}
                         onClick={(e) => {
                             onPageChanged(el)
                         }}>{el + " "}</span>
        })}
    </div>
}


export default Paginator;