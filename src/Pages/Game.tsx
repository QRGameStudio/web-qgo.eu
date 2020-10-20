import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionKey } from "../Utils/constants";
import Decompressor from "../Utils/Decompressor";
import { buildCode } from "../Utils/gameCodeBuilder";
import Collection from "../Utils/collectionAPI";

const frameStyle: React.CSSProperties = {
  width: "100vw",
  height: `calc(100vh - 68px)`,
  border: "none",
  margin: 0,
  padding: 0,
};

const parseGameInfo = async (code: string) => {
  const doc = document.createElement("div");
  doc.innerHTML = code;
  const metas = [].slice.call(doc.getElementsByTagName("meta")) as HTMLMetaElement[];
  const version = metas.filter((m) => m.name === "gv")[0].content;
  const id = metas.filter((m) => m.name === "gi")[0].content;
  const name = doc.getElementsByTagName("title")[0].innerHTML;
  return { version, name, id };
};

export default function () {
  const [gameInfo, setGameInfo] = useState<{ version: string; name: string; id: string } | undefined>(undefined);
  const [code, setCode] = useState<string | undefined>(undefined);
  const { compressedCode } = useParams<{ compressedCode: string }>();
  const decodedCompressedCode = decodeURI(compressedCode);
  useEffect(() => {
    new Decompressor(decodedCompressedCode).decompress().then((gameCode) => {
      buildCode(gameCode).then(setCode);
      parseGameInfo(gameCode).then(setGameInfo);
    });
    // eslint-disable-next-line
  }, []);
  if (code !== undefined && gameInfo !== undefined) {
    new Collection(CollectionKey).add(gameInfo.name, gameInfo.version, decodedCompressedCode);
  }
  return (
    <>
      {code === undefined ? (
        <img src="/img/qrLoading.gif" alt="loading anim" />
      ) : (
        <iframe title="gameField" srcDoc={code} style={frameStyle}></iframe>
      )}
    </>
  );
}
