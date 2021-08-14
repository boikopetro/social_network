import Preloader from "../../common/Preloader/Preloader";
import styles from "./ProfileInfo.module.css";
import React from "react";
import { ProfileType } from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) =>void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }
    return (
        <div className={styles.profileBlock}>
            <div>
                <img src={props.profile.photos.large}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.contacts.vk}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;