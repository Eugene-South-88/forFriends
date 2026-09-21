import { Task } from '../types';

export const topic5Tasks: Task[] = [
  {
    id: 't5-1',
    topicId: 5,
    number: 1,
    title: 'Шаблонная строка личного кабинета (бэктики и ${})',
    frontendContext: '👤 Персонализированный баннер приветствия',
    frontendScenario: 'Вместо неудобного склеивания через плюсы современные фронтендеры используют шаблонные строки (обратные кавычки ` ` и интерполяцию ${}).',
    description: 'Даны userName = "Евгений" и unreadCount = 4. Сформируйте шаблонную строку в бэктиках: `Привет, ${userName}! У вас ${unreadCount} новых уведомлений.` и выведите её.',
    variableNamingTip: {
      recommendedName: 'greetingBanner',
      style: 'camelCase',
      keyword: 'const',
      why: 'Обратные кавычки ` ` (клавиша Ё на клавиатуре) позволяют вставлять переменные прямо внутрь строки через ${переменная}.'
    },
    syntaxTags: ['Template Literals', 'бэктики ``', 'интерполяция ${}'],
    initialCode: `// Задача 5.1: Шаблонные строки (бэктики)
// 1. Создайте const userName = "Евгений";
// 2. Создайте const unreadCount = 4;
// 3. Создайте шаблонную строку в обратных кавычках:
//    const greetingBanner = \`Привет, \${userName}! У вас \${unreadCount} новых уведомлений.\`;
// 4. Выведите greetingBanner в консоль

// Напишите ваш код ниже:

`,
    solutionCode: `const userName = "Евгений";
const unreadCount = 4;
const greetingBanner = \`Привет, \${userName}! У вас \${unreadCount} новых уведомлений.\`;
console.log(greetingBanner);`,
    explanation: 'Интерполяция ${...} внутри шаблонных строк автоматически вычисляет выражения и преобразует их в текст.',
    expectedOutput: 'Привет, Евгений! У вас 4 новых уведомлений.',
    testCases: [
      {
        id: 't5-1-c1',
        title: 'Использование обратных кавычек ` ` и интерполяции ${}',
        expected: '`Привет, ${userName}! ...` в коде',
        validate: (_, code) => {
          const hasBacktick = /`[\s\S]*\$\{[\s\S]*\}/.test(code);
          return {
            passed: hasBacktick,
            actual: hasBacktick ? 'Шаблонная строка найдена' : 'Обратные кавычки или ${} не найдены',
            message: hasBacktick ? 'Синтаксис шаблонной строки соблюден' : 'Используйте обратные кавычки ` и ${userName}'
          };
        }
      },
      {
        id: 't5-1-c2',
        title: 'Вывод готовой строки приветствия',
        expected: 'Привет, Евгений! У вас 4 новых уведомлений.',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Привет, Евгений! У вас 4 новых уведомлений.'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Приветствие выведено верно' : 'Ожидался вывод: Привет, Евгений! У вас 4 новых уведомлений.'
          };
        }
      }
    ]
  },
  {
    id: 't5-2',
    topicId: 5,
    number: 2,
    title: 'Многострочный HTML-шаблон компонента без \\n',
    frontendContext: '📄 Генерация HTML шаблонов карточек (Template strings)',
    frontendScenario: 'В ES6 шаблонные строки в обратных кавычках сохраняют естественные переносы строк при нажатии Enter без использования \\n.',
    description: 'Создайте многострочную строку productCardHtml в обратных кавычках:\n`<article>\n  <h2>Футболка</h2>\n</article>`\nи выведите её в консоль.',
    variableNamingTip: {
      recommendedName: 'productCardHtml',
      style: 'camelCase',
      keyword: 'const',
      why: 'Суффикс Html сразу дает понять коллегам, что в переменной лежит фрагмент разметки.'
    },
    syntaxTags: ['многострочные строки', 'бэктики', 'HTML разметка'],
    initialCode: `// Задача 5.2: Многострочный HTML
// 1. Создайте в обратных кавычках:
// const productCardHtml = \`<article>
//   <h2>Футболка</h2>
// </article>\`;
// 2. Выведите: console.log(productCardHtml);

// Напишите ваш код ниже:

`,
    solutionCode: `const productCardHtml = \`<article>
  <h2>Футболка</h2>
</article>\`;
console.log(productCardHtml);`,
    explanation: 'Внутри обратных кавычек ` ` перенос строки работает буквально: не нужно писать \\n в конце каждой строки.',
    expectedOutput: '<article>\n  <h2>Футболка</h2>\n</article>',
    testCases: [
      {
        id: 't5-2-c1',
        title: 'Использование многострочной строки с тегами',
        expected: '<article> и <h2>Футболка</h2> в выводе',
        validate: (logs) => {
          const text = logs.join('\n');
          const hasArticle = text.includes('<article>') && text.includes('</article>');
          const hasH2 = text.includes('<h2>Футболка</h2>');
          const ok = hasArticle && hasH2;
          return {
            passed: ok,
            actual: ok ? 'HTML разметка найдена' : 'Теги <article> или <h2> не найдены',
            message: ok ? 'Многострочный шаблон оформлен' : 'Проверьте разметку карточки'
          };
        }
      }
    ]
  },
  {
    id: 't5-3',
    topicId: 5,
    number: 3,
    title: 'Экранирование кавычек и обратного слеша (\\, \\\', \\\\)',
    frontendContext: '💬 Отзывы покупателей и пути к файлам компонентов',
    frontendScenario: 'Если в одинарных кавычках встречается английский апостроф (\'It\\\'s\') или путь Windows (\\), JS требует экранирования обратным слешем \\.',
    description: 'Создайте reviewText = \'It\\\'s a great product!\' и filePath = "src\\\\components\\\\Card.tsx". Выведите обе переменные через запятую.',
    variableNamingTip: {
      recommendedName: 'reviewText / filePath',
      style: 'camelCase',
      keyword: 'const',
      why: 'Для текстов отзывов используют суффикс Text, для путей в файловой системе — filePath.'
    },
    syntaxTags: ['экранирование \\', 'апостроф \\\'', 'обратный слеш \\\\'],
    initialCode: `// Задача 5.3: Экранирование спецсимволов
// 1. Создайте: const reviewText = 'It\\'s a great product!';
// 2. Создайте: const filePath = "src\\\\components\\\\Card.tsx";
// 3. Выведите: console.log(reviewText, filePath);

// Напишите ваш код ниже:

`,
    solutionCode: `const reviewText = 'It\\'s a great product!';
const filePath = "src\\\\components\\\\Card.tsx";
console.log(reviewText, filePath);`,
    explanation: 'Обратный слеш \\ экранирует следующий символ: \\\' позволяет использовать одинарную кавычку внутри одинарных, а \\\\ выводит один слеш.',
    expectedOutput: "It's a great product! src\\components\\Card.tsx",
    testCases: [
      {
        id: 't5-3-c1',
        title: 'Использование экранирования в коде',
        expected: "It's a great product! и src\\components\\Card.tsx",
        validate: (logs) => {
          const match = logs.some((l) => l.includes("It's a great product!") && l.includes("src\\components\\Card.tsx"));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Спецсимволы экранированы корректно' : 'Ожидался вывод: It\'s a great product! src\\components\\Card.tsx'
          };
        }
      }
    ]
  },
  {
    id: 't5-4',
    topicId: 5,
    number: 4,
    title: 'Валидация длины пароля через свойство .length',
    frontendContext: '🔒 Мгновенная валидация пароля в форме регистрации',
    frontendScenario: 'При вводе пароля фронтенд проверяет его длину. Если введено меньше 8 знаков, кнопка отправки остается заблокированной.',
    description: 'Дана строка passwordInput = "secretKey99". Получите ее длину через свойство .length и выведите: "Длина пароля:", passwordInput.length, "символов".',
    variableNamingTip: {
      recommendedName: 'passwordInput / passwordLength',
      style: 'camelCase',
      keyword: 'const',
      why: 'Свойство .length пишется БЕЗ круглых скобок (), так как это свойство строки, а не вызываемая функция.'
    },
    syntaxTags: ['свойство .length', 'без скобок ()', 'валидация формы'],
    initialCode: `// Задача 5.4: Свойство .length
// 1. Создайте const passwordInput = "secretKey99";
// 2. Выведите: "Длина пароля:", passwordInput.length, "символов"

// Напишите ваш код ниже:

`,
    solutionCode: `const passwordInput = "secretKey99";
console.log("Длина пароля:", passwordInput.length, "символов");`,
    explanation: 'Свойство .length возвращает количество символов в строке. Скобки () ставить нельзя, иначе будет ошибка.',
    expectedOutput: 'Длина пароля: 11 символов',
    testCases: [
      {
        id: 't5-4-c1',
        title: 'Использование свойства .length',
        expected: 'passwordInput.length в коде',
        validate: (_, code) => {
          const hasLen = /passwordInput\s*\.\s*length/.test(code);
          return {
            passed: hasLen,
            actual: hasLen ? '.length найдено' : '.length не найдено',
            message: hasLen ? 'Свойство длины применено' : 'Используйте passwordInput.length'
          };
        }
      },
      {
        id: 't5-4-c2',
        title: 'Вывод числа символов (11)',
        expected: 'Длина пароля: 11 символов',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('11') && l.includes('символов'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Длина 11 определена верно' : 'Ожидался вывод: Длина пароля: 11 символов'
          };
        }
      }
    ]
  },
  {
    id: 't5-5',
    topicId: 5,
    number: 5,
    title: 'Регистронезависимый поиск через .toLowerCase()',
    frontendContext: '🔍 Поиск по каталогу товаров (Search Input)',
    frontendScenario: 'Пользователь может ввести "MACBOOK", "Macbook" или "macbook". Чтобы товар гарантированно нашелся, поисковый запрос нормализуют методом .toLowerCase().',
    description: 'Дана строка searchInput = "MacBook Pro". Приведите ее к нижнему регистру методом .toLowerCase() и сохраните в normalizedQuery. Выведите: "Поиск:", normalizedQuery.',
    variableNamingTip: {
      recommendedName: 'normalizedQuery',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово normalized в веб-разработке означает очищенную и приведенную к общему регистру строку.'
    },
    syntaxTags: ['.toLowerCase()', 'нормализация строк', 'поиск'],
    initialCode: `// Задача 5.5: Метод .toLowerCase()
// 1. Создайте const searchInput = "MacBook Pro";
// 2. Приведите к нижнему регистру: const normalizedQuery = searchInput.toLowerCase();
// 3. Выведите: "Поиск:", normalizedQuery

// Напишите ваш код ниже:

`,
    solutionCode: `const searchInput = "MacBook Pro";
const normalizedQuery = searchInput.toLowerCase();
console.log("Поиск:", normalizedQuery);`,
    explanation: 'Метод .toLowerCase() возвращает новую строку, где все буквы переведены в строчный регистр.',
    expectedOutput: 'Поиск: macbook pro',
    testCases: [
      {
        id: 't5-5-c1',
        title: 'Вызов метода .toLowerCase()',
        expected: 'searchInput.toLowerCase() в коде',
        validate: (_, code) => {
          const hasLower = /toLowerCase\s*\(\s*\)/.test(code);
          return {
            passed: hasLower,
            actual: hasLower ? '.toLowerCase() вызван' : '.toLowerCase() не найден',
            message: hasLower ? 'Метод регистра применен' : 'Вызовите searchInput.toLowerCase()'
          };
        }
      },
      {
        id: 't5-5-c2',
        title: 'Вывод строки "macbook pro"',
        expected: 'Поиск: macbook pro',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('macbook pro'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Нижний регистр получен' : 'Ожидался вывод: Поиск: macbook pro'
          };
        }
      }
    ]
  },
  {
    id: 't5-6',
    topicId: 5,
    number: 6,
    title: 'Проверка безопасного протокола через .includes()',
    frontendContext: '🛡️ Валидация внешних ссылок (HTTPS Check)',
    frontendScenario: 'Перед переходом на внешний сайт партнера фронтенд проверяет, начинается ли ссылка с безопасного протокола https://.',
    description: 'Дана строка linkUrl = "https://safe-shop.com". Проверьте наличие подстроки "https://" методом linkUrl.includes("https://"). Сохраните в isSecure и выведите: "Безопасная ссылка:", isSecure.',
    variableNamingTip: {
      recommendedName: 'isSecure',
      style: 'camelCase',
      keyword: 'const',
      why: 'Метод .includes() возвращает булево значение (true/false), поэтому имя переменной начинается с глагольной приставки is (isSecure).'
    },
    syntaxTags: ['.includes()', 'булев результат', 'валидация URL'],
    initialCode: `// Задача 5.6: Метод .includes()
// 1. Создайте const linkUrl = "https://safe-shop.com";
// 2. Проверьте: const isSecure = linkUrl.includes("https://");
// 3. Выведите: "Безопасная ссылка:", isSecure

// Напишите ваш код ниже:

`,
    solutionCode: `const linkUrl = "https://safe-shop.com";
const isSecure = linkUrl.includes("https://");
console.log("Безопасная ссылка:", isSecure);`,
    explanation: 'Метод .includes(str) проверяет вхождение подстроки и возвращает true или false.',
    expectedOutput: 'Безопасная ссылка: true',
    testCases: [
      {
        id: 't5-6-c1',
        title: 'Использование метода .includes()',
        expected: 'linkUrl.includes("https://")',
        validate: (_, code) => {
          const hasInc = /includes\s*\(\s*["']https:\/\/["']\s*\)/.test(code);
          return {
            passed: hasInc,
            actual: hasInc ? '.includes("https://") найден' : 'Проверка .includes не найдена',
            message: hasInc ? 'Метод .includes применен верно' : 'Вызовите linkUrl.includes("https://")'
          };
        }
      },
      {
        id: 't5-6-c2',
        title: 'Вывод значения true',
        expected: 'Безопасная ссылка: true',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Безопасная ссылка:') && l.includes('true'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Булев результат true выведен' : 'Ожидался вывод: Безопасная ссылка: true'
          };
        }
      }
    ]
  },
  {
    id: 't5-7',
    topicId: 5,
    number: 7,
    title: 'Поиск позиции домена в URL через .indexOf()',
    frontendContext: '🌐 Парсинг адресов и аналитика переходов',
    frontendScenario: 'Метод .indexOf() возвращает числовую позицию первого вхождения подстроки (или -1, если совпадение не найдено).',
    description: 'Дана строка apiUrl = "https://api.github.com/v1". Найдите индекс первого символа слова "github" методом apiUrl.indexOf("github"). Выведите: "Позиция домена:", domainIndex.',
    variableNamingTip: {
      recommendedName: 'domainIndex',
      style: 'camelCase',
      keyword: 'const',
      why: 'Суффикс Index в JavaScript всегда используется для числовых позиций (0, 1, 2...).'
    },
    syntaxTags: ['.indexOf()', 'числовой индекс', 'поиск подстроки'],
    initialCode: `// Задача 5.7: Метод .indexOf()
// 1. Создайте const apiUrl = "https://api.github.com/v1";
// 2. Найдите индекс: const domainIndex = apiUrl.indexOf("github");
// 3. Выведите: "Позиция домена:", domainIndex

// Напишите ваш код ниже:

`,
    solutionCode: `const apiUrl = "https://api.github.com/v1";
const domainIndex = apiUrl.indexOf("github");
console.log("Позиция домена:", domainIndex);`,
    explanation: 'Подстрока "github" начинается с 12-го индекса (индексация строк в JS начинается с 0).',
    expectedOutput: 'Позиция домена: 12',
    testCases: [
      {
        id: 't5-7-c1',
        title: 'Использование метода .indexOf()',
        expected: 'apiUrl.indexOf("github")',
        validate: (_, code) => {
          const hasIdx = /indexOf\s*\(\s*["']github["']\s*\)/.test(code);
          return {
            passed: hasIdx,
            actual: hasIdx ? '.indexOf("github") найден' : '.indexOf не найден',
            message: hasIdx ? 'Метод применен' : 'Вызовите apiUrl.indexOf("github")'
          };
        }
      },
      {
        id: 't5-7-c2',
        title: 'Вывод индекса 12',
        expected: 'Позиция домена: 12',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('12'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Индекс 12 найден' : 'Ожидался вывод: Позиция домена: 12'
          };
        }
      }
    ]
  },
  {
    id: 't5-8',
    topicId: 5,
    number: 8,
    title: 'Обрезка анонса статьи в карточке через .slice()',
    frontendContext: '📰 Лента новостей блога (Text Truncation)',
    frontendScenario: 'Чтобы длинный текст статьи не ломал верстку карточки, его обрезают до первых 20 символов методом .slice(0, 20) и добавляют многоточие "...".',
    description: 'Дана строка postText = "JavaScript — самый популярный язык веба!". Извлеките первые 20 символов методом postText.slice(0, 20) и прибавьте "...". Выведите результат.',
    variableNamingTip: {
      recommendedName: 'truncatedPreview',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово truncated означает обрезанную строку, preview — текст предварительного просмотра карточки.'
    },
    syntaxTags: ['.slice()', 'обрезка текста', 'конкатенация многоточия'],
    initialCode: `// Задача 5.8: Метод .slice()
// 1. Создайте const postText = "JavaScript — самый популярный язык веба!";
// 2. Обрежьте строку: const truncatedPreview = postText.slice(0, 20) + "...";
// 3. Выведите: console.log(truncatedPreview);

// Напишите ваш код ниже:

`,
    solutionCode: `const postText = "JavaScript — самый популярный язык веба!";
const truncatedPreview = postText.slice(0, 20) + "...";
console.log(truncatedPreview);`,
    explanation: 'Метод .slice(start, end) копирует часть строки от индекса start до end (не включая end).',
    expectedOutput: 'JavaScript — самый п...',
    testCases: [
      {
        id: 't5-8-c1',
        title: 'Использование метода .slice(0, 20)',
        expected: 'postText.slice(0, 20) в коде',
        validate: (_, code) => {
          const hasSlice = /slice\s*\(\s*0\s*,\s*20\s*\)/.test(code);
          return {
            passed: hasSlice,
            actual: hasSlice ? '.slice(0, 20) найден' : '.slice(0, 20) не найден',
            message: hasSlice ? 'Метод .slice применен' : 'Напишите postText.slice(0, 20)'
          };
        }
      },
      {
        id: 't5-8-c2',
        title: 'Вывод обрезанного анонса с многоточием',
        expected: 'JavaScript — самый п...',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('JavaScript — самый п...'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Анонс успешно обрезан' : 'Ожидался вывод: JavaScript — самый п...'
          };
        }
      }
    ]
  },
  {
    id: 't5-9',
    topicId: 5,
    number: 9,
    title: 'Подстановка процента скидки в баннер через .replace()',
    frontendContext: '🏷️ Динамические рекламные баннеры (Template Replace)',
    frontendScenario: 'Маркетологи передали шаблон акции: "Скидка: %DISCOUNT% на всё!". Фронтенд заменяет плейсхолдер %DISCOUNT% на актуальный процент акции "25%".',
    description: 'Дана строка bannerTemplate = "Скидка: %DISCOUNT% на всё!". Замените "%DISCOUNT%" на "25%" с помощью метода .replace(). Сохраните в promoBannerText и выведите его.',
    variableNamingTip: {
      recommendedName: 'promoBannerText',
      style: 'camelCase',
      keyword: 'const',
      why: 'Имя promoBannerText точно передает назначение баннера акции.'
    },
    syntaxTags: ['.replace()', 'подстановка в шаблон', 'замена подстроки'],
    initialCode: `// Задача 5.9: Метод .replace()
// 1. Создайте const bannerTemplate = "Скидка: %DISCOUNT% на всё!";
// 2. Замените плейсхолдер: const promoBannerText = bannerTemplate.replace("%DISCOUNT%", "25%");
// 3. Выведите: console.log(promoBannerText);

// Напишите ваш код ниже:

`,
    solutionCode: `const bannerTemplate = "Скидка: %DISCOUNT% на всё!";
const promoBannerText = bannerTemplate.replace("%DISCOUNT%", "25%");
console.log(promoBannerText);`,
    explanation: 'Метод .replace(search, replacement) находит первое вхождение search и заменяет его на строку replacement.',
    expectedOutput: 'Скидка: 25% на всё!',
    testCases: [
      {
        id: 't5-9-c1',
        title: 'Использование метода .replace()',
        expected: 'bannerTemplate.replace("%DISCOUNT%", "25%")',
        validate: (_, code) => {
          const hasRep = /replace\s*\(\s*["']%DISCOUNT%["']\s*,\s*["']25%["']\s*\)/.test(code);
          return {
            passed: hasRep,
            actual: hasRep ? '.replace() применен' : '.replace("%DISCOUNT%", "25%") не найден',
            message: hasRep ? 'Замена выполнена' : 'Вызовите bannerTemplate.replace("%DISCOUNT%", "25%")'
          };
        }
      },
      {
        id: 't5-9-c2',
        title: 'Вывод готового баннера со скидкой 25%',
        expected: 'Скидка: 25% на всё!',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Скидка: 25% на всё!'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Баннер выведен' : 'Ожидался вывод: Скидка: 25% на всё!'
          };
        }
      }
    ]
  },
  {
    id: 't5-10',
    topicId: 5,
    number: 10,
    title: 'Очистка пробелов через .trim() и парсинг тегов через .split()',
    frontendContext: '🧹 Обработка инпутов формы: очистка и превращение в массив',
    frontendScenario: 'Пользователь ввел промокод со случайными пробелами по краям ("  PROMO2026  "), а теги статьи перечислил через запятую ("react, vue, svelte").',
    description: 'Очистите строку rawPromo = "  PROMO2026  " методом .trim(). Разбейте строку rawTags = "react, vue, svelte" методом .split(", "). Выведите: "Промокод:", cleanedPromo, "Теги:", tagsList.',
    variableNamingTip: {
      recommendedName: 'cleanedPromo / tagsList',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово cleaned обозначает очищенную строку, а суффикс List или Array указывает на массив после .split().'
    },
    syntaxTags: ['.trim()', '.split()', 'очистка инпутов'],
    initialCode: `// Задача 5.10: Методы .trim() и .split()
// 1. Создайте const rawPromo = "  PROMO2026  ";
// 2. Создайте const rawTags = "react, vue, svelte";
// 3. Очистите пробелы: const cleanedPromo = rawPromo.trim();
// 4. Разбейте на массив: const tagsList = rawTags.split(", ");
// 5. Выведите: "Промокод:", cleanedPromo, "Теги:", tagsList

// Напишите ваш код ниже:

`,
    solutionCode: `const rawPromo = "  PROMO2026  ";
const rawTags = "react, vue, svelte";
const cleanedPromo = rawPromo.trim();
const tagsList = rawTags.split(", ");
console.log("Промокод:", cleanedPromo, "Теги:", tagsList);`,
    explanation: 'Метод .trim() срезает невидимые пробелы с краев строки, а .split(separator) разбивает строку на элементы массива.',
    expectedOutput: 'Промокод: PROMO2026 Теги: [react, vue, svelte]',
    testCases: [
      {
        id: 't5-10-c1',
        title: 'Использование методов .trim() и .split(", ")',
        expected: 'rawPromo.trim() и rawTags.split(", ") в коде',
        validate: (_, code) => {
          const hasTrim = /trim\s*\(\s*\)/.test(code);
          const hasSplit = /split\s*\(\s*["'],\s*["']\s*\)/.test(code);
          const ok = hasTrim && hasSplit;
          return {
            passed: ok,
            actual: ok ? 'Оба метода применены' : 'Методы .trim() или .split(", ") не найдены',
            message: ok ? 'Методы применены корректно' : 'Используйте rawPromo.trim() и rawTags.split(", ")'
          };
        }
      },
      {
        id: 't5-10-c2',
        title: 'Вывод очищенного промокода и тегов',
        expected: 'PROMO2026 и теги в выводе',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('PROMO2026') && l.includes('react'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Очистка и сплит выполнены верно' : 'Ожидался вывод с PROMO2026 и react'
          };
        }
      }
    ]
  }
];
