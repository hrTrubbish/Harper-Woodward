import React from 'react';
import StatsItem from './StatsItem.jsx';

export default function StatsList({ stats }) {
  return (
    <div className="flex flex-col justify-start w-1/2 border-solid border-2 border-black p-6">
      <h2 className="self-center mb-6">Viewer Statistics</h2>
      <div>
        {/* {stats.map((stat) => {
          return <ul><StatsItem key={stat._id} id={stat._id} stat={stat}/></ul>
        })} */}
        <div className="border-solid border-2 border-black">stats 1</div>
        <div className="border-solid border-2 border-black">stats 2</div>
        <div className="border-solid border-2 border-black">stats 3</div>
        <div className="border-solid border-2 border-black">stats 4</div>
        <div className="border-solid border-2 border-black">stats 5</div>
        <div className="border-solid border-2 border-black">stats 6</div>
        <div className="border-solid border-2 border-black">stats 7</div>
      </div>
    </div>
  );
}
