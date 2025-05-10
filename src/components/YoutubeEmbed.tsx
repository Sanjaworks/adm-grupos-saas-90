
import React from 'react';

interface YoutubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  autoplay?: boolean;
  startAt?: number; // Start time in seconds
  showControls?: boolean;
  showInfo?: boolean;
}

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({
  videoId,
  title = 'YouTube Video',
  className = '',
  width = '100%',
  height = '480',
  autoplay = false,
  startAt = 0,
  showControls = true,
  showInfo = true,
}) => {
  // Build YouTube URL parameters
  const params = new URLSearchParams();
  
  if (autoplay) params.append('autoplay', '1');
  if (startAt > 0) params.append('start', startAt.toString());
  if (!showControls) params.append('controls', '0');
  if (!showInfo) params.append('showinfo', '0');
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  
  return (
    <div className={`video-responsive ${className}`}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}${queryString}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default YoutubeEmbed;
