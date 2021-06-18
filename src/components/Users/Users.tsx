import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {usersApi} from "../../api/api";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UsersType
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    toggleIsFollowingProgress: (isFetching: boolean, userId: string) => void
    followingInProgress: any
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
                            ? <button
                                //@ts-ignore
                                disabled={props.followingInProgress.some(id => id === el.id)}
                                onClick={() => {
                                    props.toggleIsFollowingProgress(true, el.id)
                                    usersApi.unFollowUser(el.id)
                                        .then(response => {
                                            if (response.resultCode === 0) {
                                                props.unfollow(el.id)
                                            }
                                            props.toggleIsFollowingProgress(false, el.id)
                                        });
                                }}>UnFollow</button>
                            //@ts-ignore
                            : <button disabled={props.followingInProgress.some(id => id === el.id)}
                                      onClick={() => {
                                          props.toggleIsFollowingProgress(true, el.id)
                                          usersApi.followUser(el.id)
                                              .then(response => {
                                                  if (response.resultCode === 0) {
                                                      props.follow(el.id)
                                                  }
                                                  props.toggleIsFollowingProgress(false, el.id)
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