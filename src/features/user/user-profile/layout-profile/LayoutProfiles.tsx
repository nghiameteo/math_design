import { Link, Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getUserProfileAsync,
  selectIsLoadingProfile,
  selectUserProfile,
  toggleFollowUserProfileAsync,
} from "../userProfileSlice";
import { selectUser } from "../../userSlice";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import styles from "./LayoutProfiles.module.css";

const LayoutProfile = () => {
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const isLoading = useAppSelector(selectIsLoadingProfile);
  const profile = useAppSelector(selectUserProfile);
  const currentUser = useAppSelector(selectUser);

  const onFollowUser = (username: string, isFollowing: boolean) => {
    dispatch(
      toggleFollowUserProfileAsync({
        username: username,
        isFollowing: isFollowing,
      })
    );
  };

  const renderProFile = () => {
    if (
      !!profile &&
      !!currentUser &&
      currentUser.username == profile.username
    ) {
      return (
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              alt="Big Avatar"
              src={profile.image}
              sx={{ width: 112, height: 112 }}
            />
            <Typography variant="h4" gutterBottom>
              {profile.username}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {profile.bio}
            </Typography>
          </Box>
          <button>
            <Link to="/settings">Edit Profile</Link> {profile.username}
          </button>
        </div>
      );
    } else if (
      !!profile &&
      !!currentUser &&
      currentUser.username !== profile.username
    ) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            flexShrink: 1,
          }}
        >
          <Avatar
            alt="Big Avatar"
            src={profile.image}
            sx={{ width: 112, height: 112 }}
          />
          <Typography variant="h4" gutterBottom>
            {profile.username}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {profile.bio}
          </Typography>
          <Button
            onClick={() => onFollowUser(profile.username, profile.following)}
            sx={{
              width: "80%",
              textTransform: "none",
              color: "grey",
              justifyContent: "flex-end",
            }}
          >
            {profile?.following == true ? "- Unfollow " : "+ Follow "}
            {profile.username}
          </Button>
        </Box>
      );
    } else {
      return (
        <Box>
          <Box>
            <Avatar
              alt="Big Avatar"
              src={profile?.image}
              sx={{ width: 112, height: 112 }}
            />
            <Typography variant="h5" gutterBottom>
              {profile?.username}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {profile?.bio}
            </Typography>
          </Box>
          <button>
            <Link to="/register">Follow</Link> {profile?.username}
          </button>
        </Box>
      );
    }
  };

  useEffect(() => {
    if (!!username && username !== "") {
      dispatch(getUserProfileAsync(username));
    }
  }, [username]);

  return (
    <Box className={styles.box}>
      <Box sx={{width: '100%', backgroundColor: "#f3f3f3", padding: "1rem"}}>
        <Container
          maxWidth="xl"          
        >
          {!isLoading && !!profile && renderProFile()}
        </Container>
      </Box>
      <Outlet />
    </Box>
  );
};
export default LayoutProfile;
