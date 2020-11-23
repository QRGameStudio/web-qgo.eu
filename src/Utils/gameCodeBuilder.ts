const libs = {
  js: [
    "jquery.min.js",
    "peer.js",
    "bootstrap.min.js",
    "renderer.js",
    "GGameData.js",
    "GModal.js",
    "GMultiplayer.js",
    "GPopup.js",
    "GSound.js",
    "GStorage.js",
    "GTheme.js",
  ],
  css: ["bootstrap.min.css", "GTheme.css"],
};

export async function buildCode(code: string) {
  return `${libs.js.map((f) => `<script src="../lib/js/${f}"></script>`).reduce((a, b) => a + b, "")}${libs.css
    .map((f) => `<link rel="stylesheet" href="../lib/css/${f}">`)
    .reduce((a, b) => a + b, "")}${code}`;
}
