import {GetItemsType, instance} from "./api";

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    unFollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            }) as Promise<ResponseType>
    },
}