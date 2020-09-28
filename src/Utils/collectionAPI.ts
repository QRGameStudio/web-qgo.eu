export type storedGame = {
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
    return true;
  };

  private loadGames = () => {
    this.games = JSON.parse(localStorage.getItem(this.key) || "[]") as storedGame[];
  };

  private storeGames = () => {
    localStorage.setItem(this.key, JSON.stringify(this.games));
  };

  add = (name: string, version: string, compressedCode: string) => {
    const lastVersion = this.get(name)?.version;
    if (this.shouldUpdate(version, lastVersion)) {
      if (lastVersion !== undefined) {
        this.games = this.games.filter((g) => g.name !== name);
      }
      this.games.push({ code: compressedCode, isFavourite: false, name: name, version: version });
      this.storeGames();
      return lastVersion === undefined ? updateStatus.CREATED : updateStatus.UPDATED;
    }
    return updateStatus.NONE;
  };

  remove = (name: string) => {
    this.games = this.games.filter((g) => g.name !== name);
    this.storeGames();
  };

  get = (name: string) => {
    const filtered = this.games.filter((g) => g.name === name);
    return filtered.length > 0 ? filtered[0] : null;
  };

  getAll = () => [...this.games];

  toggleFavourite = (name: string) => {
    const filtered = this.games.filter((g) => g.name === name);
    if (filtered.length > 0) filtered[0].isFavourite = !filtered[0].isFavourite;
    this.storeGames();
  };
}
