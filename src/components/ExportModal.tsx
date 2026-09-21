import React, { useState } from 'react';
import { Task } from '../types';
import { X, Copy, Check, Download, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  activeTopicTitle: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  tasks,
  activeTopicTitle
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    let md = `# Практические задачи: ${activeTopicTitle}\n\n`;
    md += `*Сгенерировано по материалам лекции МФТИ «Основы программирования на JavaScript»*\n\n`;

    tasks.forEach((t) => {
      md += `## Задача ${t.topicId}.${t.number}: ${t.title}\n`;
      md += `**Контекст фронтенда:** ${t.frontendContext}\n\n`;
      md += `> ${t.frontendScenario}\n\n`;
      md += `**Задание:** ${t.description}\n\n`;
      md += `**💡 Как назвать переменную и почему:**\n`;
      md += `- Имя: \`${t.variableNamingTip.recommendedName}\` (${t.variableNamingTip.style})\n`;
      md += `- Обоснование: ${t.variableNamingTip.why}\n\n`;
      md += `**Синтаксис:** ${t.syntaxTags.map((s) => `\`${s}\``).join(', ')}\n\n`;
      md += `### Шаблон для решения:\n\`\`\`javascript\n${t.initialCode}\`\`\`\n\n`;
      md += `### Эталонное решение:\n\`\`\`javascript\n${t.solutionCode}\`\`\`\n\n`;
      md += `**Объяснение:** ${t.explanation}\n\n`;
      md += `---\n\n`;
    });

    return md;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generateMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `javascript-tasks-topic-${tasks[0]?.topicId || 'all'}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Экспорт заданий в Markdown
              </h2>
              <p className="text-xs text-slate-500">
                Скопируйте для конспекта в Notion, Obsidian или отправки ментору
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-4 overflow-y-auto font-mono text-xs text-slate-700 bg-slate-50 border-y border-slate-200 select-all">
          <pre className="whitespace-pre-wrap">{generateMarkdown().slice(0, 1500)}...</pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Готово к экспорту: {tasks.length} задач
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Скопировано!' : 'Скопировать Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Скачать .md файл</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
