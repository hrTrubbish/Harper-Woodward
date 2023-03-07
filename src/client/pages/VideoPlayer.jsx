import React from 'react';
import YouTubeEmbed from './components/video_player/YouTubeEmbed.jsx';

export default function VideoPlayer() {
  return (
    <div className="flex h-screen">
      <div className="flex w-2/3 border-solid border-2 border-transparent p-6">
        <div className="flex flex-col h-screen w-screen gap-6">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
          <h2>Dancing in a Bar</h2>
          <p>{`Views: ${125000} Likes: ${1000}`}</p>
        </div>
      </div>
      <div className="flex flex-col w-1/3 border-solid border-l-2 border-current p-6 gap-6">
        <div className="w-1/2 self-center border-solid border-2 border-current">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
        </div>
        <div className="w-1/2 self-center border-solid border-2 border-current">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
        </div>
        <div className="w-1/2 self-center border-solid border-2 border-current">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
        </div>
        <div className="w-1/2 self-center border-solid border-2 border-current">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
        </div>
        <button type="button">More</button>
      </div>
    </div>
  );
}
