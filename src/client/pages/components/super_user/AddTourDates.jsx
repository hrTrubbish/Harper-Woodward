import React, { useState } from 'react';
import FormInput from '../common/FormInput.jsx';

const initialFormInput = {
  venue: 'string',
  location: 'string',
  date: 'timestamp',
  pricing: [
    {
      tierName: 'string',
      price: 'number',
      quantity: 'number',
    },
  ],
};

export default function AddTourDates({ handleSchedule }) {
  const [formInput, setFormInput] = useState(
    initialFormInput,
  );
  const [tiers, setTiers] = useState({
    tierName: '',
    price: 0,
    quantity: 0,
  });

  const clearForm = () => {
    setFormInput(initialFormInput);
  };

  const handleInputChange = (event) => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value,
    });
  };

  const addTier = () => {};
  // form inputs use time input control
  // firestore uses UTC timestamps

  // convert from input to Firestore
  return (
    <div className="w-1/3">
      <form
        aria-label="form"
        onSubmit={(e) => {
          e.preventDefault();
          clearForm();
        }}
      >
        <FormInput
          labelText="Venue"
          type="text"
          name="venue"
          value={formInput.venue}
          placeholder="Enter venue here"
          onChange={handleInputChange}
        />
        <FormInput
          labelText="Location"
          type="text"
          name="location"
          value={formInput.location}
          placeholder="Enter location"
          onChange={handleInputChange}
        />
        <FormInput
          labelText="Date"
          type="time"
          name="date"
          value={formInput.date}
          placeholder="Enter date"
          onChange={handleInputChange}
        />

        <FormInput
          labelText="Pricing tier name"
          type="text"
          name="tierName"
          value={formInput.pricing[0].tierName}
          placeholder="Enter pricing tier"
          onChange={handleInputChange}
        />
        <FormInput
          labelText="Price"
          type="number"
          name="price"
          value={formInput.pricing.price}
          placeholder="Enter price"
          onChange={handleInputChange}
        />
        <FormInput
          labelText="Quantity"
          type="number"
          name="quantity"
          value={formInput.pricing.quantity}
          placeholder="Enter quantity"
          onChange={handleInputChange}
        />
        <button type="button" onClick={addTier}>
          Add
        </button>
        <input type="submit" value="Submit answer" />
      </form>
    </div>
  );
}
