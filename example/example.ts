import "../dist";
import "../example.lib";

// dullog will expose a global object called "L" which brings
// a small set of tools for managing logs.
// In fact you can interact with the L object via browser console
// by calling e.g. L.verbose(), L.mute() or L.enable(L.SCOPE)

// Do this once on Application init:
// It will add a "scope" to dullog, which can be used to group logs
// @TODO: Is it possible to provide Typescript auto-completion for these "scope"
//        levels?
L.extend("MAIN");

// Enable all log levels: try this in your browsers dev console
L.verbose();

// Mute all log levels: try this in your browsers dev console
L.mute();

function exampleLogging() {
  // Simply uses console.log under the hood and will group the log under the
  // given scope (L.MAIN)
  L.log(L.MAIN, { x: Math.random() < 0.5, y: Math.random() }, "Something else");

  // Uses console.error under the hood
  L.error(L.MAIN, "Shit, something wen't wrong");

  // Uses console.table under the hood
  L.table(L.MAIN, [
    [0, 1],
    [2, 3],
    [4, 5],
  ]);
}

// Enable a specific log scope
L.enable(L.MAIN);

// Set the logger to "verbose", which means logging everything
L.mute();

setInterval(() => exampleLogging(), 2000);
