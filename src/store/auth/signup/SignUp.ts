import {createSlice} from '@reduxjs/toolkit';
import {checkEmailAction} from "./CheckEmailActions";
import {sendEmailCodeAction} from "./SendEmailCodeActions";
import {verifyEmailCodeAction} from "./VerifyEmailCodeActions";
import {signUpAction} from "./SignUpActions";

export type SignUpState = {
    emailExisted: boolean | null;
    verifiedEmail: string | null;
    loading: number;
    expiredAt: string | null;
    // codeValid: boolean | null;
};

const initialState: SignUpState = {
    emailExisted: null,
    verifiedEmail: null,
    loading: 0,
    expiredAt: null,
    // codeValid: null
}

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder)  => {
        builder
            .addCase(checkEmailAction.pending, (state)=> {
                state.loading += 1;
                //다시 중복 검사하는 경우
                state.expiredAt = null;
            })
            .addCase(checkEmailAction.fulfilled, (state, action) => {
                state.loading -= 1;
                state.emailExisted = action.payload.emailExisted;
                state.verifiedEmail = action.payload.verifiedEmail;
            })
            .addCase(checkEmailAction.rejected, (state, action) => {
                state.loading -= 1;
            });

        builder
            .addCase(sendEmailCodeAction.pending, (state) => {
                state.loading += 1;
            })
            .addCase(sendEmailCodeAction.fulfilled, (state, action) => {
                state.loading -= 1;
                state.expiredAt = action.payload.expiredAt;
            })
            .addCase(sendEmailCodeAction.rejected, (state, action)=> {
                state.loading -= 1;
            });

        builder
            .addCase(verifyEmailCodeAction.pending, (state) => {
                state.loading += 1;
            })
            .addCase(verifyEmailCodeAction.fulfilled, (state, action) => {
                state.loading -= 1;
                // state.codeValid = action.payload.isValid;
            })
            .addCase(verifyEmailCodeAction.rejected, (state, action) => {
                state.loading -= 1;
            });

        builder
            .addCase(signUpAction.pending, (state) => {
                state.loading += 1;
            })
            .addCase(signUpAction.fulfilled, (state) => {
                state.loading -= 1;
            })
            .addCase(signUpAction.rejected, (state) => {
                state.loading -= 1;
            });
    }
});



export default signUpSlice.reducer;

