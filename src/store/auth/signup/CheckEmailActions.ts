import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiClientWithoutAuth} from "../../../api/client/ApiClient";
import config from "../../../config/config";

interface RequestDto {
    email: string;
}

interface ResponseDto {
    emailExisted: boolean;
}

export const checkEmailAction = createAsyncThunk(
    'auth/checkEmail',
    async (requestDto: RequestDto, {rejectWithValue}) => {
        try {
            const response = await apiClientWithoutAuth.post(config.apiUrl.checkEmail, {
                email: requestDto.email,
            })

            const { emailExisted } = response.data as ResponseDto;

            return {
                emailExisted: emailExisted,
                verifiedEmail: emailExisted ? null : requestDto.email
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

