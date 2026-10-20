import React from 'react';
import { useStudio } from '../context/StudioContext';
import { ScreenKey } from '../types';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { currentScreen, navigateTo, wordCount, targetWords } = useStudio();

  const navItems: Array<{ path: ScreenKey; icon: string; label: string }> = [
    { path: 'main-writing-studio', icon: 'edit_note', label: '书斋写作' },
    { path: 'ai-companion-review', icon: 'auto_awesome', label: 'AI 灵感润色' },
    { path: 'knowledge-lore-research', icon: 'style', label: '资料卡片与图谱' },
    { path: 'literary-templates-workshop', icon: 'auto_stories', label: '文体模板工坊' },
    { path: 'one-click-publish-hub', icon: 'send_time_extension', label: '全网一键发布' },
    { path: 'studio-preferences-themes', icon: 'settings', label: '文房偏好设置' },
  ];

  const percent = Math.min(100, Math.round((wordCount / targetWords) * 100));

  return (
    <aside
      className={`w-64 bg-surface-container-low/85 dark:bg-[#1E1F24]/85 backdrop-blur-xl border-r border-[#8A716E]/15 dark:border-white/10 z-40 flex flex-col justify-between py-4 select-none shadow-[1px_0_12px_rgba(43,42,40,0.02)] transition-colors flex-shrink-0 ${className}`}
    >
      <div className="flex flex-col gap-4 px-3">
        {/* Binder Header */}
        <div className="flex items-center justify-between px-2 text-[11px] text-outline uppercase tracking-wider">
          <span className="font-caption-marginalia">文斋目录 · Binder</span>
          <span
            onClick={() => navigateTo('studio-preferences-themes')}
            className="material-symbols-outlined text-[16px] text-outline cursor-pointer hover:text-on-surface transition-colors"
            title="文房偏好设置"
          >
            tune
          </span>
        </div>

        {/* Navigation list with EXACT a tags and data-path attributes */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.path;
            return (
              <a
                key={item.path}
                data-path={item.path}
                href={`#${item.path}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(item.path);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-white shadow-sm'
                    : 'text-on-surface-variant dark:text-white/70 hover:bg-surface-container-high dark:hover:bg-white/10 hover:text-on-surface dark:hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {item.icon}
                </span>
                <span className="font-title-editorial">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Daily Target Progress */}
      <div className="px-3">
        <div className="bg-surface-container dark:bg-white/5 px-3 py-3 rounded-xl border border-outline-variant/30 dark:border-white/10">
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant dark:text-white/70 mb-1.5 font-label-ui-sm">
            <span>今日笔耕</span>
            <span className="font-semibold text-primary dark:text-[#FFDAD5]">{percent}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary dark:bg-[#B5473A] rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-1.5 text-[11px] text-outline dark:text-white/50 flex items-center justify-between font-caption-marginalia">
            <span>已完成 {wordCount.toLocaleString()} 字</span>
            <span>目标 {targetWords.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
