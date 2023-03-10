import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

export default function StreamInfo({ streams }) {
  const dateConverter = (date) => {
    if (!date) return 'Date not available';
    const newDate = DateTime.fromISO(date);
    return newDate.toFormat('yyyy • MM • dd');
  };

  const filtered = streams?.filter((i) => i.isAvailable);
  const [upcomingStream, ...otherStreams] = filtered;

  return (
    <div className="info flex flex-col m-10 px-10">
      <span className="text-3xl self-center mb-4">
        upcoming stream
      </span>
      <div className="flex justify-around h-60">
        <div className="flex flex-col self-center">
          <span>{dateConverter(upcomingStream?.date)}</span>
          <span>
            {`NEXT EVENT: ${upcomingStream?.eventName}`}
          </span>
          <div>{`(${upcomingStream?.startTime} - ${upcomingStream?.endTime})`}</div>
          <div>{`${upcomingStream?.maxAttendees} attendees`}</div>
          <div className="w-3/4 flex flex-wrap text-sm">
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
      {otherStreams?.length > 0 && (
        <div className="px-10">
          <p>Other events to look out for</p>
          {otherStreams.map((event) => (
            <div>
              {`${dateConverter(event?.date)} - ${
                event?.eventName
              } (${event?.startTime} - ${event?.endTime})`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
