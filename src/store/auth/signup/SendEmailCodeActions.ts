import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiClient} from "../../../api/client/ApiClient";
import appConfig from "../../../config/appConfig";

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
            const response = await apiClient.post(appConfig.apiUrl.sendEmailCode, {
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

