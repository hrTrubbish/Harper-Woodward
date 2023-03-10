import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useSelector, useDispatch } from 'react-redux';
import { getTours } from '../../../redux/global';
import { FormInput, FormTextarea } from '../common';
import {
  post,
  update,
  remove,
} from '../../../api/firestore-services';

const initialForm = {
  venue: '',
  description: '',
  location: '',
  date: '',
};

const initialTier = {
  tierName: '',
  price: '',
  quantity: '',
};

export default function AddTourDates() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [tier, setTier] = useState(initialTier);
  const [tiers, setTiers] = useState([]);
  const [formMode, setFormMode] = useState('Add Event');
  const [currTourId, setCurrTourId] = useState('');
  const [loading, setLoading] = useState(true);
  const { tours } = useSelector((state) => state.global);

  const dateConverter = (date) => {
    if (!date) return 'Date not available';
    const newDate = DateTime.fromISO(date);
    return newDate.toFormat('yyyy • MM • dd');
  };

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
    const newTier = {
      ...tier,
      price: Number(tier.price),
      quantity: Number(tier.quantity),
    };
    setTiers([...tiers, newTier]);
    setTier(initialTier);
  };

  const removeTier = (tierName) => {
    setTiers(tiers.filter((i) => i.tierName !== tierName));
  };

  const resetForm = () => {
    setFormMode('Add Event');
    setForm(initialForm);
    setTier(initialTier);
    setCurrTourId('');
    setTiers([]);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      pricing: tiers,
      isSoldout: false,
    };

    let res;
    if (formMode === 'Add Event') {
      payload.isAvailable = true;
      res = await post(payload, 'tours');
    } else if (formMode === 'Update Event') {
      res = await update(currTourId, payload, 'tours');
    }

    if (res.success) {
      resetForm();
      dispatch(getTours());
    }
  };

  const editTour = (params) => {
    setFormMode('Update Event');
    setForm({
      venue: params?.venue,
      description: params?.description,
      location: params?.location,
      date: params?.date,
      isAvailable: params?.isAvailable,
    });
    setCurrTourId(params?.id);
    setTiers(params?.pricing);
  };

  const onRemoveTour = async (id) => {
    const res = await remove(id, 'tours');
    if (res.success) {
      dispatch(getTours());
    }
  };

  useEffect(() => {
    const getToursAsync = async () => {
      await dispatch(getTours());
      setLoading(false);
    };
    getToursAsync();
  }, []);

  return (
    <div className="md:max-w-2xl">
      <div className="mb-4">
        {!loading &&
          tours?.map((tour) => (
            <div
              key={tour?.id}
              className="mb-1 flex justify-between"
            >
              <section className="flex gap-8 items-center">
                <div className="text-sm w-32">
                  {dateConverter(tour?.date)}
                </div>
                <div>
                  <div className="text-sm">
                    {tour?.venue}
                  </div>
                  <div className="text-xs">
                    {tour?.description}
                  </div>
                  <div className="text-xs">
                    {tour?.location}
                  </div>
                </div>
              </section>
              <div className="flex gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => editTour(tour)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveTour(tour?.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <form aria-label="form" onSubmit={formHandler}>
        <div className="w-full flex justify-end text-sm">
          {formMode === 'Update Event' && (
            <div className="flex flex-col items-end">
              <button
                type="button"
                onClick={() => resetForm()}
              >
                Add new Tour
              </button>
              <div className="flex flex-col items-end">
                <p>Currently displaying</p>
                <select
                  value={form.isAvailable ? 'yes' : 'no'}
                  className="w-20"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isAvailable: e.target.value === 'yes',
                    })
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <FormInput
          labelText="Venue"
          type="text"
          name="venue"
          value={form.venue}
          placeholder="Enter venue here"
          onChange={handleInput}
        />
        <FormTextarea
          labelText="Description"
          type="text"
          name="description"
          value={form.description}
          placeholder="Enter a description"
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
        </div>
        <button type="button" onClick={addTier}>
          Add Tier
        </button>
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
            value={formMode}
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
