import {createSlice} from "@reduxjs/toolkit";
import {checkEmailAction} from "../auth/signup/CheckEmailActions";
import {fetchUserInfoAction} from "./FetchUserInfoActions";
import {updateDepartmentSelectActions} from "./UpdateDepartmentSelectActions";
import {signOutActions} from "./SignOutActions";

export type MyPageState = {
    loading: number
    email: string | null
    departmentKeywordsList: DepartmentKeywords[] | null
};

export type DepartmentKeywords = {
    departmentId: number
    department: string
    keywords: string[]
    selected: boolean
}


const initialState: MyPageState = {
    loading: 0,
    email: null,
    departmentKeywordsList: null
}

export const myPageSlice = createSlice({
    name: 'myPage',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder)  => {
        builder
            .addCase(fetchUserInfoAction.pending, (state)=> {
                state.loading += 1;
            })
            .addCase(fetchUserInfoAction.fulfilled, (state, action) => {
                state.loading -= 1;
                state.email = action.payload.response.data.email;
                state.departmentKeywordsList = action.payload.response.data.departmentKeywordsList;
            })
            .addCase(fetchUserInfoAction.rejected, (state, action) => {
                state.loading -= 1;
            });

        builder
            .addCase(updateDepartmentSelectActions.pending, (state) => {
                state.loading += 1;
            })
            .addCase(updateDepartmentSelectActions.fulfilled, (state, action) => {
                state.loading -= 1;

                if (state.departmentKeywordsList) {
                    state.departmentKeywordsList = state.departmentKeywordsList.map(departmentKeyword => {
                        if (departmentKeyword.departmentId === action.payload.departmentId) {
                            return { ...departmentKeyword, selected: action.payload.select };
                        } else {
                            return departmentKeyword;
                        }
                    });
                }
            })
            .addCase(updateDepartmentSelectActions.rejected, (state) => {
                state.loading -= 1;
            });

        builder
            .addCase(signOutActions.pending, (state)=> {
                state.loading += 1;
            })
            .addCase(signOutActions.fulfilled, (state, action) => {
                state.loading -= 1;

            })
            .addCase(signOutActions.rejected, (state, action) => {
                state.loading -= 1;
            });
    }
});



export default myPageSlice.reducer;

