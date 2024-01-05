import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectUser } from "../../userSlice";
import {
  getUserProfileAsync,
  selectIsLoadingProfile,
  selectUserProfile,
  toggleFollowUserProfileAsync,
} from "../userProfileSlice";
import styles from "./LayoutProfiles.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

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
        <Box>
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
          <Button>
            <Link to="/settings">Edit Profile</Link> {profile.username}
          </Button>
        </Box>
      );
    } else if (
      !!profile &&
      !!currentUser &&
      currentUser.username !== profile.username
    ) {
      return (
        <Box>
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
          </Box>
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
          <Button>
            <Link to="/register">Follow</Link> {profile?.username}
          </Button>
        </Box>
      );
    }
  };
  const renderProFile2 = () => {
    return;
    {
      !!profile && (
        <>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                alt="Big Avatar"
                src={profile!.image}
                sx={{ width: 112, height: 112 }}
              />
              <Typography variant="h4" gutterBottom>
                {profile!.username}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {profile!.bio}
              </Typography>
            </Box>
            {!!currentUser && currentUser!.username == profile!.username && (
              <Button>
                <Link to="/settings">Edit Profile</Link> {profile!.username}
              </Button>
            )}
            {!!currentUser && currentUser!.username !== profile!.username && (
              <Button
                onClick={() =>
                  onFollowUser(profile!.username, profile!.following)
                }
                sx={{
                  width: "80%",
                  textTransform: "none",
                  color: "grey",
                  justifyContent: "flex-end",
                }}
              >
                {profile?.following == true ? "- Unfollow " : "+ Follow "}
                {profile!.username}
              </Button>
            )}
            {!currentUser && (
              <Button>
                <Link to="/register">Follow</Link> {profile?.username}
              </Button>
            )}
          </Box>
          ;
        </>
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
      <Box sx={{ width: "100%", backgroundColor: "#f3f3f3", padding: "1rem" }}>
        <Container maxWidth="xl">
          {!isLoading && !!profile && (
            <Box>
              <Box className={styles.boxInfomation}>
                <Avatar
                  alt="Big Avatar"
                  src={profile!.image}
                  sx={{ width: 112, height: 112 }}
                />
                <Typography variant="h4">{profile!.username}</Typography>
                <Typography variant="subtitle1">{profile!.bio}</Typography>
              </Box>
              <Box className={styles.boxFlexEnd}>
                {!!currentUser &&
                  currentUser!.username == profile!.username && (
                    <Button className={styles.button}>
                      <Link to="/settings" className={styles.link}>
                        <EditIcon fontSize="small" /> Edit Profile
                      </Link>
                    </Button>
                  )}
                {!!currentUser &&
                  currentUser!.username !== profile!.username && (
                    <Button
                      className={styles.button}
                      onClick={() =>
                        onFollowUser(profile!.username, profile!.following)
                      }
                    >
                      {profile?.following == true ? (
                        <>
                          <RemoveIcon /> Unfollow{" "}
                        </>
                      ) : (
                        <>
                          <AddIcon /> Follow{" "}
                        </>
                      )}
                      {profile!.username}
                    </Button>
                  )}
                {!currentUser && (
                  <Button className={styles.button}>
                    <Link to="/register" className={styles.link}>
                      <AddIcon /> Follow {profile?.username}
                    </Link>
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </Container>
      </Box>
      <Outlet />
    </Box>
  );
};
export default LayoutProfile;
