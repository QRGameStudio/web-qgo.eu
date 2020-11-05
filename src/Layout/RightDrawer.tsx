import React, { useState } from "react";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { Translate, Brightness4, Cached, LibraryBooks, CropFree } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import T from "../Utils/translate/translator";
import { useHistory } from "react-router-dom";
import packageJson from "../../package.json";
import ColorSelector from "./ColorSelector";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  theme: "dark" | "light";
  changeAppTheme: (theme: "dark" | "light") => void;
  changeThemeColor: (color: string) => void;
}

const useStyles = makeStyles({
  list: {
    width: 240,
  },
  languageDialog: {
    width: "50vw",
  },
});

export default function RightDrawer(props: IProps) {
  const classes = useStyles();
  const [nestedListOpen, setNestedListOpen] = useState(false);
  const history = useHistory();

  const colors = [
    "#ff1744",
    "#d500f9",
    "#651fff",
    "#3d5afe",
    "#2979ff",
    "#00b0ff",
    "#00e676",
    "#76ff03",
    "#c6ff00",
    "#ffea00",
    "#ff9100",
    "#ff3d00",
  ];

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
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <CropFree />
          </ListItemIcon>
          <ListItemText primary={T.ScanAndPlay} />
        </ListItem>
        <ListItem button onClick={() => history.push("/Collection")}>
          <ListItemIcon>
            <LibraryBooks />
          </ListItemIcon>
          <ListItemText primary={T.Collection} />
        </ListItem>
      </List>
      <br />
      <hr style={{ width: "95%" }} />
      <br />

      <ListItem button onClick={() => setNestedListOpen(true)} className="py-0">
        <ListItemIcon>
          <Translate />
        </ListItemIcon>
        <ListItemText primary={T.Language} secondary={T._Language} />
      </ListItem>
      <Dialog maxWidth="lg" onClose={() => setNestedListOpen(false)} open={nestedListOpen}>
        <DialogTitle>{T.Language}</DialogTitle>
        <List className={classes.languageDialog} component="div" disablePadding>
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
      </Dialog>
      <ListItem button onClick={() => serviceWorkerUnregistration()}>
        <ListItemIcon>
          <Cached />
        </ListItemIcon>
        <ListItemText primary={T.DeleteCache} />
      </ListItem>

      <List className={classes.list} style={{ flexGrow: 1 }}>
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

        <ListItem>
          <Grid container>
            {colors.map((c) => (
              <Grid item key={c} xs={2}>
                <ColorSelector color={c} selectColor={() => props.changeThemeColor(c)} />
              </Grid>
            ))}
          </Grid>
        </ListItem>
      </List>
      <div className="mx-auto" style={{ cursor: "pointer" }} onClick={() => window.open("https://qrgamestudio.com/", "blank")}>
        <img src="/img/qrLogo.png" style={{ width: "100px", marginLeft: "70px" }} className="mt-3" alt="qrLogo" />
        <br />
        <br />
        <Typography variant="body2" style={{ marginLeft: "16px" }}>
          {T.DevelopedBy} QR Games Studio
          <br />
          {T.Version}: {packageJson.version}
          <br />
          <br />
        </Typography>
      </div>
    </SwipeableDrawer>
  );
}
