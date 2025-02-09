import { createSlice } from "@reduxjs/toolkit"

const authSlices = createSlice({
    name:'Auth',
    initialState: {
        user: null,
        loading: false,
        isAuthenticated: false,
        token: localStorage.getItem('AuthToken') || null,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.loading = true;
            state.token = action.payload.token;
            localStorage.setItem('AuthToken', action.payload.token);
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('AuthToken')
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout
} = authSlices.actions;
export default authSlices.reducer;