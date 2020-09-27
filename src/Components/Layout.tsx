import React, { useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";

import RightDrawer from "./RightDrawer";
import Footer from "./Footer";
import Header from "./Header";

const themeStoredCode: string = localStorage.getItem("theme") || "light";
const darkTheme: Theme = createMuiTheme({ palette: { type: "dark" } });
const lightTheme: Theme = createMuiTheme({ palette: { type: "light" } });

export default function Layout(props: { children?: React.ReactNode }) {
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [offline, setOffline] = useState(false);
  const [theme, setTheme] = useState(themeStoredCode);

  React.useEffect(() => {
    if (themeStoredCode === "dark") changeAppTheme("dark");

    window.addEventListener("online", () => setOffline(false));
    window.addEventListener("offline", () => setOffline(true));
  }, []);

  const changeAppTheme = (theme: string) => {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";

    if (theme === "dark") {
      document.body.style.backgroundColor = "#212121";
      document.body.style.color = "#fafafa";
    }

    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <div style={{ flexGrow: 1 }}>
        <Header offline={offline} setRightDrawerOpen={setRightDrawerOpen} />
      </div>
      <RightDrawer open={rightDrawerOpen} setOpen={setRightDrawerOpen} theme={theme} changeAppTheme={changeAppTheme} />
      {props.children}
      <Footer />
    </MuiThemeProvider>
  );
}
