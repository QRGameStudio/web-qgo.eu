const libs = {
  js: [
    "jquery.min.js",
    "bootstrap.min.js",
    "renderer.js",
    "peer.js",
    "GStorage.js",
    "GModal.js",
    "GPopup.js",
    "GSound.js",
    "GTheme.js",
    "GMultiplayer.js",
    "GGameData.js",
    "GUt.js",
  ],
  css: ["bootstrap.min.css", "GTheme.css"],
};

export async function buildCode(code: string) {
  return `${libs.js.map((f) => `<script src="../lib/js/${f}"></script>`).reduce((a, b) => a + b, "")}${libs.css
    .map((f) => `<link rel="stylesheet" href="../lib/css/${f}">`)
    .reduce((a, b) => a + b, "")}${code}`;
}
