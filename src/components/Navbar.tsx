import { useState, useEffect } from 'react';
import { playTransformSound } from '../utils/sound';
import { Search } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSearchOpen: () => void;
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'blogs', label: 'Posts' },
  { id: 'resources', label: 'Resources' },
  { id: 'certs', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, onSectionChange, onSearchOpen, theme = 'light', onThemeChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onSearchOpen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearchOpen]);

  return (
  <nav className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-300 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => onSectionChange('home')}
            className="text-lg font-mono font-bold text-gray-900 dark:text-slate-100 hover:text-gray-600 dark:hover:text-slate-200"
            aria-label="Go to home"
          >
            Stablersleet
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
      {navItems.slice(1).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`font-mono text-sm transition-colors ${
                  activeSection === id
        ? 'text-gray-800 dark:text-slate-100 font-semibold'
    : 'text-gray-600 dark:text-slate-200 hover:text-gray-800 dark:hover:text-slate-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onSearchOpen}
              className="flex items-center space-x-2 px-3 py-1 text-gray-600 dark:text-slate-200 hover:text-gray-800 dark:hover:text-slate-100 border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <Search size={14} />
              <span className="hidden sm:inline font-mono text-xs">Search</span>
              <span className="hidden sm:inline font-mono text-xs text-gray-400">⌘K</span>
            </button>
            
            {/* Theme toggle */}
            <button
              onClick={() => {
                const next = theme === 'dark' ? 'light' : 'dark';
                playTransformSound();
                onThemeChange?.(next);
              }}
              className="flex items-center justify-center w-9 h-9 rounded border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 text-gray-600 dark:text-slate-200 hover:text-gray-800 dark:hover:text-slate-100"
            >
              <div className="w-4 h-3 flex flex-col justify-between">
                <div className="w-full h-0.5 bg-current"></div>
                <div className="w-full h-0.5 bg-current"></div>
                <div className="w-full h-0.5 bg-current"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            {navItems.slice(1).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  onSectionChange(id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 font-mono text-sm transition-colors ${
                  activeSection === id
                    ? 'text-gray-800 font-semibold bg-gray-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}