import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Comment, ConvertDate, User } from "../../app/models";
import styles from "./CommentDetail.module.css";

interface OwnProps {
  comment: Comment;
  currentUser?: User;
  onDelete: (id: number) => void;
}

const CommentDetail = ({ comment, currentUser, onDelete }: OwnProps) => {
  return (
    <Card className={styles.cardContainer} sx={{ boxShadow: "none" }}>
      <CardHeader
        avatar={<Avatar alt="Avatar" src={`${comment.author.image}`} />}
        action={
          currentUser?.username == comment.author.username && (
            <IconButton onClick={() => onDelete(comment.id)} size="small">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
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
        <Typography variant="body2" className={styles.description}>
          {comment.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentDetail;
