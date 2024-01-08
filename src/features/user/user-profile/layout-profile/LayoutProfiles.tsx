import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Container,
  Typography,
  capitalize,
  styled,
} from "@mui/material";
import { useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
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
import { grey } from "@mui/material/colors";

const FollowButton = styled(Button)<ButtonProps>({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "3px 6px",
  border: "1px solid ",
  lineHeight: 1.25,
  backgroundColor: "none",
  borderColor: "#999",
  color: "#999",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#ccc",
    borderColor: "#999",
    color: "white",
    boxShadow: "none",
  },
});

const EditButton = styled(Button)<ButtonProps>({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "3px 6px",
  border: "1px solid ",
  lineHeight: 1.25,
  backgroundColor: "none",
  borderColor: "#5cb85c",
  color: "#5cb85c",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#5cb85c",
    borderColor: "#5cb85c",
    color: "white",
    boxShadow: "none",
  },
});

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
      
        <Box className={styles.boxCoverContainer}>
          <Container maxWidth="xl">
            {/* view when pending loading */}
            {isLoading &&(
              <Box>
                <Box className={styles.boxInformation}>
                  <Avatar
                    alt={username}
                    src={
                      currentUser?.username === username
                        ? currentUser?.image
                        : ""
                    }
                    sx={{ width: 112, height: 112 }}
                  />
                  <Typography variant="h4">{username}</Typography>
                </Box>

                <Box className={styles.boxFlexEnd}>
                  <Link to="" className={styles.linkFixWidth}>
                    <FollowButton
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                    >
                      Follow {username}
                    </FollowButton>
                  </Link>
                </Box>
              </Box>
            )}
            {/* view when loading completed */}
            {!isLoading && !!profile && (
              <Box>
                <Box className={styles.boxInformation}>
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
                      <Link to="/settings" className={styles.linkFixWidth}>
                        <EditButton
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                        >
                          Edit Profile
                        </EditButton>
                      </Link>
                    )}
                  {!!currentUser &&
                    currentUser!.username !== profile!.username && (
                      <FollowButton
                        onClick={() =>
                          onFollowUser(profile!.username, profile!.following)
                        }
                        size="small"
                        variant="outlined"
                        startIcon={
                          profile?.following ? <RemoveIcon /> : <AddIcon />
                        }
                      >
                        {profile?.following ? "Unfollow " : "Follow "}
                        {profile!.username}
                      </FollowButton>
                    )}
                  {!currentUser && (
                    <Link to="/register" className={styles.linkFixWidth}>
                      <FollowButton
                        size="small"
                        variant="outlined"
                        startIcon={<AddIcon />}
                      >
                        Follow {profile?.username}
                      </FollowButton>
                    </Link>
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
