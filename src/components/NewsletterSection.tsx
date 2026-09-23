/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

interface NewsletterSectionProps {
  language: Language;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ language }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 600);
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 sm:px-8 py-16">
      <div className="bg-[#F0EEE9]/80 border border-[#E4E2DD] rounded-2xl p-8 sm:p-12 max-w-[840px] mx-auto text-center relative overflow-hidden">
        
        {/* Mail Icon */}
        <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-white border border-[#E4E2DD] flex items-center justify-center text-[#C0573E] shadow-xs">
          <Mail className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B1C19] tracking-tight mb-2">
          {t.newsletter.title}
        </h3>

        {/* Subtitle */}
        <p className="font-editorial text-sm sm:text-base text-[#45483F] mb-8">
          {t.newsletter.subtitle}
        </p>

        {/* Input & Form */}
        {submitted ? (
          <div className="bg-[#D8E8BF]/50 border border-[#4F5D3D]/30 p-4 rounded-xl max-w-[480px] mx-auto flex items-center justify-center gap-2.5 text-[#2B381C] animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-[#384527]" />
            <span className="text-sm font-medium">{t.newsletter.success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[540px] mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="w-full sm:w-80 px-4 py-3 bg-white border border-[#C6C8BC] rounded-lg text-sm text-[#1B1C19] placeholder:text-[#6E7265] focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-7 py-3 bg-[#A03F29] hover:bg-[#85301D] active:bg-[#682313] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-lg shadow-sm transition-colors flex items-center justify-center min-w-[110px]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.newsletter.button}
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
