import React, { useState } from 'react';
import { Task } from '../types';
import { evaluateTask, TaskEvaluationResult } from '../utils/testRunner';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Circle,
  Terminal,
  Sparkles,
  Copy,
  Check,
  Code2,
  AlertCircle
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  savedCode?: string;
  onSaveCode?: (taskId: string, code: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isCompleted,
  savedCode,
  onSaveCode,
  onToggleComplete
}) => {
  const [code, setCode] = useState<string>(savedCode !== undefined ? savedCode : task.initialCode);
  const [evaluation, setEvaluation] = useState<TaskEvaluationResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tests' | 'console'>('tests');

  // Sync if savedCode changes externally (e.g. profile switched or progress imported)
  React.useEffect(() => {
    if (savedCode !== undefined) {
      setCode(savedCode);
    } else {
      setCode(task.initialCode);
    }
  }, [savedCode, task.id, task.initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (onSaveCode) {
      onSaveCode(task.id, newCode);
    }
  };

  const handleRunAndTest = () => {
    setIsRunning(true);
    setTimeout(() => {
      const result = evaluateTask(task, code);
      setEvaluation(result);
      setIsRunning(false);

      // Save code on run as well
      if (onSaveCode) {
        onSaveCode(task.id, code);
      }

      // If all tests passed, automatically mark as completed
      if (result.allPassed && !isCompleted) {
        onToggleComplete(task.id);
      }
    }, 120);
  };

  const handleReset = () => {
    setCode(task.initialCode);
    if (onSaveCode) {
      onSaveCode(task.id, task.initialCode);
    }
    setEvaluation(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`task-card-${task.id}`}
      className={`border rounded-xl transition-all duration-200 overflow-hidden bg-white shadow-xs ${
        isCompleted
          ? 'border-emerald-300 ring-1 ring-emerald-200'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="text-slate-400 hover:text-emerald-600 transition-colors focus:outline-hidden"
            title={isCompleted ? 'Отметить как нерешенное' : 'Отметить как решенное'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                Задача {task.topicId}.{task.number}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                {task.frontendContext}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mt-1">
              {task.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Все тесты пройдены
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Frontend Scenario Callout */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-lg text-sm text-blue-900 leading-relaxed">
          <span className="font-semibold text-blue-950 block mb-1">
            💼 Контекст работы фронтенд-разработчика:
          </span>
          {task.frontendScenario}
        </div>

        {/* Task Description */}
        <div className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <span className="text-slate-900 font-bold block mb-1">📌 Твое задание:</span>
          {task.description}
        </div>

        {/* Variable Naming Guidance (Crucial for beginners) */}
        <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-lg text-sm text-amber-950 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Sparkles className="w-4.5 h-4.5 text-amber-600 shrink-0" />
              <span>💡 Подсказка для начинающего: как назвать переменную и почему</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 border border-amber-300">
              {task.variableNamingTip.style}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            <span className="text-xs text-amber-800 font-medium">Рекомендуемое имя:</span>
            <code className="px-2 py-0.5 bg-white text-amber-950 rounded-md font-mono text-xs font-bold border border-amber-300 shadow-2xs">
              {task.variableNamingTip.recommendedName}
            </code>
            <span className="text-xs text-amber-800 font-medium">Ключевое слово:</span>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
              {task.variableNamingTip.keyword}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed pt-1">
            {task.variableNamingTip.why}
          </p>
        </div>

        {/* Syntax Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Ключевой синтаксис:</span>
          {task.syntaxTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Code Editor Area */}
        <div className="rounded-lg border border-slate-700 bg-slate-900 overflow-hidden shadow-xs">
          <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="ml-2 text-slate-300 font-medium flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                script.js (редактор кода)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="hover:text-white flex items-center gap-1 text-slate-400 px-2 py-0.5 rounded hover:bg-slate-700 transition-colors"
                title="Скопировать код"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Скопировано' : 'Копировать'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            rows={Math.max(5, code.split('\n').length + 1)}
            spellCheck={false}
            className="w-full bg-slate-900 text-emerald-300 p-3 sm:p-4 font-mono text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500 resize-y leading-relaxed"
            placeholder="Напишите ваш код решения здесь..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRunAndTest}
              disabled={isRunning}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-xs active:scale-98 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isRunning ? 'Проверка тестов...' : 'Запустить и проверить тесты'}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
              title="Сбросить код к начальному условию"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Сбросить</span>
            </button>
          </div>
        </div>

        {/* Test Results & Output Panel */}
        {evaluation && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            {/* Overall Verdict Banner */}
            <div
              className={`p-3 sm:p-4 flex items-center justify-between gap-3 border-b ${
                evaluation.allPassed
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {evaluation.allPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className="font-bold text-sm sm:text-base">
                  {evaluation.allPassed
                    ? '🎉 Отлично! Все тесты пройдены успешно!'
                    : `⚠️ Не все тесты пройдены (${evaluation.passCount} из ${evaluation.totalCount})`}
                </span>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center gap-1 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'tests'
                      ? evaluation.allPassed
                        ? 'bg-white text-emerald-900'
                        : 'bg-rose-600 text-white'
                      : evaluation.allPassed
                      ? 'text-white/80 hover:bg-emerald-600'
                      : 'text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Тесты ({evaluation.passCount}/{evaluation.totalCount})
                </button>
                <button
                  onClick={() => setActiveTab('console')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'console'
                      ? evaluation.allPassed
                        ? 'bg-white text-emerald-900'
                        : 'bg-rose-600 text-white'
                      : evaluation.allPassed
                      ? 'text-white/80 hover:bg-emerald-600'
                      : 'text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Консоль ({evaluation.logs.length})
                </button>
              </div>
            </div>

            {/* Tab: Test Cases Checklist */}
            {activeTab === 'tests' && (
              <div className="p-4 space-y-2.5 bg-slate-50/50">
                {evaluation.executionError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-mono text-rose-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Синтаксическая ошибка при выполнении:</span>
                      {evaluation.executionError}
                    </div>
                  </div>
                )}

                {evaluation.testResults.map((test, index) => (
                  <div
                    key={test.id}
                    className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start justify-between gap-3 ${
                      test.passed
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : 'bg-rose-50/60 border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {test.passed ? (
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          <span>Тест {index + 1}: {test.title}</span>
                          <span
                            className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${
                              test.passed
                                ? 'bg-emerald-200/70 text-emerald-800'
                                : 'bg-rose-200/70 text-rose-800'
                            }`}
                          >
                            {test.passed ? 'Пройден' : 'Ошибка'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{test.message}</p>
                        {!test.passed && (
                          <div className="mt-1.5 text-xs font-mono bg-white p-2 rounded border border-rose-200 space-y-1">
                            <div>
                              <span className="text-slate-500 font-sans">Ожидалось: </span>
                              <span className="text-slate-900">{test.expected}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-sans">Получено: </span>
                              <span className="text-rose-700">{test.actual || '(пусто)'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Terminal Log Output */}
            {activeTab === 'console' && (
              <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-2">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    Вывод console.log:
                  </span>
                  <span className="text-[11px] text-slate-500">stdout</span>
                </div>

                {evaluation.logs.length === 0 ? (
                  <div className="text-slate-500 italic py-2">
                    (в консоль ничего не было выведено)
                  </div>
                ) : (
                  evaluation.logs.map((log, idx) => (
                    <div key={idx} className="text-emerald-400 whitespace-pre-wrap">
                      {log}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
