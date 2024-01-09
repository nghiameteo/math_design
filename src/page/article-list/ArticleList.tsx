import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useState } from "react";
import { Article } from "../../app/models";
import ArticleItem2 from "../article-item/ArticleItem2";
import styles from "./ArticleList.module.css";

interface OwnProps {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

const ArticleList = ({
  articles,
  total,
  page,
  pageSize,
  onPageChange,
}: OwnProps) => {
  const count: number = Math.floor(total / pageSize + 1);
  const [changePage, setChangePage] = useState(page + 1);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
    setTimeout(() => {
      console.log("value", value);
      console.log("page", page);
    }, 3000);
  };

  return (
    <>
      {articles.map((article) => (
        <ArticleItem2 key={article.slug} article={article} />
      ))}
      {count > 1 && (
        <Pagination
          className={styles.paginationLayout}
          variant="outlined"
          shape="rounded"
          hideNextButton
          hidePrevButton
          siblingCount={count}
          count={count}
          defaultPage={1}
          page={page + 1}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              color="primary"
              className={
                item.page == changePage
                  ? styles.paginationItemActive
                  : styles.paginationItemNonActive
              }
            />
          )}
        />
      )}
    </>
  );
};
export default ArticleList;
