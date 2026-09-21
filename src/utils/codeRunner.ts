export interface RunResult {
  output: string[];
  error?: string;
}

export function executeJsCode(code: string): RunResult {
  const logs: string[] = [];

  const customConsole = {
    log: (...args: unknown[]) => {
      const line = args
        .map((arg) => {
          if (arg === null) return 'null';
          if (arg === undefined) return 'undefined';
          if (typeof arg === 'symbol') return arg.toString();
          if (typeof arg === 'bigint') return `${arg}n`;
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(' ');
      logs.push(line);
    },
    clear: () => {
      logs.length = 0;
      logs.push('[Консоль очищена]');
    },
    error: (...args: unknown[]) => {
      logs.push(`[ОШИБКА]: ${args.map(String).join(' ')}`);
    },
    info: (...args: unknown[]) => {
      logs.push(`[ИНФО]: ${args.map(String).join(' ')}`);
    }
  };

  try {
    // Provide safe sandbox with custom console
    const runner = new Function(
      'console',
      'alert',
      `"use strict";
      ${code}
      `
    );

    const customAlert = (msg: unknown) => {
      logs.push(`[ALERT БРАУЗЕРА]: ${String(msg)}`);
    };

    runner(customConsole, customAlert);

    return {
      output: logs.length > 0 ? logs : ['(Код выполнен успешно, вывод в консоль пуст)']
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    return {
      output: logs,
      error: errorMsg
    };
  }
}
