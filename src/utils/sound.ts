let audio: HTMLAudioElement | null = null;

export function playClickSound() {
  try {
    if (!audio) {
      audio = new Audio('/sounds/click.mp3');
      audio.preload = 'auto';
      audio.volume = 0.75;
      // playsInline helps on iOS Safari
      (audio as any).playsInline = true;
    }
    audio.currentTime = 0;
    const p = audio.play();
    if (p && typeof p.then === 'function') p.catch(() => {});
  } catch (err) {
    // swallow errors to avoid breaking UI
  }
}

export default playClickSound;

let transformAudio: HTMLAudioElement | null = null;

export function playTransformSound() {
  try {
    if (!transformAudio) {
      transformAudio = new Audio('/sounds/transform.mp3');
      transformAudio.preload = 'auto';
      transformAudio.volume = 0.8;
      (transformAudio as any).playsInline = true;
    }
    transformAudio.currentTime = 0;
    const p = transformAudio.play();
    if (p && typeof p.then === 'function') p.catch(() => {});
  } catch (err) {
    // swallow errors
  }
}
