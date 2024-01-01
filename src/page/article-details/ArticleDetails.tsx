import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { Article, ConvertDate, User } from "../../app/models";
import TagList from "../tag-list/TagList";
import styles from "./ArticleDetails.module.css";

interface OwnProps {
  article: Article;
  currenUser?: User;
  isAuthorized?: boolean;
  onDeleteArticle: (slug: string) => void;
  onFavoriteArticle: (slug: string, isFavorites: boolean) => void;
  onFollowUser: (username: string, isFollowing: boolean) => void;
}

const ArticleDetails = ({
  article,
  currenUser,
  isAuthorized,
  onDeleteArticle,
  onFavoriteArticle,
  onFollowUser,
}: OwnProps) => {
  const navigate = useNavigate();
  const renderLink = () => {
    if (!isAuthorized) {
      return (
        <Container>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate("/register")}
            sx={{
              textTransform: "none",
              color: "lightgrey",
              borderColor: "grey",
            }}
          >
            {article.author.following == true ? "- Unfollow" : "+ Follow"}{" "}
            {article.author.username}
          </Button>
          <Button
            color="success"
            size="small"
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{ textTransform: "none" }}
          >
            {article.favorited ? (
              <>
                <FavoriteIcon /> UnFavorite
              </>
            ) : (
              <>
                <FavoriteBorderIcon /> Favorite
              </>
            )}
            ({article.favoritesCount})
          </Button>
        </Container>
      );
    } else if (currenUser?.username == article.author.username) {
      return (
        <Container>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/editor/${article.slug}`)}
            sx={{
              textTransform: "none",
              color: "lightgrey",
              borderColor: "grey",
            }}
          >
            Edit Article
          </Button>
          <Button
            color="success"
            size="small"
            variant="outlined"
            onClick={() => onDeleteArticle(article.slug)}
            sx={{ textTransform: "none" }}
          >
            Delete article
          </Button>
        </Container>
      );
    } else {
      return (
        <Container>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              onFollowUser(article.author.username, article.author.following)
            }
            sx={{
              textTransform: "none",
              color: "lightgrey",
              borderColor: "grey",
            }}
          >
            {article.author.following == true ? "- Unfollow" : "+ Follow"}{" "}
            {article.author.username}
          </Button>
          <Button
            color="success"
            size="small"
            variant="outlined"
            onClick={() => onFavoriteArticle(article.slug, article.favorited)}
            sx={{ textTransform: "none" }}
          >
            {article.favorited ? (
              <>
                <FavoriteIcon /> UnFavorite
              </>
            ) : (
              <>
                <FavoriteBorderIcon /> Favorite
              </>
            )}
            ({article.favoritesCount})
          </Button>
        </Container>
      );
    }
  };

  return (
    <Box className={styles.boxHeader}>
      <Box className={styles.boxContainerHeader}>
        <Container className={styles.containerHeader} maxWidth="xl">
          <Typography variant="h4">{article.title}</Typography>
          <Grid
            container
            wrap="nowrap"
            spacing={1}
            sx={{ color: "white", my: 0, justifyContent: "flex start" }}
          >
            <Grid item>
              <Link to={`/${article.author.username}`}>
                <Avatar alt="Avatar" src={`${article.author.image}`} />
              </Link>
            </Grid>
            <Grid
              item
              xs="auto"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Link
                className={styles.linkUsername}
                to={`/${article.author.username}`}
              >
                {article.author.username}
              </Link>
              <Typography variant="caption" display="block" gutterBottom>
                {ConvertDate(article.createdAt)}
              </Typography>
            </Grid>
            <Grid item>{renderLink()}</Grid>
          </Grid>
        </Container>
      </Box>

      <Container className={styles.containerFooter} maxWidth="xl">
        <Box className={styles.boxFooter}>
          <Typography variant="h6" gutterBottom>
            {article.body}
          </Typography>
          <TagList tags={article.tagList} />
        </Box>
      </Container>
    </Box>
  );
};
export default ArticleDetails;
