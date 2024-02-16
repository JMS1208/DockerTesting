import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../../api/client/ApiClient";
import appConfig from "../../config/appConfig";
import {AxiosError} from "axios";


export const fetchUserInfoAction = createAsyncThunk(
    'auth/fetchUserInfo',
    async (_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(appConfig.apiUrl.fetchUserInfo);

            //console.log("API Response: ", JSON.stringify(response, null, 2));
            //console.log("Response Data: ", JSON.stringify(response.data, null, 2));

            return {
                response: response
            }
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

