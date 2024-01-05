import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import { Article, DelArticleParams, FavoritesArticleParams, NewArticle, Profile, ProfileResponse, SingleArticleResponse, SingleArticleState, UpdateArticleParams, FollowUserParams } from "../../app/models";
import { RootState } from "../../app/store";
import router from "../../app/router";
import { api } from "../../app/axios-instance";

const initialState: SingleArticleState = {
    isLoading: false,
    article: undefined,
}

//load single article follow slug
export const fetchArticleAsync = createAction<string>('article/fetchArticleAsync');

const fetchArticle = async (slug: string): Promise<SingleArticleResponse> => {
    return (await api.get<SingleArticleResponse>(`/articles/${slug}`, {})).data;
}

function* fetchArticleSaga(action: PayloadAction<string>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleArticleResponse = yield call(fetchArticle, action.payload);
        yield put(load(response.article));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('fetchArticleSaga', error);
    }
}

//create article
export const addArticleAsync = createAction<NewArticle>('article/addArticleAsync');

const tryAddArticleAsync = async (data: NewArticle): Promise<SingleArticleResponse> => {
    return (await api.post<SingleArticleResponse>('/articles', { article: data })).data;
}

const buildArticleLink = (article: Article) => {
    return `/article/${article.slug}`;
}

function* addArticleSaga(action: PayloadAction<NewArticle>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleArticleResponse = yield call(tryAddArticleAsync, action.payload);
        yield put(load(response.article));
        yield put(setIsLoading(false));
        const articleLink = buildArticleLink(response.article);
        router.navigate(articleLink);
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('addArticleSaga Error', error);
    }
}

//update article
export const updateArticleAsync = createAction<UpdateArticleParams>('article/updateArticleAsync');

export const tryUpdateArticle = async (data: UpdateArticleParams): Promise<SingleArticleResponse> => {
    console.log(data.slug);
    console.log(data);
    return (await api.put<SingleArticleResponse>(`/articles/${data.slug}`, data)).data;
}

function* updateArticleSaga(action: PayloadAction<UpdateArticleParams>) {
    try {
        yield put(setIsLoading(true));
        console.log(action.payload);

        const response: SingleArticleResponse = yield call(tryUpdateArticle, action.payload);
        yield put(load(response.article));
        yield put(setIsLoading(false));
        const articleLink = buildArticleLink(response.article);
        router.navigate(articleLink);
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('updateArticleSaga', error);
    }
}

// del article
export const delArticleAsync = createAction<DelArticleParams>('article/delArticleAsync');
const tryDelArticle = async (params: DelArticleParams): Promise<SingleArticleResponse> => {
    return (await api.delete<SingleArticleResponse>(`/articles/${params.slug}`)).data;
}
function* delArticleSaga(action: PayloadAction<DelArticleParams>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleArticleResponse = yield call(tryDelArticle, action.payload);
        yield put(load(response.article))
        yield put(setIsLoading(false));
        router.navigate('/');
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('delArticleSaga', error);
    }
}
// toggle favorite
export const toggleFavoritesArticleAsync = createAction<FavoritesArticleParams>('article/toggleFavoritesArticleAsync');
const toggleFavorites = async (params: FavoritesArticleParams): Promise<SingleArticleResponse> => {
    const url = `/articles/${params?.slug}/favorite`;
    if (!params?.isFavorites) {
        return (await api.post<SingleArticleResponse>(url, { slug: params?.slug })).data;
    }
    else {
        return (await api.delete<SingleArticleResponse>(url)).data;
    }
}
function* toggleFavoritesSaga(action: PayloadAction<FavoritesArticleParams>) {
    try {
        const response: SingleArticleResponse = yield call(toggleFavorites, action.payload)
        yield put(toggle(response.article));
    }
    catch (error) {
        console.log('toggleFavoritesSaga', error);
    }
}
//toggle follow inside article detail
export const toggleFollowArticleUserAsync = createAction<FollowUserParams>('article/toggleFollowArticleUserAsync');
const toggleFollowArticleUser = async (params: FollowUserParams): Promise<Profile> => {
    const url = `/profiles/${params.username}/follow`;
    if (!params.isFollowing) {
        return (await api.post<Profile>(url, { username: params?.username })).data;
    }
    else {
        return (await api.delete<Profile>(url)).data;
    }
}
function* toggleFollowArticleUserSaga(action: PayloadAction<FollowUserParams>) {
    try {
        yield put(setIsLoading(true));
        const response: ProfileResponse = yield call(toggleFollowArticleUser, action.payload)
        yield put(toggleArticleFollow(response.profile));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('toggleFollowArticleUserSaga', error);
    }
}
// ***single articleSaga
export function* articleSaga() {
    yield takeLatest(fetchArticleAsync, fetchArticleSaga);
    yield takeLatest(addArticleAsync, addArticleSaga);
    yield takeLatest(updateArticleAsync, updateArticleSaga);
    yield takeLatest(delArticleAsync, delArticleSaga);
    yield takeLatest(toggleFavoritesArticleAsync, toggleFavoritesSaga);
    yield takeLatest(toggleFollowArticleUserAsync, toggleFollowArticleUserSaga);
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload, article: action.payload ? undefined : state.article }
        },
        load: (state, action: PayloadAction<Article>) => {
            const article = action.payload;
            return { ...state, article: article, };
        },
        toggle: (state, action: PayloadAction<Article>) => {
            const article = action.payload;
            return { ...state, article: article };
        },
        toggleArticleFollow: (state, action: PayloadAction<Profile>) => {
            const articleAfterChange: Article = {
                ...state.article!,
                author: action.payload,
            };
            return {
                ...state,
                article: articleAfterChange
            };
        },
    }
});

export const { setIsLoading, load, toggle, toggleArticleFollow } = articleSlice.actions;
export const selectArticle = (state: RootState) => state.article.article;
export const selectIsLoadingArticle = (state: RootState) => state.article.isLoading;

export default articleSlice.reducer;
