import React, { useState } from "react";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
  Switch,
} from "@material-ui/core";
import { Translate, ExpandLess, ExpandMore, Brightness4, Cached } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import T from "../Utils/translate/translator";

interface RightDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  theme: string;
  changeAppTheme: (theme: string) => void;
}

const useStyles = makeStyles({
  list: {
    width: 240,
  },
});

export default function RightDrawer(props: RightDrawerProps) {
  const classes = useStyles();
  const [nestedListOpen, setNestedListOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    localStorage.setItem("langCode", lang);
    window.location.reload();
  };

  //clear site data
  const serviceWorkerUnregistration = () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });

    localStorage.setItem("userID", "");
    window.location.reload();
  };

  return (
    <SwipeableDrawer anchor="right" open={props.open} onClose={() => props.setOpen(false)} onOpen={() => props.setOpen(true)}>
      <List className={classes.list}>
        <ListItem button onClick={() => props.changeAppTheme(props.theme === "dark" ? "light" : "dark")}>
          <ListItemIcon>
            <Brightness4 />
          </ListItemIcon>
          <ListItemText primary={T.DarkMode} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              color="primary"
              checked={props.theme === "dark"}
              onChange={() => props.changeAppTheme(props.theme === "dark" ? "light" : "dark")}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button onClick={() => setNestedListOpen(!nestedListOpen)} className="py-0">
          <ListItemIcon>
            <Translate />
          </ListItemIcon>
          <ListItemText primary={T.Language} secondary={T._Language} />
          {nestedListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={nestedListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              onClick={() => {
                changeLanguage("en");
              }}
            >
              <ListItemText primary="English" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                changeLanguage("de");
              }}
            >
              <ListItemText primary="Deutsch" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                changeLanguage("cs");
              }}
            >
              <ListItemText primary="Čeština" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => serviceWorkerUnregistration()}>
          <ListItemIcon>
            <Cached />
          </ListItemIcon>
          <ListItemText primary={T.DeleteCache} />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}
