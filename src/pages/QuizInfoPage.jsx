import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBiodata from '../hooks/useBiodata';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

export const QuizInfoPage = () => {
  const navigate = useNavigate();
  const { biodata, isLoaded } = useBiodata();
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);

  const handleStartQuiz = () => {
    setShowFullscreenModal(true);
  };

  const confirmStartQuiz = () => {
    setShowFullscreenModal(false);
    // Request browser Fullscreen mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request bypassed or denied by browser:', err);
      });
    }
    navigate('/quiz');
  };

  if (!isLoaded) {
    return <Loading fullScreen text="Memuat informasi kuis..." />;
  }

  return (
    <div className="font-sans antialiased text-[#151C27] min-h-screen flex flex-col bg-[#FEFCFF]">
      {/* Header */}
      <header className="bg-white border-b border-[#C4C6D1] py-4 px-4 md:px-10 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#22437C] filled">
              school
            </span>
            <span className="text-lg md:text-xl font-bold text-[#012C64]">
              English Placement Test
            </span>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 text-[#434750] text-xs md:text-sm font-medium">
            <span>Langkah 2 dari 2</span>
            <div className="w-16 h-2 bg-[#DCE2F3] rounded-full overflow-hidden">
              <div className="w-full h-full bg-[#22437C] rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
        {/* Banner Section */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block bg-[#F0F3FF] text-[#22437C] font-semibold text-xs px-3.5 py-1 rounded-full mb-3 uppercase tracking-wider">
            INFORMASI PENGERJAAN
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#012C64] mb-2">
            Petunjuk Placement Test
          </h1>
          <p className="text-sm md:text-base text-[#434750] leading-relaxed">
            Halo, <strong className="text-[#151C27]">{biodata.name || 'Peserta'}</strong>! Pelajari informasi dan ketentuan berikut sebelum memulai tes.
          </p>
        </div>

        {/* Unified Info Highlight Bar */}
        <div className="bg-white border border-[#C4C6D1] rounded-2xl p-5 md:p-6 custom-shadow mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {/* 1: Jumlah Soal */}
            <div className="flex flex-col items-center text-center p-3 sm:py-0">
              <span className="text-xs font-medium text-gray-500 mb-1">Jumlah Soal</span>
              <span className="text-2xl font-bold text-[#22437C]">15 Soal</span>
              <span className="text-xs text-gray-400 mt-1">Pilihan ganda</span>
            </div>

            {/* 2: Waktu Pengerjaan */}
            <div className="flex flex-col items-center text-center p-3 sm:py-0">
              <span className="text-xs font-medium text-gray-500 mb-1">Waktu Pengerjaan</span>
              <span className="text-2xl font-bold text-[#A9213F]">10 Menit</span>
              <span className="text-xs text-gray-400 mt-1">Total seluruh soal</span>
            </div>

            {/* 3: Laporan Hasil */}
            <div className="flex flex-col items-center text-center p-3 sm:py-0">
              <span className="text-xs font-medium text-gray-500 mb-1">Hasil & Evaluasi</span>
              <span className="text-2xl font-bold text-emerald-600">Instan</span>
              <span className="text-xs text-gray-400 mt-1">Level & rekomendasi kelas</span>
            </div>
          </div>
        </div>

        {/* Detailed Sections Container */}
        <div className="bg-white border border-[#C4C6D1] rounded-2xl p-6 md:p-8 custom-shadow space-y-6 mb-8">
          {/* Biodata Summary */}
          <div>
            <h2 className="text-base md:text-lg font-bold text-[#012C64] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#22437C] text-[20px]">person</span>
              <span>Biodata Peserta</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-[#F9FAFB] p-4 rounded-xl border border-gray-200 text-xs md:text-sm">
              <div>
                <span className="block text-gray-500 text-[11px] mb-0.5">Nama Lengkap</span>
                <span className="font-semibold text-gray-900">{biodata.name || '-'}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[11px] mb-0.5">Email</span>
                <span className="font-semibold text-gray-900">{biodata.email || '-'}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[11px] mb-0.5">Nomor WhatsApp</span>
                <span className="font-semibold text-gray-900">{biodata.whatsapp || '-'}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[11px] mb-0.5">Pilihan Program</span>
                <span className="font-semibold text-[#22437C]">{biodata.targetProgram || '-'}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Ketentuan Pengerjaan (Scannable list) */}
          <div>
            <h2 className="text-base md:text-lg font-bold text-[#012C64] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#22437C] text-[20px]">rule</span>
              <span>Ketentuan Pengerjaan</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-[#434750]">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">check_circle</span>
                <span><strong>10 menit untuk seluruh 15 soal.</strong> Atur ritme pengerjaan Anda secara mandiri.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">check_circle</span>
                <span><strong>Navigasi bebas.</strong> Anda dapat berpindah dan meninjau nomor soal kapan saja.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">check_circle</span>
                <span><strong>Submit otomatis.</strong> Jawaban akan otomatis dikumpulkan ketika waktu habis.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">check_circle</span>
                <span><strong>Mode fullscreen.</strong> Tes dianjurkan dalam layar penuh untuk menjaga fokus pengerjaan.</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Status Navigasi & Timer Indicators */}
          <div>
            <h2 className="text-base md:text-lg font-bold text-[#012C64] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#22437C] text-[20px]">info</span>
              <span>Petunjuk Status Soal & Timer</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Soal Status */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <span className="font-bold text-gray-700 block">Indikator Nomor Soal</span>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">✓</span>
                  <span className="text-gray-600"><strong>Sudah Dijawab:</strong> warna hijau dengan tanda centang</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">!</span>
                  <span className="text-gray-600"><strong>Belum Dijawab:</strong> warna merah dengan tanda seru</span>
                </div>
              </div>

              {/* Timer Status */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <span className="font-bold text-gray-700 block">Indikator Waktu</span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-gray-600"><strong>Hijau:</strong> Waktu masih cukup (&gt; 7.5 menit)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-gray-600"><strong>Kuning:</strong> Perhatikan waktu (2.5 – 7.5 menit)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  <span className="text-gray-600"><strong>Merah:</strong> Waktu kritis (&lt; 2.5 menit)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#22437C] text-white p-6 rounded-2xl shadow-lg">
          <div>
            <h3 className="font-bold text-lg md:text-xl">Sudah Siap Memulai Tes?</h3>
            <p className="text-xs md:text-sm text-blue-100 mt-0.5">
              10 menit untuk seluruh 15 soal. Tes akan dimulai dalam mode layar penuh.
            </p>
          </div>
          <Button
            variant="accent"
            size="lg"
            onClick={handleStartQuiz}
            icon="play_arrow"
            iconPosition="right"
            className="w-full sm:w-auto shrink-0 shadow-md text-base"
          >
            Mulai Tes
          </Button>
        </div>

        {/* Fullscreen Alert Confirmation Modal */}
        {showFullscreenModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fullscreen-modal-title"
            aria-describedby="fullscreen-modal-description"
          >
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8 border border-[#C4C6D1] flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#E2E8F8] rounded-full flex items-center justify-center mb-4 text-[#22437C]">
                <span className="material-symbols-outlined text-[36px]">
                  fullscreen
                </span>
              </div>

              <h3 id="fullscreen-modal-title" className="text-xl md:text-2xl font-bold text-[#151C27] mb-2">
                Masuk Mode Fullscreen
              </h3>

              <p id="fullscreen-modal-description" className="text-sm text-[#434750] mb-6 leading-relaxed">
                Tes akan dimulai dalam <strong>mode layar penuh (fullscreen)</strong> untuk menjaga fokus pengerjaan. Pastikan Anda siap sebelum memulai kuis.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  variant="outline"
                  onClick={() => setShowFullscreenModal(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button
                  variant="accent"
                  onClick={confirmStartQuiz}
                  icon="play_arrow"
                  iconPosition="right"
                  className="flex-1"
                >
                  Mulai Tes Sekarang
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-[#C4C6D1] text-xs text-[#434750] mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <span>© 2026 Academic English Systems. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuizInfoPage;
