declare class Logger {
    [key: string]: any;
    private _active;
    private _scopes;
    _scopeMap: {
        [key: string]: number;
    };
    constructor();
    extend(scope: string): void;
    private addScope;
    private _wrap;
    only(scope: number): void;
    enable(scope: number): void;
    disable(scope: number): void;
    mute(): void;
    verbose(): void;
    log(scope: number, ...messages: any): void;
    table(scope: number, ...messages: any): void;
    error(scope: number, ...messages: any): void;
    info(scope: number, ...messages: any): void;
    time(scope: number, ...messages: any): void;
    warn(scope: number, ...messages: any): void;
    trace(scope: number, ...messages: any): void;
    ipc(channel: string | undefined, scope: number, ...messages: any): void;
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
export type { Logger };
//# sourceMappingURL=index.d.ts.map