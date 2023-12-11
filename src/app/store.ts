import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import saga from "./saga";
import userReducer from "../features/user/userSlice";
import articleReducer from "../features/article/singleArticleSlice";
import commentReducer from "../features/commentator/commentatorSlice";
import multiArticleReducer from "../features/article/multiArticleSlice";
import filterReducer from "../features/filter/filterSlice";
import userProfileReducer from '../features/user/user-profile/userProfileSlice';

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer: {
        user: userReducer,
        article: articleReducer,
        comment: commentReducer,
        multiArticle: multiArticleReducer,
        filter: filterReducer,
        userProfile: userProfileReducer,

    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        sagaMiddleware
    ]
});

sagaMiddleware.run(saga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;