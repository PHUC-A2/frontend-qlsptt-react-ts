import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/*
{
    "status": true,
    "message": "Login successfully",
    "access_token": "47|7hDiJCpJkVRcuycCLsJzynwS9rCxGo6zXgP0KngAa8130a81"
}
*/
interface AuthState {
    access_token: string | null;
    message: string | null;
    isAuthenticated: boolean;
}


// const initialState: AuthState = {
//     access_token: localStorage.getItem("access_token") || null, //  lấy token cũ từ localStorage
//     message: "",
//     isAuthenticated: false // mặc định là false
// };

const token = localStorage.getItem("access_token");

const initialState: AuthState = {
    access_token: token,
    message: token ? "User logged in" : "",
    isAuthenticated: !!token // nếu có hoặc ko có token thì ép sang boolean
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLoginInfo: (state, action: PayloadAction<AuthState>) => {
            // console.log(action);
            state.access_token = action.payload.access_token;
            state.message = action.payload.message;
            state.isAuthenticated = true
        },
        setLogoutUser: (state) => {
            state.access_token = null;
            state.isAuthenticated = false;
            state.message = "";
            localStorage.removeItem('access_token');
        },
    },
});

export const { setUserLoginInfo, setLogoutUser } = authSlice.actions;
export default authSlice.reducer;