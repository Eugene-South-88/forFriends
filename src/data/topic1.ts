import { Task } from '../types';

export const topic1Tasks: Task[] = [
  {
    id: 't1-1',
    topicId: 1,
    number: 1,
    title: 'Первый лог при старте SPA-приложения',
    frontendContext: '🚀 Инициализация фронтенда',
    frontendScenario: 'Когда страница интернет-магазина загружается в браузере, разработчики выводят служебное приветствие в консоль браузера, чтобы подтвердить успешную загрузку скриптов.',
    description: 'Напишите инструкцию вывода в консоль точной строки: "Frontend App initialized successfully!". Обязательно поставьте точку с запятой в конце.',
    variableNamingTip: {
      recommendedName: 'appInitMessage',
      style: 'camelCase',
      keyword: 'const',
      why: 'Если вы захотите вынести текст в переменную: используем const (так как текст фиксирован) и camelCase. Первое слово пишется строчными буквами, а каждое следующее — с заглавной (app + Init + Message).'
    },
    syntaxTags: ['console.log()', 'инструкция', ';'],
    initialCode: `// Задача 1.1: Инициализация фронтенда
// Напишите команду вывода в консоль строки: "Frontend App initialized successfully!"

// Напишите ваш код ниже:

`,
    solutionCode: `console.log("Frontend App initialized successfully!");`,
    explanation: 'Инструкция console.log() выводит переданный аргумент в поток вывода (консоль DevTools или терминал Node.js). Точка с запятой завершает инструкцию.',
    expectedOutput: 'Frontend App initialized successfully!',
    testCases: [
      {
        id: 't1-1-c1',
        title: 'Использование console.log',
        expected: 'Вызов console.log(...) в коде',
        validate: (_, code) => {
          const hasLog = /console\s*\.\s*log\s*\(/.test(code);
          return {
            passed: hasLog,
            actual: hasLog ? 'console.log найден' : 'console.log не найден',
            message: hasLog ? 'Функция console.log вызвана корректно' : 'Не найден вызов функции console.log()'
          };
        }
      },
      {
        id: 't1-1-c2',
        title: 'Точный текст сообщения в консоли',
        expected: 'Frontend App initialized successfully!',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Frontend App initialized successfully!'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Текст выведен без ошибок' : 'Текст в выводе не совпадает с "Frontend App initialized successfully!"'
          };
        }
      },
      {
        id: 't1-1-c3',
        title: 'Синтаксис: завершающая точка с запятой',
        expected: 'Точка с запятой (;) в конце инструкции',
        validate: (_, code) => {
          const hasSemicolon = code.trim().endsWith(';');
          return {
            passed: hasSemicolon,
            actual: hasSemicolon ? 'Точка с запятой присутствует' : 'Точка с запятой отсутствует',
            message: hasSemicolon ? 'Инструкция завершена точкой с запятой' : 'Рекомендуется поставить ; в конце инструкции'
          };
        }
      }
    ]
  },
  {
    id: 't1-2',
    topicId: 1,
    number: 2,
    title: 'Проверка версии окружения сборщика',
    frontendContext: '🛠️ Node.js и CI/CD пайплайн',
    frontendScenario: 'Перед сборкой проекта (npm run build) автоматический скрипт проверяет версию Node.js, чтобы исключить сбои зависимостей.',
    description: 'Объявите константу nodeVersion со значением "v22.17.2". Выведите в консоль через запятую два значения: "Текущая версия Node.js:" и саму переменную nodeVersion.',
    variableNamingTip: {
      recommendedName: 'nodeVersion',
      style: 'camelCase',
      keyword: 'const',
      why: 'Для начинающих: если значение переменной не должно меняться в процессе программы, ВСЕГДА пишите const, а не let. Имя nodeVersion в стиле camelCase наглядно отражает версию Node.js.'
    },
    syntaxTags: ['console.log() через запятую', 'const', 'camelCase'],
    initialCode: `// Задача 1.2: Проверка версии Node.js
// 1. Создайте константу nodeVersion со значением "v22.17.2"
// 2. Выведите в консоль через запятую: "Текущая версия Node.js:", nodeVersion

// Напишите ваш код ниже:

`,
    solutionCode: `const nodeVersion = "v22.17.2";
console.log("Текущая версия Node.js:", nodeVersion);`,
    explanation: 'В console.log() можно передавать несколько значений через запятую. Метод объединяет их пробелом при выводе.',
    expectedOutput: 'Текущая версия Node.js: v22.17.2',
    testCases: [
      {
        id: 't1-2-c1',
        title: 'Объявление переменной nodeVersion через const',
        expected: 'const nodeVersion = "v22.17.2"',
        validate: (_, code) => {
          const isConst = /const\s+nodeVersion\s*=/.test(code);
          return {
            passed: isConst,
            actual: isConst ? 'const nodeVersion объявлена' : 'nodeVersion не объявлена через const',
            message: isConst ? 'Переменная объявлена правильно' : 'Объявите константу: const nodeVersion = "v22.17.2";'
          };
        }
      },
      {
        id: 't1-2-c2',
        title: 'Вывод версии с пояснением',
        expected: 'Текущая версия Node.js: v22.17.2',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Текущая версия Node.js:') && l.includes('v22.17.2'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод полностью совпадает' : 'В выводе должно быть: "Текущая версия Node.js: v22.17.2"'
          };
        }
      }
    ]
  },
  {
    id: 't1-3',
    topicId: 1,
    number: 3,
    title: 'Логирование параметров сетевого запроса',
    frontendContext: '🌐 Логирование HTTP-запроса',
    frontendScenario: 'Фронтенд запрашивает каталог товаров. Для отладки сетевых запросов разработчики выводят метод, путь и статус ответа в одну строку.',
    description: 'Выведите в одну строку через запятую три аргумента: строковый префикс "[HTTP]", путь "GET /api/products" и числовой статус 200.',
    variableNamingTip: {
      recommendedName: 'httpStatusCode',
      style: 'camelCase',
      keyword: 'const',
      why: 'Числовые коды HTTP ответов называют httpStatus или statusCode. Суффикс Code ясно дает понять, что значение — целое число.'
    },
    syntaxTags: ['console.log(a, b, c)', 'несколько аргументов'],
    initialCode: `// Задача 1.3: Логирование сетевого запроса
// Выведите в консоль три аргумента через запятую:
// 1) "[HTTP]"
// 2) "GET /api/products"
// 3) 200

// Напишите ваш код ниже:

`,
    solutionCode: `console.log("[HTTP]", "GET /api/products", 200);`,
    explanation: 'Передача нескольких параметров в console.log() — самый простой и удобный способ логировать связанные данные во фронтенде.',
    expectedOutput: '[HTTP] GET /api/products 200',
    testCases: [
      {
        id: 't1-3-c1',
        title: 'Вывод всех трех аргументов в одной строке',
        expected: '[HTTP] GET /api/products 200',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('[HTTP]') && l.includes('GET /api/products') && l.includes('200'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Все 3 аргумента выведены через запятую' : 'Ожидалось: [HTTP] GET /api/products 200'
          };
        }
      }
    ]
  },
  {
    id: 't1-4',
    topicId: 1,
    number: 4,
    title: 'Приветствие пользователя в DevTools',
    frontendContext: '👤 Личный кабинет покупателя',
    frontendScenario: 'После авторизации в консоль для удобства тестировщика выводится имя пользователя.',
    description: 'Создайте константу userName со значением "Алексей". Выведите через запятую два параметра: "Пользователь вошел в систему:" и саму переменную userName.',
    variableNamingTip: {
      recommendedName: 'userName',
      style: 'camelCase',
      keyword: 'const',
      why: 'Почему userName, а не просто user или name? Потому что user обычно обозначает весь объект со всеми данными (email, id, avatar), а name слишком абстрактно. userName — идеально точное имя.'
    },
    syntaxTags: ['const', 'console.log()', 'camelCase'],
    initialCode: `// Задача 1.4: Приветствие пользователя
// 1. Создайте константу userName со значением "Алексей"
// 2. Выведите в консоль: "Пользователь вошел в систему:", userName

// Напишите ваш код ниже:

`,
    solutionCode: `const userName = "Алексей";
console.log("Пользователь вошел в систему:", userName);`,
    explanation: 'Имя пользователя не перезаписывается в этой инструкции, поэтому используем const.',
    expectedOutput: 'Пользователь вошел в систему: Алексей',
    testCases: [
      {
        id: 't1-4-c1',
        title: 'Использование const и переменной userName',
        expected: 'const userName = "Алексей"',
        validate: (_, code) => {
          const hasVar = /const\s+userName\s*=/.test(code);
          return {
            passed: hasVar,
            actual: hasVar ? 'userName объявлен через const' : 'userName не найден',
            message: hasVar ? 'Переменная объявлена правильно' : 'Объявите: const userName = "Алексей";'
          };
        }
      },
      {
        id: 't1-4-c2',
        title: 'Корректный вывод в консоль',
        expected: 'Пользователь вошел в систему: Алексей',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Пользователь вошел в систему:') && l.includes('Алексей'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Приветствие выведено' : 'Ожидалось: Пользователь вошел в систему: Алексей'
          };
        }
      }
    ]
  },
  {
    id: 't1-5',
    topicId: 1,
    number: 5,
    title: 'Очистка консоли перед новым логом',
    frontendContext: '🧹 Чистота терминала и логов',
    frontendScenario: 'В методичке (стр. 10–11) подчеркивается важность очистки консоли. Метод console.clear() очищает забитый экран перед выводом новых важных данных.',
    description: 'Вызовите метод очистки консоли console.clear(), а затем выведите сообщение "Консоль очищена для нового сеанса".',
    variableNamingTip: {
      recommendedName: 'sessionState',
      style: 'camelCase',
      keyword: 'const',
      why: 'Для действий в JavaScript используют глаголы (clear, log, render), а для хранения данных — существительные (session, message).'
    },
    syntaxTags: ['console.clear()', 'console.log()'],
    initialCode: `// Задача 1.5: Очистка консоли
// 1. Вызовите console.clear();
// 2. Выведите сообщение "Консоль очищена для нового сеанса"

// Напишите ваш код ниже:

`,
    solutionCode: `console.clear();
console.log("Консоль очищена для нового сеанса");`,
    explanation: 'console.clear() очищает историю вывода, предотвращая накопление сотен устаревших логов.',
    expectedOutput: 'Консоль очищена для нового сеанса',
    testCases: [
      {
        id: 't1-5-c1',
        title: 'Вызов console.clear()',
        expected: 'console.clear() в коде',
        validate: (_, code) => {
          const hasClear = /console\s*\.\s*clear\s*\(\s*\)/.test(code);
          return {
            passed: hasClear,
            actual: hasClear ? 'console.clear() вызван' : 'console.clear() не найден',
            message: hasClear ? 'Метод очистки найден' : 'Вызовите команду console.clear();'
          };
        }
      },
      {
        id: 't1-5-c2',
        title: 'Вывод сообщения после очистки',
        expected: 'Консоль очищена для нового сеанса',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Консоль очищена для нового сеанса'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Сообщение выведено' : 'Выведите строку "Консоль очищена для нового сеанса"'
          };
        }
      }
    ]
  },
  {
    id: 't1-6',
    topicId: 1,
    number: 6,
    title: 'Имитация alert-уведомления браузера',
    frontendContext: '🔔 Браузерные модальные окна',
    frontendScenario: 'В методичке (стр. 11) рассмотрено выполнение команды alert("Hello") в консоли браузера. В веб-приложениях предупреждающие сообщения привлекают мгновенное внимание.',
    description: 'Создайте константу alertMessage со строкой "Внимание: несохраненные изменения!". Выведите её в консоль с префиксом "[ALERT]" через запятую.',
    variableNamingTip: {
      recommendedName: 'alertMessage',
      style: 'camelCase',
      keyword: 'const',
      why: 'Суффикс Message (alertMessage, errorMessage, successMessage) прямо говорит о том, что переменная хранит готовый для пользователя текст.'
    },
    syntaxTags: ['alertMessage', 'const', 'console.log()'],
    initialCode: `// Задача 1.6: Предупреждение
// 1. Создайте константу alertMessage со значением "Внимание: несохраненные изменения!"
// 2. Выведите в консоль: "[ALERT]", alertMessage

// Напишите ваш код ниже:

`,
    solutionCode: `const alertMessage = "Внимание: несохраненные изменения!";
console.log("[ALERT]", alertMessage);`,
    explanation: 'Префикс [ALERT] и текстовое сообщение формируют аккуратный структурированный лог.',
    expectedOutput: '[ALERT] Внимание: несохраненные изменения!',
    testCases: [
      {
        id: 't1-6-c1',
        title: 'Объявление переменной alertMessage',
        expected: 'const alertMessage = "Внимание: несохраненные изменения!"',
        validate: (_, code) => {
          const hasConst = /const\s+alertMessage\s*=/.test(code);
          return {
            passed: hasConst,
            actual: hasConst ? 'alertMessage объявлена' : 'alertMessage не найдена',
            message: hasConst ? 'Переменная объявлена правильно' : 'Создайте: const alertMessage = "Внимание: несохраненные изменения!";'
          };
        }
      },
      {
        id: 't1-6-c2',
        title: 'Вывод с префиксом [ALERT]',
        expected: '[ALERT] Внимание: несохраненные изменения!',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('[ALERT]') && l.includes('Внимание: несохраненные изменения!'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Предупреждение выведено' : 'Ожидался вывод: [ALERT] Внимание: несохраненные изменения!'
          };
        }
      }
    ]
  },
  {
    id: 't1-7',
    topicId: 1,
    number: 7,
    title: 'Отслеживание этапов сборки пакетов npm',
    frontendContext: '📦 Менеджер пакетов npm',
    frontendScenario: 'При выполнении команды npm install скрипт выводит имя этапа и статус готовности.',
    description: 'Напишите три последовательных вызова console.log: 1) "1. Скачивание пакетов...", 2) "2. Аудит безопасности...", 3) "3. Пакеты установлены!".',
    variableNamingTip: {
      recommendedName: 'buildStep',
      style: 'camelCase',
      keyword: 'let',
      why: 'Если номер шага инкрементируется во время сборки, переменную шага называют buildStep или currentStep через let.'
    },
    syntaxTags: ['последовательность инструкций', 'npm', 'console.log()'],
    initialCode: `// Задача 1.7: Этапы установки пакетов
// Выведите три последовательных сообщения:
// 1) "1. Скачивание пакетов..."
// 2) "2. Аудит безопасности..."
// 3) "3. Пакеты установлены!"

// Напишите ваш код ниже:

`,
    solutionCode: `console.log("1. Скачивание пакетов...");
console.log("2. Аудит безопасности...");
console.log("3. Пакеты установлены!");`,
    explanation: 'Инструкции выполняются строго сверху вниз, по очереди выводя строки в консоль.',
    expectedOutput: '1. Скачивание пакетов...\n2. Аудит безопасности...\n3. Пакеты установлены!',
    testCases: [
      {
        id: 't1-7-c1',
        title: 'Наличие трех вызовов console.log',
        expected: 'Минимум 3 вывода в консоль',
        validate: (logs) => {
          return {
            passed: logs.length >= 3,
            actual: `Выведено строк: ${logs.length}`,
            message: logs.length >= 3 ? 'Все 3 этапа выведены' : 'Необходимо вывести 3 отдельных console.log'
          };
        }
      },
      {
        id: 't1-7-c2',
        title: 'Правильный текст всех трех этапов',
        expected: 'Все 3 фразы присутствуют в выводе',
        validate: (logs) => {
          const text = logs.join('\n');
          const has1 = text.includes('1. Скачивание пакетов...');
          const has2 = text.includes('2. Аудит безопасности...');
          const has3 = text.includes('3. Пакеты установлены!');
          const ok = has1 && has2 && has3;
          return {
            passed: ok,
            actual: ok ? 'Все этапы найдены' : 'Некоторые этапы пропущены или содержат опечатки',
            message: ok ? 'Все тексты верны' : 'Проверьте формулировку шагов 1, 2 и 3'
          };
        }
      }
    ]
  },
  {
    id: 't1-8',
    topicId: 1,
    number: 8,
    title: 'Мониторинг времени отрисовки (Render Time)',
    frontendContext: '⚡ Метрики Core Web Vitals',
    frontendScenario: 'Фронтенд-инженеры замеряют скорость рендеринга страницы. Выведем название компонента и затраченные миллисекунды.',
    description: 'Создайте componentName со значением "ProductList" и renderTimeMs со значением 14.5. Выведите: "Компонент:", componentName, "отрисован за:", renderTimeMs, "мс".',
    variableNamingTip: {
      recommendedName: 'renderTimeMs',
      style: 'camelCase',
      keyword: 'const',
      why: 'Добавление суффикса единиц измерения (Ms, Px, Sec) — профессиональный стандарт фронтенда. Сразу ясно, что 14.5 — это миллисекунды, а не секунды.'
    },
    syntaxTags: ['console.log(5 аргументов)', 'суффикс единицы измерения', 'const'],
    initialCode: `// Задача 1.8: Замер времени рендеринга
// 1. Создайте const componentName = "ProductList";
// 2. Создайте const renderTimeMs = 14.5;
// 3. Выведите в консоль: "Компонент:", componentName, "отрисован за:", renderTimeMs, "мс"

// Напишите ваш код ниже:

`,
    solutionCode: `const componentName = "ProductList";
const renderTimeMs = 14.5;
console.log("Компонент:", componentName, "отрисован за:", renderTimeMs, "мс");`,
    explanation: 'Несколько аргументов разного типа (строки и дробные числа) легко форматируются через запятую.',
    expectedOutput: 'Компонент: ProductList отрисован за: 14.5 мс',
    testCases: [
      {
        id: 't1-8-c1',
        title: 'Объявление componentName и renderTimeMs',
        expected: 'Обе переменные объявлены через const',
        validate: (_, code) => {
          const hasName = /const\s+componentName\s*=/.test(code);
          const hasTime = /const\s+renderTimeMs\s*=/.test(code);
          const ok = hasName && hasTime;
          return {
            passed: ok,
            actual: ok ? 'Переменные объявлены' : 'Не найдены const componentName или renderTimeMs',
            message: ok ? 'Имена и ключевые слова верны' : 'Объявите обе переменные через const'
          };
        }
      },
      {
        id: 't1-8-c2',
        title: 'Корректный вывод отчета',
        expected: 'Компонент: ProductList отрисован за: 14.5 мс',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('ProductList') && l.includes('14.5') && l.includes('мс'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Отчет выведен корректно' : 'Проверьте вывод: Компонент: ProductList отрисован за: 14.5 мс'
          };
        }
      }
    ]
  },
  {
    id: 't1-9',
    topicId: 1,
    number: 9,
    title: 'Логирование ошибки валидации поля формы',
    frontendContext: '⚠️ Обработка ошибок в форме регистрации',
    frontendScenario: 'Когда пользователь вводит некорректный email, фронтенд логирует код ошибки и подсказку.',
    description: 'Создайте errorCode со значением 422 и errorMessage со значением "Email введен некорректно". Выведите их через запятую с префиксом "[ERROR]".',
    variableNamingTip: {
      recommendedName: 'errorCode / errorMessage',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово code означает числовой статус, message — текст. Разделение сущностей исключает путаницу в коде.'
    },
    syntaxTags: ['const', 'отладка ошибок', 'console.log()'],
    initialCode: `// Задача 1.9: Ошибка валидации
// 1. Создайте const errorCode = 422;
// 2. Создайте const errorMessage = "Email введен некорректно";
// 3. Выведите: "[ERROR]", errorCode, errorMessage

// Напишите ваш код ниже:

`,
    solutionCode: `const errorCode = 422;
const errorMessage = "Email введен некорректно";
console.log("[ERROR]", errorCode, errorMessage);`,
    explanation: 'Код ошибки и текст выводятся вместе для быстрой локализации проблемы.',
    expectedOutput: '[ERROR] 422 Email введен некорректно',
    testCases: [
      {
        id: 't1-9-c1',
        title: 'Объявление errorCode и errorMessage через const',
        expected: 'const errorCode = 422 и const errorMessage = ...',
        validate: (_, code) => {
          const hasCode = /const\s+errorCode\s*=/.test(code);
          const hasMsg = /const\s+errorMessage\s*=/.test(code);
          const ok = hasCode && hasMsg;
          return {
            passed: ok,
            actual: ok ? 'Переменные объявлены' : 'Не найдены константы errorCode или errorMessage',
            message: ok ? 'Константы объявлены верно' : 'Используйте const для errorCode и errorMessage'
          };
        }
      },
      {
        id: 't1-9-c2',
        title: 'Вывод с префиксом [ERROR]',
        expected: '[ERROR] 422 Email введен некорректно',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('[ERROR]') && l.includes('422') && l.includes('Email введен некорректно'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Лог ошибки сформирован верно' : 'Ожидалось: [ERROR] 422 Email введен некорректно'
          };
        }
      }
    ]
  },
  {
    id: 't1-10',
    topicId: 1,
    number: 10,
    title: 'Сводка сборщика бандла в терминале',
    frontendContext: '📦 Итог процесса сборки (Build Summary)',
    frontendScenario: 'После компиляции бандла терминал выводит строчку с итоговым размером бандла и временем сборки.',
    description: 'Создайте константы bundleSize со значением "142 kB" и buildDuration со значением "1.2s". Выведите: "Сборка завершена:", bundleSize, "за", buildDuration.',
    variableNamingTip: {
      recommendedName: 'bundleSize / buildDuration',
      style: 'camelCase',
      keyword: 'const',
      why: 'Имена bundleSize и buildDuration самодокументируемы: размер бандла и длительность сборки.'
    },
    syntaxTags: ['console.log()', 'const', 'camelCase'],
    initialCode: `// Задача 1.10: Сводка сборки
// 1. Создайте const bundleSize = "142 kB";
// 2. Создайте const buildDuration = "1.2s";
// 3. Выведите: "Сборка завершена:", bundleSize, "за", buildDuration

// Напишите ваш код ниже:

`,
    solutionCode: `const bundleSize = "142 kB";
const buildDuration = "1.2s";
console.log("Сборка завершена:", bundleSize, "за", buildDuration);`,
    explanation: 'Финальный вывод подтверждает успешное завершение процесса сборки проекта.',
    expectedOutput: 'Сборка завершена: 142 kB за 1.2s',
    testCases: [
      {
        id: 't1-10-c1',
        title: 'Объявление bundleSize и buildDuration',
        expected: 'Обе переменные объявлены через const',
        validate: (_, code) => {
          const hasSize = /const\s+bundleSize\s*=/.test(code);
          const hasDur = /const\s+buildDuration\s*=/.test(code);
          const ok = hasSize && hasDur;
          return {
            passed: ok,
            actual: ok ? 'Константы объявлены' : 'Проверьте объявление bundleSize и buildDuration',
            message: ok ? 'Константы объявлены верно' : 'Создайте: const bundleSize = "142 kB"; const buildDuration = "1.2s";'
          };
        }
      },
      {
        id: 't1-10-c2',
        title: 'Корректный вывод сводки',
        expected: 'Сборка завершена: 142 kB за 1.2s',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Сборка завершена:') && l.includes('142 kB') && l.includes('1.2s'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Сводка выведена' : 'Ожидалось: Сборка завершена: 142 kB за 1.2s'
          };
        }
      }
    ]
  }
];
