import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CollectionItem from "../Components/CollectionItem";
import Collection, { storedGame } from "../Utils/collectionAPI";
import { CollectionKey } from "../Utils/constants";

export default function () {
  const history = useHistory();
  const [games, setGames] = useState<storedGame[]>([]);

  const collection = new Collection(CollectionKey);

  const setGamesOrdered = (games: storedGame[]) => {
    setGames(
      games.sort((a, b) => {
        if (a.isFavourite && !b.isFavourite) return -1;
        if (b.isFavourite && !a.isFavourite) return 1;
        return a.name < b.name ? -1 : a.name === b.name ? 0 : 1;
      })
    );
  };

  useEffect(
    () => setGamesOrdered(collection.getAll()),
    // eslint-disable-next-line
    []
  );

  return (
    <Grid container>
      {games.map((g) => (
        <Grid item key={g.name} xs={6} sm={4} md={3} lg={2}>
          <CollectionItem
            game={g}
            toggleFavourite={() => {
              collection.toggleFavourite(g.name);
              setGamesOrdered(collection.getAll());
            }}
            playGame={() => history.push("/Game/#" + g.code)}
            removeGame={() => {
              collection.remove(g.name);
              setGamesOrdered(collection.getAll());
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
