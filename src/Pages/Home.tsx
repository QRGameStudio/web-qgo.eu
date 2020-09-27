import React, { useState } from "react";
import { Button } from "@material-ui/core";
import T from "../Utils/translate/translator";
import Scanner from "../Components/Scanner";
import { useHistory } from "react-router-dom";

const validateScan = (data: string) => true;

export default function () {
  const [scann, setScann] = useState(false);
  const history = useHistory();

  const onScan = (data: string) => {
    if (validateScan(data)) {
      history.push("/Game/" + data);
    } else {
      alert("Scann invalid TODO");
      setScann(false);
    }
  };

  return (
    <>
      {scann ? (
        <Scanner onScanCompleate={onScan} />
      ) : (
        <div style={{ width: "80vw", marginLeft: "10vw", marginTop: "40vh" }}>
          <Button variant="contained" fullWidth color="primary" onClick={() => setScann(true)}>
            {T.ScanAndPlay}
          </Button>
        </div>
      )}
    </>
  );
}
