import { Task } from '../types';
import { executeJsCode } from './codeRunner';

export interface TestResultItem {
  id: string;
  title: string;
  expected: string;
  actual: string;
  passed: boolean;
  message: string;
}

export interface TaskEvaluationResult {
  logs: string[];
  executionError?: string;
  testResults: TestResultItem[];
  allPassed: boolean;
  passCount: number;
  totalCount: number;
}

export function evaluateTask(task: Task, code: string): TaskEvaluationResult {
  const { output: logs, error: executionError } = executeJsCode(code);

  const testResults: TestResultItem[] = task.testCases.map((tc) => {
    try {
      const res = tc.validate(logs, code, executionError);
      return {
        id: tc.id,
        title: tc.title,
        expected: tc.expected,
        actual: res.actual,
        passed: res.passed,
        message: res.message
      };
    } catch (err: unknown) {
      return {
        id: tc.id,
        title: tc.title,
        expected: tc.expected,
        actual: 'Ошибка при выполнении теста',
        passed: false,
        message: err instanceof Error ? err.message : String(err)
      };
    }
  });

  const passCount = testResults.filter((r) => r.passed).length;
  const totalCount = testResults.length;
  const allPassed = !executionError && passCount === totalCount && totalCount > 0;

  return {
    logs,
    executionError,
    testResults,
    allPassed,
    passCount,
    totalCount
  };
}
