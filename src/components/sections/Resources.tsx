import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Resource } from '../../types';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';

const typeLabels = {
  note: '📄',
  tool: '🔧', 
  link: '🔗',
};

interface ResourcesProps {
  selectedResource?: Resource | null;
  onSelectResource?: (resource: Resource | null) => void;
}

export function Resources({ selectedResource, onSelectResource }: ResourcesProps) {
  const { resources, loading } = useMarkdownContent();
  const [internalSelectedResource, setInternalSelectedResource] = useState<Resource | null>(null);
  
  const currentResource = selectedResource || internalSelectedResource;
  const handleSelectResource = onSelectResource || setInternalSelectedResource;

    if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600 dark:text-slate-300 font-mono text-sm">Loading resources...</div>
      </div>
    );
  }

  if (currentResource) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => handleSelectResource(null)}
          className="flex items-center space-x-2 text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-100 transition-colors font-mono text-sm"
        >
          <ArrowLeft size={16} />
          <span>← Back to Resources</span>
        </button>
        
  <div className="border border-gray-300 bg-white p-6 dark:card-border dark:card-bg">
          <div className="flex items-center space-x-2 mb-4 font-mono">
            <span className="text-lg">{typeLabels[currentResource.type]}</span>
            <h1 className="text-lg font-bold text-gray-800 dark:text-slate-100">{currentResource.title}</h1>
          </div>
          
          <div className="prose max-w-none dark:prose-invert">
            <ReactMarkdown>{currentResource.content || currentResource.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
  <h2 className="text-xl font-mono font-bold text-gray-800 dark:text-slate-100">Resources</h2>
  <p className="text-gray-600 font-mono text-sm dark:text-slate-300">Organized notes and tools</p>
      </div>

      <div className="space-y-3">
  {resources.map((resource) => (
          <div
            key={resource.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSelectResource(resource); }}
            onClick={() => handleSelectResource(resource)}
      className="border border-gray-300 bg-white p-4 hover:border-gray-400 transition-colors cursor-pointer clickable dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
          >
            <div className="flex items-start space-x-3">
              <div className="text-gray-600 text-lg">
                {typeLabels[resource.type]}
              </div>
              <div className="space-y-1">
        <h3 className="text-gray-800 dark:text-slate-100 font-mono text-sm font-semibold">{resource.title}</h3>
        <p className="text-gray-600 dark:text-slate-300 text-xs leading-relaxed font-mono">{resource.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}