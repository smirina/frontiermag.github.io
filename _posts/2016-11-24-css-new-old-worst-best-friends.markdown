---
published: false
layout: post
tag: CSS
original: https://www.smashingmagazine.com/2016/11/css-inheritance-cascade-global-scope-new-old-worst-best-friends/
title: Наследование в CSS, каскады и глобальная область видимости: ваши новые старые худшие лучшие друзья
---
Я фанат [модульного
дизайна](https://www.smashingmagazine.com/2016/06/designing-modular-ui-systems-via-style-guide-driven-development/)
[^1].  Я давно уверен в том, что стоит разделять сайты на компоненты, а не
страницы, и динамически сплавлять эти компоненты в интерфейсы.  Гибкость,
эффективность и лёгкость в поддержке в наличии.

Но я не хочу, чтобы мой дизайн *выглядел* собранным из несвязанных кусочков. Я
же делаю интерфейс, а не сюрреалистический фотомонтаж.

Оказывается, уже есть технология, называется CSS, которая была спроектирована
специально для решений этой проблемы.  С CSS я могу писать стили, которые
выходят за пределы моих HTML-компонентов, **гарантируя целостный дизайн с
минимальными усилиями**.  Во многом, это возможно из-за двух ключевых
возможностей CSS:

* наследование; каскад (буква &laquo;C&raquo; в CSS).


Несмотря на то, что с их помощью возможен
[DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself), эффективный способ
стилизовать документы, и несмотря на то, что это и есть причины, по которым CSS
существуют, они вышли из моды.  От CSS-методологий, таких как БЭМ и Atomic CSS,
до CSS-модулей FIXME, многие стараются обойти или иначе подавить эти фичи. Это
даёт разработчикам больше контроля над CSS, но в автократическом смысле, где
нужно постоянно вмешиваться.

Я собираюсь пересмотреть наследование, каскад и область видимости в этой статье
относительно модульного дизайна интерфейсов. Моя цель -- показать вам, как
можно использовать эти возможности так, чтобы ваш CSS стал короче и
самоуправляемым, а ваши интерфейсы было проще расширять.


### Наследование и `font-family`

<p>Despite protestations by many, CSS does not only provide a global scope. If
it did, everything would look exactly the same.  Instead, CSS has a global
scope and a local scope. Just as in JavaScript, the local scope has access to
the parent and global scope.  In CSS, this facilitates
<strong>inheritance</strong>.</p>

<p>For instance, if I apply a <code>font-family</code> declaration to the root
(read: global) <code>html</code> element, I can ensure that this rule applies
to all ancestor elements within the document (with a few exceptions, to be
addressed in the next section).</p>

{% highlight css %}
```css
html { font-family: sans-serif; }

/* This rule is not needed:

p { font-family: sans-serif; }
*/
```
{% endhighlight %}

<p>Just like in JavaScript, if I declare something within the local scope, it
is not available to the global — or, indeed, any ancestral — scope, but it is
available to the child scope (elements within <code>p</code>). In the next
example, the <code>line-height</code> of <code>1.5</code> is not adopted by the
<code>html</code> element. However, the <code>a</code> element inside the
<code>p</code> does respect the <code>line-height</code> value.</p>

{% highlight css %}
```css
html { font-family: sans-serif; }

p { line-height: 1.5; }

/* Это правило не нужно:
p a { line-height: 1.5; }
*/
```
{% endhighlight %}

<p>The great thing about inheritance is that you can establish the basis for a
consistent visual design with very little code.  And these styles will even
apply to HTML you have yet to write. Talk about future-proof!</p>

#### Альтернативы <p>There are other ways to apply common styles, of course.

Например, я мог бы создать класс `.sans-serif`...


{% highlight css %}
```css
.sans-serif {
  font-family: sans-serif;
}
```
{% endhighlight %}

и применять его к элементам, у которых должен быть этот стиль:

<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>p</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>sans-serif<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>Lorem ipsum.<span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;/</span>p</span><span
class="token punctuation">&gt;</span></span>


</code></pre>


<p>This affords me some control: I can pick and choose exactly which elements
take this style and which don’t.</p> <p>Any opportunity for control is
seductive, but there are clear issues. Not only do I have to manually apply the
class to any element that should take it (which means knowing what the class is
to begin with), but in this case I’ve effectively forgone the possibility of
supporting dynamic content: Neither WYSIWYG editors nor Markdown parsers
provide <code>sans-serif</code> classes to arbitrary <code>p</code> elements by
default.</p> <p>That <code>class="sans-serif"</code> is not such a distant
relative of <code>style="font-family: sans-serif"</code> — except that the
former means adding code to both the style sheet <em>and</em> the HTML. Using
inheritance, we can do less of one and none of the other. Instead of writing
out classes for each font style, we can just apply any we want to the
<code>html</code> element in one declaration:</p>





<pre class=" language-css"><code class=" language-css"><span class="token
selector">html </span><span class="token punctuation">{</span>


<span class="token property">font-size</span><span class="token
punctuation">:</span> <span class="token number">125%</span><span class="token
punctuation">;</span> <span class="token property">font-family</span><span
class="token punctuation">:</span> sans-serif<span class="token
punctuation">;</span> <span class="token property">line-height</span><span
class="token punctuation">:</span> <span class="token number">1.5</span><span
class="token punctuation">;</span> <span class="token
property">color</span><span class="token punctuation">:</span> <span
class="token hexcode">#222</span><span class="token punctuation">;</span> <span
class="token punctuation">}</span> </code></pre>


<h3 id="the-inherit-keyword">The <code>inherit</code> Keyword <a
href="#the-inherit-keyword" aria-label="Link to section 'The inherit Keyword'"
class="sr hsl">Link</a></h3>


<p>Some types of properties are not inherited by default, and some elements do
not inherit some properties. But you can use <code>[property name]:
inherit</code> to force inheritance in some cases.</p> <p>For example, the
<code>input</code> element doesn’t inherit any of the font properties in the
previous example. Nor does <code>textarea</code>. In order to make sure all
elements inherit these properties from the global scope, I can use the
universal selector and the <code>inherit</code> keyword. This way, I get the
most mileage from inheritance.</p>





<pre class=" language-css"><code class=" language-css"><span class="token
selector">* </span><span class="token punctuation">{</span>




<span class="token property">font-family</span><span class="token
punctuation">:</span> inherit<span class="token punctuation">;</span> <span
class="token property">line-height</span><span class="token
punctuation">:</span> inherit<span class="token punctuation">;</span> <span
class="token property">color</span><span class="token punctuation">:</span>
inherit<span class="token punctuation">;</span> <span class="token
punctuation">}</span>

<span class="token selector">html </span><span class="token
punctuation">{</span> <span class="token property">font-size</span><span
class="token punctuation">:</span> <span class="token number">125%</span><span
class="token punctuation">;</span> <span class="token
property">font-family</span><span class="token punctuation">:</span>
sans-serif<span class="token punctuation">;</span> <span class="token
property">line-height</span><span class="token punctuation">:</span> <span
class="token number">1.5</span><span class="token punctuation">;</span> <span
class="token property">color</span><span class="token punctuation">:</span>
<span class="token hexcode">#222</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> </code></pre>


<p>Note that I’ve omitted <code>font-size</code>. I don’t want
<code>font-size</code> to be inherited directly because it would override
user-agent styles for heading elements, the <code>small</code> element and
others. This way, I save a line of code and can defer to user-agent styles if I
should want.</p> <p>Another property I would not want to inherit is
<code>font-style</code>: I don’t want to unset the italicization of
<code>em</code>s just to code it back in again. That would be wasted work and
result in more code than I need.</p> <p>Now, everything either inherits or is
<em>forced</em> to inherit the font styles I want them to. We’ve gone a long
way to propagating a consistent brand, project-wide, with just two declaration
blocks. From this point onwards, no developer has to even think about
<code>font-family</code>, <code>line-height</code> or <code>color</code> while
constructing components, unless they are making exceptions. This is where the
cascade comes in.</p> <h3 id="exceptions-based-styling">Exceptions-Based
Styling <a href="#exceptions-based-styling" aria-label="Link to section
'Exceptions-Based Styling'" class="sr hsl">Link</a></h3> <p>I’ll probably want
my main heading to adopt the same <code>font-family</code>, <code>color</code>
and possibly <code>line-height</code>. That’s taken care of using inheritance.
But I’ll want its <code>font-size</code> to differ. Because the user agent
already provides an enlarged <code>font-size</code> for <code>h1</code>
elements (and it will be relative to the <code>125%</code> base font size I’ve
set), it’s possible I don’t need to do anything here.</p> <p>However, should I
want to tweak the font size of any element, I can. I take advantage of the
global scope and only tweak what I need to in the local scope.</p>







<pre class=" language-css"><code class=" language-css"><span class="token
selector">* </span><span class="token punctuation">{</span>


<span class="token property">font-family</span><span class="token
punctuation">:</span> inherit<span class="token punctuation">;</span> <span
class="token property">line-height</span><span class="token
punctuation">:</span> inherit<span class="token punctuation">;</span> <span
class="token property">color</span><span class="token punctuation">:</span>
inherit<span class="token punctuation">;</span> <span class="token
punctuation">}</span>

<span class="token selector">html </span><span class="token
punctuation">{</span> <span class="token property">font-size</span><span
class="token punctuation">:</span> <span class="token number">125%</span><span
class="token punctuation">;</span> <span class="token
property">font-family</span><span class="token punctuation">:</span>
sans-serif<span class="token punctuation">;</span> <span class="token
property">line-height</span><span class="token punctuation">:</span> <span
class="token number">1.5</span><span class="token punctuation">;</span> <span
class="token property">color</span><span class="token punctuation">:</span>
<span class="token hexcode">#222</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">h1 </span><span class="token punctuation">{</span>
<span class="token property">font-size</span><span class="token
punctuation">:</span> <span class="token number">3</span>rem<span class="token
punctuation">;</span> <span class="token punctuation">}</span> </code></pre>


<p>If the styles of CSS elements were encapsulated by default, this would not
be possible: I’d have to add <em>all</em> of the font styles to <code>h1</code>
explicitly. Alternatively, I could divide my styles up into separate classes
and apply each to the <code>h1</code> as a space-separated value:</p>




<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>h1</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Ff(sans) Fs(3)
Lh(1point5) C(darkGrey)<span class="token punctuation">"</span></span><span
class="token punctuation">&gt;</span></span>Hello World<span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;/</span>h1</span><span class="token
punctuation">&gt;</span></span>


</code></pre>


<p>Either way, it’s more work and a styled <code>h1</code> would be the only
outcome. Using the cascade, I’ve styled <em>most</em> elements the way I want
them, with <code>h1</code> just as a special case, just in one regard. The
cascade works as a filter, meaning styles are only ever stated where they add
something new.</p> <h3 id="element-styles">Element Styles <a
href="#element-styles" aria-label="Link to section 'Element Styles'" class="sr
hsl">Link</a></h3> <p>We’ve made a good start, but to really leverage the
cascade, we should be styling as many common elements as possible. Why? Because
our compound components will be made of individual HTML elements, and a
screen-reader-accessible interface makes the most of semantic markup.</p> <p>To
put it another way, the style of “atoms” that make up your interface
“molecules” (to use <a
href="http://bradfrost.com/blog/post/atomic-web-design/#molecules">atomic
design terminology</a><sup class="po" id="note-3"><a href="#3">3</a></sup>)
should be largely addressable using element selectors. Element selectors are
low in <a
href="https://developer.mozilla.org/en/docs/Web/CSS/Specificity">specificity</a><sup
class="po" id="note-4"><a href="#4">4</a></sup>, so they won’t override any
class-based styles you might incorporate later.</p> <p>The first thing you
should do is style all of the elements that you know you’re going to need:</p>




<pre class=" language-css"><code class=" language-css"><span class="token
selector">a </span><span class="token punctuation">{</span> … <span
class="token punctuation">}</span>




<span class="token selector">p </span><span class="token punctuation">{</span>
… <span class="token punctuation">}</span> <span class="token selector">h1, h2,
h3 </span><span class="token punctuation">{</span> … <span class="token
punctuation">}</span> <span class="token selector">input, textarea </span><span
class="token punctuation">{</span> … <span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">/* etc */</span> </code></pre>


<p>The next part is crucial if you want a consistent interface without
redundancy: Each time you come to creating a new component, <strong>if it
introduces new elements, style those new elements with element
selectors</strong>. Now is not the time to introduce restrictive,
high-specificity selectors. Nor is there any need to compose a class. Semantic
elements are what they are.</p> <p>For example, if I’ve yet to style
<code>button</code> elements (as in the previous example) and my new component
incorporates a button element, this is my opportunity to style button elements
<strong>for the entire interface</strong>.</p>




<pre class=" language-css"><code class=" language-css"><span class="token
selector">button </span><span class="token punctuation">{</span>


<span class="token property">padding</span><span class="token
punctuation">:</span> <span class="token number">0.75</span>em<span
class="token punctuation">;</span> <span class="token
property">background</span><span class="token punctuation">:</span> <span
class="token hexcode">#008</span><span class="token punctuation">;</span> <span
class="token property">color</span><span class="token punctuation">:</span>
<span class="token hexcode">#fff</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">button<span class="token
pseudo-class">:focus</span> </span><span class="token punctuation">{</span>
<span class="token property">outline</span><span class="token
punctuation">:</span> <span class="token number">0.25</span>em solid <span
class="token hexcode">#dd0</span><span class="token punctuation">;</span> <span
class="token punctuation">}</span> </code></pre>


<p>Now, when you come to write a new component that also happens to incorporate
buttons, that’s one less thing to worry about. You’re not
<strong>rewriting</strong> the same CSS under a different namespace, and
there’s no class name to remember or write either. CSS should always aim to be
this effortless and efficient — it’s designed for it.</p> <p>Using element
selectors has three main advantages:</p> <ul> <li>The resulting HTML is less
verbose (no redundant classes).</li> <li>The resulting style sheet is less
verbose (styles are shared between components, not rewritten per
component).</li> <li>The resulting styled interface is based on semantic
HTML.</li> </ul> <p>The use of classes to exclusively provide styles is often
defended as a “separation of concerns.” This is to misunderstand the W3C’s <a
href="https://www.w3.org/TR/html-design-principles/#separation-of-concerns">separation
of concerns</a><sup class="po" id="note-5"><a href="#5">5</a></sup> principle.
The objective is to describe structure with HTML and style with CSS. Because
classes are designated exclusively for styling purposes and they appear within
the markup, you are technically <strong>breaking with</strong> separation
wherever they’re used. You have to change the nature of the structure to elicit
the style.</p> <p>Wherever you don’t rely on presentational markup (classes,
inline styles), your CSS is compatible with generic structural and semantic
conventions. This makes it trivial to extend content and functionality without
it also becoming a styling task. It also makes your CSS more reusable across
different projects where conventional semantic structures are employed (but
where CSS ‘methodologies’ may differ).</p> <h4 id="special-cases">Special Cases
<a href="#special-cases" aria-label="Link to section 'Special Cases'" class="sr
hsl">Link</a></h4> <p>Before anyone accuses me of being simplistic, I’m aware
that not all buttons in your interface are going to do the same thing. I’m also
aware that buttons that do different things should probably look different in
some way.</p> <p>But that’s not to say we need to defer to classes, inheritance
<em>or</em> the cascade. To make buttons found in one interface look
fundamentally dissimilar is to confound your users. For the sake of
accessibility <em>and</em> consistency, most buttons only need to differ in
appearance by label.</p>




<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>button</span><span class="token
punctuation">&gt;</span></span>create<span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>button</span><span
class="token punctuation">&gt;</span></span>



<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;</span>button</span><span class="token
punctuation">&gt;</span></span>edit<span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>button</span><span
class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;</span>button</span><span class="token
punctuation">&gt;</span></span>delete<span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>button</span><span
class="token punctuation">&gt;</span></span> </code></pre>



<p>Remember that style is not the only visual differentiator. Content also
differentiates visually — and in a way that is much less ambiguous. You’re
literally spelling out what different things are for.</p> <p>There are fewer
instances than you might imagine where using style alone to differentiate
content is necessary or appropriate. Usually, style differences should be
supplemental, such as a red background or a pictographic icon accompanying a
textual label. The presence of textual labels are of particular utility to
those using voice-activation software: Saying “red button” or “button with
cross icon” is not likely to elicit recognition by the software.</p> <p>I’ll
cover the topic of adding nuances to otherwise similar looking elements in the
“Utility Classes” section to follow.</p> <h3 id="attributes">Attributes <a
href="#attributes" aria-label="Link to section 'Attributes'" class="sr
hsl">Link</a></h3> <p>Semantic HTML isn’t just about elements. Attributes
define types, properties and states. These too are important for accessibility,
so they need to be in the HTML where applicable. And because they’re in the
HTML, they provide additional opportunities for styling hooks.</p> <p>For
example, the <code>input</code> element takes a <code>type</code> attribute,
should you want to take advantage of it, and also <a
href="https://www.w3.org/TR/wai-aria/states_and_properties#aria-invalid">attributes
such as <code>aria-invalid</code></a><sup class="po" id="note-6"><a
href="#6">6</a></sup> to describe state.</p>




<pre class=" language-css"><code class=" language-css"><span class="token
selector">input, textarea </span><span class="token punctuation">{</span>


<span class="token property">border</span><span class="token
punctuation">:</span> <span class="token number">2</span>px solid<span
class="token punctuation">;</span> <span class="token
property">padding</span><span class="token punctuation">:</span> <span
class="token number">0.5</span>rem<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">[aria-invalid] </span><span class="token
punctuation">{</span> <span class="token property">border-color</span><span
class="token punctuation">:</span> <span class="token hexcode">#c00</span><span
class="token punctuation">;</span> <span class="token
property">padding-right</span><span class="token punctuation">:</span> <span
class="token number">1.5</span>rem<span class="token punctuation">;</span>
<span class="token property">background</span><span class="token
punctuation">:</span> <span class="token url">url(images/cross.svg)</span>
no-repeat center <span class="token number">0.5</span>em<span class="token
punctuation">;</span> <span class="token punctuation">}</span> </code></pre>

<p>A few things to note here:</p> <ul> <li>I don’t need to set
<code>color</code>, <code>font-family</code> or <code>line-height</code> here
because these are inherited from <code>html</code>, thanks to my use of the
<code>inherit</code> keyword. If I want to change the main
<code>font-family</code> used application-wide, I only need to edit the one
declaration in the  <code>html</code> block.</li> <li>The border color is
linked to <code>color</code>, so it too inherits the global color. All I need
to declare is the border’s width and style.</li> <li>The
<code>[aria-invalid]</code> attribute selector is unqualified. This means it
has better reach (it can be used with both my <code>input</code> and
<code>textarea</code> selectors) and it has minimal specificity. Simple
attribute selectors have the same specificity as classes. Using them
unqualified means that any classes written further down the cascade will
override them as intended.</li> </ul> <p>The BEM methodology would solve this
by applying a modifier class, such as <code>input--invalid</code>. But
considering that the invalid state should only apply where it is communicated
accessibly, <code>input--invalid</code> is necessarily redundant. In other
words, the <code>aria-invalid</code> attribute <em>has</em> to be there, so
what’s the point of the class?</p> <h4 id="just-write-html">Just Write HTML <a
href="#just-write-html" aria-label="Link to section 'Just Write HTML'"
class="sr hsl">Link</a></h4> <p>My absolute favorite thing about making the
most of element and attribute selectors high up in the cascade is this: The
composition of new components becomes <strong>less a matter of knowing the
company or organization’s naming conventions and more a matter of knowing
HTML</strong>. Any developer versed in writing decent HTML who is assigned to
the project will benefit from inheriting styling that’s already been put in
place. This dramatically reduces the need to refer to documentation or write
new CSS. For the most part, they can just write the (meta) language that they
should know by rote. Tim Baxter also makes a case for this in <a
href="http://alistapart.com/article/meaningful-css-style-like-you-mean-it">Meaningful
CSS: Style It Like You Mean It</a><sup class="po" id="note-7"><a
href="#7">7</a></sup>.</p> <h3 id="layout">Layout <a href="#layout"
aria-label="Link to section 'Layout'" class="sr hsl">Link</a></h3> <p>So far,
we’ve not written any component-specific CSS, but that’s not to say we haven’t
styled anything. All components are compositions of HTML elements. It’s largely
in the order and arrangement of these elements that more complex components
form their identity.</p> <p>Which brings us to layout.</p> <p>Principally, we
need to deal with flow layout — the spacing of successive block elements. You
may have noticed that I haven’t set any margins on any of my elements so far.
That’s because margin should not be considered a property of elements but a
property of the context of elements. That is, they should only come into play
where elements meet.</p> <p>Fortunately, the <a
href="https://developer.mozilla.org/en/docs/Web/CSS/Adjacent_sibling_selectors">adjacent
sibling combinator</a><sup class="po" id="note-8"><a href="#8">8</a></sup> can
describe exactly this relationship. Harnessing the cascade, we can instate a
uniform default across <em>all</em> block-level elements that appear in
succession, with just a few exceptions.</p>




<pre class=" language-css"><code class=" language-css"><span class="token
selector">* </span><span class="token punctuation">{</span>


<span class="token property">margin</span><span class="token
punctuation">:</span> <span class="token number">0</span><span class="token
punctuation">;</span> <span class="token punctuation">}</span>

<span class="token selector">* + * </span><span class="token
punctuation">{</span> <span class="token property">margin-top</span><span
class="token punctuation">:</span> <span class="token number">1.5</span>em<span
class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token selector">body, br, li, dt, dd, th, td, option </span><span
class="token punctuation">{</span> <span class="token
property">margin-top</span><span class="token punctuation">:</span> <span
class="token number">0</span><span class="token punctuation">;</span> <span
class="token punctuation">}</span> </code></pre>


<p>The use of the extremely low-specificity <a
href="http://alistapart.com/article/axiomatic-css-and-lobotomized-owls">lobotomized
owl selector</a><sup class="po" id="note-9"><a href="#9">9</a></sup> ensures
that <em>any</em> elements (except the common exceptions) are spaced by one
line. This means that there is default white space in all cases, and developers
writing component flow content will have a reasonable starting point. </p>
<p>In most cases, margins now take care of themselves. But because of the low
specificity, it’s easy to override this basic one-line spacing where needed.
For example, I might want to close the gap between labels and their respective
fields, to show they are paired. In the following example, any element that
follows a label (<code>input</code>, <code>textarea</code>,
<code>select</code>, etc.) closes the gap.</p>




<pre class=" language-css"><code class=" language-css"><span class="token
selector">label </span><span class="token punctuation">{</span> 


<span class="token property">display</span><span class="token
punctuation">:</span> block <span class="token punctuation">}</span>

<span class="token selector">label + * </span><span class="token
punctuation">{</span> <span class="token property">margin-top</span><span
class="token punctuation">:</span> <span class="token
number">0.5</span>rem<span class="token punctuation">;</span> <span
class="token punctuation">}</span> </code></pre>


<p>Once again, using the cascade means only having to write specific styles
where necessary. Everything else conforms to a sensible baseline.</p> <p>Note
that, because margins only appear between elements, they don’t double up with
any padding that may have been included for the container. That’s one more
thing not to have to worry about or code defensively against.</p> <p>Also, note
that you get the same spacing whether or not you decide to include wrapper
elements. That is, you can do the following and achieve the same layout — it’s
just that the margins emerge between the <code>div</code>s rather than between
labels following inputs.</p>




<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>form</span><span class="token
punctuation">&gt;</span></span>


<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;</span>div</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>label</span> <span class="token
attr-name">for</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>one<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>Label one<span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;/</span>label</span><span
class="token punctuation">&gt;</span></span> <span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;</span>input</span> <span
class="token attr-name">id</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>one<span class="token punctuation">"</span></span> <span
class="token attr-name">name</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>one<span class="token punctuation">"</span></span> <span
class="token attr-name">type</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>text<span class="token punctuation">"</span></span><span
class="token punctuation">&gt;</span></span> <span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;/</span>div</span><span
class="token punctuation">&gt;</span></span> <span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;</span>div</span><span
class="token punctuation">&gt;</span></span> <span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;</span>label</span> <span
class="token attr-name">for</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>two<span class="token punctuation">"</span></span><span
class="token punctuation">&gt;</span></span>Label two<span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;/</span>label</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>input</span> <span class="token
attr-name">id</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>two<span
class="token punctuation">"</span></span> <span class="token
attr-name">name</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>two<span
class="token punctuation">"</span></span> <span class="token
attr-name">type</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>text<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>div</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>button</span> <span
class="token attr-name">type</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>submit<span class="token punctuation">"</span></span><span
class="token punctuation">&gt;</span></span>Submit<span class="token tag"><span
class="token tag"><span class="token
punctuation">&lt;/</span>button</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>form</span><span class="token
punctuation">&gt;</span></span> </code></pre>


<p>Achieving the same result with a methodology such as <a
href="http://acss.io/">atomic CSS</a><sup class="po" id="note-10"><a
href="#10">10</a></sup> would mean composing specific margin-related classes
and applying them manually in each case, including for <code>first-child</code>
exceptions handled implicitly by <code>* + *</code>:</p>




<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>form</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(1point5)<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>


<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;</span>div</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(0)<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>label</span> <span class="token
attr-name">for</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>one<span
class="token punctuation">"</span></span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(0)<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>Label one<span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;/</span>label</span><span
class="token punctuation">&gt;</span></span> <span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;</span>input</span> <span
class="token attr-name">id</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>one<span class="token punctuation">"</span></span> <span
class="token attr-name">name</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>one<span class="token punctuation">"</span></span> <span
class="token attr-name">type</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>text<span class="token punctuation">"</span></span> <span
class="token attr-name">class</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>Mtop(0point75)<span class="token
punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;/</span>div</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>div</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(1point5)<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>label</span> <span class="token
attr-name">for</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>two<span
class="token punctuation">"</span></span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(0)<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>Label two<span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;/</span>label</span><span
class="token punctuation">&gt;</span></span> <span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;</span>input</span> <span
class="token attr-name">id</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>two<span class="token punctuation">"</span></span> <span
class="token attr-name">name</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>two<span class="token punctuation">"</span></span> <span
class="token attr-name">type</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>text<span class="token punctuation">"</span></span> <span
class="token attr-name">class</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>Mtop(0point75)<span class="token
punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;/</span>div</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>button</span> <span
class="token attr-name">type</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>submit<span class="token punctuation">"</span></span>
<span class="token attr-name">class</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>Mtop(1point5)<span class="token
punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>Submit<span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>button</span><span
class="token punctuation">&gt;</span></span> <span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;/</span>form</span><span
class="token punctuation">&gt;</span></span> </code></pre>


<p>Bear in mind that this would only cover top margins if one is adhering to
atomic CSS. You’d have to prescribe individual classes for <code>color</code>,
<code>background-color</code> and a host of other properties, because atomic
CSS does not leverage inheritance or element selectors.</p>




<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>form</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(1point5)
Bdc(#ccc) P(1point5)<span class="token punctuation">"</span></span><span
class="token punctuation">&gt;</span></span>


<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;</span>div</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(0)<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>label</span> <span class="token
attr-name">for</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>one<span
class="token punctuation">"</span></span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(0)
C(brandColor) Fs(bold)<span class="token punctuation">"</span></span><span
class="token punctuation">&gt;</span></span>Label one<span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;/</span>label</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>input</span> <span class="token
attr-name">id</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>one<span
class="token punctuation">"</span></span> <span class="token
attr-name">name</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>one<span
class="token punctuation">"</span></span> <span class="token
attr-name">type</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>text<span
class="token punctuation">"</span></span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(0point75)
C(brandColor) Bdc(#fff) B(2) P(1)<span class="token
punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;/</span>div</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>div</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(1point5)<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>label</span> <span class="token
attr-name">for</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>two<span
class="token punctuation">"</span></span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(0)
C(brandColor) Fs(bold)<span class="token punctuation">"</span></span><span
class="token punctuation">&gt;</span></span>Label two<span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;/</span>label</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>input</span> <span class="token
attr-name">id</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>two<span
class="token punctuation">"</span></span> <span class="token
attr-name">name</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>two<span
class="token punctuation">"</span></span> <span class="token
attr-name">type</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>text<span
class="token punctuation">"</span></span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>Mtop(0point75)
C(brandColor) Bdc(#fff) B(2) P(1)<span class="token
punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;/</span>div</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>button</span> <span
class="token attr-name">type</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>submit<span class="token punctuation">"</span></span>
<span class="token attr-name">class</span><span class="token attr-value"><span
class="token punctuation">=</span><span class="token
punctuation">"</span>Mtop(1point5) C(#fff) Bdc(blue) P(1)<span class="token
punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>Submit<span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>button</span><span
class="token punctuation">&gt;</span></span> <span class="token tag"><span
class="token tag"><span class="token punctuation">&lt;/</span>form</span><span
class="token punctuation">&gt;</span></span> </code></pre>


<p>Atomic CSS gives developers direct control over style without deferring
completely to inline styles, which are not reusable like classes. By providing
classes for individual properties, it reduces the duplication of declarations
in the stylesheet.</p> <p>However, it necessitates direct intervention in the
markup to achieve these ends. This requires learning and being commiting to its
verbose API, as well as having to write a lot of additional HTML code.</p>
<p>Instead, by styling arbitrary HTML elements and their spacial relationships,
CSS ‘methodology’ becomes largely obsolete. You have the advantage of working
with a unified design system, rather than an HTML system with a superimposed
styling system to consider and maintain separately.</p> <p>Anyway, here’s how
the structure of our CSS should look with our flow content solution in
place:</p> <ol> <li>global (<code>html</code>) styles and enforced
inheritance,</li> <li>flow algorithm and exceptions (using the lobotomized owl
selector),</li> <li>element and attribute styles.</li> </ol> <p>We’ve yet to
write a specific component or conceive a CSS class, but a large proportion of
our styling is done — that is, if we write our classes in a sensible, reusable
fashion.</p> <h3 id="utility-classes">Utility Classes <a
href="#utility-classes" aria-label="Link to section 'Utility Classes'"
class="sr hsl">Link</a></h3> <p>The thing about classes is that they have a
global scope: Anywhere they are applied in the HTML, they are affected by the
associated CSS. For many, this is seen as a drawback, because two developers
working independently could write a class with the same name and negatively
affect each other’s work.</p> <p><a
href="https://css-tricks.com/css-modules-part-1-need/">CSS modules</a><sup
class="po" id="note-11"><a href="#11">11</a></sup> were recently conceived to
remedy this scenario by programmatically generating unique class names tied to
their local or component scope.</p>




<pre class=" language-html"><code class=" language-html"><span class="token
comment" spellcheck="true">&lt;!-- my module's button --&gt;</span>


<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;</span>button</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token
punctuation">"</span>button_dysuhe027653<span class="token
punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>Press me<span class="token tag"><span
class="token tag"><span class="token
punctuation">&lt;/</span>button</span><span class="token
punctuation">&gt;</span></span>

<span class="token comment" spellcheck="true">&lt;!-- their module's button
--&gt;</span> <span class="token tag"><span class="token tag"><span
class="token punctuation">&lt;</span>button</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token
punctuation">"</span>button_hydsth971283<span class="token
punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>Hit me<span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>button</span><span
class="token punctuation">&gt;</span></span> </code></pre> <p>Ignoring the
superficial ugliness of the generated code, you should be able to see where
disparity between independently authored components can easily creep in: Unique
identifiers are used to style similar things. The resulting interface will
either be inconsistent or be consistent with much greater effort and
redundancy. </p> <p>There’s no reason to treat common elements as unique. You
should be styling the type of element, not the instance of the element. Always
remember that the term “class” means “type of thing, of which there may be
many.” In other words, all classes should be utility classes: reusable
globally. </p> <p>Of course, in this example, a <code>.button</code> class is
redundant anyway: we have the <code>button</code> element selector to use
instead. But what if it was a special type of button? For instance, we might
write a <code>.danger</code> class to indicate that buttons do destructive
actions, like deleting data:</p>


<pre class=" language-css"><code class=" language-css"><span class="token
selector"><span class="token class">.danger</span> </span><span class="token
punctuation">{</span>




<span class="token property">background</span><span class="token
punctuation">:</span> <span class="token hexcode">#c00</span><span class="token
punctuation">;</span> <span class="token property">color</span><span
class="token punctuation">:</span> <span class="token hexcode">#fff</span><span
class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre> <p>Because class selectors are higher in specificity than element
selectors and of the same specificity as attribute selectors, any rules applied
in this way will override the element and attribute rules further up in the
style sheet. So, my danger button will appear red with white text, but its
other properties — like padding, the focus outline, and the margin applied via
the flow algorithm — will remain intact.</p>


<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>button</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>danger<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span>delete<span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>button</span><span
class="token punctuation">&gt;</span></span>




</code></pre> <p>Name clashes may happen, occasionally, if several people are
working on the same code base for a long time. But there are ways of avoiding
this, like, oh, I don’t know, first doing a text search to check for the
existence of the name you are about to take. You never know, someone may have
solved the problem you’re addressing already.</p> <h4
id="local-scope-utilities">Local Scope Utilities <a
href="#local-scope-utilities" aria-label="Link to section 'Local Scope
Utilities'" class="sr hsl">Link</a></h4> <p>My favorite thing to do with
utility classes is to set them on containers, then use this hook to affect the
layout of child elements within. For example, I can quickly code up an evenly
spaced, responsive, center-aligned layout for any elements:</p>




<pre class=" language-css"><code class=" language-css"><span class="token
selector"><span class="token class">.centered</span> </span><span class="token
punctuation">{</span>


<span class="token property">text-align</span><span class="token
punctuation">:</span> center<span class="token punctuation">;</span> <span
class="token property">margin-bottom</span><span class="token
punctuation">:</span> -<span class="token number">1</span>rem<span class="token
punctuation">;</span> <span class="token comment" spellcheck="true">/* adjusts
for leftover bottom margin of children */</span> <span class="token
punctuation">}</span>

<span class="token selector"><span class="token class">.centered</span> &gt; *
</span><span class="token punctuation">{</span> <span class="token
property">display</span><span class="token punctuation">:</span>
inline-block<span class="token punctuation">;</span> <span class="token
property">margin</span><span class="token punctuation">:</span> <span
class="token number">0</span> <span class="token number">0.5</span>rem <span
class="token number">1</span>rem<span class="token punctuation">;</span> <span
class="token punctuation">}</span> </code></pre> <p>With this, I can center
group list items, buttons, a combination of buttons and links, whatever. That’s
thanks to the use of the <code>&gt; *</code> part, which means that any
immediate children of <code>.centered</code> will adopt these styles, in this
scope, but inherit global and element styles, too.</p> <p>And I’ve adjusted the
margins so that the elements can wrap freely without breaking the vertical
rhythm set using the <code>* + *</code> selector above it. It’s a small amount
of code that provides a generic, responsive layout solution by setting a local
scope for arbitrary elements.</p> <p>My tiny (93B minified) <a
href="https://github.com/Heydon/fukol-grids">flexbox-based grid system</a><sup
class="po" id="note-12"><a href="#12">12</a></sup> is essentially just a
utility class like this one. It’s highly reusable, and because it employs
<code>flex-basis</code>, no breakpoint intervention is needed. I just defer to
flexbox’s wrapping algorithm.</p>


<pre class=" language-css"><code class=" language-css"><span class="token
selector"><span class="token class">.fukol-grid</span> </span><span
class="token punctuation">{</span>


<span class="token property">display</span><span class="token
punctuation">:</span> flex<span class="token punctuation">;</span> <span
class="token property">flex-wrap</span><span class="token punctuation">:</span>
wrap<span class="token punctuation">;</span> <span class="token
property">margin</span><span class="token punctuation">:</span> -<span
class="token number">0.5</span>em<span class="token punctuation">;</span> <span
class="token comment" spellcheck="true">/* adjusting for gutters */</span>
<span class="token punctuation">}</span>

<span class="token selector"><span class="token class">.fukol-grid</span> &gt;
* </span><span class="token punctuation">{</span> <span class="token
property">flex</span><span class="token punctuation">:</span> <span
class="token number">1</span> <span class="token number">0</span> <span
class="token number">5</span>em<span class="token punctuation">;</span> <span
class="token comment" spellcheck="true">/* The 5em part is the basis (ideal
width) */</span> <span class="token property">margin</span><span class="token
punctuation">:</span> <span class="token number">0.5</span>em<span class="token
punctuation">;</span> <span class="token comment" spellcheck="true">/* Half the
gutter value */</span> <span class="token punctuation">}</span> </code></pre>
<figure role="group"> <img
src="https://www.smashingmagazine.com/wp-content/uploads/2016/11/logo-fukol.png"
alt="logo with sea anemone (penis) motif" width="299" height="152"
class="alignnone size-full wp-image-275111"
srcset="https://www.smashingmagazine.com/wp-content/uploads/2016/11/logo-fukol.png
299w,
https://www.smashingmagazine.com/wp-content/uploads/2016/11/logo-fukol-78x40.png
78w" sizes="(max-width: 299px) 100vw, 299px"><p></p> <figcaption>Fukol’s
distinctive logotype</figcaption> </figure> <p>Using BEM, you’d be encouraged
to place an explicit “element” class on each grid item:</p>


<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>div</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>fukol<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span> <span class="token comment"
spellcheck="true">&lt;!-- the outer container, needed for vertical rhythm
--&gt;</span>




<span class="token tag"><span class="token tag"><span class="token
punctuation">&lt;</span>ul</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>fukol-grid<span
class="token punctuation">"</span></span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>li</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token
punctuation">"</span>fukol-grid__item<span class="token
punctuation">"</span></span><span class="token
punctuation">&gt;</span></span><span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>li</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>li</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token
punctuation">"</span>fukol-grid__item<span class="token
punctuation">"</span></span><span class="token
punctuation">&gt;</span></span><span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>li</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>li</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token
punctuation">"</span>fukol-grid__item<span class="token
punctuation">"</span></span><span class="token
punctuation">&gt;</span></span><span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>li</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;</span>li</span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token
punctuation">"</span>fukol-grid__item<span class="token
punctuation">"</span></span><span class="token
punctuation">&gt;</span></span><span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>li</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token
punctuation">&gt;</span></span> <span class="token tag"><span class="token
tag"><span class="token punctuation">&lt;/</span>div</span><span class="token
punctuation">&gt;</span></span> </code></pre> <p>But there’s no need. Only one
identifier is required to instantiate the local scope. The items here are no
more protected from outside influence than the ones in my version, targeted
with <code>&gt; *</code> — <strong>nor should they be</strong>. The only
difference is the inflated markup.</p> <p>So, now we’ve started incorporating
classes, but only generically, as they were intended. We’re still not styling
complex components independently. Instead, we’re solving system-wide problems
in a reusable fashion. Naturally, you will need to document how these classes
are used in your comments.</p> <p>Utility classes like these take advantage of
CSS’ global scope, the local scope, inheritance and the cascade simultaneously.
The classes can be applied universally; they instantiate the local scope to
affect just their child elements; they inherit styles <em>not</em> set here
from the parent or global scope; <em>and</em> we’ve not overqualified using
element or class selectors.</p> <p>Here’s how our cascade looks now:</p> <ol>
<li>global (<code>html</code>) styles and enforced inheritance,</li> <li>flow
algorithm and exceptions (using the lobotomized owl selector),</li> <li>element
and attribute styles,</li> <li>generic utility classes.</li> </ol> <p>Of
course, there may never be the need to write either of these example utilities.
The point is that, if the need does emerge while working on one component, the
solution should be made available to all components. Always be thinking in
terms of the system.</p> <h4 id="component-specific-styles">Component-Specific
Styles <a href="#component-specific-styles" aria-label="Link to section
'Component-Specific Styles'" class="sr hsl">Link</a></h4> <p>We’ve been styling
components, and ways to combine components, from the beginning, so it’s
tempting to leave this section blank. But it’s worth stating that any
components not created from other components (right down to individual HTML
elements) are necessarily over-prescribed. They are to components what IDs are
to selectors and risk becoming anachronistic to the system.</p> <p>In fact, a
good exercise is to identify complex components (“molecules,” “organisms”) by
ID only and try not to use those IDs in your CSS. For example, you could place
<code>#login</code> on your log-in form component. You shouldn’t have to use
<code>#login</code> in your CSS with the element, attribute and flow algorithm
styles in place, although you might find yourself making one or two generic
utility classes that can be used in other form components.</p> <p>If you
<em>do</em> use <code>#login</code>, it can only affect that component. It’s a
reminder that you’ve moved away from developing a design system and towards the
interminable occupation of merely pushing pixels.</p> <h3
id="conclusion">Conclusion <a href="#conclusion" aria-label="Link to section
'Conclusion'" class="sr hsl">Link</a></h3> <p>When I tell folks that I don’t
use methodologies such as BEM or tools such as CSS modules, many assume I’m
writing CSS like this:</p>




<pre class=" language-css"><code class=" language-css"><span class="token
selector">header nav ul li </span><span class="token punctuation">{</span>


<span class="token property">display</span><span class="token
punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">header nav ul li a </span><span class="token
punctuation">{</span> <span class="token property">background</span><span
class="token punctuation">:</span> <span class="token hexcode">#008</span><span
class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre> <p>I don’t. A clear over-specification is present here, and one
we should all be careful to avoid. It’s just that BEM (plus OOCSS, SMACSS,
atomic CSS, etc.) are not the only ways to avoid convoluted, unmanageable
CSS.</p> <p>In an effort to defeat specificity woes, many methodologies defer
almost exclusively to the class selector. The trouble is that this leads to a
proliferation of classes: cryptic ciphers that bloat the markup and that —
without careful attention to documentation — can confound developers new to the
in-house naming system they constitute.</p> <p>By using classes prolifically,
you also maintain a styling system that is largely separate from your HTML
system. This misappropriation of ‘separate concerns’ can lead to redundancy or,
worse, can encourage inaccessibility: it’s possible to affect a visual style
without affecting the accessible state along with it:</p>


<pre class=" language-html"><code class=" language-html"><span class="token
tag"><span class="token tag"><span class="token
punctuation">&lt;</span>input</span> <span class="token
attr-name">id</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>my-text<span
class="token punctuation">"</span></span> <span class="token
attr-name">aria-invalid</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token punctuation">"</span>false<span
class="token punctuation">"</span></span> <span class="token
attr-name">class</span><span class="token attr-value"><span class="token
punctuation">=</span><span class="token
punctuation">"</span>text-input--invalid<span class="token
punctuation">"</span></span> <span class="token
punctuation">/&gt;</span></span>


</code></pre> <p>In place of the extensive writing and prescription of classes,
I looked at some other methods:</p> <ul> <li>leveraging inheritance to set a
precedent for consistency;</li> <li>making the most of element and attribute
selectors to support transparent, standards-based composition;</li>
<li>applying a code- and labor-saving flow layout system;</li>
<li>incorporating a modest set of highly generic utility classes to solve
common layout problems affecting multiple elements.</li> </ul> <p>All of these
were put in service of creating a design <strong>system</strong> that should
make writing new interface components easier and less reliant on adding new CSS
code as a project matures. And this is possible not thanks to strict naming and
encapsulation, but thanks to a distinct lack of it.</p> <p>Even if you’re not
comfortable using the specific techniques I’ve recommended here, I hope this
article has at least gotten you to rethink what components are. They’re not
things you create in isolation. Sometimes, in the case of standard HTML
elements, they’re not things you create at all. The more you compose components
<em>from</em> components, the more accessible and visually consistent your
interface will be, and with less CSS to achieve that end. </p> <p>There’s not
much wrong with CSS. In fact, it’s remarkably good at letting you do a lot with
a little. We’re just not taking advantage of that.</p> <p><em
property="editor">(vf, al, il)</em></p> <h4 class="po" id="footnotes">Footnotes
<a href="#footnotes" aria-label="Link to section 'Footnotes'" class="sr
hsl">Link</a></h4><ol class="po"><li id="#1"><a href="#note-1">1
https://www.smashingmagazine.com/2016/06/designing-modular-ui-systems-via-style-guide-driven-development/</a></li><li
id="#2"><a href="#note-2">2
https://en.wikipedia.org/wiki/Don't_repeat_yourself</a></li><li id="#3"><a
href="#note-3">3
http://bradfrost.com/blog/post/atomic-web-design/#molecules</a></li><li
id="#4"><a href="#note-4">4
https://developer.mozilla.org/en/docs/Web/CSS/Specificity</a></li><li
id="#5"><a href="#note-5">5
https://www.w3.org/TR/html-design-principles/#separation-of-concerns</a></li><li
id="#6"><a href="#note-6">6
https://www.w3.org/TR/wai-aria/states_and_properties#aria-invalid</a></li><li
id="#7"><a href="#note-7">7
http://alistapart.com/article/meaningful-css-style-like-you-mean-it</a></li><li
id="#8"><a href="#note-8">8
https://developer.mozilla.org/en/docs/Web/CSS/Adjacent_sibling_selectors</a></li><li
id="#9"><a href="#note-9">9
http://alistapart.com/article/axiomatic-css-and-lobotomized-owls</a></li><li
id="#10"><a href="#note-10">10 http://acss.io/</a></li><li id="#11"><a
href="#note-11">11 https://css-tricks.com/css-modules-part-1-need/</a></li><li
id="#12"><a href="#note-12">12
https://github.com/Heydon/fukol-grids</a></li></ol>

