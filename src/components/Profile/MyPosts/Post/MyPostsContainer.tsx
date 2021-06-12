import React from 'react';
import MyPosts from "../MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../../redux/profile-reducer";
import {connect} from "react-redux";
import {RootStateType} from "../../../../redux/store";
import store from "../../../../redux/redux-store";

const mapStateToProps = (state:RootStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: typeof store.dispatch) => {
    return {
        updateNewPostText: (text:string) => {
            dispatch(updateNewPostTextAC(text))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);


export default MyPostsContainer;