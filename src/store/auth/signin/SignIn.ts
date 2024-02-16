import {createSlice} from '@reduxjs/toolkit';
import appConfig from "../../../config/appConfig";
import {signIn} from "./SignInActions";

export type SignInState = {
    loading: number;
};

const initialState: SignInState = {
    loading: 0
}

export const signInSlice = createSlice({
    name: 'authState',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder)  => {
        builder
            .addCase(signIn.pending, (state)=> {
                state.loading += 1;

            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading -= 1;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading -= 1;
            })
    }
});


export default signInSlice.reducer;

