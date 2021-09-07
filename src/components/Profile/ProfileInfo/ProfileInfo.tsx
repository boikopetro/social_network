import Preloader from "../../common/Preloader/Preloader";
import styles from "./ProfileInfo.module.css";
import React from "react";
import { ProfileType } from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.jpg";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) =>void
    isOwner: boolean
    savePhoto: any
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e:any) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])

        }
    }
    return (
        <div className={styles.profileBlock}>
            <div>
                <img src={props.profile.photos.large || userPhoto} className={styles.avatarPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.contacts.vk}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;