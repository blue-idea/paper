import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScreenKey, ThemeOption, DiffItem, Chapter } from '../types';

export const THEMES: ThemeOption[] = [
  {
    id: 'rice-paper',
    name: '01 · 宣纸',
    desc: '朱砂印 · 柔和宣韵',
    bg: '#F5F0E6',
    paper: '#FAF6EE',
    text: '#2B2A28',
    accent: '#952F25',
    secondary: '#33675F',
  },
  {
    id: 'ink-night',
    name: '02 · 墨夜',
    desc: '暗金星火 · 秉烛',
    bg: '#1C1D21',
    paper: '#25262C',
    text: '#FAF7F2',
    accent: '#C8A96A',
    secondary: '#9CD1C7',
    isDark: true,
  },
  {
    id: 'celadon',
    name: '03 · 青瓷',
    desc: '汝窑破云 · 冰裂',
    bg: '#EAF0EC',
    paper: '#F5F9F7',
    text: '#1F2E2B',
    accent: '#33675F',
    secondary: '#4A7F76',
  },
  {
    id: 'distant-mountain',
    name: '04 · 远山',
    desc: '水墨空濛 · 霁蓝',
    bg: '#E9EDF2',
    paper: '#F4F7FB',
    text: '#1E2530',
    accent: '#3D5A80',
    secondary: '#6B84A8',
  },
  {
    id: 'peach-blossom',
    name: '05 · 桃夭',
    desc: '诗经浅醉 · 瓣落',
    bg: '#FBF0F0',
    paper: '#FFF7F7',
    text: '#382226',
    accent: '#A83B4B',
    secondary: '#C26372',
  },
  {
    id: 'pine-smoke',
    name: '06 · 松烟',
    desc: '黄山古黛 · 雨后',
    bg: '#E8EBE3',
    paper: '#F5F8F0',
    text: '#252D21',
    accent: '#47633B',
    secondary: '#69855C',
  },
  {
    id: 'amber',
    name: '07 · 琥珀',
    desc: '藏书皮卷 · 赭黄',
    bg: '#F4E8D3',
    paper: '#FDF6E8',
    text: '#332617',
    accent: '#8C5A20',
    secondary: '#B57D36',
  },
  {
    id: 'dusk',
    name: '08 · 薄暮',
    desc: '黛紫残霞 · 静思',
    bg: '#ECE8F1',
    paper: '#F7F4FB',
    text: '#282230',
    accent: '#6E4894',
    secondary: '#8F6DB8',
  },
];

const INITIAL_DIFF_ITEMS: DiffItem[] = [
  {
    id: 'diff-card-1',
    title: '具象意象强化',
    tag: '听觉通感转化',
    tagType: 'audio',
    original: '声音很乱',
    refined: '如碎玉乱琼',
    explanation: '移去白话中口语化的烦躁感，以明清碎玉之喻赋予雨敲芭蕉清脆微凉的声腔质感。',
    status: 'pending',
  },
  {
    id: 'diff-card-2',
    title: '动作留白与文人态势',
    tag: '神态物化',
    tagType: 'posture',
    original: '不知道该写些什么',
    refined: '笔锋悬空未落',
    explanation: '变陈述性心理活动为具象肢体定格，“笔锋悬空”更契合东亚书案静默凝神的写作意境。',
    status: 'pending',
  },
  {
    id: 'diff-card-3',
    title: '嗅觉通感补足与结尾托底',
    tag: '境界升华',
    tagType: 'smell',
    original: '窗外山色一片灰暗',
    refined: '唯余满室书卷微香',
    explanation: '化枯淡低沉的灰暗视景为内外对照——外境烟岚迷茫，室内墨气与纸香凝结，余味悠长。',
    status: 'pending',
  },
];

interface StudioContextType {
  currentScreen: ScreenKey;
  navigateTo: (screen: ScreenKey) => void;
  currentTheme: ThemeOption;
  setTheme: (themeId: string) => void;
  typewriterMode: boolean;
  setTypewriterMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  focusMode: boolean;
  setFocusMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  zenSplitMode: boolean;
  setZenSplitMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  lineHeight: number;
  setLineHeight: (lh: number) => void;
  sheetWidth: number;
  setSheetWidth: (width: number) => void;
  proseTypeface: string;
  setProseTypeface: (font: string) => void;
  wordCount: number;
  setWordCount: React.Dispatch<React.SetStateAction<number>>;
  targetWords: number;
  diffItems: DiffItem[];
  acceptDiffItem: (id: string) => void;
  discardDiffItem: (id: string) => void;
  acceptAllDiffs: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  citationDrawerOpen: boolean;
  setCitationDrawerOpen: (open: boolean) => void;
  citations: Array<{ id: string; num: number; quote: string; context: string }>;
  addCitation: (quote: string, context: string) => void;
  removeCitation: (id: string) => void;
  chapters: Chapter[];
  selectChapter: (id: string) => void;
  highlightedText: string;
  setHighlightedText: (txt: string) => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenKey>('main-writing-studio');
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(THEMES[0]);
  const [typewriterMode, setTypewriterMode] = useState<boolean>(true);
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [zenSplitMode, setZenSplitMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.85);
  const [sheetWidth, setSheetWidth] = useState<number>(680);
  const [proseTypeface, setProseTypeface] = useState<string>('思源宋体');
  const [wordCount, setWordCount] = useState<number>(3482);
  const targetWords = 3500;
  const [diffItems, setDiffItems] = useState<DiffItem[]>(INITIAL_DIFF_ITEMS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [citationDrawerOpen, setCitationDrawerOpen] = useState<boolean>(false);
  const [highlightedText, setHighlightedText] = useState<string>(
    '山气自南峦漫卷而来，层层叠叠掩去了远峰的轮廓，天地之间，忽而只剩下了雨落青石的清响与笔尖摩挲纸背的微吟。'
  );

  const [citations, setCitations] = useState<Array<{ id: string; num: number; quote: string; context: string }>>([
    {
      id: 'cite-1',
      num: 1,
      quote: '《江南通志·山水考》卷十七：“永乐间有隐君子构舍于绝顶。”',
      context: '出现在第 3 段第 42 字 · 对应概念 [南山草堂]',
    },
    {
      id: 'cite-2',
      num: 2,
      quote: '陆羽《茶经·五之煮》：“其水，用山水上，江水中，井水下。”',
      context: '出现在第 8 段第 112 字 · 对应概念 [茶事辨味]',
    },
    {
      id: 'cite-3',
      num: 3,
      quote: '《明季南略》卷四，太湖水道迂回图辨正。',
      context: '出现在第 14 段第 18 字 · 对应概念 [荻塘暗道]',
    },
    {
      id: 'cite-4',
      num: 4,
      quote: '钱谦益《牧斋初学集》卷二十三《送徐霞客序》逸文。',
      context: '出现在第 21 段第 67 字 · 对应概念 [紫阳先生]',
    },
  ]);

  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 'c-0', title: '序章：石阶与微雨', status: '完稿', words: 2410 },
    { id: 'c-1', title: '卷一：空山松子落', status: '修订中', words: 3120 },
    { id: 'c-2', title: '卷二：夜泊清溪', status: '完稿', words: 4050 },
    { id: 'c-3', title: '卷三：浮生随笔', status: '草案', words: 3482, selected: true },
    { id: 'c-4', title: '卷四：远岫归云', status: '构思', words: 860 },
  ]);

  const navigateTo = (screen: ScreenKey) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const setTheme = (themeId: string) => {
    const found = THEMES.find((t) => t.id === themeId);
    if (found) {
      setCurrentTheme(found);
      showToast(`已切换至【${found.name}】文房雅境`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const acceptDiffItem = (id: string) => {
    setDiffItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'accepted' } : item))
    );
    showToast('已采纳该处意象润色');
  };

  const discardDiffItem = (id: string) => {
    setDiffItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'discarded' } : item))
    );
    showToast('已保留原稿用词');
  };

  const acceptAllDiffs = () => {
    setDiffItems((prev) => prev.map((item) => ({ ...item, status: 'accepted' })));
    showToast('已将 AI 润色全部合并入稿件');
  };

  const addCitation = (quote: string, context: string) => {
    setCitations((prev) => [
      ...prev,
      {
        id: `cite-${Date.now()}`,
        num: prev.length + 1,
        quote,
        context,
      },
    ]);
    showToast('已成功录入引用');
  };

  const removeCitation = (id: string) => {
    setCitations((prev) => prev.filter((c) => c.id !== id));
    showToast('已移除该引用');
  };

  const selectChapter = (id: string) => {
    setChapters((prev) =>
      prev.map((ch) => ({
        ...ch,
        selected: ch.id === id,
      }))
    );
    const chosen = chapters.find((c) => c.id === id);
    if (chosen) {
      showToast(`已切换至《${chosen.title}》`);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        navigateTo('one-click-publish-hub');
      }
      if (e.key === 'F11') {
        e.preventDefault();
        setFocusMode((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setCitationDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <StudioContext.Provider
      value={{
        currentScreen,
        navigateTo,
        currentTheme,
        setTheme,
        typewriterMode,
        setTypewriterMode,
        focusMode,
        setFocusMode,
        zenSplitMode,
        setZenSplitMode,
        fontSize,
        setFontSize,
        lineHeight,
        setLineHeight,
        sheetWidth,
        setSheetWidth,
        proseTypeface,
        setProseTypeface,
        wordCount,
        setWordCount,
        targetWords,
        diffItems,
        acceptDiffItem,
        discardDiffItem,
        acceptAllDiffs,
        toastMessage,
        showToast,
        commandPaletteOpen,
        setCommandPaletteOpen,
        citationDrawerOpen,
        setCitationDrawerOpen,
        citations,
        addCitation,
        removeCitation,
        chapters,
        selectChapter,
        highlightedText,
        setHighlightedText,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
