import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Comment, ConvertDate, User } from "../../app/models";
import styles from "./CommentDetail.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

interface OwnProps {
  comment: Comment;
  currentUser?: User;
  onDelete: (id: number) => void;
}

const CommentDetail = ({ comment, currentUser, onDelete }: OwnProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  return (
    <>
      {/* <Switch checked={!loading} onChange={onChange} />
      <Card sx={{ width: 200, marginTop: 10 }} loading={loading}>
        <Meta
          avatar={<Avatar src={comment.author.image} />}
          title={
            <Link to={`/${comment.author.username}`}>
              {comment.author.username}
            </Link>
          }
          description={ConvertDate(comment.createdAt)}
        />
        <Skeleton loading={loading} active>
          <Card description={comment.body} />
        </Skeleton>
      </Card> */}

      <Card className={styles.container}>
        <CardHeader //
          avatar={<Avatar alt="Avatar" src={`${comment.author.image}`} />}
          action={
            currentUser?.username == comment.author.username && (
              <Button
                variant="outlined"
                onClick={() => onDelete(comment.id)}
                startIcon={<DeleteIcon />}
                color="success"
                size="small"
                sx={{ color:'black'}}
              >Delete</Button>
            )
          }
          title={
            <Link to={`/${comment.author.username}`} className={styles.link}>
              <Typography
                variant="body1"
                color="success"
                className={styles.author}
              >
                {comment.author.username}
              </Typography>
            </Link>
          }
          subheader={
            <Typography variant="caption" className={styles.date}>
              {ConvertDate(comment.createdAt)}
            </Typography>
          }
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            className={styles.description}
          >
            {comment.body}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CommentDetail;
