import LZMA from "../lib/lzma";

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
    // const compressed = Uint8Array.from(window.base32.decode(this.compressedText.toLowerCase()), (c) => c.charCodeAt(0));
    // return this.lzma(compressed);
    return this.compressedText; // TODO
  };

  private lzma = (compressed: Uint8Array) => {
    const inStream = new LZMA.iStream(compressed);
    const outStream = LZMA.decompressFile(inStream);
    return outStream.toString();
  };

  decompress = () => {
    if (this.compressedText.startsWith("CB")) {
      this.compressedText = this.compressedText.substring(2);
      return this.base32();
    }
    return this.base64();
  };
}

// window.onload = async () => {
//   if (!window.location.hash) {
//     console.error("No data to parse");
//     return;
//   }
//   document.body.innerText = "";
//   const hashData = window.location.hash.substring(1);
//   if (hashData === "debug") {
//     console.log("Awaiting your /debug/ commands");
//     return;
//   }
//   const decompressor = new Decompressor(hashData);
//   const decompressed = decompressor.decompress();
//   const html = new CodeMap(decompressed).revert();
//   const storage = new GStorage("currentGame", true);
//   await storage.set("currentGame", html);
//   location.replace("game.html");
// };
