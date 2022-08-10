import{_ as n,o as s,c as a,b as t}from"./app.6d18e44f.js";const e={},p=t(`<h3 id="\u5BF9\u8C61\u6620\u5C04" tabindex="-1"><a class="header-anchor" href="#\u5BF9\u8C61\u6620\u5C04" aria-hidden="true">#</a> \u5BF9\u8C61\u6620\u5C04</h3><div class="custom-container tip"><p class="custom-container-title">\u8BF4\u660E</p><p>\u6709\u65F6\u5019\u9047\u5230\u8FD9\u4E48\u4E00\u79CD\u60C5\u51B5,\u7AEF\u8FD4\u56DE\u7801\u503C\uFF0C\u524D\u7AEF\u9700\u8981\u53CD\u663E\u6587\u672C,\u8FD9\u65F6\u5019\u5C31\u8981\u7528\u5230\u6620\u5C04\u4E86</p></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  \u5C0F\u660E<span class="token number">1</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">2</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">3</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">4</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">5</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">6</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">7</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">8</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">9</span><span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">,</span>
  \u5C0F\u660E<span class="token number">10</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">codeToText</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    map<span class="token punctuation">[</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> key<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> map<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">codeToText</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 1: &quot;\u5C0F\u660E1&quot;</span>
<span class="token comment">// 2: &quot;\u5C0F\u660E2&quot;</span>
<span class="token comment">// 3: &quot;\u5C0F\u660E3&quot;</span>
<span class="token comment">// 4: &quot;\u5C0F\u660E4&quot;</span>
<span class="token comment">// 5: &quot;\u5C0F\u660E5&quot;</span>
<span class="token comment">// 6: &quot;\u5C0F\u660E6&quot;</span>
<span class="token comment">// 7: &quot;\u5C0F\u660E7&quot;</span>
<span class="token comment">// 8: &quot;\u5C0F\u660E8&quot;</span>
<span class="token comment">// 9: &quot;\u5C0F\u660E9&quot;</span>
<span class="token comment">// 10: &quot;\u5C0F\u660E10&quot;</span>
<span class="token keyword">let</span> codelist <span class="token operator">=</span> <span class="token function">codeToText</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">textTocode</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    map<span class="token punctuation">[</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> key<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> map<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">textTocode</span><span class="token punctuation">(</span>codelist<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//  \u5C0F\u660E1: &quot;1&quot;</span>
<span class="token comment">// \u5C0F\u660E2: &quot;2&quot;</span>
<span class="token comment">// \u5C0F\u660E3: &quot;3&quot;</span>
<span class="token comment">// \u5C0F\u660E4: &quot;4&quot;</span>
<span class="token comment">// \u5C0F\u660E5: &quot;5&quot;</span>
<span class="token comment">// \u5C0F\u660E6: &quot;6&quot;</span>
<span class="token comment">// \u5C0F\u660E7: &quot;7&quot;</span>
<span class="token comment">// \u5C0F\u660E8: &quot;8&quot;</span>
<span class="token comment">// \u5C0F\u660E9: &quot;9&quot;</span>
<span class="token comment">// \u5C0F\u660E10: &quot;10&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[p];function c(l,u){return s(),a("div",null,o)}var k=n(e,[["render",c],["__file","mapPing.html.vue"]]);export{k as default};
