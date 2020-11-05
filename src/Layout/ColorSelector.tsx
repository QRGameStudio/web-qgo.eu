import React from "react";

interface IProps {
  color: string;
  selectColor: () => void;
}

const selectorStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  margin: "0",
  padding: "0",
  marginLeft: "10%",
  marginTop: "10%",
  cursor: "pointer",
};

export default function ({ color, selectColor }: IProps) {
  return (
    <>
      <div onClick={selectColor} style={{ ...selectorStyle, backgroundColor: color }}>
        &nbsp;
      </div>
    </>
  );
}
