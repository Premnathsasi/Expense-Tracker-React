import {createSlice} from '@reduxjs/toolkit';

const loggedIn =!! localStorage.getItem('token');
const initialState = {isAuthenticated: loggedIn};

const AuthSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true
        },

        logout(state){
            state.isAuthenticated = false
        }
    }
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;