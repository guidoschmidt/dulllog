type LogLevelObject = {
  [key: number]: string;
};

// export type L = {
//   active: number;
//   scope: string;
//   levels: LogLevelObject;

//   _wrap: (lvl: number, logFn: Function, ...messages: any) => Function;

//   setLogLevels: (levels: Array<string>) => void;
//   enable: (lvl: number) => void;
//   disable: (lvl: number) => void;
//   mute: () => void;
//   verbose: () => void;

//   log: (lvl: number, ...messages: any) => void;
//   table: (lvl: number, ...messages: any) => void;
//   error: (lvl: number, ...messages: any) => void;
//   info: (lvl: number, ...messages: any) => void;
//   time: (lvl: number, ...messages: any) => void;
//   warn: (lvl: number, ...messages: any) => void;
//   trace: (lvl: number, ...messages: any) => void;

//   [key: string]: number | Function | LogLevelObject;
// };
