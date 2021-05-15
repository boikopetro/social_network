import {ActionsType, PostType, ProfilePageType} from "./store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text} as const);
export const addPostActionCreator = () => ({type: ADD_POST} as const);

const initialState = {
        posts: [
            {id: "1", post: "hi hi hi", likeCounter: 99},
            {id: "2", post: "post", likeCounter: 9}
        ],
        newPostText: ""
    }


const profileReducer = (state: ProfilePageType = initialState, action:ActionsType) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: "8",
                post: state.newPostText,
                likeCounter: 77777
            };
            state.posts.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}



export default profileReducer;