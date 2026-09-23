/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ArchiveDocument, DocumentCategory, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { 
  Search, 
  Download, 
  Calendar, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Eye
} from 'lucide-react';

interface NewsArchiveScreenProps {
  documents: ArchiveDocument[];
  language: Language;
  onSelectDocument: (doc: ArchiveDocument) => void;
  onDownloadDocument: (doc: ArchiveDocument) => void;
}

export const NewsArchiveScreen: React.FC<NewsArchiveScreenProps> = ({
  documents,
  language,
  onSelectDocument,
  onDownloadDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const t = TRANSLATIONS[language];

  // Category filter tabs matching screenshot
  const categoryFilters: { id: DocumentCategory; label: string }[] = [
    { id: 'all', label: t.archive.allDocs },
    { id: 'impact_report', label: t.archive.impactReport },
    { id: 'unesco_dossier', label: t.archive.dossier },
    { id: 'workshop', label: t.archive.workshop },
    { id: 'strategic_plan', label: t.archive.strategicPlan },
    { id: 'health_wellbeing', label: t.archive.healthWellbeing },
  ];

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = 
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.titleEn.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.tag.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [documents, selectedCategory, searchQuery]);

  // Pagination slice
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage) || 1;
  const currentDocs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDocs.slice(start, start + itemsPerPage);
  }, [filteredDocs, currentPage]);

  return (
    <div className="min-h-screen bg-[#FBF9F4] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
        
        {/* Header Block with Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="max-w-[720px]">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-[44px] text-[#2B381C] tracking-tight leading-tight mb-3">
              {t.archive.title}
            </h1>
            <p className="font-editorial text-base sm:text-lg text-[#45483F]">
              {t.archive.subtitle}
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[#6E7265] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t.archive.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C6C8BC] rounded-full text-sm text-[#1B1C19] placeholder:text-[#6E7265] focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-6 pt-2 no-scrollbar">
          {categoryFilters.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#5B3A16] text-[#FFFFFF] shadow-xs'
                    : 'bg-white border border-[#E4E2DD] text-[#45483F] hover:text-[#1B1C19] hover:border-[#C6C8BC]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Documents Grid */}
        {currentDocs.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#E4E2DD] rounded-xl my-6">
            <FileText className="w-10 h-10 text-[#C6C8BC] mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-lg text-[#1B1C19]">
              {language === 'vi' ? 'Không tìm thấy tài liệu phù hợp' : 'No documents match your query'}
            </h3>
            <p className="text-sm text-[#6E7265] mt-1">
              {language === 'vi' ? 'Hãy thử tìm kiếm với từ khóa hoặc danh mục khác.' : 'Try adjusting your search terms or category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {currentDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-[#E4E2DD] hover:border-[#C6C8BC] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-md group relative"
              >
                <div>
                  {/* Top Metadata Row: Tag & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-[#F0EEE9] text-[#45483F] text-xs font-semibold rounded-md border border-[#E4E2DD]">
                      {language === 'vi' ? doc.tag : doc.tagEn}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#6E7265] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#8C6239]" />
                      <span>{doc.date}</span>
                    </div>
                  </div>

                  {/* Document Title */}
                  <h3 
                    onClick={() => onSelectDocument(doc)}
                    className="font-heading font-bold text-xl text-[#1B1C19] group-hover:text-[#8C6239] transition-colors mb-3 cursor-pointer line-clamp-2"
                  >
                    {language === 'vi' ? doc.title : doc.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="font-editorial text-sm text-[#45483F] leading-relaxed line-clamp-3 mb-6">
                    {language === 'vi' ? doc.description : doc.descriptionEn}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-[#F0EEE9] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#F5F3EE] text-[#45483F] text-[11px] font-bold rounded tracking-wider border border-[#E4E2DD]">
                      {doc.language}
                    </span>
                    <button
                      onClick={() => onSelectDocument(doc)}
                      className="text-xs text-[#6E7265] hover:text-[#1B1C19] flex items-center gap-1 transition-colors"
                      title={t.archive.preview}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.archive.preview}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onDownloadDocument(doc)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C0573E] hover:text-[#85301D] transition-colors p-1"
                  >
                    <span>{t.archive.download}</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination bar matching screenshot `< 1 2 3 ... >` */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-10 pb-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-full border border-[#E4E2DD] bg-white flex items-center justify-center text-[#45483F] hover:bg-[#F0EEE9] disabled:opacity-40 disabled:hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                  currentPage === p
                    ? 'bg-[#2B381C] text-white shadow-xs'
                    : 'bg-white border border-[#E4E2DD] text-[#45483F] hover:bg-[#F0EEE9]'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-full border border-[#E4E2DD] bg-white flex items-center justify-center text-[#45483F] hover:bg-[#F0EEE9] disabled:opacity-40 disabled:hover:bg-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
