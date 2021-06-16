import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";


export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UsersType
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}


const Users = (props: UsersPropsType) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(el => {
                return <span className={props.currentPage === el ? styles.selectedPage : ""}
                             onClick={(e) => {
                                 props.onPageChanged(el)
                             }}>{el + " "}</span>
            })}
        </div>
        {
            props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <NavLink to={"/profile/" + el.id}>
                            <img src={el.photos.small !== null ? el.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "bcb0b5fe-869a-4b99-9053-6bb7e1416d15"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(el.id)
                                        }
                                    });
                            }}> UnFollow</button>

                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "bcb0b5fe-869a-4b99-9053-6bb7e1416d15"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(el.id)
                                        }
                                    });
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{el.fullName}</div>
                        <div>{el.status}</div>
                    </span>
                    <span>
                        <div>{"el.location.country"}</div>
                        <div>{"el.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}


export default Users;