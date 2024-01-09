import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Article, FavoritesArticleParams, MultiArticlePagingParams, MultiArticlePagingState, MultipleArticleResponse, SingleArticleResponse } from "../../app/models";
import { api } from "../../app/axios-instance";
import { call, put, takeLatest } from "redux-saga/effects";
import { RootState } from "../../app/store";

const initialState: MultiArticlePagingState = {
    isLoading: false,
    articles: [],
    total: 0,
    page: 0,
    pageSize: 10,
}

// get multi article
export const fetchArticlesAsync = createAction<MultiArticlePagingParams>('multiArticle/fetchArticlesAsync');

const fetchArticles = async (params: MultiArticlePagingParams | undefined): Promise<MultipleArticleResponse> => {
    const url = params?.onlyMyFeed ? `/articles/feed` : `/articles`;
    const limit = params?.pageSize || 10;
    console.log('param.page', params?.page);    
    const offset = (params?.page || 1) > 1 ? ((params!.page! - 1) * limit) : 0;
    console.log('offset' ,offset);
    
    const queryParams = {
        tag: params?.tag,
        author: params?.author,
        favorited: params?.favorited,
        offset: offset,
        limit: limit,
    }
    return (await api.get<MultipleArticleResponse>(url, { params: queryParams })).data;
}

function* fetchArticlesSaga(action: PayloadAction<MultiArticlePagingParams | undefined>) {
    try {
        yield put(setIsLoading(true));
        yield put(changePage(Number(action.payload?.page) - 1));        
        const response: MultipleArticleResponse = yield call(fetchArticles, action.payload);
        console.log('response', response);        
        yield put(loadMultiArticle(response));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('fetchArticlesSaga', error);
    }
}

// toggle multi favorites
export const toggleMultiArticleFavoritesArticleAsync = createAction<FavoritesArticleParams>('multiArticle/toggleFavoritesArticleAsync');

const toggleMultiArticleFavorites = async (params: FavoritesArticleParams): Promise<SingleArticleResponse> => {
    const url = `/articles/${params?.article.slug}/favorite`;
    if (!params?.isFavorites) {
        return (await api.post<SingleArticleResponse>(url, { slug: params?.article.slug })).data;
    }
    else {
        return (await api.delete<SingleArticleResponse>(url)).data;
    }
}

function* toggleMultiArticleFavoritesSaga(action: PayloadAction<FavoritesArticleParams>) {
    try {
        var newFavorited = !action.payload.article.favorited;
        yield put(changeFavorite({
            ...action.payload.article,
            favorited: newFavorited,
            favoritesCount: action.payload.article.favoritesCount + (newFavorited ? 1 : -1)
        }));
        const response: SingleArticleResponse = yield call(toggleMultiArticleFavorites, action.payload);
        yield put(changeFavorite(response.article));
    }
    catch (error) {
        console.error('toggleMultiArticleFavoritesSaga', error);
    }
}

export function* multiArticleSaga() {
    yield takeLatest(fetchArticlesAsync, fetchArticlesSaga);
    yield takeLatest(toggleMultiArticleFavoritesArticleAsync, toggleMultiArticleFavoritesSaga);
}

export const multiArticleSlice = createSlice({
    name: 'multiArticle',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload };
        },
        loadMultiArticle: (state, action: PayloadAction<MultipleArticleResponse>) => {
            return {
                ...state,
                articles: action.payload.articles,
                total: action.payload.articlesCount,
            }
        },
        changeFavorite: (state, action: PayloadAction<Article>) => {
            const articleChangeFavorite = action.payload;
            const indexArticleChangeFavorite = state.articles.findIndex((article) => article.slug == articleChangeFavorite.slug);
            state.articles.fill(articleChangeFavorite, indexArticleChangeFavorite, indexArticleChangeFavorite + 1);
        },
        changeFavoriteV2: (state, action: PayloadAction<Article>) => {
            const articleChangeFavorite = action.payload;
            return {
                ...state,
                articles: state.articles.map(item => item.slug === articleChangeFavorite.slug ? articleChangeFavorite : item),
            }
        },
        changePage: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                page: action.payload,
            }
        },
    }
})

export const { setIsLoading, loadMultiArticle, changeFavorite, changePage } = multiArticleSlice.actions;

export const selectMultiArticle = (state: RootState) => state.multiArticle;

export default multiArticleSlice.reducer;