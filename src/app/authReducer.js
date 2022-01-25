import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false
};

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        return true
    }
)

export const authorizeUser = createAsyncThunk(
    'auth/authorizeUser',
    async (credentials) => {
    }
)

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action?.payload;
        },
    },
    extraReducers: ({
        [checkAuth.fulfilled]: (state, action) => {
            const {
                isAuth
            } = action.payload;

            console.log(isAuth)
            state.isAuth = isAuth || true;
        },
        [checkAuth.rejected]: (state) => {
            state.isAuth = true;
        }
    })
})

export const {
    setIsAuth
} = authReducer.actions;

export default authReducer.reducer;