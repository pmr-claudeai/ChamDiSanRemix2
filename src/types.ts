/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenTab = 'about' | 'archive' | 'stories' | 'marketplace' | 'contributions';

export type Language = 'vi' | 'en';

/**
 * Interfaces for Heritage Knowledge Graph (Nodes & Edges)
 */
export type NodeType = 
  | 'tangible'        // Di sản vật thể (đền, chùa, lăng tẩm, hoàng thành)
  | 'intangible'      // Di sản phi vật thể (hát xoan, nhã nhạc, ca trù)
  | 'craft_village'   // Làng nghề truyền thống (gốm Bát Tràng, lụa Vạn Phúc, đúc đồng)
  | 'digitalization'  // Dự án số hóa 3D / VR / AI
  | 'artisan'         // Nghệ nhân nhân dân / Nghệ nhân ưu tú
  | 'unesco_record';  // Danh hiệu / Hồ sơ UNESCO

export interface HeritageNode {
  id: string;
  name: string;
  nameEn: string;
  type: NodeType;
  category: string;
  location: string;
  region: 'Bắc' | 'Trung' | 'Nam';
  yearListed?: string;
  summary: string;
  summaryEn: string;
  description: string;
  imageUrl: string;
  coordinates: {
    x: number; // For interactive visual graph layout (0-100%)
    y: number; // For interactive visual graph layout (0-100%)
    lat?: number;
    lng?: number;
  };
  metrics?: {
    views?: number;
    archivesCount?: number;
    digitalAssets?: number;
    status: 'active' | 'preserving' | 'endangered' | 'completed';
  };
  tags: string[];
}

export type EdgeType = 
  | 'belongs_to'     // Thuộc về (e.g. Ca trù thuộc Di sản phi vật thể)
  | 'practiced_by'   // Được thực hành bởi nghệ nhân
  | 'digitalized_in' // Được số hóa trong dự án
  | 'located_at'     // Nằm tại địa phương
  | 'shares_origin'  // Có chung cội nguồn văn hóa
  | 'unesco_listed'; // Được UNESCO công nhận

export interface HeritageEdge {
  id: string;
  source: string;       // Node ID
  target: string;       // Node ID
  relation: string;     // Vietnamese label (e.g., "Nghệ nhân truyền dạy", "Đã số hóa 3D")
  relationEn: string;   // English label
  type: EdgeType;
  weight?: number;      // Strength of connection (1-5)
  description?: string;
}

export interface HeritageKnowledgeGraph {
  nodes: HeritageNode[];
  edges: HeritageEdge[];
}

/**
 * Focus Areas (Lĩnh Vực Trọng Điểm)
 */
export interface FocusArea {
  id: string;
  title: string;
  titleEn: string;
  badge?: string;
  badgeEn?: string;
  description: string;
  descriptionEn: string;
  imageUrl: string;
  itemCount: number;
  projects: string[];
  features: string[];
}

/**
 * Testimonial Quotes (Hành Trình Giữ Lửa)
 */
export interface HeritageQuote {
  id: string;
  title: string;
  titleEn: string;
  quote: string;
  quoteEn: string;
  author: string;
  role: string;
  location: string;
  storyId: string;
  avatarUrl?: string;
}

/**
 * Heritage Archive Documents (Tin tức & Lưu trữ)
 */
export type DocumentCategory = 
  | 'all'
  | 'impact_report'     // Báo cáo tác động
  | 'unesco_dossier'    // Hồ sơ đệ trình
  | 'workshop'          // Hội thảo
  | 'strategic_plan'    // Kế hoạch chiến lược
  | 'health_wellbeing'; // Sức khoẻ & An sinh

export interface ArchiveDocument {
  id: string;
  tag: string;
  tagEn: string;
  tagColor?: string;
  date: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  language: 'VIE' | 'ENG' | 'DUAL';
  category: DocumentCategory;
  downloadUrl: string;
  fileSize: string;
  fileFormat: 'PDF' | 'DOCX' | 'ZIP';
  downloadCount: number;
  featured?: boolean;
  author: string;
  pages?: number;
  tableOfContents?: string[];
}

/**
 * Stories (Chuyện Nghề, Chuyện Người)
 */
export interface HeritageStory {
  id: string;
  tag: string;
  tagEn: string;
  title: string;
  titleEn: string;
  highlightQuote: string;
  highlightQuoteEn: string;
  summary: string;
  summaryEn: string;
  fullStory: string[];
  fullStoryEn: string[];
  imageUrl: string;
  secondaryImages?: string[];
  artisanName: string;
  artisanTitle: string;
  location: string;
  readTime: string;
  date: string;
  isFeatured?: boolean;
}

/**
 * Newsletter & Contact
 */
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  organization?: string;
  message: string;
}

/**
 * Direct-to-Consumer Craft & Regional Specialties Marketplace (Giao thương phi trung gian)
 */
export type CraftCategory = 
  | 'all'
  | 'brocade_silk'       // Thổ cẩm & Dệt tơ
  | 'bamboo_rattan'      // Mây tre đan
  | 'ceramics_tools'     // Gốm sứ & Dụng cụ
  | 'indigenous_agro';   // Nông sản bản địa

export type RegionFilter = 
  | 'all'
  | 'north'              // Miền Bắc
  | 'northwest'          // Vùng cao Tây Bắc
  | 'central'            // Miền Trung
  | 'highlands'          // Tây Nguyên
  | 'south';             // Miền Nam

export interface ArtisanProfile {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  titleEn: string;
  ethnicGroup: string;
  villageLocation: string;
  experienceYears: number;
  bio: string;
  bioEn: string;
  specialties: string[];
  phone: string;
  zalo?: string;
  messenger?: string;
  sms?: string;
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  sellerIdentityVerified: boolean;
  certificationTitle?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  reviewerName: string;
  reviewerPhone: string;
  verifiedPurchase: boolean;
  rating: number;
  date: string;
  comment: string;
  tags?: string[];
  artisanResponse?: string;
}

export interface CraftProduct {
  id: string;
  name: string;
  nameEn: string;
  category: CraftCategory;
  categoryLabel: string;
  categoryLabelEn: string;
  price: number;
  priceFormatted: string;
  artisanName: string;
  artisanTitle?: string;
  artisanAvatar?: string;
  artisanBio?: string;
  artisanBioEn?: string;
  artisanExperienceYears?: number;
  ethnicGroup?: string;
  location: string;
  region: RegionFilter;
  regionLabel: string;
  regionLabelEn: string;
  imageUrl: string;
  secondaryImages?: string[];
  description: string;
  descriptionEn: string;
  craftProcess?: string;
  materials?: string[];
  phone: string;
  zalo?: string;
  messenger?: string;
  sms?: string;
  bankInfo?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  sellerIdentityVerified?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  heritageCertification?: string;
  rating?: number;
  reviews?: ProductReview[];
}

/**
 * Heritage Contribution & Moderation System (Phân hệ Đóng góp & Kiểm duyệt)
 */
export type ContributorRole = 'researcher' | 'student' | 'community' | 'artisan';

export type ContributionCategory = 
  | 'intangible' 
  | 'tangible' 
  | 'craft_village' 
  | 'oral_history' 
  | 'audio_folklore' 
  | 'artisan_profile';

export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'revision_requested';

export interface AudioRecordingData {
  title: string;
  duration: string;
  fileSize: string;
  performer?: string;
  recordingLocation?: string;
  recordingDate?: string;
  genre: string; // e.g. "Hát Then", "Hát Xẩm", "Cồng Chiêng", "Hát Xoan", "Diễn xướng dân gian", "Thu âm điền dã"
  audioUrl?: string;
}

export interface AttachedFileData {
  fileName: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'MP3' | 'WAV' | 'ZIP' | 'IMAGE';
  url?: string;
}

export interface HeritageContribution {
  id: string;
  title: string;
  titleEn: string;
  contributorName: string;
  contributorRole: ContributorRole;
  contributorRoleLabel: string;
  contributorEmail: string;
  contributorPhone?: string;
  contributorOrg?: string; // e.g. "Viện Văn hóa Nghệ thuật Quốc gia", "ĐH Khoa học Xã hội & Nhân văn"
  category: ContributionCategory;
  categoryLabel: string;
  categoryLabelEn: string;
  location: string;
  region: RegionFilter;
  coordinates?: {
    x: number;
    y: number;
  };
  summary: string;
  fullTextContent?: string;
  audioRecording?: AudioRecordingData;
  attachedFiles?: AttachedFileData[];
  attachedImages?: string[];
  submittedAt: string;
  status: ModerationStatus;
  moderatorNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  targetRelatedNodeId?: string; // Node ID in Knowledge Graph to link
}


