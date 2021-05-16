import React from 'react';
import MyPosts from "../MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/profile-reducer";
import {AppStoreType} from "../../../../redux/redux-store";

type MyPostsContainerPropsType = {
    store: AppStoreType
}

const MyPostsContainer = (props: MyPostsContainerPropsType) => {
    const state = props.store.getState()
    const addPost = () => {
        props.store.dispatch(addPostActionCreator());
    };

    const onPostChange = (text: string) => {
        const action = updateNewPostTextActionCreator(text)
        props.store.dispatch(action)
    };

    return (
        <MyPosts
            updateNewPostText={onPostChange}
            addPost={addPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
        />
    )
}

export default MyPostsContainer;