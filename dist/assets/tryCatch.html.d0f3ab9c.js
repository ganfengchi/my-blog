import{_ as n,o as s,c as a,b as t}from"./app.6d18e44f.js";const p={},e=t(`<h3 id="try-catch-es5-\u6807\u51C6\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#try-catch-es5-\u6807\u51C6\u6A21\u5F0F" aria-hidden="true">#</a> try..catch/es5 \u6807\u51C6\u6A21\u5F0F</h3><blockquote><p>\u5728 try \u91CC\u9762\u53D1\u751F\u9519\u8BEF\uFF0C\u4E0D\u4F1A\u6267\u884C\u9519\u8BEF\u540E\u7684 try \u91CC\u9762\u7684\u4EE3\u7801,\u4F46\u4F9D\u7136\u4F1A\u6267\u884C\u5916\u9762\u7684\u4EE3\u7801</p></blockquote><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u4F8B1</span>

<span class="token keyword">try</span><span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u540E\u9762\u7684\u7EC8\u6B62\u6267\u884C</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u6253\u5370a,d</span>

<span class="token comment">// \u4F8B2</span>
<span class="token keyword">try</span><span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//\u6355\u6349\u9519\u8BEF,try\u91CC\u9762\u6CA1\u6709\u9519\u8BEF\u5C31\u4E0D\u4F1A\u6355\u6349catch--&gt;//error error.message error.name----&gt;error</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name<span class="token operator">+</span><span class="token string">&quot;:&quot;</span><span class="token operator">+</span>e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//  a</span>
<span class="token comment">// ReferenceError:b is not defined\u3001</span>
<span class="token comment">// d</span>


<span class="token comment">// \u4F8B3 \u8BED\u6CD5\u89E3\u6790\u9519\u8BEFsyntaxError</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token operator">:</span> <span class="token comment">//---syntaxerror</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u4F8B4 ReferenceError\u975E\u6CD5\u6216\u4E0D\u80FD\u8BC6\u522B\u7684\u5F15\u7528\u6570\u503C</span>
<span class="token keyword">var</span> str <span class="token operator">=</span>abcd<span class="token punctuation">;</span><span class="token comment">//abcd is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u542F\u7528 es5 \u4E25\u683C\u6A21\u5F0F----\u90A3\u4E48 es3.0 \u548C es5.0 \u4EA7\u751F\u51B2\u7A81\u7684\u90E8\u5206\u5C31\u662F\u7528 es5.0\uFF0C\u5426\u5219\u7528 es3.0 1----&quot;use strict&quot;//\u9075\u5FAA es5.0,\u4E0D\u518D\u517C\u5BB9 es3 \u7684\u4E00\u4E9B\u4E0D\u89C4\u5219\u8BED\u6CD5\uFF0C\u4F7F\u7528 es5 \u65B0\u89C4\u8303<br> 2----\u4E24\u79CD\u7528\u6CD5<br> 1\uFF09\u5168\u5C40\u4E25\u683C\u6A21\u5F0F<br> 2\uFF09\u5C40\u90E8\u51FD\u6570\u5185\u4E25\u683C\u6A21\u5F0F\uFF08\u63A8\u8350\uFF09<br></p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>\u4F8B<span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">.</span>callee<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//----es3.0</span>

<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token string">&quot;use strict&quot;</span><span class="token punctuation">;</span> <span class="token comment">//----es5.0</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">.</span>callee<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&quot;use strict&quot;\u5B57\u7B26\u4E32\u5F62\u5F0F\u662F\u4E3A\u4E86--\u6D4F\u89C8\u5668\u5185\u6838\u5347\u7EA7\u4E86\u624D\u597D\u7528\uFF0C\u4E0D\u4F1A\u5BF9\u4E0D\u517C\u5BB9\u4E25\u683C\u6A21\u5F0F\u7684\u6D4F\u89C8\u5668\u4EA7\u751F\u5F71\u54CD<br> \u4E0D\u652F\u6301 with/arguments.callee/func.caller,\u53D8\u91CF\u8D4B\u503C\u524D\u5FC5\u987B\u58F0\u660E\uFF0C\u5C40\u90E8 this \u5FC5\u987B\u88AB\u8D4B\u503C(Person.call(null/undefined)\u8D4B\u503C\u4EC0\u4E48\u5C31\u662F\u4EC0\u4E48)\uFF0C\u62D2\u7EDD\u91CD\u590D\u5C5E\u6027\u548C\u53C2\u6570<br> with \u53EF\u4EE5\u6539\u53D8\u4F5C\u7528\u57DF\u94FE\uFF0Cwith \u91CC\u9762\u6DFB\u5BF9\u8C61\u7684\u8BDD\uFF0C\u628A\u5BF9\u8C61\u5F53\u4F5C with \u8981\u6267\u884C\u7684\u4EE3\u7801\u4F53\u4F5C\u7528\u57DF\u94FE\u7684\u6700\u9876\u7AEF<br> es5 \u4E25\u683C\u6A21\u5F0F\u4E0D\u5141\u8BB8\u7528 with,\u9632\u6B62\u5B83\u66F4\u6539\u4F5C\u7528\u57DF\u94FE\uFF0C\u63D0\u9AD8\u7A0B\u5E8F\u8FD0\u884C\u6548\u7387<br></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u4F8B6</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;obj&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">234</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&quot;window&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span> <span class="token comment">//obj\u91CC\u9762\u6CA1\u6709age\u7684\u65F6\u5019\u4F1A\u6267\u884C</span>
  <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">&quot;scope&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">with</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//obj</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//234</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//obj</span>

<span class="token comment">// \u4F8B7\u547D\u540D\u7A7A\u95F4\u7684\u7528\u6CD5</span>
<span class="token keyword">var</span> org <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">dp1</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">jc</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">deng</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;xiaodeng&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">234</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">dp2</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">with</span> <span class="token punctuation">(</span>org<span class="token punctuation">.</span>dp1<span class="token punctuation">.</span>jc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//abc</span>
<span class="token punctuation">}</span>
<span class="token keyword">with</span> <span class="token punctuation">(</span>org<span class="token punctuation">.</span>dp1<span class="token punctuation">.</span>deng<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//xiaodeng</span>
<span class="token punctuation">}</span>

<span class="token comment">// document\u5BF9\u8C61\u4E0A\u6709\u5F88\u591A\u5BF9\u8C61\u548C\u65B9\u6CD5</span>
<span class="token comment">// \u4F8B8</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">with</span> <span class="token punctuation">(</span>document<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//\u8FD9\u6837\u5C31\u4E0D\u7528\u5199document.write(&quot;a&quot;) \u4E86\uFF0C\u76F4\u63A5\u627E</span>
<span class="token punctuation">}</span>

<span class="token comment">// es5\u4E25\u683C\u6A21\u5F0F\u4E0D\u5141\u8BB8\u7528with,\u9632\u6B62\u5B83\u66F4\u6539\u4F5C\u7528\u57DF\u94FE\uFF0C\u63D0\u9AD8\u7A0B\u5E8F\u8FD0\u884C\u6548\u7387</span>
<span class="token comment">// \u4F8B9</span>
<span class="token punctuation">(</span><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">with</span> <span class="token punctuation">(</span>document<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token comment">//Uncaught SyntaxError: Strict mode code may not include a with statement</span>

<span class="token comment">// \u4F8B10</span>
<span class="token punctuation">(</span><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// console.log(arguments.callee);--1</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>caller<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//--2</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//---2</span>
  <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//---2</span>
<span class="token punctuation">}</span> <span class="token comment">//---2</span>
<span class="token comment">// test();--1</span>
<span class="token function">demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//--2</span>

<span class="token comment">// \u4E25\u683C\u6A21\u5F0F\u91CC\u9762this\u5FC5\u987B\u88AB\u8D4B\u503C,\u8981\u4E48new</span>
<span class="token comment">// \u4F8B11</span>
<span class="token punctuation">(</span><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//undefined</span>
<span class="token keyword">new</span> <span class="token class-name">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//test{}</span>
<span class="token function">test</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{}\u7A7A\u5BF9\u8C61</span>
<span class="token function">test</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//123</span>

\u5C0F\u4F8B\u5B50<span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//\u5168\u5C40</span>

<span class="token comment">// \u62D2\u7EDD\u91CD\u590D\u5C5E\u6027\u548C\u53C2\u6570</span>
<span class="token comment">// \u4F8B12</span>
<span class="token comment">// es3\u91CC\u9762\u91CD\u590D\u7684\u53C2\u6570\u4E0D\u62A5\u9519\uFF0Ces5\u62A5\u9519</span>
<span class="token comment">// \u5C0F\u4F8B\u5B50</span>
<span class="token punctuation">(</span><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//\u62A5\u9519</span>
<span class="token comment">// \u5C0F\u4F8B\u5B50</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;123&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;234&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//\u91CD\u590D\u5C5E\u6027\u4E0D\u62A5\u9519w223654423ewdfry3wsa12</span>

\u4F8B<span class="token number">13</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
<span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">&quot;console.log (a) &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//\u6253\u5370123</span>
<span class="token comment">// eval\u628A\u5B57\u7B26\u4E32\u5F53\u4EE3\u7801\u6267\u884C\uFF0C\u4F46es3\u91CC\u9762\u4E0D\u80FD\u7528eval</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[e];function c(l,i){return s(),a("div",null,o)}var k=n(p,[["render",c],["__file","tryCatch.html.vue"]]);export{k as default};
