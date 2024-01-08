import { Link, useNavigate, useParams } from "react-router-dom";

import ArticleList from "../../../page/article-list/ArticleList";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchArticlesAsync,
  selectMultiArticle,
} from "../../article/multiArticleSlice";
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import styles from "./UserProfile.module.css";

interface OwnProps {
  tab: string;
}
interface TabConfig {
  value: string;
  label: string;
  children?: React.ReactElement;
}

// const UserProfile = ({ tab }: OwnProps) => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { username } = useParams();
//   const articlesData = useAppSelector(selectMultiArticle);
//   const { articles, total, page, pageSize, isLoading } = articlesData;

//   // const tabList: TabsProps["items"] = [
//   //   {
//   //     key: "articles",
//   //     label: "My Articles",
//   //   },
//   //   {
//   //     key: "favorites",
//   //     label: "Favorites Articles",
//   //     children: <Link to={`/${username}/favorites`} />,
//   //   },
//   // ];
//   const tabItems: TabConfig[] = [
//     {
//       value: "articles",
//       label: "My Articles",
//     },
//     {
//       value: "favorites",
//       label: "Favorites Articles",
//       children: <Link to={`/${username}/favorites`} />,
//     },
//   ];

//   const setActiveTab = function (key: string): void {
//     if (key === tab) return;

//     if (key === "favorites") {
//       navigate(`/${username}/favorites`);
//     } else {
//       navigate(`/${username}`);
//     }
//   };
//   const onFilterChange = (
//     page: number,
//     pageSize: number | undefined = undefined
//   ) => {
//     if (tab === "articles") {
//       dispatch(fetchArticlesAsync({ page, author: username }));
//     } else if (tab === "favorites") {
//       dispatch(fetchArticlesAsync({ page, favorited: username }));
//     }
//   };
//   useEffect(() => {
//     onFilterChange(1);
//   }, [tab]);

//   return (
//     <Box className={styles.box}>
//       {/* <Row>
//                 <Col span={18} push={9}>
//                     <Tabs activeKey={tab} items={tabList} onChange={key => setActiveTab(key)} />
//                     <ArticleList
//                         articles={articles}
//                         total={total}
//                         page={page}
//                         pageSize={pageSize}
//                         onPageChange={onFilterChange} />
//                 </Col>
//             </Row> */}

//       <Grid
//         className={styles.gridContainer}
//         container
//         spacing={0}
//         sx={{ mx: "auto", ms: "auto" }}
//       >
//         <Grid xs item></Grid>
//         <Grid xs={8} item>
//           {/* <Tabs
//             activeKey={tab}
//             items={tabList}
//             onChange={(key) => setActiveTab(key)}
//           /> */}
//           <ArticleList
//             articles={articles}
//             total={total}
//             page={page}
//             pageSize={pageSize}
//             onPageChange={onFilterChange}
//           />
//         </Grid>
//         <Grid xs item></Grid>
//       </Grid>
//     </Box>
//   );
// };
const UserProfile = ({ tab }: OwnProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const articlesData = useAppSelector(selectMultiArticle);
  const { articles, total, page, pageSize, isLoading } = articlesData;

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    const routeValue = `/${params.username}/${
      newValue === "articles" ? "" : newValue
    }`;
    navigate(routeValue);
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
    <Container
      className={styles.container}
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        flexShrink: 1,
      }}
    >
      <Box className={styles.boxTabs}>
        <Tabs className={styles.tabs} value={tab} 
        TabIndicatorProps={{style: {backgroundColor:'#5CB85C'}}}        
        onChange={handleChange} 
        sx={{
          fontWeight: 400, color: '#aaa',
          "& button.Mui-selected": {fontWeight: 700, color: "#5CB85C", backgroundColor: 'white'},
          "& button:hover": {fontWeight: 700},       
        }}
        >
          <Tab value="articles" label="My Articles" sx={{textTransform: 'none'}}/>
          <Tab value="favorites" label="Favorites Articles" sx={{textTransform: 'none'}} />
        </Tabs>
      </Box>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Box sx={{ width: "90%", justifyContent: "center", ms: "auto" }}>
          {tab === "articles" && (
            <ArticleList
              articles={articles}
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={onFilterChange}
            />
          )}
          {tab === "favorites" && (
            <ArticleList
              articles={articles}
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={onFilterChange}
            />
          )}
        </Box>
      )}
    </Container>
  );
};
export default UserProfile;
