import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.jpg";

const Users = (props: any) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div>
        <div>
            {pages.map(el => {
                return <span className={props.currentPage === el ? styles.selectedPage : ""}
                    //@ts-ignore
                             onClick={(e) => {props.onPageChanged(el)}}>{el+" "}</span>
            })}
        </div>
        {
            //@ts-ignore
            props.users.map(el => <div key={el.id}>
                <span>
                    <div>
                        <img src={el.photos.small !== null ? el.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {el.followed
                            ? <button onClick={() => {
                                //@ts-ignore
                                props.unfollow(el.id)
                            }}> UnFollow</button>
                            : <button onClick={() => {
                                //@ts-ignore
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


export default Users;