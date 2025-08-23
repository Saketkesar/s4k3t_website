
import matter from 'gray-matter';

if (typeof (globalThis as any).Buffer === 'undefined') {
  (globalThis as any).Buffer = {
    from: (input: any) => {
      if (typeof input === 'string') {
        return new TextEncoder().encode(input);
      }
      if (input instanceof Uint8Array) return input;
      return new TextEncoder().encode(String(input));
    },
    isBuffer: (v: any) => v instanceof Uint8Array,
  };
}

export interface MarkdownFile {
  id: string;
  title: string;
  content: string;
  data: any;
  excerpt: string;
  slug: string;
  date: string;
  filePath: string;
}


  
// Use Vite's import.meta.glob to dynamically import markdown files
const postsFiles = import.meta.glob('/posts/*.md', { as: 'raw' });
const resourcesFiles = import.meta.glob('/resources/*.md', { as: 'raw' });
const certsFiles = import.meta.glob('/certs/*.md', { as: 'raw' });

async function loadFilesFromGlob(globObj: Record<string, () => Promise<string>>, directory: string): Promise<MarkdownFile[]> {
  const markdownFiles: MarkdownFile[] = [];
  for (const filePath in globObj) {
    const fileName = filePath.split('/').pop() || '';
    const fileContent = await globObj[filePath]();
    
    let raw = fileContent;
    const commentedFrontmatterRegex = /^#\s*---[\s\S]*?#\s*---/m;
    if (commentedFrontmatterRegex.test(raw)) {
      raw = raw.replace(/^#\s*---\s*\n([\s\S]*?)\n#\s*---/m, (_match, inner) => {
        const cleaned = inner.replace(/^#\s?/mg, '');
        return `---\n${cleaned}\n---`;
      });
    }

    const { data, content } = matter(raw);

    
    const normalizedData = { ...(data || {}) };
    if (directory === 'certs') {
      
      if (!normalizedData.name) {
        const h1 = content.match(/^#\s+(.+)/m);
        if (h1 && h1[1]) normalizedData.name = h1[1].trim();
      }

      
      if (!normalizedData.issuer) {
        const issuerMatch = content.match(/\*\*Issuer\*\*:\s*(.+)/i) || content.match(/^Issuer:\s*(.+)/im);
        if (issuerMatch && issuerMatch[1]) normalizedData.issuer = issuerMatch[1].trim();
      }

      
      if (!normalizedData.year) {
        const yearMatch = content.match(/\*\*Year\*\*:\s*(\d{4})/i) || content.match(/(19|20)\d{2}/);
        if (yearMatch) normalizedData.year = yearMatch[0].toString();
      }

      
      Object.assign((data as any), normalizedData);
    }
    markdownFiles.push({
      id: fileName.replace('.md', ''),
      title: data.title || fileName.replace('.md', '').replace(/-/g, ' '),
      content,
      data,
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      slug: fileName.replace('.md', ''),
      date: data.date || new Date().toISOString(),
      filePath: `${directory}/${fileName}`
    });
  }
  
  return markdownFiles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function loadMarkdownFiles(directory: 'posts' | 'resources' | 'certs'): Promise<MarkdownFile[]> {
  if (directory === 'posts') {
    return await loadFilesFromGlob(postsFiles, 'posts');
  } else if (directory === 'resources') {
    return await loadFilesFromGlob(resourcesFiles, 'resources');
  } else {
    return await loadFilesFromGlob(certsFiles, 'certs');
  }
}

export async function loadAllContent() {
  const [posts, resources, certs] = await Promise.all([
    loadMarkdownFiles('posts'),
    loadMarkdownFiles('resources'),
    loadMarkdownFiles('certs')
  ]);
  return { posts, resources, certs };
}