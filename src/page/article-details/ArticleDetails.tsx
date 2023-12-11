import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { Article, ConvertDate, User } from "../../app/models";
import TagList from "../tag-list/TagList";

interface OwnProps {
    article: Article;
    currenUser?: User;
    isAuthorized?: boolean;
    onDeleteArticle: (slug: string) => void;
    onFavoriteArticle: (slug: string, isFavorites: boolean) => void;
    onFollowUser: (username: string, isFollowing: boolean) => void;
}

const ArticleDetails = ({ article, currenUser, isAuthorized, onDeleteArticle, onFavoriteArticle, onFollowUser }: OwnProps) => {

    const renderLink = () => {
        if (!isAuthorized) {
            return <div>
                <button> <Link to='/register'>Follow {article.author.username}</Link></button>
                <button><Link to='/register'>
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                    {article.favoritesCount}</Link></button>
            </div>
        }
        else if (currenUser?.username == article.author.username) {
            return <div>
                <button><Link to={`/editor/${article.slug}`}>Edit Article</Link></button>
                <button onClick={() => onDeleteArticle(article.slug)}>Delete article</button>
            </div>
        }
        else {
            return <div>
                <button onClick={() => onFollowUser(article.author.username, article.author.following)}>{article.author.following == true ? '- Unfollow' : '+ Follow'} {article.author.username}</button>
                <button onClick={() => onFavoriteArticle(article.slug, article.favorited)}> {article.favorited ? <>UnFavorite <FavoriteIcon></FavoriteIcon></> : <>Favorite <FavoriteBorderIcon></FavoriteBorderIcon></>}{article.favoritesCount}</button>
            </div>
        }
    }

    return <>
        <Box sx={{ m: 1, p: 1 }}>
            <Typography variant="h5" gutterBottom sx={{ m: 1}}>{article.title}</Typography>
            <Grid container wrap="nowrap" spacing={2} sx={{ backgroundColor: 'black', color: 'white', m: 1}}>
                <Grid item>
                    <Link to={`/${article.author.username}`}><Avatar alt="Avatar" src={`${article.author.image}`} /></Link>
                </Grid>
                <Grid item xs='auto' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', textAlign: 'left' }}>
                    <Link to={`/${article.author.username}`}>{article.author.username}</Link>
                    <Typography variant="caption" display="block" gutterBottom>{ConvertDate(article.createdAt)}</Typography>
                </Grid>
                <Grid item>
                    {renderLink()}
                </Grid>
                
            </Grid>
            <Typography variant="body1" gutterBottom sx={{ m: 1, p: 1 }}>{article.body}</Typography>
            <TagList tags={article.tagList} />
        </Box>

        {/* <div>
            <h2>{article.title}</h2>
            <div>
                <div>
                    <img src={article.author.image} alt="no image" />
                </div>
                <div>
                    <Link to={`/${article.author.username}`}>{article.author.username}</Link>
                    <Typography variant="caption" display="block" gutterBottom>{ConvertDate(article.createdAt)}</Typography>
                </div>
                {renderLink()}
            </div>
            <div>
                <p>{article.body}</p>
            </div>
            <div>
                <TagList tags={article.tagList} />
            </div>
        </div> */}

    </>
}
export default ArticleDetails