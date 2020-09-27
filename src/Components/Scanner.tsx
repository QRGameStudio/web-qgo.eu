import React from "react";
import QrReader from "react-qr-reader";

interface IProps {
  onScanCompleate: (data: string) => void;
}

export default function ({ onScanCompleate }: IProps) {
  const height = document.documentElement.clientHeight - 64;
  const width = document.documentElement.clientWidth;
  const size = Math.min(height, width);

  return (
    <div>
      <QrReader
        delay={300}
        onError={console.error}
        onScan={(data) => {
          if (data !== null) onScanCompleate(data);
        }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `${parseInt(((width - size) / 2).toString())}px`,
          marginTop: `${parseInt(((height - size) / 2).toString())}px`,
        }}
      />
    </div>
  );
}
