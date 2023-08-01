declare class Logger {
    [key: string]: any;
    private _active;
    private _levels;
    private _wrap;
    setLogLevels(levels: string[]): void;
    enable(lvl: number): void;
    disable(lvl: number): void;
    mute(): void;
    verbose(): void;
    log(lvl: number, ...messages: any): void;
    table(lvl: number, ...messages: any): void;
    error(lvl: number, ...messages: any): void;
    info(lvl: number, ...messages: any): void;
    time(lvl: number, ...messages: any): void;
    warn(lvl: number, ...messages: any): void;
    trace(lvl: number, ...messages: any): void;
}
declare global {
    var L: Logger;
    interface Window {
        L: Logger;
    }
}
declare const L: Logger;
export { L };
//# sourceMappingURL=index.d.ts.map