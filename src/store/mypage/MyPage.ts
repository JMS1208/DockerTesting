import {createSlice} from "@reduxjs/toolkit";
import {checkEmailAction} from "../auth/signup/CheckEmailActions";
import {sendEmailCodeAction} from "../auth/signup/SendEmailCodeActions";
import {verifyEmailCodeAction} from "../auth/signup/VerifyEmailCodeActions";
import {signUpAction} from "../auth/signup/SignUpActions";

export type MyPageState = {
    email: string | null
    departments: string[] | null
};

const initialState: MyPageState = {
    email: null,
    departments: null
}

export const myPageSlice = createSlice({
    name: 'myPage',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder)  => {

    }
});



export default myPageSlice.reducer;

