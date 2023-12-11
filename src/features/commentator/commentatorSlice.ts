import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import { api } from "../../app/axios-instance";
import { MultipleCommentResponse, Comment, SingleCommentResponse, CommentState, AddCommentParams, DelCommentParams } from "../../app/models";
import { RootState } from "../../app/store";

const initialState: CommentState = {
    isLoading: false,
    comments: [],
}

// load cmt
export const fetchCommentsAsync = createAction<string>('comment/fetchCommentsAsync');

const fetchComments = async (slug: string): Promise<MultipleCommentResponse> => {
    return (await api.get<MultipleCommentResponse>(`/articles/${slug}/comments`)).data;
}

function* fetchCommentsSaga(action: PayloadAction<string>) {
    try {
        yield put(setIsLoading(true));
        const response: MultipleCommentResponse = yield call(fetchComments, action.payload);
        yield put(load(response.comments));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('fetchCommentsSaga', error);
    }
}
// add comment
export const addCommentAsync = createAction<AddCommentParams>('comment/addCommentAsync');

const addComment = async (params: AddCommentParams) => {
    return (await api.post<SingleCommentResponse>(`/articles/${params.slug}/comments`, { comment: params.comment })).data;
}

function* addCommentSaga(action: PayloadAction<AddCommentParams>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleCommentResponse = yield call(addComment, action.payload);
        yield put(add(response.comment));
        yield put(setIsLoading(false));
        // resetForm({});
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('addCommentSaga', error);
    }
}
//del comment
export const delCommentAsync = createAction<DelCommentParams>('comment/delCommentAsync');

const delComment = async (params: DelCommentParams) => {
    return (await api.delete<SingleCommentResponse>(`/articles/${params.slug}/comments/${params.id}`)).data;
}

function* delCommentSaga(action: PayloadAction<DelCommentParams>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleCommentResponse = yield call(delComment, action.payload);
        yield put(del(action.payload.id));
        yield put(setIsLoading(false));
    }
    catch (error) {
        yield put(setIsLoading(false));
        console.log('delCommentSaga', error);
    }
}

export function* commentSaga() {
    yield takeLatest(fetchCommentsAsync, fetchCommentsSaga);
    yield takeLatest(addCommentAsync, addCommentSaga);
    yield takeLatest(delCommentAsync, delCommentSaga)
}

export const commentatorSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload }
        },
        load: (state, action: PayloadAction<Comment[]>) => {
            const comments = action.payload;
            return {
                ...state,
                comments: comments
            }
        },
        add: (state, action: PayloadAction<Comment>) => {
            return {
                ...state,
                comments: [action.payload, ...state.comments]
            }
        },
        del: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.id !== action.payload)
            }
        }
    }
})

export const { setIsLoading, load, add, del } = commentatorSlice.actions
export const selectIsLoadingComment = (state: RootState) => state.comment.isLoading
export const selectComment = (state: RootState) => state.comment.comments

export default commentatorSlice.reducer;