import Preloader from "../../common/Preloader/Preloader";
import styles from "./ProfileInfo.module.css";
import React from "react";
import ProfileStatus, {ProfileStatusPropsType} from "./ProfileStatus"

/*type ContactsType = {
    facebook: null
    website: null
    vk: null
    twitter: null
    instagram: null
}

type PhotosType = {
    small: string
    large: string
}

type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: PhotosType
    userId: number
}*/

type ProfileInfoPropsType = {
    profile: any
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={styles.profileBlock}>
            {/* <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZnGKVh4G3LQ1VMuxdmKnxKcsplUeSx1EbDQ&usqp=CAU"/>
            </div>*/}
            <div>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={"tytytyty"}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.contacts.github}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;