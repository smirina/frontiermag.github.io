---
layout: post
title:  "Критика JavaScript-криптографии"
date:   2014-06-22 23:43:00
tag: "по полочкам"
short: "Перевод статьи Брэндона МакМиллана"
published: false
---


Введение
------------

Для большей педантичности, этой статье, лучше бы подошло название «Критика внутрибраузерной криптографии», потому что именно «внутрибраузерной» задевает людей — JavaScript это просто ещё один язык программирования.

Постам в блогах, тредам комментов и чатам о криптографии внутри браузера *всегда* не хватает строгости и *обычно* они до ужаса банальны и бессмысленны. Квинтэссенцией всего этого выступает статья Matasano Security под названием «[Javascript-криптография считается вредной](http://matasano.com/articles/javascript-cryptography/)»,
которая, к огорчению тех, кто счёл её качественным расставлением точек над i, просто отпугивает новичков прочь от того, о чём они вероятно пожалеют. (Впрочем, это полезно в некоторых случаях, но неуместно в более формальной дискуссии).

Здесь же, вместо набрасывания бессмысленных с точки зрения криптографии фраз вроде «вредно», я надеюсь предоставить тщательный и объективный анализ криптографии внутри браузера.


Во-первых, сузим предмет разговора
------------------
Моя первая цель — убедить читателя, что безопасность криптографии внутри браузера можно анализировать точно так же, как безопасность репозиториев ПО.

В общем-то, не учитывая индивидуальные механизмы защиты, общий смысл таков:

- **Случай 1:**  Браузер соединяется с сервером, запрашивает именованный ресурс, сервер его отправляет, браузер интерпретирует и исполняет.
- **Случай 2:**  <abbr title="A software updater в оригинале, то есть и Windows Updater, и Adobe Updater, и iTunes, и все никсовые пакетные менеджеры — всё подходит.">Пакетный менеджер</abbr> соединяется с репозиторием, запрашивает именованный ресурс, сервер его отправляет, пакетный менеджер интерпретирует и устанавливает (чтобы затем исполнить).

Остановитесь на секунду — в общем-то, одно и то же, да?

Часто приводят аргумент, что в случае с браузером код должен быть запрошен каждый раз, а в случае с репозиторием — единожды. Этот аргумент отвергает
[заголовки кэша HTTP](http://www.mobify.com/blog/beginners-guide-to-http-cache-headers/)
и способность сайтов работать в [оффлайне](http://diveintohtml5.info/offline.html) — и то, и другое требует от браузера противоположного поведения. Более того, также упускается из виду то, что, несмотря на то, что бразуер запрашивает ресурсы чаще, пакетный менеджер запрашивает их по заданным интервалам (часто без ведома или согласия пользователя).

Вторая попытка разграничить заключается в том, чтобы убедить слушателя, что репозитории ПО предлагают повышенную форму проверяемости или что они не способны идентифицировать пользователя. Честно говоря, я не знаю, откуда берётся этот аргумент. Я не знаю, как такое вообще возможно, учитывая то, что если сервер можно склонить к успешной TLS-транзакции с определенным пользователем, то и репозиторий можно склонить к тому же, или к подписыванию вредоносного пакета, или к тому, чего требует их модель защиты.


Если посмотреть глубже, то есть разделение: требуется *либо** компрометация файловой системы, *либо* компрометация ключа, чтобы распространять вредоносный код пользователям с TLS, но репозитории могут быть спроектированы так, что требуется компрометация *именно* ключа (через реализацию оффлайн-ключей). Несмотря на это, есть ряд примеров безопасных репозиториев ПО, которые используют TLS. Это не вопрос жизни и смерти (и они вряд ли сменят TLS вскоре), потому что решение использовать оффлайн-ключи — паллиативное, в лучшем случае, и лишь слегка улучшит уровень безопасности системы.

Тем не менее, я открыто признаю, что есть ряд случаев, когда репозитории могут предложить более высокий уровень безопасности, чем сегодняшние браузеры. Я планирую обсудить это позже.


Обсуждение безопасности
------------------------

Выше мы слегка коснулись того, что безопасность — не булева алгебра, а существуют *уровни* безопасности, поэтому когда люди перефразируют Matasano и говорят «JavaScript-криптография *небезопасна*», они прыгают ещё дальше в кроличью нору бессмысленности, они не смогут объяснить, *против чего* небезопасна.

Схема или реализация **безопасна**, если противник, обладая определенным уровнем силы, не способен достичь искомой цели. Уровень силы, предполагаемый у противника, и его главная цель вместе называются **моделью угрозы**

Если новая схема безопасна против новой модели угрозы, которая увеличивает уровень силы противника или расширяет его цель, то можно сказать, что новая схема обладает *большим уровнем безопасности*.

### Пассивные противники

«Пассивный» противник — это сокращение для такой модели угрозы, в которой третье лицо хочет получить информацию и может прослушивать все каналы связи между собеседниками. Пассивные противники — слабейшие из тех, что стоит рассматривать, потому что защита от них требует просто *секретности* любой важной информации.

Примеры пакетных менеджеров, которые защищены против пассивных противников: Pacman, ports и Slaktool. Это означает, что они не используют никаких механизмов защиты, кроме тщательного выбора зеркал, которым они доверяют. [1]
С этой моделью угрозы, репозитории этих пакетных менеджеров всё ещё могут безопасно доставить программное обеспечение, которое позволит пользователю создать канал связи, неприступный для противника. Например, они могут послать свой публичный ключ или пакет, который представляет интерфейс к
[протоколу обмена ключей Диффи-Хеллмана (DHKE)](http://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange).

В то же время, форма логина через HTTP неустойчива против пассивных противников, потому что пароль пользователя может быть просто перехвачен после отправки. Тем не менее, протокол, описанный Matasano, безопасен. Сервер отправляет случайный `nonce`  пользователю, а пользователь отправляет  `HMAC-SHA1(password, nonce)`.  [2]
Как и в случае с DHKE, пассивный противник может слушать все каналы связи между сервером и клиентом, но не сможет восстановить пароль пользователя. Если сервер ещё и подстраховывает это сессиями, которые также безопасны против пассивного противника, то владельцы сервера вполне возможно потратили стоимость TLS-сертификата напрасно, если это самый высокий уровень безопасности, который им нужен.

(И, да. Такие противники есть «в природе». Программа массовой слежки NSA — как раз пример пассивного противника)

Стоит отметить, что здесь кроется ошибка Matasano: они предлагают схему и обсуждают её безопасность при определенной, жёстко заданной модели угрозы, а затем передёргивают, внезапно заявляя, что, *на самом деле*, схема совсем не безопасна против более мощных модель угроз, нежели той, с которой они начали. [2]
**Ну, конечно.**


### Активные противники

Активный противник, с другой стороны, способен наблюдать *и* изменять все каналы связи между сервером и клиентом, чтобы получить необходимую информацию. Защита от активного противника требует как *подлинности*, так и *секретности*, которая использовалась против пассивных противников.

В пакетных менеджерах, всего два фундаментальных класса информации должны быть аутентичны: содержимое пакетом и их таймлайны (время создания версий). Очевидно, что если пакет не проверяется, то противник легко может его заменить вредным кодом. Однако, если время неподлинно (это значит, что пользователь не уверен, что получает последнюю версию ПО), то атакующий может предоставить настоящую, но устаревшую версию того же пакета — и использовать уже известные уязвимости, которые могли быть исправлены в последующих версиях. [3]

Простейший и, наверно, сейчас единственный путь защиты против такой атаки в случае сервер-клиент — это HTTPS. В исследованиях репозиториев ПО было выдвинуто следующее заключение:

> Если пакетный менеджер поддерживает HTTPS и корректно проверяет сертификат, то можно установить репозитории или зеркала, которые поддерживают HTTPS-трансферы. Это не защитит от вредоносного зеркала, но защитит от атаки man-in-the-middle со стороны [1]

То есть, в отсутствие зеркал (которые безопасные серверы всё равно не используют), HTTPS успешно аутентифицирует содержимое файлов и подтверждает, что это новейшие доступные версии.  (Мы и так это знаем, конечно, но приятно иметь дополнительное доказательство)

В противоположность пассивным противникам, нет ничего, что может сделать внутрибраузерная криптография, чтобы защитить от активных противников. Установление безопасного канала в присутствии активного противника всегда требует заранее сообщённого секрета и способности использовать этот секрет корректно, что противоречит природе криптографии внутри браузера.


### Честные-но-любопытные сервера

Модель угрозы «честный-но-любопытный» (HBC, Honest-but-Curious) требует, чтобы все участники следовали определенному протоколу честности/корректности, но они так же могут быть любопытными и анализировать (или отказываться забывать) любую информацию из своих записей любого эпизода использования протокола. Цель в том, чтобы извлечь некую критичную часть информации.

HBC это следующий логичный шаг в усилении безопасности, потому что раз мы уже защитили себя от самого мощного противника-третьего лица, то теперь можем начать не доверять собеседнику.

К примеру, в случае доступного поиску симметричного шифрования, сервер поиска, следуя протоколу честно, позволяет пользователю искать и получать свои приватные документы, не сообщая серверу что-либо о содержимом этих документов. Или, более общно, HBC часто используется в схемах, где существует `n` участников, каждый обладает секретом и хочет узнать функцию от секретов всех прочих участников, не раскрывая свой секрет (например, нахождение среднего от набора важных значений).


В то время, как есть небольшие опасения о любопытстве репозиториев, мы верим, что они честны. 
While there's been little concern about the curiosity of software repositories,
they are trusted to be honest.  This is because whether there has been a
break-in or the repository itself has become malicious, "we believe a software
update system cannot remain secure if an attacker who can respond to client
messages has compromised *all* of its keys."  [3]  In the case of package
managers that are considered secure at this level, that means the one private
key used for signing or TLS.

Opposite from software repositories, where HBC can't offer much more (besides,
perhaps, [PIR](http://en.wikipedia.org/wiki/Private_information_retrieval)),
servers are forced to handle their users' data in exceedingly novel ways to
protect their privacy.  [Zero-knowledge password proofs](http://en.wikipedia.org/wiki/Zero-knowledge_password_proof),
or [password-authenticated key agreements](http://en.wikipedia.org/wiki/Password-authenticated_key_agreement)
(like [SRP](http://en.wikipedia.org/wiki/Secure_Remote_Password_protocol)), or
even forms of attribute-based or server-assisted cryptography can and should be
used to authenticate users.  As mentioned above, searchable symmetric encryption
should be used to efficiently and flexibly handle private data.
Client-to-client encrypted messaging systems should be used to handle private
communication between two different users.  The list goes on ad infinitum, ad
nauseam.  At the end of the day, it's up to the developer to strike a balance
between utility of data and security of data.


### Extending and Enforcing the Honest-but-Curious Threat Model

The highest security package manager I know of is called
[The Update Framework](http://theupdateframework.com/), and it's formally
discussed in [3].  The property that distinguishes it from the above systems
is its *survivability*--it can continue to function properly while under attack
or partial compromise--through the use of threshold signatures.  Because, as
the authors put it, "historically, software update systems have been
designed such that the compromise of a single key is fatal."  They have, in
essence, designed a software update system that trusts itself as little as
possible.

I feel the need to critique in-browser crypto for it's failing in this regard,
but we haven't reached a limitation of in-browser crypto--we've reached the
limit of web security.  Browsers simply don't have the ability to provide any
level of survivability.  Maybe that can be a design goal of HTTP 3.0.

Disregarding that, there are often attempts or criticisms for the lack of
attempt to authenticate the underlying code of in-browser crypto.  The standard
nostrum is some kind of browser add-on that verifies a website's code before
running it.  Presumably under the same executive control as the site itself, so
I fail to see how changing two codebases rather than one was ever considered a
real security option.  Perhaps this is another manifestation of the idea that
offline keys are more secure than TLS keys, but making some poor developers
maintain a high-security website and an extension for every modern browser for
negligible security benefits doesn't sound sustainable (or `#winning`).


### Stronger Levels of Security...?

There are no stronger threat models worth considering.  I literally just made
a suggestion for HTTP 3.0.  HTTP 3.0 isn't going to happen for hundreds of
years, and you want **more**?


The Problems with Past Articles
-------------------------------

I think it may be of value to some to discuss the rhetorical and logical
fallacies that previous articles on in-browser crypto use to dissuade the
reader.


### Javascript Cryptography Considered Harmful

Matasano's article is one of the most painful things I've read since studying
cryptography because it absolutely buries the reader in nonsense.  The title is
a sweeping generalization and an appeal to fear.  The author regularly omits,
confuses, or writes off threat models in an attempt to disarm the reader--what I
talked about in the 'Passive Adversaries' section.

He reveals a transparent ignorance of the actual subject matter by saying that
"having established a secure channel with SSL, you no longer need Javascript
cryptography," and uses appeals to common practice and anonymous authority as
the main stilts of his argument in phrases like  "Javascript isn't a serious
crypto research environment" and "[now] you have 'real' cryptography."

He clearly assumes that the reader is an idiot and treats him as one.  As
mentioned earlier, this isn't even a semblance of helpful.


### Final post on Javascript crypto [sic]

This article is misleading in many of the same ways that Matasano's is.  The
author never clearly states any particular threat model--he's more interested
in tallying up the number of easily-apparent attacks, under whatever threat
model he can get away with, and then considers something "more secure" if it
grosses fewer attacks.  He also makes the typical appeal to common practice,
like Matasano, that PGP is irreproachable and everything else is too dodgy.

He takes security problems that are well understood and thought about carefully
in other systems, and instead uses it as a reason to run screaming.  For
example, "7.  Auditability — each user is served a potentially differing copy of
the code."  ... Yes, that is true for in-browser crypto, but it's true for
every time you get anything off of the internet.  Even formal discussions of
secure software repositories consider the targeting of users.  It is wholly
unavoidable.

A second example of this is present in the assertion that the "same-origin
policy is not a replacement for ACLs," which hints at the more general argument
that in-browser crypto lacks a secure keystore.  


### What’s wrong with in-browser cryptography?

This article is actually a fairly good read.  Until you get, like, one-third of
the way through.

The first objection I have is that he rather tacitly references TUF when saying:

> Where installation of native code is increasingly restrained through the use
> of cryptographic signatures and software update systems which check multiple
> digital signatures to prevent compromise..., the web itself just grabs and
> implicitly trusts whatever files it happens to find on a given server at a
> given time.

and then immediately compares it to HTTP.  In fact, that's what most of his
argument consists of:  contrasting in-browser crypto with TUF, making it one
grand perfectionist fallacy.  'In-browser crypto is not as secure as the
state-of-the-art, therefore it's insecure.'

TUF is by no means in wide use or even widely known about, and is in no way
comparable to HTTP.  He also later distinguishes between "data-in-motion" and
"data-at-rest," which has merit, but regardless, is a distinction the vast
majority of other software update systems don't make.


Requests for Clarification
--------------------------

A common issue I've decided to omit is MEGApwn and browsers' lack of a "secure
keystore."  The reason being, nobody has ever actually defined **what** a
"secure keystore" is.

Is the `.ssh` folder a secure keystore?  Because any program running as root or
as the current user can access all of the private keys in that folder freely,
and can even act as a keylogger to find any encryption passwords.  Completely
ignoring that, the fact that malicious scripts can access stored pieces of
sensitive data from the same origin is somehow evidence of insurmountable
insecurity.  Do "secure keystores" just not exist?  Because I can't seem to find
one... at least not one that's the panacea they're claimed to be.

Nate Lawson groundlessly averred that the "same-origin policy is not a
replacement for ACLs," but I fail to see how it offers any less protection than
file-access policies, given the above.

I'd greatly appreciate any clarification of the above--especially in comparison
to other widely deployed security mechanisms.


References
----------

1.  "A Look In the Mirror: Attacks on Package Managers"
2.  "Javascript Cryptography Considered Harmful"
3.  "Survivable Key Compromise in Software Update Systems"
4.  "Final post on Javascript crypto" [sic]
5.  "What’s wrong with in-browser cryptography?"
