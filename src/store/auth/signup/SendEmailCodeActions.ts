import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiClientWithoutAuth} from "../../../api/client/ApiClient";
import config from "../../../config/config";

interface RequestDto {
    email: string;
}

interface ResponseDto {
    expiredAt: string;
}

export const sendEmailCodeAction = createAsyncThunk(
    'auth/sendEmailCode',
    async (emailVerifyingRequestDto: RequestDto, {rejectWithValue}) => {
        try {
            const response = await apiClientWithoutAuth.post(config.apiUrl.sendEmailCode, {
                email: emailVerifyingRequestDto.email,
            })

            const { expiredAt } = response.data as ResponseDto;

            return {
                expiredAt: expiredAt
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

