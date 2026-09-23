/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, ContactMessage } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { X, Send, CheckCircle2, Loader2, MapPin, Mail, Phone } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  language,
  onClose,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    organization: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1600);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[680px] bg-[#FBF9F4] rounded-2xl shadow-2xl overflow-hidden border border-[#E4E2DD] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-[#2B381C] text-white flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
              {t.contactModal.title}
            </h2>
            <p className="text-xs text-[#C5D5AD] mt-1">
              {t.contactModal.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {submitted ? (
            <div className="py-12 text-center space-y-3 bg-[#D8E8BF]/40 rounded-xl border border-[#4F5D3D]/30">
              <CheckCircle2 className="w-12 h-12 text-[#384527] mx-auto" />
              <h3 className="font-heading font-bold text-lg text-[#1B1C19]">
                {t.contactModal.sentSuccess}
              </h3>
              <p className="text-xs text-[#45483F]">
                {language === 'vi' ? 'Đội ngũ Chạm Di Sản sẽ liên hệ lại với bạn trong vòng 24 giờ.' : 'Our heritage team will get back to you within 24 hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#45483F] uppercase tracking-wider mb-1.5">
                    {t.contactModal.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#C6C8BC] rounded-lg text-sm text-[#1B1C19] focus:outline-none focus:border-[#8C6239]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#45483F] uppercase tracking-wider mb-1.5">
                    {t.contactModal.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#C6C8BC] rounded-lg text-sm text-[#1B1C19] focus:outline-none focus:border-[#8C6239]"
                    placeholder="example@ptit.edu.vn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#45483F] uppercase tracking-wider mb-1.5">
                  {t.contactModal.org}
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#C6C8BC] rounded-lg text-sm text-[#1B1C19] focus:outline-none focus:border-[#8C6239]"
                  placeholder="CLB Di sản / Trường Đại học / Bảo tàng..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#45483F] uppercase tracking-wider mb-1.5">
                  {t.contactModal.message} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#C6C8BC] rounded-lg text-sm text-[#1B1C19] focus:outline-none focus:border-[#8C6239] resize-none"
                  placeholder={language === 'vi' ? 'Chia sẻ câu chuyện hoặc đề xuất hợp tác bảo tồn...' : 'Share your initiative or collaboration proposal...'}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-[#45483F] hover:text-[#1B1C19]"
                >
                  {language === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-2.5 bg-[#2B381C] hover:bg-[#384527] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.contactModal.send}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* Quick info footer */}
          <div className="pt-6 border-t border-[#E4E2DD] grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#6E7265]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>96A Trần Phú, Hà Đông</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>+84-1234567890</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>cds@ptit.edu.vn</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
