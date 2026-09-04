import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useBiodata from '../hooks/useBiodata';
import usePrograms from '../hooks/usePrograms';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Header from '../components/section/Header';
import Footerv2 from '../components/section/Footerv2';

export const BiodataPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { programs, programOptions } = usePrograms();
  const { biodata, errors, isLoaded, updateField, saveBiodata } = useBiodata();
  const hasInitializedSelection = useRef(false);

  // Auto-populate targetProgram if passed from landing page (e.g. ProgramsSection or HeroSection)
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

      {/* Main Form Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-10 my-6">
        <div className="w-full max-w-[550px]">
          {/* Intro Heading */}
          <div className="text-center mb-8">
            <span className="inline-block bg-[#F0F3FF] text-[#22437C] font-semibold text-xs px-3.5 py-1 rounded-full mb-3 uppercase tracking-wider">
              LANGKAH 1 DARI 2
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#151C27] mb-2">
              Biodata Peserta
            </h1>
            <p className="text-sm md:text-base text-[#434750]">
              Lengkapi biodata diri Anda untuk memulai placement test.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white custom-shadow border border-[#C4C6D1] rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#C4C6D1] flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon="arrow_forward"
                  iconPosition="right"
                >
                  Lanjutkan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footerv2/>
    </div>
  );
};

export default BiodataPage;
