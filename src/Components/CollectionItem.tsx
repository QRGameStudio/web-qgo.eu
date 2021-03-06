import { Button, Card, CardActions, CardHeader, IconButton } from "@material-ui/core";
import React from "react";
import { storedGame } from "../Utils/collectionAPI";
import { Favorite, FavoriteBorder, Delete } from "@material-ui/icons";
import T from "../Utils/translate/translator";

interface IProps {
  game: storedGame;
  toggleFavourite: () => void;
  playGame: () => void;
  removeGame: () => void;
}

export default function ({ game, toggleFavourite, playGame, removeGame }: IProps) {
  return (
    <Card style={{ margin: "16px", height: "calc(100% - 32px)", display: "flex", flexDirection: "column" }}>
      <CardHeader
        action={
          <IconButton
            onClick={toggleFavourite}
            style={{ color: game.isFavourite ? "pink" : "inherit", position: "absolute", right: 8, top: 8 }}
            aria-label="makeFavourite"
          >
            {game.isFavourite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        }
        title={game.name.toUpperCase()}
        subheader={`${T.Version} ${game.version}`}
        style={{ flexGrow: 1, position: "relative", paddingRight: 48 }}
      />

      <CardActions disableSpacing>
        <IconButton onClick={removeGame} style={{ color: "red" }} aria-label="deleteGame">
          <Delete />
        </IconButton>
        <span style={{ flexGrow: 1 }}></span>
        <Button color="primary" onClick={playGame}>
          {T.Play}
        </Button>
      </CardActions>
    </Card>
  );
}
