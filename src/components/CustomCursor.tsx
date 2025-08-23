import { useEffect, useState } from 'react';

const HOVER_SELECTORS = 'a, button, input, textarea, select, label, summary, [role="button"], .clickable';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

      const isElementInteractive = (el: Element | null) => {
        if (!el) return false;
        if (el.closest && (el.closest(HOVER_SELECTORS) as Element)) return true;
        const role = el.getAttribute && el.getAttribute('role');
        if (role === 'button' || role === 'link') return true;
        if ((el as HTMLElement).tabIndex >= 0) return true;
        try {
          const cs = window.getComputedStyle(el as Element);
          if (cs && cs.cursor && cs.cursor !== 'auto' && cs.cursor !== 'default' && cs.cursor !== 'none') return true;
        } catch (err) {
        }
        return false;
      };

    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (!t) return;
      if (isElementInteractive(t) || isElementInteractive(t.closest && t.closest('*') as Element)) {
        setIsHover(true);
      }
    };

    const onOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as Element | null;
      if (related && isElementInteractive(related)) return;
      setIsHover(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
    };
  }, []);

  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouch) return null;

  const size = 20;
  const half = Math.floor(size / 2);
  const style: React.CSSProperties = {
    position: 'fixed',
    left: pos.x - half,
    top: pos.y - half,
    width: size,
    height: size,
    pointerEvents: 'none',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    zIndex: 9999,
    transition: 'transform 80ms linear',
    transform: 'translate3d(0,0,0)'
  };

  const base = (import.meta as any).env?.BASE_URL || '/';
  const url = isHover ? `${base}custom_cursor/hover.png` : `${base}custom_cursor/Nonhover.png`;

  

  return (
    <div
      aria-hidden
      style={{ ...style, backgroundImage: `url(${url})` }}
      className="custom-cursor"
    />
  );
}

export default CustomCursor;
