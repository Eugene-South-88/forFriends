import { useState } from 'react';
import { StudentProgressData } from '../types';
import { generateShareUrl } from '../utils/shareUtils';
import { exportProgressToFile } from '../utils/studentStorage';
import {
  Share2,
  Copy,
  Check,
  FileDown,
  ExternalLink,
  X,
  Send,
  Sparkles,
  Info
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  progressData: StudentProgressData;
}

export function ShareModal({ isOpen, onClose, progressData }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = generateShareUrl(progressData);
  const completedCount = progressData.completedTaskIds.length;
  const codesCount = Object.keys(progressData.userCodeMap || {}).length;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const input = document.getElementById('share-url-input') as HTMLInputElement;
      if (input) {
        input.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const handleDownloadJson = () => {
    exportProgressToFile(progressData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Отправить прогресс наставнику
              </h3>
              <p className="text-xs text-slate-500">
                Обучающийся: <span className="font-semibold text-slate-700">{progressData.profile.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Pill */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block">Выполнено задач</span>
            <span className="text-base font-extrabold text-indigo-700 font-mono">
              {completedCount} / 50
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Сохранено решений</span>
            <span className="text-base font-extrabold text-emerald-700 font-mono">
              {codesCount} задач
            </span>
          </div>
        </div>

        {/* Method 1: Share Link */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-indigo-600" />
              Прямая ссылка для наставника (быстро)
            </label>
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Работает дистанционно
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Отправьте эту ссылку преподавателю в Telegram, WhatsApp или Discord. Наставник сразу откроет ваш написанный код и результаты тестов:
          </p>

          <div className="flex gap-2">
            <input
              id="share-url-input"
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-mono rounded-xl px-3 py-2 outline-hidden truncate"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Скопировано!' : 'Скопировать'}</span>
            </button>
          </div>
        </div>

        {/* Method 2: Download JSON file */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileDown className="w-3.5 h-3.5 text-slate-600" />
              Или отправить файлом прогресса (.json)
            </label>
          </div>
          <p className="text-xs text-slate-500">
            Скачайте файл и прикрепите к сообщению или домашнему заданию.
          </p>
          <button
            onClick={handleDownloadJson}
            className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <FileDown className="w-4 h-4 text-slate-600" />
            <span>Скачать js-progress-{progressData.profile.name}.json</span>
          </button>
        </div>

        {/* Info Note */}
        <div className="flex items-start gap-2 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            Все данные сжаты и передаются безопасно. Преподаватель сможет запустить тесты по каждому вашему решению и проверить корректность именования переменных.
          </span>
        </div>
      </div>
    </div>
  );
}
