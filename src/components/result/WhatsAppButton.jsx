import Button from '../common/Button';
import { generateWhatsAppMessage, generateWhatsAppUrl } from '../../utils/whatsapp';

/**
 * WhatsAppButton Component displaying direct WhatsApp link CTA & Retake test action
 */
export const WhatsAppButton = ({
  userSession,
  quizResult,
  onRetakeTest,
  adminPhone = '6281234567890',
}) => {
  const message = generateWhatsAppMessage(userSession, quizResult);
  const waUrl = generateWhatsAppUrl(adminPhone, message);

  return (
    <div className="w-full bg-[#F9F9FF] border border-[#C4C6D1] rounded-2xl p-6 md:p-8 flex flex-col items-center text-center gap-6">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#012C64] mb-2">
          Siap untuk Memulai Pembelajaran?
        </h3>
        <p className="text-sm md:text-base text-[#434750] max-w-md leading-relaxed">
          Konsultasikan hasil placement test Anda dengan tim akademis kami untuk mendapatkan jadwal dan promo pendaftaran terbaik.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
        {/* WhatsApp CTA Link */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center font-medium rounded-lg px-8 py-3.5 text-base gap-2.5 bg-[#A9213F] hover:bg-[#8F1A33] text-white shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer no-underline"
        >
          <span className="material-symbols-outlined text-[22px] filled">
            forum
          </span>
          <span>Konsultasi via WhatsApp</span>
        </a>

        {/* Retake Test Button */}
        {onRetakeTest && (
          <Button
            variant="secondary"
            onClick={onRetakeTest}
            icon="refresh"
            iconPosition="left"
            size="lg"
          >
            Ulangi Tes
          </Button>
        )}
      </div>
    </div>
  );
};

export default WhatsAppButton;
