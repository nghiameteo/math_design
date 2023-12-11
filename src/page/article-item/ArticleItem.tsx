import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Grid, Typography, styled } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Article, ConvertDate } from "../../app/models";
import { toggleMultiArticleFavoritesArticleAsync } from "../../features/article/multiArticleSlice";
import { selectIsAuthorized } from "../../features/user/userSlice";
import TagList from "../tag-list/TagList";

interface OwnProps {
    article: Article;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const ArticleItem = ({ article }: OwnProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuthorized = useAppSelector(selectIsAuthorized);
    const onFavoriteArticle = (slug: string, isFavorites: boolean) => {
        if (isAuthorized) {
            dispatch(toggleMultiArticleFavoritesArticleAsync({ slug: slug, isFavorites: isFavorites }));
        }
        else {
            navigate('/login');
        }
    }
    return <Card>
        {/* <div>
            <div>
                <div>
                    <img src={article.author.image} alt="no image" />
                </div>
            </div>
            <div>
                <Link to={`/${article.author.username}`}>{article.author.username}</Link>
                <p>{article.createdAt}</p>
            </div>
            <div>
                <button onClick={() => onFavoriteArticle(article.slug, article.favorited)}>
                    Heart icon
                    <Link to='/register'>{article.favoritesCount}</Link>
                </button>

            </div>
            <p>{article.title}</p>
            <p>{article.description.length > 150 ? `${(article.description).substring(0, 150)}...` : article.description}</p>
            <Link to={`/article/${article.slug}`}>Read more...</Link>
            <TagList tags={article.tagList} />
        </div> */}
        {/* new */}
        <div>
            {/* <Link to={`/${article.author.username}`}>
                <Box >
                    <Box display="flex" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                        <Box gridColumn="span 4">
                            <Item><Avatar alt="Avatar" src={`${article.author.image}`} /></Item>
                        </Box>
                        <Box gridColumn="span 8">
                            <Item>{article.author.username}</Item>
                            <Item>{article.createdAt}</Item>
                        </Box>
                        <FavoriteIcon></FavoriteIcon>

                    </Box>
                </Box>
            </Link> */}

            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
                {/* <StyledPaper
                    sx={{
                        my: 1,
                        mx: 'auto',
                        p: 2,
                    }}
                >
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>W</Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap>{article.body}</Typography>
                        </Grid>
                    </Grid>
                </StyledPaper> */}

                <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Link to={`/${article.author.username}`}><Avatar alt="Avatar" src={`${article.author.image}`} /></Link>
                        </Grid>
                        <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', textAlign: 'left' }}>
                            <Link to={`/${article.author.username}`}>{article.author.username}</Link>
                            <Typography variant="caption" display="block" gutterBottom>{ConvertDate(article.createdAt)}</Typography>
                        </Grid>
                        <Grid>
                            <button onClick={() => onFavoriteArticle(article.slug, article.favorited)}>
                                {article.favorited ? <FavoriteIcon sx= {{color: '#ff3333'}}></FavoriteIcon> : <FavoriteBorderIcon sx={{color: '#009933'}}></FavoriteBorderIcon>}
                                {article.favoritesCount}
                            </button>
                        </Grid>
                    </Grid>

                    <Grid container wrap="nowrap" spacing={0}>
                        <Grid item xs sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', textAlign: 'left' }}>
                            <Typography variant="h6" gutterBottom>{article.title}</Typography>
                            <Typography variant="body1" gutterBottom>{article.description.length > 150 ? `${(article.description).substring(0, 150)}...` : article.description}</Typography>
                            <Typography variant="body2" gutterBottom>
                                <Link to={`/article/${article.slug}`}>Read more...</Link>
                                <TagList tags={article.tagList} />
                            </Typography>

                        </Grid>
                    </Grid>
                </StyledPaper>
            </Box>
        </div>
    </Card>
}
export default ArticleItem