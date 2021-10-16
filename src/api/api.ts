import axios from "axios";
import {ProfileType} from "../redux/types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "bcb0b5fe-869a-4b99-9053-6bb7e1416d15"
    }
})

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    followUser(userId: string) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    unFollowUser(userId: string) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(userId: any) {
        console.warn("Obsolete method. Use profile API obj")
        return profileApi.getProfile(userId);
    }
}

export const profileApi = {
    getProfile(userId: any) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: any) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

export const authApi = {
    authMe() {
        return instance.get(`auth/me`);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null ) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}