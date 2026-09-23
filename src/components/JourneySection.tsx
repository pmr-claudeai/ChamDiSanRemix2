/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeritageQuote, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ArrowRight, Quote } from 'lucide-react';

interface JourneySectionProps {
  quotes: HeritageQuote[];
  language: Language;
  onReadStory: (storyId: string) => void;
  onViewAllStories: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({
  quotes,
  language,
  onReadStory,
  onViewAllStories,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative w-full bg-[#F5F2EB] text-[#1B1C19] py-20 sm:py-24 overflow-hidden border-y border-[#EAE6DE]">
      
      {/* Subtle traditional lattice pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2B381C 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#2B381C] tracking-tight mb-3">
            {t.journey.title}
          </h2>
          <p className="font-editorial text-base sm:text-lg text-[#45483F]">
            {t.journey.subtitle}
          </p>
        </div>

        {/* 3 Quote Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {quotes.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E2DDD5] hover:border-[#8C6239] rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md group shadow-xs"
            >
              <div>
                {/* Quote Icon */}
                <div className="mb-5 text-[#8C6239] opacity-85 group-hover:opacity-100 transition-opacity">
                  <Quote className="w-8 h-8 rotate-180" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-[#1B1C19] mb-4 tracking-tight">
                  {language === 'vi' ? item.title : item.titleEn}
                </h3>

                {/* Quote body in italics */}
                <p className="font-editorial italic text-[15px] sm:text-base text-[#45483F] leading-relaxed mb-6">
                  {language === 'vi' ? item.quote : item.quoteEn}
                </p>
              </div>

              {/* Author & Read Action */}
              <div className="pt-4 border-t border-[#F0ECE4] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#6E7265]">
                    {item.author}
                  </p>
                </div>

                <button
                  onClick={() => onReadStory(item.storyId)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8C6239] hover:text-[#5B3A16] transition-colors group/link"
                >
                  <span>{t.journey.readStory}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* More Stories Button */}
        <div className="text-center">
          <button
            onClick={onViewAllStories}
            className="px-8 py-3 bg-[#2B381C] hover:bg-[#384527] border border-[#2B381C] text-[#FFFFFF] text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            {t.journey.moreStories}
          </button>
        </div>

      </div>
    </section>
  );
};
