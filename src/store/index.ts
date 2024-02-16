import { configureStore } from '@reduxjs/toolkit';
import signInReducer from './auth/signin/SignIn';
import {useDispatch} from "react-redux";
import signUpReducer from './auth/signup/SignUp';
import myPageReducer from './mypage/MyPage';

export const appStore = configureStore({
    reducer: {
        signIn: signInReducer,
        signUp: signUpReducer,
        myPage: myPageReducer
    },
});

// 스토어의 디스패치 함수 타입을 정의합니다.
export type AppDispatch = typeof appStore.dispatch;

// export default store;

// 스토어의 상태 타입을 정의합니다.
export type RootState = ReturnType<typeof appStore.getState>;



export const useAppDispatch = () => useDispatch<AppDispatch>()