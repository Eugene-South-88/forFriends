import { Task } from '../types';

export const topic2Tasks: Task[] = [
  {
    id: 't2-1',
    topicId: 2,
    number: 1,
    title: 'Глобальная конфигурация API в UPPER_SNAKE_CASE',
    frontendContext: '⚙️ Конфигурация клиента API',
    frontendScenario: 'В продакшн-приложениях базовый URL бэкенда задается как неизменяемая константа на уровне модуля, известная до запуска программы.',
    description: 'Создайте константу API_BASE_URL со значением "https://api.shop.com/v1". Выведите её значение в консоль с префиксом "API Endpoint:".',
    variableNamingTip: {
      recommendedName: 'API_BASE_URL',
      style: 'UPPER_SNAKE_CASE',
      keyword: 'const',
      why: 'В JavaScript константы, чьи значения жестко зафиксированы разработчиком ДО старта программы (настройки, URL бэкенда, секретные ключи), принято называть ЗАГЛАВНЫМИ БУКВАМИ через подчеркивание (UPPER_SNAKE_CASE). Используем const, чтобы никто не смог её случайно перезаписать.'
    },
    syntaxTags: ['const', 'UPPER_SNAKE_CASE', 'конфигурация'],
    initialCode: `// Задача 2.1: Конфигурация API
// 1. Создайте константу API_BASE_URL со значением "https://api.shop.com/v1"
// 2. Выведите в консоль: "API Endpoint:", API_BASE_URL

// Напишите ваш код ниже:

`,
    solutionCode: `const API_BASE_URL = "https://api.shop.com/v1";
console.log("API Endpoint:", API_BASE_URL);`,
    explanation: 'const защищает адрес API от случайной перезаписи в других модулях приложения.',
    expectedOutput: 'API Endpoint: https://api.shop.com/v1',
    testCases: [
      {
        id: 't2-1-c1',
        title: 'Использование const и стиля UPPER_SNAKE_CASE',
        expected: 'const API_BASE_URL = "https://api.shop.com/v1"',
        validate: (_, code) => {
          const hasConst = /const\s+API_BASE_URL\s*=/.test(code);
          return {
            passed: hasConst,
            actual: hasConst ? 'const API_BASE_URL объявлена' : 'Не найдена const API_BASE_URL',
            message: hasConst ? 'Константа объявлена верно' : 'Используйте const API_BASE_URL = "https://api.shop.com/v1";'
          };
        }
      },
      {
        id: 't2-1-c2',
        title: 'Корректный вывод адреса',
        expected: 'API Endpoint: https://api.shop.com/v1',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('API Endpoint:') && l.includes('https://api.shop.com/v1'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод совпадает' : 'Ожидался вывод: API Endpoint: https://api.shop.com/v1'
          };
        }
      }
    ]
  },
  {
    id: 't2-2',
    topicId: 2,
    number: 2,
    title: 'Счётчик товаров в корзине (мутабельная переменная)',
    frontendContext: '🛒 Состояние корзины интернет-магазина',
    frontendScenario: 'Пользователь кликает "Добавить в корзину", и количество товаров увеличивается. Значение переменной должно изменяться по ходу работы интерфейса.',
    description: 'Объявите переменную cartItemsCount с начальным значением 0 через let. Затем измените её значение на 3 и выведите: "Товаров в корзине:", cartItemsCount.',
    variableNamingTip: {
      recommendedName: 'cartItemsCount',
      style: 'camelCase',
      keyword: 'let',
      why: 'Используем let, так как значение будет меняться при кликах. Название camelCase начинается с существительного контекста (cart), уточняется сущностью (Items) и числовым суффиксом (Count).'
    },
    syntaxTags: ['let', 'изменение переменной', 'camelCase'],
    initialCode: `// Задача 2.2: Счётчик корзины
// 1. Создайте изменяемую переменную cartItemsCount с начальным значением 0 (используйте let!)
// 2. Переприсвойте cartItemsCount значение 3
// 3. Выведите: "Товаров в корзине:", cartItemsCount

// Напишите ваш код ниже:

`,
    solutionCode: `let cartItemsCount = 0;
cartItemsCount = 3;
console.log("Товаров в корзине:", cartItemsCount);`,
    explanation: 'Ключевое слово let позволяет повторно присваивать новые значения переменной при интерактивных действиях пользователя.',
    expectedOutput: 'Товаров в корзине: 3',
    testCases: [
      {
        id: 't2-2-c1',
        title: 'Объявление через let (не const и не var)',
        expected: 'let cartItemsCount = 0',
        validate: (_, code) => {
          const hasLet = /let\s+cartItemsCount\s*=/.test(code);
          return {
            passed: hasLet,
            actual: hasLet ? 'let cartItemsCount найден' : 'cartItemsCount не объявлен через let',
            message: hasLet ? 'Использован let для изменяемой переменной' : 'Объявите: let cartItemsCount = 0;'
          };
        }
      },
      {
        id: 't2-2-c2',
        title: 'Переприсваивание нового значения 3',
        expected: 'cartItemsCount = 3 в коде',
        validate: (_, code) => {
          const hasReassign = /cartItemsCount\s*=\s*3/.test(code);
          return {
            passed: hasReassign,
            actual: hasReassign ? 'Значение 3 присвоено' : 'Не найдено переприсваивание cartItemsCount = 3',
            message: hasReassign ? 'Переменная обновлена' : 'Добавьте: cartItemsCount = 3;'
          };
        }
      },
      {
        id: 't2-2-c3',
        title: 'Вывод обновленного количества',
        expected: 'Товаров в корзине: 3',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Товаров в корзине:') && l.includes('3'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод верен' : 'Ожидалось: Товаров в корзине: 3'
          };
        }
      }
    ]
  },
  {
    id: 't2-3',
    topicId: 2,
    number: 3,
    title: 'Регистрозависимость в стейте авторизации',
    frontendContext: '🔐 Контроль доступа и роли пользователей',
    frontendScenario: 'В JS переменные role, Role и ROLE — это три совершенно разные ячейки памяти. Ошибка в регистре может привести к уязвимости в правах доступа.',
    description: 'Объявите три разные переменные: role = "guest", Role = "editor", ROLE = "admin". Выведите их в консоль через запятую.',
    variableNamingTip: {
      recommendedName: 'userRole',
      style: 'camelCase',
      keyword: 'const',
      why: 'Чтобы не путаться в похожих словах, в реальном проекте дают понятные уникальные имена. Но помнить о чувствительности JS к регистру обязан каждый веб-разработчик.'
    },
    syntaxTags: ['регистрозависимость', 'let / const', 'синтаксис'],
    initialCode: `// Задача 2.3: Регистрозависимость
// 1. Создайте const role = "guest";
// 2. Создайте const Role = "editor";
// 3. Создайте const ROLE = "admin";
// 4. Выведите все три переменные в console.log через запятую

// Напишите ваш код ниже:

`,
    solutionCode: `const role = "guest";
const Role = "editor";
const ROLE = "admin";
console.log(role, Role, ROLE);`,
    explanation: 'JavaScript чувствителен к регистру: role, Role и ROLE хранят совершенно независимые значения.',
    expectedOutput: 'guest editor admin',
    testCases: [
      {
        id: 't2-3-c1',
        title: 'Объявление всех трех переменных с разным регистром',
        expected: 'role, Role и ROLE в коде',
        validate: (_, code) => {
          const has1 = /\brole\s*=/.test(code);
          const has2 = /\bRole\s*=/.test(code);
          const has3 = /\bROLE\s*=/.test(code);
          const ok = has1 && has2 && has3;
          return {
            passed: ok,
            actual: ok ? 'Все три переменные объявлены' : 'Не найдены переменные role, Role или ROLE',
            message: ok ? 'Регистрозависимость соблюдена' : 'Объявите role, Role и ROLE'
          };
        }
      },
      {
        id: 't2-3-c2',
        title: 'Вывод трех ролей через запятую',
        expected: 'guest editor admin',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('guest') && l.includes('editor') && l.includes('admin'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Все роли выведены' : 'Ожидался вывод: guest editor admin'
          };
        }
      }
    ]
  },
  {
    id: 't2-4',
    topicId: 2,
    number: 4,
    title: 'Защита неизменяемого ID пользователя через const',
    frontendContext: '🆔 Идентификатор сессии',
    frontendScenario: 'ID пользователя выдается сервером один раз при входе и не должен меняться на клиенте. Защитим его через const.',
    description: 'Создайте константу userId со значением "usr_9981". Выведите "Пользователь ID зафиксирован:", userId.',
    variableNamingTip: {
      recommendedName: 'userId',
      style: 'camelCase',
      keyword: 'const',
      why: 'userId пишется в camelCase, так как это локальная runtime-константа конкретного пользователя (в отличие от хардкодных глобальных настроек вроде API_BASE_URL). Ключевое слово const защищает от случайного изменения.'
    },
    syntaxTags: ['const', 'защита от перезаписи', 'TypeError'],
    initialCode: `// Задача 2.4: Защита ID константой
// 1. Создайте константу userId со значением "usr_9981"
// 2. Выведите: "Пользователь ID зафиксирован:", userId

// Напишите ваш код ниже:

`,
    solutionCode: `const userId = "usr_9981";
console.log("Пользователь ID зафиксирован:", userId);`,
    explanation: 'const запрещает переопределение переменной, делая код устойчивым к случайным ошибкам.',
    expectedOutput: 'Пользователь ID зафиксирован: usr_9981',
    testCases: [
      {
        id: 't2-4-c1',
        title: 'Использование const для userId',
        expected: 'const userId = "usr_9981"',
        validate: (_, code) => {
          const hasConst = /const\s+userId\s*=/.test(code);
          return {
            passed: hasConst,
            actual: hasConst ? 'const userId найден' : 'userId не объявлен через const',
            message: hasConst ? 'Использован const' : 'Объявите: const userId = "usr_9981";'
          };
        }
      },
      {
        id: 't2-4-c2',
        title: 'Корректный вывод сообщения',
        expected: 'Пользователь ID зафиксирован: usr_9981',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Пользователь ID зафиксирован:') && l.includes('usr_9981'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод верен' : 'Ожидалось: Пользователь ID зафиксирован: usr_9981'
          };
        }
      }
    ]
  },
  {
    id: 't2-5',
    topicId: 2,
    number: 5,
    title: 'Блочная область видимости в модальном окне',
    frontendContext: '📦 Изоляция временных переменных в блоках',
    frontendScenario: 'Внутри блока условия или модального окна создается временная переменная modalTitle. Благодаря блочной видимости let/const она не засоряет глобальный код.',
    description: 'Создайте блок с фигурными скобками { }. Внутри блока объявите const modalTitle = "Подтверждение оплаты"; и выведите её внутри этого блока.',
    variableNamingTip: {
      recommendedName: 'modalTitle',
      style: 'camelCase',
      keyword: 'const',
      why: 'Имя состоит из контекста (modal) и сущности (Title). Блочная область видимости гарантирует, что переменная исчезнет из памяти после закрытия блока {}.'
    },
    syntaxTags: ['фигурные скобки {}', 'block scope', 'let / const'],
    initialCode: `// Задача 2.5: Блочная область видимости
// 1. Откройте и закройте фигурные скобки блока: { }
// 2. Внутри блока создайте: const modalTitle = "Подтверждение оплаты";
// 3. Внутри блока выведите: "Внутри блока:", modalTitle

// Напишите ваш код ниже:

`,
    solutionCode: `{
  const modalTitle = "Подтверждение оплаты";
  console.log("Внутри блока:", modalTitle);
}`,
    explanation: 'Фигурные скобки {} создают блок. Переменные let и const существуют только внутри блока и защищают внешнюю область видимости.',
    expectedOutput: 'Внутри блока: Подтверждение оплаты',
    testCases: [
      {
        id: 't2-5-c1',
        title: 'Наличие блока фигурных скобок { }',
        expected: 'Блок { ... } с объявлением modalTitle',
        validate: (_, code) => {
          const hasBlock = /\{\s*[\s\S]*const\s+modalTitle[\s\S]*\}/.test(code);
          return {
            passed: hasBlock,
            actual: hasBlock ? 'Блок {} найден' : 'Блок {} с переменной modalTitle не обнаружен',
            message: hasBlock ? 'Фигурные скобки блока оформлены верно' : 'Оберните объявление в блок: { const modalTitle = ... }'
          };
        }
      },
      {
        id: 't2-5-c2',
        title: 'Вывод значения modalTitle',
        expected: 'Внутри блока: Подтверждение оплаты',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Внутри блока:') && l.includes('Подтверждение оплаты'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод получен' : 'Ожидался вывод: Внутри блока: Подтверждение оплаты'
          };
        }
      }
    ]
  },
  {
    id: 't2-6',
    topicId: 2,
    number: 6,
    title: 'Почему мы НЕ используем устаревший var: утечка из блока',
    frontendContext: '⚠️ Рефакторинг легаси-кода',
    frontendScenario: 'В старом коде переменная var "пробивает" фигурные скобки обычного блока {} (нет блочной видимости), что часто приводило к багам перезаписи.',
    description: 'Внутри блока { } объявите var legacyPromo = "DISCOUNT20";. Выведите значение переменной СНАРУЖИ этого блока, чтобы увидеть утечку var.',
    variableNamingTip: {
      recommendedName: 'legacyPromo',
      style: 'camelCase',
      keyword: 'const',
      why: 'В современном фронтенде ВСЕГДА используем const или let. Переменная var не чувствует фигурные скобки блоков, поэтому от неё отказались с приходом ES6.'
    },
    syntaxTags: ['var', 'function scope vs block scope', 'утечка переменных'],
    initialCode: `// Задача 2.6: Утечка var из блока
// 1. Создайте блок { } и объявите внутри: var legacyPromo = "DISCOUNT20";
// 2. СНАРУЖИ блока (после закрывающей скобки }) выведите: "Утечка var снаружи блока:", legacyPromo

// Напишите ваш код ниже:

`,
    solutionCode: `{
  var legacyPromo = "DISCOUNT20";
}
console.log("Утечка var снаружи блока:", legacyPromo);`,
    explanation: 'var не имеет блочной области видимости (только функциональную), поэтому переменная видна за пределами фигурных скобок.',
    expectedOutput: 'Утечка var снаружи блока: DISCOUNT20',
    testCases: [
      {
        id: 't2-6-c1',
        title: 'Объявление var legacyPromo внутри блока',
        expected: '{ var legacyPromo = "DISCOUNT20"; }',
        validate: (_, code) => {
          const hasVarInBlock = /\{\s*[\s\S]*var\s+legacyPromo\s*=/.test(code);
          return {
            passed: hasVarInBlock,
            actual: hasVarInBlock ? 'var в блоке найден' : 'var legacyPromo внутри {} не найден',
            message: hasVarInBlock ? 'Объявление var выполнено' : 'Создайте блок: { var legacyPromo = "DISCOUNT20"; }'
          };
        }
      },
      {
        id: 't2-6-c2',
        title: 'Вывод снаружи блока',
        expected: 'Утечка var снаружи блока: DISCOUNT20',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Утечка var снаружи блока:') && l.includes('DISCOUNT20'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Утечка продемонстрирована' : 'Ожидался вывод: Утечка var снаружи блока: DISCOUNT20'
          };
        }
      }
    ]
  },
  {
    id: 't2-7',
    topicId: 2,
    number: 7,
    title: 'Документирование кода: однострочные и многострочные комментарии',
    frontendContext: '📝 Командная разработка и Code Review',
    frontendScenario: 'Фронтендер оставляет комментарии к логике расчета стоимости товара, чтобы коллеги понимали назначение переменных.',
    description: 'Напишите многострочный комментарий /* ... */ с текстом "Расчет стоимости", создайте const productPrice = 1200; с однострочным комментарием // в рублях, и выведите: "Цена товара:", productPrice.',
    variableNamingTip: {
      recommendedName: 'productPrice',
      style: 'camelCase',
      keyword: 'const',
      why: 'Имя productPrice однозначно указывает на цену товара. Если цена со скидкой — discountedProductPrice.'
    },
    syntaxTags: ['// однострочный комментарий', '/* многострочный */', 'чистота кода'],
    initialCode: `// Задача 2.7: Комментарии
// 1. Добавьте многострочный комментарий /* Расчет стоимости */
// 2. Создайте: const productPrice = 1200; // в рублях
// 3. Выведите: "Цена товара:", productPrice

// Напишите ваш код ниже:

`,
    solutionCode: `/* Расчет стоимости */
const productPrice = 1200; // в рублях
console.log("Цена товара:", productPrice);`,
    explanation: 'Комментарии игнорируются движком JavaScript и помогают разработчикам ориентироваться в кодовой базе.',
    expectedOutput: 'Цена товара: 1200',
    testCases: [
      {
        id: 't2-7-c1',
        title: 'Наличие многострочного комментария /* ... */',
        expected: 'Многострочный комментарий в коде',
        validate: (_, code) => {
          const hasMulti = /\/\*[\s\S]*\*\//.test(code);
          return {
            passed: hasMulti,
            actual: hasMulti ? 'Многострочный комментарий найден' : 'Многострочный комментарий не найден',
            message: hasMulti ? 'Синтаксис /* */ корректен' : 'Добавьте: /* Расчет стоимости */'
          };
        }
      },
      {
        id: 't2-7-c2',
        title: 'Вывод цены товара',
        expected: 'Цена товара: 1200',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Цена товара:') && l.includes('1200'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Цена выведена' : 'Ожидался вывод: Цена товара: 1200'
          };
        }
      }
    ]
  },
  {
    id: 't2-8',
    topicId: 2,
    number: 8,
    title: 'Правила допустимых символов: $ и _ в именах переменных',
    frontendContext: '⚛️ Фреймворки и приватные переменные',
    frontendScenario: 'В React/RxJS и фронтенд-библиотеках знак $ часто обозначает стримы данных, а _ — внутренние или приватные переменные.',
    description: 'Объявите две переменные: const $streamId = 101; и const _cachedToken = "tk_abc";. Выведите их через запятую с пояснениями: "Stream:", $streamId, "Cache:", _cachedToken.',
    variableNamingTip: {
      recommendedName: '$streamId / _cachedToken',
      style: 'camelCase',
      keyword: 'const',
      why: 'Имена переменных в JS могут начинаться с букв (a-z), а также со знаков $ и _. Но цифра не может стоять первой (1stream — фатальная ошибка!).'
    },
    syntaxTags: ['символы $ и _', 'правила имен', 'спецсимволы'],
    initialCode: `// Задача 2.8: Символы $ и _
// 1. Создайте const $streamId = 101;
// 2. Создайте const _cachedToken = "tk_abc";
// 3. Выведите: "Stream:", $streamId, "Cache:", _cachedToken

// Напишите ваш код ниже:

`,
    solutionCode: `const $streamId = 101;
const _cachedToken = "tk_abc";
console.log("Stream:", $streamId, "Cache:", _cachedToken);`,
    explanation: '$ и _ — единственные специальные знаки пунктуации, разрешенные в идентификаторах переменных JavaScript.',
    expectedOutput: 'Stream: 101 Cache: tk_abc',
    testCases: [
      {
        id: 't2-8-c1',
        title: 'Объявление переменных со знаками $ и _',
        expected: 'const $streamId и const _cachedToken',
        validate: (_, code) => {
          const hasDollar = /const\s+\$streamId\s*=/.test(code);
          const hasUnder = /const\s+_cachedToken\s*=/.test(code);
          const ok = hasDollar && hasUnder;
          return {
            passed: ok,
            actual: ok ? 'Обе переменные найдены' : 'Проверьте имена $streamId и _cachedToken',
            message: ok ? 'Спецсимволы применены верно' : 'Создайте const $streamId = 101; и const _cachedToken = "tk_abc";'
          };
        }
      },
      {
        id: 't2-8-c2',
        title: 'Вывод обеих переменных',
        expected: 'Stream: 101 Cache: tk_abc',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('101') && l.includes('tk_abc'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод верен' : 'Ожидался вывод: Stream: 101 Cache: tk_abc'
          };
        }
      }
    ]
  },
  {
    id: 't2-9',
    topicId: 2,
    number: 9,
    title: 'Флаг загрузки кнопки (состояние Loading State)',
    frontendContext: '⏳ Асинхронные операции в интерфейсе',
    frontendScenario: 'Когда пользователь нажимает "Оплатить", кнопка переходит в состояние загрузки (показывается спиннер), а после ответа сервера — обратно.',
    description: 'Объявите let isLoading = false;. Затем измените его на true (клик по кнопке) и выведите: "Состояние кнопки:", isLoading.',
    variableNamingTip: {
      recommendedName: 'isLoading',
      style: 'camelCase',
      keyword: 'let',
      why: 'Булевы флаги во фронтенде ВСЕГДА называют с глагольных приставок: is (isLoading, isVisible), has (hasError), can (canSubmit). Стиль — camelCase, ключевое слово — let (так как флаг переключается).'
    },
    syntaxTags: ['let', 'булев флаг', 'префиксы is/has'],
    initialCode: `// Задача 2.9: Флаг загрузки кнопки
// 1. Создайте let isLoading = false;
// 2. Измените значение isLoading на true
// 3. Выведите: "Состояние кнопки:", isLoading

// Напишите ваш код ниже:

`,
    solutionCode: `let isLoading = false;
isLoading = true;
console.log("Состояние кнопки:", isLoading);`,
    explanation: 'Флаги состояния (state flags) требуют let, так как регулярно переключаются между true и false.',
    expectedOutput: 'Состояние кнопки: true',
    testCases: [
      {
        id: 't2-9-c1',
        title: 'Объявление isLoading через let',
        expected: 'let isLoading = false',
        validate: (_, code) => {
          const hasLet = /let\s+isLoading\s*=/.test(code);
          return {
            passed: hasLet,
            actual: hasLet ? 'let isLoading найден' : 'isLoading не объявлен через let',
            message: hasLet ? 'Использован let для флага' : 'Объявите: let isLoading = false;'
          };
        }
      },
      {
        id: 't2-9-c2',
        title: 'Переключение в true',
        expected: 'isLoading = true в коде',
        validate: (_, code) => {
          const hasTrue = /isLoading\s*=\s*true/.test(code);
          return {
            passed: hasTrue,
            actual: hasTrue ? 'Значение true присвоено' : 'Не найдено isLoading = true',
            message: hasTrue ? 'Флаг переключен' : 'Добавьте строку: isLoading = true;'
          };
        }
      },
      {
        id: 't2-9-c3',
        title: 'Вывод состояния кнопки',
        expected: 'Состояние кнопки: true',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Состояние кнопки:') && l.includes('true'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод совпадает' : 'Ожидался вывод: Состояние кнопки: true'
          };
        }
      }
    ]
  },
  {
    id: 't2-10',
    topicId: 2,
    number: 10,
    title: 'Запрещенные ключевые слова в именах переменных',
    frontendContext: '🚫 Защита от синтаксических ошибок',
    frontendScenario: 'Разработчик пытается назвать переменную class (в HTML это CSS-класс), но в JS слово class зарезервировано под создание классов ООП.',
    description: 'Задайте CSS-класс кнопки через правильное имя buttonClassName = "btn-primary"; и выведите: "Класс элемента:", buttonClassName.',
    variableNamingTip: {
      recommendedName: 'buttonClassName',
      style: 'camelCase',
      keyword: 'const',
      why: 'Нельзя называть переменные словами языка: let, const, class, return, function. Поэтому в React свойство называется className, а переменные стилей — buttonClassName или itemClass.'
    },
    syntaxTags: ['зарезервированные слова', 'className', 'правила синтаксиса'],
    initialCode: `// Задача 2.10: Корректное имя для CSS-класса
// 1. Создайте const buttonClassName = "btn-primary";
// 2. Выведите: "Класс элемента:", buttonClassName

// Напишите ваш код ниже:

`,
    solutionCode: `const buttonClassName = "btn-primary";
console.log("Класс элемента:", buttonClassName);`,
    explanation: 'Использование зарезервированных слов приведет к SyntaxError, поэтому к ним добавляют контекстные уточнения.',
    expectedOutput: 'Класс элемента: btn-primary',
    testCases: [
      {
        id: 't2-10-c1',
        title: 'Объявление buttonClassName (не class)',
        expected: 'const buttonClassName = "btn-primary"',
        validate: (_, code) => {
          const hasName = /const\s+buttonClassName\s*=/.test(code);
          return {
            passed: hasName,
            actual: hasName ? 'buttonClassName объявлена' : 'Переменная buttonClassName не найдена',
            message: hasName ? 'Имя выбрано корректно' : 'Объявите: const buttonClassName = "btn-primary";'
          };
        }
      },
      {
        id: 't2-10-c2',
        title: 'Вывод класса элемента',
        expected: 'Класс элемента: btn-primary',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Класс элемента:') && l.includes('btn-primary'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Вывод совпадает' : 'Ожидался вывод: Класс элемента: btn-primary'
          };
        }
      }
    ]
  }
];
