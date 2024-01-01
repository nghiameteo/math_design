import AdbIcon from "@mui/icons-material/Adb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
    BottomNavigation,
    BottomNavigationAction,
    Grid,
    styled,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "../../app/models";
import {
    getLogOut,
    loadCurrentToken,
    selectIsAuthorized,
    selectToken,
    selectUser,
} from "../user/userSlice";
import styles from "./Layout.module.css";

const pages = ["Home", "Sign In", "Sign Up", "New Article"];
const settings = ["Profile", "Update Profile", "Sign Out"];

interface SettingUrl {
  title: string | ((user: User) => string);
  link: string | ((user: User) => string);
}
interface totalSettingUrl {
  pageLinks: SettingUrl[];
  pageLinksAuthorize: SettingUrl[];
  profileLink: SettingUrl[];
}
const totalPageLink: totalSettingUrl = {
  pageLinks: [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Sign In",
      link: "/login",
    },
    {
      title: "Sign Up",
      link: "/register",
    },
  ],
  pageLinksAuthorize: [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "New Article",
      link: "/editor",
    },
    {
      title: "Settings",
      link: "/settings",
    },
  ],
  profileLink: [
    {
      title: (user) => user.username,
      link: (user) => `/user/${user.username}`,
    },
    {
      title: (_) => "Update Profile",
      link: (_) => "/settings",
    },
    {
      title: (_) => "Sign Out",
      link: "/",
    },
  ],
};

const Layout = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const currentUser = useAppSelector(selectUser);
  const currentTokenAvailable = useAppSelector(selectToken);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentTokenAvailable && !!token) {
      dispatch(loadCurrentToken());
    }
  }, [currentTokenAvailable, token]);

  //nav
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const MyButton = styled(Button)({
    backgroundColor: "#009900",
    margin: 5,
    color: "#ffffff",
    "&hover": {
      backgroundColor: "blue",
      color: "black",
    },
  });
  const onLogOut = () => {
    dispatch(getLogOut());
  };
  return (
    <Grid container spacing={0} direction="column" alignItems="center">
      <AppBar position="static" className={styles.appBar}>
        <Container maxWidth="xl" className={styles.container}>
          <Toolbar disableGutters className={styles.toolBar}>
            <Typography
              className={styles.typoLeft}
              onClick={() => navigate("/")}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              conduit
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {(!isAuthorized
                  ? totalPageLink.pageLinks
                  : totalPageLink.pageLinksAuthorize
                ).map((page) => (
                  <MenuItem key={`${page.title}`} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link onClick={() => navigate("/")}>{page.title}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              className={styles.typoLeft}
              onClick={() => navigate("/")}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              conduit
            </Typography>

            <Box
              className={styles.boxRight}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {(!isAuthorized
                ? totalPageLink.pageLinks
                : totalPageLink.pageLinksAuthorize
              ).map((page) => {
                const title: string =
                  typeof page.title === "string"
                    ? page.title
                    : page.title(currentUser!);
                const link: string =
                  typeof page.link === "string"
                    ? page.link
                    : currentUser
                    ? page.link(currentUser)
                    : "";
                return (
                  <Button className={styles.button} key={title}>
                    <Link
                      underline="none"
                      textTransform="none"
                      color="black"
                      onClick={() => navigate(link)}
                    >
                      {title}
                    </Link>
                  </Button>
                );
              })}
            </Box>
            {!!currentUser && (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                onClick={() => navigate(`/${currentUser?.username}`)}
                title={currentUser?.username}
              >
                <Avatar
                  className={styles.avatar}
                  alt="Avatar"
                  src={`${currentUser?.image}`}
                />
                <Typography color="red" textAlign="center">
                  {currentUser?.username.length > 6
                    ? `${currentUser?.username.substring(0, 5)}...`
                    : currentUser?.username}
                </Typography>
              </Box>
            )}
            {/* {isAuthorized && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={`${currentUser?.image}`} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting == "Profile" && isAuthorized && (
                          <MyButton>
                            <Link
                              underline="none"
                              color="white"
                              onClick={() =>
                                navigate(`/${currentUser?.username}`)
                              }
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar
                                  alt="Avatar"
                                  src={`${currentUser?.image}`}
                                />
                                <Typography textAlign="center">
                                  {currentUser?.username}
                                </Typography>
                              </Box>
                            </Link>
                          </MyButton>
                        )}
                        {setting == "Update Profile" && isAuthorized && (
                          <MyButton>
                            <Link
                              underline="none"
                              color="white"
                              onClick={() => navigate("/settings")}
                            >
                              {setting}
                            </Link>
                          </MyButton>
                        )}
                        {setting == "Sign Out" && isAuthorized && (
                          <MyButton onClick={onLogOut}>{setting}</MyButton>
                        )}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )} */}
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Box className={styles.boxHeader}>
        <Container maxWidth="xl" className={styles.containerHeader}>
          <Typography className={styles.typoFirst}>conduit</Typography>
          <Typography className={styles.typoSecond}>
            A place to share your knowledge.
          </Typography>
        </Container>
      </Box> */}
      <Outlet />
      <Box sx={{ minHeight: 56 }}></Box>

      <Link
        href="#"
        underline="hover"
        color={"white"}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 56,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#37474f",
          color: "white",
          size: "1.5rem",
        }}
      >
        <GitHubIcon />
        Fork on GitHub
      </Link>

      <BottomNavigation
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "lightgreen",
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
          onClick={() => navigate(`/`)}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
          onClick={() => navigate(`/${currentUser?.username}/favorites`)}
        />
        <BottomNavigationAction
          label="Follow"
          value="follow"
          icon={<FollowTheSignsIcon />}
          onClick={() => navigate(`/`)}
        />
        <BottomNavigationAction
          label="Setting"
          value="setting"
          icon={<SettingsIcon />}
          onClick={() => navigate(`/settings`)}
        />
      </BottomNavigation>
    </Grid>
  );
};
export default Layout;
