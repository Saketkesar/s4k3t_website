import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';

interface CertificatesProps {
  selectedCertId?: string | null;
  onSelectCert?: (certId: string | null) => void;
}

export function Certificates({ selectedCertId, onSelectCert }: CertificatesProps) {
  const { certificates, loading } = useMarkdownContent();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600 font-mono text-sm">Loading certificates...</div>
      </div>
    );
  }

  // If a certificate is selected, render its full content (render markdown like posts)
  if (selectedCertId) {
    const cert = certificates.find((c) => c.id === selectedCertId);
    if (!cert) return <div className="text-gray-600">Certificate not found</div>;

    return (
      <div className="space-y-6">
        <button
          onClick={() => onSelectCert && onSelectCert(null)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-mono text-sm"
        >
          <ArrowLeft size={16} />
          <span>← Back to Certificates</span>
        </button>

        <div className="border border-gray-300 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">{cert.name}</h2>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 font-mono text-xs">{cert.issuer} • {cert.year}</p>
            {cert.status && <p className="text-gray-500 font-mono text-xs">Status: {cert.status}</p>}
          </div>

          <div className="prose max-w-none">
            <ReactMarkdown>{cert.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-mono font-bold text-gray-800">Certificates</h2>
        <p className="text-gray-600 font-mono text-sm">Professional achievements and learning</p>
      </div>

      <div className="space-y-3">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onSelectCert && onSelectCert(cert.id); }}
            onClick={() => onSelectCert && onSelectCert(cert.id)}
            className="border border-gray-300 bg-white p-4 hover:border-gray-400 transition-colors cursor-pointer clickable"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">🏆</span>
                <div>
                  <h4 className="text-gray-800 font-mono text-sm font-semibold">{cert.name}</h4>
                  <p className="text-gray-600 font-mono text-xs">{cert.issuer}</p>
                  {cert.status && (
                    <p className="text-gray-500 font-mono text-xs">Status: {cert.status}</p>
                  )}
                </div>
              </div>
              <span className="text-gray-500 font-mono text-xs">{cert.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}