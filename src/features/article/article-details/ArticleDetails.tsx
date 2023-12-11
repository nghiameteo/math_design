import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ArticleDetails from "../../../page/article-details/ArticleDetails"
import { delArticleAsync, fetchArticleAsync, selectArticle, toggleFavoritesArticleAsync, toggleFollowArticleUserAsync } from "../singleArticleSlice";
import { useParams } from "react-router-dom";
import Commentator from "../../commentator";
import { selectIsAuthorized, selectUser } from "../../user/userSlice";

const ArticleDetailsFeatures = () => {
    const article = useAppSelector(selectArticle);
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const currenUser = useAppSelector(selectUser);
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const onDeleteArticle = (slug: string) => {
        dispatch(delArticleAsync({ slug }));
    };

    const onFavoriteArticle = (slug: string, isFavorites: boolean) => {
        dispatch(toggleFavoritesArticleAsync({ slug: slug, isFavorites: isFavorites }));
    }
    const onFollowUser = (username: string, isFollowing: boolean) => {
        dispatch(toggleFollowArticleUserAsync({username: username, isFollowing: isFollowing}));
    }
    useEffect(() => {
        if (slug) {
            dispatch(fetchArticleAsync(slug));
        }
    }, [slug]);

    return <>
        {!!article && <ArticleDetails article={article} currenUser={currenUser} isAuthorized={isAuthorized}onDeleteArticle={onDeleteArticle} onFavoriteArticle={onFavoriteArticle} onFollowUser={onFollowUser}/>}
        {!!article && !!slug && <Commentator slug={slug} />}
        {!article && <>No Article here!</>}
    </>
}
export default ArticleDetailsFeatures