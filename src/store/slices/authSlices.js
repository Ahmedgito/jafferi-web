import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("AuthUser")) || null,
    loading: false,
    isAuthenticated: !!localStorage.getItem("AuthToken"),
    token: localStorage.getItem("AuthToken") || null,
    role: JSON.parse(localStorage.getItem("AuthUser"))?.role || null,
    industry: JSON.parse(localStorage.getItem("AuthUser"))?.industry || null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.user.role;
            state.industry = action.payload.user.industry;
            state.loading = false;

            localStorage.setItem("AuthToken", action.payload.token);
            localStorage.setItem("AuthUser", JSON.stringify(action.payload.user));
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            state.industry = null;

            localStorage.removeItem("AuthToken");
            localStorage.removeItem("AuthUser");
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
