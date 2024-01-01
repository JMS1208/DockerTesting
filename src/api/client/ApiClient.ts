import axios from "axios";
import config from "../../config/config";
import {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken} from "../../storage/Cookie";
import {SignInResponseDto} from "../../store/auth/signin/SignInActions";

//인증이 필요하지 않을 때
export const apiClientWithoutAuth = axios.create({
    baseURL: config.baseUrl,
    timeout: 10_000, // 10초 타임아웃
});

//인증이 필요할 때
export const apiClientWithAuth = axios.create({
    baseURL: config.baseUrl,
    timeout: 10_000,
    headers: {
        Authorization: `Bearer ${getAccessToken()}`
    }
});

//토큰 갱신이 필요할 때
const postRefreshToken = async () => {
    return apiClientWithoutAuth.post(config.apiUrl.refreshToken, {
        refreshToken: getRefreshToken(),
        accessToken: getAccessToken()
    });
};


//응답 인터셉터에서 토큰 갱신 처리
apiClientWithAuth.interceptors.response.use(response => {
    return response;
}, async error => {
    //오류 나는 경우에만 처리하면 됨
    const {
        config,
        response: {status},
    } = error;

    //토큰 만료시
    if (status === 401) {
        if (error.response.data.message === 'Unauthorized') {
            const originRequest = config;

            //리프레시 토큰 api
            const response = await postRefreshToken();

            //리프레시 토큰 요청 성공할 때
            if(response.status === 200) {

                const { accessToken, refreshToken, accessTokenExpiredAt, refreshTokenExpiredAt } = response.data as SignInResponseDto;

                setAccessToken(accessToken, new Date(accessTokenExpiredAt));
                setRefreshToken(refreshToken, new Date(refreshTokenExpiredAt));

                axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

                //진행 중이던 요청 이어서 하기
                originRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originRequest);

            // 리프레시 토큰도 만료되었을 때 - 재로그인
            } else if (response.status === 404) {
                alert("다시 로그인 해주세요");
                window.location.replace(config.pageUrl.signIn);
            } else {

            }
        }
    }

    return Promise.reject(error);
});