/**
 * WhatsApp integration utility functions
 */

const DEFAULT_ADMIN_PHONE = '6281234567890';

/**
 * Formats a pre-filled WhatsApp message based on user session and placement test results
 * @param {Object} userSession { name, email, whatsapp, domicile, targetProgram }
 * @param {Object} quizResult { score, level, recommendation }
 * @returns {string} Formatted text message
 */
export const generateWhatsAppMessage = (userSession = {}, quizResult = {}) => {
  const name = userSession.name || 'Calon Siswa';
  const email = userSession.email || '-';
  const phone = userSession.whatsapp || '-';
  const domicile = userSession.domicile || '-';
  const targetProgram = userSession.targetProgram || 'English Program';

  const score = quizResult.score !== undefined ? `${quizResult.score}%` : 'N/A';
  const level = quizResult.level || 'N/A';
  const programTitle = quizResult.recommendation?.title || 'Program Belajar';

  return `Halo Admin, saya ingin konsultasi pendaftaran Placement Test.

*Data Diri:*
- Nama: ${name}
- Email: ${email}
- No. WA: ${phone}
- Domisili: ${domicile}
- Program Minat: ${targetProgram}

*Hasil Placement Test:*
- Skor: ${score}
- Level: ${level}
- Rekomendasi Program: ${programTitle}

Mohon informasi jadwal & pendaftaran selanjutnya. Terima kasih!`;
};

/**
 * Generates direct WhatsApp deep link URL
 * @param {string} phoneNumber Destination phone number (e.g. '08123456789' or '+628123456789')
 * @param {string} message Pre-filled message string
 * @returns {string} Full wa.me URL
 */
export const generateWhatsAppUrl = (phoneNumber = DEFAULT_ADMIN_PHONE, message = '') => {
  // Format phone number to international format (62xxxx)
  let cleaned = String(phoneNumber).replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encodedMessage}`;
};
