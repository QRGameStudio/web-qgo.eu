import base32 from "base32";
import CodeMap from "./codeMap";

const LZMA = require("lzma/src/lzma_worker.js").LZMA_WORKER;

export default class Decompressor {
  private compressedText: string;

  constructor(compressedText: string) {
    this.compressedText = compressedText;
  }

  private base64 = (onFinnish: (res: string) => void) => {
    const compressed = Uint8Array.from(atob(this.compressedText), (c) => c.charCodeAt(0));
    this.lzma(compressed, onFinnish);
  };

  private base32 = (onFinnish: (res: string) => void) => {
    // @ts-ignore
    const compressed = Uint8Array.from(base32.decode(this.compressedText.toLowerCase()), (c) => c.charCodeAt(0));
    this.lzma(compressed, onFinnish);
  };

  private lzma = (compressed: Uint8Array, onFinnish: (res: string) => void) => {
    LZMA.decompress(compressed, onFinnish);
  };

  decompress = () =>
    new Promise<string>(async (resolve) => {
      const onFinnish = (res: string) => resolve(new CodeMap(res).revert() as string);
      if (this.compressedText.startsWith("CB")) {
        this.compressedText = this.compressedText.substring(2);
        this.base32(onFinnish);
      } else {
        this.base64(onFinnish);
      }
    });
}
