import { createBrowserRouter } from "react-router-dom";

import Layout from "../features/layout";
import Feed from "../features/feed";
import SignIn from "../features/user/sign-in";
import SignUp from "../features/user/sign-up";
import Settings from "../features/setting";
import CreateArticle from "../features/article/create-article";
import UpdateArticleFeature from "../features/article/update-article";
import ArticleDetailsFeatures from "../features/article/article-details";
import LayoutProfile from "../features/user/user-profile/layout-profile";
import UserProfile from "../features/user/user-profile";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Feed />,
            },
            // login
            {
                path: "/login",
                element: <SignIn />,
            },
            {
                path: "/register",
                element: <SignUp />,
            },
            // users       
            {
                path: "/settings",
                element: <Settings />,
            },
            // articles 
            {
                path: "/editor",
                element: <CreateArticle />,
            },
            {
                path: "/editor/:slug",
                element: <UpdateArticleFeature />,
            },
            {
                path: "/article/:slug",
                element: <ArticleDetailsFeatures />,
            },
            {
                path: "/:username",
                element: <LayoutProfile />,
                children: [
                    {
                        path: "",
                        element: <UserProfile tab="articles" />,
                    },
                    {
                        path: "favorites",
                        element: <UserProfile tab="favorites" />,
                    },

                ],
            },
            {
                path: "*",
                element: <h1>Not found</h1>,
            },
        ],
    },
]);
export default router;