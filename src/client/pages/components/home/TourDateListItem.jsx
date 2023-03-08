import React from 'react';

export default function MovieListItem({ tour }) {
  const { date, description, venue, location } = tour;

  return (
    <div className="text-center">
      <div>{`${date} - ${venue} - ${location}`}</div>
      <div>{description}</div>
    </div>
  );
}
