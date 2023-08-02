import "../dist";
import { executeSth } from "./anotherFile";

L.extend("LIBRARY");

setInterval(() => {
  L.log(L.LIBRARY, "Test from lib");
  L.error(L.LIBRARY, "An error from lib");
  executeSth();
}, 3000);
