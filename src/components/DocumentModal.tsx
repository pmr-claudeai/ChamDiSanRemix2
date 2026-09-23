/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArchiveDocument, Language } from '../types';
import { X, Download, FileText, Calendar, CheckCircle2, Loader2, BookOpen } from 'lucide-react';

interface DocumentModalProps {
  document: ArchiveDocument | null;
  language: Language;
  onClose: () => void;
  onDownload: (doc: ArchiveDocument) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  language,
  onClose,
  onDownload,
}) => {
  if (!document) return null;

  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadAction = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      onDownload(document);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[760px] bg-[#FBF9F4] rounded-2xl shadow-2xl overflow-hidden border border-[#E4E2DD] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E4E2DD] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 bg-[#F0EEE9] text-[#45483F] text-xs font-semibold rounded-md border border-[#E4E2DD]">
              {language === 'vi' ? document.tag : document.tagEn}
            </span>
            <span className="px-2 py-0.5 bg-[#F5F3EE] text-[#45483F] text-[11px] font-bold rounded tracking-wider border border-[#E4E2DD]">
              {document.language} &bull; {document.fileFormat}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#F0EEE9] text-[#45483F] hover:text-[#1B1C19] hover:bg-[#E4E2DD] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs text-[#6E7265] mb-2 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>{document.date}</span>
              <span>&bull;</span>
              <span>{document.fileSize}</span>
              <span>&bull;</span>
              <span>{document.downloadCount} lượt tải</span>
            </div>

            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1B1C19] tracking-tight mb-4">
              {language === 'vi' ? document.title : document.titleEn}
            </h2>

            <p className="font-editorial text-base text-[#45483F] leading-relaxed bg-[#F0EEE9]/70 p-4 rounded-xl border border-[#E4E2DD]">
              {language === 'vi' ? document.description : document.descriptionEn}
            </p>
          </div>

          {/* Research & Author info */}
          <div className="p-4 bg-white rounded-xl border border-[#E4E2DD] space-y-2">
            <h4 className="font-heading font-semibold text-xs text-[#1B1C19] uppercase tracking-wider">
              {language === 'vi' ? 'Thông tin thẩm định khoa học' : 'Scientific Credential'}
            </h4>
            <p className="text-sm text-[#45483F]">
              <span className="font-medium text-[#1B1C19]">{language === 'vi' ? 'Đơn vị chủ trì: ' : 'Lead Author: '}</span>
              {document.author}
            </p>
            {document.pages && (
              <p className="text-xs text-[#6E7265] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{document.pages} {language === 'vi' ? 'trang tài liệu số chuẩn quốc tế' : 'pages in open PDF format'}</span>
              </p>
            )}
          </div>

          {/* Table of Contents */}
          {document.tableOfContents && document.tableOfContents.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-[#1B1C19] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8C6239]" />
                <span>{language === 'vi' ? 'Mục lục tóm lược văn bản' : 'Table of Contents'}</span>
              </h4>
              <ul className="space-y-2 text-sm text-[#45483F] bg-white p-4 rounded-xl border border-[#E4E2DD]">
                {document.tableOfContents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#8C6239] font-bold">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Download Action Box */}
          <div className="pt-4 border-t border-[#E4E2DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#6E7265]">
              {language === 'vi' ? 'Tài liệu được cấp phép sử dụng mở phi thương mại (CC BY-NC 4.0)' : 'Open access under CC BY-NC 4.0 license'}
            </div>

            <button
              onClick={handleDownloadAction}
              disabled={downloading}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm ${
                downloaded
                  ? 'bg-[#4F5D3D] text-white'
                  : 'bg-[#A03F29] hover:bg-[#85301D] text-white'
              }`}
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{language === 'vi' ? 'Đang chuẩn bị file...' : 'Preparing File...'}</span>
                </>
              ) : downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'vi' ? 'Đã tải thành công!' : 'Download Complete!'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{language === 'vi' ? `Tải tài liệu (${document.fileSize})` : `Download Dossier (${document.fileSize})`}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
