import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSearchOpen: () => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'blogs', label: 'Posts' },
  { id: 'resources', label: 'Resources' },
  { id: 'certs', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, onSectionChange, onSearchOpen }: NavbarProps) {
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
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => onSectionChange('home')}
            className="text-lg font-mono font-bold text-gray-800 hover:text-gray-600"
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
                    ? 'text-gray-800 font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onSearchOpen}
              className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <Search size={14} />
              <span className="hidden sm:inline font-mono text-xs">Search</span>
              <span className="hidden sm:inline font-mono text-xs text-gray-400">⌘K</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 text-gray-600 hover:text-gray-800"
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