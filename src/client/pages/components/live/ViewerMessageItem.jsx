import React from 'react';

export default function ViewerMessageItem({ message }) {
  // const { name, body } = message;

  return (
    <div className="flex flex-row gap-6">
      <div>name</div>
      <div>message</div>
    </div>
  );
}
