import "../dist";
import "../example.lib";

// dullog will expose a global object called "L" which brings
// a small set of tools for managing logs.
// In fact you can interact with the L object via browser console
// by calling e.g. L.verbose(), L.mute() or L.enable(L.SCOPE)

// To create a scoped logger, call L.extend and give a scope name.
// It will add a "scope" to dullog, which can be used to group logs
const l = L.extend("MAIN", "😂", "rgb(205, 58, 0)");

// Enable all log levels: try this in your browsers dev console
L.verbose();

// Mute all log levels: try this in your browsers dev console
L.mute();

function exampleLogging() {
  // Simply uses console.log under the hood and will group the log under the
  // given scope (L.MAIN)
  l.log({ x: Math.random() < 0.5, y: Math.random() }, "Something else");

  l.error("Another error");
}

setInterval(() => exampleLogging(), 2000);
