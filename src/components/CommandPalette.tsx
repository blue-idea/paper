import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { ScreenKey } from '../types';

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    navigateTo,
    showToast,
    setTheme,
    setTypewriterMode,
    setFocusMode,
  } = useStudio();
  const [query, setQuery] = useState('');

  if (!commandPaletteOpen) return null;

  const actions = [
    {
      id: 'write',
      title: '前往主写作书斋',
      desc: '沉浸稿纸、三栏目录与灵感侍书',
      icon: 'edit_note',
      action: () => {
        navigateTo('main-writing-studio');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'diff',
      title: '打开 AI 辅助写作与差异对比面板',
      desc: '修辞风骨、声律抑扬与逐句取舍',
      icon: 'auto_awesome',
      action: () => {
        navigateTo('ai-companion-review');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'lore',
      title: '查阅关联资料与文学图谱库',
      desc: '人物拓扑网、古籍史料、时序与色卡考据',
      icon: 'style',
      action: () => {
        navigateTo('knowledge-lore-research');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'templates',
      title: '进入文体模板工坊',
      desc: '散文、诗歌、小说、考据典籍版刻规制',
      icon: 'auto_stories',
      action: () => {
        navigateTo('literary-templates-workshop');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'publish',
      title: '全网一键发布中心 (⌘P)',
      desc: '微信公众号、豆瓣、知乎排版预览与长图海报',
      icon: 'send_time_extension',
      action: () => {
        navigateTo('one-click-publish-hub');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'preferences',
      title: '文房偏好设置 (全功能版)',
      desc: '8套文人色域皮肤、字体排印、AI侍书与云同步',
      icon: 'settings',
      action: () => {
        navigateTo('studio-preferences-themes');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'theme-night',
      title: '切换皮肤：02 · 墨夜 (暗金星火)',
      desc: '夜间静心沉浸写作色调',
      icon: 'bedtime',
      action: () => {
        setTheme('ink-night');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'theme-paper',
      title: '切换皮肤：01 · 宣纸 (朱砂印)',
      desc: '经典文人素雅米宣稿纸',
      icon: 'palette',
      action: () => {
        setTheme('rice-paper');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'typewriter',
      title: '切换打字机居中滚动模式',
      desc: '视线始终保持在屏幕黄金黄金居中线',
      icon: 'vertical_align_center',
      action: () => {
        setTypewriterMode((prev) => !prev);
        showToast('已切换打字机模式');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'focus',
      title: '切换专注模式 (F11)',
      desc: '收起左右侧栏，全幅沉浸写作',
      icon: 'fullscreen',
      action: () => {
        setFocusMode((prev) => !prev);
        showToast('专注模式已切换');
        setCommandPaletteOpen(false);
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[#FAF6EE] dark:bg-[#25262C] rounded-2xl shadow-2xl border border-[#8A716E]/30 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#8A716E]/20">
          <span className="material-symbols-outlined text-[#8A716E] text-[20px]">
            search
          </span>
          <input
            autoFocus
            type="text"
            className="w-full bg-transparent text-sm text-[#1C1B1A] dark:text-white placeholder-[#8A716E]/60 focus:outline-none font-label-ui"
            placeholder="输入指令、章节或搜索功能 (按 ESC 退出)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="px-1.5 py-0.5 rounded bg-[#E6E0D5] dark:bg-white/10 text-[10px] text-[#8A716E] font-mono">
            ESC
          </span>
        </div>

        {/* Action items list */}
        <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#8A716E]">
              未检索到相关指令
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EAE4D7] dark:hover:bg-white/10 text-left transition-colors group cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#1C1B1A] dark:text-white">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#8A716E] dark:text-white/60">
                      {item.desc}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#8A716E]/40 group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer tips */}
        <div className="px-4 py-2 bg-[#EFE9DF] dark:bg-white/5 border-t border-[#8A716E]/15 flex items-center justify-between text-[11px] text-[#8A716E]">
          <span>按 ↑↓ 浏览，回车选中执行</span>
          <span>纸屿 · 侍书灵感指令</span>
        </div>
      </div>
    </div>
  );
};
