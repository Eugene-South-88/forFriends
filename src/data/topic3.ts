import { Task } from '../types';

export const topic3Tasks: Task[] = [
  {
    id: 't3-1',
    topicId: 3,
    number: 1,
    title: 'Валидация типов ответа бэкенда через typeof',
    frontendContext: '📡 Проверка данных от API (Runtime Type Check)',
    frontendScenario: 'Фронтенд получил с бэкенда объект пользователя. Перед рендерингом нужно убедиться, что возраст пришел числом, а имя — строкой.',
    description: 'Создайте age = 28 и userName = "Мария". Выведите через console.log типы обеих переменных, используя оператор typeof.',
    variableNamingTip: {
      recommendedName: 'userAge / userName',
      style: 'camelCase',
      keyword: 'const',
      why: 'Для начинающих: оператор typeof пишется перед переменной через пробел (typeof age). Переменные неизменны, поэтому используем const.'
    },
    syntaxTags: ['typeof', 'number', 'string'],
    initialCode: `// Задача 3.1: Проверка типов с typeof
// 1. Создайте const age = 28;
// 2. Создайте const userName = "Мария";
// 3. Выведите типы обеих переменных через typeof в одном console.log: console.log(typeof age, typeof userName);

// Напишите ваш код ниже:

`,
    solutionCode: `const age = 28;
const userName = "Мария";
console.log(typeof age, typeof userName);`,
    explanation: 'Оператор typeof возвращает строку с именем типа операнда: "number", "string", "boolean" и т.д.',
    expectedOutput: 'number string',
    testCases: [
      {
        id: 't3-1-c1',
        title: 'Использование оператора typeof в коде',
        expected: 'typeof age и typeof userName',
        validate: (_, code) => {
          const hasTypeof = /typeof\s+age/.test(code) && /typeof\s+userName/.test(code);
          return {
            passed: hasTypeof,
            actual: hasTypeof ? 'Оператор typeof применен' : 'Оператор typeof не найден для обеих переменных',
            message: hasTypeof ? 'Синтаксис typeof верен' : 'Напишите: console.log(typeof age, typeof userName);'
          };
        }
      },
      {
        id: 't3-1-c2',
        title: 'Вывод типов number и string',
        expected: 'number string',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('number') && l.includes('string'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Типы определены' : 'Ожидался вывод: number string'
          };
        }
      }
    ]
  },
  {
    id: 't3-2',
    topicId: 3,
    number: 2,
    title: 'Разница между undefined и null в профиле пользователя',
    frontendContext: '👤 Состояние профиля: не назначено vs намеренно пусто',
    frontendScenario: 'В UI undefined означает, что поле еще не инициализировано, а null — что аватар пользователя намеренно отсутствует (пользователь не загрузил фото).',
    description: 'Объявите let unassignedRole; (будет undefined) и const avatarUrl = null;. Выведите значения обеих переменных и оператор typeof для avatarUrl (обратите внимание на особенность "object").',
    variableNamingTip: {
      recommendedName: 'avatarUrl / unassignedRole',
      style: 'camelCase',
      keyword: 'const / let',
      why: 'unassignedRole объявляется через let без начального значения (поэтому получает undefined). avatarUrl объявляется через const = null (явное отсутствие объекта).'
    },
    syntaxTags: ['undefined', 'null', 'typeof null'],
    initialCode: `// Задача 3.2: undefined и null
// 1. Объявите: let unassignedRole;
// 2. Объявите: const avatarUrl = null;
// 3. Выведите все три значения: unassignedRole, avatarUrl, typeof avatarUrl

// Напишите ваш код ниже:

`,
    solutionCode: `let unassignedRole;
const avatarUrl = null;
console.log(unassignedRole, avatarUrl, typeof avatarUrl);`,
    explanation: 'undefined — значение по умолчанию для неинициализированных переменных. null — явное отсутствие значения. Историческая особенность JS: typeof null возвращает "object".',
    expectedOutput: 'undefined null object',
    testCases: [
      {
        id: 't3-2-c1',
        title: 'Объявление неинициализированной переменной и null',
        expected: 'let unassignedRole; и const avatarUrl = null;',
        validate: (_, code) => {
          const hasUnassigned = /let\s+unassignedRole\s*;/.test(code);
          const hasNull = /avatarUrl\s*=\s*null/.test(code);
          const ok = hasUnassigned && hasNull;
          return {
            passed: ok,
            actual: ok ? 'Обе переменные объявлены' : 'Проверьте объявление unassignedRole и avatarUrl',
            message: ok ? 'undefined и null объявлены верно' : 'Создайте: let unassignedRole; const avatarUrl = null;'
          };
        }
      },
      {
        id: 't3-2-c2',
        title: 'Вывод undefined, null и типа object',
        expected: 'undefined null object',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('undefined') && l.includes('null') && l.includes('object'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод совпадает' : 'Ожидался вывод: undefined null object'
          };
        }
      }
    ]
  },
  {
    id: 't3-3',
    topicId: 3,
    number: 3,
    title: 'Быстрое приведение ввода формы к числу через унарный плюс (+)',
    frontendContext: '📝 Получение чисел из HTML полей формы (<input>)',
    frontendScenario: 'Значения из input[type="text"] всегда приходят строкой. Унарный плюс + перед строкой — самый быстрый способ преобразовать её в число.',
    description: 'Дана строка const inputPrice = "450";. Преобразуйте её в число с помощью унарного плюса +inputPrice и сохраните в priceNumber. Выведите полученное число и его typeof.',
    variableNamingTip: {
      recommendedName: 'priceNumber',
      style: 'camelCase',
      keyword: 'const',
      why: 'Преобразуя inputPrice в число, новую переменную называют price или priceNumber, чтобы в коде было очевидно изменение типа с текста на число.'
    },
    syntaxTags: ['унарный плюс +', 'явное приведение', 'typeof'],
    initialCode: `// Задача 3.3: Унарный плюс (+)
// 1. Создайте const inputPrice = "450";
// 2. Преобразуйте строку в число с помощью унарного плюса: const priceNumber = +inputPrice;
// 3. Выведите: priceNumber, typeof priceNumber

// Напишите ваш код ниже:

`,
    solutionCode: `const inputPrice = "450";
const priceNumber = +inputPrice;
console.log(priceNumber, typeof priceNumber);`,
    explanation: 'Унарный плюс (+) перед строкой — самый быстрый и лаконичный способ привести строковое число к типу Number.',
    expectedOutput: '450 number',
    testCases: [
      {
        id: 't3-3-c1',
        title: 'Использование унарного плюса +inputPrice',
        expected: '+inputPrice в объявлении priceNumber',
        validate: (_, code) => {
          const hasUnary = /\+\s*inputPrice/.test(code);
          return {
            passed: hasUnary,
            actual: hasUnary ? 'Унарный плюс найден' : 'Унарный плюс +inputPrice не найден',
            message: hasUnary ? 'Унарный плюс применен верно' : 'Напишите: const priceNumber = +inputPrice;'
          };
        }
      },
      {
        id: 't3-3-c2',
        title: 'Вывод числа 450 и типа number',
        expected: '450 number',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('450') && l.includes('number'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Число и тип number получены' : 'Ожидался вывод: 450 number'
          };
        }
      }
    ]
  },
  {
    id: 't3-4',
    topicId: 3,
    number: 4,
    title: 'Защита от Infinity при расчете цены за клик (CPC)',
    frontendContext: '📊 Маркетинговая аналитика рекламных кампаний',
    frontendScenario: 'При делении бюджета на 0 кликов в JS получается Infinity, а не авария программы. Фронтенд должен понимать природу этого значения.',
    description: 'Вычислите деление 1000 / 0. Сохраните в const costPerClick, выведите результат и его тип данных через typeof costPerClick.',
    variableNamingTip: {
      recommendedName: 'costPerClick',
      style: 'camelCase',
      keyword: 'const',
      why: 'В веб-маркетинге метрика Cost Per Click всегда сокращается или называется costPerClick. Стиль camelCase, keyword — const.'
    },
    syntaxTags: ['Infinity', 'деление на 0', 'typeof'],
    initialCode: `// Задача 3.4: Бесконечность Infinity
// 1. Создайте const costPerClick = 1000 / 0;
// 2. Выведите в консоль: costPerClick, typeof costPerClick

// Напишите ваш код ниже:

`,
    solutionCode: `const costPerClick = 1000 / 0;
console.log(costPerClick, typeof costPerClick);`,
    explanation: 'В JavaScript деление положительного числа на 0 возвращает Infinity, которое также относится к типу "number".',
    expectedOutput: 'Infinity number',
    testCases: [
      {
        id: 't3-4-c1',
        title: 'Вычисление деления на 0',
        expected: '1000 / 0 в коде',
        validate: (_, code) => {
          const hasDivZero = /\/\s*0/.test(code);
          return {
            passed: hasDivZero,
            actual: hasDivZero ? 'Деление на 0 найдено' : 'Деление на 0 не обнаружено',
            message: hasDivZero ? 'Операция верна' : 'Напишите: const costPerClick = 1000 / 0;'
          };
        }
      },
      {
        id: 't3-4-c2',
        title: 'Вывод Infinity и типа number',
        expected: 'Infinity number',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Infinity') && l.includes('number'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Infinity успешно выведено' : 'Ожидался вывод: Infinity number'
          };
        }
      }
    ]
  },
  {
    id: 't3-5',
    topicId: 3,
    number: 5,
    title: 'Феномен NaN и мем baNaNa из методички МФТИ',
    frontendContext: '⚠️ Поиск ошибок математических операций (Not a Number)',
    frontendScenario: 'В методичке МФТИ (стр. 31) подробно разобран пример "baNaNa", когда попытка привести букву "a" к числу через унарный плюс возвращает NaN.',
    description: 'Выведите результат выражения \'b\' + \'a\' + + \'a\' + \'a\', а на следующей строке выведите: "Тип NaN:", typeof NaN.',
    variableNamingTip: {
      recommendedName: 'invalidNumberResult',
      style: 'camelCase',
      keyword: 'const',
      why: 'NaN ("Not a Number") возникает при математических операциях с нечисловыми данными. Важнейший факт: typeof NaN возвращает "number"!'
    },
    syntaxTags: ['NaN', 'baNaNa', 'typeof NaN'],
    initialCode: `// Задача 3.5: Мем baNaNa
// 1. Выведите результат: console.log('b' + 'a' + + 'a' + 'a');
// 2. Выведите тип NaN: console.log("Тип NaN:", typeof NaN);

// Напишите ваш код ниже:

`,
    solutionCode: `console.log('b' + 'a' + + 'a' + 'a');
console.log("Тип NaN:", typeof NaN);`,
    explanation: '+\'a\' возвращает NaN. Строковая конкатенация объединяет \'b\' + \'a\' + NaN + \'a\' в \'baNaNa\'. При этом typeof NaN — это "number"!',
    expectedOutput: 'baNaNa\nТип NaN: number',
    testCases: [
      {
        id: 't3-5-c1',
        title: 'Вывод слова baNaNa',
        expected: 'baNaNa в выводе',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('baNaNa'));
          return {
            passed: match,
            actual: match ? 'baNaNa выведено' : logs.join(' '),
            message: match ? 'Выражение посчитано верно' : 'Ожидался вывод baNaNa'
          };
        }
      },
      {
        id: 't3-5-c2',
        title: 'Проверка typeof NaN',
        expected: 'Тип NaN: number',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Тип NaN:') && l.includes('number'));
          return {
            passed: match,
            actual: match ? 'Тип NaN подтвержден' : logs.join(' '),
            message: match ? 'typeof NaN равен number' : 'Ожидалось: "Тип NaN: number"'
          };
        }
      }
    ]
  },
  {
    id: 't3-6',
    topicId: 3,
    number: 6,
    title: 'Большие идентификаторы транзакций через BigInt',
    frontendContext: '💳 Платежный шлюз и финтех-транзакции',
    frontendScenario: 'Идентификаторы транзакций в банках превышают 2^53 - 1. Для них в JS создан тип данных BigInt, обозначаемый суффиксом n.',
    description: 'Создайте константу orderTransactionId со значением 9007199254740995n (с буквой n в конце). Выведите значение и typeof orderTransactionId.',
    variableNamingTip: {
      recommendedName: 'orderTransactionId',
      style: 'camelCase',
      keyword: 'const',
      why: 'Составное имя order + Transaction + Id указывает на конкретный финансовый ордер. Суффикс Id стандартен для первичных ключей.'
    },
    syntaxTags: ['BigInt', 'суффикс n', 'typeof'],
    initialCode: `// Задача 3.6: BigInt
// 1. Создайте const orderTransactionId = 9007199254740995n; (обратите внимание на n в конце!)
// 2. Выведите: orderTransactionId, typeof orderTransactionId

// Напишите ваш код ниже:

`,
    solutionCode: `const orderTransactionId = 9007199254740995n;
console.log(orderTransactionId, typeof orderTransactionId);`,
    explanation: 'BigInt создается добавлением буквы "n" в конец целого числа и позволяет безопасно оперировать гигантскими числами.',
    expectedOutput: '9007199254740995n bigint',
    testCases: [
      {
        id: 't3-6-c1',
        title: 'Использование суффикса n для BigInt',
        expected: '9007199254740995n в коде',
        validate: (_, code) => {
          const hasBigInt = /9007199254740995n/.test(code);
          return {
            passed: hasBigInt,
            actual: hasBigInt ? 'Суффикс n найден' : 'Число с суффиксом n не найдено',
            message: hasBigInt ? 'BigInt синтаксис корректен' : 'Объявите: const orderTransactionId = 9007199254740995n;'
          };
        }
      },
      {
        id: 't3-6-c2',
        title: 'Вывод значения и типа bigint',
        expected: '9007199254740995n bigint',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('9007199254740995') && l.includes('bigint'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод совпадает' : 'Ожидался вывод: 9007199254740995n bigint'
          };
        }
      }
    ]
  },
  {
    id: 't3-7',
    topicId: 3,
    number: 7,
    title: 'Уникальные скрытые ключи через Symbol',
    frontendContext: '⚛️ Внутренние уникальные метаданные компонентов',
    frontendScenario: 'В UI-библиотеках Symbol используется для создания скрытых уникальных ключей, гарантированно защищенных от коллизий имен.',
    description: 'Создайте символ const internalId = Symbol("componentId");. Выведите его описание internalId.description и тип typeof internalId.',
    variableNamingTip: {
      recommendedName: 'internalId',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово internal сигнализирует коллегам, что это внутренний служебный идентификатор. Символ неизменяем — пишем const.'
    },
    syntaxTags: ['Symbol()', 'уникальные ключи', 'typeof'],
    initialCode: `// Задача 3.7: Примитив Symbol
// 1. Создайте const internalId = Symbol("componentId");
// 2. Выведите: internalId.description, typeof internalId

// Напишите ваш код ниже:

`,
    solutionCode: `const internalId = Symbol("componentId");
console.log(internalId.description, typeof internalId);`,
    explanation: 'Symbol() генерирует абсолютно уникальный идентификатор. Описание в скобках доступно через свойство .description.',
    expectedOutput: 'componentId symbol',
    testCases: [
      {
        id: 't3-7-c1',
        title: 'Вызов Symbol("componentId")',
        expected: 'const internalId = Symbol("componentId")',
        validate: (_, code) => {
          const hasSymbol = /Symbol\s*\(\s*["']componentId["']\s*\)/.test(code);
          return {
            passed: hasSymbol,
            actual: hasSymbol ? 'Symbol создан' : 'Symbol("componentId") не найден',
            message: hasSymbol ? 'Функция Symbol вызвана верно' : 'Создайте: const internalId = Symbol("componentId");'
          };
        }
      },
      {
        id: 't3-7-c2',
        title: 'Вывод description и типа symbol',
        expected: 'componentId symbol',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('componentId') && l.includes('symbol'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Символ определен' : 'Ожидался вывод: componentId symbol'
          };
        }
      }
    ]
  },
  {
    id: 't3-8',
    topicId: 3,
    number: 8,
    title: 'Неявное приведение: сложение vs вычитание строк',
    frontendContext: '⚠️ Ловушки вычислений размеров CSS',
    frontendScenario: 'Если вычесть из строки "50" число 20, JS неявно приведет строку к числу (30), но при сложении выполнит строковую конкатенацию ("5020")!',
    description: 'Вычислите const addResult = "50" + 20; и const subResult = "50" - 20;. Выведите: "Сложение:", addResult, "Вычитание:", subResult.',
    variableNamingTip: {
      recommendedName: 'addResult / subResult',
      style: 'camelCase',
      keyword: 'const',
      why: 'Префиксы add и sub наглядно отражают проверяемые математические действия.'
    },
    syntaxTags: ['неявное приведение', 'конкатенация', 'вычитание'],
    initialCode: `// Задача 3.8: Неявное приведение (+ vs -)
// 1. Создайте const addResult = "50" + 20;
// 2. Создайте const subResult = "50" - 20;
// 3. Выведите: "Сложение:", addResult, "Вычитание:", subResult

// Напишите ваш код ниже:

`,
    solutionCode: `const addResult = "50" + 20;
const subResult = "50" - 20;
console.log("Сложение:", addResult, "Вычитание:", subResult);`,
    explanation: 'Оператор + при наличии строки склеивает операнды ("5020"). Оператор - преобразует строку в число (30).',
    expectedOutput: 'Сложение: 5020 Вычитание: 30',
    testCases: [
      {
        id: 't3-8-c1',
        title: 'Объявление addResult и subResult',
        expected: '"50" + 20 и "50" - 20 в коде',
        validate: (_, code) => {
          const hasAdd = /["']50["']\s*\+\s*20/.test(code);
          const hasSub = /["']50["']\s*-\s*20/.test(code);
          const ok = hasAdd && hasSub;
          return {
            passed: ok,
            actual: ok ? 'Оба выражения присутствуют' : 'Проверьте операции "50" + 20 и "50" - 20',
            message: ok ? 'Выражения составлены верно' : 'Объявите addResult и subResult'
          };
        }
      },
      {
        id: 't3-8-c2',
        title: 'Вывод результатов 5020 и 30',
        expected: 'Сложение: 5020 Вычитание: 30',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('5020') && l.includes('30'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод верен' : 'Ожидался вывод: Сложение: 5020 Вычитание: 30'
          };
        }
      }
    ]
  },
  {
    id: 't3-9',
    topicId: 3,
    number: 9,
    title: 'Явное приведение к логическому типу через Boolean()',
    frontendContext: '🔘 Условный рендеринг компонентов (Truthy / Falsy)',
    frontendScenario: 'Чтобы решить, показывать ли плашку скидки, проверяют наличие промокода. Пустая строка "" дает false, а непустая — true.',
    description: 'Преобразуйте с помощью функции Boolean() значения: "", "SALE2026", 0, 1. Выведите все 4 результата через запятую в одном console.log.',
    variableNamingTip: {
      recommendedName: 'hasPromoCode',
      style: 'camelCase',
      keyword: 'const',
      why: 'Булево значение наличия промокода идеально называть hasPromoCode (вопрос "Есть ли промокод?" требует ответа да/нет: true/false).'
    },
    syntaxTags: ['Boolean()', 'truthy / falsy', 'явное преобразование'],
    initialCode: `// Задача 3.9: Функция Boolean()
// Выведите в консоль 4 значения через запятую:
// Boolean(""), Boolean("SALE2026"), Boolean(0), Boolean(1)

// Напишите ваш код ниже:

`,
    solutionCode: `console.log(Boolean(""), Boolean("SALE2026"), Boolean(0), Boolean(1));`,
    explanation: 'В JS значения "", 0, null, undefined, NaN приводятся к false (falsy). Все непустые строки и ненулевые числа дают true (truthy).',
    expectedOutput: 'false true false true',
    testCases: [
      {
        id: 't3-9-c1',
        title: 'Вызов функции Boolean для всех 4 значений',
        expected: 'Boolean(""), Boolean("SALE2026"), Boolean(0), Boolean(1)',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('false') && l.includes('true'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Логические значения получены' : 'Ожидался вывод: false true false true'
          };
        }
      }
    ]
  },
  {
    id: 't3-10',
    topicId: 3,
    number: 10,
    title: 'Динамическая типизация в переменной ответа API',
    frontendContext: '🔄 Жизненный цикл загрузки данных (Pending -> Success)',
    frontendScenario: 'В JS переменная может менять тип во время работы: в момент ожидания ответа сервера apiData равна null (object), а после ответа становится строкой.',
    description: 'Объявите let apiData = null; и выведите: "До загрузки:", typeof apiData. Затем запишите apiData = "OK"; и выведите: "После загрузки:", typeof apiData.',
    variableNamingTip: {
      recommendedName: 'apiData',
      style: 'camelCase',
      keyword: 'let',
      why: 'Переменная объявлена через let, так как ее тип и значение динамически меняются в процессе работы скрипта.'
    },
    syntaxTags: ['динамическая типизация', 'let', 'typeof'],
    initialCode: `// Задача 3.10: Смена типа переменной
// 1. Создайте let apiData = null;
// 2. Выведите: "До загрузки:", typeof apiData
// 3. Переприсвойте: apiData = "OK";
// 4. Выведите: "После загрузки:", typeof apiData

// Напишите ваш код ниже:

`,
    solutionCode: `let apiData = null;
console.log("До загрузки:", typeof apiData);
apiData = "OK";
console.log("После загрузки:", typeof apiData);`,
    explanation: 'Динамическая типизация позволяет одной и той же переменной в разные моменты времени содержать значения различных типов.',
    expectedOutput: 'До загрузки: object\nПосле загрузки: string',
    testCases: [
      {
        id: 't3-10-c1',
        title: 'Использование let для смены типа',
        expected: 'let apiData = null с последующей сменой значения',
        validate: (_, code) => {
          const hasLet = /let\s+apiData\s*=/.test(code);
          return {
            passed: hasLet,
            actual: hasLet ? 'let apiData найден' : 'apiData не объявлена через let',
            message: hasLet ? 'Использован let' : 'Объявите: let apiData = null;'
          };
        }
      },
      {
        id: 't3-10-c2',
        title: 'Вывод object и string',
        expected: 'До загрузки: object и После загрузки: string',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('object')) && logs.some((l) => l.includes('string'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Смена типа продемонстрирована' : 'Ожидался вывод с object и string'
          };
        }
      }
    ]
  }
];
