import { useState, useMemo, useCallback } from 'react';
import rawPrograms from '../data/programs.json' with { type: 'json' };

const LEVEL_METADATA = {
  Beginner: {
    icon: 'stairs',
    duration: '3–4 Bulan',
    method: 'Kelas Interaktif',
    tag: 'Fondasi Dasar',
    isFeatured: false,
    accentColor: '#22437C',
    buttonText: 'Lihat Program',
  },
  Intermediate: {
    icon: 'trending_up',
    duration: '4–6 Bulan',
    method: 'Active Speaking',
    tag: 'Work Readiness',
    isFeatured: true,
    accentColor: '#A9213F',
    buttonText: 'Pilih Program Ini',
  },
  Advanced: {
    icon: 'workspace_premium',
    duration: '6 Bulan',
    method: 'High Negotiation',
    tag: 'IELTS/TOEFL',
    isFeatured: false,
    accentColor: '#22437C',
    buttonText: 'Lihat Program',
  },
};

export const usePrograms = () => {
  const [programs] = useState(rawPrograms);
  const programOptions = useMemo(() => {
    return programs.map((prog) => ({
      value: prog.title,
      label: `${prog.title} (${prog.level})`,
      level: prog.level,
      id: prog.id,
    }));
  }, [programs]);
  const enrichedPrograms = useMemo(() => {
    return programs.map((prog) => {
      const meta = LEVEL_METADATA[prog.level] || {
        icon: 'school',
        duration: '3–6 Bulan',
        method: 'Kelas Interaktif',
        tag: prog.level,
        isFeatured: false,
        accentColor: '#22437C',
        buttonText: 'Pilih Program',
      };

      return {
        ...prog,
        ...meta,
      };
    });
  }, [programs]);

  // Find program by ID
  const getProgramById = useCallback(
    (id) => {
      if (!id) return null;
      return programs.find((p) => p.id === id) || null;
    },
    [programs]
  );

  // Find program by level
  const getProgramByLevel = useCallback(
    (level) => {
      if (!level) return null;
      const normalized = String(level).toLowerCase();
      return programs.find((p) => p.level.toLowerCase() === normalized) || null;
    },
    [programs]
  );

  // Find program by title
  const getProgramByTitle = useCallback(
    (title) => {
      if (!title) return null;
      const normalized = String(title).toLowerCase();
      return programs.find((p) => p.title.toLowerCase() === normalized) || null;
    },
    [programs]
  );

  return {
    programs,
    enrichedPrograms,
    programOptions,
    getProgramById,
    getProgramByLevel,
    getProgramByTitle,
  };
};

export default usePrograms;
