import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Sidebar } from '../components/Sidebar';

export const KnowledgeLoreResearch: React.FC = () => {
  const {
    navigateTo,
    showToast,
    citationDrawerOpen,
    setCitationDrawerOpen,
    citations,
    addCitation,
    removeCitation,
  } = useStudio();

  const [activeView, setActiveView] = useState<'cards' | 'graph' | 'timeline'>('cards');
  const [selectedNode, setSelectedNode] = useState<{
    name: string;
    role: string;
    chapters: string;
    cardsCount: number;
  }>({
    name: '松石老人',
    role: '传记主角',
    chapters: '第1、3、7章',
    cardsCount: 5,
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCiteFormat, setActiveCiteFormat] = useState('双行夹注 (传统)');

  const nodes = [
    {
      id: 'n1',
      name: '南山草堂',
      subtitle: '地缘·绍兴',
      type: 'place',
      x: 120,
      y: 130,
      r: 34,
      stroke: '#33675f',
      chapters: '第1、2、5章',
      cardsCount: 4,
    },
    {
      id: 'n2',
      name: '松石老人',
      subtitle: '传记主角',
      type: 'character',
      x: 250,
      y: 140,
      r: 38,
      stroke: '#952f25',
      chapters: '第1、3、7章',
      cardsCount: 5,
    },
    {
      id: 'n3',
      name: '紫阳先生',
      subtitle: '隐逸名儒',
      type: 'character',
      x: 370,
      y: 240,
      r: 30,
      stroke: '#952f25',
      chapters: '第4、6章',
      cardsCount: 3,
    },
    {
      id: 'n4',
      name: '暴雨之夜',
      subtitle: '崇祯十五秋',
      type: 'event',
      x: 150,
      y: 330,
      r: 32,
      stroke: '#81672f',
      chapters: '第3章',
      cardsCount: 2,
    },
    {
      id: 'n5',
      name: '残卷散佚',
      subtitle: '文书失传',
      type: 'item',
      x: 320,
      y: 340,
      r: 32,
      stroke: '#81672f',
      chapters: '第7、8章',
      cardsCount: 3,
    },
  ];

  const handleInsertCite = (quote: string, context: string) => {
    addCitation(quote, context);
    setCitationDrawerOpen(true);
  };

  return (
    <div className="flex flex-1 overflow-hidden relative w-full h-[calc(100vh-44px-36px)]">
      {/* Sidebar Binder */}
      <Sidebar />

      {/* Main Knowledge Workspace */}
      <main className="flex-1 overflow-y-auto bg-background transition-colors pb-16">
        <div className="flex flex-col w-full">
          {/* Top Context Header Bar */}
          <div className="px-6 pt-5 pb-4 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/30 dark:border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-surface-container dark:bg-white/10 px-3 py-1.5 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  account_tree
                </span>
                <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                  资料库 · 《南山纪事》全宗考据
                </span>
                <span className="font-caption-marginalia text-caption-marginalia px-2 py-0.5 rounded-full bg-surface-container-high dark:bg-white/10 text-on-surface-variant dark:text-white/70">
                  共 42 卷册 / 129 节点
                </span>
              </div>

              {/* View Switcher buttons with exact IDs */}
              <div className="flex items-center bg-surface-container-high/60 dark:bg-white/10 p-1 rounded-lg shadow-inner">
                <button
                  id="viewBtnCards"
                  onClick={() => {
                    setActiveView('cards');
                    showToast('视图已切换至：卡片流与双生图谱');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 font-label-ui text-label-ui rounded-md transition-all cursor-pointer ${
                    activeView === 'cards'
                      ? 'bg-surface-container-lowest dark:bg-[#25262C] text-on-surface shadow-sm font-medium'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    grid_view
                  </span>
                  <span>卡片流与双生图谱</span>
                </button>
                <button
                  id="viewBtnGraph"
                  onClick={() => {
                    setActiveView('graph');
                    showToast('视图已切换至：全屏脉络图');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 font-label-ui text-label-ui rounded-md transition-all cursor-pointer ${
                    activeView === 'graph'
                      ? 'bg-surface-container-lowest dark:bg-[#25262C] text-on-surface shadow-sm font-medium'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">hub</span>
                  <span>全屏脉络图</span>
                </button>
                <button
                  id="viewBtnTimeline"
                  onClick={() => {
                    setActiveView('timeline');
                    showToast('视图已切换至：纪年时序轴');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 font-label-ui text-label-ui rounded-md transition-all cursor-pointer ${
                    activeView === 'timeline'
                      ? 'bg-surface-container-lowest dark:bg-[#25262C] text-on-surface shadow-sm font-medium'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">history_edu</span>
                  <span>纪年时序轴</span>
                </button>
              </div>
            </div>

            {/* Global Quick Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => showToast('已调起本地古籍 PDF/EPUB 文献解析器')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  add_link
                </span>
                <span>导入古籍/文献</span>
              </button>

              <button
                onClick={() => {
                  addCitation('“山岚如素绢漫卷南峦，天与青石俱冷”', '由正文第三段拾取');
                  showToast('已从正文第3段拾取意象至卡片库');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  content_paste_search
                </span>
                <span>从正文拾取</span>
              </button>

              <button
                onClick={() => showToast('AI 正在依据全卷提取高频人际关系与地缘网络...')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-white font-label-ui text-label-ui shadow-sm transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>AI 拓扑提炼</span>
              </button>

              <button
                id="toggleDrawerBtn"
                onClick={() => setCitationDrawerOpen(!citationDrawerOpen)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white hover:bg-primary-container font-label-ui text-label-ui shadow-sm transition-all active:scale-95 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">format_quote</span>
                <span>引用与小注抽屉</span>
                <span className="bg-white/20 text-white font-caption-marginalia text-caption-marginalia rounded-full px-1.5 py-0.2">
                  {citations.length}
                </span>
              </button>
            </div>
          </div>

          {/* Main Content Stage: Split Grid */}
          <div className="px-6 py-6 grid grid-cols-12 gap-6 items-start">
            {/* LEFT SUB-PANEL: Visual Knowledge Graph (4 Cols or 12 Cols in graph mode) */}
            <section
              className={`${
                activeView === 'graph' ? 'col-span-12' : 'col-span-12 xl:col-span-4'
              } bg-surface-container-lowest dark:bg-[#25262C] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-4 border border-outline-variant/30 dark:border-white/10`}
            >
              {/* Watermark Rice Paper Seal Motif */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-2 border-primary/10 flex items-center justify-center pointer-events-none select-none">
                <span className="font-title-editorial text-title-editorial text-primary/15 [writing-mode:vertical-rl] tracking-widest">
                  南山考据图谱
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    核心意象与人物拓扑
                  </span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant font-caption-marginalia text-caption-marginalia">
                  <span
                    onClick={() => showToast('图谱视角已放大')}
                    className="cursor-pointer hover:text-primary transition-colors"
                  >
                    放大
                  </span>
                  <span>·</span>
                  <span
                    onClick={() => showToast('已重置重心至松石老人')}
                    className="cursor-pointer hover:text-primary transition-colors"
                  >
                    重置重心
                  </span>
                </div>
              </div>

              {/* Node Graph Legend */}
              <div className="flex flex-wrap items-center gap-2 py-1.5 px-3 bg-surface-container dark:bg-white/5 rounded-lg text-xs">
                <div className="flex items-center gap-1 font-caption-marginalia text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  人物
                </div>
                <div className="flex items-center gap-1 font-caption-marginalia text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
                  地缘与居所
                </div>
                <div className="flex items-center gap-1 font-caption-marginalia text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container inline-block" />
                  关键劫变
                </div>
              </div>

              {/* Interactive SVG Graph Container */}
              <div
                className={`w-full ${
                  activeView === 'graph' ? 'h-[620px]' : 'h-[460px]'
                } bg-surface-container-low dark:bg-white/5 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner`}
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 460 460"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient cx="50%" cy="50%" id="nodeGradPrimary" r="50%">
                      <stop offset="0%" stopColor="#FAF7F2" />
                      <stop offset="100%" stopColor="#F1EDEA" />
                    </radialGradient>
                    <marker
                      id="arrow"
                      markerHeight="6"
                      markerWidth="6"
                      orient="auto-start-reverse"
                      refX="22"
                      refY="5"
                      viewBox="0 0 10 10"
                    >
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#8a716e" opacity="0.6" />
                    </marker>
                  </defs>

                  {/* Connecting Curved Lines */}
                  {/* 1. 南山草堂 -> 松石老人 */}
                  <path
                    d="M 120,130 C 170,110 200,160 250,140"
                    fill="none"
                    stroke="#dec0bb"
                    strokeDasharray="3,3"
                    strokeWidth="1.8"
                  />
                  <text
                    className="font-caption-marginalia text-[10px] fill-outline"
                    textAnchor="middle"
                    x="180"
                    y="125"
                  >
                    卜居修憩
                  </text>

                  {/* 2. 松石老人 -> 紫阳先生 */}
                  <path
                    d="M 250,140 C 310,130 350,180 370,240"
                    fill="none"
                    markerEnd="url(#arrow)"
                    stroke="#952f25"
                    strokeWidth="2"
                  />
                  <text
                    className="font-caption-marginalia text-[10px] fill-primary"
                    textAnchor="middle"
                    x="330"
                    y="180"
                  >
                    再传师承
                  </text>

                  {/* 3. 暴雨之夜 -> 残卷散佚 */}
                  <path
                    d="M 150,330 C 210,360 270,360 320,340"
                    fill="none"
                    markerEnd="url(#arrow)"
                    stroke="#81672f"
                    strokeWidth="2"
                  />
                  <text
                    className="font-caption-marginalia text-[10px] fill-tertiary-container"
                    textAnchor="middle"
                    x="235"
                    y="365"
                  >
                    直接诱因
                  </text>

                  {/* 4. 松石老人 -> 暴雨之夜 */}
                  <path
                    d="M 250,140 C 230,220 180,260 150,330"
                    fill="none"
                    stroke="#dec0bb"
                    strokeWidth="1.5"
                  />
                  <text
                    className="font-caption-marginalia text-[10px] fill-outline"
                    textAnchor="middle"
                    x="180"
                    y="240"
                  >
                    亲历避难
                  </text>

                  {/* 5. 残卷散佚 -> 南山草堂 */}
                  <path
                    d="M 320,340 C 280,250 140,220 120,130"
                    fill="none"
                    stroke="#33675f"
                    strokeDasharray="4,2"
                    strokeWidth="1.5"
                  />
                  <text
                    className="font-caption-marginalia text-[10px] fill-secondary"
                    textAnchor="middle"
                    x="200"
                    y="275"
                  >
                    藏本流传
                  </text>

                  {/* Interactive Nodes */}
                  {nodes.map((n) => {
                    const isSelected = selectedNode.name === n.name;
                    return (
                      <g
                        key={n.id}
                        className="cursor-pointer group"
                        transform={`translate(${n.x}, ${n.y})`}
                        onClick={() => {
                          setSelectedNode({
                            name: n.name,
                            role: n.subtitle,
                            chapters: n.chapters,
                            cardsCount: n.cardsCount,
                          });
                          showToast(`已聚焦节点：${n.name}`);
                        }}
                      >
                        <circle
                          r={n.r}
                          fill={isSelected ? '#FAF7F2' : 'url(#nodeGradPrimary)'}
                          stroke={n.stroke}
                          strokeWidth={isSelected ? 3.5 : 2}
                          className="group-hover:scale-105 transition-transform"
                        />
                        <text
                          className="font-title-editorial text-[13px] fill-on-surface font-semibold"
                          dy="-2"
                          textAnchor="middle"
                        >
                          {n.name}
                        </text>
                        <text
                          className="font-caption-marginalia text-[9px] fill-outline"
                          dy="14"
                          textAnchor="middle"
                        >
                          {n.subtitle}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Dynamic Focus Overlay on Node */}
                <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/95 dark:bg-[#1E1F24]/95 backdrop-blur-md p-3 rounded-xl shadow-md flex items-center justify-between border border-outline-variant/30">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">
                      <span className="material-symbols-outlined text-[18px]">person_pin</span>
                    </span>
                    <div>
                      <p className="font-title-editorial text-title-editorial text-on-surface leading-snug font-medium">
                        当前聚焦：{selectedNode.name}
                      </p>
                      <p className="font-caption-marginalia text-caption-marginalia text-outline">
                        出场：{selectedNode.chapters} | 关联考据卡片 {selectedNode.cardsCount} 枚
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`已展开【${selectedNode.name}】全本行迹传记志`)}
                    className="px-3 py-1 bg-surface-container dark:bg-white/10 hover:bg-surface-container-high rounded text-on-surface font-label-ui-sm text-label-ui-sm transition-colors cursor-pointer"
                    type="button"
                  >
                    展开人物志
                  </button>
                </div>
              </div>

              {/* Quick Graph Filters */}
              <div className="flex items-center justify-between pt-1 font-caption-marginalia text-caption-marginalia text-outline">
                <span>聚类算法: 仿射引力引擎 (Force Atlas 2)</span>
                <button
                  onClick={() => showToast('已导出 300DPI 矢量知识拓扑图 (SVG/PDF)')}
                  className="text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                  type="button"
                >
                  <span>导出为高清矢量图</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </button>
              </div>
            </section>

            {/* RIGHT SUB-PANEL: Card Deck (8 Cols Grid) */}
            {activeView !== 'graph' && (
              <section className="col-span-12 xl:col-span-8 flex flex-col gap-4">
                {/* Search and Filter Bar */}
                <div className="bg-surface-container-lowest dark:bg-[#25262C] p-3 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-3 border border-outline-variant/30 dark:border-white/10">
                  <div className="flex items-center gap-2 flex-1 min-w-[220px] bg-surface-container-low dark:bg-white/10 px-3 py-1.5 rounded-xl">
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      search
                    </span>
                    <input
                      className="bg-transparent border-none outline-none font-body-prose-sm text-body-prose-sm text-on-surface placeholder:text-outline w-full"
                      placeholder="搜索文献摘录、时空考据、物候风物..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-caption-marginalia text-caption-marginalia text-on-surface-variant">
                      类目分类:
                    </span>
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={`px-3 py-1 rounded-full font-label-ui-sm text-label-ui-sm cursor-pointer transition-all ${
                        activeCategory === 'all'
                          ? 'bg-primary-container text-white shadow-xs'
                          : 'bg-surface-container dark:bg-white/10 text-on-surface-variant'
                      }`}
                      type="button"
                    >
                      全部 (18)
                    </button>
                    <button
                      onClick={() => setActiveCategory('ancient')}
                      className={`px-3 py-1 rounded-full font-label-ui-sm text-label-ui-sm cursor-pointer transition-all ${
                        activeCategory === 'ancient'
                          ? 'bg-primary-container text-white shadow-xs'
                          : 'bg-surface-container dark:bg-white/10 text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                      type="button"
                    >
                      古籍考据
                    </button>
                    <button
                      onClick={() => setActiveCategory('nature')}
                      className={`px-3 py-1 rounded-full font-label-ui-sm text-label-ui-sm cursor-pointer transition-all ${
                        activeCategory === 'nature'
                          ? 'bg-primary-container text-white shadow-xs'
                          : 'bg-surface-container dark:bg-white/10 text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                      type="button"
                    >
                      草木物候
                    </button>
                    <button
                      onClick={() => setActiveCategory('military')}
                      className={`px-3 py-1 rounded-full font-label-ui-sm text-label-ui-sm cursor-pointer transition-all ${
                        activeCategory === 'military'
                          ? 'bg-primary-container text-white shadow-xs'
                          : 'bg-surface-container dark:bg-white/10 text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                      type="button"
                    >
                      舆图战役
                    </button>
                    <button
                      onClick={() => setActiveCategory('colors')}
                      className={`px-3 py-1 rounded-full font-label-ui-sm text-label-ui-sm cursor-pointer transition-all ${
                        activeCategory === 'colors'
                          ? 'bg-primary-container text-white shadow-xs'
                          : 'bg-surface-container dark:bg-white/10 text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                      type="button"
                    >
                      视觉色谱
                    </button>
                  </div>
                </div>

                {/* Bento Cards Grid (2x2) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: 史料古籍 */}
                  <article className="bg-surface-container-lowest dark:bg-[#25262C] p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group border border-outline-variant/30 dark:border-white/10">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed-variant font-label-ui-sm text-label-ui-sm">
                          <span className="material-symbols-outlined text-[14px]">menu_book</span>
                          史料古籍
                        </span>
                        <span className="font-caption-marginalia text-caption-marginalia text-outline">
                          明万历四十二年刻本
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-medium">
                        《江南通志·山水考》卷十七节录
                      </h3>
                      <div className="flex gap-3 items-start bg-surface-container-low dark:bg-white/5 p-2 rounded-xl">
                        <img
                          className="w-20 h-24 object-cover rounded-lg shadow-sm flex-shrink-0"
                          alt="Antique Chinese woodblock printed book"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaipG-bkrsMl1HRH4BlrW3W1_akjeeksvpi9oXnSwIJDj0TT38BVazao065VyNXtixfwQjg_MxD8CfA6wpMtdnB9MOdKQbAWTeL-UiNC5ISfjBKnThYLzzvo8MFa0rLIsO2eDiSvjbg3BnBglZMzry5DObEmTLpep80zbXXvmY30Bepsb-IdBNlHqQhsUVFSzJnaolLmFP5pnFbapvLivF6gRZo8BJ6afsot709F3J7pNF2nAvt_TY"
                        />
                        <div className="flex flex-col gap-1 min-w-0">
                          <p className="font-caption-marginalia text-caption-marginalia text-on-surface-variant dark:text-white/80 italic line-clamp-3">
                            “南山者，俯瞰镜湖，积翠万叠。永乐间有隐君子构舍于绝顶，风雨晦暝，常闻长啸之声……”
                          </p>
                          <div className="text-outline font-caption-marginalia text-[11px]">
                            经藏号: 经部·别集类·302
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container dark:bg-white/5 p-2 rounded-lg flex flex-col gap-1">
                        <div className="flex items-center gap-1 font-caption-marginalia text-secondary font-medium">
                          <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                          <span>AI 提炼要素</span>
                        </div>
                        <ul className="font-caption-marginalia text-[12px] text-on-surface-variant dark:text-white/70 list-disc list-inside leading-relaxed">
                          <li>辨明草堂方位在“镜湖西峰北麓”</li>
                          <li>隐君子特征：深谙天文，善辨山泉水汽</li>
                          <li>永乐至天启两百年间共有三次修葺记载</li>
                        </ul>
                      </div>
                    </div>
                    <div className="pt-3 flex items-center justify-between border-t border-surface-container dark:border-white/10 mt-3">
                      <span className="font-caption-marginalia text-caption-marginalia text-outline">
                        已在正文引用 2 次
                      </span>
                      <button
                        onClick={() =>
                          handleInsertCite(
                            '《江南通志·山水考》卷十七，清乾隆修《四库全书》本。',
                            '南山草堂位置考'
                          )
                        }
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-primary hover:text-white text-on-surface font-label-ui-sm text-label-ui-sm transition-all shadow-xs cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">add_notes</span>
                        <span>作为尾注插入</span>
                      </button>
                    </div>
                  </article>

                  {/* Card 2: 人物小传 & 茶事辨味 */}
                  <article className="bg-surface-container-lowest dark:bg-[#25262C] p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group border border-outline-variant/30 dark:border-white/10">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed-variant font-label-ui-sm text-label-ui-sm">
                          <span className="material-symbols-outlined text-[14px]">local_cafe</span>
                          人物行迹 · 物候
                        </span>
                        <div className="flex gap-1">
                          <span className="px-1.5 py-0.5 rounded bg-surface-container dark:bg-white/10 font-caption-marginalia text-[11px] text-outline">
                            #物候
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-container dark:bg-white/10 font-caption-marginalia text-[11px] text-outline">
                            #茶事
                          </span>
                        </div>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors font-medium">
                        陆羽《茶经》煎水辨味法与山泉考
                      </h3>
                      <p className="font-body-prose-sm text-body-prose-sm text-on-surface-variant dark:text-white/80 leading-relaxed">
                        松石老人在第三章调水试茶，所执“山水上、江水中、井水下”准则，取自惠山泉第二泉脉。其提梁砂铫火候至“如涌泉连珠”为二沸。
                      </p>
                      <div className="rounded-xl overflow-hidden relative h-28 bg-surface-container">
                        <img
                          className="w-full h-full object-cover"
                          alt="Chinese ceramic teacup and celadon glaze"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1eh_3I3h9rt-oJ4Fly8PcnEuMXRTcjXjnV1n-U71UUQTspr-PmmpBeCn7dkG0p_QVGwHvO1bknQsPao8Mdoy0g8hr0s3p_XkwXwSt28SRpQUZV8OH20GGqvnmPyqbaZl2erlINabZG7LSJBoGHLXEFklTSasXE13DsjA7eXJFI_z1Oqdo2Gsim0jsxE0cr6_5EbA4JklBVT-ew8kdc3s7UUkbmUuEqKKYiD-iXHOXDHVIDMaV8JG5"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                          <span className="text-white font-caption-marginalia text-[11px]">
                            宋代青瓷建盏与紫砂铫器型比照图录
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-outline font-caption-marginalia text-[12px] pt-1">
                        <span>关联章节：第3章《松窗石乳试新茶》</span>
                        <span className="text-secondary font-medium">高频匹配</span>
                      </div>
                    </div>
                    <div className="pt-3 flex items-center justify-between border-t border-surface-container dark:border-white/10 mt-3">
                      <button
                        onClick={() => showToast('已关联该考据至第3回')}
                        className="text-outline hover:text-on-surface font-caption-marginalia text-caption-marginalia flex items-center gap-1 cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">share</span>
                        关联关系
                      </button>
                      <button
                        onClick={() =>
                          handleInsertCite(
                            '参陆羽《茶经·五之煮》：“其水，用山水上，江水中，井水下。”',
                            '煎水试茶双行夹注'
                          )
                        }
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-secondary hover:text-white text-on-surface font-label-ui-sm text-label-ui-sm transition-all shadow-xs cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">add_notes</span>
                        <span>插入双行夹注</span>
                      </button>
                    </div>
                  </article>

                  {/* Card 3: 时序考据 */}
                  <article className="bg-surface-container-lowest dark:bg-[#25262C] p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group border border-outline-variant/30 dark:border-white/10">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-ui-sm text-label-ui-sm">
                          <span className="material-symbols-outlined text-[14px]">timeline</span>
                          时序与地理考据
                        </span>
                        <span className="font-caption-marginalia text-caption-marginalia text-outline">
                          明崇祯末年·南直隶
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-tertiary transition-colors font-medium">
                        明清易代太湖水师驻泊与荻塘暗道
                      </h3>
                      <div className="bg-surface-container-low dark:bg-white/5 p-3 rounded-xl flex flex-col gap-2">
                        <div className="flex items-center justify-between font-caption-marginalia text-caption-marginalia text-on-surface">
                          <span className="font-medium text-tertiary">崇祯十五年 (1642)</span>
                          <span className="text-outline">太湖大旱，河床沙洲见底</span>
                        </div>
                        <div className="w-full bg-surface-container-highest dark:bg-white/10 h-1 rounded-full overflow-hidden">
                          <div className="bg-tertiary h-full rounded-full" style={{ width: '45%' }} />
                        </div>
                        <div className="flex items-center justify-between font-caption-marginalia text-caption-marginalia text-on-surface pt-1">
                          <span className="font-medium text-primary">崇祯十七年 (1644)</span>
                          <span className="text-outline">甲申国变，水寨义师南渡</span>
                        </div>
                        <div className="w-full bg-surface-container-highest dark:bg-white/10 h-1 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                      <p className="font-caption-marginalia text-caption-marginalia text-on-surface-variant dark:text-white/80 leading-relaxed">
                        水道实测：自吴江直下震泽，避过官卡巡检所，仅有此三尺狭港。小说中主角夜行乘扁舟即由此撤离。
                      </p>
                    </div>
                    <div className="pt-3 flex items-center justify-between border-t border-surface-container dark:border-white/10 mt-3">
                      <span className="font-caption-marginalia text-caption-marginalia text-outline font-mono">
                        经纬: 31°12'N 120°34'E
                      </span>
                      <button
                        onClick={() =>
                          handleInsertCite(
                            '《明季南略》卷四：“震泽风急，客舶皆泊荻塘以待明发。”',
                            '荻塘暗道考'
                          )
                        }
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-tertiary hover:text-white text-on-surface font-label-ui-sm text-label-ui-sm transition-all shadow-xs cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">add_notes</span>
                        <span>引入正文</span>
                      </button>
                    </div>
                  </article>

                  {/* Card 4: 意象视觉与色卡采集 */}
                  <article className="bg-surface-container-lowest dark:bg-[#25262C] p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group border border-outline-variant/30 dark:border-white/10">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-high dark:bg-white/10 text-on-surface font-label-ui-sm text-label-ui-sm">
                          <span className="material-symbols-outlined text-[14px]">palette</span>
                          意象与色彩采集
                        </span>
                        <span className="font-caption-marginalia text-caption-marginalia text-outline">
                          现场采风采辑
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors font-medium">
                        雨后古刹灰瓦、滴水兽与阴生青苔
                      </h3>
                      <div className="h-32 rounded-xl overflow-hidden relative">
                        <img
                          className="w-full h-full object-cover"
                          alt="Ancient temple roof tiles and moss"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv8L2x-ij0i7Vp3DCTfjb7oo0oLyDpGubokoKh4jbXZh_GUwkoqYIhRFIhCyMRA25-GkM1wiymZ038M6b3Ahahn7WZTEEM6SUwt5cjKXNEEvdYbpscGG0a6BwrJm2OgW_mUMQXtDj90C06lev43VCp1a4_wa2t0a40H16Ng9Huv6uCtfhwYOhwGzIF1Q17r0r7L4h-xl2cCFUqKIVCmd3WhEct9qDjgccLEZ_IwFsK2m47KpR3l1yJ"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex-1 flex flex-col gap-1 items-center">
                          <div className="w-full h-7 rounded-md bg-[#3F4A3C] shadow-inner" />
                          <span className="font-caption-marginalia text-[10px] text-outline">
                            #3F4A3C 苔绿
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col gap-1 items-center">
                          <div className="w-full h-7 rounded-md bg-[#8C7B65] shadow-inner" />
                          <span className="font-caption-marginalia text-[10px] text-outline">
                            #8C7B65 檐褐
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col gap-1 items-center">
                          <div className="w-full h-7 rounded-md bg-[#D2C8B8] shadow-inner" />
                          <span className="font-caption-marginalia text-[10px] text-outline">
                            #D2C8B8 灰瓦
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col gap-1 items-center">
                          <div className="w-full h-7 rounded-md bg-[#952F25] shadow-inner" />
                          <span className="font-caption-marginalia text-[10px] text-outline">
                            #952F25 朱红印
                          </span>
                        </div>
                      </div>
                      <p className="font-caption-marginalia text-caption-marginalia text-on-surface-variant dark:text-white/80">
                        情调映射：用于卷三《冷雨听更》的环境描写，奠定宿命与萧索的灰调美学。
                      </p>
                    </div>
                    <div className="pt-3 flex items-center justify-between border-t border-surface-container dark:border-white/10 mt-3">
                      <span className="font-caption-marginalia text-caption-marginalia text-outline">
                        4 种传统色谱
                      </span>
                      <button
                        onClick={() =>
                          showToast('已复制：“苔绿与檐褐相映，宿雨初霁，瓦棱泛灰白微光”')
                        }
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface font-label-ui-sm text-label-ui-sm transition-all shadow-xs cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">colorize</span>
                        <span>复制文风描述词</span>
                      </button>
                    </div>
                  </article>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* SLIDE-OVER CITATION DRAWER */}
        <aside
          className={`fixed right-0 top-11 md:top-12 bottom-9 w-96 bg-surface-container-lowest/95 dark:bg-[#1C1D21]/95 backdrop-blur-2xl shadow-[-4px_0_24px_rgba(43,42,40,0.08)] z-40 transition-transform duration-300 ease-in-out flex flex-col justify-between border-l border-outline-variant/30 ${
            citationDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-surface-container-low dark:bg-white/5 flex flex-col gap-3 border-b border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  format_quote
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  卷三·引用与随堂注解
                </h2>
              </div>
              <button
                onClick={() => setCitationDrawerOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-surface-container-highest dark:hover:bg-white/10 flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            {/* Format Selector */}
            <div className="flex flex-col gap-1">
              <span className="font-caption-marginalia text-[11px] text-outline uppercase tracking-wider">
                排版文献注式：
              </span>
              <div className="grid grid-cols-2 gap-1 bg-surface-container dark:bg-white/5 p-1 rounded-lg">
                {[
                  '双行夹注 (传统)',
                  'GB/T 7714 国标',
                  '芝加哥风 (Chicago)',
                  '文人眉批散记',
                ].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setActiveCiteFormat(fmt)}
                    className={`px-2 py-1 text-center rounded font-label-ui-sm text-label-ui-sm transition-all cursor-pointer ${
                      activeCiteFormat === fmt
                        ? 'bg-surface-container-lowest dark:bg-[#25262C] text-primary font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footnote Items List */}
          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
            <div className="flex items-center justify-between text-outline font-caption-marginalia text-caption-marginalia pb-1">
              <span>当前章节激活 ({citations.length} 条)</span>
              <span
                onClick={() => showToast('已按照自然段顺序重排引注序号')}
                className="text-secondary cursor-pointer hover:underline"
              >
                一键重排序号
              </span>
            </div>

            {citations.map((c, idx) => (
              <div
                key={c.id}
                className="bg-surface-container-low dark:bg-white/5 hover:bg-surface-container dark:hover:bg-white/10 p-3 rounded-xl transition-colors flex flex-col gap-1 relative group border border-outline-variant/20"
              >
                <div className="flex items-center justify-between">
                  <span className="font-caption-marginalia text-caption-marginalia text-primary font-bold">
                    [注 {idx + 1}]
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <span
                      onClick={() => showToast(`正在编辑第 ${idx + 1} 条引注内容`)}
                      className="material-symbols-outlined text-[14px] text-outline hover:text-primary cursor-pointer"
                    >
                      edit
                    </span>
                    <span
                      onClick={() => removeCitation(c.id)}
                      className="material-symbols-outlined text-[14px] text-outline hover:text-red-600 cursor-pointer"
                    >
                      delete
                    </span>
                  </div>
                </div>
                <p className="font-caption-marginalia text-caption-marginalia text-on-surface leading-snug">
                  {c.quote}
                </p>
                <span className="font-caption-marginalia text-[10px] text-outline">
                  {c.context}
                </span>
              </div>
            ))}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 bg-surface-container-low dark:bg-white/5 flex flex-col gap-2 border-t border-outline-variant/20">
            <button
              onClick={() => {
                showToast('已生成传统双行夹注并插至正文第 3 章光标处');
                setCitationDrawerOpen(false);
              }}
              className="w-full py-2 bg-primary text-white hover:bg-primary-container rounded-xl font-label-ui text-label-ui font-medium flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                drive_file_rename_outline
              </span>
              <span>一键插入当前光标处 (⌘I)</span>
            </button>
            <div className="flex items-center justify-between font-caption-marginalia text-caption-marginalia text-outline pt-1">
              <span>支持导出为 Markdown / LaTeX 尾注</span>
              <button
                onClick={() => showToast('已将全篇文献清单复制为 Markdown 脚注格式')}
                className="hover:text-primary underline cursor-pointer"
                type="button"
              >
                导出引用清单
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
