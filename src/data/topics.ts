import { TopicInfo, Task } from '../types';
import { topic1Tasks } from './topic1';
import { topic2Tasks } from './topic2';
import { topic3Tasks } from './topic3';
import { topic4Tasks } from './topic4';
import { topic5Tasks } from './topic5';

export const topicsInfo: TopicInfo[] = [
  {
    id: 1,
    title: '1. Введение в JavaScript и настройка окружения',
    shortTitle: 'Введение и окружение',
    icon: 'Terminal',
    description: 'Что такое JS и Node.js, запуск скриптов, консоль браузера, вывод в console.log, менеджер пакетов npm и структура проекта.',
    keyConcepts: ['Node.js vs Браузер', 'console.log() аргументы', 'npm пакеты', 'console.clear()', 'alert()']
  },
  {
    id: 2,
    title: '2. Основы синтаксиса и переменные',
    shortTitle: 'Синтаксис и переменные',
    icon: 'Variable',
    description: 'Инструкции, точки с запятой, кавычки, комментарии, правила именования (camelCase, UPPER_SNAKE_CASE), let vs const vs var, блочная видимость {}.',
    keyConcepts: ['const vs let', 'Почему забываем var', 'Блочная область {}', 'camelCase правила', 'UPPER_SNAKE_CASE']
  },
  {
    id: 3,
    title: '3. Типы данных в JavaScript',
    shortTitle: 'Типы данных',
    icon: 'Layers',
    description: '7 примитивных типов, особенности Infinity и NaN, оператор typeof, динамическая типизация, явное и неявное приведение типов (baNaNa).',
    keyConcepts: ['7 примитивов', 'typeof нюансы', 'NaN и Infinity', 'Унарный плюс +', 'Явное Number/String/Boolean']
  },
  {
    id: 4,
    title: '4. Математические операции и ввод/вывод',
    shortTitle: 'Математика и ввод/вывод',
    icon: 'Calculator',
    description: 'Базовые операторы (+, -, *, /, %, **), инкремент/декремент (++a, a++), сокращенные операторы, объект Math и модуль ввода readline.',
    keyConcepts: ['Приоритет операций', 'Префикс vs Постфикс ++', 'Math (PI, round, floor, ceil)', 'Случайные числа', 'Модуль readline']
  },
  {
    id: 5,
    title: '5. Работа со строками',
    shortTitle: 'Работа со строками',
    icon: 'FileText',
    description: 'Кавычки, экранирование спецсимволов, шаблонные строки ${...}, многострочность, свойство length и ключевые методы строк.',
    keyConcepts: ['Шаблоны ${...}', 'Экранирование \\', '.length', '.toUpperCase() / .toLowerCase()', '.includes(), .slice(), .trim(), .split()']
  }
];

export const allTasks: Task[] = [
  ...topic1Tasks,
  ...topic2Tasks,
  ...topic3Tasks,
  ...topic4Tasks,
  ...topic5Tasks
];
