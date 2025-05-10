
import React from 'react';

interface YoutubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({
  videoId,
  title = 'YouTube Video',
  className = '',
  width = '100%',
  height = '480',
}) => {
  return (
    <div className={`video-responsive ${className}`}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
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
