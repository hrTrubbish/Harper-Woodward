import React from 'react';
import YouTubeEmbed from './components/video_player/YouTubeEmbed.jsx';

export default function AllVideos() {
  return (
    <div className="p-6">
      <div className="grid gap-4 grid-cols-2 grid-rows-auto">
        <div className="border-solid border-2 border-rose-100">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
          <div className="border-solid border-2 border-rose-100 p-2 text-center">
            <h2>Dancing in a Bar</h2>
          </div>
        </div>
        <div className="border-solid border-2 border-rose-100">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
          <div className="border-solid border-2 border-rose-100 p-2 text-center">
            <h2>Dancing in a Bar</h2>
          </div>
        </div>
        <div className="border-solid border-2 border-rose-100">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
          <div className="border-solid border-2 border-rose-100 p-2 text-center">
            <h2>Dancing in a Bar</h2>
          </div>
        </div>
        <div className="border-solid border-2 border-rose-100">
          <YouTubeEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dancing in a Bar"
          />
          <div className="border-solid border-2 border-rose-100 p-2 text-center">
            <h2>Dancing in a Bar</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
