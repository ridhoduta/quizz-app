import Button from '../common/Button';

/**
 * RecommendationCard Component displaying recommended program details and features
 */
export const RecommendationCard = ({ recommendation, onSelectProgram }) => {
  if (!recommendation) return null;

  return (
    <div className="w-full bg-[#F9F9FF] border-2 border-[#22437C] rounded-2xl p-6 md:p-8 ambient-shadow relative overflow-hidden">
      {/* Decorative accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#22437C]" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pl-2">
        <div className="flex-grow flex flex-col gap-3">
          {/* Level Tag */}
          <div className="inline-flex items-center self-start px-3 py-1 bg-[#E2E8F8] text-[#22437C] rounded-full text-xs font-semibold">
            Rekomendasi Level: {recommendation.level}
          </div>

          {/* Program Title */}
          <h3 className="text-xl md:text-2xl font-bold text-[#012C64]">
            {recommendation.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-[#434750] leading-relaxed max-w-2xl">
            {recommendation.description}
          </p>

          {/* Features List */}
          {Array.isArray(recommendation.features) && recommendation.features.length > 0 && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recommendation.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-[#151C27]">
                  <span className="material-symbols-outlined text-[18px] text-[#22437C] filled">
                    check_circle
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Program CTA Button */}
        {onSelectProgram && (
          <div className="shrink-0 w-full md:w-auto">
            <Button
              variant="primary"
              onClick={() => onSelectProgram(recommendation)}
              fullWidth
            >
              Lihat Detail Program
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
