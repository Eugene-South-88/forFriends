import { Task } from '../types';

export const topic5Tasks: Task[] = [
  {
    id: 't5-1',
    topicId: 5,
    number: 1,
    title: 'Шаблонная строка личного кабинета (бэктики и ${})',
    frontendContext: '👤 Персонализированный баннер приветствия',
    frontendScenario: 'Вместо неудобного склеивания через плюсы современные фронтендеры используют шаблонные строки (обратные кавычки ` ` и интерполяцию ${}).',
    description: 'Создайте строковую переменную userName, которая обозначает имя пользователя, со значением "Евгений", и числовую переменную unreadCount, которая обозначает количество непрочитанных уведомлений, со значением 4. Сформируйте текст приветствия в переменной greetingBanner с помощью шаблонной строки в обратных кавычках (бэктиках) и интерполяции ${}: "Привет, Евгений! У вас 4 новых уведомлений." (подставив обе переменные). Выведите greetingBanner в консоль.',
    variableNamingTip: {
      recommendedName: 'greetingBanner / userName / unreadCount',
      meaning: 'текст приветствия с подстановкой имени и счетчика уведомлений',
      style: 'camelCase',
      why: 'Обратные кавычки ` ` позволяют вставлять переменные прямо внутрь строки через ${переменная}.'
    },
    syntaxTags: ['Template Literals', 'бэктики ``', 'интерполяция ${}'],
    initialCode: `// Задача 5.1: Шаблонные строки (бэктики)
// Напишите ваш код решения ниже:

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
        expected: 'Шаблонная строка с ${userName} и ${unreadCount}',
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
    description: 'Создайте переменную productCardHtml, которая обозначает фрагмент HTML-разметки карточки товара, используя многострочную шаблонную строку в обратных кавычках (бэктиках). Разметка должна содержать тег <article>, на следующей строке заголовок <h2>Футболка</h2> с отступом в два пробела, и на следующей закрывающий тег </article>. Выведите productCardHtml в консоль.',
    variableNamingTip: {
      recommendedName: 'productCardHtml',
      meaning: 'многострочный HTML-шаблон карточки товара',
      style: 'camelCase',
      why: 'Суффикс Html сразу дает понять, что в переменной лежит фрагмент разметки.'
    },
    syntaxTags: ['многострочные строки', 'бэктики', 'HTML разметка'],
    initialCode: `// Задача 5.2: Многострочный HTML
// Напишите ваш код решения ниже:

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
    description: 'Создайте переменную reviewText, которая обозначает отзыв покупателя, со строковым значением \'It\\\'s a great product!\', используя одинарные кавычки и символ экранирования обратным слешем (\\) перед внутренним апострофом. Затем создайте переменную filePath, которая обозначает файловый путь к компоненту, со значением "src\\\\components\\\\Card.tsx", где каждый обратный слеш экранирован. Выведите обе переменные в консоль через пробел.',
    variableNamingTip: {
      recommendedName: 'reviewText / filePath',
      meaning: 'текст отзыва с апострофом и путь к файлу с обратными слешами',
      style: 'camelCase',
      why: 'Обратный слеш \\ экранирует следующий символ: \\\' позволяет использовать одинарную кавычку внутри одинарных, а \\\\ выводит один слеш.'
    },
    syntaxTags: ['экранирование \\', 'апостроф \\\'', 'обратный слеш \\\\'],
    initialCode: `// Задача 5.3: Экранирование спецсимволов
// Напишите ваш код решения ниже:

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
    description: 'Создайте переменную passwordInput, которая обозначает введенный пользователем пароль, со значением "secretKey99". Получите количество символов в строке с помощью свойства length и выведите в консоль: "Длина пароля:", passwordInput.length, "символов".',
    variableNamingTip: {
      recommendedName: 'passwordInput',
      meaning: 'введенный пароль для проверки длины',
      style: 'camelCase',
      why: 'Свойство .length пишется без круглых скобок (), так как это свойство строки, а не вызываемая функция.'
    },
    syntaxTags: ['свойство .length', 'без скобок ()', 'валидация формы'],
    initialCode: `// Задача 5.4: Свойство .length
// Напишите ваш код решения ниже:

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
            message: hasLen ? 'Свойство длины применено' : 'Используйте свойство length у строки passwordInput'
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
    description: 'Создайте переменную searchInput, которая обозначает введенный текст поискового запроса, со значением "MacBook Pro". Приведите строку к нижнему регистру с помощью метода toLowerCase() и сохраните результат в переменную normalizedQuery. Выведите в консоль: "Поиск:", normalizedQuery.',
    variableNamingTip: {
      recommendedName: 'searchInput / normalizedQuery',
      meaning: 'исходный поисковый запрос и нормализованная строка в нижнем регистре',
      style: 'camelCase',
      why: 'Слово normalized означает строку, приведенную к единому регистру для точного сравнения.'
    },
    syntaxTags: ['.toLowerCase()', 'нормализация строк', 'поиск'],
    initialCode: `// Задача 5.5: Метод .toLowerCase()
// Напишите ваш код решения ниже:

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
            message: hasLower ? 'Метод регистра применен' : 'Вызовите метод toLowerCase() у searchInput'
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
    description: 'Создайте переменную linkUrl, которая обозначает интернет-адрес ссылки, со значением "https://safe-shop.com". Проверьте, содержит ли ссылка безопасный протокол "https://", с помощью метода includes(), и сохраните результат в переменную isSecure. Выведите в консоль: "Безопасная ссылка:", isSecure.',
    variableNamingTip: {
      recommendedName: 'isSecure',
      meaning: 'булев флаг проверки безопасности URL',
      style: 'camelCase',
      why: 'Метод .includes() возвращает true или false, поэтому имя логической переменной начинается с is.'
    },
    syntaxTags: ['.includes()', 'булев результат', 'валидация URL'],
    initialCode: `// Задача 5.6: Метод .includes()
// Напишите ваш код решения ниже:

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
            message: hasInc ? 'Метод .includes применен верно' : 'Вызовите метод includes("https://")'
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
    description: 'Создайте переменную apiUrl, которая обозначает адрес веб-сервиса, со значением "https://api.github.com/v1". Найдите индекс первого символа слова "github" с помощью метода indexOf() и сохраните в переменную domainIndex. Выведите в консоль: "Позиция домена:", domainIndex.',
    variableNamingTip: {
      recommendedName: 'domainIndex',
      meaning: 'числовой индекс первого символа искомой подстроки в URL',
      style: 'camelCase',
      why: 'Суффикс Index всегда используется для числовых позиций в строках и массивах (0, 1, 2...).'
    },
    syntaxTags: ['.indexOf()', 'числовой индекс', 'поиск подстроки'],
    initialCode: `// Задача 5.7: Метод .indexOf()
// Напишите ваш код решения ниже:

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
            message: hasIdx ? 'Метод применен' : 'Вызовите метод indexOf("github")'
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
    description: 'Создайте переменную postText, которая обозначает полный текст статьи блога, со значением "JavaScript — самый популярный язык веба!". Вырежьте первые 20 символов этой строки методом slice(0, 20), прибавьте в конец многоточие "..." и сохраните получившийся анонс в переменную truncatedPreview. Выведите truncatedPreview в консоль.',
    variableNamingTip: {
      recommendedName: 'truncatedPreview',
      meaning: 'укороченный анонс статьи с многоточием на конце',
      style: 'camelCase',
      why: 'Слово truncated означает усеченную строку, а preview — краткий анонс карточки.'
    },
    syntaxTags: ['.slice()', 'обрезка текста', 'конкатенация многоточия'],
    initialCode: `// Задача 5.8: Метод .slice()
// Напишите ваш код решения ниже:

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
            message: hasSlice ? 'Метод .slice применен' : 'Вызовите метод slice(0, 20)'
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
    description: 'Создайте переменную bannerTemplate, которая обозначает текстовый шаблон акции, со значением "Скидка: %DISCOUNT% на всё!". Замените подстроку "%DISCOUNT%" на строку "25%" с помощью метода replace() и сохраните результат в переменную promoBannerText. Выведите promoBannerText в консоль.',
    variableNamingTip: {
      recommendedName: 'promoBannerText',
      meaning: 'итоговый текст баннера акции с подставленной скидкой',
      style: 'camelCase',
      why: 'Метод .replace(search, replacement) находит совпадение и заменяет его новым фрагментом.'
    },
    syntaxTags: ['.replace()', 'подстановка в шаблон', 'замена подстроки'],
    initialCode: `// Задача 5.9: Метод .replace()
// Напишите ваш код решения ниже:

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
            message: hasRep ? 'Замена выполнена' : 'Вызовите метод replace("%DISCOUNT%", "25%")'
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
    number: 5,
    title: 'Очистка пробелов через .trim() и парсинг тегов через .split()',
    frontendContext: '🧹 Обработка инпутов формы: очистка и превращение в массив',
    frontendScenario: 'Пользователь ввел промокод со случайными пробелами по краям ("  PROMO2026  "), а теги статьи перечислил через запятую ("react, vue, svelte").',
    description: 'Создайте переменную rawPromo, которая обозначает введенный промокод со случайными пробелами, со значением "  PROMO2026  ", и переменную rawTags, которая обозначает теги статьи, со значением "react, vue, svelte". Очистите промокод от краевых пробелов методом trim() и сохраните в cleanedPromo. Разбейте строку тегов на массив по разделителю ", " методом split() и сохраните в tagsList. Выведите в консоль: "Промокод:", cleanedPromo, "Теги:", tagsList.',
    variableNamingTip: {
      recommendedName: 'cleanedPromo / tagsList',
      meaning: 'очищенный от пробелов промокод и массив полученных тегов',
      style: 'camelCase',
      why: 'Метод .trim() удаляет пробельные символы с обоих концов строки, а .split(разделитель) разбивает строку в массив.'
    },
    syntaxTags: ['.trim()', '.split()', 'очистка инпутов'],
    initialCode: `// Задача 5.10: Методы .trim() и .split()
// Напишите ваш код решения ниже:

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
            message: ok ? 'Методы применены корректно' : 'Используйте методы trim() и split(", ")'
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
