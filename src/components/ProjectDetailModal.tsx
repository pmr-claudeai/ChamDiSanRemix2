/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FocusArea, Language } from '../types';
import { X, CheckCircle2, Box, Layers, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  area: FocusArea | null;
  language: Language;
  onClose: () => void;
  onExploreArchive: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  area,
  language,
  onClose,
  onExploreArchive,
}) => {
  if (!area) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[800px] bg-[#FBF9F4] rounded-2xl shadow-2xl overflow-hidden border border-[#E4E2DD] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="relative h-64 overflow-hidden">
          <img src={area.imageUrl} alt={area.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            {area.badge && (
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-md border border-white/30 mb-2 inline-block">
                {language === 'vi' ? area.badge : area.badgeEn}
              </span>
            )}
            <h2 className="font-heading font-bold text-3xl text-white">
              {language === 'vi' ? area.title : area.titleEn}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          <div>
            <p className="font-editorial text-base sm:text-lg text-[#2B381C] leading-relaxed">
              {language === 'vi' ? area.description : area.descriptionEn}
            </p>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-lg text-[#1B1C19] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8C6239]" />
              <span>{language === 'vi' ? 'Các dự án trọng điểm đang triển khai' : 'Active Core Initiatives'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {area.projects.map((proj, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-xl border border-[#E4E2DD] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4F5D3D] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-[#1B1C19]">{proj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical and preservation features */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-lg text-[#1B1C19] flex items-center gap-2">
              <Box className="w-4 h-4 text-[#8C6239]" />
              <span>{language === 'vi' ? 'Giải pháp bảo tồn & công nghệ ứng dụng' : 'Preservation & Technology Methods'}</span>
            </h3>
            <div className="space-y-2">
              {area.features.map((feat, idx) => (
                <div key={idx} className="p-3 bg-[#F0EEE9] rounded-lg text-sm text-[#45483F] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C0573E]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-[#E4E2DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#6E7265]">
              {language === 'vi' ? `Hơn ${area.itemCount} địa điểm & di vật được lưu trữ số hóa` : `Over ${area.itemCount} archived monuments & artifacts`}
            </span>
            <button
              onClick={() => {
                onClose();
                onExploreArchive();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#2B381C] hover:bg-[#384527] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>{language === 'vi' ? 'Xem Tài liệu & Di sản Liên quan' : 'View Related Archives & Projects'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
