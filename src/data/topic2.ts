import { Task } from '../types';

export const topic2Tasks: Task[] = [
  {
    id: 't2-1',
    topicId: 2,
    number: 1,
    title: 'Глобальная конфигурация API в UPPER_SNAKE_CASE',
    frontendContext: '⚙️ Конфигурация клиента API',
    frontendScenario: 'В продакшн-приложениях базовый URL бэкенда задается как неизменяемая константа на уровне модуля, известная до запуска программы.',
    description: 'Создайте переменную API_BASE_URL, которая обозначает базовый веб-адрес бэкенд-сервера, со значением "https://api.shop.com/v1". Поскольку это глобальная настройка, которая никогда не должна меняться во время работы приложения, используйте подходящий способ объявления и стиль именования. Выведите в консоль текст "API Endpoint:" и значение переменной API_BASE_URL.',
    variableNamingTip: {
      recommendedName: 'API_BASE_URL',
      meaning: 'базовый адрес API бэкенда приложения',
      style: 'UPPER_SNAKE_CASE',
      why: 'В JavaScript глобальные настройки и константы, известные до запуска программы, принято называть заглавными буквами с подчеркиванием (UPPER_SNAKE_CASE).'
    },
    syntaxTags: ['const / let', 'UPPER_SNAKE_CASE', 'конфигурация'],
    initialCode: `// Задача 2.1: Конфигурация API
// Напишите ваш код решения ниже:

`,
    solutionCode: `const API_BASE_URL = "https://api.shop.com/v1";
console.log("API Endpoint:", API_BASE_URL);`,
    explanation: 'const защищает адрес API от случайной перезаписи в других модулях приложения.',
    expectedOutput: 'API Endpoint: https://api.shop.com/v1',
    testCases: [
      {
        id: 't2-1-c1',
        title: 'Объявление переменной API_BASE_URL через const',
        expected: 'Объявление API_BASE_URL через const',
        validate: (_, code) => {
          const hasConst = /const\s+API_BASE_URL\s*=/.test(code);
          return {
            passed: hasConst,
            actual: hasConst ? 'const API_BASE_URL объявлена' : 'Не найдена const API_BASE_URL',
            message: hasConst ? 'Константа объявлена верно' : 'Не найдено объявление константы API_BASE_URL'
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
    description: 'Создайте переменную cartItemsCount, которая обозначает количество товаров в корзине покупок, с начальным значением 0. Затем, имитируя добавление товаров покупателем, измените значение переменной cartItemsCount на 3. Выведите в консоль текст "Товаров в корзине:" и итоговое значение cartItemsCount.',
    variableNamingTip: {
      recommendedName: 'cartItemsCount',
      meaning: 'количество добавленных в корзину товаров',
      style: 'camelCase',
      why: 'Подумайте, какое ключевое слово нужно выбрать, если переменной предстоит перезапись нового значения.'
    },
    syntaxTags: ['изменение переменной', 'переприсваивание', 'camelCase'],
    initialCode: `// Задача 2.2: Счётчик корзины
// Напишите ваш код решения ниже:

`,
    solutionCode: `let cartItemsCount = 0;
cartItemsCount = 3;
console.log("Товаров в корзине:", cartItemsCount);`,
    explanation: 'Ключевое слово let позволяет повторно присваивать новые значения переменной при интерактивных действиях пользователя.',
    expectedOutput: 'Товаров в корзине: 3',
    testCases: [
      {
        id: 't2-2-c1',
        title: 'Объявление переменной cartItemsCount через let',
        expected: 'let cartItemsCount',
        validate: (_, code) => {
          const hasLet = /let\s+cartItemsCount\s*=/.test(code);
          return {
            passed: hasLet,
            actual: hasLet ? 'let cartItemsCount найден' : 'cartItemsCount не объявлен через let',
            message: hasLet ? 'Использован let для изменяемой переменной' : 'Переменная cartItemsCount должна быть объявлена через let, так как её значение меняется'
          };
        }
      },
      {
        id: 't2-2-c2',
        title: 'Переприсваивание нового значения 3',
        expected: 'Присваивание cartItemsCount нового значения 3',
        validate: (_, code) => {
          const hasReassign = /cartItemsCount\s*=\s*3/.test(code);
          return {
            passed: hasReassign,
            actual: hasReassign ? 'Значение 3 присвоено' : 'Не найдено переприсваивание cartItemsCount = 3',
            message: hasReassign ? 'Переменная обновлена' : 'Не найдена операция перезаписи переменной cartItemsCount значением 3'
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
    description: 'Создайте три отдельные переменные с именами role, Role и ROLE, которые обозначают роли пользователей в системе с разным регистром символов: в role поместите значение "guest", в Role — значение "editor", а в ROLE — значение "admin". Выведите все три переменные в консоль через запятую.',
    variableNamingTip: {
      recommendedName: 'role / Role / ROLE',
      meaning: 'три разные переменные роли пользователя с разным регистром букв',
      style: 'camelCase',
      why: 'JavaScript строго чувствителен к регистру букв. Переменные с одинаковыми буквами в разном регистре являются абсолютно независимыми.'
    },
    syntaxTags: ['регистрозависимость', 'чувствительность к регистру', 'синтаксис'],
    initialCode: `// Задача 2.3: Регистрозависимость
// Напишите ваш код решения ниже:

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
        expected: 'Объявление role, Role и ROLE',
        validate: (_, code) => {
          const has1 = /\brole\s*=/.test(code);
          const has2 = /\bRole\s*=/.test(code);
          const has3 = /\bROLE\s*=/.test(code);
          const ok = has1 && has2 && has3;
          return {
            passed: ok,
            actual: ok ? 'Все три переменные объявлены' : 'Не найдены переменные role, Role или ROLE',
            message: ok ? 'Регистрозависимость соблюдена' : 'Проверьте объявление трех переменных: role, Role и ROLE'
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
    description: 'Создайте переменную userId, которая обозначает постоянный идентификатор сессии пользователя, со значением "usr_9981". Поскольку этот идентификатор не должен быть перезаписан, используйте ключевое слово для неизменяемых переменных. Выведите в консоль текст "Пользователь ID зафиксирован:" и значение переменной userId.',
    variableNamingTip: {
      recommendedName: 'userId',
      meaning: 'неизменяемый идентификатор сессии пользователя',
      style: 'camelCase',
      why: 'userId пишется в camelCase. Подумайте, какое ключевое слово защищает переменную от повторного присваивания.'
    },
    syntaxTags: ['const / let', 'неизменяемость', 'camelCase'],
    initialCode: `// Задача 2.4: Защита ID константой
// Напишите ваш код решения ниже:

`,
    solutionCode: `const userId = "usr_9981";
console.log("Пользователь ID зафиксирован:", userId);`,
    explanation: 'const запрещает переопределение переменной, делая код устойчивым к случайным ошибкам.',
    expectedOutput: 'Пользователь ID зафиксирован: usr_9981',
    testCases: [
      {
        id: 't2-4-c1',
        title: 'Использование const для userId',
        expected: 'userId объявлена через const',
        validate: (_, code) => {
          const hasConst = /const\s+userId\s*=/.test(code);
          return {
            passed: hasConst,
            actual: hasConst ? 'const userId найден' : 'userId не объявлен через const',
            message: hasConst ? 'Использован const' : 'Переменная userId должна быть объявлена через const'
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
    description: 'Создайте изолированный блок кода с помощью фигурных скобок { }. Внутри блока создайте переменную modalTitle, которая обозначает заголовок всплывающего модального окна, со значением "Подтверждение оплаты". Внутри этого же блока выведите в консоль текст "Внутри блока:" и значение переменной modalTitle.',
    variableNamingTip: {
      recommendedName: 'modalTitle',
      meaning: 'заголовок всплывающего модального окна',
      style: 'camelCase',
      why: 'Имя состоит из контекста (modal) и сущности (Title). Блочная область видимости гарантирует, что переменная доступна только внутри блока {}.'
    },
    syntaxTags: ['фигурные скобки {}', 'блочная видимость', 'область видимости'],
    initialCode: `// Задача 2.5: Блочная область видимости
// Напишите ваш код решения ниже:

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
          const hasBlock = /\{\s*[\s\S]*(?:const|let)\s+modalTitle[\s\S]*\}/.test(code);
          return {
            passed: hasBlock,
            actual: hasBlock ? 'Блок {} найден' : 'Блок {} с переменной modalTitle не обнаружен',
            message: hasBlock ? 'Фигурные скобки блока оформлены верно' : 'Оберните объявление и вывод переменной modalTitle в блок фигурных скобок { }'
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
    description: 'Создайте блок кода с фигурными скобками { }. Внутри блока создайте переменную legacyPromo, которая обозначает устаревший промокод скидки, со значением "DISCOUNT20", используя устаревшее ключевое слово var. Снаружи блока (после закрывающей скобки }) выведите в консоль текст "Утечка var снаружи блока:" и значение переменной legacyPromo.',
    variableNamingTip: {
      recommendedName: 'legacyPromo',
      meaning: 'устаревший промокод скидки из старого кода',
      style: 'camelCase',
      why: 'В современном JavaScript всегда используют const или let. Переменная var игнорирует фигурные скобки обычных блоков, что и демонстрирует этот пример.'
    },
    syntaxTags: ['var', 'утечка переменных', 'легаси'],
    initialCode: `// Задача 2.6: Утечка var из блока
// Напишите ваш код решения ниже:

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
        expected: 'Объявление var legacyPromo внутри блока {}',
        validate: (_, code) => {
          const hasVarInBlock = /\{\s*[\s\S]*var\s+legacyPromo\s*=/.test(code);
          return {
            passed: hasVarInBlock,
            actual: hasVarInBlock ? 'var в блоке найден' : 'var legacyPromo внутри {} не найден',
            message: hasVarInBlock ? 'Объявление var выполнено' : 'Не найдено объявление var legacyPromo внутри блока {}'
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
    description: 'Напишите многострочный комментарий с текстом "Расчет стоимости". Создайте переменную productPrice, которая обозначает цену товара в каталоге, со значением 1200 и добавьте в той же строке однострочный комментарий с текстом "в рублях". Выведите в консоль текст "Цена товара:" и значение переменной productPrice.',
    variableNamingTip: {
      recommendedName: 'productPrice',
      meaning: 'базовая цена товара в рублях',
      style: 'camelCase',
      why: 'Имя productPrice однозначно указывает на сущность и её денежное свойство.'
    },
    syntaxTags: ['однострочные комментарии', 'многострочные комментарии', 'чистота кода'],
    initialCode: `// Задача 2.7: Комментарии
// Напишите ваш код решения ниже:

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
        expected: 'Многострочный комментарий /* Расчет стоимости */',
        validate: (_, code) => {
          const hasMulti = /\/\*[\s\S]*\*\//.test(code);
          return {
            passed: hasMulti,
            actual: hasMulti ? 'Многострочный комментарий найден' : 'Многострочный комментарий не найден',
            message: hasMulti ? 'Синтаксис /* */ корректен' : 'Добавьте многострочный комментарий: /* Расчет стоимости */'
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
    description: 'Создайте переменную $streamId, которая обозначает поток данных с сервера, со значением 101, и переменную _cachedToken, которая обозначает приватный кэшированный токен, со значением "tk_abc". Выведите в консоль через запятую: "Stream:", $streamId, "Cache:", _cachedToken.',
    variableNamingTip: {
      recommendedName: '$streamId / _cachedToken',
      meaning: 'переменные с разрешенными спецсимволами $ и _ в начале имени',
      style: 'camelCase',
      why: 'Имена идентификаторов в JavaScript могут начинаться с букв латиницы, знака доллара ($) и подчеркивания (_), но не могут начинаться с цифры.'
    },
    syntaxTags: ['символы $ и _', 'правила имен', 'идентификаторы'],
    initialCode: `// Задача 2.8: Символы $ и _
// Напишите ваш код решения ниже:

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
        expected: 'Объявление $streamId и _cachedToken',
        validate: (_, code) => {
          const hasDollar = /(?:const|let)\s+\$streamId\s*=/.test(code);
          const hasUnder = /(?:const|let)\s+_cachedToken\s*=/.test(code);
          const ok = hasDollar && hasUnder;
          return {
            passed: ok,
            actual: ok ? 'Обе переменные найдены' : 'Проверьте имена $streamId и _cachedToken',
            message: ok ? 'Спецсимволы применены верно' : 'Создайте переменные $streamId со значением 101 и _cachedToken со значением "tk_abc"'
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
    description: 'Создайте переменную isLoading, которая обозначает признак процесса загрузки данных на кнопке, с начальным значением false. Затем, имитируя клик пользователя и начало отправки формы, измените значение переменной isLoading на true. Выведите в консоль текст "Состояние кнопки:" и обновленное значение переменной.',
    variableNamingTip: {
      recommendedName: 'isLoading',
      meaning: 'булев флаг текущего процесса сетевой загрузки кнопки',
      style: 'camelCase',
      why: 'Булевы флаги во фронтенде принято называть с глагольных приставок (is, has, can). Подумайте, какое ключевое слово объявления использовать для изменяющегося флага.'
    },
    syntaxTags: ['булев флаг', 'переприсваивание', 'префикс is'],
    initialCode: `// Задача 2.9: Флаг загрузки кнопки
// Напишите ваш код решения ниже:

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
        expected: 'let isLoading',
        validate: (_, code) => {
          const hasLet = /let\s+isLoading\s*=/.test(code);
          return {
            passed: hasLet,
            actual: hasLet ? 'let isLoading найден' : 'isLoading не объявлен через let',
            message: hasLet ? 'Использован let для флага' : 'Переменная isLoading должна быть объявлена через let, так как её значение меняется'
          };
        }
      },
      {
        id: 't2-9-c2',
        title: 'Переключение в true',
        expected: 'Присваивание переменной значения true',
        validate: (_, code) => {
          const hasTrue = /isLoading\s*=\s*true/.test(code);
          return {
            passed: hasTrue,
            actual: hasTrue ? 'Значение true присвоено' : 'Не найдено isLoading = true',
            message: hasTrue ? 'Флаг переключен' : 'Присвойте переменной новое значение: isLoading = true;'
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
    description: 'Создайте переменную buttonClassName, которая обозначает CSS-стиль оформления кнопки, со значением "btn-primary". Помните, что слово class зарезервировано в языке JavaScript. Выведите в консоль текст "Класс элемента:" и значение переменной buttonClassName.',
    variableNamingTip: {
      recommendedName: 'buttonClassName',
      meaning: 'название CSS-класса для стилизации кнопки',
      style: 'camelCase',
      why: 'Слова let, const, class, return зарезервированы JavaScript. Поэтому для стилей используют составные имена: buttonClassName или alertClass.'
    },
    syntaxTags: ['зарезервированные слова', 'className', 'именование'],
    initialCode: `// Задача 2.10: Корректное имя для CSS-класса
// Напишите ваш код решения ниже:

`,
    solutionCode: `const buttonClassName = "btn-primary";
console.log("Класс элемента:", buttonClassName);`,
    explanation: 'Использование зарезервированных слов приведет к SyntaxError, поэтому к ним добавляют контекстные уточнения.',
    expectedOutput: 'Класс элемента: btn-primary',
    testCases: [
      {
        id: 't2-10-c1',
        title: 'Объявление переменной buttonClassName',
        expected: 'Объявление buttonClassName со значением "btn-primary"',
        validate: (_, code) => {
          const hasName = /(?:const|let)\s+buttonClassName\s*=/.test(code);
          return {
            passed: hasName,
            actual: hasName ? 'buttonClassName объявлена' : 'Переменная buttonClassName не найдена',
            message: hasName ? 'Имя выбрано корректно' : 'Создайте переменную buttonClassName со значением "btn-primary"'
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
