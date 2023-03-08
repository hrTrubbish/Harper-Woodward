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

    const getStreamInfo = async () => {
      const streamId = query.get('stream');
      const res = await getOne(streamId, 'schedules');
      setEvent({ eventType: 'stream', ...res });
      setLoading(false);
    };

    getStreamInfo();
  }, []);

  return message ? (
    <section>
      <p>{message}</p>
    </section>
  ) : (
    !loading && (
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
            action={`http://localhost:8080/api/checkout?amount=${event?.pricing}&type=stream`}
            method="POST"
          >
            <button type="submit">Checkout</button>
          </form>
        </div>
      </section>
    )
  );
}
// TESTING CREDIT CARD
// SUCCESS = 4242 4242 4242 4242
// REQUIRES AUTH = 4000 0025 0000 3155
// DECLINED = 4000 0000 0000 9995
