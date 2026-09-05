import Button from '../common/Button';
export const RecommendationCard = ({ recommendation, onSelectProgram }) => {
  if (!recommendation) return null;

  return (
    <div className="w-full bg-surface border-2 border-primary-container rounded-2xl p-6 md:p-8 ambient-shadow relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary-container" />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pl-2">
        <div className="flex-grow flex flex-col gap-3">
          {/* Level Tag */}
          <div className="inline-flex items-center self-start px-3 py-1 bg-surface-container-high text-primary-container rounded-full text-xs font-semibold">
            Rekomendasi Level: {recommendation.level}
          </div>

          {/* Program Title */}
          <h3 className="text-xl md:text-2xl font-bold text-primary">
            {recommendation.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed max-w-2xl">
            {recommendation.description}
          </p>

          {/* Features List */}
          {Array.isArray(recommendation.features) && recommendation.features.length > 0 && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recommendation.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary-container filled">
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
