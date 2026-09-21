import LZString from 'lz-string';
import { StudentProgressData, ReviewedStudentItem, MentorFeedback } from '../types';

const MENTOR_STUDENTS_KEY = 'js_trainer_mentor_students';
const MENTOR_FEEDBACK_KEY = 'js_trainer_mentor_feedbacks';

/**
 * Generates a direct remote share URL with compressed student progress.
 * Can be sent via Telegram, WhatsApp, Email, etc.
 */
export function generateShareUrl(data: StudentProgressData): string {
  try {
    const json = JSON.stringify(data);
    const compressed = LZString.compressToEncodedURIComponent(json);
    const base = window.location.origin + window.location.pathname;
    return `${base}#review=${compressed}`;
  } catch (err) {
    console.error('Failed to generate share URL', err);
    return '';
  }
}

/**
 * Decodes student progress data from the URL hash or query string.
 */
export function parseShareUrl(locationHash: string): StudentProgressData | null {
  try {
    if (!locationHash) return null;
    const match = locationHash.match(/[#&?]review=([^&]+)/);
    if (!match || !match[1]) return null;

    const compressed = match[1];
    const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
    if (!decompressed) return null;

    const parsed = JSON.parse(decompressed);
    if (parsed && parsed.profile && parsed.completedTaskIds) {
      return parsed as StudentProgressData;
    }
    return null;
  } catch (err) {
    console.error('Failed to parse share URL', err);
    return null;
  }
}

/**
 * Get all students saved in the mentor's roster.
 */
export function getReviewedStudents(): ReviewedStudentItem[] {
  try {
    const raw = localStorage.getItem(MENTOR_STUDENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load reviewed students', err);
    return [];
  }
}

/**
 * Save or update a student in the mentor's roster.
 */
export function saveReviewedStudent(studentData: StudentProgressData): ReviewedStudentItem {
  const current = getReviewedStudents();
  const existingIdx = current.findIndex((s) => s.id === studentData.profile.id);

  const item: ReviewedStudentItem = {
    id: studentData.profile.id,
    name: studentData.profile.name,
    avatarColor: studentData.profile.avatarColor,
    lastUpdated: studentData.lastUpdated || new Date().toISOString(),
    completedCount: studentData.completedTaskIds.length,
    data: studentData
  };

  let updatedList: ReviewedStudentItem[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = item;
  } else {
    updatedList = [item, ...current];
  }

  localStorage.setItem(MENTOR_STUDENTS_KEY, JSON.stringify(updatedList));
  return item;
}

/**
 * Delete a student from the mentor's roster.
 */
export function deleteReviewedStudent(studentId: string): void {
  const current = getReviewedStudents();
  const filtered = current.filter((s) => s.id !== studentId);
  localStorage.setItem(MENTOR_STUDENTS_KEY, JSON.stringify(filtered));
}

/**
 * Get saved mentor feedback for a student.
 */
export function getMentorFeedback(studentId: string): MentorFeedback | null {
  try {
    const raw = localStorage.getItem(MENTOR_FEEDBACK_KEY);
    if (!raw) return null;
    const feedbacks: Record<string, MentorFeedback> = JSON.parse(raw);
    return feedbacks[studentId] || null;
  } catch {
    return null;
  }
}

/**
 * Save mentor feedback for a student.
 */
export function saveMentorFeedback(feedback: MentorFeedback): void {
  try {
    const raw = localStorage.getItem(MENTOR_FEEDBACK_KEY);
    const feedbacks: Record<string, MentorFeedback> = raw ? JSON.parse(raw) : {};
    feedbacks[feedback.studentId] = feedback;
    localStorage.setItem(MENTOR_FEEDBACK_KEY, JSON.stringify(feedbacks));
  } catch (err) {
    console.error('Failed to save mentor feedback', err);
  }
}

/**
 * Export a Markdown review summary for the student.
 */
export function exportMentorReviewMarkdown(
  student: ReviewedStudentItem,
  feedback?: MentorFeedback | null
): void {
  const dateStr = new Date().toLocaleDateString('ru-RU');
  let md = `# Отчет о проверке практических заданий по JavaScript\n\n`;
  md += `**Обучающийся:** ${student.name}\n`;
  md += `**Дата проверки:** ${dateStr}\n`;
  md += `**Выполнено задач:** ${student.completedCount} из 50 (${Math.round((student.completedCount / 50) * 100)}%)\n\n`;

  if (feedback?.generalComment) {
    md += `## Общий комментарий наставника:\n> ${feedback.generalComment.split('\n').join('\n> ')}\n\n`;
  }

  md += `## Детализация по выполненным задачам:\n\n`;
  const codeMap = student.data.userCodeMap || {};

  student.data.completedTaskIds.forEach((taskId, idx) => {
    const userCode = codeMap[taskId] || '// Решение не сохранено';
    const note = feedback?.notes?.[taskId];

    md += `### ${idx + 1}. Задача [${taskId}]\n`;
    md += `\`\`\`javascript\n${userCode}\n\`\`\`\n`;
    if (note) {
      md += `**Замечание / Рекомендация наставника:**\n${note}\n\n`;
    }
    md += `---\n\n`;
  });

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `review-${student.name.replace(/\s+/g, '_')}-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
