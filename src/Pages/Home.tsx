import React, { useState } from "react";
import QrReader from "react-qr-reader";

export default function () {
  const [result, setResult] = useState<string | null>(null);
  return (
    <div>
      <QrReader delay={300} onError={console.error} onScan={setResult} style={{ width: "100%" }} />
      <p>{result || ""}</p>
    </div>
  );
}
