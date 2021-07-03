import React from 'react';
import styles from './MyPosts.module.css'
import Post from './Post/Post';
import {PostType} from "../../../redux/store";
import {Field, reduxForm} from "redux-form";

type MyPostsPropsType = {
    addPost: (newPostText: string) => void
    posts: PostType[]
}

const MyPosts = (props: MyPostsPropsType) => {

    const postsElements = props.posts
        .map(el => <Post key={el.id} post={el.post} likeCounter={el.likeCounter}/>);

    const onAddPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={styles.postsBox}>
            <p>.............................</p>
            <h2>my posts</h2>
            <AddPostFormRedux onSubmit={onAddPost}/>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const AddPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newPostText"} placeholder="post"/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: "addPostForm"})(AddPostForm)


export default MyPosts;