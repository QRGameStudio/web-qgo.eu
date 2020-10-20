import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { WifiOff, Menu } from "@material-ui/icons";

interface IProps {
  offline: boolean;
  setRightDrawerOpen: (open: boolean) => void;
}

export default function ({ offline, setRightDrawerOpen }: IProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography style={{ flexGrow: 1 }}>QR Games Player</Typography>
        {offline && (
          <IconButton color="inherit">
            <WifiOff />
          </IconButton>
        )}
        <IconButton edge="end" color="inherit" onClick={() => setRightDrawerOpen(true)} aria-label="show menu">
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
