import { Box, Container, Grid, Typography, styled } from "@mui/material";
import Tabs, { TabsProps } from "antd/es/tabs";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ArticleList from "../../page/article-list/ArticleList";
import {
  fetchArticlesAsync,
  selectMultiArticle,
} from "../article/multiArticleSlice";
import { clearTag, selectSingleTag } from "../filter/filterSlice";
import TagFilter from "../tag/tag-filter";
import { selectIsAuthorized } from "../user/userSlice";
import styles from "./Feed.module.css";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
}));
const Feed = () => {
  const dispatch = useAppDispatch();
  const feedData = useAppSelector(selectMultiArticle);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const { articles, total, page, pageSize, isLoading } = feedData;
  const tag = useAppSelector(selectSingleTag);
  const [activeTab, setActiveTab] = useState<string>("global-feed");

  const tabItems: TabsProps["items"] = [
    {
      key: "yourFeed",
      label: "Your Feed",
    },
    {
      key: "globalFeed",
      label: "Global Feed",
    },
  ];

  const tabList = useMemo(() => {
    if (!!tag && tag !== "") {
      return [
        ...tabItems,
        {
          key: "tagFeed",
          label: tag,
        },
      ];
    }
    return tabItems;
  }, [tabItems, tag]);

  const onFilterChange = (page: number, pageSize: number) => {
    if (activeTab === "tagFeed") {
      dispatch(fetchArticlesAsync({ tag, page }));
    } else if (activeTab === "yourFeed") {
      dispatch(fetchArticlesAsync({ page, onlyMyFeed: true }));
    } else {
      dispatch(fetchArticlesAsync({ page }));
    }
  };

  useEffect(() => {
    if (!!tag && tag !== "tagFeed") {
      setActiveTab("tagFeed");
      onFilterChange(page, 1);
    }
  }, [tag]);

  useEffect(() => {
    onFilterChange(page, 1);
  }, [activeTab]);

  useEffect(() => {
    dispatch(clearTag());
    if (isAuthorized) {
      setActiveTab("yourFeed");
    } else {
      setActiveTab("globalFeed");
    }
  }, [isAuthorized]);

  return (
    <>
      <Box className={styles.boxHeader}>
        <Container maxWidth="xl" className={styles.containerHeader}>
          <Typography className={styles.typoFirst}>conduit</Typography>
          <Typography className={styles.typoSecond}>
            A place to share your knowledge.
          </Typography>
        </Container>
      </Box>
      <Grid
        container
        spacing={0}
        sx={{
          mx: "auto",
          ms: "auto",
          maxWidth: "xl",
          display: "flex",
          gridAutoFlow: "column",
        }}
      >
        <Grid xs={8} sx={{ display: { xs: "none", sm: "block" } }} item>
          <Item>
            <Tabs
              activeKey={activeTab}
              items={tabList}
              onChange={(key) => setActiveTab(key)}
            />
            {isLoading && <>Loading...</>}
            {!isLoading && total > 0 && (
              <ArticleList
                articles={articles}
                total={total}
                page={page}
                pageSize={pageSize}
                onPageChange={onFilterChange}
              />
            )}
          </Item>
        </Grid>
        <Grid xs={12} sx={{ display: { xs: "block", sm: "none" } }} item>
          <Item>
            <Tabs
              activeKey={activeTab}
              items={tabList}
              onChange={(key) => setActiveTab(key)}
            />
            {isLoading && <>Loading...</>}
            {!isLoading && total > 0 && (
              <ArticleList
                articles={articles}
                total={total}
                page={page}
                pageSize={pageSize}
                onPageChange={onFilterChange}
              />
            )}
          </Item>
        </Grid>

        <Grid
          xs={4}
          item
          sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center" }}
        >
          <Item>
            <TagFilter />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
export default Feed;
