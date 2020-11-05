export type storedGame = {
  id: string;
  secret?: string;
  name: string;
  code: string;
  version: string;
  isFavourite: boolean;
};

export enum updateStatus {
  UPDATED,
  CREATED,
  NONE,
}

export default class Collection {
  private key: string;
  private games: storedGame[];

  constructor(collectionKey: string) {
    this.key = collectionKey;
    this.games = [];
    this.loadGames();
  }

  private shouldUpdate = (newVersion: string, actual: string | undefined) => {
    if (actual === undefined) return true;
    try {
      const newVersionSplit = newVersion.split(".");
      const actVersionSplit = actual.split(".");
      for (let i = 0; i < Math.max(newVersionSplit.length, actVersionSplit.length); i++) {
        if (i >= newVersionSplit.length) return false;
        if (i >= actVersionSplit.length) return true;
        const newAct = parseInt(newVersionSplit[i]);
        const oldAct = parseInt(actVersionSplit[i]);
        if (newAct > oldAct) return true;
        if (newAct < oldAct) return false;
      }
    } catch {
      return false;
    }
    return false;
  };

  private loadGames = () => {
    this.games = JSON.parse(localStorage.getItem(this.key) || "[]") as storedGame[];
  };

  private storeGames = () => {
    localStorage.setItem(this.key, JSON.stringify(this.games));
  };

  add = (name: string, id: string, secret: string, version: string, compressedCode: string) => {
    const lastVersion = this.get(id)?.version;
    if (this.shouldUpdate(version, lastVersion)) {
      if (lastVersion !== undefined) {
        this.games = this.games.filter((g) => g.name !== name);
      }
      this.games.push({ code: compressedCode, isFavourite: false, name: name, version: version, id: id, secret: secret });
      this.storeGames();
      return lastVersion === undefined ? updateStatus.CREATED : updateStatus.UPDATED;
    }
    return updateStatus.NONE;
  };

  addObject = (game: storedGame) => {
    this.games.push(game);
    this.storeGames();
  };

  remove = (id: string) => {
    this.games = this.games.filter((g) => g.id !== id);
    this.storeGames();
  };

  get = (id: string) => {
    const filtered = this.games.filter((g) => g.id === id);
    return filtered.length > 0 ? filtered[0] : null;
  };

  getAll = () => [...this.games];

  toggleFavourite = (id: string) => {
    const filtered = this.games.filter((g) => g.id === id);
    if (filtered.length > 0) filtered[0].isFavourite = !filtered[0].isFavourite;
    this.storeGames();
  };
}
