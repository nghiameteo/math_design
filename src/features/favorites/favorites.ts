import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Article, SingleArticleResponse } from "../../app/models";
import { api } from "../../app/axios-instance";
import { call, put, takeLatest } from "redux-saga/effects";

export interface FollowState {
    isLoading: boolean;
    article?: Article;
}
const initialState: FollowState = {
    isLoading: false,
    article: undefined,
}

export interface ToggleFavorites {
    slug: string;
    isFavorites: boolean;
}

export const toggleFavoriteArticleAsync = createAction<ToggleFavorites>('favorite/favoriteArticleAsync')

const toggleFavoriteArticle = async (params: ToggleFavorites | undefined): Promise<SingleArticleResponse> => {
    const url = `/articles/${params?.slug}/favorite`;
    if (!params?.isFavorites) {
        return (await api.post<SingleArticleResponse>(url, { slug: params?.slug })).data;
    }
    else {
        return (await api.delete<SingleArticleResponse>(url)).data;
    }
}

function* toggleFavoriteSaga(action:PayloadAction<ToggleFavorites | undefined>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleArticleResponse = yield call(toggleFavoriteArticle, action.payload)
        yield put(loadFavorite(response))
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('toggleFavoriteSaga', error);        
    }
}

export function* favoriteSaga() {
    yield takeLatest(toggleFavoriteArticleAsync, toggleFavoriteSaga)
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload };
        },
        loadFavorite: (state, action: PayloadAction<SingleArticleResponse>) => {
            return {
                ...state,
                article: action.payload.article,
            }
        }
    }
})

export const {setIsLoading, loadFavorite} = favoriteSlice.actions;

export default favoriteSlice.reducer
