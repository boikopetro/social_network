import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/types/types";


export type UserPropsType = {
    user: UserType
    followingInProgress: Array<string>
    unfollow: (userId: string) => void
    follow: (userId: string) => void
}


const User = ({user, followingInProgress, unfollow, follow}: UserPropsType) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ? <button disabled={followingInProgress.some((id: any) => id === user.id)}
                                             onClick={() => {
                                                 unfollow(user.id)
                                             }}>UnFollow</button>
                        : <button disabled={followingInProgress.some((id: any) => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.fullName}</div>
                    <div>{user.status}</div>
                </span>
                    <span>
                        <div>{"el.location.country"}</div>
                        <div>{"el.location.city"}</div>
                    </span>
                </span>
        </div>
    )
}


export default User;