import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AUTH_NOT_OK_MESSAGE, AUTH_OK_MESSAGE, AUTH_USER_URL, notify, Pages, USER_INFO} from "../vars";
import {encryptInformation} from "../authService";
import {BASE_PATH, LOGIN_PAGE} from "../App";

const initialState = {
    isAuth: null,
    pathToRedirectAfterLogin: "",
    isLoading: true,
};

export const authorizeUser = createAsyncThunk(
    'auth/authorizeUser',
    async (info, thunkAPI) => {
        debugger
        let formData = new FormData();
        formData.append("userInformation", JSON.stringify(info.values));

        const response = await fetch(AUTH_USER_URL, {
                method: "POST",
                body: formData
            }
        )

        if (response.ok) {
            const parsedInfo = await response.json();
            await thunkAPI.dispatch(setIsLoading(false));
            await thunkAPI.dispatch(setIsAuth({
                isOk: true,
                message: AUTH_OK_MESSAGE
            }));

            const pathToRedirectAfterLogin = thunkAPI.getState().auth.pathToRedirectAfterLogin;
            info.redirectAfterLogin(pathToRedirectAfterLogin === LOGIN_PAGE ? BASE_PATH : pathToRedirectAfterLogin);

            return {
                ...parsedInfo,
            }
        } else {
            await thunkAPI.dispatch(setIsLoading(false));
            notify(AUTH_NOT_OK_MESSAGE);
        }

        return {
            ok: false
        }
    }
)

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            debugger
            const {
                isOk,
                message
            } = action?.payload;

            if (state.isAuth !== isOk && message) {
                notify(message);
            }

            state.isAuth = isOk
        },
        setIsLoading: (state, action) => {
            state.isLoading = action?.payload;
        },
        setPathToRedirectAfterLogin: (state, action) => {
            state.pathToRedirectAfterLogin = action.payload ===
            LOGIN_PAGE
                ? state.pathToRedirectAfterLogin || Pages.BASE
                : action.payload;
        }
    },
    extraReducers: ({
        [authorizeUser.fulfilled]: (state, action) => {
            const isAuthorized = action.payload.ok;
            delete action.payload.ok;

            if (isAuthorized) {
                encryptInformation(action.payload, USER_INFO)
            }

            state.isAuth = isAuthorized
        },
    })
})

export const {
    setIsAuth,
    setPathToRedirectAfterLogin,
    setIsLoading
} = authReducer.actions;

export default authReducer.reducer;