import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import MoreIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import ListIcon from "@mui/icons-material/List";
import AlarmIcon from "@mui/icons-material/Alarm";

import "./bottom-navbar.css";
import { SearchTimers } from "../search-timers/search-timers";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -20,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export const BottomNavbar = ({ search, setSearch, handleClickOpen }) => {
  return (
    <AppBar
      position="fixed"
      className="bottom-navbar"
      sx={{ top: "auto", bottom: 0 }}
    >
      <Toolbar className="nav-buttons">
        <IconButton color="inherit" aria-label="open drawer">
          <ListIcon />
        </IconButton>
        <StyledFab color="secondary" aria-label="add">
          <AddIcon onClick={() => handleClickOpen()} />
        </StyledFab>
        <IconButton color="inherit">
          <AlarmIcon />
        </IconButton>
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
        <IconButton color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
