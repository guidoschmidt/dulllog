import "../dist/dulllog.mjs";

// dullog will expose a global object called "L" which brings
// a small set of tools for managing logs.
// In fact you can interact with the L object via browser console
// by calling e.g. L.verbose(), L.mute() or L.enable(L.WARN)

// Do this once on Application init:
// Log levels are just an array of strings
const logLevels = ["LIBRARY_1", "PROJECT_A", "MISC"];
L.setLogLevels(logLevels);

// Enable all log levels: try this in your browsers dev console
L.verbose();

// Mute all log levels: try this in your browsers dev console
L.mute();

function exampleLogging() {
  // Simply uses console.log
  L.log(L.MISC, { x: Math.random() < 0.5, y: Math.random() }, "Something else");

  // Use different log levels via L.
  L.log(L.MISC, "Simple warning");

  // Uses console.error under the hood
  L.error(L.LIBRARY_1, "Shit, something wen't wrong");

  // Uses console.table under the hood
  L.table(L.PROJECT_A, [
    [0, 1],
    [2, 3],
    [4, 5],
  ]);

  L.log(L.LIBRARY_1, "Another ERROR");
}

L.verbose();
setInterval(() => exampleLogging(), 2000);
