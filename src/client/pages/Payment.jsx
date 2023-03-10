import React, { useState, useEffect } from 'react';
import { getOne } from '../api/firestore-services';

export default function Payment() {
  const [message, setMessage] = useState('');
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const messages = {
    success:
      'Order placed! You will receive an email confirmation.',
    canceled:
      'Order canceled - We hope to see you at our next event',
  };

  useEffect(() => {
    const query = new URLSearchParams(
      window.location.search,
    );

    if (query.get('success')) {
      setMessage(messages.success);
    }
    if (query.get('canceled')) {
      setMessage(messages.canceled);
    }

    const streamId = query.get('stream');
    const tourId = query.get('tour');

    const getInfo = async (id, type) => {
      const res = await getOne(id, type);
      setEvent({ eventType: type, ...res });
      setLoading(false);
    };

    if (streamId) {
      getInfo(streamId, 'schedules');
    } else if (tourId) {
      getInfo(tourId, 'tours');
    }
  }, []);

  const port = import.meta.env.VITE_STRIPE_PORT;

  const streamPurchaseRender = () => (
    <section className="h-screen w-screen flex justify-center p-10">
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>{event?.eventName}</h3>
          <h5>{`$${event?.pricing?.toFixed(2)}`}</h5>
        </div>
        <form
          action={`http://localhost:${port}/api/checkout?amount=${event?.pricing}&type=stream`}
          method="POST"
        >
          <button type="submit">Checkout</button>
        </form>
      </div>
    </section>
  );

  const tourPurchaseRender = () => (
    <section className="h-screen w-screen flex justify-center p-10">
      <div className="flex gap-4">
        {event?.pricing?.map((tier) => (
          <div
            key={tier?.tierName}
            className="w-40 h-48 bg-white rounded-md text-center p-2 flex flex-col justify-between items-center"
          >
            <div>
              <div>{tier?.tierName}</div>
              <div>{tier?.price}</div>
            </div>
            <form
              action={`http://localhost:${port}/api/checkout?amount=${tier?.price}&type=tour`}
              method="POST"
            >
              <button type="submit">Checkout</button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );

  if (message) {
    return (
      <section className="h-screen w-screen flex justify-center p-10">
        <p>{message}</p>
      </section>
    );
  }
  if (!loading) {
    if (event.eventType === 'schedules') {
      return streamPurchaseRender();
    }
    if (event.eventType === 'tours') {
      return tourPurchaseRender();
    }
  }
}
// TESTING CREDIT CARD
// SUCCESS = 4242 4242 4242 4242
// REQUIRES AUTH = 4000 0025 0000 3155
// DECLINED = 4000 0000 0000 9995
