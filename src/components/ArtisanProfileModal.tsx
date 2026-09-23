/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CraftProduct, Language, ProductReview } from '../types';
import { 
  X, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Send, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  Award, 
  Clock, 
  Users, 
  ShieldCheck, 
  CreditCard,
  Check,
  Star,
  ThumbsUp,
  UserCheck,
  AlertCircle,
  Plus,
  MessageCircle,
  Lock,
  Smartphone
} from 'lucide-react';

interface ArtisanProfileModalProps {
  product: CraftProduct;
  language: Language;
  onClose: () => void;
  onSelectProduct?: (product: CraftProduct) => void;
  onAddReview?: (productId: string, review: ProductReview) => void;
  onToast: (msg: string) => void;
}

const DEFAULT_EXPERIENCE_TAGS = [
  'Chất lượng tinh xảo',
  'Đóng gói cẩn thận',
  'Nghệ nhân nhiệt tình',
  'Đúng bài men/kỹ thuật cổ',
  'Giao hàng đúng hẹn',
  'Chất liệu tự nhiên 100%'
];

export const ArtisanProfileModal: React.FC<ArtisanProfileModalProps> = ({
  product,
  language,
  onClose,
  onAddReview,
  onToast
}) => {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'reviews' | 'story' | 'bank'>('contact');

  // Local reviews state initialized with product.reviews or default mock reviews
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(() => {
    if (product.reviews && product.reviews.length > 0) {
      return product.reviews;
    }
    // Fallback default authentic reviews
    return [
      {
        id: `rev-${product.id}-1`,
        productId: product.id,
        reviewerName: 'Nguyễn Minh Châu',
        reviewerPhone: '0912345678',
        verifiedPurchase: true,
        rating: 5,
        date: '18/08/2026',
        comment: language === 'vi' 
          ? `Sản phẩm ${product.name} được làm thủ công rất có hồn và tinh xảo. Tôi đã liên hệ trực tiếp nghệ nhân qua Zalo để nhờ tư vấn thêm về cách bảo quản, nghệ nhân rất thân thiện và chu đáo.`
          : `The ${product.nameEn || product.name} is exquisitely handcrafted with true soul. I contacted the artisan directly on Zalo and received wonderful care.`,
        tags: ['Chất lượng tinh xảo', 'Đóng gói cẩn thận', 'Nghệ nhân nhiệt tình'],
        artisanResponse: language === 'vi'
          ? `Trân trọng cảm ơn quý khách đã tin yêu và đồng hành gìn giữ di sản nghề truyền thống!`
          : `Thank you warmly for supporting and safeguarding our ancestral craft heritage!`
      },
      {
        id: `rev-${product.id}-2`,
        productId: product.id,
        reviewerName: 'Trần Bảo Nam',
        reviewerPhone: '0983765432',
        verifiedPurchase: true,
        rating: 5,
        date: '12/08/2026',
        comment: language === 'vi'
          ? `Giao dịch phi trung gian trực tiếp với nghệ nhân rất thuận tiện và an tâm. Sản phẩm chuẩn nguyên bản, đóng gói chống sốc kỹ lưỡng khi vận chuyển xa.`
          : `Direct-to-artisan trading was seamless and reassuring. Authentic traditional craft, securely packaged.`,
        tags: ['Giao hàng đúng hẹn', 'Chất liệu tự nhiên 100%']
      }
    ];
  });

  // Review Form States
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerPhone, setReviewerPhone] = useState('');
  const [reviewerPhoneConfirm, setReviewerPhoneConfirm] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Chất lượng tinh xảo', 'Đóng gói cẩn thận']);
  const [otpCode, setOtpCode] = useState('');
  const [sentOtp, setSentOtp] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  // Calculations
  const averageRating = useMemo(() => {
    if (localReviews.length === 0) return 5.0;
    const total = localReviews.reduce((sum, r) => sum + r.rating, 0);
    return Number((total / localReviews.length).toFixed(1));
  }, [localReviews]);

  // Clean phone numbers and URLs
  const cleanPhone = product.phone.replace(/[^0-9]/g, '');
  const zaloUrl = product.zalo ? (product.zalo.startsWith('http') ? product.zalo : `https://zalo.me/${product.zalo.replace(/[^0-9]/g, '')}`) : `https://zalo.me/${cleanPhone}`;
  const messengerUrl = product.messenger || `https://m.me/heritagecraft.${cleanPhone.slice(-4)}`;
  const smsUrl = `sms:${cleanPhone}?body=${encodeURIComponent(`Xin chào ${product.artisanName}, tôi quan tâm đến sản phẩm "${product.name}" trên Cổng Di sản.`)}`;
  const telUrl = `tel:${cleanPhone}`;

  const copyToClipboard = (text: string, type: 'bank' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
      onToast(language === 'vi' ? 'Đã sao chép số tài khoản!' : 'Bank account copied!');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      onToast(language === 'vi' ? 'Đã sao chép số điện thoại!' : 'Phone number copied!');
    }
  };

  // Toggle tag
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Mock send OTP verification code to phone
  const handleSendOtp = () => {
    const cleanP = reviewerPhone.replace(/\D/g, '');
    if (!cleanP || cleanP.length < 9) {
      onToast(language === 'vi' ? 'Vui lòng nhập số điện thoại hợp lệ trước khi gửi mã xác thực.' : 'Please enter a valid phone number first.');
      return;
    }
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(mockCode);
    setOtpCode(mockCode); // Pre-fill for seamless user testing
    setReviewerPhoneConfirm(cleanP); // Sync phone confirm
    onToast(language === 'vi' ? `Mã xác thực OTP (${mockCode}) đã được gửi đến SĐT ${reviewerPhone}` : `OTP code (${mockCode}) sent to ${reviewerPhone}`);
  };

  // Check phone confirmation match
  const isPhoneConfirmed = useMemo(() => {
    const p1 = reviewerPhone.replace(/\D/g, '');
    const p2 = reviewerPhoneConfirm.replace(/\D/g, '');
    if (!p1 || p1.length < 9) return false;
    if (sentOtp && otpCode === sentOtp) return true;
    return p1 === p2 && p2.length >= 9;
  }, [reviewerPhone, reviewerPhoneConfirm, sentOtp, otpCode]);

  // Submit Review Handler
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewerName.trim()) {
      onToast(language === 'vi' ? 'Vui lòng nhập Họ và tên của bạn.' : 'Please enter your name.');
      return;
    }

    const cleanP1 = reviewerPhone.replace(/\D/g, '');
    if (!cleanP1 || cleanP1.length < 9) {
      onToast(language === 'vi' ? 'Vui lòng nhập Số điện thoại liên hệ mua hàng hợp lệ.' : 'Please enter a valid phone number.');
      return;
    }

    const cleanP2 = reviewerPhoneConfirm.replace(/\D/g, '');
    const otpMatched = sentOtp && otpCode.trim() === sentOtp;

    if (!isPhoneConfirmed && !otpMatched && cleanP1 !== cleanP2) {
      onToast(
        language === 'vi'
          ? 'Số điện thoại xác thực không khớp hoặc chưa xác nhận. Vui lòng kiểm tra lại để đảm bảo tính xác thực đơn hàng.'
          : 'Phone number verification failed. Please confirm your phone number accurately.'
      );
      return;
    }

    if (!comment.trim() || comment.trim().length < 6) {
      onToast(language === 'vi' ? 'Vui lòng viết nội dung nhận xét đánh giá (tối thiểu 6 ký tự).' : 'Please write your review comment.');
      return;
    }

    setIsSubmittingReview(true);

    setTimeout(() => {
      // Format masked phone for privacy
      const maskedPhone = cleanP1.length >= 10 
        ? `${cleanP1.slice(0, 4)}***${cleanP1.slice(-3)}` 
        : `${cleanP1.slice(0, 3)}***`;

      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

      const newReview: ProductReview = {
        id: `rev-${Date.now()}`,
        productId: product.id,
        reviewerName: reviewerName.trim(),
        reviewerPhone: maskedPhone,
        verifiedPurchase: true,
        rating,
        date: formattedDate,
        comment: comment.trim(),
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        artisanResponse: language === 'vi'
          ? `Nghệ nhân ${product.artisanName} trân trọng cảm ơn ${reviewerName.trim()} đã ủng hộ tác phẩm thủ công!`
          : `${product.artisanName} sincerely thanks you for supporting traditional craft!`
      };

      const updated = [newReview, ...localReviews];
      setLocalReviews(updated);

      if (onAddReview) {
        onAddReview(product.id, newReview);
      }

      setIsSubmittingReview(false);
      setIsWritingReview(false);
      
      // Reset form
      setReviewerName('');
      setReviewerPhone('');
      setReviewerPhoneConfirm('');
      setOtpCode('');
      setSentOtp(null);
      setComment('');
      setRating(5);

      onToast(
        language === 'vi'
          ? 'Đánh giá sau mua hàng đã được xác thực số điện thoại và đăng tải thành công!'
          : 'Your verified post-purchase review has been submitted successfully!'
      );
    }, 500);
  };

  const getRatingLabel = (stars: number) => {
    switch (stars) {
      case 5: return language === 'vi' ? '5 sao – Tuyệt vời & Rất hài lòng' : '5 stars – Excellent';
      case 4: return language === 'vi' ? '4 sao – Hài lòng' : '4 stars – Very Good';
      case 3: return language === 'vi' ? '3 sao – Tương đối hài lòng' : '3 stars – Average';
      case 2: return language === 'vi' ? '2 sao – Cần cải thiện' : '2 stars – Needs Improvement';
      case 1: return language === 'vi' ? '1 sao – Chưa hài lòng' : '1 star – Disappointed';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF9F5] w-full max-w-2xl rounded-2xl border border-[#E4E2DD] shadow-2xl overflow-hidden text-[#1B1C19] my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#2B381C] text-[#FAF9F5] px-6 py-4 flex items-center justify-between border-b border-[#3E4E2A]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C0573E]" />
            <span className="font-heading font-bold text-sm tracking-wider uppercase">
              {language === 'vi' ? 'Cổng Giao Tiếp Trực Tiếp & Hồ Sơ Định Danh' : 'Direct Communication Portal & Artisan Identity'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#EAF0E2] hover:text-white hover:bg-white/10 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Artisan Identity Card */}
          <div className="bg-white rounded-xl p-5 border border-[#E4E2DD] shadow-sm flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative shrink-0">
              <img 
                src={product.artisanAvatar || product.imageUrl} 
                alt={product.artisanName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#8C6239]/20 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#4F5D3D] text-white p-1 rounded-full shadow" title="Đã xác thực danh tính">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading text-xl font-bold text-[#1B1C19]">
                  {product.artisanName}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EAF0E2] text-[#2B381C] border border-[#D5E2C8]">
                  <CheckCircle2 className="w-3 h-3 text-[#4F5D3D]" />
                  {language === 'vi' ? 'Đã xác thực định danh' : 'Verified Artisan'}
                </span>
              </div>

              <p className="text-xs font-semibold text-[#8C6239]">
                {product.artisanTitle || 'Nghệ nhân gìn giữ di sản nghề truyền thống'}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#45483F] pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C0573E] shrink-0" />
                  <span className="truncate">{product.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#4F5D3D] shrink-0" />
                  <span>{product.ethnicGroup || 'Dân tộc bản địa'}</span>
                </div>
                
                {/* Rating Badge */}
                <div 
                  onClick={() => setActiveTab('reviews')}
                  className="flex items-center gap-1.5 cursor-pointer text-[#B83A26] hover:underline"
                >
                  <Star className="w-3.5 h-3.5 fill-[#B83A26] text-[#B83A26]" />
                  <span className="font-bold">{averageRating} / 5.0</span>
                  <span className="text-[#6E7265]">({localReviews.length} {language === 'vi' ? 'đánh giá' : 'reviews'})</span>
                </div>

                {product.artisanExperienceYears && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8C6239] shrink-0" />
                    <span>{product.artisanExperienceYears} {language === 'vi' ? 'năm nghề' : 'yrs exp'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex border-b border-[#E4E2DD] gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'contact' 
                  ? 'border-[#C0573E] text-[#C0573E]' 
                  : 'border-transparent text-[#6E7265] hover:text-[#1B1C19]'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Kênh liên hệ' : 'Direct Channels'}
            </button>

            {/* TAB: Reviews (Đánh giá sau mua) */}
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'reviews' 
                  ? 'border-[#C0573E] text-[#C0573E]' 
                  : 'border-transparent text-[#6E7265] hover:text-[#1B1C19]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${activeTab === 'reviews' ? 'fill-[#C0573E]' : ''}`} />
              <span>{language === 'vi' ? 'Đánh giá sau mua' : 'Reviews'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#EAE6DE] text-[#2B381C] font-mono font-bold">
                {localReviews.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('story')}
              className={`pb-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'story' 
                  ? 'border-[#C0573E] text-[#C0573E]' 
                  : 'border-transparent text-[#6E7265] hover:text-[#1B1C19]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Tiểu sử & Tay nghề' : 'Bio & Craft'}
            </button>

            <button
              onClick={() => setActiveTab('bank')}
              className={`pb-2.5 text-xs font-heading font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'bank' 
                  ? 'border-[#C0573E] text-[#C0573E]' 
                  : 'border-transparent text-[#6E7265] hover:text-[#1B1C19]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Thanh toán trực tiếp' : 'Direct Payment'}
            </button>
          </div>

          {/* TAB 1: Direct Communication Buttons */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              
              {/* Product Reference Badge */}
              <div className="bg-[#F0EEE9] rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#E4E2DD]" 
                  />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#6E7265]">
                      {language === 'vi' ? 'Sản phẩm đang quan tâm' : 'Inquiring Product'}
                    </div>
                    <div className="font-bold text-[#1B1C19] line-clamp-1">{product.name}</div>
                    <div className="font-mono font-bold text-[#C0573E]">{product.priceFormatted}</div>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] px-2 py-1 rounded bg-[#EAF0E2] text-[#384527] font-semibold">
                  {language === 'vi' ? 'Còn hàng' : 'In Stock'}
                </span>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Zalo Direct */}
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#0068FF]/10 border border-[#0068FF]/30 hover:bg-[#0068FF]/20 text-[#0068FF] font-semibold text-sm transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#0068FF] text-white flex items-center justify-center font-bold text-xs shadow">
                      Zalo
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#0055D4]">Nhắn tin qua Zalo</div>
                      <div className="text-[10px] text-[#45483F] font-mono">{product.phone}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Facebook Messenger */}
                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#0084FF]/10 border border-[#0084FF]/30 hover:bg-[#0084FF]/20 text-[#0084FF] font-semibold text-sm transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#0084FF] text-white flex items-center justify-center font-bold text-xs shadow">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#0070D6]">Facebook Messenger</div>
                      <div className="text-[10px] text-[#45483F]">{language === 'vi' ? 'Trò chuyện trực tiếp' : 'Direct Message'}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Direct Phone Call */}
                <a
                  href={telUrl}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#4F5D3D]/10 border border-[#4F5D3D]/30 hover:bg-[#4F5D3D]/20 text-[#2B381C] font-semibold text-sm transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#4F5D3D] text-white flex items-center justify-center font-bold text-xs shadow">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#2B381C]">Gọi điện thoại</div>
                      <div className="text-[10px] text-[#45483F] font-mono">{product.phone}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* SMS Text Message */}
                <a
                  href={smsUrl}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#C0573E]/10 border border-[#C0573E]/30 hover:bg-[#C0573E]/20 text-[#C0573E] font-semibold text-sm transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#C0573E] text-white flex items-center justify-center font-bold text-xs shadow">
                      <Send className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#9D3820]">Gửi tin nhắn SMS</div>
                      <div className="text-[10px] text-[#45483F]">{language === 'vi' ? 'Hỏi thông tin mẫu' : 'Inquire Details'}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Copy Phone Button */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#E4E2DD] text-xs">
                <span className="text-[#45483F]">
                  {language === 'vi' ? 'Hotline liên hệ chính thức:' : 'Official artisan hotline:'} <strong className="font-mono text-[#1B1C19]">{product.phone}</strong>
                </span>
                <button
                  onClick={() => copyToClipboard(product.phone, 'phone')}
                  className="px-2.5 py-1 rounded bg-[#F0EEE9] hover:bg-[#E4E2DD] text-[#1B1C19] font-medium flex items-center gap-1 transition-colors"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#4F5D3D]" /> : <Copy className="w-3.5 h-3.5 text-[#6E7265]" />}
                  <span>{copiedPhone ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép SĐT' : 'Copy')}</span>
                </button>
              </div>

              {/* Sovereign Trade Notice */}
              <div className="p-3.5 rounded-xl bg-[#EAF0E2]/60 border border-[#D5E2C8] text-xs text-[#2B381C] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#4F5D3D] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold">{language === 'vi' ? 'Cơ chế Tự chủ Thương lượng 100%' : '100% Direct Self-Managed Trade'}</div>
                  <p className="text-[#45483F] leading-relaxed text-[11px]">
                    {language === 'vi' 
                      ? 'Nền tảng đóng vai trò cầu nối phi trung gian, không thu chiết khấu. Người mua và nghệ nhân trực tiếp thỏa thuận về số lượng, mẫu mã tùy biến, đóng gói và vận chuyển.'
                      : 'Zero-commission platform bridge. Buyers and craftspeople negotiate directly on customized quantities, artisanal specifications, packaging, and logistics.'}
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Customer Reviews & Verification System (Đánh giá sau mua hàng) */}
          {activeTab === 'reviews' && (
            <div className="space-y-5">
              
              {/* Reviews Summary Card */}
              <div className="bg-white rounded-xl p-5 border border-[#E4E2DD] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="p-3 rounded-2xl bg-[#FDF8EE] border border-[#F3E2C4]">
                    <div className="font-heading font-extrabold text-3xl text-[#B83A26]">
                      {averageRating}
                    </div>
                    <div className="flex items-center justify-center gap-0.5 my-1 text-[#E59819]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= Math.round(averageRating) ? 'fill-[#E59819] text-[#E59819]' : 'text-[#D5D0C6]'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-[10px] text-[#6E7265] font-medium">
                      {localReviews.length} {language === 'vi' ? 'đánh giá' : 'reviews'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-sm text-[#1B1C19]">
                      {language === 'vi' ? 'Đánh giá & Trải nghiệm sau mua' : 'Verified Post-Purchase Reviews'}
                    </h4>
                    <p className="text-xs text-[#55584E] leading-relaxed">
                      {language === 'vi'
                        ? '100% đánh giá minh bạch từ khách hàng đã xác thực số điện thoại và trực tiếp giao dịch với nghệ nhân.'
                        : '100% transparent reviews from buyers who verified their phone numbers and bought directly.'}
                    </p>
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#436427]">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'Yêu cầu xác thực SĐT mua hàng' : 'Verified Phone Authentication'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsWritingReview(!isWritingReview)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#2B381C] hover:bg-[#384527] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#F8C696]" />
                  <span>{isWritingReview ? (language === 'vi' ? 'Đóng biểu mẫu' : 'Close Form') : (language === 'vi' ? 'Viết đánh giá sau mua' : 'Write a Review')}</span>
                </button>
              </div>

              {/* Form: Write Review with Phone Verification */}
              {isWritingReview && (
                <div className="bg-[#F8F6F0] rounded-xl p-5 border-2 border-[#8C6239]/40 shadow-md animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-[#8C6239]" />
                      <h4 className="font-heading font-bold text-sm text-[#1B1C19]">
                        {language === 'vi' ? 'Gửi Đánh Giá Sau Mua Hàng Trực Tiếp' : 'Submit Post-Purchase Feedback'}
                      </h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#EAE6DE] text-[#45483F] font-medium">
                      {product.name}
                    </span>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                    
                    {/* Verification Notice */}
                    <div className="p-3 rounded-lg bg-[#EBF2E4] border border-[#C5D9B4] text-[#2B381C] text-[11px] flex items-start gap-2">
                      <Lock className="w-4 h-4 text-[#436427] shrink-0 mt-0.5" />
                      <div>
                        <strong>{language === 'vi' ? 'Xác thực người mua thực tế:' : 'Authentic Buyer Verification:'}</strong>{' '}
                        {language === 'vi'
                          ? 'Vui lòng nhập Họ tên và Số điện thoại bạn đã dùng khi liên hệ nghệ nhân. Hệ thống yêu cầu xác thực số điện thoại để đảm bảo tính khách quan.'
                          : 'Please enter the name and phone number you used with the artisan to authenticate your review.'}
                      </div>
                    </div>

                    {/* Form Field 1: Họ và tên người đánh giá */}
                    <div>
                      <label className="block font-semibold text-[#1B1C19] mb-1">
                        {language === 'vi' ? 'Họ và tên người mua / Đánh giá *' : 'Your Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder={language === 'vi' ? 'Ví dụ: Nguyễn Thị Mai' : 'E.g., Mai Nguyen'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#C6C8BC] bg-white text-xs text-[#1B1C19] focus:outline-none focus:border-[#8C6239]"
                      />
                    </div>

                    {/* Form Field 2 & 3: Số điện thoại & Xác thực số điện thoại */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-semibold text-[#1B1C19] mb-1">
                          {language === 'vi' ? 'Số điện thoại mua hàng *' : 'Purchase Phone Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={reviewerPhone}
                          onChange={(e) => setReviewerPhone(e.target.value)}
                          placeholder="0912 345 678"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#C6C8BC] bg-white text-xs text-[#1B1C19] focus:outline-none focus:border-[#8C6239]"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-semibold text-[#1B1C19]">
                            {language === 'vi' ? 'Xác thực số điện thoại *' : 'Confirm Phone / OTP *'}
                          </label>
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="text-[10px] text-[#8C6239] hover:underline font-semibold flex items-center gap-1"
                          >
                            <Smartphone className="w-3 h-3" />
                            <span>{language === 'vi' ? 'Nhận mã OTP' : 'Get OTP'}</span>
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={reviewerPhoneConfirm}
                            onChange={(e) => {
                              setReviewerPhoneConfirm(e.target.value);
                            }}
                            placeholder={language === 'vi' ? 'Nhập lại SĐT để đối soát' : 'Re-enter phone to confirm'}
                            className={`w-full px-3.5 py-2.5 pr-8 rounded-lg border bg-white text-xs text-[#1B1C19] focus:outline-none ${
                              isPhoneConfirmed 
                                ? 'border-[#4F5D3D] ring-1 ring-[#4F5D3D]/30' 
                                : 'border-[#C6C8BC] focus:border-[#8C6239]'
                            }`}
                          />
                          {isPhoneConfirmed && (
                            <CheckCircle2 className="w-4 h-4 text-[#4F5D3D] absolute right-2.5 top-1/2 -translate-y-1/2" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Form Field 4: Chọn số sao đánh giá */}
                    <div className="bg-white p-3.5 rounded-lg border border-[#E4E2DD]">
                      <label className="block font-semibold text-[#1B1C19] mb-1.5">
                        {language === 'vi' ? 'Mức độ hài lòng về tác phẩm & nghệ nhân *' : 'Artisan & Craft Satisfaction Rating *'}
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= (hoverRating || rating)
                                    ? 'fill-[#E59819] text-[#E59819]'
                                    : 'text-[#D5D0C6]'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-[#8C6239] ml-2">
                          {getRatingLabel(hoverRating || rating)}
                        </span>
                      </div>
                    </div>

                    {/* Form Field 5: Thẻ trải nghiệm nhanh (Tags) */}
                    <div>
                      <label className="block font-semibold text-[#1B1C19] mb-1.5">
                        {language === 'vi' ? 'Điểm nổi bật khi trải nghiệm (chọn nhanh):' : 'Key Experience Highlights:'}
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {DEFAULT_EXPERIENCE_TAGS.map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleToggleTag(tag)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                                isSelected
                                  ? 'bg-[#2B381C] text-white border-[#2B381C]'
                                  : 'bg-white text-[#45483F] border-[#D5D0C6] hover:bg-[#F0EEE9]'
                              }`}
                            >
                              {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Form Field 6: Nội dung nhận xét chi tiết */}
                    <div>
                      <label className="block font-semibold text-[#1B1C19] mb-1">
                        {language === 'vi' ? 'Nội dung nhận xét & Trải nghiệm thực tế sau mua *' : 'Detailed Review & Craft Comments *'}
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={
                          language === 'vi'
                            ? 'Chia sẻ chân thực về chất lượng sản phẩm thủ công, độ hoàn thiện, màu men/chất vải, cách đóng gói hoặc sự nhiệt tình của nghệ nhân...'
                            : 'Share your genuine impressions about product craftsmanship, finishes, packaging, or artisan care...'
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#C6C8BC] bg-white text-xs text-[#1B1C19] focus:outline-none focus:border-[#8C6239] resize-none"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsWritingReview(false)}
                        className="px-4 py-2 text-xs font-semibold text-[#55584E] hover:text-[#1B1C19]"
                      >
                        {language === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="px-6 py-2.5 bg-[#2B381C] hover:bg-[#384527] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5 text-[#F8C696]" />
                        <span>
                          {isSubmittingReview
                            ? (language === 'vi' ? 'Đang xác thực & đăng tải...' : 'Submitting...')
                            : (language === 'vi' ? 'Xác thực & Gửi đánh giá' : 'Verify & Submit Review')}
                        </span>
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-3.5">
                {localReviews.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-[#E4E2DD] text-center text-xs text-[#6E7265]">
                    {language === 'vi' 
                      ? 'Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên để lại đánh giá sau mua hàng!' 
                      : 'No reviews yet. Be the first verified buyer to leave a review!'}
                  </div>
                ) : (
                  localReviews.map((rev) => (
                    <div 
                      key={rev.id}
                      className="bg-white rounded-xl p-4 sm:p-5 border border-[#E4E2DD] shadow-xs space-y-2.5"
                    >
                      {/* Review Item Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#2B381C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                            {rev.reviewerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-heading font-bold text-xs sm:text-sm text-[#1B1C19]">
                                {rev.reviewerName}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#EAF0E2] text-[#2B381C] font-semibold border border-[#D5E2C8]">
                                <CheckCircle2 className="w-3 h-3 text-[#4F5D3D]" />
                                {language === 'vi' ? 'Đã xác thực qua SĐT' : 'Verified Buyer'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-[#6E7265] mt-0.5">
                              <span>SĐT: {rev.reviewerPhone}</span>
                              <span>•</span>
                              <span>{rev.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 text-[#E59819] shrink-0">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-[#E59819] text-[#E59819]' : 'text-[#D5D0C6]'}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      {rev.tags && rev.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {rev.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 rounded bg-[#F4F1EA] text-[#6E7265] text-[10px] font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Comment Body */}
                      <p className="text-xs text-[#33352E] leading-relaxed [text-wrap:pretty]">
                        {rev.comment}
                      </p>

                      {/* Artisan Response (if present) */}
                      {rev.artisanResponse && (
                        <div className="bg-[#FAF9F5] p-3 rounded-lg border-l-2 border-[#8C6239] text-xs text-[#55584E] space-y-1">
                          <div className="font-bold text-[#8C6239] flex items-center gap-1.5 text-[11px]">
                            <Sparkles className="w-3 h-3" />
                            <span>{language === 'vi' ? 'Phản hồi từ Nghệ nhân:' : 'Artisan Response:'}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed italic">
                            "{rev.artisanResponse}"
                          </p>
                        </div>
                      )}

                      {/* Helpful Button */}
                      <div className="pt-1 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setHelpfulClicked({ ...helpfulClicked, [rev.id]: !helpfulClicked[rev.id] });
                            if (!helpfulClicked[rev.id]) {
                              onToast(language === 'vi' ? 'Cảm ơn bạn đã bình chọn đánh giá hữu ích!' : 'Thank you for your feedback!');
                            }
                          }}
                          className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded transition-colors ${
                            helpfulClicked[rev.id]
                              ? 'bg-[#EBF2E4] text-[#2B381C] font-semibold'
                              : 'text-[#6E7265] hover:text-[#1B1C19] hover:bg-[#F0EEE9]'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{language === 'vi' ? 'Hữu ích' : 'Helpful'}</span>
                          {helpfulClicked[rev.id] && <span className="font-bold">+1</span>}
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 3: Story & Craftsmanship */}
          {activeTab === 'story' && (
            <div className="space-y-4 text-xs text-[#45483F] leading-relaxed">
              <div className="bg-white p-4 rounded-xl border border-[#E4E2DD] space-y-2">
                <div className="font-bold text-sm text-[#1B1C19] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#8C6239]" />
                  {language === 'vi' ? 'Hành trình giữ lửa & Tuyên ngôn làng nghề' : 'Craft Heritage & Mission'}
                </div>
                <p>
                  {product.artisanBio || product.description}
                </p>
              </div>

              {product.craftProcess && (
                <div className="bg-white p-4 rounded-xl border border-[#E4E2DD] space-y-2">
                  <div className="font-bold text-sm text-[#1B1C19] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#4F5D3D]" />
                    {language === 'vi' ? 'Quy trình chế tác thủ công' : 'Handmade Process'}
                  </div>
                  <p className="font-mono text-[11px] bg-[#F7EFE8] p-2.5 rounded-lg border border-[#E8DEC8] text-[#8C6239]">
                    {product.craftProcess}
                  </p>
                </div>
              )}

              {product.heritageCertification && (
                <div className="p-3 rounded-xl bg-[#FCEBE6] border border-[#F5C7BC] text-[#C0573E] flex items-center gap-2 font-medium">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>{product.heritageCertification}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Direct Bank Payment Info */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-[#E4E2DD] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E4E2DD] pb-2">
                  <div className="font-bold text-xs uppercase text-[#6E7265] tracking-wider">
                    {language === 'vi' ? 'Tài khoản Ngân hàng Nghệ nhân' : 'Artisan Bank Account'}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#EAF0E2] text-[#2B381C] font-semibold">
                    {language === 'vi' ? 'Chính chủ đã xác minh' : 'Verified Account'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#6E7265] block">{language === 'vi' ? 'Ngân hàng:' : 'Bank:'}</span>
                    <strong className="text-[#1B1C19] text-sm">
                      {product.bankInfo?.bankName || 'Vietcombank - CN Thăng Long'}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between bg-[#F0EEE9] p-3 rounded-lg border border-[#E4E2DD]">
                    <div>
                      <span className="text-[10px] text-[#6E7265] block">{language === 'vi' ? 'Số tài khoản:' : 'Account Number:'}</span>
                      <strong className="font-mono text-base text-[#C0573E] tracking-wider">
                        {product.bankInfo?.accountNumber || '1023889966'}
                      </strong>
                    </div>
                    <button
                      onClick={() => copyToClipboard(product.bankInfo?.accountNumber || '1023889966', 'bank')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF9F5] text-[#1B1C19] font-medium text-xs border border-[#D5D3CE] shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      {copiedBank ? <Check className="w-3.5 h-3.5 text-[#4F5D3D]" /> : <Copy className="w-3.5 h-3.5 text-[#6E7265]" />}
                      <span>{copiedBank ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép STK' : 'Copy STK')}</span>
                    </button>
                  </div>

                  <div>
                    <span className="text-[#6E7265] block">{language === 'vi' ? 'Chủ tài khoản:' : 'Account Holder:'}</span>
                    <strong className="text-[#1B1C19] uppercase tracking-wide">
                      {product.bankInfo?.accountHolder || product.artisanName}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#6E7265] italic leading-relaxed text-center px-4">
                * {language === 'vi' 
                    ? 'Quý khách vui lòng ghi rõ nội dung chuyển khoản: [Tên Quý khách] + [Mã SP/Tên SP] và gửi ảnh biên lai qua Zalo/Messenger cho nghệ nhân.' 
                    : 'Please include your Name and Product Title in the payment memo, then forward the receipt to the artisan via Zalo/Messenger.'}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#F0EEE9] px-6 py-4 border-t border-[#E4E2DD] flex items-center justify-between">
          <div className="text-xs text-[#6E7265]">
            {language === 'vi' ? 'Bảo trợ bởi Nền tảng Di sản Văn hóa Việt Nam' : 'Supported by Vietnam Cultural Heritage Platform'}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2B381C] hover:bg-[#1B1C19] text-[#FAF9F5] text-xs font-semibold transition-colors"
          >
            {language === 'vi' ? 'Đóng cửa sổ' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
