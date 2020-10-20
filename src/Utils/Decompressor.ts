import base32 from "base32";
import CodeMap from "./codeMap";

const LZMA = require("lzma/src/lzma_worker.js").LZMA_WORKER;

export default class Decompressor {
  private compressedText: string;

  constructor(compressedText: string) {
    this.compressedText = compressedText;
  }

  private base64 = () => {
    const compressed = Uint8Array.from(atob(this.compressedText), (c) => c.charCodeAt(0));
    return this.lzma(compressed);
  };

  private base32 = () => {
    // @ts-ignore
    const compressed = Uint8Array.from(base32.decode(this.compressedText.toLowerCase()), (c) => c.charCodeAt(0));
    return this.lzma(compressed);
  };

  private lzma = (compressed: Uint8Array) => {
    return LZMA.decompress(compressed);
  };

  decompress = () =>
    new Promise<string>(async (resolve) => {
      let res = "";
      if (this.compressedText.startsWith("CB")) {
        this.compressedText = this.compressedText.substring(2);
        res = this.base32();
      } else {
        res = this.base64();
      }
      resolve(new CodeMap(res).revert() as string);
    });
}
