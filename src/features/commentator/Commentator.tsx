import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CommentItem from "../../page/comment-item/CommentItem";
import { selectIsAuthorized, selectUser } from "../user/userSlice";
import { addCommentAsync, delCommentAsync, fetchCommentsAsync, selectComment, selectIsLoadingComment } from "./commentatorSlice";
import { NewComment } from "../../app/models";
import { Box } from "@mui/material";

export interface OwnProps {
    slug: string;
}
const Commentator = ({ slug }: OwnProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsLoadingComment);
    const comments = useAppSelector(selectComment);
    const isAuthorized = useAppSelector(selectIsAuthorized);
    const currentUser = useAppSelector(selectUser);

    useEffect(()=> {
        if(slug) {
            dispatch(fetchCommentsAsync(slug));
        }
    },[slug])

    const onSubmit = (data: NewComment) => {
        dispatch(addCommentAsync({slug, comment: data}));
     }
    const onDelete = (id: number) => { 
        dispatch(delCommentAsync({slug, id: id}));
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>            
            {!isAuthorized && <div><Link to="/login">Sign In</Link> or <Link to="/register">Sign Up</Link> to add comment</div>}
            <CommentItem
                isLoading={isLoading}
                comments={comments}
                currentUser={currentUser}
                onSubmit={onSubmit}
                onDelete={onDelete}
            />
        </Box>
    )
}
export default Commentator