import React, { useState, useRef } from 'react';
import { UserProfile, StudentProgressData } from '../types';
import {
  User,
  LogOut,
  Download,
  Upload,
  UserPlus,
  Check,
  RotateCcw,
  X,
  FileCheck,
  ShieldCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import {
  createProfile,
  saveProfiles,
  setActiveProfileId,
  exportProgressToFile,
  parseProgressFromFile
} from '../utils/studentStorage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile | null;
  allProfiles: UserProfile[];
  progressData: StudentProgressData;
  onProfileChanged: (profile: UserProfile) => void;
  onProgressImported: (data: StudentProgressData) => void;
  onResetProgress: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  allProfiles,
  progressData,
  onProfileChanged,
  onProgressImported,
  onResetProgress
}) => {
  const [newName, setNewName] = useState<string>('');
  const [editingName, setEditingName] = useState<string>(currentProfile?.name || '');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(!currentProfile);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const profile = createProfile(newName.trim());
    onProfileChanged(profile);
    setNewName('');
    setIsCreatingNew(false);
  };

  const handleSelectProfile = (profile: UserProfile) => {
    setActiveProfileId(profile.id);
    onProfileChanged(profile);
    setIsCreatingNew(false);
  };

  const handleSaveEditedName = () => {
    if (!currentProfile || !editingName.trim()) return;
    const updated = { ...currentProfile, name: editingName.trim() };
    const list = allProfiles.map((p) => (p.id === currentProfile.id ? updated : p));
    saveProfiles(list);
    onProfileChanged(updated);
    setIsEditing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = parseProgressFromFile(content);
        onProgressImported(data);
        setImportSuccess(`Успешно восстановлен прогресс для: ${data.profile.name}!`);
        setTimeout(() => {
          setImportSuccess(null);
          onClose();
        }, 1500);
      } catch (err: unknown) {
        setImportError(err instanceof Error ? err.message : 'Ошибка при чтении файла');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const completedCount = progressData.completedTaskIds.length;
  const writtenCodesCount = Object.keys(progressData.userCodeMap || {}).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <User className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {currentProfile ? 'Профиль обучающегося' : 'Вход в тренажер'}
              </h3>
              <p className="text-xs text-slate-500">
                100% клиентское хранение (работает на GitHub Pages без бэкенда)
              </p>
            </div>
          </div>
          {currentProfile && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Active Profile Info */}
          {currentProfile && !isCreatingNew ? (
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-tr ${currentProfile.avatarColor} text-white font-bold text-lg flex items-center justify-center shadow-sm`}
                  >
                    {currentProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="px-2.5 py-1 text-sm border rounded bg-white text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                          onClick={handleSaveEditedName}
                          className="px-2 py-1 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700"
                        >
                          Сохранить
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">
                          {currentProfile.name}
                        </span>
                        <button
                          onClick={() => {
                            setEditingName(currentProfile.name);
                            setIsEditing(true);
                          }}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          Изменить
                        </button>
                      </div>
                    )}
                    <span className="text-xs text-slate-500 block">
                      Локальный ID: {currentProfile.id}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-medium text-slate-500 block">Решено задач:</span>
                  <span className="text-lg font-bold text-emerald-600">
                    {completedCount} / 50
                  </span>
                </div>
              </div>

              {/* Progress Summary Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Решенных задач:</span>
                  <span className="font-bold text-emerald-600 font-mono">{completedCount}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Сохраненных решений:</span>
                  <span className="font-bold text-indigo-600 font-mono">{writtenCodesCount}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Creation Form */
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl text-xs sm:text-sm text-blue-900 leading-relaxed">
                <span className="font-semibold text-blue-950 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Автономный режим (Offline / GitHub Pages):
                </span>
                Все ваши решения, прогресс и написанный код сохраняются в локальном хранилище вашего браузера. Никаких серверов или регистрации не требуется.
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ваше имя или никнейм:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: Иван Иванов или student_frontend"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{currentProfile ? 'Создать профиль' : 'Начать обучение'}</span>
                </button>
                {currentProfile && (
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Switch Profile List (if multiple exist) */}
          {allProfiles.length > 1 && !isCreatingNew && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <span>Сменить профиль на этом устройстве:</span>
                <button
                  onClick={() => setIsCreatingNew(true)}
                  className="text-indigo-600 hover:text-indigo-700 capitalize font-medium flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  + Новый
                </button>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                {allProfiles.map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => handleSelectProfile(prof)}
                    className={`w-full p-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors ${
                      prof.id === currentProfile?.id
                        ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-tr ${prof.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}
                      >
                        {prof.name.charAt(0)}
                      </div>
                      <span>{prof.name}</span>
                    </div>
                    {prof.id === currentProfile?.id && (
                      <Check className="w-4 h-4 text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Backup / Export / Import file section */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Сохранение и перенос прогресса (Файл JSON):
            </h4>

            {importSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{importSuccess}</span>
              </div>
            )}

            {importError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => exportProgressToFile(progressData)}
                className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium flex items-center gap-2.5 transition-colors text-left"
                title="Скачать файл со всеми решениями"
              >
                <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Скачать файл</span>
                  <span className="text-[11px] text-slate-500">Сохранить прогресс в .json</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium flex items-center gap-2.5 transition-colors text-left"
                title="Восстановить прогресс из скачанного ранее файла"
              >
                <div className="w-8 h-8 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Загрузить файл</span>
                  <span className="text-[11px] text-slate-500">Восстановить из .json</span>
                </div>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <p className="text-[11px] text-slate-400">
              💡 Файл .json содержит историю решенных задач и написанный вами код. Вы можете перенести его на другой компьютер или отправить наставнику.
            </p>
          </div>

          {/* Reset Progress Danger Zone */}
          {currentProfile && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onResetProgress}
                className="text-xs text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Сбросить прогресс текущего профиля
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          {currentProfile && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Закрыть
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
