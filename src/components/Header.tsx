/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenTab, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { Menu, X, Globe, ShoppingBag, UploadCloud } from 'lucide-react';

interface HeaderProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems: { id: ScreenTab; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'archive', label: t.nav.news },
    { id: 'stories', label: t.nav.storiesAlt },
    { id: 'marketplace', label: t.nav.marketplace },
    { id: 'contributions', label: t.nav.contributions },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#E4E2DD]/70 transition-all">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => onSelectTab('about')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <img
            src="https://chamdisan.online/wp-content/uploads/2026/07/cropped-logo-fb-cham-ko-noi-dung-scaled-1.png"
            alt={t.brand}
            className="w-10 h-10 object-contain rounded-lg transition-transform group-hover:scale-105"
          />
          <div>
            <span className="font-heading font-bold text-2xl text-[#1B1C19] tracking-tight block">
              {t.brand}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative py-2 text-[15px] font-medium transition-colors focus:outline-none ${
                  isActive
                    ? 'text-[#1B1C19] font-semibold'
                    : 'text-[#45483F] hover:text-[#1B1C19]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.id === 'marketplace' && <ShoppingBag className="w-4 h-4 text-[#C0573E]" />}
                  {item.id === 'contributions' && <UploadCloud className="w-4 h-4 text-[#4F5D3D]" />}
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C0573E] rounded-full animate-in fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Language Switch & Contact Button */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switch */}
          <div className="flex items-center text-xs font-semibold tracking-wider text-[#45483F]">
            <button
              onClick={() => onToggleLanguage('vi')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'vi' ? 'text-[#1B1C19] font-bold' : 'hover:text-[#1B1C19] opacity-60'
              }`}
            >
              VI
            </button>
            <span className="text-[#C6C8BC] px-0.5">|</span>
            <button
              onClick={() => onToggleLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                language === 'en' ? 'text-[#1B1C19] font-bold' : 'hover:text-[#1B1C19] opacity-60'
              }`}
            >
              EN
            </button>
          </div>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 bg-[#2B381C] hover:bg-[#384527] active:bg-[#1E2713] text-[#FFFFFF] text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            {t.nav.contact}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <div className="flex items-center text-xs font-semibold text-[#45483F]">
            <button
              onClick={() => onToggleLanguage(language === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-1 border border-[#E4E2DD] px-2 py-1 rounded-md"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1B1C19] rounded-lg hover:bg-[#F0EEE9]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F4] border-b border-[#E4E2DD] px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-base font-medium ${
                currentTab === item.id ? 'text-[#C0573E] font-bold' : 'text-[#1B1C19]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#E4E2DD]">
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#2B381C] text-white text-center rounded-lg font-medium text-sm"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
