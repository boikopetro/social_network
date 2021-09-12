import Preloader from "../../common/Preloader/Preloader";
import styles from "./ProfileInfo.module.css";
import React, {useState} from "react";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.jpg";
import ProfileDataForm from "./ProfileDataForm";

type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: any
    saveProfile: any
}

export type ProfileDataPropsType = {
    profile: ProfileType
    owner: boolean
    goToEditMode: () => void
}

type ContactType = {
    contactTitle: string
    contactValue: string
}


const ProfileInfo = (props: ProfileInfoPropsType) => {
    const [editMode, setEditMode] = useState(false)
    if (!Object.keys(props.profile).length) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: any) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    return (
        <div className={styles.profileBlock}>
            <div>
                <img src={props.profile.photos.large || userPhoto} className={styles.avatarPhoto} alt={"avatar"}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                {editMode
                    //@ts-ignore
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={props.profile} owner={props.isOwner}/>}
            </div>
        </div>
    )
}

const ProfileData = (props: ProfileDataPropsType) => {
    return <div>
        {props.owner && <div>
            <button onClick={props.goToEditMode}>Edit</button>
        </div>}
        <div>
            <b>Full name: </b>{props.profile.fullName}
        </div>
        <div>
            <b>Looking for a job: </b> {props.profile.lookingForAJob ? "yes" : "no"}
        </div>
        <div>
            <b>My Professional skills: </b> {props.profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me: </b>{props.profile.aboutMe}</div>
        <div>
            <b>Contacts: </b>{Object.keys(props.profile.contacts).map(key => {
            //@ts-ignore
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}: ContactType) => {
    return <div className={styles.contact}>
        <b>{contactTitle}:</b>{contactValue}
    </div>
}

export default ProfileInfo;