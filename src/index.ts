type LogFun = (...messages: any) => void;

export type ExtendedLogger = {
  log: LogFun;
  error: LogFun;
  warn: LogFun;
  table: LogFun;
  info: LogFun;
  time: LogFun;
  trace: LogFun;
};

export type Scope = {
  bitMask: number;
  color?: string;
  prefix?: string;
};

class Logger {
  [key: string]: any;

  private _active: number = 0b0000000000000;
  private _scopes: { [key: number]: string } = {};
  private _scopeMap: Map<string, Scope> = new Map();

  // Logger is treatet as a singleton
  constructor() {
    if (globalThis.L === undefined) {
      globalThis.L === this;
    }
    return globalThis.L;
  }

  // Extends the logger by adding a scope.
  // A scope is just a grouping of logs
  public extend(
    scope: string,
    prefix?: string,
    color?: string
  ): ExtendedLogger {
    const scopeObject = globalThis.L.addScope(
      scope.toUpperCase(),
      prefix,
      color
    );
    return {
      log: (...messages: any) =>
        this._wrap(scopeObject, console.log, ...messages)(),
      error: (...messages: any) =>
        this._wrap(scopeObject, console.error, ...messages)(),
      warn: (...messages: any) =>
        this._wrap(scopeObject, console.warn, ...messages)(),
      table: (...messages: any) =>
        this._wrap(scopeObject, console.table, ...messages)(),
      info: (...messages: any) =>
        this._wrap(scopeObject, console.info, ...messages)(),
      time: (...messages: any) =>
        this._wrap(scopeObject, console.time, ...messages)(),
      trace: (...messages: any) =>
        this._wrap(scopeObject, console.trace, ...messages)(),
    };
  }

  // Adds a given scope to the Logger singleton instance
  private addScope(scope: string, prefix?: string, color?: string): Scope {
    if (this._scopeMap.has(scope)) return this._scopeMap.get(scope)!;
    const existingScopeCount = Object.keys(globalThis.L._scopes).length;
    const bitMask = 0b1 << existingScopeCount;
    const scopeObject = {
      bitMask,
      color,
      prefix,
    };
    this._scopes[bitMask] = scope;
    this._scopeMap.set(scope, scopeObject);
    this[scope] = bitMask;
    return scopeObject;
  }

  // Used to wrap all the native console.x calls into groups with a
  // given scope
  private _wrap(scopeObject: Scope, logFn: Function, ...messages: any) {
    return () => {
      const { color, bitMask, prefix } = scopeObject;
      if ((this._active & bitMask) === bitMask) {
        if (color != undefined) {
          console.group(
            `%c${prefix ? prefix + " " : ""}${
              this._scopes[bitMask]
            } ${new Date().toISOString()}`.trim(),
            `color: ${color}`
          );
        } else {
          console.group(
            `${prefix ? prefix + " " : ""}${
              this._scopes[bitMask]
            } ${new Date().toISOString()}`.trim()
          );
        }
        logFn(...messages);
        console.groupEnd();
      }
    };
  }

  // Enables only a given scope, disabling all the other scopes
  public only(scope: number): void {
    this.mute();
    this.enable(scope);
  }

  // Enables a given scope
  public enable(scope: number): void {
    this._active = this._active | scope;
  }

  // Disables a given scope
  public disable(scope: number): void {
    this._active = this._active & ~scope;
  }

  // Disables all the scopes
  public mute(): void {
    this._active = 0b0000000000000;
  }

  // Enables all the scopes
  public verbose(): void {
    this._active = 0b1111111111111;
  }
}

declare global {
  var L: Logger;
  interface Window {
    L: Logger;
    contextBridge?: any;
  }
}

const L = new Logger();

globalThis.L = L;
window.L = L;

export type { Logger };
