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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
                <FavoriteIcon fontSize="small" /> Unfavorite
              </>
            ) : (
              <>
                <FavoriteBorderIcon fontSize="small" /> Favorite
              </>
            )}
            ({article.favoritesCount})
          </Button>
        </Container>
      );
    } else if (currenUser?.username == article.author.username) {
      return (
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: ".2rem",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/editor/${article.slug}`)}
            sx={{
              textTransform: "none",
              color: "#c9dae5",
              borderColor: "#28497F",
              "&:hover": {
                color: 'white',
                backgroundColor: "#28497F",
              }
            }}
          >
             <EditIcon fontSize="small"/> Edit Article
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onDeleteArticle(article.slug)}
            sx={{ 
              textTransform: "none",
              color: "#CD4523",
              borderColor: "#CD4523",
              "&:hover": {
                color: 'white',
                backgroundColor: "#CD4523",
                borderColor: "#CD4523",
              }
             }}
          >
            <DeleteIcon fontSize='small'/> Delete article
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
              opacity: "0.8",
              textTransform: "none",
              color: "lightgrey",
              borderColor: "#ccc",
              marginRight: "0.1rem",
              "&:hover": {
                borderColor: "#ccc",
                backgroundColor: "#ccc",
                color: "white",
                opacity: "1",
              },
            }}
          >
            {article.author.following == true ? (
              <>
                <RemoveIcon fontSize="small" /> Unfollow
              </>
            ) : (
              <>
                <AddIcon fontSize="small" /> Follow
              </>
            )}
            {article.author.username}
          </Button>
          <Button
            color="success"
            size="small"
            variant="outlined"
            onClick={() => onFavoriteArticle(article.slug, article.favorited)}
            sx={{
              color: "#5CB85C",
              textTransform: "none",
              borderColor: "#5CB85C",
              "&:hover": {
                borderColor: "#5CB85C",
                backgroundColor: "#5CB85C",
                color: "white",
              },
            }}
          >
            {article.favorited ? (
              <>
                <FavoriteIcon fontSize="small" /> Unfavorite
              </>
            ) : (
              <>
                <FavoriteBorderIcon fontSize="small" /> Favorite
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
            <Grid item>{renderLink()}</Grid>
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
