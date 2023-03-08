import React, { useState } from 'react';
import FormInput from '../common/FormInput.jsx';
// import { convertToUTC } from '../../../../client/utils/utils.js';

const initialFormInput = {
  venue: '',
  location: '',
  date: '',
  pricing: [
    {
      tierName: '',
      price: '',
      quantity: '',
    },
  ],
};

const initialTier = {
  tierName: '',
  price: 0,
  quantity: 0,
};

export default function AddTourDates() {
  const [formInput, setFormInput] = useState(initialFormInput);
  const [currentTier, setCurrentTier] = useState(initialTier);

  const clearForm = () => {
    setFormInput(initialFormInput);
  };

  const handleInputChange = (event) => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value,
    });
  };

  // const handleTimeChange = (event) => {
  //   setFormInput({
  //     ...formInput,
  //     date: convertToUTC(event.target.value),
  //   });
  // };

  const handleTierChange = (event) => {
    setCurrentTier({
      ...currentTier,
      [event.target.name]: event.target.value,
    });
  };

  const addTier = () => {
    formInput.pricing.push(currentTier);
    setCurrentTier(initialTier);
  };

  return (
    <div className="w-1/3">
      <form
        aria-label="form"
        onSubmit={(e) => {
          e.preventDefault();
          // formInput.date = convertToUTC(formInput.date);
          // setFormInput({
          //   ...formInput,
          //   date: convertToUTC(e.target.value),
          // });
          console.log('date: ', formInput.date);
          // clearForm();
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
          value={currentTier.tierName}
          placeholder="Enter pricing tier"
          onChange={handleTierChange}
        />
        <FormInput
          labelText="Price"
          type="number"
          name="price"
          value={currentTier.price}
          placeholder="Enter price"
          onChange={handleTierChange}
        />
        <FormInput
          labelText="Quantity"
          type="number"
          name="quantity"
          value={currentTier.quantity}
          placeholder="Enter quantity"
          onChange={handleTierChange}
        />
        <button
          type="button"
          onClick={() => {
            addTier();
          }}
        >
          Add pricing tier
        </button>
        <input type="submit" value="Submit answer" />
      </form>
    </div>
  );
}
