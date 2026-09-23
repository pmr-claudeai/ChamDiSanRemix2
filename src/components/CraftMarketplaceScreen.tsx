/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CraftProduct, CraftCategory, RegionFilter, Language, ProductReview } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { 
  User, 
  MessageSquare, 
  ChevronDown, 
  Sparkles, 
  PlusCircle, 
  X, 
  Phone, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Layers, 
  ExternalLink,
  Send,
  SlidersHorizontal,
  Package,
  Star
} from 'lucide-react';

import { ArtisanProfileModal } from './ArtisanProfileModal';

interface CraftMarketplaceScreenProps {
  products: CraftProduct[];
  language: Language;
  onAddProduct?: (newProduct: CraftProduct) => void;
  onAddReview?: (productId: string, review: ProductReview) => void;
  onToast: (msg: string) => void;
}

export const CraftMarketplaceScreen: React.FC<CraftMarketplaceScreenProps> = ({
  products,
  language,
  onAddProduct,
  onAddReview,
  onToast,
}) => {
  const t = TRANSLATIONS[language];
  const tm = t.marketplace;

  // Filter & Sort States
  const [selectedCategory, setSelectedCategory] = useState<CraftCategory>('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('all');
  const [sortOption, setSortOption] = useState<'priceAsc' | 'priceDesc' | 'featured'>('featured');
  
  // Modals
  const [selectedProductForContact, setSelectedProductForContact] = useState<CraftProduct | null>(null);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  // New Listing Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<CraftCategory>('brocade_silk');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdArtisan, setNewProdArtisan] = useState('');
  const [newProdEthnic, setNewProdEthnic] = useState('');
  const [newProdLocation, setNewProdLocation] = useState('');
  const [newProdRegion, setNewProdRegion] = useState<RegionFilter>('northwest');
  const [newProdPhone, setNewProdPhone] = useState('');
  const [newProdBank, setNewProdBank] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImageUrl, setNewProdImageUrl] = useState('');

  // Category definition list matching top navigation
  const categories: { id: CraftCategory; label: string }[] = [
    { id: 'all', label: tm.categories.all },
    { id: 'brocade_silk', label: tm.categories.brocade_silk },
    { id: 'bamboo_rattan', label: tm.categories.bamboo_rattan },
    { id: 'ceramics_tools', label: tm.categories.ceramics_tools },
    { id: 'indigenous_agro', label: tm.categories.indigenous_agro },
  ];

  // Region options
  const regions: { id: RegionFilter; label: string }[] = [
    { id: 'all', label: tm.regions.all },
    { id: 'north', label: tm.regions.north },
    { id: 'northwest', label: tm.regions.northwest },
    { id: 'central', label: tm.regions.central },
    { id: 'highlands', label: tm.regions.highlands },
    { id: 'south', label: tm.regions.south },
  ];

  // Filtered & Sorted Products
  const displayedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchRegion = selectedRegion === 'all' || p.region === selectedRegion;
      return matchCategory && matchRegion;
    });

    if (sortOption === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedRegion, sortOption]);

  // Handle New Product Submission
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice.trim() || !newProdArtisan.trim()) {
      onToast(language === 'vi' ? 'Vui lòng điền đủ tên sản phẩm, giá và tên nghệ nhân.' : 'Please fill in required fields.');
      return;
    }

    const priceNum = parseInt(newProdPrice.replace(/\D/g, ''), 10) || 100000;
    const formattedPrice = priceNum.toLocaleString('vi-VN') + ' ₫';

    const defaultImg = newProdImageUrl.trim() || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80';

    const newCraft: CraftProduct = {
      id: `prod-custom-${Date.now()}`,
      name: newProdName,
      nameEn: newProdName,
      category: newProdCategory,
      categoryLabel: tm.categories[newProdCategory],
      categoryLabelEn: tm.categories[newProdCategory],
      price: priceNum,
      priceFormatted: formattedPrice,
      artisanName: newProdArtisan,
      ethnicGroup: newProdEthnic || 'Đồng bào bản địa',
      location: newProdLocation || 'Việt Nam',
      region: newProdRegion,
      regionLabel: tm.regions[newProdRegion],
      regionLabelEn: tm.regions[newProdRegion],
      imageUrl: defaultImg,
      description: newProdDesc || 'Sản phẩm thủ công truyền thống được tạo tác bởi nghệ nhân.',
      descriptionEn: newProdDesc || 'Handcrafted traditional artisan craft.',
      phone: newProdPhone || '0988 888 888',
      zalo: newProdPhone || '0988888888',
      bankInfo: {
        bankName: 'Ngân hàng địa phương',
        accountNumber: newProdBank || '123456789',
        accountHolder: newProdArtisan.toUpperCase()
      },
      isFeatured: true,
      inStock: true,
      heritageCertification: 'Sản phẩm bản địa phi trung gian Chạm Di Sản'
    };

    if (onAddProduct) {
      onAddProduct(newCraft);
    }
    setIsListingModalOpen(false);
    onToast(tm.submitSuccess);

    // Reset form
    setNewProdName('');
    setNewProdPrice('');
    setNewProdArtisan('');
    setNewProdEthnic('');
    setNewProdLocation('');
    setNewProdPhone('');
    setNewProdBank('');
    setNewProdDesc('');
    setNewProdImageUrl('');
  };

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen pb-24 text-[#1B1C19]">
      
      {/* Top Filter Bar Header */}
      <div className="w-full bg-white border-b border-[#EAE6DE] sticky top-20 z-30 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-all relative ${
                    isActive
                      ? 'text-[#C0573E] font-semibold'
                      : 'text-[#45483F] hover:text-[#1B1C19]'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#C0573E] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Region, Sort, and Add Product */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            
            {/* Region Dropdown */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as RegionFilter)}
                className="appearance-none bg-[#F7F5F0] hover:bg-[#EFECE4] text-[#1B1C19] text-xs sm:text-sm font-medium pl-3 pr-8 py-2 rounded-lg border border-[#E2DDD5] focus:outline-none focus:border-[#8C6239] cursor-pointer transition-colors"
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.id === 'all' ? `${tm.regions.title}: ${r.label}` : r.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6E7265] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sorting Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="appearance-none bg-[#F7F5F0] hover:bg-[#EFECE4] text-[#1B1C19] text-xs sm:text-sm font-medium pl-3 pr-8 py-2 rounded-lg border border-[#E2DDD5] focus:outline-none focus:border-[#8C6239] cursor-pointer transition-colors"
              >
                <option value="featured">{tm.sorting.featured}</option>
                <option value="priceAsc">{tm.sorting.priceAsc}</option>
                <option value="priceDesc">{tm.sorting.priceDesc}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#6E7265] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Post/List Product CTA Button */}
            <button
              onClick={() => setIsListingModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2B381C] hover:bg-[#384527] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-colors shrink-0"
              title="Dành cho nghệ nhân & HTX đăng tải sản phẩm"
            >
              <PlusCircle className="w-4 h-4 text-[#F8C696]" />
              <span className="hidden sm:inline">{tm.registerCta}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-10 sm:pt-14">
        
        {/* Title and Intro */}
        <div className="text-center max-w-[800px] mx-auto mb-10">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#2B381C] tracking-tight mb-4">
            {tm.title}
          </h1>
          <p className="font-editorial text-base sm:text-lg text-[#55584E] leading-relaxed [text-wrap:pretty]">
            {tm.subtitle}
          </p>

          {/* Direct Trading Guarantee Pill */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF2E4] border border-[#C5D9B4] text-[#2B381C] text-xs sm:text-sm font-medium shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#436427]" />
            <span>{tm.bannerText}</span>
          </div>
        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#EAE6DE] max-w-lg mx-auto my-12">
            <Package className="w-12 h-12 text-[#A39E93] mx-auto mb-3" />
            <p className="font-heading font-semibold text-lg text-[#1B1C19] mb-1">
              Chưa có sản phẩm phù hợp với bộ lọc
            </p>
            <p className="text-xs text-[#6E7265] mb-4">
              Vui lòng chọn danh mục hoặc vùng miền khác để khám phá thêm.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRegion('all');
              }}
              className="px-4 py-2 bg-[#2B381C] text-white text-xs font-semibold rounded-lg"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full bg-[#F4F1EA] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={language === 'vi' ? product.name : product.nameEn}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category Tag on Image */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#2B381C] shadow-2xs border border-[#E2DDD5]">
                    {language === 'vi' ? product.categoryLabel : product.categoryLabelEn}
                  </div>

                  {/* Region badge */}
                  <div className="absolute top-3 right-3 bg-[#2B381C]/85 backdrop-blur-xs text-[#FBF9F4] px-2 py-0.5 rounded text-[10px] font-medium">
                    {language === 'vi' ? product.regionLabel : product.regionLabelEn}
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h2 className="font-heading font-bold text-lg text-[#1B1C19] line-clamp-2 mb-2 leading-snug group-hover:text-[#8C6239] transition-colors">
                      {language === 'vi' ? product.name : product.nameEn}
                    </h2>

                    {/* Price in Terracotta Red & Rating Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="font-heading font-bold text-base sm:text-lg text-[#B83A26]">
                        {product.priceFormatted}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C6239] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E2DDD5] shadow-2xs">
                        <Star className="w-3 h-3 fill-[#E59819] text-[#E59819]" />
                        <span>{product.rating || '5.0'}</span>
                        {product.reviews && product.reviews.length > 0 && (
                          <span className="text-[#888] font-normal">({product.reviews.length})</span>
                        )}
                      </div>
                    </div>

                    {/* Artisan / Cooperative Origin with User Icon */}
                    <div className="flex items-center gap-1.5 text-xs text-[#55584E] mb-4">
                      <User className="w-3.5 h-3.5 text-[#8C6239] shrink-0" />
                      <span className="truncate font-medium">
                        {product.artisanName}
                      </span>
                    </div>
                  </div>

                  {/* Direct Contact Button */}
                  <button
                    onClick={() => {
                      setSelectedProductForContact(product);
                    }}
                    className="w-full py-2.5 px-4 bg-white hover:bg-[#FAF8F5] active:bg-[#F2EFE9] border border-[#2B381C] text-[#2B381C] hover:border-[#8C6239] hover:text-[#8C6239] text-xs font-bold tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{tm.directContact}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL 1: Direct Artisan Communication Portal & Verified Identity */}
      {selectedProductForContact && (
        <ArtisanProfileModal
          product={selectedProductForContact}
          language={language}
          onClose={() => setSelectedProductForContact(null)}
          onAddReview={onAddReview}
          onToast={onToast}
        />
      )}

      {/* MODAL 2: Add / Register New Craft Product (For Artisans & Minorities) */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in">
          <div className="bg-[#FBF9F4] w-full max-w-xl rounded-2xl shadow-2xl border border-[#E2DDD5] overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            
            <div className="bg-[#2B381C] text-white p-5 sm:p-6 flex items-start justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  {tm.submitProductTitle}
                </h3>
                <p className="text-xs text-[#C5D5AD] mt-1">
                  {tm.submitProductSubtitle}
                </p>
              </div>
              <button
                onClick={() => setIsListingModalOpen(false)}
                className="p-1 text-[#C5D5AD] hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              
              <div>
                <label className="block font-semibold text-[#1B1C19] mb-1">
                  Tên sản phẩm thủ công / Đặc sản *
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Ví dụ: Khăn thổ cẩm dệt tay người Thái Mai Châu"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B1C19] mb-1">
                    Danh mục sản phẩm *
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as CraftCategory)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs cursor-pointer"
                  >
                    <option value="brocade_silk">Thổ cẩm & Dệt tơ</option>
                    <option value="bamboo_rattan">Mây tre đan</option>
                    <option value="ceramics_tools">Gốm sứ & Dụng cụ</option>
                    <option value="indigenous_agro">Nông sản bản địa</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#1B1C19] mb-1">
                    Giá bán đề xuất (VNĐ) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="Ví dụ: 650000"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B1C19] mb-1">
                    Tên Nghệ nhân / Hợp tác xã *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdArtisan}
                    onChange={(e) => setNewProdArtisan(e.target.value)}
                    placeholder="Ví dụ: Nghệ nhân Hà Thị Dệt"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1B1C19] mb-1">
                    Thành phần Dân tộc
                  </label>
                  <input
                    type="text"
                    value={newProdEthnic}
                    onChange={(e) => setNewProdEthnic(e.target.value)}
                    placeholder="Ví dụ: Dân tộc Thái, Mường, H'Mông..."
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B1C19] mb-1">
                    Vùng miền *
                  </label>
                  <select
                    value={newProdRegion}
                    onChange={(e) => setNewProdRegion(e.target.value as RegionFilter)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs cursor-pointer"
                  >
                    <option value="northwest">Vùng cao Tây Bắc</option>
                    <option value="north">Miền Bắc</option>
                    <option value="central">Miền Trung</option>
                    <option value="highlands">Tây Nguyên</option>
                    <option value="south">Miền Nam</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#1B1C19] mb-1">
                    Làng nghề / Địa chỉ cụ thể
                  </label>
                  <input
                    type="text"
                    value={newProdLocation}
                    onChange={(e) => setNewProdLocation(e.target.value)}
                    placeholder="Ví dụ: Bản Lác, Mai Châu, Hòa Bình"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1B1C19] mb-1">
                    Số điện thoại / Zalo nhận đơn hàng *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newProdPhone}
                    onChange={(e) => setNewProdPhone(e.target.value)}
                    placeholder="0988 123 456"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1B1C19] mb-1">
                    Số tài khoản ngân hàng nhận tiền
                  </label>
                  <input
                    type="text"
                    value={newProdBank}
                    onChange={(e) => setNewProdBank(e.target.value)}
                    placeholder="VD: 8201205... Agribank"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1B1C19] mb-1">
                  Đường dẫn ảnh sản phẩm (URL)
                </label>
                <input
                  type="url"
                  value={newProdImageUrl}
                  onChange={(e) => setNewProdImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... hoặc để trống dùng ảnh mẫu"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1B1C19] mb-1">
                  Mô tả sản phẩm, chất liệu & quy trình thủ công
                </label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Mô tả nguyên liệu tự nhiên, kỹ thuật dệt/nung/đan và ý nghĩa văn hóa..."
                  className="w-full px-3 py-2.5 rounded-lg border border-[#D5D0C6] focus:outline-none focus:border-[#2B381C] bg-white text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2B381C] hover:bg-[#384527] text-white text-xs font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#F8C696]" />
                  <span>Xác nhận Niêm yết Phi Trung Gian</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
