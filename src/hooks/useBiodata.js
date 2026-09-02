import { useState, useCallback } from 'react';
import { validateBiodata } from '../utils/validation';

export const USER_SESSION_KEY = 'userSession';

const INITIAL_BIODATA = {
  name: '',
  email: '',
  whatsapp: '',
  domicile: '',
  targetProgram: '',
};

/**
 * Custom hook to manage user biodata form state, validation, and localStorage persistence
 */
export const useBiodata = () => {
  const [biodata, setBiodata] = useState(() => {
    try {
      const savedSession = localStorage.getItem(USER_SESSION_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && typeof parsed === 'object') {
          return { ...INITIAL_BIODATA, ...parsed };
        }
      }
    } catch (err) {
      console.error('Failed to parse userSession from localStorage:', err);
    }
    return INITIAL_BIODATA;
  });

  const [errors, setErrors] = useState({});
  const isLoaded = true;

  // Update field value and clear specific field error
  const updateField = useCallback((field, value) => {
    setBiodata((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  // Validate form and save to localStorage
  const saveBiodata = useCallback(() => {
    const validationResult = validateBiodata(biodata);

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return { success: false, errors: validationResult.errors };
    }

    try {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(biodata));
      setErrors({});
      return { success: true, data: biodata };
    } catch (err) {
      console.error('Failed to save userSession to localStorage:', err);
      return { success: false, errors: { general: 'Gagal menyimpan data ke browser.' } };
    }
  }, [biodata]);

  // Reset biodata state and remove storage session
  const resetBiodata = useCallback(() => {
    setBiodata(INITIAL_BIODATA);
    setErrors({});
    try {
      localStorage.removeItem(USER_SESSION_KEY);
    } catch (err) {
      console.error('Failed to clear userSession:', err);
    }
  }, []);

  return {
    biodata,
    errors,
    isLoaded,
    updateField,
    saveBiodata,
    resetBiodata,
    setBiodata,
  };
};

export default useBiodata;
