export default class CodeMap {
  private code: string;
  private maps = {
    "1": {
      "0": "left",
      "1": ".map",
      "2": "else",
      "3": "body",
      "4": "then",
      "5": "top",
      "6": "for",
      "7": "===",
      "8": "var",
      "9": "new",
      a: '<meta content="width=device-width,initial-scale=1"name=viewport>',
      b: "document.createElement(",
      c: ".getBoundingClientRect(",
      d: ".classList.contains",
      e: ".classList.remove",
      f: "background-color",
      g: "<!DOCTYPE html>",
      h: ".classList.add",
      i: "clearInterval(",
      j: "window.onload",
      k: "setInterval(",
      l: "game-content",
      m: "appendChild(",
      n: "clearTimeout",
      o: "setTimeout(",
      p: "transparent",
      q: "font-weight",
      r: ".classList",
      s: "background",
      t: ".className",
      u: "Math.max(",
      v: "Math.min(",
      w: "font-size",
      x: "direction",
      y: "position",
      z: ".forEach",
      A: "function",
      B: ".onclick",
      C: "content",
      D: "<script",
      E: "padding",
      F: "display",
      G: ".filter",
      H: "return",
      I: "center",
      J: "length",
      K: "margin",
      L: "border",
      M: "height",
      N: "bottom",
      O: "async",
      P: "while",
      Q: "this.",
      R: "<meta",
      S: "Math.",
      T: "width",
      U: "await",
      V: "right",
      W: "color",
      X: "speed",
      Y: ".get",
      Z: "name",
    },
  };

  constructor(code: string) {
    this.code = code;
  }

  private escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  private replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(this.escapeRegExp(find), "g"), replace);
  }

  revert = () => {
    if (!this.isMapped()) return this.code;

    // @ts-ignore
    const map = this.maps[this.mapVersion()];
    if (!map) return null;

    // @ts-ignore
    this.code = this.code.substring(/~R(.*?)~/.exec(this.code)[0].length);
    for (let repl of Object.keys(map)) {
      this.code = this.replaceAll(this.code, `~${repl}`, map[repl]);
    }
    this.code = this.replaceAll(this.code, "~~", "~");
    return this.code;
  };

  private mapVersion = () => {
    if (!this.isMapped()) return null;

    const r = /~R(.*?)~/.exec(this.code);

    return r !== null ? r[1] : null;
  };

  private isMapped = () => {
    return this.code.startsWith("~R");
  };
}
