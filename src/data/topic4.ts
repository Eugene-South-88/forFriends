import { Task } from '../types';

export const topic4Tasks: Task[] = [
  {
    id: 't4-1',
    topicId: 4,
    number: 1,
    title: 'Итоговый расчет стоимости корзины со скидкой',
    frontendContext: '🛍️ Оформление заказа (Checkout Total)',
    frontendScenario: 'Покупатель оформляет заказ из 3 товаров по цене 500 рублей каждый, и у него есть промокод на скидку 200 рублей.',
    description: 'Создайте itemPrice = 500, quantity = 3, discount = 200. Посчитайте totalPrice = itemPrice * quantity - discount; и выведите: "Итого к оплате:", totalPrice, "руб".',
    variableNamingTip: {
      recommendedName: 'totalPrice',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово total в e-commerce интерфейсах всегда обозначает итоговую сумму чека. Исходные данные и результат неизменны — пишем const.'
    },
    syntaxTags: ['арифметика: *, -', 'приоритет операторов', 'const'],
    initialCode: `// Задача 4.1: Расчет чекаута
// 1. Создайте const itemPrice = 500;
// 2. Создайте const quantity = 3;
// 3. Создайте const discount = 200;
// 4. Посчитайте: const totalPrice = itemPrice * quantity - discount;
// 5. Выведите: "Итого к оплате:", totalPrice, "руб"

// Напишите ваш код ниже:

`,
    solutionCode: `const itemPrice = 500;
const quantity = 3;
const discount = 200;
const totalPrice = itemPrice * quantity - discount;
console.log("Итого к оплате:", totalPrice, "руб");`,
    explanation: 'Умножение (*) имеет более высокий приоритет, чем вычитание (-), поэтому сначала перемножаются цена и количество, затем вычитается скидка.',
    expectedOutput: 'Итого к оплате: 1300 руб',
    testCases: [
      {
        id: 't4-1-c1',
        title: 'Объявление переменных и формулы totalPrice',
        expected: 'totalPrice = itemPrice * quantity - discount',
        validate: (_, code) => {
          const hasFormula = /itemPrice\s*\*\s*quantity\s*-\s*discount/.test(code);
          return {
            passed: hasFormula,
            actual: hasFormula ? 'Формула найдена' : 'Формула расчета не обнаружена',
            message: hasFormula ? 'Математическое выражение верно' : 'Напишите: const totalPrice = itemPrice * quantity - discount;'
          };
        }
      },
      {
        id: 't4-1-c2',
        title: 'Вывод итоговой суммы 1300 руб',
        expected: 'Итого к оплате: 1300 руб',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('1300') && l.includes('руб'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Сумма 1300 рассчитана верно' : 'Ожидался вывод: Итого к оплате: 1300 руб'
          };
        }
      }
    ]
  },
  {
    id: 't4-2',
    topicId: 4,
    number: 2,
    title: 'Зебра-подсветка таблицы через остаток от деления (%)',
    frontendContext: '📊 Таблицы данных: чередование цветов строк (Zebra striping)',
    frontendScenario: 'Чтобы сделать длинную таблицу заказов читаемой, каждую четную строку окрашивают серым цветом. Четность проверяют через остаток от деления на 2.',
    description: 'Для rowIndex = 4 вычислите остаток remainder = rowIndex % 2;. Выведите: "Индекс:", rowIndex, "Остаток:", remainder.',
    variableNamingTip: {
      recommendedName: 'rowIndex / isEvenRow',
      style: 'camelCase',
      keyword: 'const',
      why: 'Индекс строки называют rowIndex. Остаток от деления — remainder или mod. Если remainder === 0, строка четная.'
    },
    syntaxTags: ['остаток от деления %', 'четность', 'camelCase'],
    initialCode: `// Задача 4.2: Чередование строк таблицы
// 1. Создайте const rowIndex = 4;
// 2. Вычислите остаток: const remainder = rowIndex % 2;
// 3. Выведите: "Индекс:", rowIndex, "Остаток:", remainder

// Напишите ваш код ниже:

`,
    solutionCode: `const rowIndex = 4;
const remainder = rowIndex % 2;
console.log("Индекс:", rowIndex, "Остаток:", remainder);`,
    explanation: 'Оператор % возвращает остаток от деления: 4 % 2 равно 0, что означает четный индекс строки.',
    expectedOutput: 'Индекс: 4 Остаток: 0',
    testCases: [
      {
        id: 't4-2-c1',
        title: 'Использование оператора остатка %',
        expected: 'rowIndex % 2 в коде',
        validate: (_, code) => {
          const hasMod = /rowIndex\s*%\s*2/.test(code);
          return {
            passed: hasMod,
            actual: hasMod ? 'Оператор % применен' : 'Оператор % не найден',
            message: hasMod ? 'Операция остатка верна' : 'Напишите: const remainder = rowIndex % 2;'
          };
        }
      },
      {
        id: 't4-2-c2',
        title: 'Вывод остатка 0 для индекса 4',
        expected: 'Индекс: 4 Остаток: 0',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Индекс: 4') && l.includes('Остаток: 0'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Остаток рассчитан верно' : 'Ожидался вывод: Индекс: 4 Остаток: 0'
          };
        }
      }
    ]
  },
  {
    id: 't4-3',
    topicId: 4,
    number: 3,
    title: 'Возведение в степень через современный оператор **',
    frontendContext: '🎨 Генерация цветовой палитры (8 бит = 256 градаций)',
    frontendScenario: 'В компьютерной графике каждый канал цвета (RGB) кодируется 8 битами. Число возможных оттенков равно 2 в степени 8.',
    description: 'Возведите число 2 в степень 8 оператором **. Сохраните в colorShadesCount и выведите: "Число градаций цвета:", colorShadesCount.',
    variableNamingTip: {
      recommendedName: 'colorShadesCount',
      style: 'camelCase',
      keyword: 'const',
      why: 'В современном JS возведение в степень записывается двумя звездочками: 2 ** 8 (вместо устаревшего Math.pow(2, 8)).'
    },
    syntaxTags: ['оператор **', 'возведение в степень', 'ES2016'],
    initialCode: `// Задача 4.3: Оператор **
// 1. Посчитайте: const colorShadesCount = 2 ** 8;
// 2. Выведите: "Число градаций цвета:", colorShadesCount

// Напишите ваш код ниже:

`,
    solutionCode: `const colorShadesCount = 2 ** 8;
console.log("Число градаций цвета:", colorShadesCount);`,
    explanation: 'Оператор ** возводит левый операнд в степень правого операнда: 2 ** 8 = 256.',
    expectedOutput: 'Число градаций цвета: 256',
    testCases: [
      {
        id: 't4-3-c1',
        title: 'Использование оператора **',
        expected: '2 ** 8 в коде',
        validate: (_, code) => {
          const hasPower = /2\s*\*\*\s*8/.test(code);
          return {
            passed: hasPower,
            actual: hasPower ? 'Оператор ** применен' : 'Оператор ** не найден',
            message: hasPower ? 'Синтаксис ** корректен' : 'Напишите: const colorShadesCount = 2 ** 8;'
          };
        }
      },
      {
        id: 't4-3-c2',
        title: 'Вывод значения 256',
        expected: 'Число градаций цвета: 256',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('256'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Результат 256 получен' : 'Ожидался вывод: Число градаций цвета: 256'
          };
        }
      }
    ]
  },
  {
    id: 't4-4',
    topicId: 4,
    number: 4,
    title: 'Счётчик лайков: разница между a++ и ++a',
    frontendContext: '❤️ Интерактивные счетчики социальных реакций',
    frontendScenario: 'Постфиксный a++ сначала возвращает старое значение, а префиксный ++a сразу инкрементирует и возвращает новое. Эта разница критична при вызове коллбэков.',
    description: 'Объявите let likesCount = 10;. Присвойте const first = likesCount++; и const second = ++likesCount;. Выведите: first, second, likesCount.',
    variableNamingTip: {
      recommendedName: 'likesCount',
      style: 'camelCase',
      keyword: 'let',
      why: 'likesCount объявляется через let, так как инкремент меняет само значение переменной. Суффикс Count указывает на целое число счетчика.'
    },
    syntaxTags: ['постфиксный a++', 'префиксный ++a', 'инкремент'],
    initialCode: `// Задача 4.4: Префиксный и постфиксный инкремент
// 1. Создайте let likesCount = 10;
// 2. Создайте const first = likesCount++;
// 3. Создайте const second = ++likesCount;
// 4. Выведите все три переменные через запятую: console.log(first, second, likesCount);

// Напишите ваш код ниже:

`,
    solutionCode: `let likesCount = 10;
const first = likesCount++;
const second = ++likesCount;
console.log(first, second, likesCount);`,
    explanation: 'likesCount++ сначала возвращает 10 (likesCount становится 11). Затем ++likesCount сначала увеличивает до 12 и возвращает 12.',
    expectedOutput: '10 12 12',
    testCases: [
      {
        id: 't4-4-c1',
        title: 'Использование likesCount++ и ++likesCount',
        expected: 'Обе формы инкремента в коде',
        validate: (_, code) => {
          const hasPost = /likesCount\+\+/.test(code);
          const hasPre = /\+\+likesCount/.test(code);
          const ok = hasPost && hasPre;
          return {
            passed: ok,
            actual: ok ? 'Обе формы найдены' : 'Проверьте использование likesCount++ и ++likesCount',
            message: ok ? 'Инкременты применены' : 'Создайте const first = likesCount++; const second = ++likesCount;'
          };
        }
      },
      {
        id: 't4-4-c2',
        title: 'Вывод последовательности 10 12 12',
        expected: '10 12 12',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('10') && l.includes('12'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Значения соответствуют логике инкрементов' : 'Ожидался вывод: 10 12 12'
          };
        }
      }
    ]
  },
  {
    id: 't4-5',
    topicId: 4,
    number: 5,
    title: 'Операции списания баланса и бонусов через -= и +=',
    frontendContext: '💳 Кошелек пользователя и программа лояльности',
    frontendScenario: 'При покупке баланс кошелька уменьшается на стоимость заказа (balance -= 350), а кэшбэк-баллы начисляются (bonusPoints += 50).',
    description: 'Объявите let balance = 1000; и let bonusPoints = 50;. Уменьшите balance на 350 с помощью -=. Увеличьте bonusPoints на 50 с помощью +=. Выведите: "Баланс:", balance, "Бонусы:", bonusPoints.',
    variableNamingTip: {
      recommendedName: 'balance / bonusPoints',
      style: 'camelCase',
      keyword: 'let',
      why: 'Переменные balance и bonusPoints изменяются на месте — объявляем через let.'
    },
    syntaxTags: ['сокращенное присваивание +=', '-=', 'let'],
    initialCode: `// Задача 4.5: Операторы += и -=
// 1. Создайте let balance = 1000;
// 2. Создайте let bonusPoints = 50;
// 3. Вычтите 350 из баланса: balance -= 350;
// 4. Добавьте 50 к бонусам: bonusPoints += 50;
// 5. Выведите: "Баланс:", balance, "Бонусы:", bonusPoints

// Напишите ваш код ниже:

`,
    solutionCode: `let balance = 1000;
let bonusPoints = 50;
balance -= 350;
bonusPoints += 50;
console.log("Баланс:", balance, "Бонусы:", bonusPoints);`,
    explanation: 'Операторы a -= b и a += b эквивалентны a = a - b и a = a + b, но более лаконичны и приняты в современном коде.',
    expectedOutput: 'Баланс: 650 Бонусы: 100',
    testCases: [
      {
        id: 't4-5-c1',
        title: 'Использование операторов -= и +=',
        expected: 'balance -= 350 и bonusPoints += 50',
        validate: (_, code) => {
          const hasSub = /balance\s*-=\s*350/.test(code);
          const hasAdd = /bonusPoints\s*\+=\s*50/.test(code);
          const ok = hasSub && hasAdd;
          return {
            passed: ok,
            actual: ok ? 'Оба оператора найдены' : 'Проверьте balance -= 350 и bonusPoints += 50',
            message: ok ? 'Сокращенные операторы применены' : 'Используйте -= и +='
          };
        }
      },
      {
        id: 't4-5-c2',
        title: 'Вывод баланса 650 и бонусов 100',
        expected: 'Баланс: 650 Бонусы: 100',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('650') && l.includes('100'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Счета пересчитаны верно' : 'Ожидался вывод: Баланс: 650 Бонусы: 100'
          };
        }
      }
    ]
  },
  {
    id: 't4-6',
    topicId: 4,
    number: 6,
    title: 'Расчет страниц пагинации каталога через Math.ceil()',
    frontendContext: '📑 Пагинация каталога интернет-магазина (Pagination)',
    frontendScenario: 'Если в каталоге 25 товаров, а на одной странице показывается по 10 товаров, необходимо 3 страницы (2 полных и 1 с 5 товарами). Округлять нужно строго ВВЕРХ.',
    description: 'Дано totalItems = 25 и itemsPerPage = 10. Вычислите totalPages с помощью Math.ceil(totalItems / itemsPerPage); и выведите: "Всего страниц:", totalPages.',
    variableNamingTip: {
      recommendedName: 'totalPages',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово totalPages однозначно описывает общее количество страниц пагинатора. Math.ceil округляет любое нецелое число в большую сторону (2.5 -> 3).'
    },
    syntaxTags: ['Math.ceil()', 'пагинация', 'округление вверх'],
    initialCode: `// Задача 4.6: Округление вверх Math.ceil
// 1. Создайте const totalItems = 25;
// 2. Создайте const itemsPerPage = 10;
// 3. Посчитайте: const totalPages = Math.ceil(totalItems / itemsPerPage);
// 4. Выведите: "Всего страниц:", totalPages

// Напишите ваш код ниже:

`,
    solutionCode: `const totalItems = 25;
const itemsPerPage = 10;
const totalPages = Math.ceil(totalItems / itemsPerPage);
console.log("Всего страниц:", totalPages);`,
    explanation: 'Math.ceil() (потолок) всегда округляет дробное число до ближайшего большего целого: 25 / 10 = 2.5 -> 3.',
    expectedOutput: 'Всего страниц: 3',
    testCases: [
      {
        id: 't4-6-c1',
        title: 'Использование метода Math.ceil',
        expected: 'Math.ceil(totalItems / itemsPerPage)',
        validate: (_, code) => {
          const hasCeil = /Math\s*\.\s*ceil\s*\(/.test(code);
          return {
            passed: hasCeil,
            actual: hasCeil ? 'Math.ceil применен' : 'Math.ceil не найден',
            message: hasCeil ? 'Округление вверх реализовано' : 'Напишите: const totalPages = Math.ceil(totalItems / itemsPerPage);'
          };
        }
      },
      {
        id: 't4-6-c2',
        title: 'Вывод результата: 3 страницы',
        expected: 'Всего страниц: 3',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Всего страниц: 3'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Число страниц верно' : 'Ожидался вывод: Всего страниц: 3'
          };
        }
      }
    ]
  },
  {
    id: 't4-7',
    topicId: 4,
    number: 7,
    title: 'Сравнение методов Math: round, floor и ceil на цене товара',
    frontendContext: '🏷️ Ценообразование и маркетинг (Округление цен)',
    frontendScenario: 'Товар стоит 199.75 руб. В зависимости от бизнес-правил фронтенд округляет цену математически (round), в меньшую (floor) или большую (ceil) сторону.',
    description: 'Для price = 199.75 выведите в одну строку через запятую три значения: Math.round(price), Math.floor(price), Math.ceil(price).',
    variableNamingTip: {
      recommendedName: 'rawPrice',
      style: 'camelCase',
      keyword: 'const',
      why: 'Исходную неокругленную цену удобно называть rawPrice (сырая цена).'
    },
    syntaxTags: ['Math.round()', 'Math.floor()', 'Math.ceil()'],
    initialCode: `// Задача 4.7: Методы округления
// 1. Создайте const price = 199.75;
// 2. Выведите в одном console.log через запятую:
//    Math.round(price), Math.floor(price), Math.ceil(price)

// Напишите ваш код ниже:

`,
    solutionCode: `const price = 199.75;
console.log(Math.round(price), Math.floor(price), Math.ceil(price));`,
    explanation: 'round(199.75) дает 200 (математическое), floor дает 199 (пол / вниз), ceil дает 200 (потолок / вверх).',
    expectedOutput: '200 199 200',
    testCases: [
      {
        id: 't4-7-c1',
        title: 'Вызов всех трех методов Math: round, floor, ceil',
        expected: 'Math.round, Math.floor, Math.ceil в коде',
        validate: (_, code) => {
          const hasR = /Math\s*\.\s*round/.test(code);
          const hasF = /Math\s*\.\s*floor/.test(code);
          const hasC = /Math\s*\.\s*ceil/.test(code);
          const ok = hasR && hasF && hasC;
          return {
            passed: ok,
            actual: ok ? 'Все 3 метода присутствуют' : 'Не все 3 метода Math вызваны',
            message: ok ? 'Методы применены' : 'Вызовите Math.round(price), Math.floor(price), Math.ceil(price)'
          };
        }
      },
      {
        id: 't4-7-c2',
        title: 'Вывод значений 200 199 200',
        expected: '200 199 200',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('200') && l.includes('199'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Округления корректны' : 'Ожидался вывод: 200 199 200'
          };
        }
      }
    ]
  },
  {
    id: 't4-8',
    topicId: 4,
    number: 8,
    title: 'Длина кругового SVG прогресс-бара через Math.PI',
    frontendContext: '🎨 SVG анимация кругового индикатора (Circular Progress)',
    frontendScenario: 'Чтобы анимировать круговой индикатор загрузки файла через CSS stroke-dasharray, нужно рассчитать длину окружности: 2 * Math.PI * radius.',
    description: 'Для radius = 50 вычислите округленную длину progressCircumference = Math.round(2 * Math.PI * radius); и выведите: "Длина индикатора:", progressCircumference.',
    variableNamingTip: {
      recommendedName: 'progressCircumference / circleRadius',
      style: 'camelCase',
      keyword: 'const',
      why: 'Circumference — геометрический термин длины окружности. Math.PI — стандартная константа числа Пи (3.14159...).'
    },
    syntaxTags: ['Math.PI', 'Math.round()', 'геометрия SVG'],
    initialCode: `// Задача 4.8: Константа Math.PI
// 1. Создайте const radius = 50;
// 2. Вычислите: const progressCircumference = Math.round(2 * Math.PI * radius);
// 3. Выведите: "Длина индикатора:", progressCircumference

// Напишите ваш код ниже:

`,
    solutionCode: `const radius = 50;
const progressCircumference = Math.round(2 * Math.PI * radius);
console.log("Длина индикатора:", progressCircumference);`,
    explanation: 'Math.PI возвращает точное математическое число Пи (3.141592653589793). Длина окружности равна 2 * π * R = 314.',
    expectedOutput: 'Длина индикатора: 314',
    testCases: [
      {
        id: 't4-8-c1',
        title: 'Использование константы Math.PI',
        expected: 'Math.PI в формуле',
        validate: (_, code) => {
          const hasPi = /Math\s*\.\s*PI/.test(code);
          return {
            passed: hasPi,
            actual: hasPi ? 'Math.PI найдена' : 'Math.PI не найдена',
            message: hasPi ? 'Число Пи применено' : 'Используйте Math.PI в формуле'
          };
        }
      },
      {
        id: 't4-8-c2',
        title: 'Вывод длины 314',
        expected: 'Длина индикатора: 314',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('314'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Длина индикатора верна (314)' : 'Ожидался вывод: Длина индикатора: 314'
          };
        }
      }
    ]
  },
  {
    id: 't4-9',
    topicId: 4,
    number: 9,
    title: 'Генерация 4-значного PIN-кода подтверждения',
    frontendContext: '🔐 Двухфакторная аутентификация (2FA SMS Code)',
    frontendScenario: 'Формула из конспекта МФТИ (стр. 36): случайное целое число в диапазоне от min до max генерируется через Math.floor(Math.random() * (max - min + 1)) + min.',
    description: 'Для min = 1000 и max = 9999 сгенерируйте generatedPin. Выведите: "PIN код:", generatedPin, "Валиден:", generatedPin >= 1000 && generatedPin <= 9999.',
    variableNamingTip: {
      recommendedName: 'generatedPin',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово generated подчеркивает, что число создано генератором случайных чисел.'
    },
    syntaxTags: ['Math.random()', 'Math.floor()', 'формула диапазона чисел'],
    initialCode: `// Задача 4.9: Случайный PIN-код (от 1000 до 9999)
// 1. Создайте const min = 1000;
// 2. Создайте const max = 9999;
// 3. Вычислите: const generatedPin = Math.floor(Math.random() * (max - min + 1)) + min;
// 4. Выведите: "PIN код:", generatedPin, "Валиден:", generatedPin >= 1000 && generatedPin <= 9999

// Напишите ваш код ниже:

`,
    solutionCode: `const min = 1000;
const max = 9999;
const generatedPin = Math.floor(Math.random() * (max - min + 1)) + min;
console.log("PIN код:", generatedPin, "Валиден:", generatedPin >= 1000 && generatedPin <= 9999);`,
    explanation: 'Math.random() генерирует число от 0 до 0.999... Формула масштабирует его в нужный диапазон [min, max], а Math.floor отбрасывает дробную часть.',
    expectedOutput: 'PIN код: (число от 1000 до 9999) Валиден: true',
    testCases: [
      {
        id: 't4-9-c1',
        title: 'Использование Math.random и Math.floor',
        expected: 'Math.floor(Math.random() * ...)',
        validate: (_, code) => {
          const hasRand = /Math\s*\.\s*random\s*\(/.test(code);
          const hasFl = /Math\s*\.\s*floor\s*\(/.test(code);
          const ok = hasRand && hasFl;
          return {
            passed: ok,
            actual: ok ? 'Формула случайных чисел применена' : 'Math.random или Math.floor не найдены',
            message: ok ? 'Синтаксис формулы верен' : 'Примените формулу генерации диапазона'
          };
        }
      },
      {
        id: 't4-9-c2',
        title: 'Проверка попадания в диапазон (Валиден: true)',
        expected: 'Валиден: true в выводе',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Валиден: true'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Сгенерирован корректный 4-значный код' : 'Ожидался вывод с: Валиден: true'
          };
        }
      }
    ]
  },
  {
    id: 't4-10',
    topicId: 4,
    number: 10,
    title: 'Парсинг ввода из readline и расчет конверсии продаж',
    frontendContext: '💻 CLI утилиты и строковый ввод пользователя',
    frontendScenario: 'В консольных скриптах модуль readline (стр. 24–25, 30 методички) считывает строки. Чтобы посчитать процент конверсии, строковый ввод преобразуют в числа унарным плюсом +.',
    description: 'Даны строки rawVisitors = "500" и rawBuyers = "25". Преобразуйте их в числа через унарный плюс +, посчитайте процент конверсии conversionRate = (buyers / visitors) * 100; и выведите: "Конверсия сайта:", conversionRate + "%".',
    variableNamingTip: {
      recommendedName: 'conversionRate',
      style: 'camelCase',
      keyword: 'const',
      why: 'Слово rate в продуктовой аналитике всегда означает процентную ставку или коэффициент (conversionRate, bounceRate).'
    },
    syntaxTags: ['унарный плюс +', 'readline концепция', 'расчет процентов'],
    initialCode: `// Задача 4.10: Приведение ввода и расчет конверсии
// 1. Создайте const rawVisitors = "500";
// 2. Создайте const rawBuyers = "25";
// 3. Приведите к числам: const visitors = +rawVisitors; const buyers = +rawBuyers;
// 4. Посчитайте: const conversionRate = (buyers / visitors) * 100;
// 5. Выведите: "Конверсия сайта:", conversionRate + "%"

// Напишите ваш код ниже:

`,
    solutionCode: `const rawVisitors = "500";
const rawBuyers = "25";
const visitors = +rawVisitors;
const buyers = +rawBuyers;
const conversionRate = (buyers / visitors) * 100;
console.log("Конверсия сайта:", conversionRate + "%");`,
    explanation: 'Строки из ввода приводятся унарным плюсом к типу Number, после чего математическая формула дает 5%.',
    expectedOutput: 'Конверсия сайта: 5%',
    testCases: [
      {
        id: 't4-10-c1',
        title: 'Приведение к числам через унарный плюс +',
        expected: '+rawVisitors и +rawBuyers',
        validate: (_, code) => {
          const hasUnary = /\+\s*rawVisitors/.test(code) && /\+\s*rawBuyers/.test(code);
          return {
            passed: hasUnary,
            actual: hasUnary ? 'Унарные плюсы найдены' : 'Унарное приведение + не найдено',
            message: hasUnary ? 'Строки приведены к числам' : 'Используйте +rawVisitors и +rawBuyers'
          };
        }
      },
      {
        id: 't4-10-c2',
        title: 'Вывод конверсии 5%',
        expected: 'Конверсия сайта: 5%',
        validate: (logs) => {
          const match = logs.some((l) => l.includes('Конверсия сайта:') && l.includes('5%'));
          return {
            passed: match,
            actual: logs.join(' ') || '(нет вывода)',
            message: match ? 'Конверсия 5% получена' : 'Ожидался вывод: Конверсия сайта: 5%'
          };
        }
      }
    ]
  }
];
