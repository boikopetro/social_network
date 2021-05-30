import React from "react";
import styles from "./users.module.css";
import {followAC, UsersType} from "../../redux/users-reducer";

type UsersPropsType = {
    users: UsersType
    setUsers: (users: UsersType) => void
    unfollow: (userId: string) => void
    follow: (userId: string) => void
}

const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: "1",
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB32J-Uar1mYol9lVdX-XlfeSiJf01jSeRHQ&usqp=CAU",
                followed: false,
                fullName: "Ivan",
                status: "some status",
                location: {city: "Minsk", country: "Belarus"}
            },
            {
                id: "2",
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB32J-Uar1mYol9lVdX-XlfeSiJf01jSeRHQ&usqp=CAU",
                followed: true,
                fullName: "Oleg",
                status: "some status",
                location: {city: "Moscow", country: "Russia"}
            },
            {
                id: "3",
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB32J-Uar1mYol9lVdX-XlfeSiJf01jSeRHQ&usqp=CAU",
                followed: false,
                fullName: "Name",
                status: "some status",
                location: {city: "Kiev", country: "Ukraine"}
            },
        ])
    }

    return <div>
        {
            props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <img src={el.photoUrl} className={styles.userPhoto}/>
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
                            <div>{el.location.country}</div>
                            <div>{el.location.city}</div>
                            </span>
                            </span>

            </div>)
        }
    </div>
}

export default Users;