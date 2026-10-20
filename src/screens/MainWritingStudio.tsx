import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';

export const MainWritingStudio: React.FC = () => {
  const {
    navigateTo,
    focusMode,
    setFocusMode,
    typewriterMode,
    setTypewriterMode,
    sheetWidth,
    fontSize,
    lineHeight,
    proseTypeface,
    currentTheme,
    showToast,
    chapters,
    selectChapter,
    addCitation,
  } = useStudio();

  const [proseText, setProseText] = useState({
    p1: '秋分刚过，南山下的这间书舍便被浓稠的青黛色水汽裹挟了。午后无事，闲展素笺，廊外的老竹在细雨中簌簌作响，击在宋制青瓦上，发出轻重错落的脆响，如琴师初试拨片，迟疑而清亮。',
    p2: '案头的水盂里浮着昨夜随手采撷的一瓣晚桂，残香沉在清冽的井水里，散发出一股近乎古籍微潮的气味。我用端砚慢研松烟墨，墨香四溢之际，常觉窗外的烟云正沿着半开的格栅窗棂爬入纸上。所谓“落纸如云烟”，大抵非是夸饰，而是古人在空山寂室中，真切地借着墨汁的氤氲，化解了肉身的局限。',
    p3Lead: '雨声忽而变得辽阔。庭院里的那株古棠已然褪尽繁华，只余苍黑的枯枝在雨丝织就的密网中沉静守候。',
    p3Highlight: '山气自南峦漫卷而来，层层叠叠掩去了远峰的轮廓，天地之间，忽而只剩下了雨落青石的清响与笔尖摩挲纸背的微吟。',
    p3Tail: '在此等寂寥里，人方能褪去平日奔波里的铠甲，于一滴水、一片墨色里照见原本的微茫与从容。',
    p4: '年岁渐长，愈发笃信文字是有体温与骨节的。年轻时写景，唯恐辞藻不华丽，恨不得将世间所有的明艳色彩尽数倾注于一行短句；而今枯坐于秋雨窗前，反倒倾心于白石老人的留白——笔意未到之处，才是风月长存之所。一段山水，若被词句填塞得水泄不通，便失却了供观者吐纳的灵气。',
    p5: '几案上的这叠宣纸，产自泾县的深山竹涧，纸性绵韧如素帛，遇墨则深邃沉着。当笔尖落下的刹那，墨沈洇散，好似岁月悄然蚀刻在时间缝隙里的痕迹。人在此间敲击键盘，或以羊毫作跋，所求的不过是在瞬息万变的浮世洪流中，寻得片刻能与自我对谈的锚点。',
    p6: '南山不语，唯雨霖铃。夜色自远处的枫林间慢慢合拢而来，我合上窗牖，将最后一点微光也留于这一方素纸之上。',
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'polish' | 'expand' | 'allusion'>('polish');
  const [classicalVal, setClassicalVal] = useState(75);
  const [subtleVal, setSubtleVal] = useState(85);
  const [conciseVal, setConciseVal] = useState(65);

  const handleGenerate = () => {
    if (!aiPrompt.trim()) {
      showToast('请输入提示指令，例如：以苏轼笔意润色此段');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('墨语已为您推演生成新意境');
      navigateTo('ai-companion-review');
    }, 600);
  };

  const handleAdoptInline = () => {
    setProseText((prev) => ({
      ...prev,
      p3Highlight: '山岚如素绢漫卷南峦，天与青石俱冷。空阶滴沥，洗去千峰浮尘，只留得一室研墨人。',
    }));
    showToast('已采纳晚明小品风润色句');
  };

  return (
    <div
      className="flex flex-1 overflow-hidden relative w-full h-[calc(100vh-44px-36px)]"
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* 1. 左栏目录卷轴 (270px) */}
      {!focusMode && (
        <aside className="w-[270px] flex-shrink-0 bg-[#EFEAE2]/90 dark:bg-[#1E1F24]/90 backdrop-blur-xl border-r border-[#8A716E]/15 dark:border-white/10 flex flex-col justify-between select-none z-20 transition-all">
          <div className="p-3 flex flex-col gap-2.5">
            {/* 朱砂红新建按钮 */}
            <button
              onClick={() => showToast('已创建新篇章草稿')}
              className="w-full flex items-center justify-center gap-1.5 bg-[#952F25] hover:bg-[#84241A] text-white py-1.5 px-3 rounded-lg text-xs font-medium shadow-sm transition-all active:scale-[0.99] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">add_circle</span>
              <span>新建卷轴 / 篇章</span>
            </button>

            {/* 检索全本文案 */}
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-2 text-[14px] text-[#8A716E]">
                search
              </span>
              <input
                className="w-full bg-[#E5DFD4] dark:bg-white/10 pl-6 pr-8 py-1 rounded-md text-xs text-[#1C1B1A] dark:text-white placeholder:text-[#8A716E] border border-transparent focus:border-[#8A716E]/30 focus:bg-[#FDF9F5] focus:outline-none transition-all"
                placeholder="搜索全本文案..."
                type="text"
              />
              <span className="absolute right-2 text-[10px] text-[#8A716E] font-mono">⌘F</span>
            </div>

            {/* 目录层级标头 */}
            <div className="flex items-center justify-between px-1 pt-1 text-[11px] text-[#8A716E] tracking-wider uppercase font-caption-marginalia">
              <span>文库卷册与篇章</span>
              <span className="font-mono text-[10px]">3 部著作</span>
            </div>

            {/* 卷册篇章树状导航 */}
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-270px)] pr-0.5">
              {/* 展开状态著作：《南山纪事》 */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between px-1.5 py-1 rounded hover:bg-[#E3DCcf] dark:hover:bg-white/10 cursor-pointer text-[#1C1B1A] dark:text-white">
                  <div className="flex items-center gap-1 truncate font-medium text-xs">
                    <span className="material-symbols-outlined text-[14px] text-[#952F25]">
                      arrow_drop_down
                    </span>
                    <span className="material-symbols-outlined text-[15px] text-[#952F25]">
                      folder_open
                    </span>
                    <span className="truncate">《南山纪事》</span>
                  </div>
                  <span className="text-[10px] text-[#8A716E] font-mono">6.8万字</span>
                </div>

                {/* 章节列表 */}
                <div className="flex flex-col pl-4 gap-0.5 border-l border-[#8A716E]/20 dark:border-white/10 ml-3 py-0.5">
                  {chapters.map((ch) => {
                    const isSelected = ch.id === 'c-3';
                    return (
                      <div
                        key={ch.id}
                        onClick={() => selectChapter(ch.id)}
                        className={`relative flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#DFD7CB] dark:bg-white/15 text-[#1C1B1A] dark:text-white font-medium shadow-xs border border-[#8A716E]/20'
                            : 'hover:bg-[#E3DCcf] dark:hover:bg-white/10 text-[#57423F] dark:text-white/70'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -left-[17px] w-2 h-2 rounded-full bg-[#952F25] ring-2 ring-[#EFEAE2]" />
                        )}
                        <div className="flex items-center gap-1.5 truncate">
                          {isSelected ? (
                            <span
                              className="material-symbols-outlined text-[14px] text-[#952F25]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              edit_note
                            </span>
                          ) : (
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                ch.status === '完稿'
                                  ? 'bg-[#33675F]'
                                  : ch.status === '修订中'
                                  ? 'bg-[#664F19]'
                                  : 'bg-[#8A716E]/40'
                              }`}
                            />
                          )}
                          <span className={`text-xs truncate ${isSelected ? 'font-semibold' : ''}`}>
                            {ch.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span
                            className={`text-[9px] px-1 py-0.2 rounded font-normal ${
                              ch.status === '完稿'
                                ? 'text-[#33675F]'
                                : ch.status === '修订中'
                                ? 'text-[#664F19]'
                                : isSelected
                                ? 'bg-[#664F19]/15 text-[#664F19]'
                                : 'text-[#8A716E]'
                            }`}
                          >
                            {ch.status}
                          </span>
                          <span
                            className={`text-[10px] font-mono ${
                              isSelected ? 'text-[#952F25] font-semibold' : 'text-[#8A716E]'
                            }`}
                          >
                            {ch.words}字
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 收合卷册 2：《杂集诗抄》 */}
              <div
                onClick={() => showToast('卷册《杂集诗抄》共有24首诗简')}
                className="flex items-center justify-between px-1.5 py-1 rounded hover:bg-[#E3DCcf] dark:hover:bg-white/10 cursor-pointer text-[#57423F] dark:text-white/70 mt-1 transition-colors"
              >
                <div className="flex items-center gap-1 truncate text-xs">
                  <span className="material-symbols-outlined text-[14px] text-[#8A716E]">
                    arrow_right
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#8A716E]">
                    folder
                  </span>
                  <span className="truncate">《杂集诗抄》</span>
                </div>
                <span className="text-[10px] text-[#8A716E] font-mono">24首</span>
              </div>

              {/* 收合卷册 3：《史话札记》 */}
              <div
                onClick={() => showToast('卷册《史话札记》共有12篇考据')}
                className="flex items-center justify-between px-1.5 py-1 rounded hover:bg-[#E3DCcf] dark:hover:bg-white/10 cursor-pointer text-[#57423F] dark:text-white/70 transition-colors"
              >
                <div className="flex items-center gap-1 truncate text-xs">
                  <span className="material-symbols-outlined text-[14px] text-[#8A716E]">
                    arrow_right
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#8A716E]">
                    folder
                  </span>
                  <span className="truncate">《史话札记》</span>
                </div>
                <span className="text-[10px] text-[#8A716E] font-mono">12篇</span>
              </div>
            </div>
          </div>

          {/* 底部独立放置：灵感便签箱与废纸篓 */}
          <div className="p-2.5 bg-[#E6E0D5]/80 dark:bg-white/5 border-t border-[#8A716E]/15 dark:border-white/10 flex flex-col gap-1">
            <button
              onClick={() => showToast('便签箱：尚有3条灵感摘录待整理入正文')}
              className="flex items-center justify-between w-full px-2 py-1.5 rounded-md hover:bg-[#DFD7CB] dark:hover:bg-white/10 text-[#57423F] dark:text-white/80 transition-colors text-xs cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#664F19]">
                  lightbulb
                </span>
                <span>灵感便签箱</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-full bg-[#664F19]/15 text-[#664F19] text-[10px] font-medium font-mono">
                3条未归档
              </span>
            </button>
            <button
              onClick={() => showToast('废纸篓：保留最近30天内的8篇历史更动')}
              className="flex items-center justify-between w-full px-2 py-1.5 rounded-md hover:bg-[#DFD7CB] dark:hover:bg-white/10 text-[#8A716E] dark:text-white/60 transition-colors text-xs cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">auto_delete</span>
                <span>废纸篓与历史稿</span>
              </div>
              <span className="text-[10px] text-[#8A716E] font-mono">8篇</span>
            </button>
          </div>
        </aside>
      )}

      {/* 2. 中栏沉浸稿纸 */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center px-4 py-6 relative select-text transition-colors">
        {/* 顶部悬浮操作条 */}
        <div
          style={{ maxWidth: `${sheetWidth}px` }}
          className="w-full flex items-center justify-between pb-3 mb-4 text-[#8A716E] border-b border-[#8A716E]/15 select-none"
        >
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#33675F]" />
            <span>文渊阁 · {currentTheme.name} ({currentTheme.bg})</span>
            <span className="text-[#8A716E]/40">·</span>
            <span>最后键入：3分钟前</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTypewriterMode((prev) => !prev)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#EAE3D6] dark:bg-white/10 hover:bg-[#DFD7CB] text-[#57423F] dark:text-white text-[11px] font-mono transition-colors cursor-pointer"
              title="打字机视线保持在屏幕黄金居中线"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">
                vertical_align_center
              </span>
              <span>打字机居中模式 [{typewriterMode ? '开' : '关'}]</span>
            </button>

            <button
              onClick={() => setFocusMode((prev) => !prev)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#EAE3D6] dark:bg-white/10 hover:bg-[#DFD7CB] text-[#57423F] dark:text-white text-[11px] font-mono transition-colors cursor-pointer"
              title="专注写作"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">fullscreen</span>
              <span>专注 (F11)</span>
            </button>

            {/* Exact target title required: 墨滴纸色切换 -> studio-preferences-themes */}
            <button
              onClick={() => navigateTo('studio-preferences-themes')}
              title="墨滴纸色切换"
              className="p-1 rounded hover:bg-[#EAE3D6] dark:hover:bg-white/10 text-[#57423F] dark:text-white transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">palette</span>
            </button>

            <button
              onClick={() => navigateTo('ai-companion-review')}
              className="p-1 rounded hover:bg-[#EAE3D6] dark:hover:bg-white/10 text-[#57423F] dark:text-white transition-colors cursor-pointer"
              title="禅道分屏阅读"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">vertical_split</span>
            </button>
          </div>
        </div>

        {/* 浮动光标智能菜单 (Cursor Floating Action Menu) */}
        <div
          style={{ maxWidth: `${sheetWidth}px` }}
          className="w-full mb-3 flex justify-end select-none"
        >
          <div className="bg-[#2B2A28] text-[#FDF9F5] shadow-xl rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 border border-[#8A716E]/30 text-xs">
            {/* Required XPath button: contains '墨语润色' or '🍃 修饰意象' -> ai-companion-review */}
            <button
              onClick={() => navigateTo('ai-companion-review')}
              className="flex items-center gap-1 pr-1.5 border-r border-[#8A716E]/40 text-[#E3C281] font-medium hover:brightness-110 cursor-pointer"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span>墨语润色</span>
            </button>

            <button
              onClick={() => navigateTo('ai-companion-review')}
              className="px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] transition-colors flex items-center gap-0.5 cursor-pointer"
              type="button"
            >
              <span>🪶 更古典</span>
            </button>

            {/* Also matches contains '🍃 修饰意象' */}
            <button
              onClick={() => navigateTo('ai-companion-review')}
              className="px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] transition-colors flex items-center gap-0.5 cursor-pointer"
              type="button"
            >
              <span>🍃 修饰意象</span>
            </button>

            {/* Required XPath button: contains '📜 查阅典故' -> knowledge-lore-research */}
            <button
              onClick={() => navigateTo('knowledge-lore-research')}
              className="px-1.5 py-0.5 rounded hover:bg-white/10 text-[11px] transition-colors flex items-center gap-0.5 cursor-pointer"
              type="button"
            >
              <span>📜 查阅典故</span>
            </button>

            <div className="w-px h-3 bg-white/20 mx-0.5" />
            <button
              onClick={() => showToast('已格式化粗体')}
              className="px-1 py-0.5 rounded hover:bg-white/10 text-[12px] font-bold"
              title="粗体"
              type="button"
            >
              B
            </button>
            <button
              onClick={() => showToast('已格式化斜体')}
              className="px-1 py-0.5 rounded hover:bg-white/10 text-[12px] italic"
              title="斜体"
              type="button"
            >
              I
            </button>
            <button
              onClick={() => addCitation('案头新注', '由选中文句衍生')}
              className="px-1 py-0.5 rounded hover:bg-white/10 text-[11px] text-[#E3C281]"
              title="双行夹注"
              type="button"
            >
              夹注
            </button>
          </div>
        </div>

        {/* 宣纸实体稿纸 (Article sheet) */}
        <article
          style={{
            maxWidth: `${sheetWidth}px`,
            backgroundColor: currentTheme.paper,
            color: currentTheme.text,
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            fontFamily: proseTypeface,
          }}
          className="w-full rounded-xl shadow-[0_4px_24px_rgba(43,42,40,0.06),0_1px_4px_rgba(43,42,40,0.04)] px-8 sm:px-14 py-12 flex flex-col relative border border-[#E6E0D5] dark:border-white/10 transition-all"
        >
          {/* 朱砂古印「南山纸斋」落款 */}
          <div className="absolute right-10 top-10 pointer-events-none select-none">
            <div className="w-11 h-11 rounded border-2 border-[#952F25]/80 flex flex-col items-center justify-center text-[#952F25] font-display font-semibold rotate-2 p-0.5 leading-none shadow-[inset_0_0_6px_rgba(181,71,58,0.2)]">
              <span className="text-[10px] tracking-widest">南山</span>
              <span className="text-[10px] tracking-widest mt-0.5">纸斋</span>
            </div>
          </div>

          {/* 题头元信息与标题 */}
          <header className="mb-8 flex flex-col gap-2 border-b border-[#8A716E]/15 pb-6">
            <div className="flex items-center gap-1.5 text-[#952F25] text-xs tracking-wider">
              <span className="material-symbols-outlined text-[13px]">bookmark</span>
              <span>《南山纪事》第三卷 · 散落篇章</span>
            </div>
            <h1 className="text-2xl sm:text-[26px] font-semibold tracking-tight leading-snug">
              浮生随笔：晴窗坐雨与纸上苍山
            </h1>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[#8A716E] text-xs pt-1">
              <span>岁次壬寅秋月 · 坐雨烹茶记</span>
              <span>·</span>
              <span>总字数 3,482 字</span>
              <span>·</span>
              <span>预估研读 9 分钟</span>
              <span>·</span>
              <span className="text-[#33675F] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33675F]" />
                {proseTypeface} · 原墨排印
              </span>
            </div>
          </header>

          {/* 正文排版：段首缩进2字符，极富文学呼吸感 */}
          <div className="flex flex-col gap-5 leading-relaxed selection:bg-[#B7EDE3] selection:text-[#00201C]">
            <p className="indent-[2em]">{proseText.p1}</p>
            <p className="indent-[2em]">{proseText.p2}</p>

            {/* 选中文句高亮状态（青碧宣纸流光高亮）+ 内联建议浮泡 */}
            <div className="relative group my-2 -mx-3 px-3 py-2 rounded-lg bg-[#EAE4D7]/60 dark:bg-white/5 border-l-2 border-[#33675F] transition-all">
              <p className="indent-[2em]">
                {proseText.p3Lead}{' '}
                <span
                  onClick={() => navigateTo('ai-companion-review')}
                  className="bg-[#9CD1C7]/45 dark:bg-[#33675F]/40 px-1 py-0.5 rounded cursor-pointer font-medium border-b border-[#33675F] hover:bg-[#9CD1C7]/60 transition-colors"
                  title="点击调起 AI 深度对比面板"
                >
                  {proseText.p3Highlight}
                </span>{' '}
                {proseText.p3Tail}
              </p>

              {/* 内联建议浮泡 */}
              <div className="mt-2.5 flex items-center justify-between text-xs text-[#33675F] dark:text-[#9CD1C7] bg-[#FAF6EE] dark:bg-[#1E1F24] px-2.5 py-1.5 rounded border border-[#33675F]/30 shadow-xs">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  已选中文句 · 墨语建议可强化空灵意象
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAdoptInline}
                    className="text-[11px] text-[#8A716E] hover:text-[#33675F] cursor-pointer"
                    type="button"
                  >
                    按 <kbd className="px-1 py-0.5 bg-[#E6E0D5] dark:bg-white/10 rounded text-[10px] text-[#1C1B1A] dark:text-white font-mono">Tab</kbd> 快捷采纳右侧方案
                  </button>
                </div>
              </div>
            </div>

            <p className="indent-[2em]">
              年岁渐长，愈发笃信文字是有体温与骨节的
              <span className="double-annotation">
                <span>宋版书评</span>
                <span>见骨肉停匀</span>
              </span>
              。年轻时写景，唯恐辞藻不华丽，恨不得将世间所有的明艳色彩尽数倾注于一行短句；而今枯坐于秋雨窗前，反倒倾心于白石老人的留白——笔意未到之处，才是风月长存之所。一段山水，若被词句填塞得水泄不通，便失却了供观者吐纳的灵气。
            </p>

            <p className="indent-[2em]">{proseText.p5}</p>

            {/* 光标输入动态模拟 */}
            <p className="indent-[2em] relative">
              {proseText.p6}
              <span className="inline-block w-[2px] h-[1.2em] bg-[#952F25] align-middle animate-pulse ml-0.5" />
            </p>
          </div>

          {/* 文末：朱丝栏双行小注与笺记批注展示 */}
          <div className="mt-12 pt-4 border-t border-[#8A716E]/20 flex items-start gap-2.5 text-xs text-[#8A716E] bg-[#F3EDE2]/60 dark:bg-white/5 p-3 rounded-lg border border-[#8A716E]/10">
            <span className="px-1.5 py-0.5 rounded bg-[#952F25]/10 text-[#952F25] font-mono text-[11px] flex-shrink-0 font-medium">
              笺记 · 朱丝栏夹注
            </span>
            <p className="leading-relaxed text-[#57423F] dark:text-white/80">
              此处“南山”指皖南齐云山脉余脉，昔年文人常隐于此以避喧嚣。文中提及之端砚，为宋坑老石，质密而润，能宿墨数日不干。宣纸取青檀皮与沙田稻草按古法九蒸四酿制成。
            </p>
          </div>
        </article>
        <div className="h-10 w-full" />
      </main>

      {/* 3. 右栏灵感侍书 (320px) */}
      {!focusMode && (
        <aside className="w-[320px] flex-shrink-0 bg-[#EFEAE2]/90 dark:bg-[#1E1F24]/90 backdrop-blur-xl border-l border-[#8A716E]/15 dark:border-white/10 flex flex-col justify-between select-none z-20 transition-all">
          <div className="p-3 flex flex-col gap-3 overflow-y-auto">
            {/* 助手标头与双模指示 */}
            <div className="flex items-center justify-between pb-2 border-b border-[#8A716E]/15 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#33675F] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#1C1B1A] dark:text-white">
                    灵感侍书 · 墨语
                  </span>
                  <span className="text-[10px] text-[#33675F] dark:text-[#9CD1C7] flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33675F]" />
                    双模切换 · 本地/云端极速就绪
                  </span>
                </div>
              </div>
              {/* Required XPath button: title="侍书配置" -> studio-preferences-themes */}
              <button
                onClick={() => navigateTo('studio-preferences-themes')}
                title="侍书配置"
                className="p-1 text-[#8A716E] hover:text-[#1C1B1A] dark:hover:text-white rounded hover:bg-[#E3DCcf] dark:hover:bg-white/10 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
              </button>
            </div>

            {/* 顶部快捷模式胶囊 */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => {
                  setActiveTab('expand');
                  showToast('已切换至【续写】模式');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all flex items-center gap-0.5 cursor-pointer ${
                  activeTab === 'expand'
                    ? 'bg-[#33675F] text-white font-medium shadow-xs'
                    : 'bg-[#E5DFD4] dark:bg-white/10 text-[#57423F] dark:text-white hover:bg-[#33675F] hover:text-white'
                }`}
                type="button"
              >
                <span>续写</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('polish');
                  showToast('已切换至【意境润色】模式');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all flex items-center gap-0.5 cursor-pointer ${
                  activeTab === 'polish'
                    ? 'bg-[#33675F] text-white font-medium shadow-xs'
                    : 'bg-[#E5DFD4] dark:bg-white/10 text-[#57423F] dark:text-white hover:bg-[#33675F] hover:text-white'
                }`}
                type="button"
              >
                <span>意境润色</span>
              </button>

              <button
                onClick={() => {
                  showToast('已调优【扩充留白】文风');
                }}
                className="px-2 py-0.5 rounded bg-[#E5DFD4] dark:bg-white/10 text-[#57423F] dark:text-white hover:bg-[#33675F] hover:text-white text-[11px] font-mono transition-all cursor-pointer"
                type="button"
              >
                <span>扩充留白</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('allusion');
                  navigateTo('knowledge-lore-research');
                }}
                className="px-2 py-0.5 rounded bg-[#E5DFD4] dark:bg-white/10 text-[#57423F] dark:text-white hover:bg-[#33675F] hover:text-white text-[11px] font-mono transition-all cursor-pointer"
                type="button"
              >
                <span>化用典故</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('ai-companion-review');
                }}
                className="px-2 py-0.5 rounded bg-[#E5DFD4] dark:bg-white/10 text-[#57423F] dark:text-white hover:bg-[#33675F] hover:text-white text-[11px] font-mono transition-all cursor-pointer"
                type="button"
              >
                <span>练字炼句</span>
              </button>
            </div>

            {/* 润色方案卡片【秋雨造境 · 晚明小品风】 */}
            <div className="flex flex-col gap-2 bg-[#FAF6EE] dark:bg-[#25262C] p-3 rounded-xl border border-[#8A716E]/20 dark:border-white/10 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#33675F] dark:text-[#9CD1C7] font-medium text-xs">
                  <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                  <span>润色方案 · 晚明小品风</span>
                </div>
                <span className="px-1.5 py-0.2 rounded bg-[#33675F]/10 text-[#33675F] dark:text-[#9CD1C7] text-[10px] font-medium">
                  推荐
                </span>
              </div>
              <div className="text-xs text-[#2B2A28] dark:text-white pl-2 border-l-2 border-[#33675F] leading-relaxed py-0.5 select-text bg-[#F3EDE2]/50 dark:bg-white/5 rounded-r">
                “山岚如素绢漫卷南峦，天与青石俱冷。空阶滴沥，洗去千峰浮尘，只留得一室研墨人。”
              </div>
              <p className="text-[11px] text-[#8A716E] dark:text-white/60 leading-relaxed">
                注：已融合苏轼《空山滴沥》之意向，弱化主观抒情，强化微雨古院的空灵声色。
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                {/* Required XPath button: contains '替换当前文句' -> ai-companion-review */}
                <button
                  onClick={() => navigateTo('ai-companion-review')}
                  className="flex-1 py-1 rounded bg-[#952F25] hover:bg-[#84241A] text-white text-[11px] font-medium transition-colors text-center shadow-xs cursor-pointer"
                  type="button"
                >
                  替换当前文句
                </button>
                <button
                  onClick={handleAdoptInline}
                  className="px-2.5 py-1 rounded bg-[#E5DFD4] dark:bg-white/10 hover:bg-[#D8D0C3] text-[#1C1B1A] dark:text-white text-[11px] font-medium transition-colors cursor-pointer"
                  type="button"
                >
                  采纳
                </button>
                <button
                  onClick={() => showToast('已存入便签箱')}
                  className="p-1 rounded bg-[#E5DFD4] dark:bg-white/10 hover:bg-[#D8D0C3] text-[#57423F] dark:text-white transition-colors cursor-pointer"
                  title="存入便签"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">bookmark_add</span>
                </button>
              </div>
            </div>

            {/* 典故考据卡片【文心考据 · 泾县宣纸】 */}
            <div className="flex flex-col gap-1.5 bg-[#FAF6EE] dark:bg-[#25262C] p-3 rounded-xl border border-[#8A716E]/20 dark:border-white/10 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#664F19] dark:text-[#E3C281] font-medium text-xs">
                  <span className="material-symbols-outlined text-[14px]">menu_book</span>
                  <span>文心考据 · 泾县宣纸</span>
                </div>
                <span className="text-[10px] text-[#8A716E]">典故</span>
              </div>
              <p className="text-xs text-[#57423F] dark:text-white/80 leading-relaxed select-text">
                泾县青檀皮制纸始于唐代，以纸寿千年著称。质地温润，遇墨显层。若描写触感，可用“肤理缜密，如玉如凝”。
              </p>
              <button
                onClick={() => {
                  addCitation('泾县青檀皮制纸考据', '正文宣纸段落');
                  showToast('已录入文末附注');
                }}
                className="text-left text-[11px] text-[#664F19] dark:text-[#E3C281] hover:underline flex items-center gap-0.5 pt-0.5 cursor-pointer"
                type="button"
              >
                <span>引人文末附注</span>
                <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </button>
            </div>

            {/* 侍书文风罗盘维度滑块 (75% / 85% / 65%) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-[#8A716E]/15 dark:border-white/10">
              <span className="text-[10px] text-[#8A716E] tracking-wider uppercase font-medium">
                侍书文风罗盘调校
              </span>
              {/* 滑块 1：古典雅致 75% */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[11px] text-[#57423F] dark:text-white/80">
                  <span>古典雅致</span>
                  <span className="text-[#952F25] dark:text-[#FFB4A9] font-mono font-medium">
                    {classicalVal}%
                  </span>
                  <span className="text-[#8A716E]">现代表达</span>
                </div>
                <div className="w-full bg-[#E5DFD4] dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#952F25] h-full rounded-full transition-all"
                    style={{ width: `${classicalVal}%` }}
                  />
                </div>
              </div>

              {/* 滑块 2：含蓄留白 85% */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[11px] text-[#57423F] dark:text-white/80">
                  <span>含蓄留白</span>
                  <span className="text-[#33675F] dark:text-[#9CD1C7] font-mono font-medium">
                    {subtleVal}%
                  </span>
                  <span className="text-[#8A716E]">直叙心意</span>
                </div>
                <div className="w-full bg-[#E5DFD4] dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#33675F] h-full rounded-full transition-all"
                    style={{ width: `${subtleVal}%` }}
                  />
                </div>
              </div>

              {/* 滑块 3：简练疏淡 65% */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[11px] text-[#57423F] dark:text-white/80">
                  <span>简练疏淡</span>
                  <span className="text-[#664F19] dark:text-[#E3C281] font-mono font-medium">
                    {conciseVal}%
                  </span>
                  <span className="text-[#8A716E]">繁丽铺陈</span>
                </div>
                <div className="w-full bg-[#E5DFD4] dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#664F19] h-full rounded-full transition-all"
                    style={{ width: `${conciseVal}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 底部保留对话式灵感交互输入框 (⌘K 唤出墨语灵感指令) */}
          <div className="p-2.5 bg-[#E6E0D5]/80 dark:bg-white/5 border-t border-[#8A716E]/15 dark:border-white/10 flex flex-col gap-1.5">
            <div className="bg-[#FAF6EE] dark:bg-[#25262C] rounded-lg border border-[#8A716E]/20 dark:border-white/10 p-2 shadow-inner flex flex-col gap-1.5">
              <textarea
                className="w-full bg-transparent resize-none border-none focus:outline-none text-xs text-[#1C1B1A] dark:text-white placeholder:text-[#8A716E]/70 leading-normal"
                placeholder="向墨语输入写作指引，例如：以王维诗意润色..."
                rows={2}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[10px] text-[#8A716E] font-mono">⌘K 唤出灵感指令</span>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-2 py-0.5 bg-[#33675F] hover:bg-[#28524B] text-white rounded text-[11px] flex items-center gap-1 shadow-xs font-mono cursor-pointer"
                  type="button"
                >
                  <span>{isGenerating ? '推演中...' : '生成'}</span>
                  <span className="material-symbols-outlined text-[11px]">send</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#8A716E] px-0.5">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33675F]" />
                本地热启动
              </span>
              <span>延迟 18ms</span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
