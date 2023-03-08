import React, { useState } from 'react';
import FormInput from '../common/FormInput.jsx';
import { post } from '../../../api/firestore-services';

const initialFormState = {
  venue: '',
  location: '',
  date: '',
};

const initialTierState = {
  tierName: '',
  price: '',
  quantity: '',
};

export default function AddTourDates() {
  const [form, setForm] = useState(initialFormState);
  const [tier, setTier] = useState(initialTierState);
  const [tiers, setTiers] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTierChange = (e) => {
    const { name, value } = e.target;
    setTier({ ...tier, [name]: value });
  };

  const addTier = () => {
    const found = tiers.find(
      (i) => i.tierName === tier.tierName,
    );
    if (found) return;
    setTiers([...tiers, tier]);
    setTier(initialTierState);
  };

  const removeTier = (tierName) => {
    setTiers(tiers.filter((i) => i.tierName !== tierName));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const payload = { ...form, pricing: tiers };
    const res = await post(payload, 'tours');
    if (res.success) {
      setForm(initialFormState);
      setTiers([]);
    }
  };

  return (
    <div className="md:max-w-xl">
      <form aria-label="form" onSubmit={handleAddEvent}>
        <FormInput
          labelText="Venue"
          type="text"
          name="venue"
          value={form.venue}
          placeholder="Enter venue here"
          onChange={handleInput}
        />
        <FormInput
          labelText="Location"
          type="text"
          name="location"
          value={form.location}
          placeholder="Enter location"
          onChange={handleInput}
        />
        <FormInput
          labelText="Date"
          type="date"
          name="date"
          value={form.date}
          placeholder="Enter date"
          onChange={handleInput}
        />
        <div className="flex flex-wrap gap-2">
          <div className="w-1/4">
            <FormInput
              labelText="Tier"
              type="text"
              name="tierName"
              value={tier.tierName}
              placeholder="Tier name"
              onChange={handleTierChange}
            />
          </div>
          <div className="flex-grow">
            <FormInput
              labelText="Price"
              type="number"
              name="price"
              value={tier.price}
              placeholder="Tier pricing"
              onChange={handleTierChange}
            />
          </div>
          <div className="flex-grow">
            <FormInput
              labelText="Quantity"
              type="number"
              name="quantity"
              value={tier.quantity}
              placeholder="Tickets to sell"
              onChange={handleTierChange}
            />
          </div>
          <button type="button" onClick={addTier}>
            Add Tier
          </button>
        </div>
        {tiers.map((t) => (
          <div key={t.tierName} className="flex gap-2">
            <p>{`Tier name: ${t.tierName}, Price: ${t.price}, Quantity: ${t.quantity}`}</p>
            <button
              type="button"
              onClick={() => removeTier(t.tierName)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-end">
          <input
            type="submit"
            value="ADD EVENT"
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
