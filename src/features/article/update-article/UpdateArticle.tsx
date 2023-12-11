import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import EditArticle from "../../../page/edit-article/EditArticle";
import { selectIsAuthorized } from "../../user/userSlice";
import { selectArticle, selectIsLoadingArticle, updateArticleAsync } from "../singleArticleSlice";
import { NewArticle } from "../../../app/models";

const UpdateArticleFeature = () => {
    const {slug} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoadingArticle)
    const isAuthorized = useAppSelector(selectIsAuthorized);
    const currentArticle = useAppSelector(selectArticle);

    const onSubmit = async (data: NewArticle) => {
        dispatch(updateArticleAsync({slug, article: data}));
    }

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/');
        }
    });

    return <>
        {!!currentArticle && <EditArticle onSubmit={onSubmit} isLoading={isLoading} article={currentArticle}/>}
    </>
}
export default UpdateArticleFeature