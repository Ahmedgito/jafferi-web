import { createSlice } from "@reduxjs/toolkit"

const authSlices = createSlice({
    name:'Auth',
    initialState: {
        user: null,
        loading: false,
        isAuthenticated: false,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = true;
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout
} = authSlices.reducer;
export default authSlices.reducer;