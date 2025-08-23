import { FaCoffee } from 'react-icons/fa';
import { FiInstagram, FiGithub, FiMail, FiYoutube } from 'react-icons/fi';
import { SiDiscord } from 'react-icons/si';
import { useRef } from 'react';

export function Contact() {
  const playClick = () => {
    try {
      const a = document.getElementById('social-click-audio') as HTMLAudioElement | null;
      if (a) {
        a.currentTime = 0;
        a.play().catch(() => {});
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-mono font-bold text-gray-800">Contact</h2>
        <p className="text-gray-600 font-mono text-sm">Get in touch with me</p>
      </div>

      <div className="border border-gray-300 bg-white p-6">
        <div className="space-y-4 font-mono text-sm">
          <div className="space-y-2">
            <h3 className="text-gray-800 font-semibold">Get in Touch</h3>
            <p className="text-gray-700 leading-relaxed">
              Feel free to reach out for collaborations, questions, or just to say hi!
            </p>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">📧</span>
              <a href="mailto:saketkesar391@gmail.com" className="text-gray-800 hover:text-gray-600 transition-colors">
                saketkesar391@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FaCoffee className="text-gray-600" />
              <span className="text-gray-700">Let's plan a chai together — mail me at the address above (note: I'm a fast drinker, you'll get less time to talk)</span>
            </div>
            <div className="flex items-center space-x-3">
              <FiMail className="text-gray-600" />
              <a href="mailto:saketkesar391@gmail.com" onClick={playClick} className="text-gray-800 hover:text-gray-600 transition-colors">
                saketkesar391@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FiInstagram className="text-gray-600" />
              <a href="https://www.instagram.com/stablersleet/" target="_blank" rel="noreferrer" onClick={playClick} className="text-gray-800 hover:text-gray-600 transition-colors">
                @stablersleet
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FiGithub className="text-gray-600" />
              <a href="https://github.com/Saketkesar" target="_blank" rel="noreferrer" onClick={playClick} className="text-gray-800 hover:text-gray-600 transition-colors">
                Saketkesar
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <SiDiscord className="text-gray-600" />
              <a href="https://discord.com/users/stablersleet" target="_blank" rel="noreferrer" onClick={playClick} className="text-gray-800 hover:text-gray-600 transition-colors social-link">
                stablersleet
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FiYoutube className="text-gray-600" />
              <a href="https://www.youtube.com/@Pcstuck2workofficial" target="_blank" rel="noreferrer" onClick={playClick} className="text-gray-800 hover:text-gray-600 transition-colors">
                Pcstuck2workofficial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}