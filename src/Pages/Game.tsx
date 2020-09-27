import React from "react";
import { useParams } from "react-router-dom";
import Decompressor from "../Utils/Decompressor";
import { buildCode } from "../Utils/gameCodeBuilder";

const frameStyle: React.CSSProperties = {
  width: "100vw",
  height: "80vh",
  border: "none",
};

export default function () {
  const { compressedCode } = useParams<{ compressedCode: string }>();
  const decodedCompressedCode = decodeURI(compressedCode);
  const code = new Decompressor(decodedCompressedCode).decompress();

  return (
    <>
      <iframe title="gameField" srcDoc={buildCode(code)} style={frameStyle}></iframe>
    </>
  );
}
