import { Task } from '../types';

export const topic1Tasks: Task[] = [
  {
    id: 't1-1',
    topicId: 1,
    number: 1,
    title: 'Первый лог при старте SPA-приложения',
    frontendContext: '🚀 Инициализация фронтенда',
    frontendScenario: 'Когда страница интернет-магазина загружается в браузере, разработчики выводят служебное приветствие в консоль браузера, чтобы подтвердить успешную загрузку скриптов.',
    description: 'Напишите инструкцию вывода в консоль точной строки: "Frontend App initialized successfully!". Обязательно поставьте точку с запятой в конце инструкции.',
    variableNamingTip: {
      recommendedName: 'appInitMessage',
      meaning: 'текст приветственного сообщения при старте приложения',
      style: 'camelCase',
      why: 'Если вы выносите текст в переменную, имя пишется в стиле camelCase: первое слово со строчной буквы, а каждое следующее — с заглавной.'
    },
    syntaxTags: ['console.log()', 'инструкция', ';'],
    initialCode: `// Задача 1.1: Инициализация фронтенда
// Напишите команду вывода в консоль строки "Frontend App initialized successfully!":

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
    description: 'Создайте переменную nodeVersion, которая обозначает версию окружения Node.js, со значением "v22.17.2". Значение фиксировано и не будет меняться во время работы скрипта. Выведите в консоль через запятую пояснение "Текущая версия Node.js:" и значение переменной nodeVersion.',
    variableNamingTip: {
      recommendedName: 'nodeVersion',
      meaning: 'версия среды выполнения Node.js',
      style: 'camelCase',
      why: 'Имя переменной состоит из названия платформы node и сущности Version в стиле camelCase. Подумайте, какое ключевое слово выбрать для значения, которое никогда не меняется.'
    },
    syntaxTags: ['console.log() через запятую', 'const / let', 'camelCase'],
    initialCode: `// Задача 1.2: Проверка версии Node.js
// Напишите ваш код решения ниже:

`,
    solutionCode: `const nodeVersion = "v22.17.2";
console.log("Текущая версия Node.js:", nodeVersion);`,
    explanation: 'В console.log() можно передавать несколько значений через запятую. Метод объединяет их пробелом при выводе.',
    expectedOutput: 'Текущая версия Node.js: v22.17.2',
    testCases: [
      {
        id: 't1-2-c1',
        title: 'Объявление переменной nodeVersion',
        expected: 'Объявление переменной nodeVersion',
        validate: (_, code) => {
          const hasDecl = /(?:const|let)\s+nodeVersion\s*=/.test(code);
          return {
            passed: hasDecl,
            actual: hasDecl ? 'Переменная nodeVersion объявлена' : 'nodeVersion не объявлена',
            message: hasDecl ? 'Переменная объявлена правильно' : 'Не найдено объявление переменной nodeVersion'
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
    description: 'Выведите в консоль одной инструкцией через запятую три значения: строковый тег "[HTTP]", путь к ресурсу "GET /api/products" и числовой статус ответа 200.',
    variableNamingTip: {
      recommendedName: 'httpStatusCode',
      meaning: 'числовой код ответа HTTP-сервера',
      style: 'camelCase',
      why: 'Числовые коды обычно снабжают суффиксом Code (statusCode, errorCode), что подчеркивает их числовую природу.'
    },
    syntaxTags: ['console.log(a, b, c)', 'несколько аргументов'],
    initialCode: `// Задача 1.3: Логирование сетевого запроса
// Напишите ваш код решения ниже:

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
    description: 'Создайте переменную userName, которая обозначает имя авторизованного пользователя, со значением "Алексей". Выведите через запятую текст "Пользователь вошел в систему:" и саму переменную userName.',
    variableNamingTip: {
      recommendedName: 'userName',
      meaning: 'имя текущего пользователя в системе',
      style: 'camelCase',
      why: 'Имя userName точнее, чем просто name или user, так как user часто означает весь объект пользователя с почтой и настройками.'
    },
    syntaxTags: ['переменные', 'console.log()', 'camelCase'],
    initialCode: `// Задача 1.4: Приветствие пользователя
// Напишите ваш код решения ниже:

`,
    solutionCode: `const userName = "Алексей";
console.log("Пользователь вошел в систему:", userName);`,
    explanation: 'Имя пользователя не перезаписывается в этой инструкции, поэтому используем const.',
    expectedOutput: 'Пользователь вошел в систему: Алексей',
    testCases: [
      {
        id: 't1-4-c1',
        title: 'Объявление переменной userName',
        expected: 'Объявление userName со значением "Алексей"',
        validate: (_, code) => {
          const hasVar = /(?:const|let)\s+userName\s*=/.test(code);
          return {
            passed: hasVar,
            actual: hasVar ? 'userName объявлен' : 'userName не найден',
            message: hasVar ? 'Переменная объявлена правильно' : 'Не найдено объявление переменной userName'
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
    description: 'Очистите консоль браузера с помощью специального метода консоли, а затем выведите сообщение "Консоль очищена для нового сеанса".',
    variableNamingTip: {
      recommendedName: 'sessionState',
      meaning: 'состояние текущего сеанса пользователя',
      style: 'camelCase',
      why: 'Для действий в JavaScript используют глаголы (clear, log, render), а для хранения данных — существительные (session, message).'
    },
    syntaxTags: ['console.clear()', 'console.log()'],
    initialCode: `// Задача 1.5: Очистка консоли
// Напишите ваш код решения ниже:

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
            message: hasClear ? 'Метод очистки найден' : 'Вызовите метод очистки консоли console.clear()'
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
    description: 'Создайте переменную alertMessage, которая обозначает текст предупреждения пользователю о несохраненных данных, со значением "Внимание: несохраненные изменения!". Выведите её в консоль с префиксом "[ALERT]" через запятую.',
    variableNamingTip: {
      recommendedName: 'alertMessage',
      meaning: 'текст предупреждающего сообщения',
      style: 'camelCase',
      why: 'Суффикс Message (alertMessage, errorMessage) прямо говорит о том, что переменная хранит готовый для пользователя текст.'
    },
    syntaxTags: ['alertMessage', 'console.log()', 'camelCase'],
    initialCode: `// Задача 1.6: Предупреждение пользователю
// Напишите ваш код решения ниже:

`,
    solutionCode: `const alertMessage = "Внимание: несохраненные изменения!";
console.log("[ALERT]", alertMessage);`,
    explanation: 'Префикс [ALERT] и текстовое сообщение формируют аккуратный структурированный лог.',
    expectedOutput: '[ALERT] Внимание: несохраненные изменения!',
    testCases: [
      {
        id: 't1-6-c1',
        title: 'Объявление переменной alertMessage',
        expected: 'Объявление alertMessage',
        validate: (_, code) => {
          const hasDecl = /(?:const|let)\s+alertMessage\s*=/.test(code);
          return {
            passed: hasDecl,
            actual: hasDecl ? 'alertMessage объявлена' : 'alertMessage не найдена',
            message: hasDecl ? 'Переменная объявлена правильно' : 'Создайте переменную alertMessage'
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
    description: 'Напишите три последовательных вывода в консоль для каждого этапа: 1) "1. Скачивание пакетов...", 2) "2. Аудит безопасности...", 3) "3. Пакеты установлены!".',
    variableNamingTip: {
      recommendedName: 'buildStep',
      meaning: 'текущий порядковый номер шага сборки',
      style: 'camelCase',
      why: 'Если номер шага изменяется во время сборки, переменную шага называют buildStep или currentStep.'
    },
    syntaxTags: ['последовательность инструкций', 'npm', 'console.log()'],
    initialCode: `// Задача 1.7: Этапы установки пакетов
// Напишите ваш код решения ниже:

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
    description: 'Создайте переменную componentName, которая обозначает название компонента, со значением "ProductList", и переменную renderTimeMs, которая обозначает время отрисовки в миллисекундах, со значением 14.5. Выведите в консоль через запятую: "Компонент:", componentName, "отрисован за:", renderTimeMs, "мс".',
    variableNamingTip: {
      recommendedName: 'renderTimeMs',
      meaning: 'время рендеринга компонента в миллисекундах',
      style: 'camelCase',
      why: 'Добавление суффикса единиц измерения (Ms, Px, Sec) — профессиональный стандарт: сразу ясно, в каких единицах хранится число.'
    },
    syntaxTags: ['console.log(аргументы)', 'суффикс единицы измерения', 'camelCase'],
    initialCode: `// Задача 1.8: Замер времени рендеринга
// Напишите ваш код решения ниже:

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
        expected: 'Объявление обеих переменных',
        validate: (_, code) => {
          const hasName = /(?:const|let)\s+componentName\s*=/.test(code);
          const hasTime = /(?:const|let)\s+renderTimeMs\s*=/.test(code);
          const ok = hasName && hasTime;
          return {
            passed: ok,
            actual: ok ? 'Переменные объявлены' : 'Не найдены componentName или renderTimeMs',
            message: ok ? 'Имена переменных верны' : 'Создайте переменные componentName и renderTimeMs'
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
    description: 'Создайте переменную errorCode, которая обозначает числовой статус ошибки, со значением 422, и переменную errorMessage, которая обозначает понятный пользователю текст ошибки, со значением "Email введен некорректно". Выведите их через запятую с префиксом "[ERROR]".',
    variableNamingTip: {
      recommendedName: 'errorCode / errorMessage',
      meaning: 'числовой код и текстовое описание ошибки валидации',
      style: 'camelCase',
      why: 'Слово code означает числовой статус, message — текст. Разделение понятий исключает путаницу в коде.'
    },
    syntaxTags: ['переменные', 'отладка ошибок', 'console.log()'],
    initialCode: `// Задача 1.9: Ошибка валидации формы
// Напишите ваш код решения ниже:

`,
    solutionCode: `const errorCode = 422;
const errorMessage = "Email введен некорректно";
console.log("[ERROR]", errorCode, errorMessage);`,
    explanation: 'Код ошибки и текст выводятся вместе для быстрой локализации проблемы.',
    expectedOutput: '[ERROR] 422 Email введен некорректно',
    testCases: [
      {
        id: 't1-9-c1',
        title: 'Объявление errorCode и errorMessage',
        expected: 'Объявление обеих переменных',
        validate: (_, code) => {
          const hasCode = /(?:const|let)\s+errorCode\s*=/.test(code);
          const hasMsg = /(?:const|let)\s+errorMessage\s*=/.test(code);
          const ok = hasCode && hasMsg;
          return {
            passed: ok,
            actual: ok ? 'Переменные объявлены' : 'Не найдены errorCode или errorMessage',
            message: ok ? 'Переменные объявлены верно' : 'Создайте переменные errorCode и errorMessage'
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
    description: 'Создайте переменную bundleSize, которая обозначает размер готового файла, со значением "142 kB", и переменную buildDuration, которая обозначает затраченное время, со значением "1.2s". Выведите в консоль через запятую: "Сборка завершена:", bundleSize, "за", buildDuration.',
    variableNamingTip: {
      recommendedName: 'bundleSize / buildDuration',
      meaning: 'размер собранного файла и время выполнения сборки',
      style: 'camelCase',
      why: 'Имена bundleSize и buildDuration самодокументируемы: по названию сразу ясно, что именно лежит внутри.'
    },
    syntaxTags: ['console.log()', 'camelCase', 'строковые переменные'],
    initialCode: `// Задача 1.10: Сводка сборки
// Напишите ваш код решения ниже:

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
        expected: 'Объявление bundleSize и buildDuration',
        validate: (_, code) => {
          const hasSize = /(?:const|let)\s+bundleSize\s*=/.test(code);
          const hasDur = /(?:const|let)\s+buildDuration\s*=/.test(code);
          const ok = hasSize && hasDur;
          return {
            passed: ok,
            actual: ok ? 'Переменные объявлены' : 'Проверьте объявление bundleSize и buildDuration',
            message: ok ? 'Переменные объявлены верно' : 'Создайте переменные bundleSize и buildDuration'
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
