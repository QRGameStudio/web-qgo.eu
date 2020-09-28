import React from "react";
import { useParams } from "react-router-dom";
import { CollectionKey } from "../Utils/constants";
import Decompressor from "../Utils/Decompressor";
import { buildCode } from "../Utils/gameCodeBuilder";
import Collection from "../Utils/collectionAPI";

const frameStyle: React.CSSProperties = {
  width: "100vw",
  height: `${document.documentElement.clientHeight - 64}px`,
  border: "none",
};

const parseGameInfo = (code: string) => {
  const doc = document.createElement("div");
  doc.innerHTML = code;
  const metas = [].slice.call(doc.getElementsByTagName("meta"));
  // @ts-ignore
  const version = metas.filter((m) => m.name === "gv")[0].content as string;
  // @ts-ignore
  const name = metas.filter((m) => m.name === "gi")[0].content as string;
  return [version, name];
};

export default function () {
  const { compressedCode } = useParams<{ compressedCode: string }>();
  const decodedCompressedCode = decodeURI(compressedCode);
  const code = new Decompressor(decodedCompressedCode).decompress();
  const [gameVersrion, gameName] = parseGameInfo(code);
  new Collection(CollectionKey).add(gameName, gameVersrion, decodedCompressedCode);

  return (
    <>
      <iframe title="gameField" srcDoc={buildCode(code)} style={frameStyle}></iframe>
    </>
  );
}
