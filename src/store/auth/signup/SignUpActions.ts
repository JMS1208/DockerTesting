import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiClientWithoutAuth} from "../../../api/client/ApiClient";
import config from "../../../config/config";

interface RequestDto {
    email: string;
    password: string;
    departments: number[];
}

interface ResponseDto {
    result: boolean;
}

export const signUpAction = createAsyncThunk(
    'auth/signUp',
    async (requestDto: RequestDto, {rejectWithValue}) => {
        try {
            const response = await apiClientWithoutAuth.post(config.apiUrl.signUp, {
                email: requestDto.email,
                password: requestDto.password,
                departments: requestDto.departments
            });

            return response.data as ResponseDto;
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

