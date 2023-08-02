class Logger {
  [key: string]: any;

  private _active: number = 0b0000000000000;
  private _scopes: { [key: number]: string } = {};

  public _scopeMap: { [key: string]: number } = {};

  // Logger is treatet as a singleton
  constructor() {
    if (globalThis.L === undefined) {
      globalThis.L === this;
    }
    return globalThis.L;
  }

  // Extends the logger by adding a scope to its _scopeMap.
  // A scope is just a grouping of logs
  public extend(scope: string): void {
    globalThis.L.addScope(scope.toUpperCase());
  }

  // Adds a given scope to the Logger singleton instance
  private addScope(scope: string): void {
    const existingScopeCount = Object.keys(globalThis.L._scopes).length;
    const bitMask = 0b0000000000001 << (existingScopeCount + 1);
    globalThis.L._scopes[bitMask] = scope;
    globalThis.L[scope] = bitMask;
    globalThis.SCOPE_COUNT++;
  }

  // Used to wrap all the native console.x calls into groups with a
  // given scope
  private _wrap(lvl: number, logFn: Function, ...messages: any) {
    return () => {
      console.group(`${this._scopes[lvl]}`.trim());
      logFn(...messages);
      console.groupEnd();
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

  public log(scope: number, ...messages: any): void {
    if ((this._active & scope) === scope) {
      this._wrap(scope, console.log, ...messages)();
    }
  }

  public table(scope: number, ...messages: any): void {
    if ((L._active & scope) === scope) {
      L._wrap(scope, console.table, ...messages)();
    }
  }

  public error(scope: number, ...messages: any): void {
    if ((L._active & scope) === scope) {
      L._wrap(scope, console.error, ...messages)();
    }
  }

  public info(scope: number, ...messages: any): void {
    if ((L._active & scope) === scope) {
      L._wrap(scope, console.info, ...messages)();
    }
  }

  public time(scope: number, ...messages: any): void {
    if ((L._active & scope) === scope) {
      L._wrap(scope, console.time, ...messages)();
    }
  }

  public warn(scope: number, ...messages: any): void {
    if ((L._active & scope) === scope) {
      L._wrap(scope, console.warn, ...messages)();
    }
  }

  public trace(scope: number, ...messages: any): void {
    if ((L._active & scope) === scope) {
      L._wrap(scope, console.trace, ...messages)();
    }
  }

  public ipc(
    channel: string = "mainLog",
    scope: number,
    ...messages: any
  ): void {
    if (window?.contextBridge) {
      window?.contextBridge.send(channel, { ...messages, tag: scope });
    }
  }
}

declare global {
  var L: Logger;
  var SCOPE_COUNT: number;
  interface Window {
    L: Logger;
    SCOPE_COUNT: number;
    contextBridge?: any;
  }
}

globalThis.L = new Logger();

export type { Logger };
