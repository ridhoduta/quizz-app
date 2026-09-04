import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useBiodata from '../hooks/useBiodata';
import usePrograms from '../hooks/usePrograms';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Header from '../components/section/Header';
import Footerv2 from '../components/section/Footerv2';
import imageBiodata from '../assets/images/image-biodata.png';

export const BiodataPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { programs, programOptions } = usePrograms();
  const { biodata, errors, isLoaded, updateField, saveBiodata } = useBiodata();
  const hasInitializedSelection = useRef(false);

  useEffect(() => {
    if (hasInitializedSelection.current) return;
    const selectedFromState = location.state?.selectedProgram;
    if (selectedFromState && programs.length > 0) {
      hasInitializedSelection.current = true;
      const matched = programs.find(
        (p) =>
          p.title.toLowerCase() === selectedFromState.toLowerCase() ||
          p.id.toLowerCase() === selectedFromState.toLowerCase() ||
          p.level.toLowerCase() === selectedFromState.toLowerCase() ||
          selectedFromState.toLowerCase().includes(p.level.toLowerCase())
      );
      const targetValue = matched ? matched.title : selectedFromState;
      updateField('targetProgram', targetValue);
    }
  }, [location.state, programs, updateField]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = saveBiodata();
    if (result.success) {
      navigate('/info');
    }
  };

  if (!isLoaded) {
    return <Loading fullScreen text="Memuat data session..." />;
  }

  return (
    <div className="font-sans antialiased text-[#151C27] min-h-screen flex flex-col bg-[#FEFCFF]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 lg:p-10 my-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white custom-shadow border border-[#C4C6D1] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* Left Side */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#F0F3FF] via-[#E7EEFE] to-[#E2E8F8] p-6 md:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#C4C6D1] relative overflow-hidden">
              {/* Top Badges & Welcome */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#C4C6D1]/60 text-[#22437C] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#22437C] animate-pulse" />
                  <span>Langkah 1 dari 3: Lengkapi Biodata</span>
                </div>

                <h2 className="text-2xl md:text-3xl text-[#012C64] font-bold tracking-tight mb-3">
                  Halo, Semangat Memulai Tes!
                </h2>

                <p className="text-sm md:text-base text-[#434750] leading-relaxed mb-6">
                  Isi informasi diri kamu dengan lengkap sebelum memulai placement test. Hasil analisis akan disesuaikan khusus untuk level kemampuanmu!
                </p>

                {/* Key Benefits / Checklist */}
                <div className="space-y-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#C4C6D1]/50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#22437C]/10 flex items-center justify-center flex-shrink-0 text-[#22437C]">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#151C27] font-medium">
                      Hanya butuh 10-15 menit pengerjaan
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#22437C]/10 flex items-center justify-center flex-shrink-0 text-[#22437C]">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#151C27] font-medium">
                      Lihat Hasil analisis kemampuanmu secara instan
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#22437C]/10 flex items-center justify-center flex-shrink-0 text-[#22437C]">
                      <span className="material-symbols-outlined text-[18px]">military_tech</span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#151C27] font-medium">
                      100% Gratis tanpa biaya tersembunyi
                    </span>
                  </div>
                </div>
              </div>

              {/* Character Illustration Container */}
              <div className="relative z-10 flex justify-center items-end pt-6 md:pt-4">
                <div className="relative max-w-[280px] sm:max-w-[320px] w-full flex items-center justify-center group">
                  <img
                    src={imageBiodata}
                    alt="Karakter Kelinci Pengisi Biodata"
                    className="w-full h-auto max-h-[280px] object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Form Inputs */}
            <div className="lg:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-white">
              <div className="max-w-xl mx-auto w-full">
                <div className="mb-6">
                  <span className="inline-block text-xs font-semibold text-[#22437C] uppercase tracking-wider mb-1">
                    Formulir Pendaftaran
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#151C27] mb-1.5">
                    Lengkapi Biodata Diri
                  </h1>
                  <p className="text-sm md:text-base text-[#434750]">
                    Masukkan informasi diri Anda sebelum memulai placement test.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  {/* Full Name */}
                  <Input
                    id="fullName"
                    name="name"
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap Anda"
                    value={biodata.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={errors.name}
                    required
                  />

                  {/* Email Address */}
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Alamat Email"
                    placeholder="nama@email.com"
                    value={biodata.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={errors.email}
                    required
                  />

                  {/* WhatsApp & Domicile 2-column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* WhatsApp Number */}
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      label="Nomor WhatsApp"
                      placeholder="Contoh: 081234567890"
                      value={biodata.whatsapp}
                      onChange={(e) => updateField('whatsapp', e.target.value)}
                      error={errors.whatsapp}
                      required
                    />

                    {/* Domicile */}
                    <Input
                      id="domicile"
                      name="domicile"
                      label="Kota Domisili"
                      placeholder="Contoh: Jakarta"
                      value={biodata.domicile}
                      onChange={(e) => updateField('domicile', e.target.value)}
                      error={errors.domicile}
                      required
                    />
                  </div>

                  {/* Target Program */}
                  <Input
                    id="targetProgram"
                    name="targetProgram"
                    type="select"
                    label="Pilihan Program"
                    placeholder="Pilih program"
                    options={programOptions}
                    value={biodata.targetProgram}
                    onChange={(e) => updateField('targetProgram', e.target.value)}
                    error={errors.targetProgram}
                    required
                  />

                  {/* Actions */}
                  <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-[#C4C6D1] mt-6">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="w-full sm:w-auto px-6 py-3 border border-[#22437C] text-[#22437C] text-sm font-semibold rounded-xl hover:bg-[#F0F3FF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      <span>Kembali ke Beranda</span>
                    </button>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon="arrow_forward"
                      iconPosition="right"
                      className="w-full sm:w-auto px-8"
                    >
                      Lanjutkan ke Tes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footerv2 />
    </div>
  );
};

export default BiodataPage;
