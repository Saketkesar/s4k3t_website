export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  slug: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'note' | 'tool' | 'link';
  description: string;
  content?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  status?: string;
  content?: string;
}