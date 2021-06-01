import React from "react";
import styles from "./users.module.css";
import {followAC, UsersType} from "../../redux/users-reducer";
import axios from "axios";
import userPhoto from "../../../src/assets/images/user.jpg"
/*

type UsersPropsType = {
    users: UsersType
    setUsers: (users: UsersType) => void
    unfollow: (userId: string) => void
    follow: (userId: string) => void
}

const Users = (props: UsersPropsType) => {
    const getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                props.setUsers(response.data.items);
            });
        }
    }


    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <img src={el.photos.small !== null ? el.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => {
                                props.unfollow(el.id)
                            }}> UnFollow</button>
                            : <button onClick={() => {
                                props.follow(el.id)
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

export default Users;*/
