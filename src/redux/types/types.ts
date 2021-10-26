
export type ContactsType = {
    facebook: null | string
    website: null | string
    vk: null | string
    twitter: null | string
    instagram: null | string
    youtube: null | string
    github: null | string
    mainLink: null | string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: PhotosType
    userId: number | null
    savePhoto: any
}

export type PostType = {
    id: number
    post: string
    likeCounter: number
    newPostText?: string
}
export type UsersType = Array<UserType>

export type UserType = {
    id: number
    photos: PhotosType
    followed: boolean
    fullName: string
    status: string
    location: LocationType
}

export type LocationType = {
    city: string
    country: string
}