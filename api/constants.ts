import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export const SOCKET_IO_URL = publicRuntimeConfig.SOCKET_IO_URL
export const BASE_API = publicRuntimeConfig.BASE_API;
export const LOGIN_API = BASE_API + "auth/login";
export const RESET_PASSWORD_API = BASE_API + 'reset-password'
export const LOGOUT_API = BASE_API + "auth/logout";
export const USERS_API = BASE_API + 'users'
export const ORGANIZATIONS_API = BASE_API + 'organizations'
export const USER_LOGS_API =  BASE_API + 'user-logs'
export const MEETINGS_API = BASE_API + 'meetings'
export const ACTIVITIES_API = BASE_API + 'activities'
export const USER_VIDEOS_API = BASE_API + 'user-videos'
export const REGISTER_API = BASE_API + "user/registerUser";
export const UPLOAD_IMAGES_API = BASE_API + "images/uploadImages";
export const UPLOAD_VIDEO_API = BASE_API + "video/uploadVideo";
export const GET_EVENT_BY_USER_ID = BASE_API+ "activites/getActivtyByUserId";
export const REPORT_EVENT = BASE_API+"activites/reportActivity";
export const IGNORE_EVENT = BASE_API+"activites/ignoreActivity";
export const VIDEO_SOURCE = (uuid) => BASE_API + `static/${uuid}-proccessed.webm`
export const LOCAL_STORAGE_PREFIX = publicRuntimeConfig.LOCAL_STORAGE_PREFIX
export const LOCAL_STORAGE_TOKEN = `${LOCAL_STORAGE_PREFIX}-token`
export const LOCAL_STORAGE_USER = `${LOCAL_STORAGE_PREFIX}-user`

export const getAuthorizationHeaders = state => {
    const { auth: { token } } = state
    return {
        Authorization: `Bearer ${token}`
    }
}

export const customParamsSerializer = (params) => {
    return Object.entries(params)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
  }

  export const getPasswordRegex = () => /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/