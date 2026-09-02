import defaultPrograms from '../data/programs.json' with { type: 'json' };

/**
 * Gets course recommendation based on determined user level
 * @param {string} level 'Beginner' | 'Intermediate' | 'Advanced'
 * @param {Array} programs Optional custom array of programs
 * @returns {Object} Recommended program details
 */
export const getRecommendation = (level, programs = defaultPrograms) => {
  if (!Array.isArray(programs) || programs.length === 0) {
    return null;
  }

  const normalizedLevel = String(level || 'Beginner').toLowerCase();

  // Find exact level match
  const matchedProgram = programs.find(
    (p) => String(p.level).toLowerCase() === normalizedLevel
  );

  // Fallback to first program if no exact match found
  return matchedProgram || programs[0];
};

export default getRecommendation;
