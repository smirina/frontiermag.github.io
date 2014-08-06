---
layout: post
title: Новый юзер-агент мобильного IE
short: Алекс Читу об обновлении Internet Explorer, в частности, изменённом User-Agent
published: true
tag: mobile
---
Несколько месяцев назад я купил 520-ую Люмию на &laquo;попробовать&raquo; &mdash; и она оказалась неплохим телефоном.
Windows Phone блистает на low-end оборудовании, железо Нокии великолепно для телефона, который стоит около ста долларов.
В WP есть много проблем, часть из них связана с его поздним запуском 
(<span title="#вернитемнемой2010 (хэштег редакции)">2010</span>) и низкой долей на рынке (около 3%).
Многие компании, в том числе и Google, продолжают игнорировать Windows Phone, многие сайты не оптимизируются под
мобильный IE.

Если вы используете гугловские сервисы и продукты вроде Gmail, Google Maps, Google+, Google Drive, Chrome, 
то вам сложно перейти на Windows Phone. Существуют некие приложения для гуглосервисов от третьих лиц, но они далеки
от оригинальных приложений под iOS и Android. Google не хочет делать Windows Phone популярнее, поэтому
не выпускает приложения под него. Также Google отдаёт урезанные версии своих мобильных приложений
в мобильном IE. Мобильный сайт Gmail под Windows имеет больше общего с версией для раскладушек.

Всё это мне напоминает о ранних днях Оперы. Опера страдала от низкой доли на рынке и была вынуждена подменять свой
юзер-агент, чтобы идентифицироваться как Internet Explorer. Сайты, которые требовали IE работали в Опере, но разработчики
продолжали её игнорировать.

Последний апдейт Windows Phone 8.1 изменил юзер-агент IE, чтобы мимикровать под мобильный Safari. 
Microsoft добавил  "like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML. like Gecko) Mobile Safari/537", а также
"Android 4.0". Сайты, которые проверяют юзер-агент на строки вроде "iPhone", "Android" или "Mobile Safari" 
должны хорошо работать в последнем мобильном IE. И хотя внутри браузера всё тот же движок рендеринга Trident, 
Microsoft использовала несколько хаков, чтобы улучшить совместимость с WebKit.

<img src="http://1.bp.blogspot.com/-I9U5yRqEZyk/U-DARUaPh-I/AAAAAAAB-q8/uTQmBonII6U/s1600/windows-phone-user-agent.png">

WebKit &mdash; самый распостранённый движок рендеринга в мобильных браузерах. Apple использует его Safari под iPhone
и iPad, Google использует его в мобильном браузере под Android и позднее в Chrome под Android. Google форкнул WebKit
и теперь использует Blink. И так как WebKit доминирует на мобильных устройствах, большинство разработчиков оптимизирует
свои сайты под него и использует нестандартные вебкитовские фичи.
У Firefox и Internet Explorer немного мобайл-пользователей, поэтому разработчики не заморачиваются оптимизацией под
эти браузеры.

"Unlike the mostly standards-based desktop web, many modern mobile web pages were designed and built for iOS and the 
iPhone. This results in users of other devices often receiving a degraded experience. Many sites use features via a 
legacy vendor specific prefix without supporting the un-prefixed standard version or only support vendor prefixes 
for certain devices. Other sites use non-standard proprietary APIs that only work with Safari or Chrome. Of course 
there were also bugs or missing features in IE that became particularly apparent on mobile sites designed specifically
for our competitors' browsers," informs the IE blog.

Довольно иронично видеть жалобы Microsoft на то, что сайты используют нестандартные фичи и не совместимы с Internet
Explorer. Я всё ещё помню те сайты, что требовали IE6 и отвратительно работали во всех прочих браузерах.

Хорошоая новость в том, что многие сайты теперь нормально работают в браузерах Windows Phone. Microsoft 
"протестировала более чем пятьсот топовых мобильных веб-сайтов и выяснила, что обновление IE11 улучшает юзер-экспириенс
на более чем 40% из них." Вот скриншот Gmail в новом IE:

<img src="http://4.bp.blogspot.com/-4TDwHGj7amc/U-DARfycliI/AAAAAAAB-q4/P8I0IbJZM_w/s1600/windows-phone-gmail.png">

... и скриншот Gmail из UC Browser, который всё ещё использует старый юзер-агент:

<img src="http://3.bp.blogspot.com/-uWqf2kqI8JE/U-DTmqZJsGI/AAAAAAAB-rg/a1yDCAka8U4/s1600/windows-phone-gmail-2.png">

Юзер-агенты запутаны; разработчикам стоит использовать feature detection, а не полагаться на довольно бессмысленную строку.
Юзер-агент Chrome содержит "Mozilla", "Gecko", "AppleWebKit" и "Safari" для обратной совместимости. Теперь юзер-агент
мобильного IE содержит "Android", "iPhone", "AppleWebKit", "Mobile Safari", "Gecko". 
