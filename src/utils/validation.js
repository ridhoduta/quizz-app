/**
 * Validation utilities for User Biodata
 */

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  // Standard email regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validateWhatsApp = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  // Validates Indonesian phone numbers (e.g., 08123456789, +628123456789, 628123456789)
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const phoneRegex = /^(\+?62|0)8[1-9][0-9]{7,11}$/;
  return phoneRegex.test(cleaned);
};

export const validateBiodata = (biodata = {}) => {
  const errors = {};

  const name = biodata.name ? String(biodata.name).trim() : '';
  const email = biodata.email ? String(biodata.email).trim() : '';
  const whatsapp = biodata.whatsapp ? String(biodata.whatsapp).trim() : '';
  const domicile = biodata.domicile ? String(biodata.domicile).trim() : '';
  const targetProgram = biodata.targetProgram ? String(biodata.targetProgram).trim() : '';

  if (!name) {
    errors.name = 'Nama lengkap wajib diisi.';
  } else if (name.length < 2) {
    errors.name = 'Nama minimal 2 karakter.';
  }

  if (!email) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!validateEmail(email)) {
    errors.email = 'Format alamat email tidak valid.';
  }

  if (!whatsapp) {
    errors.whatsapp = 'Nomor WhatsApp wajib diisi.';
  } else if (!validateWhatsApp(whatsapp)) {
    errors.whatsapp = 'Nomor WhatsApp tidak valid (contoh: 08123456789).';
  }

  if (!domicile) {
    errors.domicile = 'Kota/Domisili wajib diisi.';
  }

  if (!targetProgram) {
    errors.targetProgram = 'Pilihan program wajib dipilih.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
