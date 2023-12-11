import { all } from "redux-saga/effects";
import { userSaga } from "../features/user/userSlice";
import { articleSaga } from "../features/article/singleArticleSlice";
import { commentSaga } from "../features/commentator/commentatorSlice";
import { multiArticleSaga } from "../features/article/multiArticleSlice";
import { filterSaga } from "../features/filter/filterSlice";
import { userProfileSaga } from "../features/user/user-profile/userProfileSlice";

export default function* rootSaga() {
    yield all([
        userSaga(),
        articleSaga(),
        commentSaga(),
        multiArticleSaga(),
        filterSaga(),
        userProfileSaga(),
    ]);
}