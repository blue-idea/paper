import React from 'react';
import { useStudio } from '../context/StudioContext';

export const Footer: React.FC = () => {
  const {
    wordCount,
    targetWords,
    fontSize,
    lineHeight,
    proseTypeface,
    typewriterMode,
    setTypewriterMode,
    focusMode,
    setFocusMode,
  } = useStudio();

  const percent = Math.min(100, Math.round((wordCount / targetWords) * 100));
  const readTime = Math.ceil(wordCount / 380);

  return (
    <footer className="h-9 bg-[#EFE9DF] dark:bg-[#1C1D21] border-t border-[#8A716E]/20 dark:border-white/10 z-50 flex items-center justify-between px-4 text-[11px] text-[#57423F] dark:text-white/70 font-label-ui-sm select-none flex-shrink-0 transition-colors">
      {/* Left: Real-time word count & read time */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-[#1C1B1A] dark:text-white font-medium">
          <span className="material-symbols-outlined text-[13px] text-[#952F25] dark:text-[#FFB4A9]">
            ink_pen
          </span>
          实时字数: {wordCount.toLocaleString()} 字
        </span>
        <span className="text-[#8A716E]/40 dark:text-white/20">|</span>
        <span>预估阅读: {readTime} 分钟</span>
      </div>

      {/* Center: Daily goal & Typography stats */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#33675F] inline-block animate-pulse" />
          <span>
            今日目标: {percent}% 环形进度 · 已写 {wordCount.toLocaleString()} / 目标 {targetWords.toLocaleString()} 字
          </span>
        </div>
        <span className="text-[#8A716E]/40 dark:text-white/20">|</span>
        <span className="text-[#8A716E] dark:text-white/50 flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px]">format_size</span>
          {proseTypeface} {fontSize}px / 行距 {lineHeight} / 宣纸·微纹理
        </span>
      </div>

      {/* Right: Typewriter mode, Focus mode, Cloud status */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTypewriterMode((prev) => !prev)}
          className="hover:text-primary dark:hover:text-[#FFDAD5] transition-colors cursor-pointer"
          type="button"
        >
          打字机模式 [{typewriterMode ? '开' : '关'}]
        </button>
        <span className="text-[#8A716E]/40 dark:text-white/20">|</span>
        <button
          onClick={() => setFocusMode((prev) => !prev)}
          className="hover:text-primary dark:hover:text-[#FFDAD5] transition-colors cursor-pointer"
          type="button"
        >
          专注模式 (F11)
        </button>
        <span className="text-[#8A716E]/40 dark:text-white/20">|</span>
        <div className="text-[#33675F] dark:text-[#9CD1C7] flex items-center gap-1 font-medium">
          <span className="material-symbols-outlined text-[13px]">verified</span>
          <span>自动保存良好 · 端到端加密已同步</span>
        </div>
      </div>
    </footer>
  );
};
