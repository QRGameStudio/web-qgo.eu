import React, { useState } from "react";
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
} from "@material-ui/core";
import Collection, { storedGame } from "../Utils/collectionAPI";
import T from "../Utils/translate/translator";
import { gamesService } from "../Utils/ApiService";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { useLayout } from "../Layout/LayoutContext";
import { Update } from "@material-ui/icons";

interface IProps {
  onUpdate: () => void;
  collection: Collection;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ({ onUpdate, collection }: IProps) {
  const [gamesToUpdate, setGamesToUpdate] = useState<storedGame[]>([]);
  const layout = useLayout();

  const checkUpdates = () => {
    gamesService.post(
      "/games/update/find",
      {},
      {
        games: collection
          .getAll()
          .filter((g) => g.secret !== undefined)
          .map((g) => [g.id, g.secret, g.version]),
      },
      {
        success: (data: string[]) => {
          if (data.length > 0) setGamesToUpdate(collection.getAll().filter((g) => data.includes(g.id)));
          else layout.success(T.upToDate);
        },
        error: () => layout.error(T.checkUpdatesError),
      }
    );
  };

  const updateGame = (game: storedGame) => {
    gamesService.get(
      `game/${game.id}`,
      { s: game.secret },
      {
        success: ({ version }: { version: string }) => {
          gamesService.getText(
            `game/${game.id}/link`,
            { s: game.secret },
            {
              success: (link: string) => {
                collection.remove(game.id);
                collection.addObject({ ...game, version: version, code: link.replace("https://qgo.eu/Game/#", "") });
                onUpdate();
                layout.success(T.gameUpdated);
                setGamesToUpdate(gamesToUpdate.filter((g) => g.id !== game.id));
              },
              error: () => layout.error(T.gameUpdateError),
            }
          );
        },
        error: () => layout.error(T.gameUpdateError),
      }
    );
  };

  return (
    <>
      <Button fullWidth color="primary" onClick={checkUpdates}>
        {T.CheckForUpdates}
      </Button>
      <Dialog fullScreen open={gamesToUpdate.length > 0} onClose={() => setGamesToUpdate([])} TransitionComponent={Transition}>
        <AppBar style={{ padding: 16 }}>
          <Typography>{T.AvailableUpdates}</Typography>
        </AppBar>
        <br />
        <br />
        <br />
        <List style={{ flexGrow: 1 }}>
          {gamesToUpdate.map((g) => (
            <React.Fragment key={g.id}>
              <ListItem button onClick={() => updateGame(g)}>
                <ListItemText primary={g.name} />
                <ListItemIcon>
                  <Update color="primary" />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Button color="primary" onClick={() => setGamesToUpdate([])}>
          {T.close}
        </Button>
      </Dialog>
    </>
  );
}
