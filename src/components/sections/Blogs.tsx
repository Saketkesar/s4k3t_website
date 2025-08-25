import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../../types';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';

interface BlogsProps {
  selectedBlog?: BlogPost | null;
  onSelectBlog?: (blog: BlogPost | null) => void;
}

export function Blogs({ selectedBlog, onSelectBlog }: BlogsProps) {
  const { blogs, loading } = useMarkdownContent();
  const [internalSelectedBlog, setInternalSelectedBlog] = useState<BlogPost | null>(null);
  
  const currentBlog = selectedBlog || internalSelectedBlog;
  const handleSelectBlog = onSelectBlog || setInternalSelectedBlog;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-600 dark:text-slate-300 font-mono text-sm">Loading posts...</div>
      </div>
    );
  }

  if (currentBlog) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => handleSelectBlog(null)}
              className="flex items-center space-x-2 text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-100 transition-colors font-mono text-sm"
        >
          <ArrowLeft size={16} />
          <span>← Back to Posts</span>
        </button>
        
            <div className="border border-gray-300 bg-white p-6 dark:card-border dark:card-bg">
          <div className="text-gray-500 text-xs font-mono mb-4 dark:text-slate-300">
                📅 {new Date(currentBlog.date).toLocaleDateString()}
          </div>

          <div className="prose max-w-none dark:prose-invert">
            <ReactMarkdown>{currentBlog.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-mono font-bold text-gray-800">Posts</h2>
        <p className="text-gray-600 font-mono text-sm">My thoughts and technical writings</p>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSelectBlog(blog); }}
                className="border border-gray-300 bg-white p-4 hover:border-gray-400 transition-colors cursor-pointer clickable dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
            onClick={() => handleSelectBlog(blog)}
          >
            <div className="space-y-2">
                  <h3 className="text-gray-800 dark:text-slate-100 font-mono text-sm font-bold">{blog.title}</h3>
              
      <div className="text-gray-500 text-xs font-mono dark:text-slate-300">
        📅 {new Date(blog.date).toLocaleDateString()}
      </div>
              
      <p className="text-gray-700 text-sm leading-relaxed font-mono dark:text-slate-200">{blog.excerpt}</p>
              
      <div className="text-gray-600 hover:text-gray-800 transition-colors font-mono text-xs dark:text-slate-300 dark:hover:text-slate-100">
        Read more →
      </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}