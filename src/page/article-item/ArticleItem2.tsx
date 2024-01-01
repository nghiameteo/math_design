import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Article, ConvertDate } from "../../app/models";
import { toggleMultiArticleFavoritesArticleAsync } from "../../features/article/multiArticleSlice";
import { selectIsAuthorized } from "../../features/user/userSlice";
import TagList from "../tag-list/TagList";
import styles from "./ArticleItem2.module.css";

interface OwnProps {
  article: Article;
}

const ArticleItem = ({ article }: OwnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const onFavoriteArticle = () => {
    if (isAuthorized) {
      dispatch(
        toggleMultiArticleFavoritesArticleAsync({
          article,
          isFavorites: article.favorited,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <Card className={styles.container}>
      <CardHeader //
        avatar={<Avatar alt="Avatar" src={`${article.author.image}`} />}
        action={
          <Button
            variant="outlined"
            onClick={() => onFavoriteArticle()}
            startIcon={
              article.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
            }
            color="success"
            size="small"
          >
            {article.favoritesCount}
          </Button>
        }
        title={
          <Link to={`/${article.author.username}`} className={styles.link}>
            <Typography
              variant="body1"
              color="success"
              className={styles.author}
            >
              {article.author.username}
            </Typography>
          </Link>
        }
        subheader={
          <Typography variant="caption" className={styles.date}>
            {ConvertDate(article.createdAt)}
          </Typography>
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" className={styles.title}>
          {article.title}
        </Typography>
        <Typography variant="body2" className={styles.description}>
          {article.description.length > 150
            ? `${article.description.substring(0, 150)}...`
            : article.description}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Link to={`/article/${article.slug}`} className={styles.link}>
          <Typography variant="caption" className={styles.readMore}>
            Read more...
          </Typography>
        </Link>
        <Box className={styles.tagList}>
          <TagList tags={article.tagList} />
        </Box>
      </CardActions>
      <Divider className={styles.divider} />
    </Card>
  );
};

export default ArticleItem;
