import { useState, useEffect, useMemo, useCallback } from 'react';
import { TopicId, UserProfile, StudentProgressData } from './types';
import { topicsInfo, allTasks } from './data/topics';
import { TaskCard } from './components/TaskCard';
import { CheatsheetModal } from './components/CheatsheetModal';
import { ExportModal } from './components/ExportModal';
import { AuthModal } from './components/AuthModal';
import { ShareModal } from './components/ShareModal';
import { MentorDashboard } from './components/MentorDashboard';
import {
  getStoredProfiles,
  getActiveProfileId,
  setActiveProfileId,
  getProgressForUser,
  saveProgressForUser,
  createProfile,
  exportProgressToFile
} from './utils/studentStorage';
import { parseShareUrl } from './utils/shareUtils';
import {
  Terminal,
  FileCode,
  Layers,
  Calculator,
  FileText,
  BookOpen,
  Search,
  RotateCcw,
  Sparkles,
  Download,
  Upload,
  GraduationCap,
  User,
  Save,
  CheckCircle2,
  FileDown,
  Share2,
  Users,
  Send
} from 'lucide-react';

const TOPIC_ICONS: Record<TopicId, React.ReactNode> = {
  1: <Terminal className="w-4 h-4" />,
  2: <FileCode className="w-4 h-4" />,
  3: <Layers className="w-4 h-4" />,
  4: <Calculator className="w-4 h-4" />,
  5: <FileText className="w-4 h-4" />
};

export default function App() {
  const [viewMode, setViewMode] = useState<'student' | 'mentor'>('student');
  const [importedStudentFromUrl, setImportedStudentFromUrl] = useState<StudentProgressData | null>(null);

  const [selectedTopic, setSelectedTopic] = useState<TopicId>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved'>('all');

  // Student Profiles & Client Auth state
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>(() => getStoredProfiles());
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(() => {
    const list = getStoredProfiles();
    const activeId = getActiveProfileId();
    if (activeId) {
      const found = list.find((p) => p.id === activeId);
      if (found) return found;
    }
    // If profiles exist, pick first, otherwise create or prompt
    if (list.length > 0) {
      setActiveProfileId(list[0].id);
      return list[0];
    }
    // Auto-create initial default student profile
    const initial = createProfile('Обучающийся');
    return initial;
  });

  const [progressData, setProgressData] = useState<StudentProgressData>(() => {
    const activeId = currentProfile?.id || 'default_user';
    return getProgressForUser(activeId);
  });

  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [showSaveToast, setShowSaveToast] = useState<boolean>(false);

  // Check URL on load for #review=...
  useEffect(() => {
    const hash = window.location.hash || window.location.search;
    const parsed = parseShareUrl(hash);
    if (parsed) {
      setImportedStudentFromUrl(parsed);
      setViewMode('mentor');
    }
  }, []);

  // Sync profile when changed
  useEffect(() => {
    if (currentProfile) {
      const data = getProgressForUser(currentProfile.id);
      setProgressData(data);
      setAllProfiles(getStoredProfiles());
    }
  }, [currentProfile]);

  // Handle saving student code per task
  const handleSaveTaskCode = useCallback(
    (taskId: string, code: string) => {
      if (!currentProfile) return;
      setProgressData((prev) => {
        const nextCodeMap = {
          ...prev.userCodeMap,
          [taskId]: code
        };
        const updated: StudentProgressData = {
          ...prev,
          userCodeMap: nextCodeMap
        };
        saveProgressForUser(updated);
        return updated;
      });
    },
    [currentProfile]
  );

  // Toggle completed state
  const toggleTaskComplete = useCallback(
    (taskId: string) => {
      if (!currentProfile) return;
      setProgressData((prev) => {
        const set = new Set(prev.completedTaskIds);
        if (set.has(taskId)) {
          set.delete(taskId);
        } else {
          set.add(taskId);
        }
        const updated: StudentProgressData = {
          ...prev,
          completedTaskIds: Array.from(set)
        };
        saveProgressForUser(updated);
        return updated;
      });
    },
    [currentProfile]
  );

  const handleProfileChanged = (profile: UserProfile) => {
    setCurrentProfile(profile);
    const data = getProgressForUser(profile.id);
    setProgressData(data);
    setAllProfiles(getStoredProfiles());
  };

  const handleProgressImported = (importedData: StudentProgressData) => {
    // Add/update imported profile in allProfiles
    const currentList = getStoredProfiles();
    const existingIdx = currentList.findIndex((p) => p.id === importedData.profile.id);
    let updatedList = [...currentList];
    if (existingIdx >= 0) {
      updatedList[existingIdx] = importedData.profile;
    } else {
      updatedList.push(importedData.profile);
    }
    localStorage.setItem('js_trainer_profiles', JSON.stringify(updatedList));
    setActiveProfileId(importedData.profile.id);

    // Save progress data
    saveProgressForUser(importedData);
    setAllProfiles(updatedList);
    setCurrentProfile(importedData.profile);
    setProgressData(importedData);

    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  const handleResetProgress = () => {
    if (!currentProfile) return;
    if (
      window.confirm(
        `Вы уверены, что хотите сбросить прогресс и весь написанный код для профиля «${currentProfile.name}»?`
      )
    ) {
      const resetData: StudentProgressData = {
        version: 1,
        profile: currentProfile,
        completedTaskIds: [],
        userCodeMap: {},
        lastUpdated: new Date().toISOString()
      };
      saveProgressForUser(resetData);
      setProgressData(resetData);
    }
  };

  const handleDownloadBackup = () => {
    exportProgressToFile(progressData);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  // Set of completed task IDs for fast lookup
  const completedIds = useMemo(
    () => new Set(progressData.completedTaskIds),
    [progressData.completedTaskIds]
  );

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      // Must match topic unless searching across all
      const matchesTopic = searchQuery.trim() ? true : task.topicId === selectedTopic;
      if (!matchesTopic) return false;

      // Status filter
      const isCompleted = completedIds.has(task.id);
      if (statusFilter === 'solved' && !isCompleted) return false;
      if (statusFilter === 'unsolved' && isCompleted) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = task.description.toLowerCase().includes(query);
        const matchesScenario = task.frontendScenario.toLowerCase().includes(query);
        const matchesNaming = task.variableNamingTip.recommendedName.toLowerCase().includes(query);
        const matchesTags = task.syntaxTags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesDescription || matchesScenario || matchesNaming || matchesTags;
      }

      return true;
    });
  }, [selectedTopic, searchQuery, statusFilter, completedIds]);

  // Overall Stats
  const totalTasksCount = allTasks.length;
  const completedTotalCount = completedIds.size;
  const overallPercentage = Math.round((completedTotalCount / totalTasksCount) * 100);

  // Current Topic info
  const currentTopic = topicsInfo.find((t) => t.id === selectedTopic) || topicsInfo[0];

  // If in Mentor Mode, render MentorDashboard
  if (viewMode === 'mentor') {
    return (
      <MentorDashboard
        onExit={() => setViewMode('student')}
        initialImportedStudent={importedStudentFromUrl}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-xl shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Тренажер JavaScript
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  МФТИ: Тема 3
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hidden md:inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  GitHub Pages ready
                </span>
              </div>
              <p className="text-xs text-slate-500">
                50 задач для фронтендера с правилами нейминга, автотестами и сохранением кода
              </p>
            </div>
          </div>

          {/* Quick Actions & Student Profile Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Student Auth / Profile Pill Button */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-xs"
              title="Открыть профиль обучающегося и управление сохранением"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-tr ${
                  currentProfile?.avatarColor || 'from-indigo-500 to-purple-600'
                } text-white flex items-center justify-center text-xs font-bold shadow-2xs`}
              >
                {currentProfile?.name ? currentProfile.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
              </div>
              <span className="font-bold text-slate-900 max-w-[120px] truncate">
                {currentProfile?.name || 'Вход'}
              </span>
              <span className="text-[11px] bg-white px-1.5 py-0.2 rounded border border-slate-200 text-indigo-700 font-mono font-bold">
                {completedTotalCount}/50
              </span>
            </button>

            {/* Send to Mentor button (Remote Share) */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              title="Отправить прогресс и код наставнику дистанционно"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Отправить наставнику</span>
            </button>

            {/* Mentor Mode Switcher Button */}
            <button
              onClick={() => setViewMode('mentor')}
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Перейти в кабинет наставника для проверки работ"
            >
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Кабинет наставника</span>
            </button>

            {/* Cheatsheet Modal Button */}
            <button
              onClick={() => setIsCheatsheetOpen(true)}
              className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Шпаргалка</span>
            </button>

            {/* Export Markdown */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
              title="Экспорт задач в Markdown"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Экспорт</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1">
        {/* Save/Export Toast Notification */}
        {showSaveToast && (
          <div className="p-3.5 bg-emerald-500 text-white rounded-xl shadow-md text-xs sm:text-sm font-semibold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Прогресс и написанный код успешно сохранены!</span>
            </div>
          </div>
        )}

        {/* Progress Overview Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Обучающийся: {currentProfile?.name}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {overallPercentage}% завершено
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {Object.keys(progressData.userCodeMap || {}).length} сохраненных решений
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Решено {completedTotalCount} из {totalTasksCount} практических задач
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Все решения, правки в редакторе и результаты тест-кейсов автоматически сохраняются в браузере. Нажмите кнопку <strong>«Отправить наставнику»</strong>, чтобы сформировать прямую ссылку с вашим кодом для дистанционной проверки.
            </p>
          </div>

          <div className="w-full md:w-64 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shrink-0 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Выполнено задач:</span>
              <span className="font-mono font-bold text-indigo-700">
                {completedTotalCount} / {totalTasksCount}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <button
                onClick={() => setIsShareOpen(true)}
                className="text-indigo-600 hover:underline font-bold flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" />
                Поделиться кодом
              </button>
              <button
                onClick={handleDownloadBackup}
                className="text-emerald-700 hover:underline font-medium flex items-center gap-0.5"
              >
                <Save className="w-3 h-3" />
                Сохранить JSON
              </button>
            </div>
          </div>
        </div>

        {/* Topic Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {topicsInfo.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            const topicTasks = allTasks.filter((t) => t.topicId === topic.id);
            const topicCompletedCount = topicTasks.filter((t) => completedIds.has(t.id)).length;
            const topicPercent = Math.round((topicCompletedCount / topicTasks.length) * 100);

            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic.id);
                  setSearchQuery('');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-white ring-2 ring-indigo-100 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {TOPIC_ICONS[topic.id]}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {topicCompletedCount}/{topicTasks.length}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block">
                    Тема {topic.id}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                    {topic.shortTitle}
                  </h3>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${topicPercent}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Topic Banner */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Текущий раздел
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {currentTopic.title}
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              10 интерактивных задач с автотестами
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentTopic.description}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-xs font-semibold text-slate-500">Изучаемые концепции:</span>
            {currentTopic.keyConcepts.map((concept) => (
              <span
                key={concept}
                className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по задачам, синтаксису, именам переменных..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Очистить
              </button>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center bg-slate-200/70 p-1 rounded-xl text-xs font-medium text-slate-600">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'all'
                  ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Все ({allTasks.filter((t) => (searchQuery ? true : t.topicId === selectedTopic)).length})
            </button>
            <button
              onClick={() => setStatusFilter('unsolved')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'unsolved'
                  ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              К решению
            </button>
            <button
              onClick={() => setStatusFilter('solved')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === 'solved'
                  ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Решенные
            </button>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="space-y-5">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
              <p className="text-slate-500 text-sm">
                По вашему фильтру или поисковому запросу ничего не найдено.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Сбросить фильтры поиска
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isCompleted={completedIds.has(task.id)}
                savedCode={progressData.userCodeMap ? progressData.userCodeMap[task.id] : undefined}
                onSaveCode={handleSaveTaskCode}
                onToggleComplete={toggleTaskComplete}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500 space-y-1">
        <p>
          Учебный тренажер разработан по материалам лекции{' '}
          <strong>Тема 3: «Основы программирования на JavaScript» (МФТИ)</strong>
        </p>
        <p>
          100% клиентское выполнение без бэкенда — полностью совместимо с GitHub Pages. Прогресс сохраняется в localStorage и переносится через JSON или прямые ссылки для наставника.
        </p>
      </footer>

      {/* Share with Mentor Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        progressData={progressData}
      />

      {/* Student Auth & Progress Management Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentProfile={currentProfile}
        allProfiles={allProfiles}
        progressData={progressData}
        onProfileChanged={handleProfileChanged}
        onProgressImported={handleProgressImported}
        onResetProgress={handleResetProgress}
      />

      {/* Cheatsheet Modal */}
      <CheatsheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
      />

      {/* Markdown Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        tasks={filteredTasks}
        activeTopicTitle={searchQuery ? 'Результаты поиска' : currentTopic.title}
      />
    </div>
  );
}
