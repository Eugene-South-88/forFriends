export type TopicId = 1 | 2 | 3 | 4 | 5;

export interface VariableNamingTip {
  recommendedName: string;
  style: 'camelCase' | 'UPPER_SNAKE_CASE';
  keyword: 'const' | 'let' | 'const / let';
  why: string;
}

export interface TaskTestCase {
  id: string;
  title: string;
  expected: string;
  validate: (logs: string[], code: string, error?: string) => {
    passed: boolean;
    actual: string;
    message: string;
  };
}

export interface Task {
  id: string;
  topicId: TopicId;
  number: number;
  title: string;
  frontendContext: string;
  frontendScenario: string;
  description: string;
  variableNamingTip: VariableNamingTip;
  syntaxTags: string[];
  initialCode: string;
  solutionCode: string;
  explanation: string;
  expectedOutput: string;
  testCases: TaskTestCase[];
}

export interface TopicInfo {
  id: TopicId;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  keyConcepts: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatarColor: string;
  createdAt: string;
}

export interface StudentProgressData {
  version: 1;
  profile: UserProfile;
  completedTaskIds: string[];
  userCodeMap: Record<string, string>;
  lastUpdated: string;
}

export interface MentorFeedback {
  studentId: string;
  notes: Record<string, string>; // taskId -> mentor feedback note
  generalComment?: string;
  updatedAt: string;
}

export interface ReviewedStudentItem {
  id: string;
  name: string;
  avatarColor: string;
  lastUpdated: string;
  completedCount: number;
  data: StudentProgressData;
  feedback?: MentorFeedback;
}

