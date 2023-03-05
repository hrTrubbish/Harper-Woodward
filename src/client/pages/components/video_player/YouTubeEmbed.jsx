import React from 'react';

export default function YouTubeEmbed ({ width = '100%', height = '100%', src, title }) {
  return (
    <div className="aspect-video">
      <iframe
        width={width}
        height={height}
        src={src}
        title={title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
      />
    </div>
  );
};
