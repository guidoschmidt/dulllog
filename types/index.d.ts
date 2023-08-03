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
declare class Logger {
    [key: string]: any;
    private _active;
    private _scopes;
    private _scopeMap;
    constructor();
    extend(scope: string, prefix?: string, color?: string): ExtendedLogger;
    private addScope;
    private _wrap;
    only(scope: number): void;
    enable(scope: number): void;
    disable(scope: number): void;
    mute(): void;
    verbose(): void;
}
declare global {
    var L: Logger;
    interface Window {
        L: Logger;
        contextBridge?: any;
    }
}
export type { Logger };
//# sourceMappingURL=index.d.ts.map