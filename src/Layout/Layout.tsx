import React, { useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import RightDrawer from "./RightDrawer";
import Footer from "./Footer";
import Header from "./Header";

const themeStoredCode: string = localStorage.getItem("theme") || "light";
const themeStoredColor: string = localStorage.getItem("themeColor") || "#3d5afe";

const getTheme = (theme: "dark" | "light", color: string) => {
  return createMuiTheme({ palette: { type: theme, primary: { main: color } } });
};

export default function Layout(props: { children?: React.ReactNode }) {
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [offline, setOffline] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(themeStoredCode as "dark" | "light");
  const [color, setColor] = useState(themeStoredColor);

  React.useEffect(() => {
    if (themeStoredCode === "dark") changeAppTheme("dark");
    if (themeStoredColor !== "#3d5afe") changeThemeColor(themeStoredColor);

    window.addEventListener("online", () => setOffline(false));
    window.addEventListener("offline", () => setOffline(true));
  }, []);

  const changeAppTheme = (theme: "dark" | "light") => {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";

    if (theme === "dark") {
      document.body.style.backgroundColor = "#212121";
      document.body.style.color = "#fafafa";
    }

    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const changeThemeColor = (color: string) => {
    setColor(color);
    localStorage.setItem("themeColor", color);
  };

  return (
    <MuiThemeProvider theme={getTheme(theme, color)}>
      <div style={{ flexGrow: 1 }}>
        <Header offline={offline} setRightDrawerOpen={setRightDrawerOpen} />
      </div>
      <RightDrawer
        open={rightDrawerOpen}
        setOpen={setRightDrawerOpen}
        theme={theme}
        changeAppTheme={changeAppTheme}
        changeThemeColor={changeThemeColor}
      />
      {props.children}
      <Footer />
    </MuiThemeProvider>
  );
}
