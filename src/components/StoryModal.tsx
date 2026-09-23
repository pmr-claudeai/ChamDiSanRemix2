/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeritageStory, Language } from '../types';
import { X, Clock, MapPin, Share2, Heart, Volume2, Bookmark } from 'lucide-react';

interface StoryModalProps {
  story: HeritageStory | null;
  language: Language;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  language,
  onClose,
}) => {
  if (!story) return null;

  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);

  const paragraphs = language === 'vi' ? story.fullStory : story.fullStoryEn;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[880px] bg-[#FBF9F4] rounded-2xl shadow-2xl overflow-hidden border border-[#E4E2DD] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Modal Top Bar */}
        <div className="px-6 py-4 bg-[#FBF9F4]/90 backdrop-blur-md border-b border-[#E4E2DD] flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#FE876A]/20 text-[#C0573E] text-xs font-semibold rounded-md border border-[#FE876A]/40">
              {language === 'vi' ? story.tag : story.tagEn}
            </span>
            <span className="text-xs text-[#6E7265] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {story.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Ambient audio narrator toggle */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isPlayingAudio ? 'bg-[#384527] text-white' : 'bg-white text-[#45483F] border border-[#E4E2DD]'
              }`}
              title="Nghe audio thuyết minh"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isPlayingAudio ? (language === 'vi' ? 'Đang phát âm thanh...' : 'Playing Audio...') : (language === 'vi' ? 'Nghe đọc' : 'Listen Audio')}
              </span>
            </button>

            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg border border-[#E4E2DD] transition-colors ${
                liked ? 'text-[#C0573E] bg-[#FCEBE6]' : 'text-[#45483F] bg-white hover:bg-[#F0EEE9]'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-[#C0573E]' : ''}`} />
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg border border-[#E4E2DD] transition-colors ${
                bookmarked ? 'text-[#8C6239] bg-[#F7EFE8]' : 'text-[#45483F] bg-white hover:bg-[#F0EEE9]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#8C6239]' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white border border-[#E4E2DD] text-[#45483F] hover:text-[#1B1C19] hover:bg-[#F0EEE9] transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Main Cover Image with caption */}
          <div className="relative h-[320px] sm:h-[420px] rounded-xl overflow-hidden shadow-sm">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs text-[#F8C696] font-semibold tracking-wider uppercase mb-1">
                {story.artisanTitle}
              </p>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-white">
                {story.artisanName}
              </h3>
              <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#F8C696]" />
                {story.location} &bull; {story.date}
              </p>
            </div>
          </div>

          {/* Story Title & Headline */}
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-4xl text-[#1B1C19] tracking-tight mb-6 leading-tight">
              {language === 'vi' ? story.title : story.titleEn}
            </h1>

            {/* Editorial Highlight Quote */}
            <blockquote className="font-editorial italic text-lg sm:text-xl text-[#8C6239] border-l-4 border-[#8C6239] pl-6 py-2 my-6 bg-[#F5F3EE] rounded-r-xl leading-relaxed">
              {language === 'vi' ? story.highlightQuote : story.highlightQuoteEn}
            </blockquote>
          </div>

          {/* Full Narrative Text */}
          <div className="space-y-5 text-base sm:text-lg font-editorial text-[#2B381C] leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="first-letter:text-3xl first-letter:font-bold first-letter:text-[#384527]">
                {p}
              </p>
            ))}
          </div>

          {/* Secondary Photo Gallery if present */}
          {story.secondaryImages && story.secondaryImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {story.secondaryImages.map((img, i) => (
                <div key={i} className="h-56 rounded-xl overflow-hidden border border-[#E4E2DD]">
                  <img src={img} alt="Heritage moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}

          {/* Bottom Share & Support */}
          <div className="pt-8 border-t border-[#E4E2DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#6E7265]">
                {language === 'vi' ? 'Tác phẩm thuộc Dự án Chạm Di Sản & Cộng đồng bản địa' : 'Archived under Chạm Di Sản & Indigenous Heritage Collective'}
              </p>
            </div>
            
            <button
              onClick={() => alert('Đã sao chép liên kết chia sẻ câu chuyện di sản!')}
              className="px-5 py-2.5 bg-[#2B381C] hover:bg-[#384527] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'vi' ? 'Lan tỏa câu chuyện' : 'Share Story'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
