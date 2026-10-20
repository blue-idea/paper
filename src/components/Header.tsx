import React from 'react';
import { useStudio } from '../context/StudioContext';

export const Header: React.FC = () => {
  const {
    navigateTo,
    focusMode,
    setFocusMode,
    zenSplitMode,
    setZenSplitMode,
    setCommandPaletteOpen,
    currentScreen,
  } = useStudio();

  return (
    <header className="h-11 md:h-12 bg-[#EFE9DF]/90 dark:bg-[#202126]/90 backdrop-blur-xl border-b border-[#8A716E]/15 dark:border-white/10 z-50 flex items-center justify-between px-3 select-none flex-shrink-0 transition-colors">
      {/* Left traffic lights & Title */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 pl-1 pr-2">
          <span
            onClick={() => navigateTo('main-writing-studio')}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-inner hover:brightness-95 cursor-pointer transition-transform active:scale-90"
            title="关闭/回到主书斋"
          />
          <span
            onClick={() => setFocusMode(!focusMode)}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-inner hover:brightness-95 cursor-pointer transition-transform active:scale-90"
            title="最小化/专注切换"
          />
          <span
            onClick={() => setZenSplitMode(!zenSplitMode)}
            className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-inner hover:brightness-95 cursor-pointer transition-transform active:scale-90"
            title="全屏/分屏"
          />
        </div>
        <div className="h-4 w-px bg-[#8A716E]/20 dark:bg-white/15" />
        <div
          onClick={() => navigateTo('main-writing-studio')}
          className="flex items-center gap-1.5 ml-1 cursor-pointer group"
        >
          <img
            alt="Paper Isle"
            className="h-5 w-5 object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1WgqI6FzYPlLiiQxCqKLyup8xtse2v6O_9hvUa5pDSzxzquNxzwop_J0_ppuNB2oBGIJYbwhKVL9j_Mk747-8DK8OU_w5uH_DXJe5HIdvYJi6-MK_wEaMpW5aeuzLjyRmdMgIRGu0KAighers1uHmfgHpAZNUod1G02D9GwAp8o62ozNshXaNSzhQrzePhKwszkbNk_dsXkN_NwwtNlhpem8qljqRz1gtwFY1qkp4VujCtqszMOWrfG0ag"
          />
          <span className="font-medium text-xs text-[#1C1B1A] dark:text-[#E8E4DD] tracking-normal">
            纸屿 · Paper Isle
          </span>
        </div>
        <span className="text-xs text-[#8A716E]/60 px-1">/</span>
        <span
          onClick={() => navigateTo('main-writing-studio')}
          className="text-xs text-[#952F25] dark:text-[#FFB4A9] font-medium tracking-tight cursor-pointer hover:underline"
        >
          《南山纪事 · 卷三》 浮生随笔
        </span>
      </div>

      {/* Middle: Writing mode / Focus mode / Zen Split */}
      <div className="hidden md:flex items-center gap-1 bg-[#E6E0D5]/70 dark:bg-white/10 p-0.5 rounded-md border border-[#8A716E]/10">
        <button
          onClick={() => navigateTo('main-writing-studio')}
          className={`px-2.5 py-0.5 text-xs rounded transition-all font-medium ${
            currentScreen === 'main-writing-studio'
              ? 'text-[#1C1B1A] bg-[#FDF9F5] shadow-xs'
              : 'text-[#57423F] dark:text-white/70 hover:text-[#1C1B1A]'
          }`}
          type="button"
        >
          写作模式
        </button>
        <button
          onClick={() => setFocusMode(!focusMode)}
          className={`px-2.5 py-0.5 text-xs rounded transition-all ${
            focusMode
              ? 'text-[#1C1B1A] bg-[#FDF9F5] shadow-xs font-medium'
              : 'text-[#57423F] dark:text-white/70 hover:text-[#1C1B1A]'
          }`}
          type="button"
        >
          专注模式 (F11)
        </button>
        <button
          onClick={() => setZenSplitMode(!zenSplitMode)}
          className={`px-2.5 py-0.5 text-xs rounded transition-all ${
            zenSplitMode
              ? 'text-[#1C1B1A] bg-[#FDF9F5] shadow-xs font-medium'
              : 'text-[#57423F] dark:text-white/70 hover:text-[#1C1B1A]'
          }`}
          type="button"
        >
          禅道分屏
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#57423F] dark:text-white/70 bg-[#ECE5DA]/80 dark:bg-white/5 px-2 py-0.5 rounded-full border border-[#8A716E]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#33675F] animate-pulse" />
          <span>已同步至 iCloud 与 本地磁盘 · 10秒前</span>
        </div>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-1 px-2 py-0.5 bg-[#E6E0D5]/80 hover:bg-[#DDD6CA] dark:bg-white/10 dark:hover:bg-white/20 border border-[#8A716E]/20 rounded text-[11px] text-[#57423F] dark:text-white/80 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[13px]">search</span>
          <span>⌘K 灵感指令</span>
        </button>

        {/* 8套文艺皮肤切换 button with EXACT title required by spec */}
        <button
          onClick={() => navigateTo('studio-preferences-themes')}
          title="8套文艺皮肤切换"
          className="flex items-center gap-1 px-2 py-0.5 text-[#57423F] dark:text-white/80 hover:bg-[#E6E0D5] dark:hover:bg-white/10 rounded text-[11px] transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">palette</span>
          <span className="hidden sm:inline">皮肤</span>
        </button>

        {/* AI 伴读与灵感润色 button with EXACT title required by spec */}
        <button
          onClick={() => navigateTo('ai-companion-review')}
          title="AI 伴读与灵感润色"
          className="flex items-center gap-1 px-2 py-0.5 text-[#33675F] dark:text-[#9CD1C7] hover:bg-[#B4EAE0]/30 rounded text-[11px] font-medium transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
          <span className="hidden sm:inline">伴读</span>
        </button>

        <div className="flex items-center pl-1 border-l border-[#8A716E]/20 dark:border-white/10">
          <img
            alt="User"
            className="w-6 h-6 rounded-full object-cover border border-[#8A716E]/30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB20tTJiC4psikM-MXagOJMgx1xS2vZLsndI7KfbmEq9Nk5yjbTUBe6esJ8SS8pFyYCPNRDRio56maMPysmFF3DESGkp7-JS_a13KLd6bBESBrPS8XIkAnNZP9T8-OTVdSgDfSI574LWHM-5_QDxN0zmqVxK4QPfzlGU5GL3JtpoMSBtMaohCHr0Gh8IKoDHFSrqUrL89ksCaI3E1rl5JL7S1WIpzMmjX3VmtqI6CL8Cdezh7Sjy4HF"
          />
        </div>
      </div>
    </header>
  );
};
