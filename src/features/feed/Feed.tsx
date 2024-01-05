import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
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

interface TabConfig {
  value: string;
  label: string;
}

const TabKeys = {
  yourFeed: "yourFeed",
  globalFeed: "globalFeed",
  tagFeed: "tagFeed",
};

const Feed = () => {
  const dispatch = useAppDispatch();
  const feedData = useAppSelector(selectMultiArticle);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const { articles, total, page, pageSize, isLoading } = feedData;
  const tag = useAppSelector(selectSingleTag);
  const [activeTab, setActiveTab] = useState<string>(TabKeys.globalFeed);

  const tabItems = useMemo((): TabConfig[] => {
    const tabs: TabConfig[] = [];
    if (isAuthorized) {
      tabs.push({
        value: TabKeys.yourFeed,
        label: "Your Feed",
      });
    }
    tabs.push({
      value: TabKeys.globalFeed,
      label: "Global Feed",
    });
    if (!!tag && tag !== "" && activeTab == TabKeys.tagFeed) {
      tabs.push({
        value: TabKeys.tagFeed,
        label: `#${tag}`,
      });
    }
    return tabs;
  }, [isAuthorized, tag, activeTab]);

  const onFilterChange = (page: number) => {
    if (activeTab === TabKeys.tagFeed) {
      dispatch(fetchArticlesAsync({ page, tag }));
    } else if (activeTab === TabKeys.yourFeed) {
      dispatch(fetchArticlesAsync({ page, onlyMyFeed: true }));
    } else {
      dispatch(fetchArticlesAsync({ page }));
    }
  };

  useEffect(() => {
    if (!!tag && tag !== TabKeys.tagFeed) {
      setActiveTab(TabKeys.tagFeed);
      onFilterChange(1);
    }
  }, [tag]);

  useEffect(() => {
    onFilterChange(1);
  }, [activeTab]);

  useEffect(() => {
    dispatch(clearTag());
    if (isAuthorized) {
      setActiveTab(TabKeys.yourFeed);
    } else {
      setActiveTab(TabKeys.globalFeed);
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
          <Tabs
            value={activeTab}
            onChange={(_, key) => setActiveTab(key)}
            TabIndicatorProps={{ className: styles.activeTabIndicator }}
          >
            {tabItems.map((item) => (
              <Tab
                {...item}
                className={item.value === activeTab ? styles.activeTab : ""}
              />
            ))}
          </Tabs>
          {isLoading && <Typography>Loading...</Typography>}
          {!isLoading && total > 0 && (
            <ArticleList
              articles={articles}
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={onFilterChange}
            />
          )}
        </Grid>
        <Grid xs={4} sx={{ display: { xs: "none", sm: "block" } }}>
          <TagFilter />
        </Grid>
      </Grid>
    </>
  );
};
export default Feed;
