import React, { useState, createContext, useContext } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Layout from "./Layout";

export const LayoutContext = createContext({
  success: (message: string) => {},
  error: (message: string) => {},
  warning: (message: string) => {},
  info: (message: string) => {},
});

export enum AlertSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export function LayoutProvider(props: { children?: React.ReactNode }) {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(AlertSeverity.SUCCESS);

  const success = (message: string) => {
    setAlertSeverity(AlertSeverity.SUCCESS);
    setAlertMessage(message);
  };
  const error = (message: string) => {
    setAlertSeverity(AlertSeverity.ERROR);
    setAlertMessage(message);
  };
  const warning = (message: string) => {
    setAlertSeverity(AlertSeverity.WARNING);
    setAlertMessage(message);
  };
  const info = (message: string) => {
    setAlertSeverity(AlertSeverity.INFO);
    setAlertMessage(message);
  };

  return (
    <LayoutContext.Provider value={{ success: success, error: error, warning: warning, info: info }}>
      <Layout>
        {props.children}
        <Snackbar
          open={Boolean(alertMessage)}
          onClose={() => setAlertMessage("")}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setAlertMessage("")} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Layout>
    </LayoutContext.Provider>
  );
}

export const useLayout = () => useContext(LayoutContext);
