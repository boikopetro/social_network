import React from "react";
import {ProfileDataPropsType} from "./ProfileInfo";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

type ProfileDataFormPropsType = any

const ProfileDataForm = (props: ProfileDataFormPropsType) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <button onClick={() => {
            }}>Save
            </button>
        </div>
        <div>
            <b>Full name:</b> {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job:</b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>
        <div>
            <b>My Professional
                skills:</b> {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me:</b> {createField("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            {/*  <b>Contacts:</b>{Object.keys(props.profile.contacts).map(key => {
            //@ts-ignore
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        })}*/}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxForm;