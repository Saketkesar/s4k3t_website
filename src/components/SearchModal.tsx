import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { BlogPost, Resource } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogs: BlogPost[];
  resources: Resource[];
  onSelectBlog: (blog: BlogPost) => void;
  onSelectResource: (resource: Resource) => void;
  onNavigate: (section: string) => void;
}

export function SearchModal({ 
  isOpen, 
  onClose, 
  blogs, 
  resources, 
  onSelectBlog, 
  onSelectResource,
  onNavigate 
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(query.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(query.toLowerCase()) ||
    resource.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectBlog = (blog: BlogPost) => {
    onNavigate('blogs');
    onSelectBlog(blog);
    onClose();
  };

  const handleSelectResource = (resource: Resource) => {
    onNavigate('resources');
    onSelectResource(resource);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
  <div className="bg-white border border-gray-300 w-full max-w-lg mx-4 shadow-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
        <div className="flex items-center border-b border-gray-200 p-3 dark:border-slate-700">
          <Search size={16} className="text-gray-400 mr-2 dark:text-slate-300" />
          <input
            type="text"
            placeholder="Search posts and resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-sm font-mono dark:text-slate-100"
            autoFocus
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-300 dark:hover:text-slate-100">
            <X size={16} />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {query && (
            <div className="p-3 space-y-3 dark:text-slate-200">
              {filteredBlogs.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono font-bold text-gray-500 dark:text-slate-300 uppercase mb-2">Posts</h3>
                  {filteredBlogs.map(blog => (
                    <button
                      key={blog.id}
                      onClick={() => handleSelectBlog(blog)}
                      className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-slate-700 border border-transparent hover:border-gray-200 dark:hover:border-slate-600"
                    >
                      <div className="text-sm font-mono font-semibold text-gray-800 dark:text-slate-100">{blog.title}</div>
                      <div className="text-xs text-gray-500 dark:text-slate-300 font-mono">{blog.excerpt}</div>
                    </button>
                  ))}
                </div>
              )}
              
              {filteredResources.length > 0 && (
                <div>
          <h3 className="text-xs font-mono font-bold text-gray-500 dark:text-slate-300 uppercase mb-2">Resources</h3>
                  {filteredResources.map(resource => (
                    <button
                      key={resource.id}
                      onClick={() => handleSelectResource(resource)}
            className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-slate-700 border border-transparent hover:border-gray-200 dark:hover:border-slate-600"
                    >
            <div className="text-sm font-mono font-semibold text-gray-800 dark:text-slate-100">{resource.title}</div>
            <div className="text-xs text-gray-500 dark:text-slate-300 font-mono">{resource.description}</div>
                    </button>
                  ))}
                </div>
              )}
              
              {filteredBlogs.length === 0 && filteredResources.length === 0 && (
                <div className="p-4 text-center text-gray-500 font-mono text-sm">
                  No results found
                </div>
              )}
            </div>
          )}
          
          {!query && (
            <div className="p-4 text-center text-gray-500 font-mono text-sm">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}