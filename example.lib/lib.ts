import "../dist";
import { executeSth } from "./anotherFile";

const l = L.extend("LIBRARY", "🗺️", "rgb(12, 30, 240)");

setInterval(() => {
  l.log("Test from lib");
  l.error("An error from lib");
  executeSth();
}, 3000);
