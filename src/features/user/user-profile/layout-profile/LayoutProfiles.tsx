import { Link, Outlet, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { getUserProfileAsync, selectIsLoadingProfile, selectUserProfile, toggleFollowUserProfileAsync } from "../userProfileSlice";
import { selectUser } from "../../userSlice";
import { useEffect } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";

const LayoutProfile = () => {
    const dispatch = useAppDispatch();
    const { username } = useParams();
    const isLoading = useAppSelector(selectIsLoadingProfile);
    const profile = useAppSelector(selectUserProfile);
    const currentUser = useAppSelector(selectUser);

    const onFollowUser = (username: string, isFollowing: boolean) => {
        dispatch(toggleFollowUserProfileAsync({ username: username, isFollowing: isFollowing }));
    }

    const renderProFile = () => {
        if (!!profile && !!currentUser && (currentUser.username) == profile.username) {
            return <div>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Avatar
                        alt="Big Avatar"
                        src={profile.image}
                        sx={{ width: 112, height: 112 }}
                    />
                    <Typography variant="h5" gutterBottom>{profile.username}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{profile.bio}</Typography>
                </Box>
                <button><Link to='/settings'>Edit Profile</Link> {profile.username}</button>
            </div>
        } else if (!!profile && !!currentUser && (currentUser.username) !== profile.username) {
            return <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                    alt="Big Avatar"
                    src={profile.image}
                    sx={{ width: 112, height: 112 }}
                />
                <Typography variant="h5" gutterBottom>{profile.username}</Typography>
                <Typography variant="subtitle1" gutterBottom>{profile.bio}</Typography>
                <button onClick={() => onFollowUser(profile.username, profile.following)}>{profile?.following == true ? 'Unfollow' : 'Follow'} {profile.username}</button>
            </Box>
        } else {
            return <div>
                <div>
                    <Avatar
                        alt="Big Avatar"
                        src={profile?.image}
                        sx={{ width: 112, height: 112 }}
                    />
                    <Typography variant="h5" gutterBottom>{profile?.username}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{profile?.bio}</Typography>
                </div>
                <button><Link to='/register'>Follow</Link> {profile?.username}</button>
            </div>
        }
    }

    useEffect(() => {
        if (!!username && username !== '') {
            dispatch(getUserProfileAsync(username));
        }
    }, [username])

    return <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <Grid sx={{ mx: 'auto' }}>
                {!isLoading && !!profile && renderProFile()}
            </Grid>

            <Outlet />
        </Box>

    </>
}
export default LayoutProfile