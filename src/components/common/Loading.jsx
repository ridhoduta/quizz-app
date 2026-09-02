/**
 * Loading spinner component for fallback / data fetching states
 */
export const Loading = ({ text = 'Memuat data...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="w-10 h-10 border-4 border-[#E2E8F8] border-t-[#22437C] rounded-full animate-spin" />
      {text && <p className="text-sm font-medium text-[#434750]">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFCFF]">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
