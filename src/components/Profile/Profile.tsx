import React from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';

import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import {StoreType} from "../../redux/store";
import {AppStoreType} from "../../redux/redux-store";

type PropsType = {
    store: AppStoreType
}

const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;