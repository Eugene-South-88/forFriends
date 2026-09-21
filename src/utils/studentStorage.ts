import { UserProfile, StudentProgressData } from '../types';

const PROFILES_KEY = 'js_trainer_profiles';
const ACTIVE_PROFILE_KEY = 'js_trainer_active_user_id';
const PROGRESS_KEY_PREFIX = 'js_trainer_progress_';

const AVATAR_COLORS = [
  'from-indigo-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-fuchsia-500 to-violet-600'
];

export function getStoredProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveProfiles(profiles: UserProfile[]): void {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch {
    // Ignore storage quota
  }
}

export function getActiveProfileId(): string | null {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

export function setActiveProfileId(id: string): void {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
}

export function createProfile(name: string): UserProfile {
  const profiles = getStoredProfiles();
  const colorIndex = profiles.length % AVATAR_COLORS.length;
  const newProfile: UserProfile = {
    id: 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: name.trim() || 'Студент',
    avatarColor: AVATAR_COLORS[colorIndex],
    createdAt: new Date().toISOString()
  };

  profiles.push(newProfile);
  saveProfiles(profiles);
  setActiveProfileId(newProfile.id);
  return newProfile;
}

export function getProgressForUser(userId: string): StudentProgressData {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY_PREFIX + userId);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  const profiles = getStoredProfiles();
  const profile = profiles.find((p) => p.id === userId) || {
    id: userId,
    name: 'Студент',
    avatarColor: AVATAR_COLORS[0],
    createdAt: new Date().toISOString()
  };

  return {
    version: 1,
    profile,
    completedTaskIds: [],
    userCodeMap: {},
    lastUpdated: new Date().toISOString()
  };
}

export function saveProgressForUser(data: StudentProgressData): void {
  try {
    const updated = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(PROGRESS_KEY_PREFIX + data.profile.id, JSON.stringify(updated));
  } catch {
    // storage error handling
  }
}

export function exportProgressToFile(data: StudentProgressData): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = data.profile.name.replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');
  a.href = url;
  a.download = `js-progress-${safeName}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseProgressFromFile(fileContent: string): StudentProgressData {
  const parsed = JSON.parse(fileContent);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Файл не содержит валидных данных прогресса.');
  }
  if (!parsed.profile || !Array.isArray(parsed.completedTaskIds)) {
    throw new Error('Некорректная структура файла прогресса.');
  }
  return {
    version: 1,
    profile: {
      id: parsed.profile.id || 'user_' + Date.now(),
      name: String(parsed.profile.name || 'Обучающийся'),
      avatarColor: parsed.profile.avatarColor || AVATAR_COLORS[0],
      createdAt: parsed.profile.createdAt || new Date().toISOString()
    },
    completedTaskIds: parsed.completedTaskIds.map(String),
    userCodeMap: parsed.userCodeMap && typeof parsed.userCodeMap === 'object' ? parsed.userCodeMap : {},
    lastUpdated: parsed.lastUpdated || new Date().toISOString()
  };
}
