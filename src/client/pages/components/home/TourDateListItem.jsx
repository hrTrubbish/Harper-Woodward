import React from 'react';

export default function MovieListItem({ tour, handleBuy }) {
  const { town, venue, date } = tour;

  return (
    <>
      <div>{date}</div>
      <div>
        <div>{venue}</div>
        <div>{town}</div>
      </div>
      <button type="button" onClick={handleBuy}>Buy Tickets</button>
    </>
  );
}
