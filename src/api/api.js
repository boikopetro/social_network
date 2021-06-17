import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "bcb0b5fe-869a-4b99-9053-6bb7e1416d15"
    }
})

export const usersApi = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    authMe() {
        return instance.get(`auth/me`)
    },
    followUser(id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    unFollowUser(id) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            })
    }
}