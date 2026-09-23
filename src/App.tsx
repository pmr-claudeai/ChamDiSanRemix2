/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ScreenTab, 
  Language, 
  FocusArea, 
  HeritageStory, 
  ArchiveDocument,
  CraftProduct,
  HeritageContribution,
  ProductReview
} from './types';
import { 
  FOCUS_AREAS, 
  HERITAGE_QUOTES, 
  ARCHIVE_DOCUMENTS, 
  HERITAGE_STORIES 
} from './data/heritageData';
import { CRAFT_PRODUCTS_DATA } from './data/craftProductsData';
import { INITIAL_CONTRIBUTIONS } from './data/contributionData';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FocusAreasSection } from './components/FocusAreasSection';
import { JourneySection } from './components/JourneySection';
import { NewsletterSection } from './components/NewsletterSection';
import { NewsArchiveScreen } from './components/NewsArchiveScreen';
import { StoriesScreen } from './components/StoriesScreen';
import { CraftMarketplaceScreen } from './components/CraftMarketplaceScreen';
import { HeritageContributionHub } from './components/HeritageContributionHub';

import { StoryModal } from './components/StoryModal';
import { DocumentModal } from './components/DocumentModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<ScreenTab>('about');
  const [language, setLanguage] = useState<Language>('vi');

  // Modal States
  const [selectedStory, setSelectedStory] = useState<HeritageStory | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<ArchiveDocument | null>(null);
  const [selectedFocusArea, setSelectedFocusArea] = useState<FocusArea | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Craft Marketplace State
  const [craftProducts, setCraftProducts] = useState<CraftProduct[]>(CRAFT_PRODUCTS_DATA);

  // Heritage Contributions State (with Moderation Queue)
  const [contributions, setContributions] = useState<HeritageContribution[]>(INITIAL_CONTRIBUTIONS);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add new contribution: adds to community archives
  const handleAddContribution = (newContrib: HeritageContribution) => {
    setContributions((prev) => [newContrib, ...prev]);
  };

  // Add new review to craft product
  const handleAddReview = (productId: string, newReview: ProductReview) => {
    setCraftProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          const updatedReviews = [newReview, ...currentReviews];
          const avg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...p,
            reviews: updatedReviews,
            rating: Number(avg.toFixed(1))
          };
        }
        return p;
      })
    );
  };

  // Switch tab with smooth scroll to top
  const handleSelectTab = (tab: ScreenTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open story reader from Quote or other trigger
  const handleOpenStoryById = (storyId: string) => {
    const found = HERITAGE_STORIES.find((s) => s.id === storyId) || HERITAGE_STORIES[0];
    setSelectedStory(found);
  };

  // Handle document download trigger
  const handleDownloadDoc = (doc: ArchiveDocument) => {
    triggerToast(
      language === 'vi'
        ? `Đang tải xuống: ${doc.title} (${doc.fileSize})`
        : `Downloading: ${doc.titleEn} (${doc.fileSize})`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#1B1C19]">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2B381C] text-white px-5 py-3 rounded-xl shadow-xl border border-[#4F5D3D] text-xs sm:text-sm font-medium flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#C5D5AD] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        language={language}
        onToggleLanguage={(lang) => setLanguage(lang)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Area Based on Current Active Tab */}
      <main className="flex-1">
        {currentTab === 'about' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section from Image 1 */}
            <HeroSection
              language={language}
              onExploreClick={() => {
                const el = document.getElementById('focus-areas');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleSelectTab('archive');
                }
              }}
            />

            {/* Lĩnh Vực Trọng Điểm 4-Card Section from Image 1 */}
            <FocusAreasSection
              focusAreas={FOCUS_AREAS}
              language={language}
              onSelectArea={(area) => setSelectedFocusArea(area)}
              onViewAllProjects={() => handleSelectTab('archive')}
            />

            {/* Hành Trình Giữ Lửa Dark Moss Section from Image 1 */}
            <JourneySection
              quotes={HERITAGE_QUOTES}
              language={language}
              onReadStory={handleOpenStoryById}
              onViewAllStories={() => handleSelectTab('stories')}
            />

            {/* Newsletter Subscription Block */}
            <NewsletterSection language={language} />
          </div>
        )}

        {currentTab === 'archive' && (
          <div className="animate-in fade-in duration-300">
            {/* Tin tức & Lưu trữ Di sản from Image 2 */}
            <NewsArchiveScreen
              documents={ARCHIVE_DOCUMENTS}
              language={language}
              onSelectDocument={(doc) => setSelectedDocument(doc)}
              onDownloadDocument={handleDownloadDoc}
            />
          </div>
        )}

        {currentTab === 'stories' && (
          <div className="animate-in fade-in duration-300">
            {/* Chuyện Nghề, Chuyện Người from Image 3 */}
            <StoriesScreen
              stories={HERITAGE_STORIES}
              language={language}
              onReadStory={(story) => setSelectedStory(story)}
              onLoadMoreStories={() => {
                triggerToast(
                  language === 'vi'
                    ? 'Đã tải toàn bộ kho tư liệu 4 câu chuyện nổi bật mới nhất.'
                    : 'Loaded all 4 latest highlighted heritage chronicles.'
                );
              }}
            />
          </div>
        )}

        {currentTab === 'marketplace' && (
          <div className="animate-in fade-in duration-300">
            {/* Giao thương Phi Trung Gian - Tinh Hoa Thủ Công */}
            <CraftMarketplaceScreen
              products={craftProducts}
              language={language}
              onAddProduct={(newProd) => {
                setCraftProducts((prev) => [newProd, ...prev]);
              }}
              onAddReview={handleAddReview}
              onToast={(msg) => triggerToast(msg)}
            />
          </div>
        )}

        {currentTab === 'contributions' && (
          <div className="animate-in fade-in duration-300">
            {/* Phân hệ Đóng góp Tri thức & Tư liệu Di sản */}
            <HeritageContributionHub
              contributions={contributions}
              language={language}
              onAddContribution={handleAddContribution}
              onToast={(msg) => triggerToast(msg)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onSelectTab={handleSelectTab}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals & Dialogs */}
      <StoryModal
        story={selectedStory}
        language={language}
        onClose={() => setSelectedStory(null)}
      />

      <DocumentModal
        document={selectedDocument}
        language={language}
        onClose={() => setSelectedDocument(null)}
        onDownload={handleDownloadDoc}
      />

      <ProjectDetailModal
        area={selectedFocusArea}
        language={language}
        onClose={() => setSelectedFocusArea(null)}
        onExploreArchive={() => {
          setSelectedFocusArea(null);
          handleSelectTab('archive');
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        language={language}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
