import React from 'react';
import { Link } from 'react-router-dom';

export default function TourDateListItem({ tour }) {
  return (
    <div className="text-center">
      <div>{`${tour?.date} - ${tour?.venue} - ${tour?.location}`}</div>
      <div className="flex justify-center gap-3">
        <div>{tour?.description}</div>
        {tour?.isAvailable && (
          <Link
            to={{
              pathname: '/checkout',
              search: `?tour=${tour?.id}`,
            }}
          >
            Purchase Access
          </Link>
        )}
      </div>
    </div>
  );
}
