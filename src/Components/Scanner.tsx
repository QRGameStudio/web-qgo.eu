import React from "react";
import QrReader from "react-qr-reader";

interface IProps {
  onScanCompleate: (data: string) => void;
}

export default function ({ onScanCompleate }: IProps) {
  return (
    <div>
      <QrReader
        delay={300}
        onError={console.error}
        onScan={(data) => {
          if (data !== null) onScanCompleate(data);
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
}
