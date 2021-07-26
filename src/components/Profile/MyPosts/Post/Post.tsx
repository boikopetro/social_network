import React from 'react';
import styles from './Post.module.css'

type messagesType = {
    post: string
    likeCounter: number

}
const Post = (props: messagesType) => {
    return (
        <div>
            <div className={styles.item}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQSxF0x14uZ0Xmv1uplRjzDshwu4WzwbkEA&usqp=CAU" alt={"post"}/>
                <p>{props.post}</p>
                <span>like {props.likeCounter}</span>
            </div>
        </div>
    )
}

export default Post;