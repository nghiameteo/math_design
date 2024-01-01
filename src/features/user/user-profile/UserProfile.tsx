import type { TabsProps } from "antd";
import { Col, Row, Tabs } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArticleList from "../../../page/article-list/ArticleList";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchArticlesAsync,
  selectMultiArticle,
} from "../../article/multiArticleSlice";
import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import styles from "./UserProfile.module.css";

interface OwnProps {
  tab: string;
}
const UserProfile = ({ tab }: OwnProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const articlesData = useAppSelector(selectMultiArticle);
  const { articles, total, page, pageSize, isLoading } = articlesData;

  const tabList: TabsProps["items"] = [
    {
      key: "articles",
      label: "My Articles",
    },
    {
      key: "favorites",
      label: "Favorites Articles",
      children: <Link to={`/${username}/favorites`} />,
    },
  ];
  const setActiveTab = function (key: string): void {
    if (key === tab) return;

    if (key === "favorites") {
      navigate(`/${username}/favorites`);
    } else {
      navigate(`/${username}`);
    }
  };
  const onFilterChange = (
    page: number,
    pageSize: number | undefined = undefined
  ) => {
    if (tab === "articles") {
      dispatch(fetchArticlesAsync({ page, author: username }));
    } else if (tab === "favorites") {
      dispatch(fetchArticlesAsync({ page, favorited: username }));
    }
  };
  useEffect(() => {
    onFilterChange(1);
  }, [tab]);

  return (
    <Box className={styles.box}>
      {/* <Row>
                <Col span={18} push={9}>
                    <Tabs activeKey={tab} items={tabList} onChange={key => setActiveTab(key)} />
                    <ArticleList
                        articles={articles}
                        total={total}
                        page={page}
                        pageSize={pageSize}
                        onPageChange={onFilterChange} />
                </Col>
            </Row> */}

      <Grid className={styles.gridContainer} container spacing={0} sx={{ mx: "auto", ms: "auto" }} >
        <Grid xs item></Grid>
        <Grid xs={8} item>
          <Tabs
            activeKey={tab}
            items={tabList}
            onChange={(key) => setActiveTab(key)}
          />
          <ArticleList
            articles={articles}
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={onFilterChange}
          />
        </Grid>
        <Grid xs item></Grid>
      </Grid>
    </Box>
  );
};
export default UserProfile;
