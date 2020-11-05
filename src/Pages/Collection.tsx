import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CollectionItem from "../Components/CollectionItem";
import Collection, { storedGame } from "../Utils/collectionAPI";
import { CollectionKey } from "../Utils/constants";
import CheckUpdatesModal from "../Components/CheckUpdatesModal";

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
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 56px)" }}>
      <Grid container>
        {games.map((g) => (
          <Grid item key={g.name} xs={6} sm={4} md={3} lg={2}>
            <CollectionItem
              game={g}
              toggleFavourite={() => {
                collection.toggleFavourite(g.id);
                setGamesOrdered(collection.getAll());
              }}
              playGame={() => history.push("/Game/#" + g.code)}
              removeGame={() => {
                collection.remove(g.id);
                setGamesOrdered(collection.getAll());
              }}
            />
          </Grid>
        ))}
      </Grid>
      <div style={{ flexGrow: 1 }}>&nbsp;</div>
      <CheckUpdatesModal onUpdate={() => setGamesOrdered(collection.getAll())} collection={collection} />
    </div>
  );
}
