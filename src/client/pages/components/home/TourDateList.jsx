import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

export default function TourDateList({ tours }) {
  const dateConverter = (date) => {
    if (!date) return 'Date not available';
    const newDate = DateTime.fromISO(date);
    return newDate.toFormat('yyyy • MM • dd');
  };

  return (
    <div className="sm:w-3/4 sm:m-auto">
      {tours.map((tour) => (
        <ul key={tour?.id} className="my-2">
          <div className="flex justify-between items-center">
            <section className="flex gap-8 items-center">
              <div className="text-sm">
                {dateConverter(tour?.date)}
              </div>
              <div>
                <div>{tour?.venue}</div>
                <div className="text-xs">
                  {tour?.description}
                </div>
                <div className="text-xs">
                  {tour?.location}
                </div>
              </div>
            </section>

            <div className="flex justify-center gap-3 text-sm">
              {tour?.isAvailable && (
                <Link
                  to={{
                    pathname: '/checkout',
                    search: `?tour=${tour?.id}`,
                  }}
                >
                  Buy tickets
                </Link>
              )}
              {tour?.isSoldout && <span>Sold out</span>}
            </div>
          </div>
        </ul>
      ))}
    </div>
  );
}
