import React from 'react';
import styles from './MyPosts.module.css'
import Post from './Post/Post';
import {PostType} from "../../../redux/store";

type MyPostsPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
    posts: PostType[]
    newPostText: string

}

const MyPosts = (props: MyPostsPropsType) => {

    const postsElements = props.posts
        .map(el => <Post post={el.post} likeCounter={el.likeCounter}/>);

    const onAddPost = () => {
        props.addPost();
    };

    const onPostChange = (e:  React.ChangeEvent<HTMLTextAreaElement> ) => {
        const text = e.currentTarget.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={styles.postsBox}>
            <p>.............................</p>
            <h2>my posts</h2>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText} placeholder="post"/>
                </div>
                <div>
                    <button onClick={onAddPost}>add</button>
                </div>
            </div>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;