import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {theme: 'light'};

const ThemeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        darkTheme(state) {
            state.theme = 'dark'
        },
        lightTheme(state){
            state.theme = 'light'
        }   
    }
});

export const themeActions = ThemeSlice.actions;
export default ThemeSlice.reducer;