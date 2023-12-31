import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoginUser, NewUser, NewUserRequest, UpdateUser, User, UserResponse, UserState } from "../../app/models";
import { api } from "../../app/axios-instance";
import { call, put, takeLatest } from "redux-saga/effects";
import { RootState } from "../../app/store";
import router from "../../app/router";

const initialState: UserState = {
    isAuthorized: false,
    isLoading: false,
}
// register action
export const registerAsync = createAction<NewUser>('user/registerAsync');

const tryRegister = async (data: NewUser): Promise<NewUserRequest> => {
    return (await api.post<NewUserRequest>('/users', { user: data })).data;
}

function* registerSaga(action: PayloadAction<NewUser>) {
    yield put(setIsLoading(true));
    try {
        const response: UserResponse = yield call(tryRegister, action.payload);
        yield put(register(response.user));
        // yield put(setIsLoading(false));
        // router.navigate('/login');
        yield put(login(response.user));
        yield put(setIsLoading(false));        
    }
    catch (error) {
        console.error('register', error)
        yield put(setIsLoading(false));
    }
}
// login action
export const loginAsync = createAction<LoginUser>('user/loginAsync');

const tryLogin = async (data: LoginUser): Promise<UserResponse> => {
    return (await api.post<UserResponse>('/users/login', { user: data })).data;
}

function* loginSaga(action: PayloadAction<LoginUser>) {
    yield put(setIsLoading(true));
    try {
        const response: UserResponse = yield call(tryLogin, action.payload);
        localStorage.setItem('token', response.user.token);
        yield put(login(response.user));
        yield put(setIsLoading(false));
        router.navigate('/');
    }
    catch (error) {
        console.log('login', error)
        yield put(setIsLoading(false));

    }
}
//logout
export const getLogOut = createAction('user/getLogOut');

function* logoutSaga() {
    try {
        yield put(setIsLoading(true));
        yield put(logout());
        localStorage.removeItem('token');
        yield put(setIsLoading(false));
        router.navigate('/login')
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('logoutSaga', error);

    }
}
// update user
export const updateUserAsync = createAction<UpdateUser>('user/updateUserAsync')

const tryUpdateUser = async (user: UpdateUser): Promise<UserResponse> => {
    return (await api.put<UserResponse>('/user', { user })).data;
}

function* updateUserSaga(action: PayloadAction<UpdateUser>) {
    try {
        yield put(setIsLoading(true));
        const response: UserResponse = yield call(tryUpdateUser, action.payload);
        yield put(update(response.user));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('updateUserSaga', error);
    }
}

// get current user action
export const getCurrentUserAsync = createAction('user/getCurrentUserAsync');

const getCurrentUser = async (): Promise<UserResponse> => {
    return (await api.get<UserResponse>('/user')).data;
}

function* getCurrentUserSaga() {
    try {
        const response: UserResponse = yield call(getCurrentUser);
        yield put(login(response.user));
    }
    catch (error) {
        console.error('get current user', error)
    }
}

// load token action
export const loadCurrentToken = createAction('user/loadCurrentToken');

function* loadCurrentTokenSaga() {
    const token = localStorage.getItem('token');
    if (!!token && token !== '') {
        yield put(loadToken(token!));
        yield call(getCurrentUserSaga);
    }
}

export function* userSaga() {
    yield takeLatest(loadCurrentToken, loadCurrentTokenSaga);
    yield takeLatest(getCurrentUserAsync, getCurrentUserSaga);
    yield takeLatest(registerAsync, registerSaga);
    yield takeLatest(loginAsync, loginSaga);
    yield takeLatest(getLogOut, logoutSaga);
    yield takeLatest(updateUserAsync, updateUserSaga);
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload };
        },
        loadToken: (_, action: PayloadAction<string>) => {
            return {
                isAuthorized: true,
                isLoading: false,
                token: action.payload,
                user: undefined,
            }
        },
        register: (state, action: PayloadAction<User>) => {            
            return { ...state, isLoading: false };
        },
        login: (_, action: PayloadAction<User>) => {
            const user = action.payload;
            return {
                isAuthorized: true,
                isLoading: false,
                token: user.token,
                user: user,
            }
        },
        logout: () => {
            return {
                isLoading: false,
                isAuthorized: false,
            }
        },
        update: (state, action: PayloadAction<User>) => {
            const user = action.payload;

            return {
                ...state,
                user: user,
            }
        }
    }

});

export const { setIsLoading, loadToken, register, login, logout, update } = userSlice.actions;

export const selectIsAuthorized = (state: RootState) => state.user.isAuthorized;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer