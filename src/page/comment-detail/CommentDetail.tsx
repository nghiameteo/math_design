import { useState } from "react";
import { Comment, ConvertDate } from "../../app/models";
import { Avatar, Card, Skeleton, Switch } from "antd";
import { Link } from "react-router-dom";

interface OwnProps {    
    comment: Comment;
}

const CommentDetail = ({comment}: OwnProps) => {
    const {Meta} = Card;
    const [loading, setLoading] = useState<boolean>(false)
    const onChange = (checked: boolean) => {
        setLoading(!checked);
    }

    return (
        <>
        <Switch checked={!loading} onChange={onChange} />
            <Card style={{width: 200, marginTop: 10}} loading={loading}>
                <Meta
                avatar={<Avatar src={comment.author.image}/>}
                title={<Link to={`/${comment.author.username}`}>{comment.author.username}</Link>}
                description={ConvertDate(comment.createdAt)}                
                />
                <Skeleton
                loading={loading}
                active
                >
                    <Meta description={comment.body}/>
                </Skeleton>
            </Card>
        
        </>
    )
}

export default CommentDetail