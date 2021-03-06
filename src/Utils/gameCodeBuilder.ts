const libs = {
  js: ["jquery.min.js", "bootstrap.min.js", "renderer.js", "peer.js", "libs.min.js"],
  css: ["bootstrap.min.css", "libs.css"],
};

export async function buildCode(code: string) {
  return `${libs.js.map((f) => `<script src="../lib/js/${f}"></script>`).reduce((a, b) => a + b, "")}${libs.css
    .map((f) => `<link rel="stylesheet" href="../lib/css/${f}">`)
    .reduce((a, b) => a + b, "")}${code}`;
}
