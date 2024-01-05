import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { Article, ConvertDate, User } from "../../app/models";
import TagList from "../tag-list/TagList";
import styles from "./ArticleDetails.module.css";

const GreyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: grey[500],
  borderColor: grey[500],
  "&:hover": {
    color: grey[300],
    borderColor: grey[300],
    backgroundColor: grey[500],
  },
}));

const GreenButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: green[500],
  borderColor: green[500],
  "&:hover": {
    color: "white",
    borderColor: green[500],
    backgroundColor: green[500],
  },
}));

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
    return (
      <Container className={styles.buttonContainer}>
        <GreyButton
          onClick={() => {
            isAuthorized
              ? onFollowUser(article.author.username, article.author.following)
              : navigate("/login");
          }}
          color="success"
          size="small"
          variant="outlined"
          startIcon={article.author.following ? <RemoveIcon /> : <AddIcon />}
          className={styles.button}
        >
          {article.author.following == true ? "Unfollow " : "Follow "}
          {article.author.username}
        </GreyButton>
        <GreenButton
          onClick={() => {
            isAuthorized
              ? onFavoriteArticle(article.slug, article.favorited)
              : navigate("/login");
          }}
          color="success"
          size="small"
          variant="outlined"
          startIcon={
            article.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
          }
          className={styles.button}
        >
          {article.author.following == true ? "Unfavorite " : "Favorite "}(
          {article.favoritesCount})
        </GreenButton>
      </Container>
    );
  };

  const renderOwnerLink = () => {
    return (
      <Container className={styles.buttonContainer}>
        <GreenButton
          onClick={() => navigate(`/editor/${article.slug}`)}
          size="small"
          variant="outlined"
          color="success"
          startIcon={<EditIcon />}
          className={styles.button}
        >
          Edit Article
        </GreenButton>
        <Button
          onClick={() => onDeleteArticle(article.slug)}
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          className={styles.button}
        >
          Delete article
        </Button>
      </Container>
    );
  };

  return (
    <Box className={styles.boxHeader}>
      <Box className={styles.boxContainerHeader}>
        <Container className={styles.containerHeader} maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
            }}
          >
            {article.title}
          </Typography>
          <Grid
            container
            wrap="nowrap"
            spacing={1.5}
            sx={{
              color: "white",
              mt: 2,
              justifyContent: "flex start",
              width: "100%",
              gap: "1rem",
            }}
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
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ opacity: "0.8", color: "#bbb" }}
              >
                {ConvertDate(article.createdAt)}
              </Typography>
            </Grid>
            <Grid item>
              {currenUser?.username == article.author.username
                ? renderOwnerLink()
                : renderLink()}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container className={styles.containerFooter} maxWidth="xl">
        <Box className={styles.boxFooter}>
          <Typography variant="h6" gutterBottom>
            {article.body}
          </Typography>
          <Box sx={{ py: "1rem" }}>
            <TagList tags={article.tagList} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default ArticleDetails;
