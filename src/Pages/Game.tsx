import React, { useEffect, useState } from "react";
import { CollectionKey } from "../Utils/constants";
import Decompressor from "../Utils/Decompressor";
import { buildCode } from "../Utils/gameCodeBuilder";
import Collection from "../Utils/collectionAPI";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gameFrame: {
      width: "100vw",
      height: `calc(100vh - 68px)`,
      border: "none",
      margin: 0,
      padding: 0,
    },
    loadingAnimation: {
      width: "min(70vw, 50vh)",
      position: "absolute",
      left: "calc(50vw - min(35vw, 25vh))",
      top: "calc(50vh - min(35vw, 25vh))",
      filter: `invert(${theme.palette.type === "dark" ? 1 : 0})`,
    },
  })
);

const parseGameInfo = async (code: string) => {
  const doc = document.createElement("div");
  doc.innerHTML = code;
  const metas = [].slice.call(doc.getElementsByTagName("meta")) as HTMLMetaElement[];
  const version = metas.filter((m) => m.name === "gv")[0].content;
  const id = metas.filter((m) => m.name === "gi")[0].content;
  const secret = (metas.filter((m) => m.name === "gs")[0] || {}).content;
  const name = doc.getElementsByTagName("title")[0].innerHTML;
  return { version, name, id, secret };
};

export default function ({ compressedCode }: { compressedCode: string }) {
  const classes = useStyles();
  const [gameInfo, setGameInfo] = useState<{ version: string; name: string; id: string } | undefined>(undefined);
  const [code, setCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    new Decompressor(compressedCode).decompress().then((gameCode) => {
      buildCode(gameCode).then((code) => {
        parseGameInfo(gameCode).then((info) => {
          new Collection(CollectionKey).add(info.name, info.id, info.secret, info.version, compressedCode);
          setGameInfo(info);
        });
        setCode(code);
      });
    });
  }, [compressedCode]);

  return (
    <>
      {code === undefined || gameInfo === undefined ? (
        <>
          <img src="/img/qrLoading.gif" className={classes.loadingAnimation} alt="loading anim" />
        </>
      ) : (
        <iframe title="gameField" srcDoc={code} className={classes.gameFrame}></iframe>
      )}
    </>
  );
}
