import React from 'react';
import TourDateListItem from './TourDateListItem.jsx';

export default function TourDateList({ tours }) {
  return (
    <div>
      {tours.map((tour) => (
        <ul className="my-2">
          <TourDateListItem key={tour.id} tour={tour} />
        </ul>
      ))}
    </div>
  );
}
