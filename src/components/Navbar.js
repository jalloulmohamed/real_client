import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Image
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import {
  AiFillFileText,
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  return (
    <Stack mb={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <HorizontalStack alignItems="end"  sx={{ textDecoration: 'none' }}  component={Link}  to={"/"}>
          <Box >
          <img src="https://real-one.vercel.app/logo.svg" alt="Image" width={20} />
          </Box>
          <Typography
            sx={{ display: mobile ? "none" : "block" }}
            variant={navbarWidth ? "h5" : "h5"}
            color="#566376"
          >
            {/* <Link to="/" color="inherit"> */}
              eal
            {/* </Link> */}
          </Typography>
        </HorizontalStack>

        {/* {!navbarWidth && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Search for posts..."
              sx={{ flexGrow: 1, maxWidth: 300 }}
              onChange={handleChange}
              value={search}
            />
          </Box>
        )} */}

        <HorizontalStack>
          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
          )}

          {/* <IconButton component={Link}  to={"/"}>
            <AiFillHome size={20} color="#A5A7B4" />
          </IconButton> */}
          {user ? (
            <>
              <IconButton component={Link} to={"/messenger"}>
                <AiFillMessage size={22} color="#A5A7B4" />
              </IconButton>
              <IconButton onClick={handleLogout}>
                <FiLogOut size={20} color="#A5A7B4" ></FiLogOut>
              </IconButton>
              <IconButton component={Link}  to={"/users/" + username}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
            </>
          ) : (
            <>
              <Button variant="text" sx={{   minWidth: 65  , color: "#FDC04D" ,'&:hover': {backgroundColor: '#fff'}}} href="/login">
                Login
              </Button>
              <Button variant="text" sx={{ minWidth: 80 ,  backgroundColor : "#566376", color: "#FFF", '&:hover': {backgroundColor: '#566376'}}} href="/signup">
                Sign Up
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>
      {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            size="small"
            label="Search for posts..."
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
