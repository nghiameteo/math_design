import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLogOut, loadCurrentToken, selectIsAuthorized, selectToken, selectUser } from "../user/userSlice";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { User } from "../../app/models";
import { Grid, styled } from "@mui/material";
import { Row } from "antd";

const pages = ['Home', 'Sign In', 'Sign Up', 'New Article'];
const pagesAuthorize = ['Home', 'Sign In', 'Sign Up', 'New Article'];
const pagesNonAuthorize = ['Home', 'New Article'];
const settings = ['Profile', 'Update Profile', 'Sign Out'];


interface SettingUrl {
    title: string | ((user: User | undefined) => string | undefined);
    link: string | ((user: User | undefined) => string | undefined);
    requireAuthorize: boolean;
}
const pageLinks: SettingUrl[] = [
    {
        title: "Home",
        link: '/link',
        requireAuthorize: false
    },
    {
        title: "Sign In",
        link: '/signin',
        requireAuthorize: false
    },
    {
        title: "Home",
        link: '/link',
        requireAuthorize: false
    },
];

const settingUrls: SettingUrl[] = [
    {

        title: "Home",
        link: '/link',
        requireAuthorize: false
    },
    {
        // profile
        title: (user: User | undefined) => user && user.username,
        link: (user: User | undefined) => user && `/user/${user.username}`,
        requireAuthorize: true
    }
];

const Layout = () => {
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(selectIsAuthorized);
    const currentUser = useAppSelector(selectUser);
    const currentTokenAvailable = useAppSelector(selectToken);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!currentTokenAvailable && !!token) {
            dispatch(loadCurrentToken());
        }
    }, [currentTokenAvailable, token])

    //nav
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
        backgroundColor: '#009900',
        margin: 5,
        color: '#ffffff',
        '&hover': {
            backgroundColor: '#3399',
        },
    })
    const onLogOut = () => {
        dispatch(getLogOut());
    }
    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            sx={{ minHeight: '100vh' }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* icon */}
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#5CB85C',
                                textDecoration: 'none',
                            }}
                        >
                            Conduit
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            {page == 'Home' && <Link to="/">{page}</Link>}
                                            {page == 'Sign In' && !isAuthorized && <Link to="/login">{page}</Link>}
                                            {page == 'Sign Up' && !isAuthorized && <Link to="/register">{page}</Link>}
                                            {page == 'New Article' && isAuthorized && <Link to="/editor">{page}</Link>}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                            {pages.map((page) => (

                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 0, color: 'white', display: 'block' }}
                                >
                                    {page == 'Home' && <MyButton href="/" variant="contained">{page}</MyButton>}
                                    {page == 'Sign In' && !isAuthorized && <MyButton href="/login" variant="contained">{page}</MyButton>}
                                    {page == 'Sign Up' && !isAuthorized && <MyButton href="/register" variant="contained">{page}</MyButton>}
                                    {page == 'New Article' && isAuthorized && <MyButton variant="contained"><Link to="/editor">{page}</Link></MyButton>}
                                </Button>
                            ))}
                        </Box>

                        {isAuthorized &&
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Avatar" src={`${currentUser?.image}`} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">
                                                {setting == 'Profile' && isAuthorized &&
                                                    <MyButton>
                                                        <Link to={`/${currentUser?.username}`}>
                                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                <Avatar alt="Avatar" src={`${currentUser?.image}`} />
                                                                <Typography textAlign="center">{currentUser?.username}</Typography>
                                                            </Box>
                                                        </Link>
                                                    </MyButton>
                                                }
                                                {setting == 'Update Profile' && isAuthorized && <MyButton><Link to="/settings">{setting}</Link></MyButton>}
                                                {setting == 'Sign Out' && isAuthorized && <MyButton><Button onClick={onLogOut}>{setting}</Button></MyButton>}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Box >
                <Container maxWidth="xl">
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"                        
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Conduit
                    </Typography>
                </Container>
            </Box>
            <Outlet />
        </Grid>
    )
}
export default Layout