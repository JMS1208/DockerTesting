import {Cookies} from 'react-cookie';
import appConfig from "../config/appConfig";

const cookies = new Cookies();

const REFRESH_TOKEN = 'refresh_token';

const ACCESS_TOKEN  = 'access_token';

//쿠키에 리프레시 토큰 저장
export const setRefreshToken = (token: string, expiredAt: Date) => {

    return cookies.set(REFRESH_TOKEN, token, {
        sameSite: 'strict',
        path: '/',
        expires: expiredAt
    });
};

//쿠키에 액세스 토큰 저장
export const setAccessToken = (token: string, expiredAt: Date) => {
    // const now = new Date();
    // const expiredAt = now.setDate(now.getTime() + config.accessTokenDuration);

    return cookies.set(ACCESS_TOKEN, token, {
        sameSite: 'strict',
        path: '/',
        expires: expiredAt
    });
};


//쿠키에 저장된 리프레시 토큰 가져오기
export const getRefreshToken = () => {
    return cookies.get(REFRESH_TOKEN);
};

//쿠키에 저장된 액세스 토큰 가져오기
export const getAccessToken = () => {
    return cookies.get(ACCESS_TOKEN);
};

//쿠키에서 리프레시 토큰 삭제 - 로그아웃시 사용
export const removeRefreshToken = () => {
    return cookies.remove(REFRESH_TOKEN, {
        sameSite: 'strict',
        path: '/'
    });
};

//쿠키에서 액세스 토큰 삭제 - 로그아웃시 사용
export const removeAccessToken = () => {
    return cookies.remove(ACCESS_TOKEN, {
        sameSite: 'strict',
        path: '/'
    });
};