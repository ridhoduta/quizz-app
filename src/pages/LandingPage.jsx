import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  HeroSection,
  StepsSection,
  ProgramsSection,
  CtaSection,
  Footer,
} from '../components/section';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/biodata');
  };

  const handleSelectProgram = (programName) => {
    navigate('/biodata', { state: { selectedProgram: programName } });
  };

  return (
    <div className="font-sans antialiased text-on-surface min-h-screen flex flex-col bg-background">
      <Navbar onStartTest={handleStartTest} />
      <main className="w-full pt-20 flex-grow">
        <HeroSection onStartTest={handleStartTest} />
        <StepsSection onStartTest={handleStartTest} />
        <ProgramsSection onSelectProgram={handleSelectProgram} />
        <CtaSection onStartTest={handleStartTest} />
      </main>
      <Footer onStartTest={handleStartTest} />
    </div>
  );
};

export default LandingPage;