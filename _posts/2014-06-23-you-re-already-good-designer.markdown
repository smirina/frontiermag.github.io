---
layout: post
title: "Вы уже неплохой дизайнер"
published: false
tag: ""
short: "Перевод древней, но всё ещё прекрасной статьи."
---
    Я неплохой хакер, я могу сразу решать невероятно сложные задачи с уверенностью. Я могу распутать спагетти-код и вплести в него прекрасные паттерны. Я легко представляю системы и реализую их с изяществом импровизирующего джазового пианиста.
    Но я не могу дизайнить всю мою жизнь. Пожалуйста, помогите.

Я слышал эту историю много раз за те десять лет, что я работаю с программистами. Программирование — *чертовски сложное* ремесло для изучения. Мой мозг взрывается от уровней сложности ПО, собранного из простейших элементов программирования — переменных, условий, циклов, функций и объектов. Иногда мне кажется, что у тебя есть каменоломня, дерево, верёвка, пила и долото, а архитектор просит построить собор.
Программистский подход к постройке собора будет включать использование своих инструментов и необработанных материалов для создания более сложных объектов. Представим работу такого мастера: он возьмёт немного дерева и камня, чтобы создать молоток, затем при помощи блоков вытащит камни из карьера, он построит платформы и леса, чтобы достичь недоступных мест, создаст кран, чтобы переносить блоки, и так далее.
Наш ремесленник будет фанатично следовать плану архитектора, и с болезненным упорством будет обрабатывать долотом каждый камень так, что каждый кирпич будет лежать как влитой. Он отполирует дерево в гигантскую резную дверь, под стать самому Господу Богу. Массивные колонны не обрушатся в течении тысяч лет.
А когда закончит, он отойдёт на несколько шагов и, восхищаясь красотой, осознает:  «Эй, да я же построил весь собор самостоятельно, может если бы я попробовал спроектировать свой собор, я бы получил все почести, а не этот ленивый чувак, который просто помог с планом и ждал, пока я закончу».
Конечно же, когда программист в первые пробует себя в дизайне, он заметит, что всё это смотрится неуклюже, и этому есть ряд причин, но, на самом деле, все шансы на его стороне. Абсолютно необходимо распознать косяки программистского мышления, чтобы преодолеть эти трудности. Позже я поясню, что же работает на него.

# 1. Знакомство со сложностью реализации поощряет компромисы.

Я дизайнер по профессии, у меня степень по Дизайну Информации. Но, как это часто случается, незнание поощряет уверенность и я нырнул в программирование, думая, что это будет занятным хобби, но на самом деле оно засасывает вас и вы становитесь другим человеком. Я не компетентный программист, с какой стороны ни посмотреть, но мне нравится программировать. Я создал [memela.com](http://memela.com) полностью самостоятельно, можете глянуть моё портфолио и профиль на stackoverflow. Парадокс изучения в том, что область настолько велика, что стоит признать: вам не удастся познать всё за всю свою жизнь.

Когда я только начинал программировать
When I first started programming, I’d start sketching a general idea on paper, and when I’d grow bored of it, I’d jump into Textmate and bang some code. Sometimes I’d encounter that a particular feature was difficult to implement, so I’d go back to my sketch and rework it so it was easier to implement, even if the user experience suffered in the process.
This, I think, is the biggest mistake programmers make when designing their own products. This is a form of technical debt that is incredibly expensive if done repeatedly, but it’s very tempting when you’ve been struggling with a particular problem for some time.
Nowadays I separate the designing and programming phases completely. I start by sketching on paper, then create a pixel perfect mock-up and then I finally start programming. If there is something that I find hard to implement, I ask for help, making me a better programmer in the process.
The equivalent of our medieval craftsman would be noticing that the doors of the cathedral are a lot of work, so he replaces it with a standard sized door. Soon enough the cathedral is inaugurated and there’s an unsurmountable bottleneck when the crowd tries to enter the cathedral.
2. Data modeling clouds your understanding of use cases and tasksNailing the data models is the hallmark of a competent software architect. It sets the foundation for clean, understandable code. Unfortunately, it also provides a data centric view of the entire project; and when the software architect designs the graphical interface, it looks a hell lot like the models with a CRUD interface slapped on.
Programmers get a lot of unjustified heat for designing these kind of interfaces. Very few people understand why data modeling shapes a very strong mental model of how the interface should work. This problem is often painfully obvious in backend administration systems, where the programmer is left on his own because designers are busy on the public side of the application. Often programmers rely on automated admin tools because—despite being a crucial component—clients don’t want to pay for it.
The key to escaping mental model contamination is thinking in terms of use cases and tasks. Whereas duplication and redundancy are the bane of good data models, it often is the opposite for use cases. In some supermarkets you will find mayo next to the tuna, a cereal island next to the milk refrigerators, and Clamato next to vodka (as well as in the usual places). Let me use information where I need it, not where the data model dictates it should be.
3. Most design is written about and taught from the perspective of artWhen I was younger I would ask people how to dance, they would often suggest to “feel the music”. Once you feel the music you can start moving your body along with the rhythm, or so they said. “Just tell me how to move my feet and my arms”, this would invariably turn out wrong, because I’d just flail my arms at my own pace. A sad spectacle that I’d prefer to forget.
It wasn’t until the Rockstar type of games started coming out that I finally understood what they meant by feeling the rhythm. There is a bass that marks the predominant rhythm and some other instrument that marks a secondary rhythm. You pace a range of pre-defined movements to these instruments and boom, you’re dancing half decently. But alas, this revelation came too late and I’m still a terrible dancer.
Perhaps you have already asked a designer where to get started with design. I’m pretty sure his advice was to observe things carefully, notice the details, copy things you like to understand how they work. This is good advice, but it’s the same thing you would tell someone learning how to draw.
This is what I call art oriented advice and it’s the same kind of advice I was being dispensed when I asked how to dance. It’s useless to logical minds because when you like something you just don’t know what you’re supposed to be looking at. It comes naturally to people who have some art experience because they are used to observing proportion and balance.
People often make of design some sort commercial spawn of art. It is not. Design is a discipline in itself, related to engineering, that uses some of art’s syntax (in the case of visual design). It is different from engineering in the sense that engineering looks after the efficiency and robustness the product, and design looks at the interaction between the product and a human being.

Ладно, теперь к хорошему:

**You are already a pretty good designer**

Если вы программировали несколько лет, вы наверняка умеете очень хорошо проектировать и выстраивать архитектуру в коде. Эти навыки связаны с визуальным дизайном на более высоком уровнее абстракции. Связь настолько сильную, что можно свести двух мастеров из каждогй области и это не будет бессмыслицей для крутых дизайнеров и программистов. На самом деле, я собираюсь свести Эдсгера Дейкстру и  и Чарьза Имза.

Имз: Дизайн сильно зависит от ограничений.

Дейкстра: Способность суждения высокого качества обязательно подразумевает способность нахождения возможных проблем.

Имз: Вводи новшества только в крайнем случае.

Дейкстра: Опытный программист <…> бежит от умных трюков как от чумы.

Имз: Кто вообще сказал, что удовольствие не функционально?

Дейкстра: Не должно быть такой вещи, как скучная математика.

Всё что вы знаете о проектировании и архитектуре в программировании можно уже применять к визуальному дизайну, за несколькими исключениями. Проблема в том, что ваш набор навыков ограничен определённой областью. У вас нет моста, чтобы применить всё то, что вы знаете о проектировании ПО к дизайну.
**Вы уже креативны**
Возможно, вы застряли в болоте мыслей, что креативность это состояние ума, момент эврики, который выжигает плоть, чтобы создать что-то новое.
Я пойду так далеко, что скажу, что популярная концепция креативности на самом деле вредна для хорошего дизайна, так как она полагается на устоявшиеся соглашения, чтобы функционировать. Есть время и момент, чтобы создавать новое, но не ради того, чтобы просто сделать новое.
Креативность означает способность создавать вещи. Оюъекты, которые могут быть показаны, обсуждены и использованы дальше. В этом смысле программисты куда более креативны, нежели многие так называемые креативные профессионалы вокруг.

**Ваш систематизированный ум может быть использован к вашей пользе**

Один из самых сложных концептов для обучения молодых и подающих надежды дизайнеров -- это способность мыслить системами. Если я требую кнопку на 99design (без объяснения контекста), люди радостно начную создавать блестящие реалистичные кнопки. Вы возможно знаете, что неправильно в этом сценарии: нельзя задизайнить кнопку без знания того, как выглядит весь дизайн.
Это то, в чём дизайнеру нужно несколько лет, чтобы вырасти, потому что взаимосвязи между визуальными элементами не так очевидны, как в коде. Я говорю не только об однообразности, но и о чётком понимании, что каждый элемент соревнуется за нимание, и делая неважный элемент ярким, вы отвлекаете пользователя от всех других.

**У вас уже есть внимание к мелочам**
 
По шкале от одного до десяти, насколько грешно выбрать плохое имя для переменной?
Теперь, по той же шкале, сколько вы выберете для кода, в котором у каждой переменной странное имя?
Это внимание к деталям. Знание того, что детали создают продукт. Я постоянно удивляюсь дисциплинированности некоторых программистов, чей код внимательно отформатирован, комментарии по делу, а структура очевидна, стоит только взглянуть.
Таким образом, как начать изучать дизайн? Обучение дизайну несколько отличается от других дисциплин. И это правильно, потому что в дизайне важны как навыки, так и знание. Если он ориентирован на продукт, потому что профессиональный дизайн именно такой. Дизайн не субъективен, как многие говорят, он призван решать проблему, а у проблемы может быть несколько решений, некоторые из которых лучше других.
Настоящая структура дизайнерского образования вертится вокруг критики дизайна: преподаватель объясняет некие концепты, затем просит студентов связать что-либо визуальное с этими концептами, добавив ограничений, после чего работа обсуждается всей группой.
Настоящие механизмы критики довольно интересны. Каждый студент выкладывает свою работу на большой стол, и учитель выбирает одну, чтобы студенты высказали свои мысли о ней. В этот момент, авторство не важно. Скорее всего учитель и его собеседники даже не знают, кто это сделал.
Цель не в критике студента, а в критике работы.. Так что, студент предлагает мнение, а учитель его проверяет. После нескольких раундов обсуждения, преподаватель высказывает своё мнение и обсуждение переходит к следующей работе.
Я думал долго и упорно, как воспроизвести этот формат в онлайне так, чтобы он масштабировался. Я расширю его до других дисциплин, но первоначальный курс будет про дизайн для программистов. Если вы заинтересованы, зарегистрируйтесь, чтобы мы известили вас, когда запустимся, или просто зафолловьте нас на Твиттере. Мы напишем ещё больше в этом блоге про взаимоотношения между дизайном и программированием. Keep tuned.
