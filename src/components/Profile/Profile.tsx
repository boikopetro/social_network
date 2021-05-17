import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
/*import {AppStoreType} from "../../redux/redux-store";*/

/*type PropsType = {
    store: AppStoreType
}*/

const Profile = () => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;