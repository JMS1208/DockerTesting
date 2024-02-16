import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiClient} from "../../../api/client/ApiClient";
import appConfig from "../../../config/appConfig";

export interface SignInRequestDto {
    email: string;
    password: string;
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (signInRequestDto: SignInRequestDto, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(appConfig.apiUrl.signIn, {
                email: signInRequestDto.email,
                password: signInRequestDto.password
            })

            //console.log(JSON.stringify(response, null, 2));

            return {
                result: response.status === 200
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