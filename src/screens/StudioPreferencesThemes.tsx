import React, { useState } from 'react';
import { useStudio, THEMES } from '../context/StudioContext';
import { Sidebar } from '../components/Sidebar';

export const StudioPreferencesThemes: React.FC = () => {
  const {
    currentTheme,
    setTheme,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    sheetWidth,
    setSheetWidth,
    proseTypeface,
    setProseTypeface,
    showToast,
  } = useStudio();

  const [fontWeight, setFontWeight] = useState(400);
  const [paragraphSpacing, setParagraphSpacing] = useState(12);
  const [letterSpacing, setLetterSpacing] = useState(0.5);
  const [indentChars, setIndentChars] = useState(true);
  const [panguSpacing, setPanguSpacing] = useState(true);
  const [textureIntensity, setTextureIntensity] = useState(45);
  const [autoNight, setAutoNight] = useState(true);

  // AI settings
  const [apiBaseUrl, setApiBaseUrl] = useState('https://api.anthropic.com/v1');
  const [modelId, setModelId] = useState('Claude 3.5 Sonnet');
  const [apiKey, setApiKey] = useState('sk-ant-api03-paperisle-literary-priv-key-99824');
  const [showKey, setShowKey] = useState(false);
  const [persona, setPersona] = useState('hermit');
  const [temperature, setTemperature] = useState(0.65);
  const [contextWindow, setContextWindow] = useState(3);
  const [pingState, setPingState] = useState<'idle' | 'testing' | 'success'>('success');

  const testConnection = () => {
    setPingState('testing');
    setTimeout(() => {
      setPingState('success');
      showToast('API 连接测试通过：延迟 24ms，模型已预热就绪');
    }, 500);
  };

  const handleResetDefaults = () => {
    setTheme('rice-paper');
    setFontSize(18);
    setLineHeight(1.85);
    setSheetWidth(680);
    setProseTypeface('思源宋体');
    showToast('已恢复文房默认排版参数与宣纸皮肤');
  };

  return (
    <div className="flex flex-1 overflow-hidden relative w-full h-[calc(100vh-44px-36px)]">
      {/* Sidebar Binder */}
      <Sidebar />

      {/* Main Preferences Area */}
      <main className="flex-1 overflow-y-auto bg-background transition-colors pb-16">
        <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 pb-12 pt-4">
          {/* Top Breadcrumb & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-outline-variant/30 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-caption-marginalia text-caption-marginalia text-outline tracking-wider">
                系统偏好 · MACOS NATIVE PREFERENCES
              </span>
              <span className="text-outline-variant font-caption-marginalia text-caption-marginalia">
                /
              </span>
              <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                文房器物与交互中枢
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-ui-sm text-label-ui-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>所有配置即刻生效 (Auto-Persist)</span>
              </span>
              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-ui-sm text-label-ui-sm transition-all border border-outline-variant/40 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                <span>恢复文房默认</span>
              </button>
            </div>
          </div>

          {/* MODULE 1: 8 Literary Themes Bar */}
          <section className="bg-surface-container-low dark:bg-white/5 border border-outline-variant/40 dark:border-white/10 rounded-2xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">palette</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  文房八境 · 文人色域与纸韵皮肤
                </h2>
                <span className="font-caption-marginalia text-caption-marginalia text-outline px-2 py-0.5 rounded-full bg-surface-container dark:bg-white/10">
                  8 种文人雅调
                </span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant font-caption-marginalia text-caption-marginalia">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    checked={autoNight}
                    onChange={(e) => setAutoNight(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-primary focus:ring-0 accent-primary"
                    type="checkbox"
                  />
                  <span>日照自动渐变「墨夜」</span>
                </label>
                <div className="flex items-center gap-1.5 pl-2 border-l border-outline-variant/40">
                  <span className="text-outline">纸纹强度:</span>
                  <input
                    className="w-16 h-1 bg-surface-container-highest rounded appearance-none accent-primary cursor-pointer"
                    max={100}
                    min={0}
                    type="range"
                    value={textureIntensity}
                    onChange={(e) => setTextureIntensity(Number(e.target.value))}
                  />
                  <span className="text-[11px] font-mono text-outline">{textureIntensity}%</span>
                </div>
              </div>
            </div>

            {/* Compact 8 Swatch Chips Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {THEMES.map((theme) => {
                const isActive = currentTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    className={`group relative p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-[88px] overflow-hidden ${
                      isActive
                        ? 'border-2 border-primary shadow-xs bg-surface-container-lowest dark:bg-white/10'
                        : 'border-outline-variant/30 hover:border-primary/50 bg-surface-container dark:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-xs"
                          style={{ backgroundColor: theme.paper }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-white inline-block shadow-xs"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                      {isActive ? (
                        <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center font-caption-marginalia text-[9px] font-bold">
                          印
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-outline/40" />
                      )}
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center justify-between">
                        <span className="font-title-editorial text-title-editorial text-on-surface font-semibold text-[13px] leading-tight">
                          {theme.name}
                        </span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                      <span className="font-caption-marginalia text-[10px] text-outline block truncate">
                        {theme.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* MODULE 2: Typography & Proof Sheet Split Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left: Typography Precision Workshop (7 cols) */}
            <div className="lg:col-span-7 bg-surface-container-low dark:bg-white/5 border border-outline-variant/40 dark:border-white/10 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      format_size
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      字体与排版深度工坊
                    </h2>
                  </div>
                  <span className="font-caption-marginalia text-caption-marginalia text-outline">
                    中文字体微排版规范
                  </span>
                </div>

                {/* Font Family Selector Chips */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-label-ui-sm text-label-ui-sm text-outline uppercase tracking-wider">
                      正文精选字库 (Prose Typeface)
                    </label>
                    <span className="font-caption-marginalia text-caption-marginalia text-primary font-medium">
                      当前应用：{proseTypeface}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[
                      { name: '思源宋体', note: '默认文人衬线' },
                      { name: '霞鹜文楷', note: '温润手写体' },
                      { name: '方正楷体', note: '古籍劲挺拓本' },
                      { name: 'New York', note: 'Apple 西文' },
                      { name: 'Georgia', note: '屏显可读衬线' },
                      { name: '思源黑体', note: '现代非衬线' },
                    ].map((f) => (
                      <button
                        key={f.name}
                        onClick={() => {
                          setProseTypeface(f.name);
                          showToast(`已更换正文字体为：${f.name}`);
                        }}
                        className={`px-1.5 py-2 rounded-lg text-center flex flex-col items-center transition-all cursor-pointer ${
                          proseTypeface === f.name
                            ? 'bg-surface-container-lowest dark:bg-white/15 text-primary ring-1 ring-primary/80 shadow-xs'
                            : 'bg-surface-container dark:bg-white/5 text-on-surface hover:bg-surface-container-high'
                        }`}
                        type="button"
                      >
                        <span className="font-title-editorial text-[13px] font-semibold">
                          {f.name}
                        </span>
                        <span className="text-[9px] text-outline mt-0.5">{f.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders Grid (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-4">
                  {/* 1. Font Size */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-ui text-label-ui">
                      <span className="text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-outline">
                          text_fields
                        </span>
                        正文字号
                      </span>
                      <span className="font-mono text-primary font-semibold text-[13px]">
                        {fontSize} px
                      </span>
                    </div>
                    <input
                      className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                      max={26}
                      min={14}
                      type="range"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                    />
                    <div className="flex justify-between font-caption-marginalia text-[10px] text-outline">
                      <span>14px 精致</span>
                      <span>18px 适眼推荐</span>
                      <span>26px 朗读适老</span>
                    </div>
                  </div>

                  {/* 2. Font Weight */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-ui text-label-ui">
                      <span className="text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-outline">
                          format_bold
                        </span>
                        正文字重
                      </span>
                      <span className="font-mono text-primary font-semibold text-[13px]">
                        {fontWeight === 400 ? '常规 400' : fontWeight === 500 ? '中粗 500' : '粗体 600'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 bg-surface-container dark:bg-white/10 p-0.5 rounded-lg">
                      {[400, 500, 600].map((w) => (
                        <button
                          key={w}
                          onClick={() => setFontWeight(w)}
                          className={`py-1 text-center font-label-ui-sm text-label-ui-sm rounded transition-all cursor-pointer ${
                            fontWeight === w
                              ? 'bg-surface-container-lowest dark:bg-white/20 text-primary font-semibold shadow-xs'
                              : 'text-on-surface-variant hover:text-on-surface'
                          }`}
                          type="button"
                        >
                          {w} {w === 400 ? '常规' : w === 500 ? '中粗' : '粗体'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Line Height */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-ui text-label-ui">
                      <span className="text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-outline">
                          format_line_spacing
                        </span>
                        行距倍率
                      </span>
                      <span className="font-mono text-primary font-semibold text-[13px]">
                        {lineHeight} ×
                      </span>
                    </div>
                    <input
                      className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                      max={2.4}
                      min={1.4}
                      step={0.05}
                      type="range"
                      value={lineHeight}
                      onChange={(e) => setLineHeight(Number(e.target.value))}
                    />
                    <div className="flex justify-between font-caption-marginalia text-[10px] text-outline">
                      <span>1.4x 紧凑</span>
                      <span>1.85x 黄金呼吸</span>
                      <span>2.4x 禅卷</span>
                    </div>
                  </div>

                  {/* 4. Paragraph Spacing */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-ui text-label-ui">
                      <span className="text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-outline">
                          density_medium
                        </span>
                        段间距留白
                      </span>
                      <span className="font-mono text-primary font-semibold text-[13px]">
                        {paragraphSpacing} px
                      </span>
                    </div>
                    <input
                      className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                      max={24}
                      min={0}
                      type="range"
                      value={paragraphSpacing}
                      onChange={(e) => setParagraphSpacing(Number(e.target.value))}
                    />
                    <div className="flex justify-between font-caption-marginalia text-[10px] text-outline">
                      <span>0px 紧挨</span>
                      <span>12px 传统散步</span>
                      <span>24px 宽幅空行</span>
                    </div>
                  </div>

                  {/* 5. Sheet Width */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-ui text-label-ui">
                      <span className="text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-outline">
                          view_column
                        </span>
                        版面宽度 (稿纸行宽)
                      </span>
                      <span className="font-mono text-primary font-semibold text-[13px]">
                        {sheetWidth} px
                      </span>
                    </div>
                    <input
                      className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                      max={900}
                      min={520}
                      type="range"
                      value={sheetWidth}
                      onChange={(e) => setSheetWidth(Number(e.target.value))}
                    />
                    <div className="flex justify-between font-caption-marginalia text-[10px] text-outline">
                      <span>520px 短调</span>
                      <span>680px 散文小说</span>
                      <span>900px 巨幅</span>
                    </div>
                  </div>

                  {/* 6. Letter Spacing */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-ui text-label-ui">
                      <span className="text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-outline">
                          space_bar
                        </span>
                        字间微距
                      </span>
                      <span className="font-mono text-primary font-semibold text-[13px]">
                        {letterSpacing} px
                      </span>
                    </div>
                    <input
                      className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                      max={3}
                      min={0}
                      step={0.1}
                      type="range"
                      value={letterSpacing}
                      onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    />
                    <div className="flex justify-between font-caption-marginalia text-[10px] text-outline">
                      <span>0 默认字谷</span>
                      <span>0.5px 轻微舒展</span>
                      <span>3.0px 疏朗</span>
                    </div>
                  </div>
                </div>

                {/* Advanced Typographic Switches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-outline-variant/30">
                  <div className="p-3 bg-surface-container dark:bg-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-title-editorial text-[13px] text-on-surface block font-medium">
                        段首缩进 (2字符)
                      </span>
                      <span className="font-caption-marginalia text-[11px] text-outline">
                        中国传统公案典籍版式
                      </span>
                    </div>
                    <div className="flex items-center bg-surface-container-highest dark:bg-white/10 rounded p-0.5 font-label-ui-sm text-label-ui-sm">
                      <button
                        onClick={() => setIndentChars(true)}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          indentChars ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'
                        }`}
                        type="button"
                      >
                        开启两空格
                      </button>
                      <button
                        onClick={() => setIndentChars(false)}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          !indentChars ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'
                        }`}
                        type="button"
                      >
                        顶格
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container dark:bg-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-title-editorial text-[13px] text-on-surface block font-medium">
                        盘古之白 (Pangu)
                      </span>
                      <span className="font-caption-marginalia text-[11px] text-outline">
                        中英文与数字间自动增加微间隙
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        checked={panguSpacing}
                        onChange={(e) => setPanguSpacing(e.target.checked)}
                        className="sr-only peer"
                        type="checkbox"
                      />
                      <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Typography Proof Sheet (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <span className="font-caption-marginalia text-caption-marginalia uppercase text-outline tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                  即时版面镜览 · Live Proof Sheet
                </span>
                <span className="font-label-ui-sm text-label-ui-sm text-secondary flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  {proseTypeface} · {fontSize}px · {lineHeight}x
                </span>
              </div>

              {/* Proof Paper Simulator Frame */}
              <div
                style={{
                  backgroundColor: currentTheme.paper,
                  color: currentTheme.text,
                  fontFamily: proseTypeface,
                }}
                className="relative rounded-2xl p-5 shadow-sm border border-outline-variant/30 dark:border-white/10 flex-1 flex flex-col justify-between overflow-hidden min-h-[380px]"
              >
                {/* Paper Texture Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:14px_14px]" />

                {/* Page Header Marginalia */}
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/40">
                  <span className="font-caption-marginalia text-[11px] text-outline italic">
                    《南山纪事》 卷三 · 浮生随笔
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-outline-variant">
                      {sheetWidth}px RULER
                    </span>
                    <span className="font-caption-marginalia text-[10px] text-outline tracking-widest uppercase">
                      PAGE 142
                    </span>
                  </div>
                </div>

                {/* Manuscript Sample Content */}
                <div className="py-3 flex flex-col gap-3">
                  <h3
                    className="font-headline-sm text-on-surface tracking-tight font-medium"
                    style={{ fontSize: `${fontSize + 2}px` }}
                  >
                    林泉深处，煮石烹茶
                  </h3>
                  <p
                    className="text-justify"
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight,
                      letterSpacing: `${letterSpacing}px`,
                      textIndent: indentChars ? '2em' : '0',
                      fontWeight,
                    }}
                  >
                    近午时分，山色忽转黛青。石阶旁古槐落花如细雪，积于苔衣之上。余取竹勺试泉，水声琤琤然如玉碎，遂就松火瀹新茶。
                  </p>

                  {/* Marginalia Note Widget */}
                  <div className="my-1 p-2 bg-[#F1EDEA]/80 dark:bg-white/10 rounded-lg border-l-2 border-[#952F25] text-on-surface-variant flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-primary font-caption-marginalia text-[11px] font-semibold">
                      <span className="material-symbols-outlined text-[13px]">border_color</span>
                      <span>朱砂墨批注</span>
                    </div>
                    <p className="font-caption-marginalia text-[11px] leading-relaxed">
                      明代陆树声《茶寮记》云：“煎茶非漫浪，要须其人与水、火、器具交相合。” 此处意象纯正。
                    </p>
                  </div>

                  <p
                    className="text-justify"
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight,
                      letterSpacing: `${letterSpacing}px`,
                      textIndent: indentChars ? '2em' : '0',
                      fontWeight,
                    }}
                  >
                    坐久案前，顿觉清风生两腋，人间喧嚣尽归尘土。笔墨随呼吸舒展，万物静观皆自得。
                  </p>
                </div>

                {/* Proof Bottom Status & Seal */}
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30 font-caption-marginalia text-[11px] text-outline">
                  <div className="flex items-center gap-2">
                    <span>字数: 3,482</span>
                    <span>·</span>
                    <span>单行 38 汉字</span>
                  </div>
                  <div className="w-6 h-6 rounded border border-primary/60 bg-primary/10 flex items-center justify-center text-primary font-serif text-[10px] font-bold">
                    纸屿
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MODULE 3 & MODULE 4: AI Engines + Keyboard Accelerators */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* MODULE 3: AI Engine & Models Setup */}
            <div className="bg-surface-container-low dark:bg-white/5 border border-outline-variant/40 dark:border-white/10 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      psychology
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      AI 侍书与模型中枢 (AI Engine)
                    </h2>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary font-label-ui-sm text-label-ui-sm font-medium">
                    双模热备
                  </span>
                </div>
                <p className="font-body-prose-sm text-body-prose-sm text-on-surface-variant mb-4">
                  支持本地 Ollama 零隐私泄漏推理，或调用云端高阶模型进行文体润色与长篇伏笔排查。
                </p>

                <div className="flex flex-col gap-3">
                  {/* 1. API Base URL */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className="font-label-ui-sm text-label-ui-sm text-outline">
                        API Base URL (服务接口地址)
                      </label>
                      <span className="font-mono text-[10px] text-outline">
                        支持官方或本地反代端口
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        className="w-full bg-surface-container dark:bg-white/10 rounded-lg border border-outline-variant/40 py-1.5 px-3 text-on-surface font-mono text-[12px] focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        type="text"
                        value={apiBaseUrl}
                        onChange={(e) => setApiBaseUrl(e.target.value)}
                      />
                      <span className="absolute right-2 px-1.5 py-0.5 rounded bg-surface-container-highest dark:bg-white/15 text-outline text-[10px] font-mono">
                        POST
                      </span>
                    </div>
                  </div>

                  {/* 2. Model Preset Selector */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui-sm text-label-ui-sm text-outline">
                      模型选择与预设 (Model Identifier)
                    </label>
                    <select
                      value={modelId}
                      onChange={(e) => setModelId(e.target.value)}
                      className="w-full bg-surface-container dark:bg-white/10 rounded-lg border border-outline-variant/40 py-1.5 px-3 text-on-surface font-label-ui text-label-ui focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer"
                    >
                      <option value="Claude 3.5 Sonnet">
                        Claude 3.5 Sonnet (推荐 · 文风典雅与百万长文推理)
                      </option>
                      <option value="DeepSeek V3 / R1">
                        DeepSeek V3 / R1 (超强逻辑推理与文法稽考)
                      </option>
                      <option value="GPT-4o">GPT-4o (全能通用 · 典故知识图谱)</option>
                      <option value="Qwen2.5-7B-Literary">
                        本地 Ollama · Qwen2.5-7B-Literary (完全离线 · 零数据上传)
                      </option>
                    </select>
                  </div>

                  {/* 3. API Key & Ping Connectivity Test */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui-sm text-label-ui-sm text-outline">
                      API Key 授权凭证
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 flex items-center">
                        <input
                          className="w-full bg-surface-container dark:bg-white/10 rounded-lg border border-outline-variant/40 py-1.5 px-3 pr-9 text-on-surface font-mono text-[12px] focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          type={showKey ? 'text' : 'password'}
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                        />
                        <button
                          onClick={() => setShowKey(!showKey)}
                          className="absolute right-2 text-outline hover:text-on-surface cursor-pointer"
                          title="显示/隐藏密钥"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {showKey ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      <button
                        onClick={testConnection}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-highest dark:bg-white/15 hover:bg-surface-container-high border border-outline-variant/40 text-on-surface font-label-ui-sm text-label-ui-sm transition-all cursor-pointer whitespace-nowrap"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[15px] text-secondary">
                          wifi_tethering
                        </span>
                        <span>测试连接</span>
                      </button>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-secondary/10 text-secondary text-[11px] font-mono whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {pingState === 'testing' ? '测试中...' : '24ms 正常'}
                      </span>
                    </div>
                  </div>

                  {/* 4. Personality & Prompt Preference */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-ui-sm text-label-ui-sm text-outline">
                      侍读风格偏好 (Prompt Persona)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <label
                        onClick={() => setPersona('hermit')}
                        className={`flex items-center gap-1.5 p-2 rounded-lg cursor-pointer transition-all ${
                          persona === 'hermit'
                            ? 'bg-surface-container-lowest dark:bg-white/15 border border-primary text-primary font-medium'
                            : 'bg-surface-container dark:bg-white/5 border border-outline-variant/30 text-on-surface'
                        }`}
                      >
                        <input
                          checked={persona === 'hermit'}
                          onChange={() => {}}
                          className="accent-primary"
                          type="radio"
                        />
                        <span className="font-title-editorial text-[12px]">山中隐士 (清雅古风)</span>
                      </label>
                      <label
                        onClick={() => setPersona('modern')}
                        className={`flex items-center gap-1.5 p-2 rounded-lg cursor-pointer transition-all ${
                          persona === 'modern'
                            ? 'bg-surface-container-lowest dark:bg-white/15 border border-primary text-primary font-medium'
                            : 'bg-surface-container dark:bg-white/5 border border-outline-variant/30 text-on-surface'
                        }`}
                      >
                        <input
                          checked={persona === 'modern'}
                          onChange={() => {}}
                          className="accent-primary"
                          type="radio"
                        />
                        <span className="font-title-editorial text-[12px]">现代洗练 (精简干脆)</span>
                      </label>
                      <label
                        onClick={() => setPersona('scholar')}
                        className={`flex items-center gap-1.5 p-2 rounded-lg cursor-pointer transition-all ${
                          persona === 'scholar'
                            ? 'bg-surface-container-lowest dark:bg-white/15 border border-primary text-primary font-medium'
                            : 'bg-surface-container dark:bg-white/5 border border-outline-variant/30 text-on-surface'
                        }`}
                      >
                        <input
                          checked={persona === 'scholar'}
                          onChange={() => {}}
                          className="accent-primary"
                          type="radio"
                        />
                        <span className="font-title-editorial text-[12px]">考据学者 (严查错漏)</span>
                      </label>
                    </div>
                  </div>

                  {/* 5. Temperature & Context Window */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between font-label-ui text-label-ui">
                        <span className="text-outline text-[12px]">温润度 (Temperature)</span>
                        <span className="font-mono text-primary text-[12px]">{temperature}</span>
                      </div>
                      <input
                        className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        max={100}
                        min={0}
                        type="range"
                        value={Math.round(temperature * 100)}
                        onChange={(e) => setTemperature(Number(e.target.value) / 100)}
                      />
                      <div className="flex justify-between font-caption-marginalia text-[9px] text-outline">
                        <span>严谨 0.1</span>
                        <span>文采 0.7</span>
                        <span>跳脱 1.0</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between font-label-ui text-label-ui">
                        <span className="text-outline text-[12px]">附带上下文篇幅</span>
                        <span className="font-mono text-primary text-[12px]">
                          前 {contextWindow} 章回
                        </span>
                      </div>
                      <input
                        className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        max={10}
                        min={1}
                        type="range"
                        value={contextWindow}
                        onChange={(e) => setContextWindow(Number(e.target.value))}
                      />
                      <div className="flex justify-between font-caption-marginalia text-[9px] text-outline">
                        <span>当前段落</span>
                        <span>前 3 回</span>
                        <span>全卷 10 万字</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-outline-variant/20 flex items-center justify-between font-caption-marginalia text-caption-marginalia text-outline">
                <span>* AI 作为边注批改，绝不直接擅改覆写正文一字一句。</span>
                <span
                  onClick={() => showToast('已打开自定义 Prompt 典雅文风配置库')}
                  className="text-primary hover:underline cursor-pointer"
                >
                  管理自定 Prompt 库 →
                </span>
              </div>
            </div>

            {/* MODULE 4: Key Bindings & Accelerators */}
            <div className="bg-surface-container-low dark:bg-white/5 border border-outline-variant/40 dark:border-white/10 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      keyboard
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      快捷键与效率指令 (Key Bindings)
                    </h2>
                  </div>
                  <button
                    onClick={() => showToast('快捷键已恢复 macOS 标准预设')}
                    className="px-2 py-0.5 rounded bg-surface-container dark:bg-white/10 hover:bg-surface-container-high border border-outline-variant/30 text-outline hover:text-on-surface font-label-ui-sm text-label-ui-sm transition-colors cursor-pointer"
                    type="button"
                  >
                    恢复 macOS 默认
                  </button>
                </div>
                <p className="font-body-prose-sm text-body-prose-sm text-on-surface-variant mb-4">
                  深度适配 macOS 标准键盘修饰符（⌘ Cmd / ⌥ Option / ⇧ Shift），支持自定义绑定与冲突检测。
                </p>

                <div className="flex flex-col gap-1.5">
                  {[
                    { icon: 'edit_note', label: '唤出灵感侍书 / ⌘K 指令面板', keys: ['⌘', 'K'] },
                    { icon: 'auto_awesome', label: '选中文字进行智能文风润色', keys: ['⌘', 'J'] },
                    { icon: 'save', label: '立即保存并生成时间机器快照', keys: ['⌘', 'S'] },
                    { icon: 'fullscreen', label: '全屏专注沉浸模式 (禅道)', keys: ['F11'] },
                    {
                      icon: 'vertical_align_center',
                      label: '打字机居中滚动模式切换',
                      keys: ['⌘', '⌥', 'T'],
                    },
                    { icon: 'format_bold', label: '文本加粗 / 斜体格式化', keys: ['⌘B / ⌘I'] },
                    { icon: 'dock_to_left', label: '折叠 / 展开左侧书卷目录 (Binder)', keys: ['⌘', '\\'] },
                    { icon: 'send_time_extension', label: '打开全网发布排版中心', keys: ['⌘', '⇧', 'P'] },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-outline text-[16px]">
                          {row.icon}
                        </span>
                        <span className="font-label-ui text-label-ui text-on-surface">
                          {row.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 font-mono">
                        {row.keys.map((k, kIdx) => (
                          <kbd
                            key={kIdx}
                            className="px-1.5 py-0.5 rounded bg-surface-container-lowest dark:bg-[#1E1F24] border border-outline-variant/40 text-on-surface text-[11px] font-semibold"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-outline-variant/20 flex items-center justify-between font-caption-marginalia text-caption-marginalia text-outline">
                <span className="flex items-center gap-1 text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  快捷键冲突排查：未发现冲突
                </span>
                <span
                  onClick={() => showToast('已下载快捷键备忘清单 PDF')}
                  className="text-primary hover:underline cursor-pointer"
                >
                  导出快捷键 Cheatsheet PDF
                </span>
              </div>
            </div>
          </section>

          {/* MODULE 5: Storage & Multi-Device Syncing Section */}
          <section className="bg-surface-container-low dark:bg-white/5 border border-outline-variant/40 dark:border-white/10 p-5 rounded-2xl shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">
                  cloud_sync
                </span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    文房存续与云端多端同步 (Storage & Sync)
                  </h2>
                  <p className="font-caption-marginalia text-caption-marginalia text-on-surface-variant">
                    纸屿恪守作者数据自主权：纯净 Markdown 离线磁盘直存，拒绝专有格式锁定。
                  </p>
                </div>
              </div>
              <button
                onClick={() => showToast('双向增量同步完成：本地磁盘与 iCloud 数据一致')}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-secondary text-white font-label-ui-sm text-label-ui-sm shadow-xs hover:bg-secondary/90 transition-all cursor-pointer self-start sm:self-auto"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">sync</span>
                <span>立即触发双向同步</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Local Storage & Time Machine */}
              <div className="flex flex-col gap-3">
                <h3 className="font-title-editorial text-title-editorial text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    folder
                  </span>
                  本地存储库与墨墨时间机器
                </h3>
                <div className="p-3 bg-surface-container dark:bg-white/10 rounded-xl flex flex-col gap-2 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-label-ui-sm text-label-ui-sm text-outline">
                      当前书斋本地存储目录
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-secondary/15 text-secondary text-[10px] font-mono">
                      标准 Markdown + FrontMatter
                    </span>
                  </div>
                  <input
                    className="w-full bg-surface-container-lowest dark:bg-[#1E1F24] font-mono text-[11px] text-on-surface py-1.5 px-2 rounded-lg border border-outline-variant/40 outline-none"
                    readOnly
                    type="text"
                    value="/Users/yubai/Documents/PaperIsle/SouthMountain/"
                  />
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => showToast('已在 Finder 中定位到本地书斋文集')}
                      className="px-2 py-1 rounded bg-surface-container-highest dark:bg-white/15 text-on-surface text-[12px] font-label-ui-sm transition-colors border border-outline-variant/30 cursor-pointer"
                      type="button"
                    >
                      在 Finder 中显示
                    </button>
                    <button
                      onClick={() => showToast('请选择新的本地 Markdown 书稿目录')}
                      className="px-2 py-1 rounded bg-surface-container-highest dark:bg-white/15 text-on-surface text-[12px] font-label-ui-sm transition-colors border border-outline-variant/30 cursor-pointer"
                      type="button"
                    >
                      更改本地目录...
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-surface-container dark:bg-white/10 rounded-xl flex flex-col gap-2 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">
                        history_toggle_off
                      </span>
                      <span className="font-title-editorial text-[13px] text-on-surface font-medium">
                        墨墨时间机器 (增量版本快照)
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-8 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                  <p className="font-caption-marginalia text-[11px] text-outline">
                    本地 SQLite 自动记录每一次重大段落重构与修订，支持按回目随时回滚。
                  </p>
                </div>
              </div>

              {/* Cloud Sync & End-to-End Encryption */}
              <div className="flex flex-col gap-3">
                <h3 className="font-title-editorial text-title-editorial text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">cloud</span>
                  云端管道与端到端加密 (Sync & E2EE)
                </h3>
                <div className="p-3 bg-surface-container dark:bg-white/10 rounded-xl flex items-center justify-between border border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-lowest dark:bg-[#1E1F24] flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">cloud_done</span>
                    </div>
                    <div>
                      <span className="font-title-editorial text-[13px] text-on-surface font-medium block">
                        Apple iCloud Drive 同步通道
                      </span>
                      <span className="font-caption-marginalia text-[11px] text-outline">
                        支持 macOS / iOS 原生后台无缝接力 (Handoff)
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 font-label-ui-sm text-label-ui-sm text-secondary font-medium px-2 py-1 rounded bg-secondary/10">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    已连接 (E2EE 开启)
                  </span>
                </div>

                <div className="p-3 bg-surface-container dark:bg-white/10 rounded-xl flex flex-col gap-2 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-outline text-[18px]">dns</span>
                      <span className="font-title-editorial text-[13px] text-on-surface font-medium">
                        第三方 WebDAV / 坚果云 / 自建 NAS
                      </span>
                    </div>
                    <span className="text-[11px] font-caption-marginalia text-outline">
                      备用灾备同步
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-label-ui-sm text-label-ui-sm">
                    <div className="sm:col-span-2">
                      <input
                        className="w-full bg-surface-container-lowest dark:bg-[#1E1F24] border border-outline-variant/40 rounded py-1 px-2 font-mono text-[11px] text-on-surface outline-none"
                        defaultValue="https://dav.jianguoyun.com/dav/PaperIsle/"
                        type="text"
                      />
                    </div>
                    <div>
                      <input
                        className="w-full bg-surface-container-lowest dark:bg-[#1E1F24] border border-outline-variant/40 rounded py-1 px-2 font-mono text-[11px] text-on-surface outline-none"
                        defaultValue="author_yubai"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-caption-marginalia text-[11px] text-outline">
                      离线策略：断网优先写入本地，联网时无损合并
                    </span>
                    <button
                      onClick={() => showToast('WebDAV 连通性测试成功')}
                      className="px-2 py-1 rounded bg-surface-container-highest dark:bg-white/15 text-on-surface text-[12px] font-label-ui-sm transition-colors border border-outline-variant/30 cursor-pointer"
                      type="button"
                    >
                      校验 WebDAV 连通性
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final Decorative Literati Seal Footer Banner */}
          <div className="pt-2 pb-6 flex flex-col items-center justify-center text-center gap-1">
            <div className="w-7 h-7 rounded border border-[#952f25]/40 bg-[#952f25]/5 flex items-center justify-center text-primary font-caption-marginalia text-[12px] font-semibold">
              屿
            </div>
            <p className="font-caption-marginalia text-[11px] text-outline tracking-widest uppercase">
              纸屿 · PAPER ISLE STUDIO ENGINE V3.4.2 · CRAFTED FOR AUTHORS
            </p>
            <p className="font-caption-marginalia text-[10px] text-outline/80">
              让技术隐于纸墨之后，唯留思绪与千古文章
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
