import React from 'react';
import { X, BookOpen, AlertTriangle, CheckCircle, Code2, Sparkles } from 'lucide-react';

interface CheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatsheetModal: React.FC<CheatsheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Шпаргалка фронтендера: Основы JavaScript
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Ключевой синтаксис и конспект правил из курса МФТИ (Тема 3)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-800">
          {/* Section 1: Naming & Scope */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              1. Именование переменных и выбор const / let / var
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                <span className="font-bold text-indigo-700 block">camelCase (Стандарт JS):</span>
                <p className="text-slate-600">
                  Первое слово с маленькой буквы, каждое последующее — с большой:
                </p>
                <code className="block bg-slate-100 p-1.5 rounded font-mono text-xs text-slate-800">
                  const userName = "Алиса";<br />
                  let cartItemsCount = 5;<br />
                  const isLoading = false;
                </code>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                <span className="font-bold text-purple-700 block">UPPER_SNAKE_CASE (Хардкод-константы):</span>
                <p className="text-slate-600">
                  Только для глобальных настроек, известных до запуска проекта:
                </p>
                <code className="block bg-slate-100 p-1.5 rounded font-mono text-xs text-slate-800">
                  const API_BASE_URL = "https://...";<br />
                  const MAX_RETRY_COUNT = 3;<br />
                  const DEFAULT_TIMEOUT_MS = 5000;
                </code>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Золотое правило современного JS:</strong> Всегда используйте <code className="font-bold">const</code> по умолчанию. Используйте <code className="font-bold">let</code> только если переменная будет меняться (счетчик, флаг загрузки, переключатель). Забудьте про <code className="font-bold">var</code> — он игнорирует фигурные скобки блоков <code className="font-bold">{`{}`}</code> и приводит к багам.
              </div>
            </div>
          </div>

          {/* Section 2: 7 Primitives & Type Coercion */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-600" />
              2. 7 Примитивных типов данных и оператор typeof
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse bg-white rounded-lg overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2.5">Тип</th>
                    <th className="p-2.5">Пример</th>
                    <th className="p-2.5">typeof результат</th>
                    <th className="p-2.5">Для чего во фронтенде</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  <tr>
                    <td className="p-2 font-bold text-indigo-700">Number</td>
                    <td className="p-2">42, 3.14, Infinity, NaN</td>
                    <td className="p-2 text-emerald-700">"number"</td>
                    <td className="p-2 font-sans">Цены, ID, размеры элементов, миллисекунды</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-indigo-700">String</td>
                    <td className="p-2">"Привет", `Шаблон ${'{x}'}`</td>
                    <td className="p-2 text-emerald-700">"string"</td>
                    <td className="p-2 font-sans">Тексты карточек, url, html-классы</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-indigo-700">Boolean</td>
                    <td className="p-2">true, false</td>
                    <td className="p-2 text-emerald-700">"boolean"</td>
                    <td className="p-2 font-sans">Флаги видимости модалок, состояние loading</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-indigo-700">undefined</td>
                    <td className="p-2">let a; (не присвоено)</td>
                    <td className="p-2 text-emerald-700">"undefined"</td>
                    <td className="p-2 font-sans">Значение еще не получено с сервера</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-indigo-700">null</td>
                    <td className="p-2">const avatar = null;</td>
                    <td className="p-2 text-rose-600 font-bold">"object" (особенность JS!)</td>
                    <td className="p-2 font-sans">Намеренное отсутствие объекта (пустой профиль)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-indigo-700">BigInt</td>
                    <td className="p-2">9007199254740995n</td>
                    <td className="p-2 text-emerald-700">"bigint"</td>
                    <td className="p-2 font-sans">Криптовалюты, банковские транзакции 64-бит</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-indigo-700">Symbol</td>
                    <td className="p-2">Symbol("id")</td>
                    <td className="p-2 text-emerald-700">"symbol"</td>
                    <td className="p-2 font-sans">Уникальные скрытые ключи в стейт-менеджерах</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs leading-relaxed text-blue-950">
              <strong>Секреты приведения типов:</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li><code className="font-bold">+val</code> — самый быстрый способ превратить строку инпута в число (<code>+"100" // 100</code>).</li>
                <li><code className="font-bold">"5" + 3 // "53"</code> (сложение склеивает строки), но <code className="font-bold">"5" - 3 // 2</code> (вычитание превращает в число).</li>
                <li><code className="font-bold">'b' + 'a' + + 'a' + 'a' // 'baNaNa'</code> — потому что <code className="font-bold">+'a'</code> дает <code className="font-bold">NaN</code>.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Math and Strings */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Объект Math и арифметика
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700 font-mono">
                <li>Math.round(4.7) → 5 (ближайшее)</li>
                <li>Math.floor(4.7) → 4 (вниз)</li>
                <li>Math.ceil(4.3) → 5 (вверх, для пагинации)</li>
                <li>Math.random() → от 0 до 1</li>
                <li>Math.floor(Math.random() * (max - min + 1)) + min</li>
                <li>a++ vs ++a: постфикс возвращает старое, префикс — новое</li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Главные методы строк
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700 font-mono">
                <li>str.length → длина строки</li>
                <li>str.toLowerCase() / toUpperCase()</li>
                <li>str.includes("sub") → true/false</li>
                <li>str.indexOf("sub") → индекс или -1</li>
                <li>str.slice(0, 10) → срез символов</li>
                <li>str.trim() → удаление пробелов с краев</li>
                <li>str.split(", ") → разбиение в массив</li>
                <li>str.replace("a", "b") → замена текста</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
