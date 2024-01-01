import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Article, ConvertDate } from "../../app/models";
import { toggleMultiArticleFavoritesArticleAsync } from "../../features/article/multiArticleSlice";
import { selectIsAuthorized } from "../../features/user/userSlice";
import TagList from "../tag-list/TagList";
import styles from "./ArticleItem.module.css";

interface OwnProps {
  article: Article;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

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
    <div>
      <Box className={styles.box}>
        <StyledPaper
          className={styles.stylePaper}
          sx={{ my: 1, mx: "auto", p: 0, minWidth: 300, maxWidth: "none", boxShadow: 'none' }}
        >
          <Grid
            container
            wrap="nowrap"
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid
              item
              xs
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <ListItem onClick={() => navigate(`/${article.author.username}`)}>
                <ListItemAvatar sx={{ "&:hover": { cursor: "pointer" } }}>
                  <Avatar alt="Avatar" src={`${article.author.image}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link
                      underline="hover"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#3d8b3d",
                        "&:hover": { cursor: "pointer" },
                      }}
                    >
                      {article.author.username}
                    </Link>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ color: "#bbb" }}
                    >
                      {ConvertDate(article.createdAt)}
                    </Typography>
                  }
                />
              </ListItem>
            </Grid>
            <Grid>
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
            </Grid>
          </Grid>
          <Card
            sx={{
              maxWidth: "xl",
              pb: "1rem",
              paddingLeft: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              textAlign: "left",
              boxShadow: 'none'
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                {article.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "1rem", fontWeight: 300, color: "#999" }}
              >
                {article.description.length > 150
                  ? `${article.description.substring(0, 150)}...`
                  : article.description}
              </Typography>
            </CardContent>
            <Grid
              className={styles.cardEnd}
              container
              wrap="nowrap"
              spacing={0}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: "0.8rem",
                  fontWeight: 300,
                  color: "#bbb",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/article/${article.slug}`)}
              >
                Read more...
              </Typography>
              <Typography>
                <TagList tags={article.tagList} />
              </Typography>
            </Grid>
          </Card>
        </StyledPaper>
      </Box>
      <Divider />
    </div>
  );
};
export default ArticleItem;
