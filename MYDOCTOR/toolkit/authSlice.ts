import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie"; 
const cookies = new Cookies();

interface StateData {
    isLoggedIn: boolean;
    userImage: string;
}

const initialState: StateData = {
    isLoggedIn: false,
    userImage: '',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            cookies.remove("token");
            cookies.remove("userId");
            state.isLoggedIn = false;
            state.userImage = ''; 
        },
        login: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.userImage = action.payload;
        }
    },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
