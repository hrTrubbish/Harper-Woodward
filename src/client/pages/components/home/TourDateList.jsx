import React from 'react';
import TourDateListItem from './TourDateListItem.jsx';

export default function TourDateList({ tours }) {
  return (
    <div>
      {tours.map((tour) => (
        <ul key={tour?.id} className="my-2">
          <TourDateListItem tour={tour} />
        </ul>
      ))}
    </div>
  );
}
