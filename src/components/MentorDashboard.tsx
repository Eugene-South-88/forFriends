import { useState, useMemo, useEffect } from 'react';
import {
  ReviewedStudentItem,
  MentorFeedback,
  Task,
  TopicId,
  StudentProgressData
} from '../types';
import { allTasks, topicsInfo } from '../data/topics';
import {
  getReviewedStudents,
  saveReviewedStudent,
  deleteReviewedStudent,
  getMentorFeedback,
  saveMentorFeedback,
  exportMentorReviewMarkdown,
  parseShareUrl
} from '../utils/shareUtils';
import {
  Users,
  GraduationCap,
  ArrowLeft,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Sparkles,
  Trash2,
  Calendar,
  Code2,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MentorDashboardProps {
  onExit: () => void;
  initialImportedStudent?: StudentProgressData | null;
}

export function MentorDashboard({
  onExit,
  initialImportedStudent
}: MentorDashboardProps) {
  const [students, setStudents] = useState<ReviewedStudentItem[]>(() => {
    const list = getReviewedStudents();
    return list;
  });

  const [activeStudentId, setActiveStudentId] = useState<string | null>(() => {
    if (initialImportedStudent) {
      return initialImportedStudent.profile.id;
    }
    const list = getReviewedStudents();
    return list.length > 0 ? list[0].id : null;
  });

  // Handle new student arriving from link
  useEffect(() => {
    if (initialImportedStudent) {
      const saved = saveReviewedStudent(initialImportedStudent);
      setStudents(getReviewedStudents());
      setActiveStudentId(saved.id);
    }
  }, [initialImportedStudent]);

  // Selected student
  const activeStudent = useMemo(() => {
    return students.find((s) => s.id === activeStudentId) || students[0] || null;
  }, [students, activeStudentId]);

  // Feedback for active student
  const [feedback, setFeedback] = useState<MentorFeedback>(() => {
    if (!activeStudent) {
      return { studentId: '', notes: {}, updatedAt: new Date().toISOString() };
    }
    const saved = getMentorFeedback(activeStudent.id);
    return (
      saved || {
        studentId: activeStudent.id,
        notes: {},
        updatedAt: new Date().toISOString()
      }
    );
  });

  useEffect(() => {
    if (activeStudent) {
      const saved = getMentorFeedback(activeStudent.id);
      setFeedback(
        saved || {
          studentId: activeStudent.id,
          notes: {},
          updatedAt: new Date().toISOString()
        }
      );
    }
  }, [activeStudent?.id]);

  // Filter and search
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'hasCode' | 'solved' | 'notStarted'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expanded tasks in inspector
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});

  // Test execution state per task
  const [testResults, setTestResults] = useState<
    Record<
      string,
      {
        logs: string[];
        error?: string;
        allPassed: boolean;
        cases: { title: string; passed: boolean; actual: string; expected: string; message: string }[];
      }
    >
  >({});

  // Manual link import state
  const [showImportDialog, setShowImportDialog] = useState<boolean>(false);
  const [linkInput, setLinkInput] = useState<string>('');
  const [importError, setImportError] = useState<string | null>(null);

  // General mentor comment save
  const handleGeneralCommentChange = (text: string) => {
    if (!activeStudent) return;
    const updated: MentorFeedback = {
      ...feedback,
      studentId: activeStudent.id,
      generalComment: text,
      updatedAt: new Date().toISOString()
    };
    setFeedback(updated);
    saveMentorFeedback(updated);
  };

  // Task note save
  const handleTaskNoteChange = (taskId: string, note: string) => {
    if (!activeStudent) return;
    const updated: MentorFeedback = {
      ...feedback,
      studentId: activeStudent.id,
      notes: {
        ...feedback.notes,
        [taskId]: note
      },
      updatedAt: new Date().toISOString()
    };
    setFeedback(updated);
    saveMentorFeedback(updated);
  };

  const handleToggleExpand = (taskId: string) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Run tests on student's code
  const handleRunStudentCode = (task: Task) => {
    const studentCode = activeStudent?.data.userCodeMap?.[task.id] || task.initialCode;
    const logs: string[] = [];

    try {
      const originalLog = console.log;
      console.log = (...args: unknown[]) => {
        logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      };

      const fn = new Function(studentCode);
      fn();
      console.log = originalLog;

      // Validate test cases
      const results = task.testCases.map((tc) => {
        const val = tc.validate(logs, studentCode);
        return {
          title: tc.title,
          passed: val.passed,
          actual: val.actual,
          expected: tc.expected,
          message: val.message
        };
      });

      const allPassed = results.every((r) => r.passed);

      setTestResults((prev) => ({
        ...prev,
        [task.id]: {
          logs,
          allPassed,
          cases: results
        }
      }));
    } catch (err: any) {
      const results = task.testCases.map((tc) => {
        const val = tc.validate(logs, studentCode, err.message);
        return {
          title: tc.title,
          passed: val.passed,
          actual: val.actual,
          expected: tc.expected,
          message: val.message
        };
      });

      setTestResults((prev) => ({
        ...prev,
        [task.id]: {
          logs,
          error: err.message,
          allPassed: false,
          cases: results
        }
      }));
    }
  };

  // Delete student from mentor's list
  const handleDeleteStudent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Удалить этого ученика из списка проверенных?')) {
      deleteReviewedStudent(id);
      const updated = getReviewedStudents();
      setStudents(updated);
      if (activeStudentId === id) {
        setActiveStudentId(updated.length > 0 ? updated[0].id : null);
      }
    }
  };

  // Import link
  const handleImportLink = () => {
    setImportError(null);
    if (!linkInput.trim()) return;

    const parsed = parseShareUrl(linkInput.trim());
    if (parsed) {
      const saved = saveReviewedStudent(parsed);
      setStudents(getReviewedStudents());
      setActiveStudentId(saved.id);
      setShowImportDialog(false);
      setLinkInput('');
    } else {
      setImportError('Не удалось распознать ссылку. Проверьте правильность ссылки.');
    }
  };

  // Import JSON file
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed: StudentProgressData = JSON.parse(content);
        if (parsed && parsed.profile && parsed.completedTaskIds) {
          const saved = saveReviewedStudent(parsed);
          setStudents(getReviewedStudents());
          setActiveStudentId(saved.id);
          setShowImportDialog(false);
        } else {
          setImportError('Некорректный формат JSON-файла ученика.');
        }
      } catch {
        setImportError('Ошибка при чтении файла.');
      }
    };
    reader.readAsText(file);
  };

  // Filter tasks list
  const completedTaskSet = useMemo(() => {
    return new Set(activeStudent?.data.completedTaskIds || []);
  }, [activeStudent?.data.completedTaskIds]);

  const userCodeMap = useMemo(() => {
    return activeStudent?.data.userCodeMap || {};
  }, [activeStudent?.data.userCodeMap]);

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      if (selectedTopic !== 'all' && task.topicId !== selectedTopic) {
        return false;
      }

      const hasCode = !!userCodeMap[task.id];
      const isCompleted = completedTaskSet.has(task.id);

      if (statusFilter === 'hasCode' && !hasCode) return false;
      if (statusFilter === 'solved' && !isCompleted) return false;
      if (statusFilter === 'notStarted' && (hasCode || isCompleted)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesScenario = task.frontendScenario.toLowerCase().includes(q);
        const matchesNaming = task.variableNamingTip.recommendedName.toLowerCase().includes(q);
        return matchesTitle || matchesScenario || matchesNaming;
      }

      return true;
    });
  }, [selectedTopic, statusFilter, searchQuery, userCodeMap, completedTaskSet]);

  const totalCompleted = activeStudent ? activeStudent.data.completedTaskIds.length : 0;
  const percentage = Math.round((totalCompleted / 50) * 100);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Mentor Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Вернуться к тренажеру"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>К задачам</span>
            </button>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold leading-tight">
                    Кабинет наставника
                  </h1>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Дистанционный контроль
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Проверка кода, запуск автотестов и комментарии к решениям учеников
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowImportDialog(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Upload className="w-4 h-4" />
              <span>Добавить работу ученика</span>
            </button>

            {activeStudent && (
              <button
                onClick={() => exportMentorReviewMarkdown(activeStudent, feedback)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                title="Скачать сводный отчет с замечаниями в формате Markdown"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Экспорт ревью</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1">
        {/* Student Roster Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Список учеников на проверке ({students.length})
              </span>
            </div>
            <button
              onClick={() => setShowImportDialog(true)}
              className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              + Добавить по ссылке или файлу
            </button>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6 space-y-2">
              <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">
                Пока нет добавленных учеников
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Попросите ученика нажать кнопку «Отправить наставнику» в тренажере и прислать вам ссылку или файл прогресса (.json).
              </p>
              <button
                onClick={() => setShowImportDialog(true)}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700"
              >
                Загрузить первую работу
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {students.map((student) => {
                const isSelected = student.id === activeStudent?.id;
                return (
                  <button
                    key={student.id}
                    onClick={() => setActiveStudentId(student.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-left transition-all shrink-0 border ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full bg-gradient-to-tr ${student.avatarColor} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                    >
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{student.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {student.completedCount}/50 задач решено
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteStudent(student.id, e)}
                      className="text-slate-300 hover:text-rose-500 p-1 ml-1 rounded hover:bg-white/50"
                      title="Удалить из списка"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {activeStudent && (
          <>
            {/* Active Student Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeStudent.avatarColor} text-white flex items-center justify-center text-xl font-bold shadow-xs`}
                  >
                    {activeStudent.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-extrabold text-slate-900">
                        {activeStudent.name}
                      </h2>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {percentage}% выполнено
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Последняя активность:{' '}
                      {new Date(activeStudent.lastUpdated).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full md:w-72 bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Сдано задач:</span>
                    <span className="font-mono text-indigo-700 font-bold">
                      {totalCompleted} из 50
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 text-right font-mono">
                    Решений сохранено: {Object.keys(userCodeMap).length}
                  </div>
                </div>
              </div>

              {/* Topics Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100">
                {topicsInfo.map((topic) => {
                  const topicTasks = allTasks.filter((t) => t.topicId === topic.id);
                  const solved = topicTasks.filter((t) => completedTaskSet.has(t.id)).length;
                  const withCode = topicTasks.filter((t) => !!userCodeMap[t.id]).length;
                  return (
                    <div
                      key={topic.id}
                      className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs space-y-1"
                    >
                      <div className="font-bold text-slate-700 truncate">
                        Тема {topic.id}
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                        <span>Сдано:</span>
                        <span className="font-bold text-indigo-700">{solved}/10</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${(solved / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* General Mentor Feedback Box */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  Общий комментарий и рекомендации наставника:
                </label>
                <textarea
                  rows={2}
                  value={feedback.generalComment || ''}
                  onChange={(e) => handleGeneralCommentChange(e.target.value)}
                  placeholder="Напишите общий фидбек для ученика (например: «Отличная работа с синтаксисом const/let, обрати внимание на нейминг в теме 4»)..."
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-y"
                />
              </div>
            </div>

            {/* Task Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs font-bold text-slate-500 shrink-0">Тема:</span>
                <button
                  onClick={() => setSelectedTopic('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedTopic === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Все темы
                </button>
                {topicsInfo.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopic(t.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedTopic === t.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Тема {t.id}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-medium text-slate-600 self-start sm:self-auto">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg ${
                    statusFilter === 'all' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : ''
                  }`}
                >
                  Все ({filteredTasks.length})
                </button>
                <button
                  onClick={() => setStatusFilter('hasCode')}
                  className={`px-2.5 py-1 rounded-lg ${
                    statusFilter === 'hasCode' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : ''
                  }`}
                >
                  С решением
                </button>
                <button
                  onClick={() => setStatusFilter('solved')}
                  className={`px-2.5 py-1 rounded-lg ${
                    statusFilter === 'solved' ? 'bg-white text-indigo-700 font-bold shadow-2xs' : ''
                  }`}
                >
                  Сданные
                </button>
              </div>
            </div>

            {/* Task Review Cards List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const isExpanded = !!expandedTasks[task.id];
                const isCompleted = completedTaskSet.has(task.id);
                const studentCode = userCodeMap[task.id];
                const taskFeedback = feedback.notes[task.id] || '';
                const result = testResults[task.id];

                return (
                  <div
                    key={task.id}
                    className={`bg-white rounded-2xl border transition-all ${
                      isCompleted
                        ? 'border-emerald-200 shadow-2xs'
                        : studentCode
                        ? 'border-indigo-200 shadow-2xs'
                        : 'border-slate-200'
                    }`}
                  >
                    {/* Header bar */}
                    <div
                      onClick={() => handleToggleExpand(task.id)}
                      className="p-4 cursor-pointer flex items-center justify-between gap-3 hover:bg-slate-50/50 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl text-xs font-mono font-bold ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : studentCode
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {task.id}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-slate-900">{task.title}</h3>
                            {isCompleted ? (
                              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Сдано
                              </span>
                            ) : studentCode ? (
                              <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                                Есть решение
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                Не начато
                              </span>
                            )}
                            {taskFeedback && (
                              <span className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                Есть замечание
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {task.frontendScenario}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRunStudentCode(task);
                            if (!isExpanded) handleToggleExpand(task.id);
                          }}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Протестировать</span>
                        </button>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Body */}
                    {isExpanded && (
                      <div className="p-4 pt-0 border-t border-slate-100 space-y-4">
                        {/* Scenario & Naming rule */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <div>
                            <span className="font-bold text-slate-700 block mb-1">
                              Сценарий задачи:
                            </span>
                            <p className="text-slate-600 leading-relaxed">
                              {task.description}
                            </p>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700 block mb-1">
                              Рекомендуемый нейминг:
                            </span>
                            <p className="text-slate-600">
                              <code className="font-mono text-indigo-700 font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                {task.variableNamingTip.keyword} {task.variableNamingTip.recommendedName}
                              </code>{' '}
                              ({task.variableNamingTip.style})
                            </p>
                            <p className="text-slate-500 text-[11px] mt-1">
                              {task.variableNamingTip.why}
                            </p>
                          </div>
                        </div>

                        {/* Code Side-by-Side: Student's vs Solution */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Student's Code */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                              <span className="flex items-center gap-1.5">
                                <Code2 className="w-4 h-4 text-indigo-600" />
                                Код ученика:
                              </span>
                              {!studentCode && (
                                <span className="text-[11px] text-amber-600 font-normal">
                                  Ученик не изменял начальный код
                                </span>
                              )}
                            </div>
                            <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto min-h-[110px] border border-slate-800">
                              <code>{studentCode || task.initialCode}</code>
                            </pre>
                          </div>

                          {/* Reference Solution Code */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                              <span className="flex items-center gap-1.5 text-emerald-700">
                                <CheckCircle2 className="w-4 h-4" />
                                Эталонное решение:
                              </span>
                            </div>
                            <pre className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-xs overflow-x-auto min-h-[110px] border border-slate-800">
                              <code>{task.solutionCode}</code>
                            </pre>
                          </div>
                        </div>

                        {/* Test Execution Output */}
                        {result && (
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                                Результат прогона автотестов:
                              </span>
                              <span
                                className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                                  result.allPassed
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {result.allPassed ? 'Все тесты пройдены' : 'Обнаружены ошибки'}
                              </span>
                            </div>

                            {result.cases.map((c, i) => (
                              <div
                                key={i}
                                className={`p-2 rounded-lg border text-[11px] ${
                                  c.passed
                                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                                    : 'bg-rose-50/70 border-rose-200 text-rose-900'
                                }`}
                              >
                                <div className="font-bold flex items-center gap-1">
                                  {c.passed ? '✓' : '✗'} {c.title}
                                </div>
                                <div className="font-mono text-slate-600 mt-0.5">
                                  Ожидалось: <strong>{c.expected}</strong> | Получено:{' '}
                                  <strong>{c.actual}</strong>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Mentor Note for this specific Task */}
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                            Замечание наставника к этой задаче:
                          </label>
                          <input
                            type="text"
                            value={taskFeedback}
                            onChange={(e) => handleTaskNoteChange(task.id, e.target.value)}
                            placeholder="Например: «Использован var вместо const», «Имя переменной не в camelCase»..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Import Modal */}
      {showImportDialog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-600" />
              Загрузить работу ученика
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Вставьте ссылку, полученную от ученика через кнопку «Отправить наставнику», или загрузите файл прогресса <code>.json</code>.
            </p>

            {importError && (
              <div className="p-2.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs">
                {importError}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Ссылка от ученика:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://...#review=..."
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 outline-hidden font-mono"
                />
                <button
                  onClick={handleImportLink}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl"
                >
                  Загрузить
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="grow border-t border-slate-200" />
              <span className="shrink mx-3 text-slate-400 text-xs uppercase font-bold">или</span>
              <div className="grow border-t border-slate-200" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Файл js-progress-*.json:
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setShowImportDialog(false);
                  setImportError(null);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
