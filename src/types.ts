export type ScreenKey = 
  | 'main-writing-studio'
  | 'ai-companion-review'
  | 'knowledge-lore-research'
  | 'literary-templates-workshop'
  | 'studio-preferences-themes'
  | 'one-click-publish-hub';

export interface ThemeOption {
  id: string;
  name: string;
  desc: string;
  bg: string;
  paper: string;
  text: string;
  accent: string;
  secondary: string;
  isDark?: boolean;
}

export interface DiffItem {
  id: string;
  title: string;
  tag: string;
  tagType: 'audio' | 'posture' | 'smell';
  original: string;
  refined: string;
  explanation: string;
  status: 'pending' | 'accepted' | 'discarded';
}

export interface Chapter {
  id: string;
  title: string;
  status: '草案' | '完稿' | '修订中' | '构思';
  words: number;
  selected?: boolean;
}

export interface LoreNode {
  id: string;
  name: string;
  category: 'character' | 'place' | 'event' | 'item';
  x: number;
  y: number;
  description: string;
  subtitle: string;
}

export interface Template {
  id: string;
  title: string;
  category: 'prose' | 'poetry' | 'novel' | 'history';
  subtitle: string;
  tags: string[];
  bannerColor: string;
  width: number;
  lineHeight: number;
  quote: string;
  popular?: boolean;
}
