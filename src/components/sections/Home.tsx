import { useCallback } from 'react';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import { FiInstagram, FiGithub, FiMail, FiAward, FiYoutube } from 'react-icons/fi';
import { SiDiscord } from 'react-icons/si';

interface HomeProps {
  onSelectBlog?: (blog: any) => void;
}

export function Home({ onSelectBlog }: HomeProps) {
  const { blogs } = useMarkdownContent();
  const playClick = useCallback(() => {
    try {
      const a = document.getElementById('social-click-audio') as HTMLAudioElement | null;
      if (a) {
        a.currentTime = 0;
        a.play().catch(() => {});
      }
    } catch (err) {}
  }, []);
  
  const featuredPosts = blogs.slice(0, 2);

  return (
    <div className="space-y-8">
      
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto border-2 border-gray-400 rounded-full overflow-hidden bg-gray-100">
          <img 
            src="https://i.pinimg.com/originals/08/30/8d/08308d02d504aae8cef1cd28691c0d85.gif" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-mono font-bold text-gray-800">Saket Kesar</h1>
          <p className="text-gray-600 font-mono text-sm">aka Stablersleet</p>
          <p className="text-gray-500 font-mono text-xs mt-1">Team Lead <a href="https://ctftime.org/team/376652" target="_blank" rel="noreferrer" className="underline decoration-dotted">N0C715</a></p>
        </div>
        
        <div className="max-w-md mx-auto text-gray-700 font-mono text-sm leading-relaxed">
          <p>Beginner in cybersecurity, and I always want to remain a beginner to keep learning in this endless ocean of knowledge</p>

          <div className="flex items-center justify-center space-x-4 mt-4 text-gray-500">
            <a href="https://www.instagram.com/stablersleet/" target="_blank" rel="noreferrer" onClick={playClick}><FiInstagram size={18} /></a>
            <a href="https://github.com/Saketkesar" target="_blank" rel="noreferrer" onClick={playClick}><FiGithub size={18} /></a>
            <a href="mailto:saketkesar391@gmail.com" onClick={playClick}><FiMail size={18} /></a>
            <a href="https://discord.com/users/stablersleet" target="_blank" rel="noreferrer" onClick={playClick}><SiDiscord size={18} /></a>
            <a href="https://ctftime.org/team/376652" target="_blank" rel="noreferrer" onClick={playClick}><FiAward size={18} /></a>
            <a href="https://www.youtube.com/@Pcstuck2workofficial" target="_blank" rel="noreferrer" onClick={playClick}><FiYoutube size={18} /></a>
          </div>
        </div>
      </div>

      
      <div className="space-y-4">
        <h2 className="text-lg font-mono font-bold text-gray-800">Featured</h2>
        
        <div className="space-y-4">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectBlog && onSelectBlog(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onSelectBlog && onSelectBlog(post); }}
              className="border border-gray-300 p-4 bg-white cursor-pointer hover:border-gray-400 transition-colors clickable"
            >
              <h3 className="font-mono text-sm font-bold text-gray-800 uppercase tracking-wide">
                {post.title}
              </h3>
              <p className="text-gray-500 text-xs font-mono mt-1">
                📅 {post.date ? new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
              </p>
              <p className="text-gray-700 text-sm mt-2 leading-relaxed font-mono">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}