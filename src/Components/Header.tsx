import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { WifiOff, Menu } from "@material-ui/icons";
import React from "react";

interface IProps {
  offline: boolean;
  setRightDrawerOpen: (open: boolean) => void;
}

export default function ({ offline, setRightDrawerOpen }: IProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography style={{ flexGrow: 1 }}>QR Games studio</Typography>
        {offline && (
          <IconButton color="inherit">
            <WifiOff />
          </IconButton>
        )}

        <IconButton edge="end" color="inherit" onClick={() => setRightDrawerOpen(true)}>
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
