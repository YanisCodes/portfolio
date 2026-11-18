import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

type Props = {
  src: string;
  className?: string;
};

/**
 * Plays an HLS (.m3u8) or plain video file. Stays invisible until frames are
 * actually playing, so whatever sits underneath (the galaxy canvas) shows
 * through if the stream is slow or unavailable.
 */
export default function HlsVideo({ src, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(false);

    let hls: Hls | null = null;
    const isHls = src.includes('.m3u8');

    if (!isHls) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.on(Hls.Events.ERROR, (_e, data) => {
        if (data.fatal) {
          hls?.destroy();
          hls = null;
        }
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }

    const onPlaying = () => setPlaying(true);
    video.addEventListener('playing', onPlaying);
    return () => {
      video.removeEventListener('playing', onPlaying);
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={`${className} transition-opacity duration-1000`}
      style={{ opacity: playing ? 1 : 0 }}
    />
  );
}
