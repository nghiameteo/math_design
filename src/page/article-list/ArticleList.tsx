import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Article } from "../../app/models"
import ArticleItem from "../article-item/ArticleItem";
import { useState } from 'react';
import PaginationItem from '@mui/material/PaginationItem';

interface OwnProps {
    articles: Article[];
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number, pageSize: number) => void;
}
const theme = createTheme({
    palette: {
        primary: {
            main:"#5CB85C",
        }
    },
});

const ArticleList = ({ articles, total, page, pageSize, onPageChange }: OwnProps) => {
    const count: number = Math.floor(total / pageSize + 1);
    const [changePage, setChangePage] = useState(page + 1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setChangePage(value);
    };

    console.log("changePage", changePage);

    return <>
        {articles.map(article => (<ArticleItem key={article.slug} article={article} />))}

        <ThemeProvider theme={theme}>
            <Pagination
                shape="rounded"
                hideNextButton
                hidePrevButton
                color="primary"
                siblingCount={count}
                count={count}
                defaultPage={1}
                page={changePage}
                onChange={handleChange}
                sx={{ color: '#5CB85C', backgroundColor: 'white', justifyContent: 'center' }}
            />
        </ThemeProvider>

        <Pagination
            variant="outlined"
            shape="rounded"
            hideNextButton
            hidePrevButton
            color="primary"
            siblingCount={count}
            count={count}
            defaultPage={1}
            page={changePage}
            onChange={handleChange}
            renderItem={(item) => <PaginationItem {...item}
                color="primary"
                className={(item.page == changePage ? "duc-active" : 'DucTT')}
            />}
        />


    </>
}
export default ArticleList