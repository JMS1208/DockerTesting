import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiClient} from "../../../api/client/ApiClient";
import appConfig from "../../../config/appConfig";

interface RequestDto {
    email: string;
    code: string;
}

export interface VerifyEmailCodeResponseDto {
    result: boolean;
}

export const verifyEmailCodeAction = createAsyncThunk(
    'auth/verifyEmailCode',
    async (requestDto: RequestDto, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(appConfig.apiUrl.verifyEmailCode, {
                email: requestDto.email,
                code: requestDto.code
            })

            return response.data as VerifyEmailCodeResponseDto;
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

