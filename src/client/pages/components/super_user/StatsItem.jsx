import React from 'react';

export default function StatsItem({ stat }) {
  const { views, comments, likes } = stat;

  return (
    <>
      <div>{likes}</div>
      <div>
        <div>{comments}</div>
        <div>{views}</div>
      </div>
    </>
  );
}
