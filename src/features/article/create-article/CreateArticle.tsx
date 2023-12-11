import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import EditArticle from "../../../page/edit-article/EditArticle";
import { selectIsAuthorized } from "../../user/userSlice";
import { NewArticle } from "../../../app/models";
import { addArticleAsync, selectIsLoadingArticle } from "../singleArticleSlice";



const CreateArticleFeature = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoadingArticle)
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const onSubmit = async (data: NewArticle) => {
        dispatch(addArticleAsync(data));
    }
    
    useEffect(() => {
        if (!isAuthorized) {
          navigate('/login');
        }
      }, []);

    return <EditArticle onSubmit={onSubmit} isLoading={isLoading} />
}
export default CreateArticleFeature