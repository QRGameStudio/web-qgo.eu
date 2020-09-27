import { cs } from "./cs";
import { en } from "./en";
import { de } from "./de";

const langs = new Map<string, {}>();
langs.set("cs", cs);
langs.set("en", en);
langs.set("de", de);

const langStoredCode: string = localStorage.getItem("langCode") || "en";
// eslint-disable-next-line
const lang: any = langs.get(langStoredCode);

// export default { ...en, ...lang };
export default { ...en };
