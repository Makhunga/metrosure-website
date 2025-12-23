import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize state based on document class
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-card/80 backdrop-blur-md border-b border-border-light transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">shield_lock</span>
            </div>
            <span className="text-text-main text-xl font-bold tracking-tight">Metrosure</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold text-text-body hover:text-primary transition-colors" href="#">Our Approach</a>
            <a className="text-sm font-semibold text-text-body hover:text-primary transition-colors" href="#">Solutions</a>
            <a className="text-sm font-semibold text-text-body hover:text-primary transition-colors" href="#">Stories</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
                onClick={toggleTheme}
                className="p-2 text-text-body hover:text-primary transition-colors rounded-full hover:bg-surface"
                aria-label="Toggle dark mode"
            >
                <span className="material-symbols-outlined text-xl">
                    {isDark ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
            <a className="hidden sm:block text-sm font-semibold text-text-body hover:text-primary transition-colors" href="#">Log in</a>
            <button className="flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover transition-colors h-10 px-6 text-white text-sm font-bold shadow-md shadow-primary/20">
              Get a Quote
            </button>
            <button 
                className="md:hidden p-2 text-text-body"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface-card border-b border-border-light py-4 px-4 flex flex-col gap-4 shadow-lg transition-colors duration-300">
             <a className="text-base font-semibold text-text-body hover:text-primary" href="#">Our Approach</a>
             <a className="text-base font-semibold text-text-body hover:text-primary" href="#">Solutions</a>
             <a className="text-base font-semibold text-text-body hover:text-primary" href="#">Stories</a>
             <hr className="border-border-light"/>
             <a className="text-base font-semibold text-text-body hover:text-primary" href="#">Log in</a>
        </div>
      )}
    </header>
  );
};

export default Header;