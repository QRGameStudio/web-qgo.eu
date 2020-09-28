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
    <Card style={{ margin: "16px" }}>
      <CardHeader
        action={
          <IconButton onClick={toggleFavourite} style={{ color: game.isFavourite ? "pink" : "inherit" }}>
            {game.isFavourite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        }
        title={game.name.toUpperCase()}
        subheader={`${T.Version} ${game.version}`}
      />

      <CardActions disableSpacing>
        <IconButton onClick={removeGame} style={{ color: "red" }}>
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
