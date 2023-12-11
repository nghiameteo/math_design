import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { FollowUserParams, Profile, ProfileResponse, UserProfileState } from "../../../app/models";
import { api } from "../../../app/axios-instance";
import { RootState } from "../../../app/store";
import { put, call, takeLatest } from "redux-saga/effects";


const initialState: UserProfileState = {
    isLoading: false,
}


// get user profile
export const getUserProfileAsync = createAction<string>('user-profile/getProfileAsync');

const getUserProfile = async (username: string): Promise<ProfileResponse> => {
    return (await api.get<ProfileResponse>(`/profiles/${username}`)).data;
}
function* getUserProfileSaga(action: PayloadAction<string>) {
    try {
        yield put(setIsLoading(true));
        const response: ProfileResponse = yield call(getUserProfile, action.payload);
        yield put(profileLoad(response.profile));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('getUserProfileSaga',error);
        
    }
}

// toggle follow inside profile
export const toggleFollowUserProfileAsync = createAction<FollowUserParams>('user-profile/toggleFollowUserProfileAsync');

const toggleFollowUser = async (params: FollowUserParams):Promise<Profile> => {
    const url = `/profiles/${params.username}/follow`;
    if (!params.isFollowing) {
        return (await api.post<Profile>(url, {username: params?.username})).data;
    }
    else {
        return (await api.delete<Profile>(url)).data;
    }
}

function* toggleFollowUserSaga (action: PayloadAction<FollowUserParams>){
    try {        
        const response: ProfileResponse = yield call(toggleFollowUser, action.payload)
        yield put(toggleFollow(response.profile));        
    }
    catch (error) {
        console.log('toggleFollowUserSaga', error);        
    }
}

export function* userProfileSaga() {
    yield takeLatest(getUserProfileAsync, getUserProfileSaga);
    yield takeLatest(toggleFollowUserProfileAsync, toggleFollowUserSaga);
}

export const userProfileSlice = createSlice({
    name: 'user-profile',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            }
        },
        profileLoad: (_, action: PayloadAction<Profile>) => {   
            const profile = action.payload;         
            return {
                isLoading: false,
                profile,
            };
        },
        toggleFollow: (state, action: PayloadAction<Profile>) => {
            return {
                ...state,
                profile: action.payload, 
            }
        },
    }
})

export const { setIsLoading, profileLoad, toggleFollow } = userProfileSlice.actions;

export const selectIsLoadingProfile = (state: RootState) => state.userProfile.isLoading;
export const selectUserProfile = (state: RootState) => state.userProfile.profile;

export default userProfileSlice.reducer