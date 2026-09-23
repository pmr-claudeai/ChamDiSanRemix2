/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ArrowDown, Compass } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreClick,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#EAE8E3]">
      {/* Background Image with warm editorial grading & subtle vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://tourista.vn/wp-content/uploads/2021/11/khamphanetdepcaclangnghetruyenthongvietnam.jpg')`,
        }}
      >
        {/* Soft gradient overlays to ensure extreme readability and paper tone transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F4]/75 via-[#FBF9F4]/80 to-[#FBF9F4]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FBF9F4]/40 to-[#FBF9F4]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1020px] mx-auto px-6 text-center py-16 sm:py-20 flex flex-col items-center">
        
        {/* Large Editorial Quote */}
        <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#2B381C] tracking-tight leading-[1.3] sm:leading-[1.25] max-w-[960px] mb-6 [text-wrap:balance]">
          {t.hero.quote}
        </h1>

        {/* Subtitle */}
        <p className="font-editorial text-base sm:text-lg md:text-xl text-[#384527] max-w-[780px] leading-relaxed mb-10 opacity-90 [text-wrap:pretty]">
          {t.hero.subtitle}
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-8 py-3.5 bg-[#5B3A16] hover:bg-[#4A2F12] active:bg-[#3D250C] text-[#FFFFFF] text-base font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2.5 group"
          >
            <Compass className="w-5 h-5 text-[#F8C696] group-hover:rotate-45 transition-transform duration-300" />
            <span>{t.hero.cta}</span>
          </button>
        </div>

        {/* Subtle scroll cue */}
        <div className="mt-12 text-[#6E7265] animate-bounce cursor-pointer" onClick={onExploreClick}>
          <ArrowDown className="w-5 h-5" />
        </div>

      </div>
    </section>
  );
};
