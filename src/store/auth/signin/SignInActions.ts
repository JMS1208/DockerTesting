import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiClientWithoutAuth} from "../../../api/client/ApiClient";
import config from "../../../config/config";
import {SignInState} from "./SignIn";
import {setAccessToken, setRefreshToken} from "../../../storage/Cookie";
import {Sign} from "crypto";

export interface SignInRequestDto {
    email: string;
    password: string;
}

export interface SignInResponseDto {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: string;
    refreshTokenExpiredAt: string;
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (signInRequestDto: SignInRequestDto, {rejectWithValue}) => {
        try {
            const response = await apiClientWithoutAuth.post(config.apiUrl.signIn, {
                email: signInRequestDto.email,
                password: signInRequestDto.password
            })

            const { accessToken, refreshToken, accessTokenExpiredAt, refreshTokenExpiredAt } = response.data as SignInResponseDto;

            console.log(`액세스 토큰: ${accessToken} ${accessTokenExpiredAt}`);
            console.log(`리프래시 토큰: ${refreshToken} ${refreshTokenExpiredAt}`);

            setRefreshToken(refreshToken, new Date(refreshTokenExpiredAt));
            setAccessToken(accessToken, new Date(accessTokenExpiredAt));

            return {
                isLoggedIn: true
            };
        } catch (err) {

            if (err instanceof AxiosError && err.response) {
                // AxiosError가 발생한 경우, 에러 응답을 처리합니다.
                return rejectWithValue(err.response.data);
            } else {
                // 다른 종류의 에러가 발생한 경우, 이를 처리합니다.
                return rejectWithValue(err);
            }

        }

    }
);