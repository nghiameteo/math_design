import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { FilterState, Tag, TagsResponse } from "../../app/models";
import { api } from "../../app/axios-instance";
import { call, put, takeLatest } from "redux-saga/effects";
import { RootState } from "../../app/store";

const initialState: FilterState = {
    isLoading: false,
    tag: undefined,
    tags: [],
}

export const getTagsAsync = createAction('filter/getTagsAsync');
const tryGetTags = async (): Promise<TagsResponse> => {
    return (await api.get<TagsResponse>('/tags')).data;
}

function* tagsSaga() {
    try {
        yield put(setIsLoading(true));
        const response: TagsResponse = yield call(tryGetTags);
        yield put(loadTags(response));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log(tagsSaga, error);
    }
}

export function* filterSaga() {
    yield takeLatest(getTagsAsync, tagsSaga)
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload };
        },
        loadTags: (state, action: PayloadAction<TagsResponse>) => {
            return {
                ...state,
                tags: action.payload.tags
            }
        },
        searchTag: (state, action: PayloadAction<Tag>) => {
            return {
                ...state,
                tag: action.payload.tag
            }
        },
        clearTag: (state) => {
            return {
                ...state,
                tag: undefined,
            }
        }
    }
});

export const { setIsLoading, loadTags, searchTag, clearTag } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
export const selectMultiTag = (state: RootState) => state.filter.tags;
export const selectSingleTag = (state: RootState) => state.filter.tag;

export default filterSlice.reducer;
