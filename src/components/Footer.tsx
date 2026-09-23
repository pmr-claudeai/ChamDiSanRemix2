/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language, ScreenTab } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  language: Language;
  onSelectTab: (tab: ScreenTab) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onSelectTab,
  onOpenContact,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#F0EEE9]/80 border-t border-[#E4E2DD] text-[#1B1C19] pt-14 pb-10 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E4E2DD]/80">
          
          {/* Left info column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://chamdisan.online/wp-content/uploads/2026/07/cropped-logo-fb-cham-ko-noi-dung-scaled-1.png"
                alt={t.brand}
                className="w-9 h-9 object-contain rounded-lg"
              />
              <h3 className="font-heading font-bold text-2xl tracking-tight text-[#1B1C19]">
                {t.brand}
              </h3>
            </div>

            <p className="text-xs font-semibold text-[#45483F] tracking-wide uppercase">
              {t.brandSubtitle}
            </p>

            <div className="space-y-2.5 pt-2 text-sm text-[#45483F]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8C6239] shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8C6239] shrink-0" />
                <span>{t.footer.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8C6239] shrink-0" />
                <span>{t.footer.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full border border-[#C6C8BC] flex items-center justify-center text-[#45483F] hover:text-[#1B1C19] hover:border-[#1B1C19] transition-colors"
                title="Global Heritage Initiative"
              >
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column: Về CDS */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-semibold text-base text-[#1B1C19]">
              {t.footer.aboutTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#45483F]">
              <li>
                <button 
                  onClick={() => onSelectTab('about')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors"
                >
                  {t.footer.aboutItems[0]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('about')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors"
                >
                  {t.footer.aboutItems[1]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('stories')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors"
                >
                  {t.footer.aboutItems[2]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('archive')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors"
                >
                  {t.footer.aboutItems[3]}
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Hoạt động */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-semibold text-base text-[#1B1C19]">
              {t.footer.activitiesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#45483F]">
              <li>
                <button 
                  onClick={() => onSelectTab('archive')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors"
                >
                  {t.footer.activitiesItems[0]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('archive')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors"
                >
                  {t.footer.activitiesItems[1]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('stories')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors"
                >
                  {t.footer.activitiesItems[2]}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('marketplace')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors font-medium text-[#8C6239]"
                >
                  {language === 'vi' ? 'Giao thương Phi trung gian' : 'Direct Craft Market'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('contributions')}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors font-medium text-[#4F5D3D]"
                >
                  {language === 'vi' ? 'Đóng góp Di sản' : 'Heritage Contributions'}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContact}
                  className="hover:text-[#1B1C19] hover:underline underline-offset-4 transition-colors"
                >
                  {t.footer.activitiesItems[3]}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E7265] gap-4">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onSelectTab('about')}
              className="hover:text-[#1B1C19] transition-colors"
            >
              {language === 'vi' ? 'Về chúng tôi' : 'About Us'}
            </button>
            <button 
              onClick={() => alert(language === 'vi' ? 'Điều khoản dịch vụ và chính sách dữ liệu mở di sản Chạm Di Sản.' : 'Terms of Service for Open Cultural Heritage Archive.')}
              className="hover:text-[#1B1C19] transition-colors"
            >
              {t.footer.terms}
            </button>
            <button 
              onClick={() => alert(language === 'vi' ? 'Chính sách bảo mật thông tin và quyền tác giả di sản văn hóa.' : 'Privacy Policy and Cultural Rights Protection.')}
              className="hover:text-[#1B1C19] transition-colors"
            >
              {t.footer.privacy}
            </button>
            <button 
              onClick={onOpenContact}
              className="hover:text-[#1B1C19] transition-colors"
            >
              {t.footer.contactSupport}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
