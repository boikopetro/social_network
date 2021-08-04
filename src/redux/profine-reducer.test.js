import profileReducer, {addPostAC} from "./profile-reducer";

const state= {
    posts: [
        {id: "1", post: "hi hi hi", likeCounter: 99},
        {id: "2", post: "post", likeCounter: 9}
    ],
    profile: {},
    status: "",
}

it("new post should be added", () => {
    const action = addPostAC("some new post text")

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

it("new post text should be correct", () => {
    const action = addPostAC("some new post text")

    const newState = profileReducer(state, action)

    expect(newState.posts[newState.posts.length-1].post).toBe("some new post text")
})

