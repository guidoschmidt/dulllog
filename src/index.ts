class Logger {
  [key: string]: any;

  private _active: number = 0b0000000000000;
  private _levels: { [key: number]: string } = {};

  private _wrap(lvl: number, logFn: Function, ...messages: any) {
    return () => {
      console.group(`${this._levels[lvl]}`.trim());
      logFn(...messages);
      console.groupEnd();
    };
  }

  public setLogLevels(levels: string[]): void {
    levels.forEach((lvl: string, i: number) => {
      const bitMask = 0b0000000000001 << i;
      this._levels[bitMask] = lvl;
      this[lvl] = bitMask;
    });
  }

  public enable(lvl: number) {
    this._active = this._active | lvl;
  }

  public disable(lvl: number) {
    this._active = this._active & ~lvl;
  }

  public mute() {
    this._active = 0b0000000000000;
  }

  public verbose() {
    this._active = 0b1111111111111;
  }

  public log(lvl: number, ...messages: any) {
    if ((this._active & lvl) === lvl) {
      this._wrap(lvl, console.log, ...messages)();
    }
  }

  public table(lvl: number, ...messages: any): void {
    if ((L._active & lvl) === lvl) {
      L._wrap(lvl, console.table, ...messages)();
    }
  }

  public error(lvl: number, ...messages: any): void {
    if ((L._active & lvl) === lvl) {
      L._wrap(lvl, console.error, ...messages)();
    }
  }

  public info(lvl: number, ...messages: any): void {
    if ((L._active & lvl) === lvl) {
      L._wrap(lvl, console.info, ...messages)();
    }
  }

  public time(lvl: number, ...messages: any): void {
    if ((L._active & lvl) === lvl) {
      L._wrap(lvl, console.time, ...messages)();
    }
  }

  public warn(lvl: number, ...messages: any): void {
    if ((L._active & lvl) === lvl) {
      L._wrap(lvl, console.warn, ...messages)();
    }
  }

  public trace(lvl: number, ...messages: any): void {
    if ((L._active & lvl) === lvl) {
      L._wrap(lvl, console.trace, ...messages)();
    }
  }
}

declare global {
  var L: Logger;
  interface Window {
    L: Logger;
  }
}

const L = new Logger();

window.L = L;
globalThis.L = L;

export { L };
