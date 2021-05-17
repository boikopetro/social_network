import React from 'react';
import MyPosts from "../MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../redux/profile-reducer";
/*import {AppStoreType} from "../../../../redux/redux-store";*/
import StoreContext from "../../../../StoreContext";

/*
type MyPostsContainerPropsType = {
    store: AppStoreType
}
*/

const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
            (store: any) => {
                const state = store.getState();
                const addPost = () => {
                    store.dispatch(addPostActionCreator());
                };
                const onPostChange = (text: string) => {
                    const action = updateNewPostTextActionCreator(text);
                    store.dispatch(action);
                };
                return <MyPosts
                    updateNewPostText={onPostChange}
                    addPost={addPost}
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
                />
            }}
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;