/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FocusArea, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ArrowRight, Sparkles, Layers, Box, Music, Hammer } from 'lucide-react';

interface FocusAreasSectionProps {
  focusAreas: FocusArea[];
  language: Language;
  onSelectArea: (area: FocusArea) => void;
  onViewAllProjects: () => void;
}

export const FocusAreasSection: React.FC<FocusAreasSectionProps> = ({
  focusAreas,
  language,
  onSelectArea,
  onViewAllProjects,
}) => {
  const t = TRANSLATIONS[language];

  // Specific icon mapping
  const getIcon = (id: string) => {
    switch (id) {
      case 'tangible':
        return <Layers className="w-4 h-4" />;
      case 'digital':
        return <Box className="w-4 h-4" />;
      case 'intangible':
        return <Music className="w-4 h-4" />;
      case 'craft_village':
        return <Hammer className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="focus-areas" className="max-w-[1280px] mx-auto px-6 sm:px-8 py-16 sm:py-20">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B1C19] tracking-tight">
            {t.focusAreas.title}
          </h2>
          <p className="font-editorial text-[#45483F] text-base sm:text-lg mt-2">
            {t.focusAreas.subtitle}
          </p>
        </div>

        <button
          onClick={onViewAllProjects}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C6239] hover:text-[#5B3A16] transition-colors group self-start sm:self-auto"
        >
          <span>{t.focusAreas.viewAll}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid of 4 Core Focus Area Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1: Di sản Vật thể (Width 7 cols on desktop) */}
        {focusAreas[0] && (
          <div 
            onClick={() => onSelectArea(focusAreas[0])}
            className="md:col-span-7 group relative h-[320px] sm:h-[360px] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-[#E4E2DD]"
          >
            <img 
              src={focusAreas[0].imageUrl} 
              alt={focusAreas[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88]"
            />
            {/* Dark gradient overlay for extreme text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C19]/90 via-[#1B1C19]/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
              {focusAreas[0].badge && (
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-md border border-white/30">
                    {getIcon(focusAreas[0].id)}
                    {language === 'vi' ? focusAreas[0].badge : focusAreas[0].badgeEn}
                  </span>
                </div>
              )}
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2 tracking-tight group-hover:text-[#F8C696] transition-colors">
                {language === 'vi' ? focusAreas[0].title : focusAreas[0].titleEn}
              </h3>
              <p className="font-editorial text-sm sm:text-base text-[#FBF9F4]/90 line-clamp-2 max-w-[540px]">
                {language === 'vi' ? focusAreas[0].description : focusAreas[0].descriptionEn}
              </p>
            </div>
          </div>
        )}

        {/* Card 2: Số hóa Di sản (Width 5 cols on desktop) */}
        {focusAreas[1] && (
          <div 
            onClick={() => onSelectArea(focusAreas[1])}
            className="md:col-span-5 group relative h-[320px] sm:h-[360px] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-[#E4E2DD]"
          >
            <img 
              src={focusAreas[1].imageUrl} 
              alt={focusAreas[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C19]/90 via-[#1B1C19]/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2 tracking-tight group-hover:text-[#F8C696] transition-colors">
                {language === 'vi' ? focusAreas[1].title : focusAreas[1].titleEn}
              </h3>
              <p className="font-editorial text-sm sm:text-base text-[#FBF9F4]/90 line-clamp-2">
                {language === 'vi' ? focusAreas[1].description : focusAreas[1].descriptionEn}
              </p>
            </div>
          </div>
        )}

        {/* Card 3: Di sản Phi vật thể (Width 5 cols on desktop) */}
        {focusAreas[2] && (
          <div 
            onClick={() => onSelectArea(focusAreas[2])}
            className="md:col-span-5 group relative h-[320px] sm:h-[340px] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-[#E4E2DD]"
          >
            <img 
              src={focusAreas[2].imageUrl} 
              alt={focusAreas[2].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C19]/90 via-[#1B1C19]/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2 tracking-tight group-hover:text-[#F8C696] transition-colors">
                {language === 'vi' ? focusAreas[2].title : focusAreas[2].titleEn}
              </h3>
              <p className="font-editorial text-sm sm:text-base text-[#FBF9F4]/90 line-clamp-2">
                {language === 'vi' ? focusAreas[2].description : focusAreas[2].descriptionEn}
              </p>
            </div>
          </div>
        )}

        {/* Card 4: Làng nghề Truyền thống (Width 7 cols on desktop) */}
        {focusAreas[3] && (
          <div 
            onClick={() => onSelectArea(focusAreas[3])}
            className="md:col-span-7 group relative h-[320px] sm:h-[340px] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-[#E4E2DD]"
          >
            <img 
              src={focusAreas[3].imageUrl} 
              alt={focusAreas[3].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1C19]/90 via-[#1B1C19]/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2 tracking-tight group-hover:text-[#F8C696] transition-colors">
                {language === 'vi' ? focusAreas[3].title : focusAreas[3].titleEn}
              </h3>
              <p className="font-editorial text-sm sm:text-base text-[#FBF9F4]/90 line-clamp-2 max-w-[540px]">
                {language === 'vi' ? focusAreas[3].description : focusAreas[3].descriptionEn}
              </p>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
