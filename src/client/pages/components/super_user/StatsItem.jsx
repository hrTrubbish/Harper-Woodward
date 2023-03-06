import React from 'react';

export default function StatsItem({ stat }) {
  // const { title, views, comments, likes } = stat;

  return (
    <div className="flex flex-row gap-6">
      Title
      <div>likes</div>
      <div>comments</div>
      <div>views</div>
    </div>
  );
}
