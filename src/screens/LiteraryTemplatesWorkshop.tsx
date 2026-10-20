import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Sidebar } from '../components/Sidebar';

export const LiteraryTemplatesWorkshop: React.FC = () => {
  const {
    navigateTo,
    sheetWidth,
    setSheetWidth,
    lineHeight,
    setLineHeight,
    proseTypeface,
    setProseTypeface,
    showToast,
  } = useStudio();

  const [activeCategory, setActiveCategory] = useState<'all' | 'prose' | 'poetry' | 'novel' | 'history'>('all');
  const [activeSort, setActiveSort] = useState<'elegance' | 'usage'>('elegance');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('江南水墨游记');
  const [previewContent, setPreviewContent] = useState(
    '水面清平如镜，扁舟过断桥，听两岸茶烟袅袅。昔人谓江左文华，非止于辞藻，亦在其烟水空明之态。执笔于斯，字句自敛锋芒，如印水之月。'
  );

  const categories = [
    { id: 'all', label: '全部', count: 28 },
    { id: 'prose', label: '散文与游记', count: 8 },
    { id: 'poetry', label: '古典与现代诗歌', count: 6 },
    { id: 'novel', label: '长中短篇小说', count: 9 },
    { id: 'history', label: '历史传记与考据', count: 5 },
  ];

  const templates = [
    {
      id: 't-1',
      category: 'prose',
      title: '江南水墨游记',
      genreTag: '散文与游记 · 热门',
      paperTone: '宣纸·行楷',
      feature: '节气物候批注条',
      width: '680px',
      badge: '典籍精选',
      badgeBg: 'bg-primary',
      coverBg: 'bg-[#f4f1ea]',
      coverImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBsmoyKtOiOc-qKAsPR3ohVTJK-5LCyyOZUpeE2Oe3Sab4c8c_sAM6sZCIEHnhHYQkPHaEB39EevnZlTm-LpJMHK_6eawld6vUg3s9aRgLJuhg6Bul9fCB4ytIZq26kt4fILB4BYrcnMHN36zbIMsYWAQL_ELskvSpCQCCc8YKEdLGAsPSLfKaFuuqPZwn4TXoVhv7_am7ldcQWxLqRGFLTFcAo4SAgdQNzGE0h0nYnpSocF3yWuFZ_',
      traits: [
        { icon: 'format_align_left', text: '段首自然缩进两字' },
        { icon: 'image', text: '图文穿插小品布局' },
        { icon: 'notes', text: '二十四节气随笔记' },
        { icon: 'local_florist', text: '行距 1.85x 舒朗留白' },
      ],
      quote:
        '「是日微雨，湖面凝脂如未裁之绢。泊舟于绿漪深处，听雨滴荷叶如敲棋子…」',
    },
    {
      id: 't-2',
      category: 'poetry',
      title: '凝露 · 极简诗草',
      genreTag: '古典与现代诗歌',
      paperTone: '声律 · 呼吸',
      feature: '平仄声韵声律器',
      width: '540px',
      badge: '声韵格律',
      badgeBg: 'bg-[#1e2229]',
      coverBg: 'bg-[#1e2229]',
      darkCover: true,
      coverImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9tby4yeJuo98AMSQXVvjKTiKcy_XFxsw6qHz4jv3_L3rP_GpzlxkMzH63RhOLVG5XF7iAo8LQaRlVYBdSkgabAHVbSovOj2e8jHBtKoEa_g-l6IfDov-cIVpyJ4kFbtNANBBTtW8ziCvOFuxy9CxLsMjtMJsxCl2_S1pYAKr1z8TmhjIwta9CeLp9XcbxiwiDpzbBOCiXPt_03TblF0I35fu5gSNb0TgcHSCD18zBzMp-fS6tRP5T',
      traits: [
        { icon: 'format_align_center', text: '天光与地脚大留白' },
        { icon: 'graphic_eq', text: '平仄检测与押韵律动' },
        { icon: 'air', text: '断句音律呼吸引导' },
        { icon: 'tune', text: '可切换直排诗简' },
      ],
      quote: '「在词语尚未凝结之前 / 冰封的群山已越过屋脊」',
    },
    {
      id: 't-3',
      category: 'novel',
      title: '九重渊 · 长卷叙事',
      genreTag: '长中短篇小说',
      paperTone: '宏篇小说',
      feature: '伏笔回收标记抽屉',
      width: '740px',
      badge: '大纲节拍',
      badgeBg: 'bg-[#3e2321]',
      coverBg: 'bg-[#3e2321]',
      darkCover: true,
      coverImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC69oPcYe0pqPrwu5D05_AQHo5_89M3KfID7D2b-wXlwU3MKNvucKBYfuFWYM6CuB5RzdjUUSfTU7LFhhJjLTL3SGI6YUs5ip6SWGN-Tor8CUopwebUVGLRDhfqmu90zZcBuejad6fnkynRVqpgcKJ2XaWCvBjB1IQrw2ggkJFguw_pG-5vcNJrm6Qe0gcMNfq5KV0jpCjMLdW6mx-e4Fok0DkhYRIe9BQGEkV2NTGCBrZVyvnQOa3A',
      traits: [
        { icon: 'badge', text: '人物小传与关系网' },
        { icon: 'timeline', text: '多线大纲时序节拍' },
        { icon: 'inventory_2', text: '未解伏笔追踪匣' },
        { icon: 'visibility_off', text: 'POV 视角切换提示器' },
      ],
      quote:
        '「第七夜子时，城门的铁锁被无声卸下。他握着信物，方知十年前留下的铜匙竟是对准此扇门。」',
    },
    {
      id: 't-4',
      category: 'history',
      title: '史海钩沉录',
      genreTag: '历史传记与考据',
      paperTone: '朱丝栏·双行小注',
      feature: '双栏史料并排考定',
      width: '800px',
      badge: '考据版刻',
      badgeBg: 'bg-[#81672f]',
      coverBg: 'bg-[#f2ede4]',
      coverImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDw4q8Vy6r02FiJWPvliHPnnbm4tDGOJhhsmk2UBd-AjAxlBa7v9tYOL2xC8cMux7xJro7Lsj0lyUL_OxTCboQghynuFlaJ8sTaw_nTm-jQC9bs6_mRY8gXWAYQWu7I52RbUhHanqqDWzrznvJichZ0UmT4tnCvaYvx5ldNbj15-xYRztTRaPapEsRcKfXCuZz3jb-HbsArjQYqCVxtPfneOdsv7gJNbIY_1D77ogCqxdgKbW2UPoZ4',
      traits: [
        { icon: 'view_column', text: '原文与按语双栏并置' },
        { icon: 'calendar_month', text: '纪年换算 (干支/年号/公元)' },
        { icon: 'format_quote', text: '芝加哥/国标引用模版' },
        { icon: 'fact_check', text: '孤证预警与旁证引索' },
      ],
      quote:
        '「按《元史·地理志》，该驿道立于至元十五年冬，而近世出土残碑载『天历初建』，二者相差达半世纪…」',
    },
    {
      id: 't-5',
      category: 'prose',
      title: '书肆冷香札记',
      genreTag: '书评札记与阅读录',
      paperTone: '读书会·辨章',
      feature: '双栏摘录金句对照',
      width: '680px',
      badge: '阅读札记',
      badgeBg: 'bg-[#664f19]',
      coverBg: 'bg-[#3d2e1e]',
      darkCover: true,
      coverImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAyktQ_e3BJ759Y04ds5Z2uUUXBF1f7FzOGJsxfkfyzE4JfbXK88GHYCVIVYe-rHihznj5kf9VNV537d0ZGtoXK-Sfnedjq77PICvYtZNAobvdZGmlbuknGWQog3oxeJaKltpBM-hPhYw9JY7sjLXYJrHKrf3SMDABK5l5TslwLmYWvTsnPdHMSwsK4xR9yb5TmqyYzTdvni2oEd5KiyHyLfRlA-z5cD0XeyDIIG6XesAQODi6GRCfv',
      traits: [
        { icon: 'menu_book', text: 'ISBN 与书目自动抓取' },
        { icon: 'splitscreen', text: '原文摘录与我思对照轨' },
        { icon: 'hotel_class', text: '五维心证量化评估卡' },
        { icon: 'share', text: '一键导出排印金句卡' },
      ],
      quote:
        '「读到第三章时，忽觉作者笔锋转入荒寒。书名虽为谈艺，底色实则是对流变时光的庄严挽留。」',
    },
    {
      id: 't-6',
      category: 'novel',
      title: '夜航奇谭札',
      genreTag: '志怪与寓言笔记',
      paperTone: '搜奇·短制',
      feature: '奇谈风物志图卡',
      width: '640px',
      badge: '志怪短制',
      badgeBg: 'bg-[#273834]',
      coverBg: 'bg-[#273834]',
      darkCover: true,
      coverImg:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDsxEk0UryR3IeM-F1stmcVzqJyUTfguWNv0QhC9rRF3P1GWH45PJiR4UbZxKJAn0jCRXJhwdgZ-WJYASSRU2mslBpq2HKRQCLGtkivfa0KxlGS8FbX45mkvCzA6jd1nhGYpeMxVA9jHNvR7J_RHLV7mPkAaRCOc-9qY9vecrwDisuHV1JvhvnXLKJrjJp_iZ1zbteMhi5V7UqdjFCEYYoGy3I_n7WIuAfCF9hizIpGY6QVgwnt8kvX',
      traits: [
        { icon: 'history_edu', text: '笔记体短篇目录树' },
        { icon: 'category', text: '妖怪与灵物图谱标签' },
        { icon: 'psychology', text: 'AI 意象联想激发器' },
        { icon: 'dark_mode', text: '夜航静心纸色自适应' },
      ],
      quote:
        '「青溪桥下旧有白黿，每当月晦风止，常化作老翁登岸求茶，所饮皆以松叶为酬…」',
    },
  ];

  const filteredTemplates = templates.filter(
    (t) => activeCategory === 'all' || t.category === activeCategory
  );

  const handleApplyTemplate = (title: string) => {
    showToast(`已应用【${title}】规制至主书斋`);
    navigateTo('main-writing-studio');
  };

  const handleOpenPreview = (tpl: (typeof templates)[0]) => {
    setPreviewTitle(tpl.title);
    setPreviewContent(tpl.quote.replace(/[「」]/g, ''));
    setPreviewModalOpen(true);
  };

  return (
    <div className="flex flex-1 overflow-hidden relative w-full h-[calc(100vh-44px-36px)]">
      {/* Sidebar Binder */}
      <Sidebar />

      {/* Main Workshop Area */}
      <main className="flex-1 overflow-y-auto bg-background transition-colors pb-16">
        <div className="px-6 lg:px-8 py-8 max-w-[1440px] mx-auto w-full flex flex-col gap-8">
          {/* Top Action / Context Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-outline-variant/30 dark:border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                </span>
                <span className="font-caption-marginalia text-caption-marginalia text-outline tracking-widest uppercase">
                  Atelier Typographique · 典籍版型工坊
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
                文体工坊{' '}
                <span className="font-title-editorial text-title-editorial text-outline font-normal ml-2">
                  / 为不同体裁定制专属书房与版刻规制
                </span>
              </h1>
              <p className="font-body-prose-sm text-body-prose-sm text-on-surface-variant max-w-2xl">
                每一种文学体裁，皆有其呼吸的节律。纸屿根据历代典籍版式与现代屏读美学，提供预置行气、界格、批注轨与辅助工具链，让灵感归位于最妥帖的纸页。
              </p>
            </div>

            {/* Quick Action & Stats pill */}
            <div className="flex items-center gap-3 self-start lg:self-end">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 text-on-surface-variant font-label-ui-sm text-label-ui-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  verified
                </span>
                <span>已载入 28 款活字典籍规制</span>
              </div>
              <button
                onClick={() => showToast('已新建私家排版规制草案')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-white hover:opacity-90 transition-all font-label-ui text-label-ui shadow-sm cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">draw</span>
                <span>新建私家规制</span>
              </button>
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="flex items-center justify-between pb-2 flex-wrap gap-4">
            <div className="inline-flex p-1 bg-surface-container dark:bg-white/10 rounded-xl shadow-inner gap-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id as any)}
                  className={`px-4 py-1.5 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer ${
                    activeCategory === c.id
                      ? 'bg-surface-container-lowest dark:bg-[#25262C] text-on-surface shadow-sm font-medium'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                  type="button"
                >
                  {c.label} <span className="ml-1 text-outline font-normal">{c.count}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-caption-marginalia text-caption-marginalia text-outline">
                排列：
              </span>
              <button
                onClick={() => setActiveSort('elegance')}
                className={`px-2.5 py-1 text-on-surface font-label-ui-sm text-label-ui-sm rounded cursor-pointer ${
                  activeSort === 'elegance'
                    ? 'bg-surface-container-high dark:bg-white/15 font-medium'
                    : 'hover:bg-surface-container'
                }`}
                type="button"
              >
                按雅致度
              </button>
              <button
                onClick={() => setActiveSort('usage')}
                className={`px-2.5 py-1 text-on-surface font-label-ui-sm text-label-ui-sm rounded cursor-pointer ${
                  activeSort === 'usage'
                    ? 'bg-surface-container-high dark:bg-white/15 font-medium'
                    : 'hover:bg-surface-container'
                }`}
                type="button"
              >
                按使用频次
              </button>
            </div>
          </div>

          {/* Featured Master Grid: Bound Manuscript Book Covers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="group flex flex-col bg-surface-container-lowest dark:bg-[#25262C] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-outline-variant/30 dark:border-white/10"
              >
                {/* Book Cover Top Stage */}
                <div
                  className={`relative h-64 w-full ${tpl.coverBg} p-6 flex items-center justify-between overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url('${tpl.coverImg}')` }}
                  />
                  {/* Tag */}
                  <div className="absolute top-0 right-8 z-10">
                    <div
                      className={`w-7 h-16 ${tpl.badgeBg} text-white font-caption-marginalia text-[10px] flex flex-col items-center justify-center shadow-md rounded-b-sm [writing-mode:vertical-rl] tracking-widest pt-1 font-medium`}
                    >
                      {tpl.badge}
                    </div>
                  </div>

                  {/* Traditional Vertical Title Slip */}
                  <div className="relative z-10 bg-surface-container-lowest/90 dark:bg-black/40 backdrop-blur-md px-3 py-6 shadow-md rounded-sm flex flex-col items-center ml-2 border border-outline-variant/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mb-2" />
                    <span className="font-title-editorial text-title-editorial text-on-surface [writing-mode:vertical-rl] tracking-[0.25em] font-medium">
                      {tpl.title}
                    </span>
                    <span className="font-caption-marginalia text-[10px] text-outline mt-3 [writing-mode:vertical-rl]">
                      {tpl.paperTone}
                    </span>
                  </div>

                  {/* Book Cover Meta */}
                  <div className="relative z-10 flex flex-col items-end justify-between h-full text-right">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-ui-sm text-label-ui-sm">
                      {tpl.genreTag}
                    </span>
                    <div className="space-y-1">
                      <div className="font-caption-marginalia text-caption-marginalia text-outline">
                        版幅宽 {tpl.width}
                      </div>
                      <div className="font-caption-marginalia text-caption-marginalia text-on-surface-variant font-medium">
                        {tpl.feature}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography & Layout Blueprint Details */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                        排版规制与器具
                      </span>
                      <span className="font-label-ui-sm text-label-ui-sm text-secondary flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        适意雅致
                      </span>
                    </div>

                    {/* Trait Chips */}
                    <div className="grid grid-cols-2 gap-2 text-on-surface-variant font-caption-marginalia text-caption-marginalia">
                      {tpl.traits.map((tr, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low dark:bg-white/5"
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline">
                            {tr.icon}
                          </span>
                          <span>{tr.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Preview Quote Snippet */}
                    <div className="p-3.5 rounded-xl bg-surface-container-low dark:bg-white/5 text-on-surface-variant font-body-prose-sm text-body-prose-sm italic line-clamp-2">
                      {tpl.quote}
                    </div>
                  </div>

                  {/* Actions: Notice the FIRST button matches (//button[contains(., '立即开卷使用')])[1] -> pushes to main-writing-studio */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleApplyTemplate(tpl.title)}
                      className="flex-1 py-2.5 rounded-xl bg-primary-container text-white font-label-ui text-label-ui hover:bg-primary transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">ink_pen</span>
                      <span>立即开卷使用</span>
                    </button>
                    <button
                      onClick={() => handleOpenPreview(tpl)}
                      className="px-3.5 py-2.5 rounded-xl bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-all flex items-center justify-center cursor-pointer"
                      title="预览样章"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bespoke Customizer & Rule Builder Section */}
          <div className="mt-8 bg-surface-container-lowest dark:bg-[#25262C] rounded-2xl p-6 lg:p-8 shadow-sm border border-outline-variant/30 dark:border-white/10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-outline-variant/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    architecture
                  </span>
                  <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                    从现有模板衍生私有文体规则
                  </span>
                </div>
                <p className="font-body-prose-sm text-body-prose-sm text-on-surface-variant">
                  您可任意混搭「行气宽裕度」、「边注轨逻辑」、「字体级差」与专属快捷指令，固化为作者个性化的排版协议。
                </p>
              </div>
              <button
                onClick={() => showToast('已将当前排版参数固化为新预设')}
                className="px-5 py-2.5 rounded-xl bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  bookmark_add
                </span>
                <span>固化为新模板预设</span>
              </button>
            </div>

            {/* Quick Interactive Parameters Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6">
              {/* Param 1: Canvas Width */}
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-white/5 space-y-2 border border-outline-variant/20">
                <div className="flex items-center justify-between font-label-ui text-label-ui text-on-surface">
                  <span>版心宽度 (Canvas Width)</span>
                  <span className="text-primary font-semibold">{sheetWidth} px</span>
                </div>
                <input
                  className="w-full accent-primary cursor-pointer"
                  max="840"
                  min="540"
                  step="10"
                  type="range"
                  value={sheetWidth}
                  onChange={(e) => setSheetWidth(Number(e.target.value))}
                />
                <div className="flex justify-between font-caption-marginalia text-caption-marginalia text-outline">
                  <span>540px (紧致)</span>
                  <span>840px (宽泛)</span>
                </div>
              </div>

              {/* Param 2: Line Height */}
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-white/5 space-y-2 border border-outline-variant/20">
                <div className="flex items-center justify-between font-label-ui text-label-ui text-on-surface">
                  <span>行气倍率 (Line Height)</span>
                  <span className="text-primary font-semibold">{lineHeight} ×</span>
                </div>
                <input
                  className="w-full accent-primary cursor-pointer"
                  max="2.4"
                  min="1.4"
                  step="0.05"
                  type="range"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                />
                <div className="flex justify-between font-caption-marginalia text-caption-marginalia text-outline">
                  <span>1.4x (紧凑)</span>
                  <span>2.4x (诗歌留白)</span>
                </div>
              </div>

              {/* Param 3: Prose Font */}
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-white/5 space-y-2 border border-outline-variant/20">
                <div className="flex items-center justify-between font-label-ui text-label-ui text-on-surface">
                  <span>正文字体 (Calligraphic Tone)</span>
                </div>
                <select
                  value={proseTypeface}
                  onChange={(e) => setProseTypeface(e.target.value)}
                  className="w-full bg-surface-container-lowest dark:bg-[#1E1F24] text-on-surface font-label-ui text-label-ui p-2 rounded-lg outline-none border border-outline-variant/30 cursor-pointer"
                >
                  <option value="思源宋体">思源宋体 (Noto Serif · 文人素雅)</option>
                  <option value="方正楷体">方正楷体 (Classical Academic · 严整考订)</option>
                  <option value="霞鹜文楷">霞鹜文楷 (Kaiti Warmth · 手帖随笔)</option>
                  <option value="思源黑体">屏显明体 (Clean Minimalist · 现代长篇)</option>
                </select>
                <div className="font-caption-marginalia text-caption-marginalia text-outline">
                  已挂载本地字体回落协议
                </div>
              </div>

              {/* Param 4: Sidebar Rail */}
              <div className="p-4 rounded-xl bg-surface-container-low dark:bg-white/5 space-y-2 border border-outline-variant/20">
                <div className="flex items-center justify-between font-label-ui text-label-ui text-on-surface">
                  <span>侧翼伴读轨 (Sidebar Rail)</span>
                </div>
                <select
                  onChange={(e) => showToast(`伴读轨已设置为：${e.target.value}`)}
                  className="w-full bg-surface-container-lowest dark:bg-[#1E1F24] text-on-surface font-label-ui text-label-ui p-2 rounded-lg outline-none border border-outline-variant/30 cursor-pointer"
                >
                  <option>朱丝小注与辞海释义</option>
                  <option>故事时序与伏笔回收</option>
                  <option>古典平仄与四声检测</option>
                  <option>极简禅意 (完全收隐)</option>
                </select>
                <div className="font-caption-marginalia text-caption-marginalia text-outline">
                  联动右侧伴读栏与⌘K
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Sample Preview Modal */}
        {previewModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setPreviewModalOpen(false)}
          >
            <div
              className="bg-surface-container-lowest dark:bg-[#25262C] max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[850px] border border-outline-variant/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 bg-surface-container dark:bg-white/5 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                  <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                    样章试阅 · {previewTitle}
                  </span>
                </div>
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-6">
                <div className="text-center pb-4 border-b border-surface-container-highest dark:border-white/10">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    《越中览古与湖上记事》
                  </h2>
                  <p className="font-caption-marginalia text-caption-marginalia text-outline mt-1">
                    南山小隐 · 庚子初春试版
                  </p>
                </div>

                <div
                  className="font-body-prose-lg text-body-prose-lg text-on-surface space-y-4 text-justify"
                  style={{ lineHeight }}
                >
                  <p className="indent-8">{previewContent}</p>
                  <p className="indent-8">
                    临窗开卷，案头宣纸隐透天光。此版式之设，取宋代蜀刻本之朗阔，段落不急，行间能容游思。偶有落叶拂砚，即成一段眉注。
                  </p>
                </div>

                {/* Marginalia Note */}
                <div className="p-4 rounded-xl bg-surface-container-low dark:bg-white/5 text-on-surface-variant font-caption-marginalia text-caption-marginalia flex items-start gap-3 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">
                    auto_awesome
                  </span>
                  <div>
                    <span className="font-medium text-secondary">伴读随考：</span>
                    此处化用高启《寻胡隐君》语意，排版建议为词末添加折线小注，字距微扩0.02em以助缓读。
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low dark:bg-white/5 border-t border-outline-variant/20">
                <span className="font-caption-marginalia text-caption-marginalia text-outline">
                  纸屿字样预览器 · {sheetWidth}px版心基准
                </span>
                <button
                  onClick={() => {
                    handleApplyTemplate(previewTitle);
                    setPreviewModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-primary-container text-white font-label-ui text-label-ui hover:bg-primary transition-all cursor-pointer"
                  type="button"
                >
                  装入我的文斋
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
