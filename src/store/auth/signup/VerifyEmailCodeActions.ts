import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiClientWithoutAuth} from "../../../api/client/ApiClient";
import config from "../../../config/config";

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
            const response = await apiClientWithoutAuth.post(config.apiUrl.verifyEmailCode, {
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

