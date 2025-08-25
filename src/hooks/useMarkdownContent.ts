import { useState, useEffect } from 'react';
import { BlogPost, Resource, Certificate } from '../types';
import { loadAllContent, MarkdownFile } from '../utils/markdownLoader';

export function useMarkdownContent() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      
      try {
        const { posts, resources: resourceFiles, certs } = await loadAllContent();
        
        // Convert to proper types
        const processedBlogs: BlogPost[] = posts.map((post: MarkdownFile) => ({
          id: post.id,
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          content: post.content,
          slug: post.slug
        }));

        const processedResources: Resource[] = resourceFiles.map((resource: MarkdownFile) => ({
          id: resource.id,
          title: resource.title,
          type: resource.data.type || 'note',
          description: resource.data.description || resource.excerpt,
          content: resource.content
        }));

        const processedCerts: Certificate[] = certs.map((cert: MarkdownFile) => ({
          id: cert.id,
          name: cert.data.name || cert.title,
          issuer: cert.data.issuer || 'Unknown',
          year: cert.data.year || new Date().getFullYear().toString(),
          status: cert.data.status,
          content: cert.content
        }));

        setBlogs(processedBlogs);
        setResources(processedResources);
        setCertificates(processedCerts);
      } catch (error) {
        console.error('Error loading markdown content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    // Auto-refresh every 10 seconds to check for new markdown files
    const interval = setInterval(fetchContent, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return { blogs, resources, certificates, loading };
}