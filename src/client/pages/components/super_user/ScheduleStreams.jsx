import React, { useState } from 'react';
import { FormInput, FormTextarea } from '../common';
import { post } from '../../../api/firestore-services';

const initialForm = {
  eventName: '',
  description: '',
  startTime: '',
  date: '',
  endTime: '',
  maxAttendees: '',
  pricing: '',
};

export default function ScheduleStreams() {
  const [form, setForm] = useState(initialForm);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const { maxAttendees, pricing, ...fields } = form;
    const payload = {
      maxAttendees: Number(maxAttendees),
      pricing: Number(pricing),
      ...fields,
      attendees: 0,
      isAvailable: true,
    };
    const res = await post(payload, 'schedules');
    if (res.success) {
      setForm(initialForm);
    }
  };

  return (
    <div className="md:max-w-xl mx-auto text-center">
      <div className="text-center">
        Add your next stream
      </div>
      <form aria-label="form" onSubmit={handleAddEvent}>
        <FormInput
          labelText="Event"
          type="text"
          name="eventName"
          value={form.eventName}
          placeholder="Enter event name"
          onChange={handleInput}
        />
        <FormTextarea
          labelText="Description"
          name="description"
          value={form.description}
          placeholder="Describe livestream event"
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
        <div className="flex gap-2 justify-end">
          <div className="w-1/4">
            <FormInput
              labelText="Start time"
              type="time"
              name="startTime"
              value={form.startTime}
              placeholder="Enter start time"
              onChange={handleInput}
            />
          </div>
          <div className="w-1/4">
            <FormInput
              labelText="End time"
              type="time"
              name="endTime"
              value={form.endTime}
              placeholder="Enter end time"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="w-1/4">
            <FormInput
              labelText="Max attendees"
              type="number"
              name="maxAttendees"
              value={form.maxAttendees}
              placeholder="Capacity"
              onChange={handleInput}
            />
          </div>
          <div className="w-1/4">
            <FormInput
              labelText="Pricing"
              type="number"
              name="pricing"
              value={form.pricing}
              placeholder="Enter price"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <input
            type="submit"
            value="Add"
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
