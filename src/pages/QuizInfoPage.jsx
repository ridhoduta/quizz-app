import { useNavigate } from 'react-router-dom';
import useBiodata from '../hooks/useBiodata';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

export const QuizInfoPage = () => {
  const navigate = useNavigate();
  const { biodata, isLoaded } = useBiodata();

  const handleStartQuiz = () => {
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
            <span>Step 2 of 2 (Informasi)</span>
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
          <span className="inline-block bg-[#E0E7FF] text-[#1E40AF] font-bold text-xs px-3.5 py-1 rounded-full mb-3 uppercase tracking-wider">
            Petunjuk & Informasi Kuis
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#012C64] mb-3">
            Selamat Datang, {biodata.name || 'Peserta'}!
          </h1>
          <p className="text-sm md:text-base text-[#434750] leading-relaxed">
            Mohon pelajari informasi dan ketentuan pelaksanaan placement test di bawah ini sebelum Anda memulai kuis.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Jumlah Soal */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 custom-shadow flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#22437C] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl">quiz</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Jumlah Soal</h3>
            <p className="text-2xl font-extrabold text-[#22437C] mb-2">15 Soal</p>
            <p className="text-xs text-gray-500">
              Pertanyaan pilihan ganda seputar grammar, vocabulary, dan pemahaman bahasa Inggris.
            </p>
          </div>

          {/* Card 2: Mekanisme Timer & Lock */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 custom-shadow flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl">lock_clock</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Timer & Lock</h3>
            <p className="text-2xl font-extrabold text-amber-600 mb-2">30 Detik / Soal</p>
            <p className="text-xs text-gray-500">
              Soal akan otomatis terkunci (Lock) saat waktu habis. Pilihan tidak dapat diubah setelah terkunci.
            </p>
          </div>

          {/* Card 3: Hasil & Evaluasi */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 custom-shadow flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl">analytics</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Laporan Hasil</h3>
            <p className="text-2xl font-extrabold text-emerald-600 mb-2">Lengkap & Detail</p>
            <p className="text-xs text-gray-500">
              Hasil mencakup skor total, tingkat level, rekomendasi kelas, serta review kunci jawaban.
            </p>
          </div>
        </div>

        {/* Detailed Sections: Biodata Confirmation & Rules */}
        <div className="bg-white border border-[#C4C6D1] rounded-2xl p-6 md:p-8 custom-shadow space-y-6 mb-8">
          {/* Biodata Summary */}
          <div>
            <h2 className="text-lg font-bold text-[#012C64] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">person</span>
              Biodata Peserta Tes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs md:text-sm">
              <div>
                <span className="block text-gray-500 text-[11px]">Nama Lengkap</span>
                <span className="font-semibold text-gray-900">{biodata.name || '-'}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[11px]">Email</span>
                <span className="font-semibold text-gray-900">{biodata.email || '-'}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[11px]">No. WhatsApp</span>
                <span className="font-semibold text-gray-900">{biodata.whatsapp || '-'}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[11px]">Target Program</span>
                <span className="font-semibold text-[#22437C]">{biodata.targetProgram || '-'}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Lock & Unlock Mechanism & Grid Colors */}
          <div>
            <h2 className="text-lg font-bold text-[#012C64] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600">lock</span>
              Mekanisme Lock / Unlock Soal & Status Navigasi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm mb-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-900 text-sm block mb-1">
                    🟩 Indikator Hijau (Terjawab)
                  </span>
                  <span className="text-emerald-800 text-xs leading-relaxed">
                    Menandakan soal tersebut <strong>sudah Anda beri jawaban</strong>.
                  </span>
                </div>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500 text-white font-bold flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">cancel</span>
                </div>
                <div>
                  <span className="font-bold text-red-900 text-sm block mb-1">
                    🟥 Indikator Merah (Belum Terjawab)
                  </span>
                  <span className="text-red-800 text-xs leading-relaxed">
                    Menandakan soal tersebut <strong>belum dijawab</strong> atau <strong>kehabisan waktu</strong>.
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-700 text-white font-bold flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900 text-sm block mb-1">
                    🔒 Ikon Lock (Terkunci)
                  </span>
                  <span className="text-gray-600 text-xs leading-relaxed">
                    Soal yang waktu timer (30 detik) nya telah habis akan <strong>terkunci (Lock)</strong>. Pilihan pada soal terkunci tidak dapat diubah lagi.
                  </span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">lock_open</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900 text-sm block mb-1">
                    🔓 Ikon Unlock (Terbuka)
                  </span>
                  <span className="text-gray-600 text-xs leading-relaxed">
                    Soal masih <strong>aktif & terbuka (Unlock)</strong>. Anda dapat memilih atau mengubah jawaban selama timer belum habis.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Color Bar Timer Explanation */}
          <div>
            <h2 className="text-lg font-bold text-[#012C64] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">speed</span>
              Penjelasan Indikator Warna Waktu (Timer Bar)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-800 block">Warna Hijau (0% - 25% terpakai)</span>
                  <span className="text-emerald-700 text-[11px]">Sisa waktu masih banyak (&gt;22.5s)</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-amber-800 block">Warna Kuning (25% - 75% terpakai)</span>
                  <span className="text-amber-700 text-[11px]">Waktu tersisa setengah (7.5s - 22.5s)</span>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 shrink-0" />
                <div>
                  <span className="font-bold text-red-800 block">Warna Merah (&gt;75% terpakai)</span>
                  <span className="text-red-700 text-[11px]">Waktu kritis (&lt;7.5s) & berkedip</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Rules and Mode */}
          <div>
            <h2 className="text-lg font-bold text-[#012C64] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-600">fullscreen</span>
              Ketentuan Navigasi & Mode Fullscreen
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-gray-700">
              <li>
                <strong>Tanpa Tombol Selanjutnya/Sebelumnya</strong>: Pindah antar soal dilakukan langsung dengan mengeklik <strong>Nomor Soal pada Grid Navigasi</strong>.
              </li>
              <li>
                Saat mengeklik <strong>Mulai Tes Sekarang</strong>, layar browser akan masuk ke mode <strong>Fullscreen</strong> secara otomatis.
              </li>
              <li>
                Jika Anda keluar dari mode Fullscreen sebelum kuis selesai, sistem akan menampilkan dialog peringatan untuk mengaktifkan kembali mode Fullscreen.
              </li>
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
          <div>
            <h3 className="font-bold text-lg md:text-xl">Sudah Siap Memulai Test?</h3>
            <p className="text-xs md:text-sm text-blue-200">
              Pastikan koneksi internet Anda stabil dan Anda siap fokus mengerjakan 15 soal.
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
            Mulai Tes Sekarang (Fullscreen)
          </Button>
        </div>
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
