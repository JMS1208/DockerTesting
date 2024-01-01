import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClientWithoutAuth} from "../../api/client/ApiClient";
import config from "../../config/config";
import {AxiosError} from "axios";

interface RequestDto {
    email: string;
}

interface DepartmentKeywordsDto {
    department: string;
    keywords: Set<string>;
}

interface StudentInfoBundleDto {
    email: string;
    departmentKeywords: Map<number, DepartmentKeywordsDto>;
}

// ResponseDto는 StudentInfoBundleDto를 포함할 것으로 가정
interface ResponseDto {
    data: StudentInfoBundleDto;
}

export const fetchUserInfoAction = createAsyncThunk(
    'auth/fetchUserInfo',
    async (requestDto: RequestDto, {rejectWithValue}) => {
        try {
            const response = await apiClientWithoutAuth.get(config.apiUrl.fetchUserInfo);

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

