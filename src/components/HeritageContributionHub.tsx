/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  HeritageContribution, 
  ContributionCategory, 
  ContributorRole, 
  Language,
  RegionFilter
} from '../types';
import { 
  PlusCircle, 
  UploadCloud, 
  FileText, 
  Mic, 
  Play, 
  Pause, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  UserCheck, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Search, 
  Download, 
  ExternalLink, 
  Send, 
  Eye, 
  X, 
  Layers, 
  Music, 
  Share2,
  FolderArchive,
  Compass,
  FileCheck
} from 'lucide-react';

interface HeritageContributionHubProps {
  contributions: HeritageContribution[];
  language: Language;
  onAddContribution: (newContrib: HeritageContribution) => void;
  onToast: (msg: string) => void;
}

export const HeritageContributionHub: React.FC<HeritageContributionHubProps> = ({
  contributions,
  language,
  onAddContribution,
  onToast
}) => {
  // Navigation tabs in hub: 'gallery' (Explore Archives) or 'form' (Submit Contribution)
  const [activeTab, setActiveTab] = useState<'gallery' | 'form'>('gallery');

  // Filters for community archives
  const [categoryFilter, setCategoryFilter] = useState<ContributionCategory | 'all'>('all');
  const [regionFilter, setRegionFilter] = useState<RegionFilter | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected contribution for detail modal
  const [selectedContribution, setSelectedContribution] = useState<HeritageContribution | null>(null);

  // Audio player state for previewing oral recordings
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioTrack, setActiveAudioTrack] = useState<string | null>(null);

  // Contribution Form State
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    contributorName: '',
    contributorRole: 'researcher' as ContributorRole,
    contributorEmail: '',
    contributorPhone: '',
    contributorOrg: '',
    category: 'audio_folklore' as ContributionCategory,
    location: '',
    region: 'north' as RegionFilter,
    summary: '',
    fullTextContent: '',
    audioTitle: '',
    audioDuration: '04:45',
    audioPerformer: '',
    audioGenre: 'Hát Then & Đàn Tính',
    hasAudio: true,
    fileName: 'Tai_lieu_nghien_cuu_dien_da.pdf',
    fileSize: '3.4 MB',
    fileType: 'PDF' as const,
    coordsX: 62,
    coordsY: 28
  });

  const categories = [
    { id: 'audio_folklore', label: language === 'vi' ? 'Âm thanh & Diễn xướng' : 'Audio & Folklore Chants', icon: Music, color: '#C0573E' },
    { id: 'tangible', label: language === 'vi' ? 'Di sản Vật thể & Kiến trúc' : 'Tangible & Architecture', icon: Layers, color: '#4F5D3D' },
    { id: 'intangible', label: language === 'vi' ? 'Di sản Phi vật thể' : 'Intangible Heritage', icon: Sparkles, color: '#8C6239' },
    { id: 'oral_history', label: language === 'vi' ? 'Lịch sử Truyền khẩu & Lễ hội' : 'Oral History & Rituals', icon: Mic, color: '#2B5B84' },
    { id: 'craft_village', label: language === 'vi' ? 'Làng nghề & Nghệ nhân' : 'Craft Village & Artisan', icon: BookOpen, color: '#6A3D82' },
  ];

  const roles = [
    { id: 'researcher', label: language === 'vi' ? 'Nhà nghiên cứu / Giảng viên' : 'Researcher / Academic', icon: BookOpen },
    { id: 'student', label: language === 'vi' ? 'Sinh viên / Học viên Di sản' : 'Student / Heritage Scholar', icon: GraduationCap },
    { id: 'community', label: language === 'vi' ? 'Cộng đồng bản địa / Nghệ nhân giữ hồn di sản' : 'Indigenous Community Member', icon: Users },
    { id: 'artisan', label: language === 'vi' ? 'Nghệ nhân thực hành' : 'Practicing Artisan', icon: UserCheck }
  ];

  // Filtered community contributions
  const filteredContributions = useMemo(() => {
    return contributions.filter((item) => {
      const matchCat = categoryFilter === 'all' || item.category === categoryFilter;
      const matchRegion = regionFilter === 'all' || item.region === regionFilter;
      const matchSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contributorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchRegion && matchSearch;
    });
  }, [contributions, categoryFilter, regionFilter, searchQuery]);

  // Handle Fill Sample Data
  const handleFillSample = () => {
    setFormData({
      title: 'Khảo cứu & Ghi âm Điền dã Lễ Cấp Sắc của người Dao Tiền tại Tuyên Quang',
      titleEn: 'Field Research & Audio Recordings of Dao Tien Cap Sac Ritual in Tuyen Quang',
      contributorName: 'ThS. Nguyễn Hoàng Nam',
      contributorRole: 'researcher',
      contributorEmail: 'nam.nguyen@heritage.vn',
      contributorPhone: '0918 234 567',
      contributorOrg: 'Viện Nghiên cứu Di sản & Bản địa',
      category: 'audio_folklore',
      location: 'Huyện Na Hang, Tỉnh Tuyên Quang',
      region: 'north',
      summary: 'Bộ tư liệu gồm 03 bản ghi âm lời ca bài cúng Then, ghi chép thực địa về 10 bước trong nghi lễ Cấp Sắc 3 đèn của người Dao Tiền, cùng 12 bức ảnh chụp trang phục lễ nghi truyền thống.',
      fullTextContent: 'Nghi lễ Cấp Sắc (Quang Thụ) là nghi lễ vòng đời quan trọng bậc nhất của nam giới người Dao Tiền. Lễ cấp sắc thường diễn ra vào dịp cuối năm, do các thầy cúng uy tín thực hiện. Toàn bộ diễn trình gồm: Lễ trình báo tổ tiên, lễ xin đèn, lễ nhảy đồng, và phần diễn xướng âm nhạc với tiếng trống, thanh la, chuông lắc đặc trưng.',
      audioTitle: 'Khúc hát cúng thần linh trong lễ Cấp Sắc Dao Tiền',
      audioDuration: '06:12',
      audioPerformer: 'Nghệ nhân Triệu Văn Tiến (72 tuổi)',
      audioGenre: 'Nghi lễ dân gian & Nhạc cụ truyền thống',
      hasAudio: true,
      fileName: 'Ho_so_Cap_Sac_Dao_Tien_NaHang.pdf',
      fileSize: '4.8 MB',
      fileType: 'PDF',
      coordsX: 60,
      coordsY: 25
    });
    onToast(language === 'vi' ? 'Đã điền dữ liệu khảo cứu mẫu!' : 'Filled with sample research data!');
  };

  // Handle new contribution submission
  const handleSubmitContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contributorName.trim()) {
      onToast(language === 'vi' ? 'Vui lòng nhập Họ và tên người đóng góp.' : 'Please enter contributor full name.');
      return;
    }
    if (!formData.contributorPhone.trim()) {
      onToast(language === 'vi' ? 'Vui lòng nhập Số điện thoại liên hệ.' : 'Please enter contact phone number.');
      return;
    }
    if (!formData.contributorEmail.trim()) {
      onToast(language === 'vi' ? 'Vui lòng nhập Email liên hệ.' : 'Please enter contact email address.');
      return;
    }
    if (!formData.title.trim()) {
      onToast(language === 'vi' ? 'Vui lòng nhập Tên tài liệu / Hồ sơ đóng góp.' : 'Please enter the document title.');
      return;
    }

    const newContrib: HeritageContribution = {
      id: `contrib-${Date.now()}`,
      title: formData.title,
      titleEn: formData.titleEn || formData.title,
      contributorName: formData.contributorName,
      contributorRole: formData.contributorRole,
      contributorRoleLabel: roles.find(r => r.id === formData.contributorRole)?.label || 'Người đóng góp',
      contributorEmail: formData.contributorEmail || 'contributor@heritage.vn',
      contributorPhone: formData.contributorPhone || '0900 000 000',
      contributorOrg: formData.contributorOrg || 'Đóng góp độc lập',
      category: formData.category,
      categoryLabel: categories.find(c => c.id === formData.category)?.label || 'Di sản',
      categoryLabelEn: formData.category,
      location: formData.location || 'Việt Nam',
      region: formData.region,
      coordinates: {
        x: formData.coordsX,
        y: formData.coordsY
      },
      summary: formData.summary,
      fullTextContent: formData.fullTextContent || formData.summary,
      audioRecording: formData.hasAudio ? {
        title: formData.audioTitle || `Ghi âm: ${formData.title}`,
        duration: formData.audioDuration || '04:15',
        fileSize: '12.8 MB',
        performer: formData.audioPerformer || formData.contributorName,
        recordingLocation: formData.location,
        recordingDate: new Date().toLocaleDateString('vi-VN'),
        genre: formData.audioGenre || 'Điễn xướng dân gian',
        audioUrl: 'https://cdn.freesound.org/previews/568/568147_11861866-lq.mp3'
      } : undefined,
      attachedFiles: [
        {
          fileName: formData.fileName || 'Tai_lieu_dong_gop.pdf',
          fileSize: formData.fileSize || '2.5 MB',
          fileType: 'PDF'
        }
      ],
      attachedImages: [
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
      ],
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'approved'
    };

    onAddContribution(newContrib);
    onToast(language === 'vi' 
      ? 'Đóng góp thành công! Dữ liệu đã được lưu trữ vào Kho Tư Liệu Di Sản Cộng Đồng.' 
      : 'Contribution submitted and saved to Community Heritage Archives!');
    
    // Switch to gallery tab so user can see it immediately
    setActiveTab('gallery');

    // Reset Form
    setFormData({
      title: '',
      titleEn: '',
      contributorName: '',
      contributorRole: 'researcher',
      contributorEmail: '',
      contributorPhone: '',
      contributorOrg: '',
      category: 'audio_folklore',
      location: '',
      region: 'north',
      summary: '',
      fullTextContent: '',
      audioTitle: '',
      audioDuration: '04:45',
      audioPerformer: '',
      audioGenre: 'Hát Then & Đàn Tính',
      hasAudio: true,
      fileName: 'Tai_lieu_nghien_cuu_dien_da.pdf',
      fileSize: '3.4 MB',
      fileType: 'PDF',
      coordsX: 62,
      coordsY: 28
    });
  };

  const togglePlayAudio = (trackId: string) => {
    if (activeAudioTrack === trackId && isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setActiveAudioTrack(trackId);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner Header */}
      <div className="bg-[#2B381C] rounded-2xl p-6 sm:p-8 text-[#FAF9F5] relative overflow-hidden border border-[#3E4E2A] shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F5D3D]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F5D3D] text-[#EAF0E2] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#F8C696]" />
              <span>{language === 'vi' ? 'Không Gian Đóng Góp Tri Thức Di Sản' : 'Heritage Community Contribution Hub'}</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              {language === 'vi' ? 'Đóng Góp Tư Liệu & Điền Dã Di Sản' : 'Community Heritage Contributions'}
            </h1>
            <p className="text-xs sm:text-sm text-[#D5E2C8] leading-relaxed">
              {language === 'vi' 
                ? 'Nơi các nhà nghiên cứu, sinh viên và cộng đồng bản địa cùng chia sẻ tài liệu khảo cứu, tệp ghi âm diễn xướng dân gian và dữ liệu không gian để làm giàu kho tàng văn hóa dân tộc.'
                : 'A collaborative space for researchers, students, and indigenous communities to contribute field studies, audio folklore recordings, and heritage mapping assets to Vietnam’s living archives.'}
            </p>
          </div>

          {/* Quick Stats & Action Button */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/10 text-xs">
              <div className="flex items-center gap-1.5 text-[#C5D5AD]">
                <FolderArchive className="w-4 h-4 text-[#F8C696]" />
                <span>{language === 'vi' ? 'Tổng tài liệu đóng góp:' : 'Total Contributions:'}</span>
              </div>
              <strong className="font-mono text-lg text-[#F8C696] font-bold">{contributions.length}</strong>
            </div>

            <button
              onClick={() => setActiveTab(activeTab === 'form' ? 'gallery' : 'form')}
              className="px-4 py-2 rounded-xl bg-[#8C6239] hover:bg-[#A37446] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
            >
              {activeTab === 'form' ? (
                <>
                  <FolderArchive className="w-4 h-4" />
                  <span>{language === 'vi' ? 'Xem Kho Tư Liệu Đã Đóng Góp' : 'View Contributed Archives'}</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-[#F8C696]" />
                  <span>{language === 'vi' ? 'Gửi Tài Liệu Đóng Góp Mới' : 'Submit New Contribution'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Hub Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E2DD] pb-3">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1">
          
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-[#2B381C] text-[#FAF9F5] shadow'
                : 'text-[#55584E] hover:bg-[#EAE6DE]'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-[#F8C696]" />
            <span>{language === 'vi' ? 'Kho Tư Liệu Cộng Đồng Đóng Góp' : 'Community Archives'}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#4F5D3D] text-white font-mono">
              {contributions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'form'
                ? 'bg-[#2B381C] text-[#FAF9F5] shadow'
                : 'text-[#55584E] hover:bg-[#EAE6DE]'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#8C6239]" />
            <span>{language === 'vi' ? 'Biểu Mẫu Gửi Đóng Góp' : 'Submit Dossier Form'}</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: COMMUNITY ARCHIVES GALLERY ================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E4E2DD] shadow-xs space-y-4">
            
            {/* Top / Primary Row: Categories and Controls */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Category Pills with clean wrapping and no text squishing */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 text-xs">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3.5 py-2 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    categoryFilter === 'all' 
                      ? 'bg-[#2B381C] text-white font-semibold shadow-xs' 
                      : 'bg-[#FAF9F5] text-[#45483F] border border-[#E4E2DD] hover:bg-[#EAE6DE] hover:text-[#1B1C19]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{language === 'vi' ? 'Tất cả loại di sản' : 'All Categories'}</span>
                </button>
                
                {categories.map((c) => {
                  const IconComponent = c.icon;
                  const isSelected = categoryFilter === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCategoryFilter(c.id as ContributionCategory)}
                      className={`px-3.5 py-2 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-[#8C6239] text-white font-semibold shadow-xs' 
                          : 'bg-[#FAF9F5] text-[#45483F] border border-[#E4E2DD] hover:bg-[#EAE6DE] hover:text-[#1B1C19]'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Region & Search Controls */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="relative">
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value as RegionFilter | 'all')}
                    className="h-9 px-3 text-xs bg-[#FAF9F5] border border-[#E4E2DD] rounded-xl text-[#1B1C19] font-medium focus:outline-none focus:border-[#2B381C] cursor-pointer"
                  >
                    <option value="all">{language === 'vi' ? 'Toàn quốc' : 'All Regions'}</option>
                    <option value="north">{language === 'vi' ? 'Miền Bắc' : 'North'}</option>
                    <option value="central">{language === 'vi' ? 'Miền Trung' : 'Central'}</option>
                    <option value="south">{language === 'vi' ? 'Miền Nam' : 'South'}</option>
                  </select>
                </div>

                <div className="relative min-w-[200px] sm:min-w-[240px]">
                  <Search className="w-4 h-4 text-[#6E7265] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'vi' ? 'Tìm bài viết, người gửi, địa bàn...' : 'Search by title, author, location...'}
                    className="w-full h-9 pl-9 pr-8 text-xs bg-[#FAF9F5] border border-[#E4E2DD] rounded-xl text-[#1B1C19] placeholder:text-[#8E9285] focus:outline-none focus:border-[#2B381C]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E9285] hover:text-[#1B1C19] p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Cards Grid of Contributed Heritage Dossiers */}
          {filteredContributions.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-[#E4E2DD] space-y-3">
              <BookOpen className="w-10 h-10 text-[#6E7265] mx-auto opacity-50" />
              <p className="text-sm text-[#45483F] font-medium">
                {language === 'vi' ? 'Không tìm thấy tư liệu nào phù hợp với bộ lọc.' : 'No contributions match the selected filter.'}
              </p>
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setRegionFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#8C6239] font-bold hover:underline"
              >
                {language === 'vi' ? 'Đặt lại bộ lọc' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContributions.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-xl border border-[#E4E2DD] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    
                    {/* Header line: Category + Location */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#F0EEE9] text-[#8C6239] border border-[#E4E2DD] flex items-center gap-1.5">
                        {item.category === 'audio_folklore' ? <Music className="w-3 h-3 text-[#C0573E]" /> : <FileText className="w-3 h-3 text-[#4F5D3D]" />}
                        <span>{item.categoryLabel}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] text-[#6E7265]">
                        <MapPin className="w-3 h-3 text-[#8C6239]" />
                        <span className="truncate max-w-[140px]">{item.location}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-base font-bold text-[#1B1C19] group-hover:text-[#8C6239] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-[#45483F] line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Audio Preview Widget if available */}
                    {item.audioRecording && (
                      <div className="bg-[#FAF7F0] p-3 rounded-lg border border-[#EAE4D5] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            onClick={() => togglePlayAudio(item.id)}
                            className="w-8 h-8 rounded-full bg-[#8C6239] hover:bg-[#2B381C] text-white flex items-center justify-center shrink-0 shadow-2xs transition-colors"
                          >
                            {activeAudioTrack === item.id && isPlayingAudio ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4 ml-0.5" />
                            )}
                          </button>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#1B1C19] truncate">
                              {item.audioRecording.title}
                            </div>
                            <div className="text-[10px] text-[#8C6239] flex items-center gap-2">
                              <span>{item.audioRecording.genre}</span>
                              <span>•</span>
                              <span>{item.audioRecording.duration}</span>
                            </div>
                          </div>
                        </div>
                        <Volume2 className="w-4 h-4 text-[#8C6239] shrink-0" />
                      </div>
                    )}

                    {/* Contributor Profile Line */}
                    <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#EAE6DE] space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-[#1B1C19] flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[#8C6239]" />
                          <span>{item.contributorName}</span>
                        </div>
                        <span className="text-[10px] text-[#6E7265] font-mono">{item.submittedAt}</span>
                      </div>
                      <div className="text-[#6E7265] text-[11px]">
                        <span>{item.contributorRoleLabel} {item.contributorOrg && `— ${item.contributorOrg}`}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-[#E4E2DD] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedContribution(item)}
                      className="w-full py-2 px-3 rounded-lg bg-[#F0EEE9] hover:bg-[#2B381C] hover:text-white text-[#1B1C19] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'Xem Toàn Văn Hồ Sơ & Tư Liệu' : 'View Full Dossier & Audio'}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ================= TAB 2: CONTRIBUTION FORM ================= */}
      {activeTab === 'form' && (
        <div className="bg-white rounded-2xl border border-[#E4E2DD] shadow-sm overflow-hidden">
          
          <div className="bg-[#2B381C] text-white p-6 border-b border-[#3E4E2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-bold">
                {language === 'vi' ? 'Biểu Mẫu Trực Tuyến Đóng Góp Dữ Liệu Di Sản' : 'Online Heritage Data Contribution Form'}
              </h2>
              <p className="text-xs text-[#C5D5AD] mt-1">
                {language === 'vi' 
                  ? 'Dành cho nhà nghiên cứu, sinh viên và cộng đồng. Tài liệu và bản ghi âm của bạn sẽ được lưu giữ và xuất bản trong Kho tư liệu di sản cộng đồng.'
                  : 'Open to researchers, scholars, and community members. Your research dossiers and audio folklore will be saved and published in the Community Heritage Archives.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleFillSample}
              className="px-3 py-1.5 bg-[#4F5D3D] hover:bg-[#5E6F4A] text-[#F8C696] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 border border-[#F8C696]/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Điền mẫu khảo cứu thực tế' : 'Fill Sample Research'}</span>
            </button>
          </div>

          <form onSubmit={handleSubmitContribution} className="p-6 sm:p-8 space-y-6">
            
            {/* 1. Contributor Identity Section */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-bold text-[#8C6239] uppercase tracking-wider border-b border-[#E4E2DD] pb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1. {language === 'vi' ? 'Thông tin Định danh Người Đóng Góp' : 'Contributor Identity & Credentials'}</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Họ và tên tác giả / Nhóm khảo cứu *' : 'Full Name / Research Team *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contributorName}
                    onChange={(e) => setFormData({ ...formData, contributorName: e.target.value })}
                    placeholder="ThS. Nguyễn Văn A / Nhóm nghiên cứu..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Vai trò đóng góp *' : 'Role / Background *'}
                  </label>
                  <select
                    value={formData.contributorRole}
                    onChange={(e) => setFormData({ ...formData, contributorRole: e.target.value as ContributorRole })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Cơ quan / Đơn vị / Trường học' : 'Institution / University'}
                  </label>
                  <input
                    type="text"
                    value={formData.contributorOrg}
                    onChange={(e) => setFormData({ ...formData, contributorOrg: e.target.value })}
                    placeholder="Viện Văn hóa Nghệ thuật / ĐH KHXH&NV..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Email liên hệ *' : 'Contact Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contributorEmail}
                    onChange={(e) => setFormData({ ...formData, contributorEmail: e.target.value })}
                    placeholder="email@heritage.edu.vn"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Số điện thoại liên hệ *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contributorPhone}
                    onChange={(e) => setFormData({ ...formData, contributorPhone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Heritage Topic & Content */}
            <div className="space-y-4 pt-2">
              <h3 className="font-heading text-sm font-bold text-[#8C6239] uppercase tracking-wider border-b border-[#E4E2DD] pb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>2. {language === 'vi' ? 'Hồ Sơ Nội Dung & Tư Liệu Đóng Góp' : 'Heritage Content & Field Dossier'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Tên tài liệu / Tiêu đề hồ sơ khảo cứu *' : 'Document / Dossier Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="VD: Ghi âm điền dã 10 làn điệu then Tày cổ tại Lạng Sơn..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Phân loại Di sản' : 'Heritage Category'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ContributionCategory })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Miền / Khu vực' : 'Region'}
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value as RegionFilter })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  >
                    <option value="north">{language === 'vi' ? 'Miền Bắc' : 'North'}</option>
                    <option value="central">{language === 'vi' ? 'Miền Trung' : 'Central'}</option>
                    <option value="south">{language === 'vi' ? 'Miền Nam' : 'South'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Địa bàn khảo cứu / Tỉnh thành' : 'Location / Province'}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="VD: Huyện Tràng Định, Tỉnh Lạng Sơn"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5]"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Tóm lược nội dung nghiên cứu (Abstract) *' : 'Abstract / Summary *'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Tóm tắt bối cảnh điền dã, nhân vật phỏng vấn, giá trị văn hóa nổi bật..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5] resize-none"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-semibold text-[#1B1C19] mb-1">
                    {language === 'vi' ? 'Toàn văn Báo cáo / Ghi chép thực địa' : 'Full Text Field Notes'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.fullTextContent}
                    onChange={(e) => setFormData({ ...formData, fullTextContent: e.target.value })}
                    placeholder="Nội dung chi tiết, lời khấn, ký âm nốt nhạc hoặc diễn trình nghi lễ..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] focus:outline-none focus:border-[#2B381C] bg-[#FAF9F5] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Audio Recording & Folklore Performance */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-[#E4E2DD] pb-2">
                <h3 className="font-heading text-sm font-bold text-[#8C6239] uppercase tracking-wider flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  <span>3. {language === 'vi' ? 'Tệp Ghi Âm & Diễn Xướng Dân Gian' : 'Audio Recordings & Folklore Performance'}</span>
                </h3>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasAudio}
                    onChange={(e) => setFormData({ ...formData, hasAudio: e.target.checked })}
                    className="rounded text-[#2B381C] focus:ring-[#2B381C]"
                  />
                  <span className="font-semibold text-[#2B381C]">{language === 'vi' ? 'Đính kèm tệp âm thanh' : 'Include Audio Track'}</span>
                </label>
              </div>

              {formData.hasAudio && (
                <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E4E2DD] grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#45483F] mb-1">
                      {language === 'vi' ? 'Tên bản ghi âm' : 'Track Title'}
                    </label>
                    <input
                      type="text"
                      value={formData.audioTitle}
                      onChange={(e) => setFormData({ ...formData, audioTitle: e.target.value })}
                      placeholder="Khúc Then cổ: Lẩu Then kỳ yên"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#45483F] mb-1">
                      {language === 'vi' ? 'Nghệ nhân thực hành / Trình diễn' : 'Performer / Artisan'}
                    </label>
                    <input
                      type="text"
                      value={formData.audioPerformer}
                      onChange={(e) => setFormData({ ...formData, audioPerformer: e.target.value })}
                      placeholder="NNND Nông Văn Ký (Đàn tính)"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#45483F] mb-1">
                      {language === 'vi' ? 'Thể loại diễn xướng' : 'Genre'}
                    </label>
                    <input
                      type="text"
                      value={formData.audioGenre}
                      onChange={(e) => setFormData({ ...formData, audioGenre: e.target.value })}
                      placeholder="Hát Then, Hát Xẩm, Cồng Chiêng..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CE] bg-white"
                    />
                  </div>

                  <div className="sm:col-span-3 border-2 border-dashed border-[#D5D3CE] rounded-xl p-4 text-center bg-white hover:bg-[#FAF8F5] transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-[#8C6239] mx-auto mb-1" />
                    <div className="text-xs font-semibold text-[#1B1C19]">
                      {language === 'vi' ? 'Kéo thả hoặc nhấn để chọn tệp âm thanh (MP3, WAV, FLAC)' : 'Drag & drop or click to upload audio (MP3, WAV)'}
                    </div>
                    <div className="text-[10px] text-[#6E7265]">Đã chuẩn bị sẵn tệp: <span className="font-mono text-[#C0573E]">ghi_am_then_tay_2026.mp3 (12.8 MB)</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-[#E4E2DD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6E7265] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#4F5D3D]" />
                <span>
                  {language === 'vi' 
                    ? 'Tư liệu đóng góp sẽ được lưu trữ và hiển thị trực tiếp trong Kho tư liệu di sản cộng đồng.' 
                    : 'Contributions are preserved and integrated into the Community Heritage Archives.'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2B381C] hover:bg-[#1B1C19] text-[#FAF9F5] text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#F8C696]" />
                <span>{language === 'vi' ? 'Gửi Hồ Sơ Đóng Góp' : 'Submit Heritage Dossier'}</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* DETAIL DOSSIER & AUDIO MODAL */}
      {selectedContribution && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in">
          <div className="bg-[#FAF9F5] w-full max-w-3xl rounded-2xl border border-[#E4E2DD] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#2B381C] text-white px-6 py-4 flex items-center justify-between border-b border-[#3E4E2A]">
              <div className="flex items-center gap-2">
                <FolderArchive className="w-5 h-5 text-[#F8C696]" />
                <span className="font-heading font-bold text-sm uppercase tracking-wider">
                  {language === 'vi' ? 'Hồ Sơ Tư Liệu Khảo Cứu Di Sản' : 'Heritage Field Research Dossier'}
                </span>
              </div>
              <button
                onClick={() => setSelectedContribution(null)}
                className="p-1 text-[#C5D5AD] hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs text-[#1B1C19]">
              
              {/* Title & Category */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#EAF0E2] text-[#2B381C] font-semibold text-[10px]">
                    {selectedContribution.categoryLabel}
                  </span>
                  <span className="font-mono text-[10px] text-[#6E7265]">
                    ID: {selectedContribution.id}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#1B1C19]">
                  {selectedContribution.title}
                </h3>
              </div>

              {/* Contributor Profile Box */}
              <div className="bg-white p-4 rounded-xl border border-[#E4E2DD] grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[#6E7265] block">{language === 'vi' ? 'Tác giả khảo cứu:' : 'Author:'}</span>
                  <strong className="text-[#1B1C19]">{selectedContribution.contributorName}</strong>
                </div>
                <div>
                  <span className="text-[#6E7265] block">{language === 'vi' ? 'Đơn vị / Vai trò:' : 'Affiliation:'}</span>
                  <strong>{selectedContribution.contributorRoleLabel}</strong>
                </div>
                <div>
                  <span className="text-[#6E7265] block">{language === 'vi' ? 'Địa bàn khảo cứu:' : 'Location:'}</span>
                  <strong>{selectedContribution.location}</strong>
                </div>
              </div>

              {/* Summary Abstract */}
              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#EAE4D5] space-y-1.5">
                <div className="font-bold text-[#8C6239] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>{language === 'vi' ? 'Tóm lược Nghiên cứu' : 'Abstract'}</span>
                </div>
                <p className="leading-relaxed text-[#45483F]">
                  {selectedContribution.summary}
                </p>
              </div>

              {/* Full Text Content */}
              <div className="bg-white p-4 rounded-xl border border-[#E4E2DD] space-y-2">
                <div className="font-bold text-sm text-[#2B381C] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#8C6239]" />
                  <span>{language === 'vi' ? 'Nội dung Báo cáo / Ghi chép Thực địa' : 'Field Report / Text Dossier'}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-line text-[#45483F]">
                  {selectedContribution.fullTextContent || selectedContribution.summary}
                </p>
              </div>

              {/* Audio Preview Player if present */}
              {selectedContribution.audioRecording && (
                <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#EAE4D5] space-y-3">
                  <div className="font-bold text-sm text-[#8C6239] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Music className="w-4 h-4" />
                      <span>{language === 'vi' ? 'Bản Ghi Âm Diễn Xướng Điền Dã' : 'Field Recording Audio'}</span>
                    </div>
                    <span className="text-xs font-mono text-[#6E7265]">{selectedContribution.audioRecording.duration}</span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-[#EAE4D5] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => togglePlayAudio(selectedContribution.id)}
                        className="w-10 h-10 rounded-full bg-[#8C6239] hover:bg-[#2B381C] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
                      >
                        {activeAudioTrack === selectedContribution.id && isPlayingAudio ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>
                      <div>
                        <div className="font-bold text-[#1B1C19] text-xs">
                          {selectedContribution.audioRecording.title}
                        </div>
                        <div className="text-[10px] text-[#6E7265]">
                          Nghệ nhân: <strong className="text-[#8C6239]">{selectedContribution.audioRecording.performer}</strong> • Thể loại: {selectedContribution.audioRecording.genre}
                        </div>
                      </div>
                    </div>
                    <Volume2 className="w-5 h-5 text-[#8C6239] shrink-0" />
                  </div>
                </div>
              )}

              {/* Attached Files List */}
              {selectedContribution.attachedFiles && selectedContribution.attachedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bold text-xs text-[#6E7265]">{language === 'vi' ? 'Tệp đính kèm:' : 'Attached Files:'}</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedContribution.attachedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#E4E2DD] text-xs">
                        <FileText className="w-4 h-4 text-[#8C6239]" />
                        <span className="font-medium text-[#1B1C19]">{file.fileName}</span>
                        <span className="text-[#6E7265] font-mono text-[10px]">({file.fileSize})</span>
                        <button 
                          onClick={() => onToast(language === 'vi' ? `Bắt đầu tải tệp ${file.fileName}` : `Downloading ${file.fileName}`)}
                          className="p-1 hover:bg-[#F0EEE9] rounded text-[#8C6239]"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-[#FAF9F5] px-6 py-3 border-t border-[#E4E2DD] flex items-center justify-between">
              <div className="text-[11px] text-[#6E7265] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4F5D3D]" />
                <span>{language === 'vi' ? 'Tư liệu đã được lưu trữ trong Kho Tri Thức Di Sản' : 'Archived in Heritage Knowledge System'}</span>
              </div>
              <button
                onClick={() => setSelectedContribution(null)}
                className="px-4 py-2 bg-[#2B381C] hover:bg-[#1B1C19] text-white text-xs font-bold rounded-lg transition-colors"
              >
                {language === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
