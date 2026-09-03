import Button from '../common/Button';

/**
 * SubmitConfirmation Modal Component
 */
export const SubmitConfirmation = ({
  isOpen = false,
  onClose,
  onConfirm,
  unansweredCount = 0,
  totalQuestions = 15,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-submit-title"
      aria-describedby="modal-submit-description"
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8 border border-[#C4C6D1] flex flex-col items-center text-center transform transition-all scale-100">
        {/* Header Icon */}
        <div className="w-16 h-16 bg-[#E2E8F8] rounded-full flex items-center justify-center mb-4 text-[#22437C]">
          <span className="material-symbols-outlined text-[36px]">
            assignment_turned_in
          </span>
        </div>

        {/* Title */}
        <h3 id="modal-submit-title" className="text-xl md:text-2xl font-bold text-[#151C27] mb-2">
          Kumpulkan Jawaban?
        </h3>

        {/* Description */}
        <p id="modal-submit-description" className="text-sm text-[#434750] mb-6 leading-relaxed">
          Setelah dikumpulkan, Anda tidak dapat mengubah jawaban lagi. Hasil evaluasi dan rekomendasi level akan langsung ditampilkan.
        </p>

        {/* Unanswered Warning Banner */}
        {unansweredCount > 0 && (
          <div className="bg-[#FFDAD6]/40 border border-[#FFDAD6] rounded-xl p-3.5 mb-6 w-full flex items-center gap-3 text-left">
            <span className="material-symbols-outlined text-[#B12844] text-[22px] shrink-0">
              warning
            </span>
            <p className="text-xs font-semibold text-[#8F072F]">
              Masih terdapat {unansweredCount} dari {totalQuestions} soal yang belum dijawab.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Kembali
          </Button>
          <Button
            variant="accent"
            onClick={onConfirm}
            className="flex-1"
          >
            Kumpulkan Jawaban
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmation;
