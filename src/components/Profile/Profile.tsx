import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import {ProfilePageType} from "../../redux/store";

type ProfilePropsType = {
    profile: ProfilePageType
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div><ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;