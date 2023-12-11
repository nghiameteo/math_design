import { Pagination } from "antd";
import { Article } from "../../app/models"
import ArticleItem from "../article-item/ArticleItem";

interface OwnProps {
    articles: Article[];
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number, pageSize: number) => void;
}
const ArticleList = ({ articles, total, page, pageSize, onPageChange }: OwnProps) => {

    return <>
        {articles.map(article => (<ArticleItem key={article.slug} article={article} />))}
        <Pagination total={total} current={page} pageSize={pageSize} onChange={onPageChange} />

    </>
}
export default ArticleList