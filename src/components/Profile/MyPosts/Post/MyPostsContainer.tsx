import MyPosts from "../MyPosts";
import {addPostAC} from "../../../../redux/profile-reducer";
import {connect} from "react-redux";
import store, {AppStateType} from "../../../../redux/redux-store";

const mapStateToProps = (state:AppStateType) => {
    return {
        posts: state.profilePage.posts,

    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);


export default MyPostsContainer;