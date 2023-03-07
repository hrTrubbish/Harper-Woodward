import React from 'react';
import StatsItem from './StatsItem.jsx';

export default function StatsList({ stats }) {
  return (
    <div className="flex flex-col justify-start w-1/2 border-solid border-2 border-current p-6 m-8">
      <h2 className="self-center mb-6">Viewer Statistics</h2>
      <div>
        {/* {stats.map((stat) => {
          return <ul><StatsItem key={stat._id} id={stat._id} stat={stat}/></ul>
        })} */}
        <StatsItem className="border-solid border-2 border-current">stats 1</StatsItem>
        <StatsItem className="border-solid border-2 border-current">stats 2</StatsItem>
        <StatsItem className="border-solid border-2 border-current">stats 3</StatsItem>
        <StatsItem className="border-solid border-2 border-current">stats 4</StatsItem>
        <StatsItem className="border-solid border-2 border-current">stats 5</StatsItem>
        <StatsItem className="border-solid border-2 border-current">stats 6</StatsItem>
        <StatsItem className="border-solid border-2 border-current">stats 7</StatsItem>
      </div>
    </div>
  );
}
