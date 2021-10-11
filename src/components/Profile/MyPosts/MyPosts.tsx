import React from 'react';
import styles from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../redux/types/types";

type MyPostsPropsType = {
    addPost: (newPostText: string) => void
    posts: PostType[]
}

const MyPosts = React.memo((props: MyPostsPropsType) => {

    const postsElements = props.posts
        .map(el => <Post key={el.id} post={el.post} likeCounter={el.likeCounter}/>)

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
})

const maxLength10 = maxLengthCreator(10);
const AddPostForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={"newPostText"}
                       placeholder="post"
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: "addPostForm"})(AddPostForm)


export default MyPosts;