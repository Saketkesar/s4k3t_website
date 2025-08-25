import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { SearchModal } from './components/SearchModal';
import { Home } from './components/sections/Home';
import { Blogs } from './components/sections/Blogs';
import { Resources } from './components/sections/Resources';
import { Certificates } from './components/sections/Certificates';
import { Contact } from './components/sections/Contact';
import { About } from './components/sections/About';
import { useMarkdownContent } from './hooks/useMarkdownContent';
import { BlogPost, Resource } from './types';

function App() {
  // Theme: 'light' | 'dark' stored in localStorage under 'theme'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const t = localStorage.getItem('theme');
      return t === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore storage errors
    }
  }, [theme]);
  const [activeSection, setActiveSection] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);
  const { blogs, resources, certificates, loading } = useMarkdownContent();

  const openSlug = (slug: string) => {
    
    const b = blogs.find((x) => x.slug === slug);
    if (b) {
      setSelectedBlog(b);
      setSelectedResource(null);
      setActiveSection('blogs');
      history.replaceState(null, '', `/${slug}`);
      return;
    }

  const r = resources.find((x) => x.id === slug);
    if (r) {
      setSelectedResource(r);
      setSelectedBlog(null);
      setActiveSection('resources');
      history.replaceState(null, '', `/${slug}`);
      return;
    }

  const c = certificates.find((x) => x.id === slug || x.name?.toLowerCase().replace(/\s+/g,'-') === slug);
    if (c) {
      setSelectedCertId(c.id);
      setSelectedBlog(null);
      setSelectedResource(null);
      setActiveSection('certs');
      history.replaceState(null, '', `/${slug}`);
      return;
    }
  };

  const handleSelectBlog = (blog: BlogPost | null) => {
    setSelectedBlog(blog);
    setSelectedResource(null);
    if (blog) {
      history.pushState(null, '', `/${blog.slug}`);
      setActiveSection('blogs');
    } else {
      history.pushState(null, '', '/');
    }
  };

  const handleSelectResource = (resource: Resource | null) => {
    setSelectedResource(resource);
    setSelectedBlog(null);
    if (resource) {
      history.pushState(null, '', `/${resource.id}`);
      setActiveSection('resources');
    } else {
      history.pushState(null, '', '/');
    }
  };

  const handleSelectCert = (certId: string | null) => {
    setSelectedCertId(certId);
    setSelectedBlog(null);
    setSelectedResource(null);
    if (certId) {
      history.pushState(null, '', `/${certId}`);
      setActiveSection('certs');
    } else {
      history.pushState(null, '', '/');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home onSelectBlog={handleSelectBlog} />;
      case 'about':
        return <About />;
      case 'blogs':
        return <Blogs selectedBlog={selectedBlog} onSelectBlog={handleSelectBlog} />;
      case 'resources':
        return <Resources selectedResource={selectedResource} onSelectResource={handleSelectResource} />;
      case 'certs':
        return <Certificates selectedCertId={selectedCertId} onSelectCert={handleSelectCert} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  useEffect(() => {
    if (loading) return;
    const path = window.location.pathname.replace(/^\//, '');
    if (!path) return;
    openSlug(path);
  }, [loading, blogs, resources, certificates]);

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname.replace(/^\//, '');
      if (!path) {
        setSelectedBlog(null);
        setSelectedResource(null);
        setSelectedCertId(null);
        setActiveSection('home');
        return;
      }
      openSlug(path);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [blogs, resources, certificates]);

  const handleSectionChange = (section: string) => {
    setSelectedBlog(null);
    setSelectedResource(null);
    setSelectedCertId(null);
    setActiveSection(section);
    
    if (section === 'home' || section === 'blogs' || section === 'resources' || section === 'certs' || section === 'contact') {
      history.pushState(null, '', '/');
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <Navbar
        activeSection={activeSection}
    onSectionChange={handleSectionChange}
    onSearchOpen={() => setIsSearchOpen(true)}
    theme={theme}
    onThemeChange={(t: 'light' | 'dark') => setTheme(t)}
      />
      
      <main className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {renderSection()}
        </div>
      </main>
      
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        blogs={blogs}
        resources={resources}
        onSelectBlog={(blog) => handleSelectBlog(blog)}
        onSelectResource={(resource) => handleSelectResource(resource)}
        onNavigate={setActiveSection}
      />
      
      <Footer />
  <CustomCursor />
    </div>
  );
}

export default App;