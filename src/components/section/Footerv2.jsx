export const Footerv2 = () => {
  return (
    <footer className="bg-surface-container-lowest py-6 border-t border-outline-variant text-xs text-on-surface-variant mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
        <span>© 2026 Academic English Systems. All rights reserved.</span>
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:underline cursor-pointer">
            Contact Support
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footerv2;
