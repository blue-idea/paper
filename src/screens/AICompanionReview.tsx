import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Sidebar } from '../components/Sidebar';

export const AICompanionReview: React.FC = () => {
  const {
    navigateTo,
    diffItems,
    acceptDiffItem,
    discardDiffItem,
    acceptAllDiffs,
    showToast,
    addCitation,
  } = useStudio();

  const [viewMode, setViewMode] = useState<'split' | 'inline'>('split');
  const [activeGenre, setActiveGenre] = useState('晚明小品');
  const [dim1, setDim1] = useState(75);
  const [dim2, setDim2] = useState(90);
  const [dim3, setDim3] = useState(65);
  const [candidateDraft, setCandidateDraft] = useState(2);
  const [allAccepted, setAllAccepted] = useState(false);

  const genres = ['晚明小品', '周作人式冲淡', '唐宋格律感', '现代意识流'];

  const handleAcceptAll = () => {
    acceptAllDiffs();
    setAllAccepted(true);
  };

  const handleCycleMetaphor = () => {
    showToast('已重新抽取张岱《西湖七月半》与归有光《项脊轩志》隐喻库');
  };

  const handleNextCandidate = () => {
    setCandidateDraft((prev) => (prev % 3) + 1);
    showToast(`已调阅第 ${(candidateDraft % 3) + 1} / 3 候选方案`);
  };

  return (
    <div className="flex flex-1 overflow-hidden relative w-full h-[calc(100vh-44px-36px)]">
      {/* Sidebar Binder */}
      <Sidebar />

      {/* Main Diff Content Container */}
      <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6 transition-colors">
        <div className="flex flex-col gap-6 max-w-[1560px] mx-auto w-full pb-16">
          {/* Top Configuration Header & Tone Tuning Desk */}
          <div className="bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-sm flex flex-col gap-4 border border-outline-variant/30 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">difference</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      选中文本精修对比
                    </span>
                    <span className="bg-surface-container-high dark:bg-white/10 px-2 py-0.5 rounded text-outline font-label-ui-sm text-label-ui-sm">
                      卷三 · 第四自然段
                    </span>
                  </div>
                  <span className="font-caption-marginalia text-caption-marginalia text-outline">
                    焦点题旨：写雨景与客堂独坐心境 · 对比算法: 语义意象级审校
                  </span>
                </div>
              </div>

              {/* Mode Toggle & Snapshot counter */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-surface-container dark:bg-white/10 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1 font-label-ui text-label-ui rounded flex items-center gap-1 transition-all cursor-pointer ${
                      viewMode === 'split'
                        ? 'bg-surface text-primary shadow-sm font-medium'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[15px]">splitscreen</span>
                    双栏对照
                  </button>
                  <button
                    onClick={() => setViewMode('inline')}
                    className={`px-3 py-1 font-label-ui text-label-ui rounded flex items-center gap-1 transition-all cursor-pointer ${
                      viewMode === 'inline'
                        ? 'bg-surface text-primary shadow-sm font-medium'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[15px]">rate_review</span>
                    留痕贯穿
                  </button>
                </div>
                <span className="text-outline/40">|</span>
                <button
                  onClick={handleNextCandidate}
                  className="flex items-center gap-1 font-caption-marginalia text-caption-marginalia text-secondary bg-secondary-container/40 px-3 py-1 rounded-full cursor-pointer hover:bg-secondary-container/60 transition-colors"
                  type="button"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>草稿候选：第 {candidateDraft} / 3 稿 (点击切换)</span>
                </button>
              </div>
            </div>

            {/* Literary Stylistic Dimension Sliders & Presets */}
            <div className="bg-surface dark:bg-[#25262C] rounded-lg p-3 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between shadow-[0_1px_4px_rgba(43,42,40,0.03)] border border-outline-variant/20 dark:border-white/10">
              {/* Genre Presets Chips */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-caption-marginalia text-caption-marginalia text-outline mr-1">
                  修辞风骨：
                </span>
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setActiveGenre(g);
                      showToast(`已切换至【${g}】文风模型`);
                    }}
                    className={`px-3 py-1 rounded-full font-label-ui text-label-ui transition-all flex items-center gap-1 cursor-pointer ${
                      activeGenre === g
                        ? 'bg-primary-container text-white shadow-xs font-medium'
                        : 'bg-surface-container-high dark:bg-white/10 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                    }`}
                    type="button"
                  >
                    {activeGenre === g && (
                      <span className="material-symbols-outlined text-[14px]">history_edu</span>
                    )}
                    {g}
                  </button>
                ))}
              </div>

              {/* 3 Dimension Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:w-auto xl:min-w-[540px]">
                {/* Dimension 1 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-ui-sm text-label-ui-sm text-on-surface-variant">
                    <span>古典</span>
                    <span className="text-primary font-semibold">{dim1}%</span>
                    <span>现代</span>
                  </div>
                  <input
                    className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    max={100}
                    min={0}
                    value={dim1}
                    onChange={(e) => setDim1(Number(e.target.value))}
                    type="range"
                  />
                </div>
                {/* Dimension 2 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-ui-sm text-label-ui-sm text-on-surface-variant">
                    <span>含蓄</span>
                    <span className="text-secondary font-semibold">{dim2}%</span>
                    <span>直白</span>
                  </div>
                  <input
                    className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary"
                    max={100}
                    min={0}
                    value={dim2}
                    onChange={(e) => setDim2(Number(e.target.value))}
                    type="range"
                  />
                </div>
                {/* Dimension 3 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-ui-sm text-label-ui-sm text-on-surface-variant">
                    <span>简练</span>
                    <span className="text-tertiary-container font-semibold">{dim3}%</span>
                    <span>繁丽</span>
                  </div>
                  <input
                    className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-tertiary-container"
                    max={100}
                    min={0}
                    value={dim3}
                    onChange={(e) => setDim3(Number(e.target.value))}
                    type="range"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Working Grid: Dual Diff Comparison Desk + Right Scholarly Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Center Comparison Surface (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {viewMode === 'split' ? (
                /* Two Up Comparison Sheets */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Original Document Panel */}
                  <div className="bg-surface-container-lowest dark:bg-[#25262C] rounded-xl p-5 shadow-[0_4px_20px_-2px_rgba(43,42,40,0.04)] relative flex flex-col justify-between min-h-[360px] border border-outline-variant/30 dark:border-white/10">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-outline" />
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            原稿文本
                          </span>
                        </div>
                        <span className="font-label-ui-sm text-label-ui-sm text-outline bg-surface-container dark:bg-white/10 px-2 py-0.5 rounded">
                          186 字 · 未调修
                        </span>
                      </div>
                      <div className="font-body-prose-lg text-body-prose-lg text-on-surface-variant dark:text-white/80 pt-2 leading-[2.1]">
                        <p>
                          午后的雨渐渐大了起来，打在院子里的芭蕉叶上，
                          <span className="bg-primary/10 text-primary line-through decoration-primary/50 px-1 py-0.5 rounded mx-0.5">
                            声音很乱
                          </span>
                          。我坐在窗前，
                          <span className="bg-primary/10 text-primary line-through decoration-primary/50 px-1 py-0.5 rounded mx-0.5">
                            不知道该写些什么
                          </span>
                          ，只觉得杯里的茶已经凉透了，
                          <span className="bg-primary/10 text-primary line-through decoration-primary/50 px-1 py-0.5 rounded mx-0.5">
                            窗外山色一片灰暗
                          </span>
                          。
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between font-caption-marginalia text-caption-marginalia text-outline border-t border-surface-container dark:border-white/10">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">access_time</span>
                        采自 14:28 自动存盘
                      </span>
                      <button
                        onClick={() => showToast('已复制原稿文本至剪贴板')}
                        className="text-outline hover:text-on-surface flex items-center gap-0.5 text-label-ui-sm font-label-ui-sm transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        复制原句
                      </button>
                    </div>
                  </div>

                  {/* AI Refined Document Panel */}
                  <div className="bg-surface-container-lowest dark:bg-[#25262C] rounded-xl p-5 shadow-[0_8px_24px_-4px_rgba(43,42,40,0.06)] relative flex flex-col justify-between min-h-[360px] ring-1 ring-secondary/40 border border-outline-variant/30 dark:border-white/10">
                    <div className="absolute -top-3 right-4 bg-secondary text-white px-3 py-0.5 rounded-full font-label-ui-sm text-label-ui-sm shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                      晚明山斋质感 · 推荐稿
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-secondary" />
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            AI 润色稿
                          </span>
                        </div>
                        <span className="font-label-ui-sm text-label-ui-sm text-secondary bg-secondary-container/50 px-2 py-0.5 rounded font-medium">
                          212 字 (+26)
                        </span>
                      </div>
                      <div className="font-body-prose-lg text-body-prose-lg text-on-surface pt-2 leading-[2.1]">
                        <p>
                          午后骤雨初歇又作，淅沥叩打庭阶芭蕉，
                          <mark className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-medium mx-0.5 inline-block">
                            如碎玉乱琼
                          </mark>
                          。晴窗独坐，
                          <mark className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-medium mx-0.5 inline-block">
                            笔锋悬空未落
                          </mark>
                          ，盏中云雾已渐冷凝。抬眼处，远山皆隐入溟濛烟岚，
                          <mark className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-medium mx-0.5 inline-block">
                            唯余满室书卷微香
                          </mark>
                          。
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between font-caption-marginalia text-caption-marginalia text-outline border-t border-surface-container dark:border-white/10">
                      <span className="flex items-center gap-1 text-secondary font-medium">
                        <span className="material-symbols-outlined text-[14px]">psychology</span>
                        张岱《陶庵梦忆》笔触加权 85%
                      </span>
                      <span className="font-label-ui-sm text-label-ui-sm text-outline">
                        已校对生僻字
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Inline Tracked Changes View */
                <div className="bg-surface-container-lowest dark:bg-[#25262C] rounded-xl p-6 shadow-sm border border-outline-variant/30 dark:border-white/10 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-white/10">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      全篇留痕贯穿模式
                    </span>
                    <span className="font-label-ui-sm text-label-ui-sm text-secondary bg-secondary-container/40 px-2.5 py-0.5 rounded">
                      3处意象变动已标红绿
                    </span>
                  </div>
                  <div className="font-body-prose-lg text-body-prose-lg text-on-surface leading-[2.2]">
                    午后骤雨初歇又作，淅沥叩打庭阶芭蕉，
                    <span className="line-through text-primary/60 bg-primary/10 px-1 py-0.5 rounded mx-0.5">
                      声音很乱
                    </span>
                    <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-medium mx-0.5">
                      如碎玉乱琼
                    </span>
                    。晴窗独坐，
                    <span className="line-through text-primary/60 bg-primary/10 px-1 py-0.5 rounded mx-0.5">
                      不知道该写些什么
                    </span>
                    <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-medium mx-0.5">
                      笔锋悬空未落
                    </span>
                    ，盏中云雾已渐冷凝。抬眼处，远山皆隐入溟濛烟岚，
                    <span className="line-through text-primary/60 bg-primary/10 px-1 py-0.5 rounded mx-0.5">
                      窗外山色一片灰暗
                    </span>
                    <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-medium mx-0.5">
                      唯余满室书卷微香
                    </span>
                    。
                  </div>
                </div>
              )}

              {/* Detailed Change Breakdown Cards */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1 py-0.5">
                  <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                    逐项演变解析 (3 处关键意象修订)
                  </span>
                  <span className="font-caption-marginalia text-caption-marginalia text-outline">
                    支持按原子节点逐条取舍
                  </span>
                </div>

                {diffItems.map((item, index) => {
                  const isAccepted = item.status === 'accepted';
                  const isDiscarded = item.status === 'discarded';

                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl p-4 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 border border-outline-variant/20 dark:border-white/10 ${
                        isAccepted
                          ? 'bg-secondary-container/25 opacity-95'
                          : isDiscarded
                          ? 'bg-surface-container opacity-45 line-through'
                          : 'bg-surface-container-low dark:bg-white/5 hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container font-label-ui-sm text-label-ui-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                              {item.title}
                            </span>
                            <span
                              className={`font-caption-marginalia text-caption-marginalia px-1.5 rounded ${
                                item.tagType === 'audio'
                                  ? 'text-primary bg-primary/10'
                                  : item.tagType === 'posture'
                                  ? 'text-tertiary-container bg-tertiary-fixed/40'
                                  : 'text-secondary bg-secondary/10'
                              }`}
                            >
                              {item.tag}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 font-body-prose-sm text-body-prose-sm flex-wrap">
                            <span className="text-outline line-through">"{item.original}"</span>
                            <span className="material-symbols-outlined text-[14px] text-outline">
                              arrow_forward
                            </span>
                            <span className="text-secondary font-semibold">"{item.refined}"</span>
                          </div>
                          <p className="font-caption-marginalia text-caption-marginalia text-outline mt-1">
                            析义：{item.explanation}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                        <button
                          onClick={() => discardDiffItem(item.id)}
                          className="px-3 py-1 rounded-lg font-label-ui text-label-ui text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                          type="button"
                        >
                          舍弃
                        </button>
                        <button
                          onClick={() => acceptDiffItem(item.id)}
                          className={`px-3 py-1 rounded-lg font-label-ui text-label-ui shadow-xs transition-all flex items-center gap-1 cursor-pointer ${
                            isAccepted
                              ? 'bg-secondary text-white font-medium'
                              : 'bg-secondary text-white hover:opacity-90'
                          }`}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isAccepted ? 'done' : 'check'}
                          </span>
                          {isAccepted ? '已采纳' : '接受'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Omnipresent Decision Bar */}
              <div className="sticky bottom-4 z-30 bg-surface/95 dark:bg-[#1E1F24]/95 backdrop-blur-xl p-3 rounded-xl shadow-[0_12px_32px_-4px_rgba(43,42,40,0.12)] border border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className={`px-4 py-2.5 rounded-lg font-headline-sm text-headline-sm shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                      allAccepted
                        ? 'bg-secondary text-white font-semibold'
                        : 'bg-primary hover:bg-primary-container text-white'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                    <span>{allAccepted ? '润色已全部合并入稿' : '全部采纳润色 (⌘↵)'}</span>
                  </button>
                  <button
                    onClick={() => showToast('已自动逐句智能对齐拼接')}
                    className="px-3.5 py-2.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-colors flex items-center gap-1 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">call_merge</span>
                    <span>逐句智能拼接</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCycleMetaphor}
                    className="px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container dark:hover:bg-white/10 transition-colors font-label-ui text-label-ui flex items-center gap-1 cursor-pointer"
                    title="更换另一组古典隐喻词库"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">cycle</span>
                    <span>换个隐喻重成</span>
                  </button>
                  <button
                    onClick={() => {
                      setCandidateDraft(3);
                      showToast('已载入方案三：唐宋绝句体势');
                    }}
                    className="px-3 py-2 rounded-lg text-secondary hover:bg-secondary-container/40 transition-colors font-label-ui text-label-ui flex items-center gap-1 cursor-pointer"
                    title="对比备选方案三"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                    <span>对比方案三</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Classical Scholarly Inspector & Literary Lore (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Classical Lore & Allusion Card */}
              <div className="bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-xs flex flex-col gap-3 border border-outline-variant/30 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary-container text-[18px]">
                      menu_book
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      典故与化用出处
                    </span>
                  </div>
                  <span className="font-label-ui-sm text-label-ui-sm text-tertiary-container bg-tertiary-fixed/60 px-2 py-0.5 rounded">
                    溯源度 94%
                  </span>
                </div>

                {/* Allusion 1: Shen Fu Six Records */}
                <div className="bg-surface dark:bg-[#25262C] rounded-lg p-3 shadow-xs flex flex-col gap-1 border-l-2 border-tertiary-container border-y border-r border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-title-editorial text-title-editorial text-on-surface font-medium">
                      《浮生六记》卷二 · 闲情记趣
                    </span>
                    <span className="font-caption-marginalia text-caption-marginalia text-outline">
                      沈复
                    </span>
                  </div>
                  <p className="font-caption-marginalia text-caption-marginalia text-on-surface-variant dark:text-white/80 italic leading-relaxed">
                    “夏蚊成群，项为之强……又如秋雨敲窗，或听芭蕉碎玉，独酌数杯，便有凌云萧散之意。”
                  </p>
                  <div className="pt-1 flex items-center justify-between text-outline font-label-ui-sm text-label-ui-sm">
                    <span>关联修辞: 碎玉 · 芭蕉</span>
                    <button
                      onClick={() => navigateTo('knowledge-lore-research')}
                      className="text-tertiary-container hover:underline cursor-pointer"
                      type="button"
                    >
                      调阅原文上下文
                    </button>
                  </div>
                </div>

                {/* Allusion 2: Wen Zhenheng */}
                <div className="bg-surface dark:bg-[#25262C] rounded-lg p-3 shadow-xs flex flex-col gap-1 border-l-2 border-secondary border-y border-r border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-title-editorial text-title-editorial text-on-surface font-medium">
                      《长物志》卷十 · 位置
                    </span>
                    <span className="font-caption-marginalia text-caption-marginalia text-outline">
                      文震亨
                    </span>
                  </div>
                  <p className="font-caption-marginalia text-caption-marginalia text-on-surface-variant dark:text-white/80 italic leading-relaxed">
                    “斋中虽狭，当置天然几一，设笔研、水注、香奁于上，晴窗坐对，远峰横翠。”
                  </p>
                  <div className="pt-1 flex items-center justify-between text-outline font-label-ui-sm text-label-ui-sm">
                    <span>关联意境: 晴窗独坐 · 远山烟岚</span>
                    <button
                      onClick={() => {
                        addCitation('《长物志》斋中置天然几考', '案头意象注入');
                        showToast('已注入案头意象至附注');
                      }}
                      className="text-secondary hover:underline cursor-pointer"
                      type="button"
                    >
                      注入案头意象
                    </button>
                  </div>
                </div>
              </div>

              {/* Meter / Rhythm & Phonology Matrix */}
              <div className="bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-xs flex flex-col gap-3 border border-outline-variant/30 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      equalizer
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                      音节抑扬与韵律感
                    </span>
                  </div>
                  <span className="font-label-ui-sm text-label-ui-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
                    律动平顺
                  </span>
                </div>
                <div className="bg-surface dark:bg-[#25262C] rounded-lg p-3 flex flex-col gap-2 border border-outline-variant/20">
                  <div className="flex justify-between items-center font-caption-marginalia text-caption-marginalia text-on-surface-variant">
                    <span>声调交错 (平平仄仄):</span>
                    <span className="text-secondary font-medium">88% 优良声律平衡</span>
                  </div>
                  <div className="flex items-center gap-1 w-full h-3">
                    <div className="h-full bg-secondary/80 rounded-xs flex-1" title="平声 (舒缓延伸)" />
                    <div className="h-full bg-primary/70 rounded-xs flex-1" title="仄声 (停顿转折)" />
                    <div className="h-full bg-secondary/80 rounded-xs flex-1" title="平声 (舒缓延伸)" />
                    <div className="h-full bg-secondary/60 rounded-xs flex-1" title="平声 (舒缓延伸)" />
                    <div className="h-full bg-primary/80 rounded-xs flex-1" title="仄声 (急促点题)" />
                    <div className="h-full bg-primary/60 rounded-xs flex-1" title="仄声" />
                    <div className="h-full bg-secondary/90 rounded-xs flex-1" title="平声押尾 (收束空灵)" />
                  </div>
                  <div className="flex justify-between font-label-ui-sm text-label-ui-sm text-outline mt-1 font-mono">
                    <span>句首: 骤(仄) 雨(仄) 初(平)</span>
                    <span>句末尾调: 香(平 - 悠长)</span>
                  </div>
                </div>
                <p className="font-caption-marginalia text-caption-marginalia text-outline leading-relaxed">
                  朗诵评估：原句尾音“暗”字入去声下坠，新句落入“香”字（阳平），读感自压抑收摄转为开阔回甘。
                </p>
              </div>

              {/* Semantic Cohesion & Style Radar */}
              <div className="bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-xs flex flex-col gap-3 border border-outline-variant/30 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                    多维文气评分
                  </span>
                  <span className="material-symbols-outlined text-outline text-[16px]">info</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-surface dark:bg-[#25262C] p-2.5 rounded-lg flex flex-col border border-outline-variant/20">
                    <span className="font-caption-marginalia text-caption-marginalia text-outline">
                      文气凝聚力
                    </span>
                    <span className="font-headline-md text-headline-md text-primary font-semibold mt-1">
                      96<span className="font-label-ui text-label-ui text-outline">/100</span>
                    </span>
                    <span className="font-label-ui-sm text-label-ui-sm text-secondary flex items-center gap-0.5 mt-0.5">
                      <span className="material-symbols-outlined text-[12px]">trending_up</span>
                      提升 34%
                    </span>
                  </div>
                  <div className="bg-surface dark:bg-[#25262C] p-2.5 rounded-lg flex flex-col border border-outline-variant/20">
                    <span className="font-caption-marginalia text-caption-marginalia text-outline">
                      意象稠密度
                    </span>
                    <span className="font-headline-md text-headline-md text-secondary font-semibold mt-1">
                      4.2<span className="font-label-ui text-label-ui text-outline">/5.0</span>
                    </span>
                    <span className="font-label-ui-sm text-label-ui-sm text-outline mt-0.5">
                      疏密适中
                    </span>
                  </div>
                </div>
                <div className="bg-surface dark:bg-[#25262C] rounded-lg p-3 flex items-center gap-3 border border-outline-variant/20">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-editorial text-title-editorial text-on-surface font-medium">
                      文风守恒监测
                    </span>
                    <span className="font-caption-marginalia text-caption-marginalia text-outline">
                      与卷三全书前18,000字词频特征拟合度高达 91.8%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
