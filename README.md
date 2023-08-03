# dulllog
> Simple and small logger with console interaction

### Usage

```ts
import "dullog";

const l = L.extend("MY_SCOPE");

// Prefix and color arguments are optional
l.log("Hello!", "Optional prefix", "rgb(255, 0, 0)");
```

See [example](example/) for a more detailed example usage.

You can interact with the logger via Browser Developer Console, e.g. to enable a
single logging scope:

```ts
L.only(L.MY_SCOPE); // To activate a specific logging scope
L.mute(); // To mute all logging scopes
```
