import React from 'react';
import { Link } from 'react-router-dom';

export default function StreamInfo({ streams }) {
  const upcomingStream = streams[0];
  return (
    <div className="info flex flex-col p-10">
      <span className="text-3xl self-center mb-4">
        Upcoming stream
      </span>
      <div className="flex justify-around h-60">
        <div className="flex flex-col self-center">
          <span>
            {upcomingStream?.date ?? 'Date not available'}
          </span>
          <span>
            {`NEXT EVENT: ${upcomingStream?.eventName}`}
          </span>
          <div>{`${upcomingStream?.startTime} - ${upcomingStream?.endTime}`}</div>
          <div>{`${upcomingStream?.maxAttendees} attendees`}</div>
          <div className="w-3/4 flex flex-wrap">
            {upcomingStream?.description}
          </div>
          <Link
            to={{
              pathname: '/checkout',
              search: `?stream=${upcomingStream?.id}`,
            }}
          >
            Purchase Access
          </Link>
        </div>
        <img
          className="w-3/12 border-dotted border-2 border-current"
          alt=""
        />
      </div>
    </div>
  );
}
