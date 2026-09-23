/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeritageStory, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ArrowRight, BookOpen, Clock, MapPin } from 'lucide-react';

interface StoriesScreenProps {
  stories: HeritageStory[];
  language: Language;
  onReadStory: (story: HeritageStory) => void;
  onLoadMoreStories: () => void;
}

export const StoriesScreen: React.FC<StoriesScreenProps> = ({
  stories,
  language,
  onReadStory,
  onLoadMoreStories,
}) => {
  const t = TRANSLATIONS[language];

  // The featured story is the first item or flagged as featured
  const featuredStory = stories.find((s) => s.isFeatured) || stories[0];
  const otherStories = stories.filter((s) => s.id !== featuredStory?.id);

  return (
    <div className="min-h-screen bg-[#FBF9F4] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Title & Editorial Subtitle */}
        <div className="text-center max-w-[760px] mx-auto mb-12 sm:mb-14">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-[44px] text-[#2B381C] tracking-tight mb-3">
            {t.storiesPage.title}
          </h1>
          <p className="font-editorial italic text-base sm:text-lg text-[#45483F]">
            {t.storiesPage.subtitle}
          </p>
        </div>

        {/* Featured Story Hero Card (Split view matching Image 3) */}
        {featuredStory && (
          <div className="bg-white border border-[#E4E2DD] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Photo */}
              <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] overflow-hidden group">
                <img 
                  src={featuredStory.imageUrl} 
                  alt={featuredStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Right Story Summary Content */}
              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Category Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#FE876A]/20 text-[#C0573E] text-xs font-semibold rounded-md border border-[#FE876A]/40">
                      {language === 'vi' ? featuredStory.tag : featuredStory.tagEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B1C19] tracking-tight mb-5 leading-tight">
                    {language === 'vi' ? featuredStory.title : featuredStory.titleEn}
                  </h2>

                  {/* Highlight Quote in Italics */}
                  <blockquote className="font-editorial italic text-base sm:text-lg text-[#A03F29] border-l-2 border-[#C0573E] pl-4 py-1 mb-6 leading-relaxed">
                    {language === 'vi' ? featuredStory.highlightQuote : featuredStory.highlightQuoteEn}
                  </blockquote>

                  {/* Summary Text */}
                  <p className="font-editorial text-sm sm:text-base text-[#45483F] leading-relaxed mb-6">
                    {language === 'vi' ? featuredStory.summary : featuredStory.summaryEn}
                  </p>
                </div>

                {/* Bottom row: Read More CTA + Meta */}
                <div className="pt-4 border-t border-[#F0EEE9] flex items-center justify-between">
                  <button
                    onClick={() => onReadStory(featuredStory)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2B381C] hover:bg-[#384527] active:bg-[#1E2713] text-white font-semibold text-sm rounded-lg transition-colors shadow-xs group"
                  >
                    <span>{t.storiesPage.readMore}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-3 text-xs text-[#6E7265]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredStory.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {featuredStory.location}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Section: Câu chuyện khác */}
        <div className="mb-14">
          <h3 className="font-heading font-bold text-2xl text-[#1B1C19] tracking-tight mb-8">
            {t.storiesPage.otherStories}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {otherStories.map((story) => (
              <div
                key={story.id}
                className="bg-white border border-[#E4E2DD] hover:border-[#C6C8BC] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={story.imageUrl} 
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#1B1C19] text-[11px] font-semibold rounded shadow-xs">
                        {language === 'vi' ? story.tag : story.tagEn}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 
                      onClick={() => onReadStory(story)}
                      className="font-heading font-bold text-lg text-[#1B1C19] group-hover:text-[#8C6239] transition-colors mb-3 cursor-pointer"
                    >
                      {language === 'vi' ? story.title : story.titleEn}
                    </h4>
                    <p className="font-editorial italic text-xs sm:text-sm text-[#45483F] leading-relaxed line-clamp-2 mb-4">
                      {language === 'vi' ? story.highlightQuote : story.highlightQuoteEn}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-[#F0EEE9] flex items-center justify-between">
                  <button
                    onClick={() => onReadStory(story)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6239] hover:text-[#5B3A16] transition-colors group/link"
                  >
                    <span>{t.storiesPage.continueReading}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </button>

                  <div className="text-[11px] text-[#6E7265] flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{story.readTime}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Load More Stories Button matching screenshot */}
        <div className="text-center pt-2 pb-6">
          <button
            onClick={onLoadMoreStories}
            className="px-8 py-2.5 bg-white hover:bg-[#F0EEE9] border border-[#C6C8BC] text-[#1B1C19] text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-xs"
          >
            {t.storiesPage.moreStoriesBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
