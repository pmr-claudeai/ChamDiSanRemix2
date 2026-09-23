/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  FocusArea, 
  HeritageQuote, 
  ArchiveDocument, 
  HeritageStory, 
  HeritageKnowledgeGraph 
} from '../types';

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'tangible',
    title: 'Di sản Vật thể',
    titleEn: 'Tangible Heritage',
    badge: 'Gìn giữ & Phát triển',
    badgeEn: 'Preserve & Develop',
    description: 'Bảo tồn kiến trúc cổ, đình chùa, lăng tẩm và các di chỉ khảo cổ học.',
    descriptionEn: 'Preserving ancient architecture, communal houses, pagodas, royal tombs and archaeological sites.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    itemCount: 142,
    projects: ['Tu bổ Quần thể di tích Cố đô Huế', 'Khai quật khảo cổ Hoàng thành Thăng Long', 'Phục dựng Tháp Chàm Mỹ Sơn'],
    features: ['Giám sát biến dạng kiến trúc', 'Lập bản đồ 3D khảo cổ', 'Kế hoạch chống xuống cấp']
  },
  {
    id: 'digital',
    title: 'Số hóa Di sản',
    titleEn: 'Heritage Digitalization',
    badge: 'Công nghệ 4.0',
    badgeEn: 'Tech 4.0',
    description: 'Ứng dụng 3D Laser Scanning, thực tế ảo VR/AR và AI tái tạo không gian di sản nghìn năm.',
    descriptionEn: 'Applying 3D Laser Scanning, VR/AR and AI to recreate millenia of heritage spaces.',
    imageUrl: 'https://hnm.1cdn.vn/2026/05/23/31c3a9ba16/t5-du-lich.jpg',
    itemCount: 88,
    projects: ['Bản đồ số Đình làng Bắc Bộ', 'Bảo tàng ảo Mỹ thuật Cung đình Huế', 'AR Tương tác Văn Miếu Quốc Tử Giám'],
    features: ['Mô hình 3D độ phân giải siêu cao', 'Tour tham quan thực tế ảo 360', 'Thư viện tư liệu mở']
  },
  {
    id: 'intangible',
    title: 'Di sản Phi vật thể',
    titleEn: 'Intangible Heritage',
    badge: 'Hồn cốt dân tộc',
    badgeEn: 'Soul of Nation',
    description: 'Lưu truyền nhã nhạc, ca trù, quan họ, hát xoan và các nghi lễ văn hóa dân gian.',
    descriptionEn: 'Transmitting court music, ca tru, quan ho, xoan singing and folk cultural rituals.',
    imageUrl: 'https://bcp.cdnchinhphu.vn/Uploaded/duongphuonglien/2017_01_23/images1751702_nha_nhac_cung_dinh_Hue.jpg',
    itemCount: 65,
    projects: ['Truyền dạy Hát Xoan học đường', 'Tư liệu hóa Nhã nhạc Cung đình Huế', 'Không gian Văn hóa Cồng chiêng'],
    features: ['Kho âm thanh nguyên bản 96kHz', 'Ghi hình vũ đạo nghệ nhân gạo cội', 'Trợ cấp đào tạo thế hệ trẻ']
  },
  {
    id: 'craft_village',
    title: 'Làng nghề Truyền thống',
    titleEn: 'Traditional Craft Villages',
    badge: 'Bền vững & Sinh kế',
    badgeEn: 'Sustainable Crafts',
    description: 'Hỗ trợ nghệ nhân và phát triển bền vững các làng nghề thủ công.',
    descriptionEn: 'Supporting master artisans and fostering sustainable craft village ecosystems.',
    imageUrl: 'https://imgnvsk.vnanet.vn/MediaUpload/Content/2025/02/17/6333-compressed17-11-30-23.jpg',
    itemCount: 94,
    projects: ['Bảo tồn Gốm Bàu Trúc Chăm', 'Lụa Vạn Phúc - Tơ tằm tự nhiên', 'Nhang trầm Quảng Phú Cầu'],
    features: ['Chuỗi cung ứng minh bạch', 'Tập huấn số hóa kinh doanh cho nghệ nhân', 'Chứng nhận di sản bền vững']
  }
];

export const HERITAGE_QUOTES: HeritageQuote[] = [
  {
    id: 'q1',
    title: 'Tiếng thoi đưa không tắt',
    titleEn: 'The Loom Shuttle Never Ceases',
    quote: '"Mong mỏi lớn nhất của đời tôi là truyền lại được kỹ thuật dệt lụa vân thủ công này cho thế hệ trẻ, để tiếng thoi đưa không bao giờ tắt."',
    quoteEn: '"My greatest lifetime wish is passing down this artisanal jacquard weaving craft to youth, keeping the loom shuttle singing forever."',
    author: 'Nghệ nhân Triệu Văn Mão',
    role: 'Nghệ nhân Nhân dân Làng lụa Vạn Phúc',
    location: 'Hà Nội',
    storyId: 'story-van-phuc'
  },
  {
    id: 'q2',
    title: 'Chạm vào quá khứ qua không gian số',
    titleEn: 'Touching the Past via Digital Space',
    quote: '"Nhờ dự án số hóa và công nghệ thực tế ảo, giờ đây bất kỳ ai, dù ở đâu trên thế giới, cũng có thể bước vào và chiêm ngưỡng vẻ đẹp uy nghi của ngôi đình làng đầu cách xa hàng ngàn cây số."',
    quoteEn: '"Thanks to 3D scanning and VR, anyone anywhere across the globe can step inside and marvel at ancient village shrines thousands of miles away."',
    author: 'TS. Nguyễn Anh Tuấn',
    role: 'Trưởng nhóm Nghiên cứu Số hóa Di sản CDS',
    location: 'Viện Công nghệ & Văn hóa',
    storyId: 'story-so-hoa'
  },
  {
    id: 'q3',
    title: 'Nhịp phách của thế hệ nối tiếp',
    titleEn: 'Rhythm of the Next Generation',
    quote: '"Từng có thời điểm những làn điệu cổ tưởng chừng như rơi vào tuyệt lộ. Nhưng ngày nay, khi nhìn thấy các em nhỏ say sưa gõ phách, luyện lấy từng câu hát Xoan, tôi biết rằng hồn cốt của cha ông đã bám rễ và sẽ lại vươn chồi."',
    quoteEn: '"There was a time when ancient melodies seemed on the brink of vanishing. Today, seeing young children drum clappers and practice Xoan chants with devotion, I know our ancestors\' soul has rooted deep and will bloom anew."',
    author: 'Trùm phường Xoan Nguyễn Thị Lịch',
    role: 'Trùm phường Xoan An Thái',
    location: 'Phú Thọ',
    storyId: 'story-hat-xoan'
  }
];

export const ARCHIVE_DOCUMENTS: ArchiveDocument[] = [
  {
    id: 'doc-1',
    tag: 'Về CDS',
    tagEn: 'About CDS',
    date: '19/10/2025',
    title: 'Hồ sơ đệ trình UNESCO',
    titleEn: 'UNESCO Inscription Dossier',
    description: 'Tài liệu chi tiết về nghệ thuật Làm gốm của người Chăm.',
    descriptionEn: 'Comprehensive scientific dossier on the Art of Pottery-making of Chăm people.',
    language: 'VIE',
    category: 'unesco_dossier',
    downloadUrl: '#',
    fileSize: '14.8 MB',
    fileFormat: 'PDF',
    downloadCount: 1420,
    featured: true,
    author: 'Hội đồng Khoa học Di sản Quốc gia & CDS',
    pages: 184,
    tableOfContents: [
      '1. Bối cảnh lịch sử và giá trị đặc sắc của gốm Bàu Trúc',
      '2. Kỹ thuật tạo hình không bàn xoay độc bản',
      '3. Nghi lễ tâm linh và vai trò của người phụ nữ Chăm',
      '4. Kế hoạch bảo vệ khẩn cấp và cam kết cộng đồng'
    ]
  },
  {
    id: 'doc-2',
    tag: 'Về CDS',
    tagEn: 'About CDS',
    date: '12/11/2024',
    title: 'Báo cáo hiện trạng Di sản 2024',
    titleEn: 'State of Heritage Report 2024',
    description: 'Đánh giá chi tiết kết quả thực hiện các chương trình bảo tồn, phát huy và lan tỏa hiểu biết về Di sản Việt Nam trong năm bản lề 2024.',
    descriptionEn: 'Detailed evaluation of preservation initiatives, empowerment programs and heritage awareness dissemination in Vietnam in 2024.',
    language: 'VIE',
    category: 'impact_report',
    downloadUrl: '#',
    fileSize: '8.4 MB',
    fileFormat: 'PDF',
    downloadCount: 3105,
    featured: true,
    author: 'Ban Điều hành Dự án Chạm Di Sản',
    pages: 120,
    tableOfContents: [
      'I. Tổng quan môi trường di sản 2024',
      'II. 24 Dự án trọng điểm đã hoàn tất số hóa',
      'III. Hỗ trợ kinh tế cho 1.200 hộ nghệ nhân',
      'IV. Định hướng chiến lược 2025 - 2030'
    ]
  },
  {
    id: 'doc-3',
    tag: 'Chiến lược',
    tagEn: 'Strategy',
    date: '01/07/2024',
    title: 'Kỷ yếu Hội thảo Văn hóa 2024',
    titleEn: 'Cultural Conference Proceedings 2024',
    description: 'Tập hợp các tham luận về chiến lược bảo tồn Không gian văn hóa cồng chiêng Tây Nguyên.',
    descriptionEn: 'Compilation of keynote papers on preserving the Space of Gong Culture in Central Highlands.',
    language: 'VIE',
    category: 'workshop',
    downloadUrl: '#',
    fileSize: '22.1 MB',
    fileFormat: 'PDF',
    downloadCount: 980,
    author: 'Viện Văn hóa Nghệ thuật Quốc gia & CDS',
    pages: 312,
    tableOfContents: [
      '1. Không gian cồng chiêng trong đời sống mẫu hệ Ê-đê, Gia-rai',
      '2. Thách thức từ làn sóng hiện đại hóa nông thôn',
      '3. Ứng dụng âm học đa kênh trong lưu trữ thang âm cồng chiêng'
    ]
  },
  {
    id: 'doc-4',
    tag: 'Khác',
    tagEn: 'Other',
    date: '15/11/2023',
    title: 'Báo cáo Hiện trạng Di sản 2023',
    titleEn: 'State of Heritage Report 2023',
    description: 'Báo cáo toàn diện về các hoạt động và đánh giá tổng quan về công tác tu bổ các di tích cấp Quốc gia trong năm vừa qua.',
    descriptionEn: 'Comprehensive review of national monument restoration projects and artisan welfare in 2023.',
    language: 'VIE',
    category: 'health_wellbeing',
    downloadUrl: '#',
    fileSize: '11.5 MB',
    fileFormat: 'PDF',
    downloadCount: 2240,
    author: 'Trung tâm Hỗ trợ Sáng kiến Phát triển Cộng đồng',
    pages: 96,
    tableOfContents: [
      '1. Khảo sát sức khỏe nghề nghiệp nghệ nhân dệt & sơn mài',
      '2. Quỹ an sinh nghệ nhân cao tuổi',
      '3. Báo cáo đánh giá vật liệu trùng tu thân thiện môi trường'
    ]
  },
  {
    id: 'doc-5',
    tag: 'Hồ sơ đệ trình',
    tagEn: 'Dossier',
    date: '08/04/2024',
    title: 'Hồ sơ Di sản Tranh dân gian Đông Hồ',
    titleEn: 'Dong Ho Folk Woodblock Prints Dossier',
    description: 'Nghiên cứu kỹ thuật in mộc bản trên giấy điệp tự nhiên và giải pháp hồi sinh tranh cổ.',
    descriptionEn: 'Research on woodblock printing on natural scallop shell paper and revival strategies.',
    language: 'VIE',
    category: 'unesco_dossier',
    downloadUrl: '#',
    fileSize: '16.2 MB',
    fileFormat: 'PDF',
    downloadCount: 1670,
    author: 'CLB Nghệ nhân Đông Hồ & CDS',
    pages: 142
  },
  {
    id: 'doc-6',
    tag: 'Kế hoạch chiến lược',
    tagEn: 'Strategic Plan',
    date: '20/01/2025',
    title: 'Chiến lược Số hóa Di sản Quốc gia 2025 - 2030',
    titleEn: 'National Heritage Digitalization Strategy 2025-2030',
    description: 'Khung kiến trúc dữ liệu và chuẩn mở cho 3D scanning các bảo vật hoàng cung Việt Nam.',
    descriptionEn: 'Data architecture framework and open standards for 3D scanning royal treasures.',
    language: 'VIE',
    category: 'strategic_plan',
    downloadUrl: '#',
    fileSize: '5.9 MB',
    fileFormat: 'PDF',
    downloadCount: 4200,
    author: 'Ban Chỉ đạo Chuyển đổi số Di sản',
    pages: 80
  }
];

export const HERITAGE_STORIES: HeritageStory[] = [
  {
    id: 'story-tho-cam',
    tag: 'Trẻ em và thanh niên',
    tagEn: 'Youth & Children',
    title: 'Người giữ hồn thổ cẩm vùng cao',
    titleEn: 'Guardian of Highland Brocade Soul',
    highlightQuote: '"Nhưng đứa trẻ thì có tội tình gì đâu. Sinh ra trong thiệt thòi, các em đâu có quyền được lựa chọn. Điều đó khiến tôi càng quyết tâm hơn, giúp được đứa nào, tôi cũng sẽ cố gắng hết sức."',
    highlightQuoteEn: '"Children are blameless. Born into hardship, they had no choice. That only cements my resolve: wherever I can help a child, I will pour out my heart."',
    summary: 'Trong nhịp sống hiện đại hối hả, bà Vi Thị Hùng vẫn kiên nhẫn bên khung cửi, tỉ mỉ với từng sợi tơ, nhuộm từng lớp chàm để giữ lại tinh hoa dệt thổ cẩm truyền thống của dân tộc mình.',
    summaryEn: 'Amidst modern haste, artisan Vi Thi Hung patiently tends her wooden loom, meticulously threading natural silk and indigo dye to preserve the soul of ethnic brocade.',
    fullStory: [
      'Trên rẻo cao mây mù phủ kín của dãy Hoàng Liên Sơn, tiếng lách cách của thoi đưa trên khung cửi gỗ đã trở thành nhịp thở quen thuộc suốt hơn nửa thế kỷ qua của bà Vi Thị Hùng. Ở tuổi ngoài 60, đôi bàn tay nhuốm màu chàm xanh biếc của bà chưa từng một ngày ngơi nghỉ.',
      'Không chỉ dệt nên những tấm thổ cẩm với hoa văn hình học cổ truyền chứa đựng vũ trụ quan của người Tày và người Thái, bà còn mở một lớp truyền dạy miễn phí cho hàng chục trẻ em mồ côi và phụ nữ có hoàn cảnh khó khăn tại bản.',
      '"Có những hoa văn ngọn rau dớn, con bướm rừng, mắt rồng... nếu không dạy lại, chỉ mươi năm nữa là người ta quên hết, chỉ còn mua vải in máy rẻ tiền từ bên kia biên giới. Mỗi đứa trẻ biết cầm thoi đưa là một mầm xanh di sản được cứu sống," bà Hùng rưng rưng chia sẻ.',
      'Dự án Chạm Di Sản đã đồng hành cùng cơ sở của bà Hùng, đưa sản phẩm thổ cẩm thủ công đạt chuẩn OCOP 5 sao, kết nối trực tiếp với các sàn thời trang bền vững quốc tế tại Tokyo và Paris, tạo thu nhập ổn định cho hơn 40 hộ gia đình vùng cao.'
    ],
    fullStoryEn: [
      'In the mist-veiled peaks of the Hoang Lien Son range, the rhythmic click-clack of wooden shuttles has been artisan Vi Thi Hung’s heartbeat for over five decades.',
      'Beyond weaving intricate geometric patterns representing Tay and Thai cosmologies, she opened a tuition-free workshop for dozens of orphan children and disadvantaged women in her village.',
      '"Patterns like forest ferns, butterflies, and dragon eyes—if not taught, will vanish in a decade to cheap printed polyester. Every child learning the loom is a living seedling of our culture," she reflects.',
      'Chạm Di Sản partnered with her collective, elevating handwoven brocades to international sustainable design platforms in Tokyo and Paris while securing stable livelihoods for 40 highland families.'
    ],
    imageUrl: 'https://vstatic.vietnam.vn/vietnam/happy/2025/THUMP_PHOTO/2025/09/30/2025_THUMP_PHOTO_19448_315e5c1cc6884ce2a83ffde9b4d94263_chan-dung-thieu-nu-vung-cao.jpeg',
    secondaryImages: [
      'https://vstatic.vietnam.vn/vietnam/happy/2025/THUMP_PHOTO/2025/09/30/2025_THUMP_PHOTO_19448_315e5c1cc6884ce2a83ffde9b4d94263_chan-dung-thieu-nu-vung-cao.jpeg',
      'https://vstatic.vietnam.vn/vietnam/happy/2025/THUMP_PHOTO/2025/09/30/2025_THUMP_PHOTO_19448_315e5c1cc6884ce2a83ffde9b4d94263_chan-dung-thieu-nu-vung-cao.jpeg'
    ],
    artisanName: 'Bà Vi Thị Hùng',
    artisanTitle: 'Nghệ nhân Ưu tú Dệt Thổ cẩm',
    location: 'Bản Lác, Mai Châu, Hòa Bình',
    readTime: '6 phút đọc',
    date: '20/02/2026',
    isFeatured: true
  },
  {
    id: 'story-roi-nuoc',
    tag: 'Nghệ thuật Dân gian',
    tagEn: 'Folk Performance',
    title: 'Phục dựng múa rối nước tại làng Chàng Sơn',
    titleEn: 'Reviving Water Puppetry in Chang Son Village',
    highlightQuote: '"Hành trình gian nan tìm lại những tích trò cổ."',
    highlightQuoteEn: '"An arduous journey rediscovering centuries-old lost puppet tales."',
    summary: 'Những con rối gỗ sung ngâm bùn, những tích trò tưởng chừng mai một nay sống dậy bên hồ nước đình làng.',
    summaryEn: 'Fig-wood puppets steeped in mud and long-lost theatrical scripts come alive once more across ancient village ponds.',
    fullStory: [
      'Làng Chàng Sơn nổi tiếng với nghề đục chạm gỗ tinh xảo từ thế kỷ 18. Nghệ nhân Nguyễn Văn Ba cùng nhóm bạn trẻ đã dành 4 năm lặn lội qua các chùa cổ, ghi chép lại từng tích trò múa rối nước đã thất truyền như Đánh đu, Múa rồng phun lửa.',
      'Nhờ nguồn quỹ bảo tồn cộng đồng của CDS, thủy đình Chàng Sơn được tu bổ, đón hàng trăm lượt học sinh mỗi dịp cuối tuần.'
    ],
    fullStoryEn: [
      'Famed for intricate wood carving since the 18th century, Chang Son artisans spent 4 years documenting forgotten scripts.',
      'With CDS preservation grants, the village aquatic pavilion now hosts hundreds of students weekly.'
    ],
    imageUrl: 'https://vnp.1cdn.vn/2023/01/11/3.-anh-muc-tu-phuong-roi-truyen-thong.jpg',
    artisanName: 'Nghệ nhân Nguyễn Văn Ba',
    artisanTitle: 'Nghệ nhân Tạo tác Quân Rối',
    location: 'Thạch Thất, Hà Nội',
    readTime: '4 phút đọc',
    date: '14/02/2026'
  },
  {
    id: 'story-co-phuc',
    tag: 'Thế hệ trẻ & Bản sắc',
    tagEn: 'Gen Z & Identity',
    title: 'Gen Z và tình yêu Cổ phục Việt',
    titleEn: 'Gen Z and the Passion for Vietnamese Historical Attire',
    highlightQuote: '"Khi người trẻ khoác lên mình chiếc áo Nhật Bình với niềm tự hào."',
    highlightQuoteEn: '"When the youth wear the regal Nhat Binh robe with unyielding pride."',
    summary: 'Một làn sóng phục dựng và ứng dụng trang phục truyền thống triều Nguyễn vào đời sống đương đại.',
    summaryEn: 'A vibrant wave of researching and wearing authentic Nguyen dynasty court and civilian robes in contemporary daily life.',
    fullStory: [
      'Không chỉ là trào lưu chụp ảnh, nhóm bạn trẻ Đại Việt Cổ Phong đã phối hợp cùng các nhà nghiên cứu lịch sử để phục chế chính xác từng hoa văn thêu tay, chất liệu lụa tơ tằm, cúc ngọc trên áo Nhật Bình và áo Tấc.',
      'Sự lan tỏa mạnh mẽ trên các mạng xã hội đã biến cổ phục thành biểu tượng tự hào của thanh niên Việt Nam trong các dịp lễ tốt nghiệp, cưới hỏi và giao lưu quốc tế.'
    ],
    fullStoryEn: [
      'Far beyond photo trends, youth researchers partnered with historians to accurately reconstruct imperial embroidery, silk weaves, and jade buttons.',
      'Now historical attire has become a badge of honor for graduations, weddings, and cultural exchanges.'
    ],
    imageUrl: 'https://vcdn1-giaitri.vnecdn.net/2025/04/07/233A1718-1744005312.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=aC3vU2CmiwXzeyhkT3rkOw',
    artisanName: 'Nhóm Nghiên cứu Cổ phục Trẻ',
    artisanTitle: 'Sáng lập viên Dự án Cổ Phong',
    location: 'Hà Nội & TP. Hồ Chí Minh',
    readTime: '5 phút đọc',
    date: '28/01/2026'
  },
  {
    id: 'story-don-ca-tai-tu',
    tag: 'Di sản & Du lịch',
    tagEn: 'Heritage & Eco-Tourism',
    title: 'Đờn ca tài tử giữa miệt vườn',
    titleEn: 'Don Ca Tai Tu Melodies Across River Orchards',
    highlightQuote: '"Đưa di sản phi vật thể vào du lịch sinh thái bền vững."',
    highlightQuoteEn: '"Integrating intangible musical heritage into sustainable eco-tourism."',
    summary: 'Tiếng đàn kìm, đàn tranh ngân vang trên những con thuyền ba lá dọc dòng sông Hậu hiền hòa.',
    summaryEn: 'Resonant moon lutes and zithers chime across wooden sampans meandering along the Hau River.',
    fullStory: [
      'Nghệ nhân Út Nhứt cùng câu lạc bộ đờn ca tài tử Cần Thơ đã kết hợp cùng các nông hộ làm vườn du lịch sinh thái, đưa âm nhạc tài tử thoát khỏi sân khấu kính để trở về đúng không gian miệt vườn phóng khoáng.',
      'Mỗi buổi biểu diễn là sự kết nối chân thành giữa người ca và du khách, nơi từng điệu Nam ai, Nam xuân kể về nghĩa tình đất phương Nam.'
    ],
    fullStoryEn: [
      'Artisan Ut Nhut and the Can Tho Tai Tu club united with local orchard keepers, taking music back to its open-air riverine cradle.',
      'Performances evoke deep emotional resonance between travelers and folk ballad masters.'
    ],
    imageUrl: 'https://amthucmientay.vn/storage/2025/10/DonCaTaiTu2.webp',
    artisanName: 'Nghệ nhân Út Nhứt',
    artisanTitle: 'Chủ nhiệm CLB Đờn Ca Miệt Vườn',
    location: 'Phong Điền, Cần Thơ',
    readTime: '5 phút đọc',
    date: '10/01/2026'
  }
];

/**
 * Rich Knowledge Graph Data (Nodes & Edges)
 * Defining complete relationships between Tangible, Intangible, Artisans, Craft Villages, Digital Assets and UNESCO recognitions.
 */
export const HERITAGE_GRAPH_DATA: HeritageKnowledgeGraph = {
  nodes: [
    {
      id: 'node-hoi-an',
      name: 'Đô thị cổ Hội An',
      nameEn: 'Hoi An Ancient Town',
      type: 'tangible',
      category: 'Kiến trúc & Đô thị cổ',
      location: 'Quảng Nam',
      region: 'Trung',
      yearListed: '1999',
      summary: 'Thương cảng quốc tế sầm uất thế kỷ 16-17 với sự giao thoa văn hóa Việt - Hoa - Nhật - phương Tây.',
      summaryEn: 'A bustling 16th-17th century trade port reflecting Vietnamese, Chinese, Japanese, and Western synthesis.',
      description: 'Hơn 1.000 di tích kiến trúc gồm nhà phố cổ, hội quán, chùa miếu, nhà thờ tộc còn nguyên vẹn kết cấu gỗ.',
      imageUrl: 'https://media.baovanhoa.vn/zoom/1000/uploaded/nghiemthanh/2025_06_06/chua_cau_sau_trung_tu_1_LLWE.jpg',
      coordinates: { x: 50, y: 55, lat: 15.8801, lng: 108.3380 },
      metrics: { views: 24500, archivesCount: 45, digitalAssets: 12, status: 'active' },
      tags: ['UNESCO', 'Kiến trúc gỗ', 'Thương cảng', 'Lồng đèn']
    },
    {
      id: 'node-my-son',
      name: 'Thánh địa Mỹ Sơn',
      nameEn: 'My Son Sanctuary',
      type: 'tangible',
      category: 'Quần thể Đền tháp Chăm',
      location: 'Quảng Nam',
      region: 'Trung',
      yearListed: '1999',
      summary: 'Trung tâm tôn giáo - chính trị của vương quốc Chămpa cổ đại với hơn 70 công trình đền tháp gạch nung.',
      summaryEn: 'Ancient religious & political heart of Champa kingdom featuring 70+ red brick tower temples.',
      description: 'Kỹ thuật nung và ghép gạch không dùng vữa độc nhất vô nhị vẫn là ẩn số khoa học hấp dẫn.',
      imageUrl: 'https://cdn3.ivivu.com/2023/11/Th%C3%A1nh-%C4%91%E1%BB%8Ba-M%E1%BB%B9-S%C6%A1n-ivivu-4.jpg',
      coordinates: { x: 42, y: 58, lat: 15.7958, lng: 108.1244 },
      metrics: { views: 18900, archivesCount: 68, digitalAssets: 24, status: 'preserving' },
      tags: ['UNESCO', 'Gạch nung Chăm', 'Tâm linh', 'Ấn Độ giáo']
    },
    {
      id: 'node-thang-long',
      name: 'Hoàng thành Thăng Long',
      nameEn: 'Imperial Citadel of Thang Long',
      type: 'tangible',
      category: 'Di tích Khảo cổ & Lịch sử',
      location: 'Hà Nội',
      region: 'Bắc',
      yearListed: '2010',
      summary: 'Trung tâm quyền lực chính trị liên tục suốt 13 thế kỷ qua các triều đại Lý, Trần, Lê, Mạc, Nguyễn.',
      summaryEn: 'Continuous imperial seat of power for 13 consecutive centuries across major dynasties.',
      description: 'Tầng văn hóa dày đặc phát lộ Đoan Môn, Điện Kính Thiên, Hậu Lâu và hàng vạn hiện vật gốm sứ hoàng cung.',
      imageUrl: 'https://dulich3mien.vn/wp-content/uploads/2021/12/1-37.jpg',
      coordinates: { x: 30, y: 22, lat: 21.0344, lng: 105.8402 },
      metrics: { views: 32100, archivesCount: 92, digitalAssets: 35, status: 'active' },
      tags: ['UNESCO', 'Kinh đô cổ', 'Khảo cổ', 'Điện Kính Thiên']
    },
    {
      id: 'node-ca-tru',
      name: 'Nghệ thuật Ca Trù',
      nameEn: 'Ca Tru Singing',
      type: 'intangible',
      category: 'Nghệ thuật Trình diễn Dân gian',
      location: 'Bắc Bộ & Bắc Trung Bộ',
      region: 'Bắc',
      yearListed: '2009',
      summary: 'Thể loại âm nhạc thính phòng độc đáo kết hợp đào nương hát gõ phách, kép đàn đáy và quan viên điểm trống chầu.',
      summaryEn: 'Intimate chamber music combining female clapper-singer, long lute, and praise drum.',
      description: 'Thơ ca bác học hòa quyện cùng nghệ thuật thanh nhạc đỉnh cao truyền khẩu qua các giáo phường.',
      imageUrl: 'https://bcec.vn/cdn/images/tin-tuc/ca-tru.jpg',
      coordinates: { x: 38, y: 28 },
      metrics: { views: 14200, archivesCount: 38, digitalAssets: 18, status: 'preserving' },
      tags: ['UNESCO Cần bảo vệ', 'Đàn Đáy', 'Đào Nương', 'Thơ Ca']
    },
    {
      id: 'node-hat-xoan',
      name: 'Hát Xoan Phú Thọ',
      nameEn: 'Xoan Singing of Phu Tho',
      type: 'intangible',
      category: 'Dân ca Tín ngưỡng Thờ Mẫu & Vua Hùng',
      location: 'Phú Thọ',
      region: 'Bắc',
      yearListed: '2017',
      summary: 'Khúc ca nghi lễ trước cửa đình gắn liền với tín ngưỡng thờ cúng Hùng Vương thuở dựng nước.',
      summaryEn: 'Sacred ritual chants performed at village communal courtyards tied to Hung Kings origin lore.',
      description: 'Từng nằm trong danh sách khẩn cấp, Xoan đã được cộng đồng phục hồi ngoạn mục và chuyển sang danh sách Đại diện.',
      imageUrl: 'https://s-aicmscdn.vietnamhoinhap.vn/vnhn-media/20/9/4/image-20200903113007-1.jpg?md5=txUkeXDTw3Gccl10auw6MA&expires=1787392986',
      coordinates: { x: 22, y: 18 },
      metrics: { views: 16800, archivesCount: 29, digitalAssets: 15, status: 'active' },
      tags: ['UNESCO Đại diện', 'Cửa đình', 'Trùm Xoan', 'Phú Thọ']
    },
    {
      id: 'node-gom-bau-truc',
      name: 'Nghệ thuật Gốm Bàu Trúc',
      nameEn: 'Bau Truc Pottery Craft',
      type: 'craft_village',
      category: 'Nghề thủ công truyền thống',
      location: 'Ninh Thuận',
      region: 'Nam',
      yearListed: '2022',
      summary: 'Làng gốm cổ nhất Đông Nam Á làm gốm bằng tay không cần bàn xoay, nung lộ thiên bằng củi trấu.',
      summaryEn: 'Oldest pottery craft in Southeast Asia shaped by hand without potter’s wheels and fired in open-air kilns.',
      description: 'Phụ nữ Chăm vừa đi giật lùi quanh khối đất sét vừa chuốt thành những chiếc chum, lu mang màu khói huyền bí.',
      imageUrl: 'https://images.vietnamtourism.gov.vn/vn//images/1/gombautruc03.jpg',
      coordinates: { x: 72, y: 75 },
      metrics: { views: 19500, archivesCount: 42, digitalAssets: 21, status: 'preserving' },
      tags: ['UNESCO Khẩn cấp', 'Gốm Chăm', 'Không bàn xoay', 'Nung lộ thiên']
    },
    {
      id: 'node-det-van-phuc',
      name: 'Làng lụa Vạn Phúc',
      nameEn: 'Van Phuc Silk Village',
      type: 'craft_village',
      category: 'Dệt lụa truyền thống',
      location: 'Hà Nội',
      region: 'Bắc',
      summary: 'Nghề dệt lụa tơ tằm vân truyền thống hơn 1.000 năm tuổi từng phục vụ triều đình phong kiến.',
      summaryEn: 'Over 1,000-year-old traditional mulberry silk weaving village once crafting royal imperial textiles.',
      description: 'Kỹ thuật dệt nổi vân gấm sắc nét, mùa hè mặc mát, mùa đông ấm áp, mềm mượt bền màu qua thời gian.',
      imageUrl: 'https://i2.ex-cdn.com/crystalbay.com/files/content/2026/08/06/lang-lua-van-phuc-chinh-thuc-tro-thanh-diem-du-lich-moi-cua-ha-noi-2-1331.jpg',
      coordinates: { x: 28, y: 34 },
      metrics: { views: 22100, archivesCount: 31, digitalAssets: 10, status: 'active' },
      tags: ['Lụa tơ tằm', 'Vạn Phúc', 'Nghề cổ', 'Dệt vân']
    },
    {
      id: 'node-3d-scan-project',
      name: 'Dự án Số hóa 3D Đình làng & Chùa Việt',
      nameEn: 'Vietnamese Ancient Shrines 3D Scanning Project',
      type: 'digitalization',
      category: 'Dự án Công nghệ Di sản',
      location: 'Toàn quốc',
      region: 'Bắc',
      summary: 'Quét laser 3D LiDAR và tái tạo thực tế ảo độ phân giải milimet cho hơn 50 di tích quốc gia đặc biệt.',
      summaryEn: 'Millimeter-grade 3D LiDAR scanning & VR reconstruction for 50+ special national monuments.',
      description: 'Lưu trữ đám mây điểm (Point Cloud) và mô hình Textured Mesh phục vụ trùng tu số và nghiên cứu mở.',
      imageUrl: 'https://vietnamarch.com.vn/wp-content/uploads/2020/12/mau-thiet-ke-dinh-chua-rong-800m2-3-650x542.jpg',
      coordinates: { x: 52, y: 35 },
      metrics: { views: 41200, archivesCount: 88, digitalAssets: 54, status: 'active' },
      tags: ['LiDAR 3D', 'Bảo tàng số', 'Thực tế ảo', 'AI Tái lập']
    },
    {
      id: 'node-artisan-hung',
      name: 'Nghệ nhân Vi Thị Hùng',
      nameEn: 'Master Artisan Vi Thi Hung',
      type: 'artisan',
      category: 'Nghệ nhân Dân tộc',
      location: 'Hòa Bình',
      region: 'Bắc',
      summary: 'Nghệ nhân giữ lửa dệt thổ cẩm tự nhiên, truyền nghề cho thế hệ trẻ em vùng cao.',
      summaryEn: 'Keeper of natural brocade dyeing & weaving, nurturing younger ethnic generations.',
      description: 'Người bảo tồn hơn 120 mẫu hoa văn thổ cẩm cổ truyền và tạo kế sinh nhai bền vững cho cộng đồng.',
      imageUrl: 'https://vwu.vn/documents/20182/5217439/20_Apr_2023_071004_GMTsamthitinh_VHThai_Nan.jpg/5f4abcd3-370f-4438-a2d6-182243e56776',
      coordinates: { x: 20, y: 40 },
      metrics: { views: 9800, archivesCount: 15, digitalAssets: 8, status: 'active' },
      tags: ['Nghệ nhân Ưu tú', 'Thổ cẩm', 'Dân tộc Thái', 'Mai Châu']
    },
    {
      id: 'node-unesco-world',
      name: 'Di sản Thế giới UNESCO Việt Nam',
      nameEn: 'UNESCO World Heritage in Vietnam',
      type: 'unesco_record',
      category: 'Hồ sơ Di sản Quốc tế',
      location: 'Paris & Hà Nội',
      region: 'Bắc',
      summary: 'Danh mục 8 di sản thế giới, 15 di sản phi vật thể đại diện nhân loại và di sản tư liệu của Việt Nam.',
      summaryEn: 'Official ledger of UNESCO inscribed tangible, intangible, and documentary heritage sites of Vietnam.',
      description: 'Minh chứng cho bề dày văn hiến, sự đa dạng sinh thái và năng lực sáng tạo văn hóa bền bỉ của dân tộc.',
      imageUrl: 'https://imgs.vietnamnet.vn/Images/2016/07/06/15/20160706150318-v1.jpg?width=0&s=DuRE0RjNPb_3G5cUQ2Yy7w',
      coordinates: { x: 50, y: 15 },
      metrics: { views: 52000, archivesCount: 140, digitalAssets: 60, status: 'active' },
      tags: ['UNESCO', 'Công ước 1972', 'Công ước 2003', 'Hồ sơ khoa học']
    }
  ],
  edges: [
    {
      id: 'e-unesco-hoi-an',
      source: 'node-unesco-world',
      target: 'node-hoi-an',
      relation: 'Công nhận Di sản Thế giới (1999)',
      relationEn: 'Inscribed World Heritage (1999)',
      type: 'unesco_listed',
      weight: 5
    },
    {
      id: 'e-unesco-my-son',
      source: 'node-unesco-world',
      target: 'node-my-son',
      relation: 'Công nhận Di sản Thế giới (1999)',
      relationEn: 'Inscribed World Heritage (1999)',
      type: 'unesco_listed',
      weight: 5
    },
    {
      id: 'e-unesco-thang-long',
      source: 'node-unesco-world',
      target: 'node-thang-long',
      relation: 'Công nhận Di sản Thế giới (2010)',
      relationEn: 'Inscribed World Heritage (2010)',
      type: 'unesco_listed',
      weight: 5
    },
    {
      id: 'e-unesco-ca-tru',
      source: 'node-unesco-world',
      target: 'node-ca-tru',
      relation: 'Di sản cần bảo vệ khẩn cấp',
      relationEn: 'Urgent Safeguarding List',
      type: 'unesco_listed',
      weight: 4
    },
    {
      id: 'e-unesco-hat-xoan',
      source: 'node-unesco-world',
      target: 'node-hat-xoan',
      relation: 'Di sản phi vật thể Đại diện (2017)',
      relationEn: 'Representative Intangible Heritage',
      type: 'unesco_listed',
      weight: 4
    },
    {
      id: 'e-unesco-bau-truc',
      source: 'node-unesco-world',
      target: 'node-gom-bau-truc',
      relation: 'Ghi danh UNESCO (2022)',
      relationEn: 'UNESCO Inscribed (2022)',
      type: 'unesco_listed',
      weight: 5
    },
    {
      id: 'e-scan-thang-long',
      source: 'node-3d-scan-project',
      target: 'node-thang-long',
      relation: 'Số hóa 3D Điện Kính Thiên & Đoan Môn',
      relationEn: '3D Laser scanned Kinh Thien palace',
      type: 'digitalized_in',
      weight: 4
    },
    {
      id: 'e-scan-my-son',
      source: 'node-3d-scan-project',
      target: 'node-my-son',
      relation: 'Mô phỏng 3D Tháp Chăm A1 & B5',
      relationEn: '3D reconstructed Cham towers',
      type: 'digitalized_in',
      weight: 4
    },
    {
      id: 'e-scan-hoi-an',
      source: 'node-3d-scan-project',
      target: 'node-hoi-an',
      relation: 'Bản đồ số Chùa Cầu & Phố Cổ',
      relationEn: 'Digital twin of Japanese Bridge & town',
      type: 'digitalized_in',
      weight: 4
    },
    {
      id: 'e-van-phuc-thang-long',
      source: 'node-det-van-phuc',
      target: 'node-thang-long',
      relation: 'Tiến cung lụa may hoàng bào triều đại',
      relationEn: 'Supplied royal robes for dynasties',
      type: 'shares_origin',
      weight: 3
    },
    {
      id: 'e-hung-craft',
      source: 'node-artisan-hung',
      target: 'node-det-van-phuc',
      relation: 'Giao lưu kỹ thuật dệt & nhuộm tự nhiên',
      relationEn: 'Craft & natural dye knowledge exchange',
      type: 'practiced_by',
      weight: 2
    },
    {
      id: 'e-ca-tru-thang-long',
      source: 'node-ca-tru',
      target: 'node-thang-long',
      relation: 'Nguồn gốc giáo phường ca quán Thăng Long',
      relationEn: 'Historical guilds in Thang Long citadel',
      type: 'located_at',
      weight: 3
    },
    {
      id: 'e-my-son-bau-truc',
      source: 'node-my-son',
      target: 'node-gom-bau-truc',
      relation: 'Cùng chung nền văn minh Chămpa cổ truyền',
      relationEn: 'Shared ancient Champa civilization roots',
      type: 'shares_origin',
      weight: 4
    }
  ]
};
