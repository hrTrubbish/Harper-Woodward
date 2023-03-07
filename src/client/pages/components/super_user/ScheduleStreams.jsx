import React, { useState } from 'react';
import FormInput from '../common/FormInput.jsx';
import FormTextarea from '../common/FormTextarea.jsx';

const initialFormInput = {
  title: 'string',
  description: 'string',
  startTime: 'timestamp',
  endTime: 'timestamp',
  timezone: 'string',
  attendees: 'number',
  maxAttendees: 'number',
  pricing: 'number',
};

export default function ScheduleStreams({ handleSchedule }) {
  const [formInput, setFormInput] = useState(initialFormInput);

  const clearForm = () => {
    setFormInput(initialFormInput);
  };

  const handleInputChange = (event) => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      aria-label="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSchedule(e, formInput);
        clearForm();
      }}
    >
      <FormInput
        labelText="Title"
        type="text"
        name="title"
        value={formInput.title}
        placeholder="Enter title here"
        onChange={handleInputChange}
      />
      <FormTextarea
        labelText="Description"
        name="description"
        value={formInput.description}
        placeholder="Describe livestream event"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="Start time"
        type="time"
        name="startTime"
        value={formInput.startTime}
        placeholder="Enter start time"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="End time"
        type="time"
        name="endTime"
        value={formInput.endTime}
        placeholder="Enter end time"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="Time zone"
        type="text"
        name="timezone"
        value={formInput.timezone}
        placeholder="Enter timezone"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="Attendees"
        type="number"
        name="attendees"
        value={formInput.attendees}
        placeholder="Enter number of attendees"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="Max attendees"
        type="number"
        name="maxAttendees"
        value={formInput.maxAttendees}
        placeholder="Enter maximum number of attendees"
        onChange={handleInputChange}
      />
      <FormInput
        labelText="Pricing"
        type="number"
        name="pricing"
        value={formInput.pricing}
        placeholder="Enter price"
        onChange={handleInputChange}
      />
      <input
        type="submit"
        value="Submit answer"
      />
    </form>
  );
}
