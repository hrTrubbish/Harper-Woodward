import React, { useState, useEffect } from 'react';

export default function Payment() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(
      window.location.search,
    );

    if (query.get('success')) {
      setMessage(
        'Order placed! You will receive an email confirmation.',
      );
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready.",
      );
    }
  }, []);

  return message ? (
    <section>
      <p>{message}</p>
    </section>
  ) : (
    <section className="h-screen w-screen flex justify-center p-10">
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
        <form
          action="http://localhost:8080/api/checkout"
          method="POST"
        >
          <button type="submit">Checkout</button>
        </form>
      </div>
    </section>
  );
}
// TESTING CREDIT CARD
// SUCCESS = 4242 4242 4242 4242
// REQUIRES AUTH = 4000 0025 0000 3155
// DECLINED = 4000 0000 0000 9995
