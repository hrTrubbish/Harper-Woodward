import React from 'react';

export default function MovieListItem({ tour }) {
  return (
    <div className="text-center">
      <div>{`${tour?.date} - ${tour?.venue} - ${tour?.location}`}</div>
      <div>{tour?.description}</div>
    </div>
  );
}
