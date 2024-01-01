import {createSlice} from '@reduxjs/toolkit';
import config from "../../../config/config";
import {signIn} from "./SignInActions";

export type SignInState = {
    isLoggedIn: boolean;
    loading: number;
};

const initialState: SignInState = {
    isLoggedIn: false,
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
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading -= 1;
            })
    }
});


export default signInSlice.reducer;

