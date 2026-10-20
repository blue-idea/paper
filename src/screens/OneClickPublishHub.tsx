import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Sidebar } from '../components/Sidebar';

export const OneClickPublishHub: React.FC = () => {
  const { navigateTo, showToast } = useStudio();

  const [activePlatformTab, setActivePlatformTab] = useState<'wechat' | 'zhihu' | 'douban'>('wechat');
  const [title, setTitle] = useState('晴窗坐雨：在南山草堂写给时间的信');
  const [summary, setSummary] = useState(
    '初秋时节，窗外淅淅沥沥下着连绵小雨。山中草木在湿润空气里渐次泛出清凉的青灰色。翻开案头的《南山杂记》，忽忆起去年此时，曾在石几上烹过的那壶老白茶。人生如浮萍聚散，唯有落墨于纸间的时刻，心才是落定的。'
  );
  const [selectedRatio, setSelectedRatio] = useState<'16:9' | '1:1' | '2.35:1'>('16:9');
  const [platforms, setPlatforms] = useState({
    wechat: true,
    douban: true,
    zhihu: true,
    weibo: false,
  });

  const [posterModalOpen, setPosterModalOpen] = useState(false);

  const handleSyncPublish = () => {
    const selectedCount = Object.values(platforms).filter(Boolean).length;
    showToast(`正在通过开放 API 向已选的 ${selectedCount} 个平台一键排版分发...`);
    setTimeout(() => {
      showToast('分发完成！微信公众号、知乎专栏、豆瓣长日记已全部同步草稿/发布');
    }, 1200);
  };

  const handleCopyHtml = () => {
    showToast('已复制宣纸微纹理与古典排印 HTML 富文本至剪贴板');
  };

  const handleAiRefineMeta = () => {
    setTitle('晴窗坐雨，纸上苍山：南山秋雨试茶记');
    setSummary('秋分刚过，山舍被浓稠水汽裹挟。闲展素笺，研墨瀹茶，借墨汁的氤氲，化解肉身的局限。');
    showToast('AI 已自动提炼出极具古典传播张力的标题与导语');
  };

  return (
    <div className="flex flex-1 overflow-hidden relative w-full h-[calc(100vh-44px-36px)]">
      {/* Sidebar Binder */}
      <Sidebar />

      {/* Main Publishing Hub Area */}
      <main className="flex-1 overflow-y-auto bg-background transition-colors pb-16">
        <div className="px-6 lg:px-8 pt-6 pb-12 max-w-7xl mx-auto w-full flex flex-col gap-6">
          {/* Top Action Breadcrumb & Quick Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-outline-variant/30 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                <span className="material-symbols-outlined text-[22px]">send_time_extension</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                    全网一键发布中心
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-ui-sm text-label-ui-sm font-medium">
                    排版引擎 2.4
                  </span>
                </div>
                <span className="font-caption-marginalia text-caption-marginalia text-outline">
                  跨平台自动适配 · 宣纸风格版式渲染 · 动态标题与渠道矩阵同步
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setPosterModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface transition-all font-label-ui text-label-ui shadow-sm cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <span>生成长图海报</span>
              </button>
              <button
                onClick={handleCopyHtml}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface transition-all font-label-ui text-label-ui shadow-sm cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">code</span>
                <span>复制富文本/HTML</span>
              </button>
              <button
                onClick={handleSyncPublish}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white font-title-editorial text-title-editorial shadow-md shadow-primary/25 transition-all active:scale-[0.98] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                <span>一键同步发布至 3 个平台 (⌘P)</span>
              </button>
            </div>
          </div>

          {/* Main Grid: Left Configuration & Right Live Simulated Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT CONFIGURATION COLUMN (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Document Source Summary Card */}
              <div className="bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-outline-variant/30 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-label-ui-sm text-label-ui-sm uppercase text-outline tracking-wider">
                    源稿件状态
                  </span>
                  <span className="flex items-center gap-1 text-secondary font-label-ui-sm text-label-ui-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    就绪可分发
                  </span>
                </div>
                <div className="flex items-start gap-3 mt-1">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container shadow-inner">
                    <img
                      className="w-full h-full object-cover"
                      alt="Traditional Chinese desk"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw4q8Vy6r02FiJWPvliHPnnbm4tDGOJhhsmk2UBd-AjAxlBa7v9tYOL2xC8cMux7xJro7Lsj0lyUL_OxTCboQghynuFlaJ8sTaw_nTm-jQC9bs6_mRY8gXWAYQWu7I52RbUhHanqqDWzrznvJichZ0UmT4tnCvaYvx5ldNbj15-xYRztTRaPapEsRcKfXCuZz3jb-HbsArjQYqCVxtPfneOdsv7gJNbIY_1D77ogCqxdgKbW2UPoZ4"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="font-title-editorial text-title-editorial text-on-surface truncate font-semibold">
                      《南山纪事 · 卷三》 浮生随笔
                    </div>
                    <div className="font-caption-marginalia text-caption-marginalia text-on-surface-variant mt-0.5 flex items-center gap-1">
                      <span>3,482 字</span>
                      <span className="text-outline">·</span>
                      <span>3 张配图</span>
                      <span className="text-outline">·</span>
                      <span>预计阅读 9 分钟</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="px-2 py-0.5 rounded bg-surface-container dark:bg-white/10 text-on-surface-variant font-label-ui-sm text-[10px]">
                        宋体文稿
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container dark:bg-white/10 text-on-surface-variant font-label-ui-sm text-[10px]">
                        带印章批注
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadata & Channel Adaptation Module */}
              <div className="bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-sm flex flex-col gap-4 border border-outline-variant/30 dark:border-white/10">
                <div className="flex items-center justify-between pb-1">
                  <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                    元信息与多平台调优
                  </span>
                  <button
                    onClick={handleAiRefineMeta}
                    className="flex items-center gap-1 font-label-ui-sm text-label-ui-sm text-secondary hover:underline cursor-pointer font-medium"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    <span>AI 重构标题与导语</span>
                  </button>
                </div>

                {/* Channel Title Input */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-ui text-label-ui text-on-surface-variant flex items-center justify-between">
                    <span>全网主发布标题</span>
                    <span className="text-outline font-label-ui-sm text-label-ui-sm font-mono">
                      {title.length}/32 字
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full bg-surface-container dark:bg-white/10 px-3 py-1.5 rounded-lg text-on-surface font-title-editorial text-title-editorial focus:bg-surface-container-lowest outline-none shadow-inner"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                      onClick={() => showToast('针对微信/豆瓣/知乎分别微调标题风格')}
                      className="absolute right-2 text-outline hover:text-primary cursor-pointer"
                      title="针对各平台单独设标题"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">splitscreen</span>
                    </button>
                  </div>
                </div>

                {/* Cover Image Selector */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-ui text-label-ui text-on-surface-variant">
                      封面自适应裁切
                    </span>
                    <span className="font-label-ui-sm text-label-ui-sm text-outline">
                      已适配 16:9 / 2.35:1 / 1:1
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      onClick={() => setSelectedRatio('16:9')}
                      className={`relative rounded-lg overflow-hidden bg-surface-container cursor-pointer shadow-sm transition-all ${
                        selectedRatio === '16:9' ? 'ring-2 ring-primary' : 'hover:opacity-90'
                      }`}
                    >
                      <div className="aspect-video w-full">
                        <img
                          className="w-full h-full object-cover"
                          alt="Chinese calligraphy brush"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKYmavR_2ewnmeFWYgNi5W0uHJ6XpeSId6cULrA3zzA2DmZqPbt39RkBYmfT4BnYtCXQHCB5bl9v70U6GimeQ66FLI4BAwZDwEBCLsjhsjWeYLmyKEJoyGpQWEt-kyG_-PrMj2vllyEDaXF0ee8G6hfvr2cGRzTPsZY4c-SBMBhdnV1Y1Lo-mIY9uVzavM94j2IZzKPt4fL4eoSmi6nLLN5nTCgUMnHN79VJpXdB5MFqB8dzQlbCvJ"
                        />
                      </div>
                      <div className="absolute bottom-1 left-1.5 bg-black/75 text-white px-1.5 rounded font-mono text-[9px]">
                        16:9 公众号
                      </div>
                      {selectedRatio === '16:9' && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-[10px]">check</span>
                        </div>
                      )}
                    </div>

                    <div
                      onClick={() => setSelectedRatio('1:1')}
                      className={`relative rounded-lg overflow-hidden bg-surface-container cursor-pointer shadow-sm transition-all ${
                        selectedRatio === '1:1' ? 'ring-2 ring-primary' : 'hover:opacity-90'
                      }`}
                    >
                      <div className="aspect-square w-full">
                        <img
                          className="w-full h-full object-cover"
                          alt="Lotus seed pod and celadon cup"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDteRHcuBCmdxb_MRiVoYg6iZxCZedJERsYuWIjn-QhGNVKyFIJ9SlZ6s4TwB37ZO-c6QtrVn-By0pug8pvKFa_1eNQwQ11idkbTlL5k6W9beH6kf3Z-cof3iiIw862vy1dhBRJuNUUKgj9FUMrGAGxJaMFChT6YYwHIOOPMllS6ig7Xl4vD4VHaqtX2U_gOppP0OmguygxKNvVo_KjhdOqku4fxCOcU4ESgue7Ly01Krq1iooFER3H"
                        />
                      </div>
                      <div className="absolute bottom-1 left-1.5 bg-black/75 text-white px-1.5 rounded font-mono text-[9px]">
                        1:1 豆瓣/微博
                      </div>
                      {selectedRatio === '1:1' && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-[10px]">check</span>
                        </div>
                      )}
                    </div>

                    <div
                      onClick={() => setSelectedRatio('2.35:1')}
                      className={`relative rounded-lg overflow-hidden bg-surface-container cursor-pointer shadow-sm transition-all ${
                        selectedRatio === '2.35:1' ? 'ring-2 ring-primary' : 'hover:opacity-90'
                      }`}
                    >
                      <div className="aspect-[2.35/1] w-full">
                        <img
                          className="w-full h-full object-cover"
                          alt="Misty mountain ridge banner"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqGBviW6oF1kQfWvLLQLMsVURwTnfVMiTZwF22Wy5BsAOBxDg7OW19AmlyGmKer6eifCLjTxGNznX1Xrf80BwCZknap8LrmNcKGAmTReETPNtzFEOK2Y6xACgE4P-CLMheJf4xnhtZB9macSnryuHASxYfTXTc_2D4ANLrpmGIpn96rAs_JlRzihseu3tmG2F4GyFHrZ2l67d4EpcTd_BpgKbnD-nYUTQqXHVhNo-LXgu0H1aUPRMP"
                        />
                      </div>
                      <div className="absolute bottom-1 left-1.5 bg-black/75 text-white px-1.5 rounded font-mono text-[9px]">
                        2.35:1 知乎横幅
                      </div>
                      {selectedRatio === '2.35:1' && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-[10px]">check</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Abstract & Intro */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-ui text-label-ui text-on-surface-variant">
                      导语与平台摘要
                    </span>
                    <span className="font-label-ui-sm text-label-ui-sm text-secondary">
                      AI 精炼 {summary.length}字
                    </span>
                  </div>
                  <textarea
                    className="w-full bg-surface-container dark:bg-white/10 p-2.5 rounded-lg text-on-surface font-caption-marginalia text-caption-marginalia resize-none focus:bg-surface-container-lowest outline-none shadow-inner leading-relaxed"
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-label-ui text-label-ui text-on-surface-variant">
                    分发主题标签
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['#散文随笔', '#慢生活哲学', '#秋日书房', '#读书写作日常'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-surface-container-high dark:bg-white/10 text-on-surface font-label-ui-sm text-label-ui-sm flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => showToast(`已移除标签 ${tag}`)}
                          className="text-outline hover:text-on-surface cursor-pointer"
                          type="button"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => showToast('请输入自定标签')}
                      className="px-2 py-0.5 rounded-full bg-surface-container dark:bg-white/10 text-outline hover:text-on-surface font-label-ui-sm text-label-ui-sm flex items-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[12px]">add</span>
                      标签
                    </button>
                  </div>
                </div>
              </div>

              {/* Platforms Publishing Matrix */}
              <div className="bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                      同步目标分发矩阵
                    </span>
                    <span className="font-caption-marginalia text-caption-marginalia text-outline">
                      (已选 {Object.values(platforms).filter(Boolean).length} 个平台)
                    </span>
                  </div>
                  <button
                    onClick={() => showToast('已打开第三方平台 OAuth 授权凭证管理')}
                    className="font-label-ui-sm text-label-ui-sm text-primary hover:underline cursor-pointer"
                    type="button"
                  >
                    授权管理
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {/* WeChat */}
                  <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high cursor-pointer transition-colors border border-outline-variant/20">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#07C160]/10 flex items-center justify-center text-[#07C160] flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-label-ui text-label-ui text-on-surface font-medium truncate">
                            微信公众号
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-ui-sm text-[10px]">
                            已绑定: 南山草堂札记
                          </span>
                        </div>
                        <span className="font-caption-marginalia text-caption-marginalia text-outline truncate">
                          预设: 纸屿宋体 · 宣纸微纹理 · 印章居中分割
                        </span>
                      </div>
                    </div>
                    <input
                      checked={platforms.wechat}
                      onChange={(e) => setPlatforms({ ...platforms, wechat: e.target.checked })}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                      type="checkbox"
                    />
                  </label>

                  {/* Douban */}
                  <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high cursor-pointer transition-colors border border-outline-variant/20">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#007722]/10 flex items-center justify-center text-[#007722] flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">menu_book</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-label-ui text-label-ui text-on-surface font-medium truncate">
                            豆瓣长日记
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-container-highest dark:bg-white/10 text-on-surface-variant font-label-ui-sm text-[10px]">
                            已绑定: 晴川行客
                          </span>
                        </div>
                        <span className="font-caption-marginalia text-caption-marginalia text-outline truncate">
                          预设: 纯文字书卷风格 · 米黄素雅 · 屏蔽装饰图
                        </span>
                      </div>
                    </div>
                    <input
                      checked={platforms.douban}
                      onChange={(e) => setPlatforms({ ...platforms, douban: e.target.checked })}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                      type="checkbox"
                    />
                  </label>

                  {/* Zhihu */}
                  <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high cursor-pointer transition-colors border border-outline-variant/20">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF] flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">explore</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-label-ui text-label-ui text-on-surface font-medium truncate">
                            知乎专栏
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-container-highest dark:bg-white/10 text-on-surface-variant font-label-ui-sm text-[10px]">
                            专栏: 纸上清谈
                          </span>
                        </div>
                        <span className="font-caption-marginalia text-caption-marginalia text-outline truncate">
                          预设: 人文混排 · 悬浮交互脚注 · 题头大卡
                        </span>
                      </div>
                    </div>
                    <input
                      checked={platforms.zhihu}
                      onChange={(e) => setPlatforms({ ...platforms, zhihu: e.target.checked })}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                      type="checkbox"
                    />
                  </label>

                  {/* Weibo */}
                  <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container/60 dark:bg-white/5 hover:bg-surface-container cursor-pointer transition-colors border border-outline-variant/20">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#E6162D]/10 flex items-center justify-center text-[#E6162D] flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">newspaper</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-label-ui text-label-ui text-on-surface-variant truncate">
                            简书 / 今日头条 / 微博长文
                          </span>
                        </div>
                        <span className="font-caption-marginalia text-caption-marginalia text-outline truncate">
                          预设: 清爽富文本 · 自动切分段落
                        </span>
                      </div>
                    </div>
                    <input
                      checked={platforms.weibo}
                      onChange={(e) => setPlatforms({ ...platforms, weibo: e.target.checked })}
                      className="w-4 h-4 accent-primary rounded cursor-pointer"
                      type="checkbox"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT MULTI-PLATFORM LIVE STAGE (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Live Preview Chrome Bar */}
              <div className="bg-surface-container-low dark:bg-white/5 rounded-xl p-2 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2 border border-outline-variant/30 dark:border-white/10">
                <div className="flex items-center gap-1 bg-surface-container dark:bg-white/10 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
                  <button
                    onClick={() => setActivePlatformTab('wechat')}
                    className={`px-3 py-1.5 rounded-md font-title-editorial text-caption-marginalia font-medium shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                      activePlatformTab === 'wechat'
                        ? 'bg-surface-container-lowest dark:bg-[#25262C] text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
                    <span>微信公众号预览 (手机屏)</span>
                  </button>
                  <button
                    onClick={() => setActivePlatformTab('zhihu')}
                    className={`px-3 py-1.5 rounded-md font-title-editorial text-caption-marginalia flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                      activePlatformTab === 'zhihu'
                        ? 'bg-surface-container-lowest dark:bg-[#25262C] text-primary font-medium shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">laptop_mac</span>
                    <span>知乎专栏预览 (网页端)</span>
                  </button>
                  <button
                    onClick={() => setActivePlatformTab('douban')}
                    className={`px-3 py-1.5 rounded-md font-title-editorial text-caption-marginalia flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
                      activePlatformTab === 'douban'
                        ? 'bg-surface-container-lowest dark:bg-[#25262C] text-primary font-medium shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">book</span>
                    <span>豆瓣长文预览 (米黄底)</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 px-1">
                  <button
                    onClick={() => showToast('已切换移动端浅色/深色仿真模式')}
                    className="w-8 h-8 rounded-lg bg-surface-container dark:bg-white/10 flex items-center justify-center text-outline hover:text-on-surface transition-colors cursor-pointer"
                    title="调整手机深色/浅色模式"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                  </button>
                  <button
                    className="px-2 py-1 rounded-lg bg-surface-container dark:bg-white/10 font-label-ui-sm text-label-ui-sm text-on-surface-variant"
                    title="缩放比例"
                    type="button"
                  >
                    100%
                  </button>
                </div>
              </div>

              {/* Device Frame */}
              <div className="w-full bg-surface-container-high/50 dark:bg-black/30 rounded-2xl p-4 md:p-8 flex justify-center items-center shadow-inner relative overflow-hidden min-h-[640px] border border-outline-variant/30">
                {activePlatformTab === 'wechat' ? (
                  /* iPhone 16 Device Frame Simulation */
                  <div className="w-full max-w-[390px] bg-[#1c1b1a] rounded-[44px] p-[10px] shadow-2xl ring-1 ring-outline/20 relative">
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#111] shadow-inner" />
                      <div className="w-2 h-2 rounded-full bg-[#0a1020]/90" />
                    </div>

                    {/* Inner Screen Surface */}
                    <div className="w-full bg-[#FAF7F2] rounded-[36px] overflow-hidden flex flex-col text-[#2B2A28] relative h-[680px]">
                      {/* WeChat Nav Bar */}
                      <div className="pt-8 pb-2 px-4 bg-[#FAF7F2]/90 backdrop-blur border-b border-outline-variant/30 flex items-center justify-between z-20">
                        <div className="flex items-center gap-1 text-[#57423F]">
                          <span className="material-symbols-outlined text-[20px]">
                            chevron_left
                          </span>
                          <span className="font-label-ui-sm text-label-ui-sm font-medium">
                            微信公众号
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#57423F]">
                          <div className="flex items-center gap-1 bg-[#ECE5DA] px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#57423F]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#57423F]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#57423F]" />
                          </div>
                          <span className="material-symbols-outlined text-[18px]">
                            radio_button_checked
                          </span>
                        </div>
                      </div>

                      {/* Article Scrollable Content */}
                      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-12 space-y-4">
                        <div className="flex flex-col gap-1">
                          <h1 className="text-[20px] leading-[30px] font-semibold text-[#1C1B1A] tracking-tight">
                            {title}
                          </h1>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8A716E]">
                            <span className="text-[#952F25] font-medium">南山草堂札记</span>
                            <span>·</span>
                            <span>晴川 著</span>
                            <span>·</span>
                            <span>今日 14:32</span>
                          </div>
                        </div>

                        {/* Drop Cap */}
                        <div className="pt-1">
                          <div className="text-[15px] leading-[28px] text-[#2B2A28] text-justify font-serif">
                            <span className="float-left text-[38px] leading-[34px] pr-2 pt-1 text-[#952F25] font-semibold select-none">
                              初
                            </span>
                            {summary}
                          </div>
                        </div>

                        {/* Banner Photo */}
                        <div className="rounded-xl overflow-hidden shadow-sm bg-surface-container">
                          <img
                            className="w-full h-44 object-cover"
                            alt="Tea preparation"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD6q_2BMsT5xEIrooBkM03TOABH6l22UKnwVGVe-erzGe90YgqVQoO8-uUvs0ttuRx1o226xC2KogSxkPi1cktL9Rp6d_pzA2J4Vnl5Cc5X5SnQu2OyKykRzvUKKYz-SDz6_bJMKBx9F8hO2kH-kKhINe3S2BQ8PuqxUWnUhmbghR692Hd4WITooLdrrrdFXOFaDjNnjCQok3fnS08rPzD-N6WVYxyoEr2PkDjn2Kl2lYWswNxNYQ8"
                          />
                          <div className="p-2 bg-[#F5F0E6] text-center text-[11px] text-[#8A716E] italic">
                            草堂檐下听雨试茶 · 摄于庚子秋月
                          </div>
                        </div>

                        {/* Styled Quote */}
                        <div className="p-3 bg-[#B4EAE0]/25 rounded-lg border-l-2 border-[#33675F] flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-[#33675F] text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[14px]">
                              format_quote
                            </span>
                            <span>文斋雅注 · 随想</span>
                          </div>
                          <p className="text-[13px] leading-[22px] text-[#386B63] italic">
                            “若无闲事挂心头，便是人间好时节。人于清闲之境，最易读见平生所历之真味。”
                          </p>
                        </div>

                        <p className="text-[15px] leading-[28px] text-[#2B2A28] text-justify font-serif">
                          书斋幽静，炉火轻吐微红。墨香散落在微潮的宣纸上，字迹未干。时间仿佛被这一场雨洗得极慢，慢到能数清屋檐下坠落的每一滴水声。写作，终究不是为了追赶世界的喧哗，而是为了在一座座时间的孤岛上，种下一株不灭的芭蕉。
                        </p>

                        {/* Seal */}
                        <div className="flex items-center justify-center py-3 gap-3 select-none">
                          <div className="w-12 h-[1px] bg-[#8A716E]/40" />
                          <div className="w-6 h-6 rounded border border-[#952F25]/40 text-[#952F25] flex items-center justify-center text-[10px] bg-[#952F25]/10 font-bold">
                            纸屿
                          </div>
                          <div className="w-12 h-[1px] bg-[#8A716E]/40" />
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[#8A716E] text-[11px] border-t border-[#8A716E]/20">
                          <div className="flex items-center gap-3">
                            <span>阅读 1,024</span>
                            <span className="flex items-center gap-1 text-[#952F25]">
                              <span className="material-symbols-outlined text-[13px]">favorite</span>{' '}
                              89
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">
                                thumb_up
                              </span>{' '}
                              142
                            </span>
                          </div>
                          <span className="text-[#33675F] font-medium">在看 · 分享</span>
                        </div>
                      </div>

                      {/* Home Indicator */}
                      <div className="h-5 w-full bg-[#FAF7F2] flex items-center justify-center pb-1">
                        <div className="w-32 h-1 bg-[#2B2A28]/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Desktop / Web Reader View */
                  <div className="w-full max-w-xl bg-surface-container-lowest dark:bg-[#25262C] rounded-2xl p-6 shadow-xl border border-outline-variant/30 text-on-surface flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                      <span className="text-xs text-primary font-semibold">
                        {activePlatformTab === 'zhihu' ? '知乎专栏 · 纸上清谈' : '豆瓣长文 · 晴川行客'}
                      </span>
                      <span className="text-xs text-outline">排版已自动匹配平台版式规范</span>
                    </div>
                    <h2 className="text-xl font-bold leading-snug">{title}</h2>
                    <p className="text-sm leading-relaxed text-on-surface-variant font-serif indent-8">
                      {summary}
                    </p>
                    <div className="p-3 bg-surface-container rounded-lg text-xs italic border-l-2 border-primary">
                      “若无闲事挂心头，便是人间好时节。人于清闲之境，最易读见平生所历之真味。”
                    </div>
                    <p className="text-sm leading-relaxed text-on-surface-variant font-serif indent-8">
                      书斋幽静，炉火轻吐微红。墨香散落在微潮的宣纸上，字迹未干。时间仿佛被这一场雨洗得极慢，慢到能数清屋檐下坠落的每一滴水声。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: Publishing History & Long-Image Poster Suite */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* History Timeline Cards (7 Cols) */}
            <div className="lg:col-span-7 bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30 dark:border-white/10">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    history_edu
                  </span>
                  <span className="font-title-editorial text-title-editorial text-on-surface font-semibold">
                    前序章节发布表现与记录
                  </span>
                </div>
                <button
                  onClick={() => showToast('已调阅全部 14 篇前序章节发布总档案')}
                  className="font-label-ui-sm text-label-ui-sm text-outline hover:text-on-surface cursor-pointer"
                  type="button"
                >
                  查看全部 14 篇
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {/* History Item 1 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high transition-colors gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-title-editorial text-headline-sm font-semibold flex-shrink-0">
                      二
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-title-editorial text-title-editorial text-on-surface font-medium">
                          《南山纪事 · 卷二》 夜泊清溪
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-highest dark:bg-white/10 text-on-surface-variant font-label-ui-sm text-[10px]">
                          3天前
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 font-caption-marginalia text-caption-marginalia text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#07C160]" /> 公众号: 3,820 阅读
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#007722]" /> 豆瓣: 2,490 阅读 / 142 赞
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#0066FF]" /> 知乎: 98 赞同
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast('夜泊清溪：全渠道综合完播率 74.2%')}
                    className="px-3 py-1 rounded bg-surface-container-high dark:bg-white/15 hover:bg-surface-container-highest text-on-surface font-label-ui-sm text-label-ui-sm transition-colors cursor-pointer self-end sm:self-center"
                    type="button"
                  >
                    数据洞察
                  </button>
                </div>

                {/* History Item 2 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high transition-colors gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center font-title-editorial text-headline-sm font-semibold flex-shrink-0">
                      一
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-title-editorial text-title-editorial text-on-surface font-medium">
                          《南山纪事 · 卷一》 入山问泉
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-highest dark:bg-white/10 text-on-surface-variant font-label-ui-sm text-[10px]">
                          上周
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 font-caption-marginalia text-caption-marginalia text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#07C160]" /> 公众号: 5,110 阅读
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#007722]" /> 豆瓣: 3,120 阅读 / 268 赞
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#0066FF]" /> 知乎: 215 赞同
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast('入山问泉：全渠道综合完播率 81.6%')}
                    className="px-3 py-1 rounded bg-surface-container-high dark:bg-white/15 hover:bg-surface-container-highest text-on-surface font-label-ui-sm text-label-ui-sm transition-colors cursor-pointer self-end sm:self-center"
                    type="button"
                  >
                    数据洞察
                  </button>
                </div>
              </div>
            </div>

            {/* Poster Generator (5 Cols) */}
            <div className="lg:col-span-5 bg-surface-container-low dark:bg-white/5 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-4 border border-outline-variant/30 dark:border-white/10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-title-editorial text-title-editorial text-on-surface flex items-center gap-1.5 font-semibold">
                    <span className="material-symbols-outlined text-[20px] text-secondary">
                      photo_size_select_actual
                    </span>
                    高清长图文 / 海报导出工坊
                  </span>
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-ui-sm text-label-ui-sm font-medium">
                    300 DPI
                  </span>
                </div>
                <p className="font-caption-marginalia text-caption-marginalia text-on-surface-variant leading-relaxed">
                  自动将排版文稿切片拼接为符合小红书多图卡片 (3:4) 或 微博长图海报，内置纸屿经典木刻印章与书法落款水印。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => showToast('已准备小红书 3:4 (4张) 宣纸精切卡片包')}
                  className="p-3 rounded-lg bg-surface-container dark:bg-white/10 flex flex-col items-center justify-center text-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[28px] text-primary group-hover:scale-110 transition-transform">
                    filter
                  </span>
                  <span className="font-label-ui text-label-ui text-on-surface font-medium">
                    小红书 3:4 切片 (4图)
                  </span>
                  <span className="font-caption-marginalia text-caption-marginalia text-outline">
                    带纸张纹理与金句摘录
                  </span>
                </div>

                <div
                  onClick={() => showToast('已渲染 800×4200 微博长图卷轴')}
                  className="p-3 rounded-lg bg-surface-container dark:bg-white/10 flex flex-col items-center justify-center text-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[28px] text-secondary group-hover:scale-110 transition-transform">
                    panorama_vertical
                  </span>
                  <span className="font-label-ui text-label-ui text-on-surface font-medium">
                    微博超长卷轴 (800×4200)
                  </span>
                  <span className="font-caption-marginalia text-caption-marginalia text-outline">
                    完整长文一屏阅尽
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-container-high dark:border-white/10">
                <span className="font-caption-marginalia text-caption-marginalia text-outline">
                  格式: PNG无损 / PDF出版级
                </span>
                <button
                  onClick={() => showToast('精美画卷导出成功！已保存至本地下载目录')}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-secondary text-white font-label-ui text-label-ui hover:bg-secondary/90 transition-all shadow-sm cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>导出精美画卷</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Poster Modal */}
        {posterModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setPosterModalOpen(false)}
          >
            <div
              className="bg-[#FAF7F2] dark:bg-[#25262C] max-w-md w-full rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col gap-4 border border-outline-variant/30 text-[#2B2A28] dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-title-editorial font-semibold">长图文海报即时渲染</span>
                <button
                  onClick={() => setPosterModalOpen(false)}
                  className="text-outline hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="p-4 bg-[#F5F0E6] dark:bg-white/5 rounded-xl border border-outline-variant/20 flex flex-col gap-3 font-serif">
                <div className="text-center font-bold text-lg text-primary">{title}</div>
                <div className="text-xs text-[#8A716E] text-center">岁次壬寅秋月 · 纸屿书斋排印</div>
                <div className="text-sm leading-relaxed indent-6 text-justify">{summary}</div>
                <div className="flex justify-end pt-2">
                  <div className="w-8 h-8 rounded border border-primary text-primary flex items-center justify-center text-xs font-bold">
                    纸屿
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  showToast('已保存长图海报至本地相册');
                  setPosterModalOpen(false);
                }}
                className="w-full py-2 bg-primary text-white rounded-xl font-medium shadow-sm hover:bg-primary-container cursor-pointer transition-colors"
              >
                下载长图海报 (PNG)
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
