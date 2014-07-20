---
layout: post
title: Замена switch простыми объектами
tag: javascript
short: Тодд Мотто предлагает отказаться от оператора switch, заменив его простыми объектами.
published: true
---

Во многих языках программирования существует оператор `switch` -- но должен ли он существовать и дальше?
Если вы javascript-программист, то вы часто используете объекты, создавая, инстанциируя и манипулируя ими.
Объекты действительно гибки, они -- сердце почти всего в Javascript. Недавно я заменил ими оператор `switch`.

### Что за оператор switch?

Если вы никогда не использовали оператор `switch`, или не уверены, что он делает, давайте проведём ликбез.
`switch` получает что-нибудь на вход и исполняет разные фрагменты кода, в зависимости от входных данных.
Вот обычный `switch`:

{% highlight javascript %}
var type = 'coke';
var drink;
switch(type) {
case 'coke':
  drink = 'Coke';
  break;
case 'pepsi':
  drink = 'Pepsi';
  break;
default:
  drink = 'Unknown drink!';
}
console.log(drink); // 'Coke'
{% endhighlight %}

Похоже на `if` и `else`, но мы выполняем один раз условие внутри `switch` и используем `case`, 
чтобы сравнить с каждым значением.

Если вы видите много условий `else if`, то что-то явно не так и вам следует, в общем-то, использовать что-нибудь
вроде `switch`, так как он больше подходит по цели и назначению.

Вот неправильное использование `else if`:

{% highlight javascript %}
function getDrink (type) {
  if (type === 'coke') {
    type = 'Coke';
  } else if (type === 'pepsi') {
    type = 'Pepsi';
  } else if (type === 'mountain dew') {
    type = 'Mountain Dew';
  } else if (type === 'lemonade') {
    type = 'Lemonade';
  } else if (type === 'fanta') {
    type = 'Fanta';
  } else {
    // acts as our "default"
    type = 'Unknown drink!';
  }
  return 'You\'ve picked a ' + type;
}
{% endhighlight %}

Эта реализация неустойчива, в ней легко ошибиться, к тому же слишком много синтаксиса, который необходимо повторять.
Также тут можно вставлять хаки: можно исполнять несколько выражений внутри каждого условия `else if`, 
например `else if (type === 'coke' && somethingElse !== 'apples')`. `switch` был лучшим инструментом для этого, несмотря
на то, что вам нужно постоянно добавлять `break;` чтобы предотвратить дальнейшее исполнение (только одна из многих проблем).

### Проблемы со switch
Их довольно много, начиная с императивного потока исполнения до нестандартно выглядящего способа обработки блоков кода,
везде в javascript используются фигурные скобки, за исключением switch.
Это явно не лучшее в Javascript. Нас заставляют вручную добавлять `break;` внутри каждого `case`, что ведёт
к сложному отлаживанию из-за срабатывающего когда не надо кейса.
Дуглас Кроукфорд писал и говорил об этом множество раз, его рекомендация: использовать их с осторожностью.

Мы часто используем свойства объектов в JS, зачастую для таких вещей, где мы никогда бы не подумали использовать
`switch` -- так почему бы не использовать литералы объектов вместо него? Объекты куда более гибки, лучше читаются
и поддерживаются, нам не нужно вручную писать `break;` после каждого `case`. Они куда дружелюбнее для новичков в JS,
ведь это обычные объекты.

С ростом кейсов производительность объекта (хэш-таблицы) становится лучше, чем средняя цена аналогичного `switch`
(важен порядок кейсов).
Подход объектов -- это просто поиск по хэш-таблице, а switch должен выполнить каждый кейс,
пока не найдёт совпадение и `break`.


### Поиск свойств в литералах объектов

Мы используем объекты всё время, либо через конструкторы, либо через литералы. Часто мы используем их для поиска свойств,
чтобы получить соответствующее значения.

Давайте создадим простой литерал, который возвращает только строку.

{% highlight javascript %}
function getDrink (type) {
  var drink;
  var drinks = {
    'coke': 'Coke',
    'pepsi': 'Pepsi',
    'lemonade': 'Lemonade',
    'default': 'Default item'
  };
  return 'The drink I chose was ' + (drinks[type] || drinks['default']);
}

var drink = getDrink('coke');
// The drink I chose was Coke
console.log(drink);
{% endhighlight %}

Мы сэкономили несколько строчек кода, и лично для меня представление данных стало гораздо понятнее.
Можно упростить ещё сильнее, если избавиться от случая по умолчанию:

{% highlight javascript %}
function getDrink (type) {
  return 'The drink I chose was ' + {
    'coke': 'Coke',
    'pepsi': 'Pepsi',
    'lemonade': 'Lemonade'
  }[type];
}
{% endhighlight %}

Но нам возможно понадобится код посложнее, чем просто `String`, который можно разместить в функции.
Для чистоты изложения и простоты понимания, я просто верну те же строки из новых функций:

{% highlight javascript %}
var type = 'coke';

var drinks = {
  'coke': function () {
    return 'Coke';
  },
  'pepsi': function () {
    return 'Pepsi';
  },
  'lemonade': function () {
    return 'Lemonade';
  }
};
{% endhighlight %}

Разница в том, что теперь необходимо вызвать функцию объекта литерала:

{% highlight javascript %}
drinks[type]();
{% endhighlight %}

Проще поддерживать и читать. Не надо переживать насчёт `break;` и проваливания кейсов -- это простой объект.

Обычно мы используем `switch` в функции, чтобы получить значение для `return`, так что давайте сделаем также с литералом:

{% highlight javascript %}
function getDrink (type) {
  var drinks = {
    'coke': function () {
      return 'Coke';
    },
    'pepsi': function () {
      return 'Pepsi';
    },
    'lemonade': function () {
      return 'Lemonade';
    }
  };
  return drinks[type]();
}

// let's call it
var drink = getDrink('coke');
console.log(drink); // 'Coke'
{% endhighlight %}

Просто и мило, но нет обработки случая по умолчанию, но это легко добавить:

{% highlight javascript %}
function getDrink (type) {
  var fn;
  var drinks = {
    'coke': function () {
      return 'Coke';
    },
    'pepsi': function () {
      return 'Pepsi';
    },
    'lemonade': function () {
      return 'Lemonade';
    },
    'default': function () {
      return 'Default item';
    }
  };
  // if the drinks Object contains the type
  // passed in, let's use it
  if (drinks[type]) {
    fn = drinks[type];
  } else {
    // otherwise we'll assign the default
    // also the same as drinks.default
    // it's just a little more consistent using square
    // bracket notation everywhere
    fn = drinks['default'];
  }
  return fn();
}

// called with "dr pepper"
var drink = getDrink('dr pepper');
console.log(drink); // 'Default item'
{% endhighlight %}

Можно упростить `if` и `else` используя _or_ `||` внутри выражения:

{% highlight javascript %}
function getDrink (type) {
  var drinks = {
    'coke': function () {
      return 'Coke';
    },
    'pepsi': function () {
      return 'Pepsi';
    },
    'lemonade': function () {
      return 'Lemonade';
    },
    'default': function () {
      return 'Default item';
    }
  };
  return (drinks[type] || drinks['default'])();
}
{% endhighlight %}

Мы обернули два поиска по объекту внутри скобок `( )`, трактуя их как выражение.
Затем вызываем результат выражения. Если `drinks[type]` не найден, то вызовется `drinks['default']`.

Мы не обязаны возвращать значения из функций, мы можем менять переменную, а потом вернуть её:

{% highlight javascript %}
function getDrink (type) {
  var drink;
  var drinks = {
    'coke': function () {
      drink = 'Coke';
    },
    'pepsi': function () {
      drink = 'Pepsi';
    },
    'lemonade': function () {
      drink = 'Lemonade';
    },
    'default': function () {
      drink = 'Default item';
    }
  };
    
  // invoke it
  (drinks[type] || drinks['default'])();
    
  // return a String with chosen drink
  return 'The drink I chose was ' + drink;
}

var drink = getDrink('coke');
// The drink I chose was Coke
console.log(drink);
{% endhighlight %}

Это очень простые решения, литерал хранит `function`, которая возвращает `String`
Если вам нужна только строка, вы _можете_ использовать `String` в качестве значения ключа -- но иногда
функции содержат логику, которая необходимо вернуть из функции. Если у вас смешиваются функции и строки,
проще использовать функции всё время, чтобы не проверять на тип -- мы не хотим вызывать `String` как функцию.

### Проваливание с литералами объектов

Со `switch` мы можем позволить кейсам проваливаться (это означает, что несколько условий могут соответствовать одному фрагменту кода):

{% highlight javascript %}
var type = 'coke';
var snack;
switch(type) {
case 'coke':
case 'pepsi':
  snack = 'Drink';
  break;
case 'cookies':
case 'crisps':
  snack = 'Food';
  break;
default:
  drink = 'Unknown type!';
}
console.log(snack); // 'Drink'
{% endhighlight %}

Мы позволяем `coke` и `pepsi` проваливаться, не используя `break;`. Реализовать это на объектах очень просто
и более декларативно -- и в таком случае сложнее ошибиться
Наш код внезапно становится более структурированным, читабельным и реюзабельным:

{% highlight javascript %}
function getSnack (type) {
  var snack;
  function isDrink () {
    return snack = 'Drink';
  }
  function isFood () {
    return snack = 'Food';
  }
  var snacks = {
    'coke': isDrink,
    'pepsi': isDrink,
    'cookies': isFood,
    'crisps': isFood,
  };
  return snacks[type]();
}

var snack = getSnack('coke');
console.log(snack); // 'Drink'
{% endhighlight %}

### Подводя итоги

Литералы объектов лучше вписываются в поток Javascript, `switch` староват и неуклюж, к тому же легко создаёт сложности в дебаггинге. Объекты расширяемы, их легко поддерживать и гораздо проще тестировать. Объекты используются изо дня в день и к ним применимы паттерны проектирования. В них могут содержаться как функции, так и любой другой [тип объектов](//toddmotto.com/understanding-javascript-types-and-reliable-type-checking), что делает их очень гибкими. Каждая функция внутри литерала обладает функциональной областью видимости, так что мы может вернуть замыкание от родительской функции (в нашем случае `getDrink` возвращает замыкание);



[Оригинал](http://toddmotto.com/deprecating-the-switch-statement-for-object-literals/?utm_source=frontier&utm_medium=site)
