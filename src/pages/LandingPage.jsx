import { useNavigate } from 'react-router-dom';
import useBiodata from '../hooks/useBiodata';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

const TARGET_PROGRAM_OPTIONS = [
  { value: 'General English', label: 'General English' },
  { value: 'English Conversation', label: 'English Conversation' },
  { value: 'Academic & Business English', label: 'Academic & Business English' },
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const { biodata, errors, isLoaded, updateField, saveBiodata } = useBiodata();

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
            <span>Langkah 1 dari 2</span>
            <div className="w-16 h-2 bg-[#DCE2F3] rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-[#22437C] rounded-full" />
            </div>
          </div>
        </div>
      </header>

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
                options={TARGET_PROGRAM_OPTIONS}
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
      <footer className="bg-white py-6 border-t border-[#C4C6D1] text-xs text-[#434750] mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#012C64]">English Placement Test</span>
            <span className="hidden md:inline">•</span>
            <span>© 2026 Academic English Systems. All rights reserved.</span>
          </div>
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

export default LandingPage;
