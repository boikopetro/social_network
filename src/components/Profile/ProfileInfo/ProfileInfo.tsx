import React from 'react';
import styles from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";

type ProfileType = any

const ProfileInfo = (props: ProfileType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={styles.profileBlock}>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZnGKVh4G3LQ1VMuxdmKnxKcsplUeSx1EbDQ&usqp=CAU"/>
            </div>
            <div>
                <img src={props.profile.photos.large}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.contacts.github}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;