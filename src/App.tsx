import React from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { MainWritingStudio } from './screens/MainWritingStudio';
import { AICompanionReview } from './screens/AICompanionReview';
import { KnowledgeLoreResearch } from './screens/KnowledgeLoreResearch';
import { LiteraryTemplatesWorkshop } from './screens/LiteraryTemplatesWorkshop';
import { StudioPreferencesThemes } from './screens/StudioPreferencesThemes';
import { OneClickPublishHub } from './screens/OneClickPublishHub';

const ScreenRouter: React.FC = () => {
  const { currentScreen, currentTheme, toastMessage } = useStudio();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main-writing-studio':
        return <MainWritingStudio />;
      case 'ai-companion-review':
        return <AICompanionReview />;
      case 'knowledge-lore-research':
        return <KnowledgeLoreResearch />;
      case 'literary-templates-workshop':
        return <LiteraryTemplatesWorkshop />;
      case 'studio-preferences-themes':
        return <StudioPreferencesThemes />;
      case 'one-click-publish-hub':
        return <OneClickPublishHub />;
      default:
        return <MainWritingStudio />;
    }
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden select-none font-body-prose ${
        currentTheme.isDark ? 'dark' : ''
      }`}
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
      }}
    >
      {/* Top Header */}
      <Header />

      {/* Main active screen */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {renderScreen()}
      </div>

      {/* Global Status Footer */}
      <Footer />

      {/* Command Palette Modal */}
      <CommandPalette />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 bg-[#1C1B1A]/95 text-[#FDF9F5] px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 z-50 animate-bounce text-xs font-label-ui border border-white/20">
          <span className="material-symbols-outlined text-[#9CD1C7] text-[18px]">
            verified
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StudioProvider>
      <ScreenRouter />
    </StudioProvider>
  );
}
