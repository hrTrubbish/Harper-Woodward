import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

export default function StreamInfo({ streams }) {
  const { featuredStream } = useSelector(
    (state) => state.global,
  );

  const dateConverter = (date) => {
    if (!date) return 'Date not available';
    const newDate = DateTime.fromISO(date);
    return newDate.toFormat('yyyy • MM • dd');
  };

  const upcomingStream = streams?.find(
    (i) => i.id === featuredStream,
  );
  const otherStreams = streams?.filter(
    (i) => i.isAvailable && i.id !== featuredStream,
  );

  return (
    <div className="streaminfo flex flex-col m-10 px-10" id="upcoming-stream">
      <span className="text-3xl self-center mb-4">
        upcoming stream
      </span>
      <div className="flex flex-row-reverse justify-between h-5/6">
        <div className="flex flex-col self-center w-1/2">
          <span>{dateConverter(upcomingStream?.date)}</span>
          <span>
            {`NEXT EVENT: ${upcomingStream?.eventName}`}
          </span>
          <div>{`(${upcomingStream?.startTime} - ${upcomingStream?.endTime})`}</div>
          <div>{`${upcomingStream?.maxAttendees} attendees`}</div>
          <div className="w-3/4 flex flex-wrap text-sm">
            {upcomingStream?.description}
          </div>
          {upcomingStream?.pricing > 0 && (
            <Link
              to={{
                pathname: '/checkout',
                search: `?stream=${upcomingStream?.id}`,
              }}
            >
              Purchase Access
            </Link>
          )}
        </div>
        <img
          src="src/client/styles/img/BrooksGarth3.png"
          className="brooks border-solid border-2 border-current w-1/2 mt-10 mx-20"
          alt=""
        />
      </div>
      {otherStreams?.length > 0 && (
        <div className="px-10">
          <p>Other events to look out for</p>
          {otherStreams.map((event) => (
            <div key={event?.id}>
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
